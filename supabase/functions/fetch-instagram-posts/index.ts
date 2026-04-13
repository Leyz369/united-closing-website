import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramAPIResponse {
  data: InstagramPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

const CACHE_DURATION_MS = 60 * 60 * 1000;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: metadata } = await supabase
      .from("instagram_cache_metadata")
      .select("*")
      .maybeSingle();

    const now = new Date();
    let shouldFetch = true;

    if (metadata?.last_fetched_at) {
      const lastFetch = new Date(metadata.last_fetched_at);
      const timeSinceLastFetch = now.getTime() - lastFetch.getTime();
      shouldFetch = timeSinceLastFetch > CACHE_DURATION_MS;
    }

    if (!shouldFetch) {
      const { data: cachedPosts, error: cacheError } = await supabase
        .from("instagram_posts")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(9);

      if (cacheError) throw cacheError;

      if (cachedPosts && cachedPosts.length > 0) {
        return new Response(
          JSON.stringify({ posts: cachedPosts, source: "cache" }),
          {
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    const accessToken = metadata?.access_token || Deno.env.get("INSTAGRAM_ACCESS_TOKEN");

    if (!accessToken) {
      const { data: fallbackPosts } = await supabase
        .from("instagram_posts")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(9);

      return new Response(
        JSON.stringify({
          posts: fallbackPosts || [],
          source: "cache",
          message: "Instagram access token not configured. Using cached data."
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const instagramUrl = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=9`;

    const instagramResponse = await fetch(instagramUrl);

    if (!instagramResponse.ok) {
      throw new Error(`Instagram API error: ${instagramResponse.status} ${instagramResponse.statusText}`);
    }

    const instagramData: InstagramAPIResponse = await instagramResponse.json();

    if (instagramData.data && instagramData.data.length > 0) {
      for (const post of instagramData.data) {
        await supabase
          .from("instagram_posts")
          .upsert({
            instagram_id: post.id,
            media_type: post.media_type,
            media_url: post.media_url,
            thumbnail_url: post.thumbnail_url,
            permalink: post.permalink,
            caption: post.caption,
            timestamp: post.timestamp,
          }, {
            onConflict: "instagram_id"
          });
      }

      if (metadata) {
        await supabase
          .from("instagram_cache_metadata")
          .update({ last_fetched_at: now.toISOString() })
          .eq("id", metadata.id);
      } else {
        await supabase
          .from("instagram_cache_metadata")
          .insert({ last_fetched_at: now.toISOString(), access_token: accessToken });
      }
    }

    const { data: updatedPosts } = await supabase
      .from("instagram_posts")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(9);

    return new Response(
      JSON.stringify({ posts: updatedPosts || [], source: "api" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error fetching Instagram posts:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        posts: []
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
