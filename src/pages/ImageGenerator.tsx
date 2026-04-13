import { useState } from 'react';
import { Button } from '../components/ui/button';

export default function ImageGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    setImageUrl(null);

    const prompt = `Professional photorealistic POV photograph: looking down at a modern executive desk inside a high-rise office, facing a floor-to-ceiling glass wall with a stunning Dubai skyline view featuring modern towers and distant Burj Khalifa silhouette with soft atmospheric haze. On the premium dark walnut desk surface: an open latest-generation MacBook with visible screen (no readable text), an iPhone 17 Pro placed neatly beside it, white Apple EarPods in their case, a minimalist notebook, a premium pen, and a glass of water. Natural daylight from windows creating soft shadows and realistic highlights on glass and metal surfaces. Real wood desk texture with subtle reflections. Shot with iPhone 17 Pro main camera (24mm equivalent) from standing position with slight downward angle. Sharp focus on devices with skyline slightly softer due to natural depth of field. Natural iPhone grain and sharpening, realistic dynamic range, no HDR halos. Enterprise premium mood, clean minimal aesthetic, modern focused atmosphere. Photorealistic corporate lifestyle photography.`;

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-influencer-image`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          aspectRatio: '16:9'
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Influencer Image Generator</h1>
          <p className="text-slate-300 mb-8">
            Generate a photorealistic POV image of a premium Dubai office setup
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <Button
              onClick={generateImage}
              disabled={isGenerating}
              className="w-full mb-6"
            >
              {isGenerating ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Generating... (this may take 30-60 seconds)
                </>
              ) : (
                'Generate Image'
              )}
            </Button>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-400">Error: {error}</p>
              </div>
            )}

            {imageUrl && (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-slate-600">
                  <img
                    src={imageUrl}
                    alt="Generated office scene"
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex gap-3">
                  <a
                    href={imageUrl}
                    download="influencer-office-dubai.webp"
                    className="flex-1 bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg px-4 py-2 text-center"
                  >
                    Download Image
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(imageUrl);
                      alert('Image URL copied to clipboard!');
                    }}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg px-4 py-2"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-slate-900/50 rounded-lg">
              <h3 className="font-semibold mb-2">Image Specification:</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• POV from desk in Dubai high-rise office</li>
                <li>• MacBook, iPhone 17 Pro, AirPods on premium desk</li>
                <li>• Floor-to-ceiling window with Dubai skyline</li>
                <li>• Natural iPhone photography look with realistic grain</li>
                <li>• Enterprise premium aesthetic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
