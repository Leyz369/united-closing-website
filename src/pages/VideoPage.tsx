import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoPage() {
  const navigate = useNavigate();
  const [leadName, setLeadName] = useState("");
  const [hoursLeft, setHoursLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const stored = localStorage.getItem("uc_lead_name") || "";
    setLeadName(stored);
  }, []);

  // 24h countdown timer
  useEffect(() => {
    const storedExpiry = localStorage.getItem("uc_countdown_expiry");
    let expiry: number;

    if (storedExpiry) {
      expiry = parseInt(storedExpiry, 10);
    } else {
      expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("uc_countdown_expiry", String(expiry));
    }

    const tick = () => {
      const diff = Math.max(0, expiry - Date.now());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      setHoursLeft({ h, m, s });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 transition hover:opacity-80">
          <img src="/United_closing.webp" alt="United Closing" className="h-8 w-auto" />
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {/* Greeting */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7AA2FF]/80">
            Dein naechster Schritt
          </div>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            {leadName ? `Danke ${leadName}!` : "Danke!"} Schau dir dieses kurze Video an:
          </h1>
        </div>

        {/* Video Embed Placeholder */}
        {/* TODO: Replace this placeholder with a YouTube/Vimeo embed, e.g.:
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
        */}
        <div className="relative mx-auto mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="relative aspect-video flex flex-col items-center justify-center gap-4">
            {/* Play button */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:scale-110 hover:bg-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8 text-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-sm text-white/50">Video wird geladen...</span>
          </div>
        </div>

        {/* What to expect */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <h2 className="mb-5 text-lg font-semibold sm:text-xl">Was dich erwartet:</h2>
          <ul className="space-y-4">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#7AA2FF]">
                    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 11h4v-2h-3V6h-2z" />
                  </svg>
                ),
                text: "Flexible Arbeitszeiten \u2014 arbeite wann und wo du willst",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#7AA2FF]">
                    <path d="M3 7h18v10H3V7zm2 2v6h14V9H5zm7 1a2 2 0 110 4 2 2 0 010-4z" />
                  </svg>
                ),
                text: "Verdienst ab 2.000-8.000\u20AC+ pro Monat",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#7AA2FF]">
                    <path d="M16 11a4 4 0 10-3.9-4A4 4 0 0016 11zM6 11a3 3 0 10-3-3 3 3 0 003 3zm10 2c-2.7 0-8 1.4-8 4v3h16v-3c0-2.6-5.3-4-8-4zM6 13c-2.2 0-6 1.2-6 3.5V20h6v-3.5C6 15.2 6.6 14 7.7 13.2A8.8 8.8 0 006 13z" />
                  </svg>
                ),
                text: "Persoenliches Onboarding und Unterstuetzung",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                <span className="text-sm text-white/80 sm:text-base">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Countdown */}
        <div className="mb-8 rounded-2xl border border-[#7AA2FF]/20 bg-[#7AA2FF]/5 p-4 text-center backdrop-blur-xl">
          <p className="mb-2 text-sm text-white/70">
            Dein persoenliches Gespraech wartet \u2014 buche innerhalb von 24h
          </p>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold tabular-nums text-[#7AA2FF]">
            <span>{pad(hoursLeft.h)}</span>
            <span className="text-white/30">:</span>
            <span>{pad(hoursLeft.m)}</span>
            <span className="text-white/30">:</span>
            <span>{pad(hoursLeft.s)}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://cal.com/united-closing/erstgespraech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7AA2FF] to-[#A78BFA] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#7AA2FF]/20 transition hover:shadow-[#7AA2FF]/40 hover:brightness-110 sm:text-lg"
          >
            Jetzt Gespraech vereinbaren
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </a>

          <button
            onClick={() => navigate("/onboarding")}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10"
          >
            Oder direkt starten
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
