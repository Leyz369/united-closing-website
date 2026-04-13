import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AGENT_ID = "agent_3501kp3rf54xe05t71e1df6p1kd3";

export default function VideoPage() {
  const navigate = useNavigate();
  const [leadName, setLeadName] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [hoursLeft, setHoursLeft] = useState({ h: 23, m: 59, s: 59 });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLeadName(localStorage.getItem("uc_lead_name") || "");
    setSubmissionId(localStorage.getItem("uc_submission_id") || "");
  }, []);

  // Mark video as watched
  useEffect(() => {
    const id = localStorage.getItem("uc_submission_id");
    if (id) {
      fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-webhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ submission_id: id, video_watched: true }),
      }).catch(() => {});
    }
  }, []);

  // Load ElevenLabs widget script
  useEffect(() => {
    const existing = document.querySelector('script[src*="elevenlabs/convai-widget"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // 24h countdown
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
      setHoursLeft({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f] text-white">
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

        {/* Video Embed — Dummy/Placeholder */}
        <div className="relative mx-auto mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="relative aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="United Closing Info Video"
            />
          </div>
        </div>

        {/* What to expect */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <h2 className="mb-5 text-lg font-semibold sm:text-xl">Was dich erwartet:</h2>
          <ul className="space-y-4">
            {[
              { text: "Flexible Arbeitszeiten — arbeite wann und wo du willst" },
              { text: "Verdienst ab 2.000-8.000\u20AC+ pro Monat" },
              { text: "Persoenliches Onboarding und Unterstuetzung" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#7AA2FF]">
                    <path d="M20 6L9 17l-5-5 2-2 3 3L18 4z" />
                  </svg>
                </span>
                <span className="text-sm text-white/80 sm:text-base">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Agent Chat Section */}
        <div className="mb-10 rounded-2xl border border-[#7AA2FF]/20 bg-[#7AA2FF]/5 p-6 text-center backdrop-blur-xl sm:p-8">
          <h2 className="mb-2 text-lg font-semibold sm:text-xl">
            Sprich kurz mit Vito — unserem KI-Assistenten
          </h2>
          <p className="mb-4 text-sm text-white/70">
            Vito stellt dir ein paar kurze Fragen, damit wir das Erstgespraech optimal fuer dich vorbereiten koennen.
          </p>
          <div className="flex justify-center">
            <div ref={widgetRef}>
              {/* @ts-expect-error ElevenLabs custom element */}
              <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-8 rounded-2xl border border-[#7AA2FF]/20 bg-[#7AA2FF]/5 p-4 text-center backdrop-blur-xl">
          <p className="mb-2 text-sm text-white/70">
            Dein persoenliches Gespraech wartet — buche innerhalb von 24h
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
            Jetzt Erstgespraech buchen
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </a>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10"
          >
            Zurueck zur Startseite
          </button>
        </div>
      </main>
    </div>
  );
}
