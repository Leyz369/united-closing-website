const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ImageGenerationRequest {
  prompt: string;
  aspectRatio?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const replicateApiKey = Deno.env.get("REPLICATE_API_KEY") || "";

    const requestData: ImageGenerationRequest = await req.json();
    const { prompt, aspectRatio = "16:9" } = requestData;

    // Create the prediction using FLUX Pro
    const predictionResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${replicateApiKey}`,
        "Content-Type": "application/json",
        "Prefer": "wait"
      },
      body: JSON.stringify({
        version: "417902b5e4c94b17a70e34a3cbf3b8ddfbe8e74e2e07ea5b5d8e6a5c1d3c1f3e",
        input: {
          prompt: prompt,
          aspect_ratio: aspectRatio,
          output_format: "webp",
          output_quality: 90,
          safety_tolerance: 2,
          prompt_upsampling: true
        }
      })
    });

    if (!predictionResponse.ok) {
      const errorText = await predictionResponse.text();
      console.error("Replicate API Error:", errorText);
      throw new Error(`Replicate API failed: ${predictionResponse.status}`);
    }

    const prediction = await predictionResponse.json();

    // If the prediction is still processing, poll for results
    let finalPrediction = prediction;
    if (prediction.status === "starting" || prediction.status === "processing") {
      const maxAttempts = 60;
      let attempts = 0;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const statusResponse = await fetch(
          `https://api.replicate.com/v1/predictions/${prediction.id}`,
          {
            headers: {
              "Authorization": `Bearer ${replicateApiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!statusResponse.ok) {
          throw new Error(`Failed to check prediction status: ${statusResponse.status}`);
        }

        finalPrediction = await statusResponse.json();

        if (finalPrediction.status === "succeeded" || finalPrediction.status === "failed") {
          break;
        }

        attempts++;
      }
    }

    if (finalPrediction.status === "failed") {
      throw new Error(`Image generation failed: ${finalPrediction.error || "Unknown error"}`);
    }

    if (finalPrediction.status !== "succeeded") {
      throw new Error("Image generation timed out");
    }

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: finalPrediction.output,
        predictionId: finalPrediction.id
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating image:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});