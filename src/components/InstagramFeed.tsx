import React, { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";

type InstagramPost = {
  id: string;
  instagram_id?: string;
  permalink: string;
  media_url: string;
  caption?: string;
};

const FALLBACK_POSTS: InstagramPost[] = [
  {
    id: "1",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Remote arbeiten von überall - Deine Freiheit wartet!",
  },
  {
    id: "2",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Erfolg im Remote Business - Dein Weg zur finanziellen Freiheit",
  },
  {
    id: "3",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Flexibel arbeiten, mehr leben - Das ist unser Motto!",
  },
  {
    id: "4",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Dein Team - Gemeinsam zum Erfolg",
  },
  {
    id: "5",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Laptop Lifestyle - Arbeite wo du willst",
  },
  {
    id: "6",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Erfolgsstrategien für dein Business",
  },
  {
    id: "7",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Finanzielle Freiheit erreichen",
  },
  {
    id: "8",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/7651903/pexels-photo-7651903.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Remote Team Meetings",
  },
  {
    id: "9",
    permalink: "https://www.instagram.com/united_closing",
    media_url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Starte deine Remote-Karriere",
  },
];

export function InstagramFeed() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [posts, setPosts] = useState<InstagramPost[]>(FALLBACK_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-instagram-posts`;
        const headers = {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        };

        const response = await fetch(apiUrl, { headers });

        if (response.ok) {
          const data = await response.json();
          if (data.posts && data.posts.length > 0) {
            setPosts(data.posts);
          }
        }
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7AA2FF]/80">
          <Instagram className="h-4 w-4" />
          <span>Folge uns auf Instagram</span>
        </div>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Einblicke in unsere Remote-Community
        </h2>
        <p className="mt-4 text-pretty text-base text-white/70 sm:text-lg">
          Erhalte täglich Inspiration, Erfolgsgeschichten und praktische Tipps für dein Remote Business
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
            className="group relative"
          >
            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.media_url}
                  alt={post.caption || "Instagram Post"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                    hoveredPost === post.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="mb-3 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-md">
                      <Instagram className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center text-sm text-white/90">
                      {post.caption}
                    </div>
                  </div>
                </div>

                <div className="absolute right-3 top-3">
                  <div className="rounded-full border border-white/20 bg-black/50 p-2 backdrop-blur-md">
                    <Instagram className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </GlowingEffect>
          </a>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="https://www.instagram.com/united_closing"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#7AA2FF]/30 hover:bg-white/10"
        >
          <Instagram className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span>@united_closing folgen</span>
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
