import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AGENT_ID = "agent_3501kp3rf54xe05t71e1df6p1kd3";

export default function VideoPage() {
  const navigate = useNavigate();
  const [leadName, setLeadName] = useState("");
  const [hoursLeft, setHoursLeft] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    setLeadName(localStorage.getItem("uc_lead_name") || "");
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

  // Load ElevenLabs widget
  useEffect(() => {
    if (!document.querySelector('script[src*="elevenlabs/convai-widget"]')) {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // 24h countdown
  useEffect(() => {
    const stored = localStorage.getItem("uc_countdown_expiry");
    const expiry = stored ? parseInt(stored, 10) : (() => {
      const e = Date.now() + 86_400_000;
      localStorage.setItem("uc_countdown_expiry", String(e));
      return e;
    })();
    const tick = () => {
      const d = Math.max(0, expiry - Date.now());
      setHoursLeft({
        h: Math.floor(d / 3_600_000),
        m: Math.floor((d % 3_600_000) / 60_000),
        s: Math.floor((d % 60_000) / 1_000),
      });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#06070A] text-white selection:bg-white/20">
      {/* Background glow — same as landing page */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-22%] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[#7AA2FF]/20 blur-[200px] opacity-60" />
        <div className="absolute right-[-14%] top-[6%] h-[520px] w-[520px] rounded-full bg-[#2EE9C6]/15 blur-[180px] opacity-60" />
        <div className="absolute bottom-[-22%] left-[6%] h-[680px] w-[680px] rounded-full bg-[#A78BFA]/15 blur-[220px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/25 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-white/5 transition">
            <img src="/United_closing.webp" alt="United Closing" className="h-7 w-auto" />
          </button>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#2EE9C6]">
              <path d="M7 10V8a5 5 0 0110 0v2h1a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h1zm2 0h6V8a3 3 0 00-6 0v2z" />
            </svg>
            100% kostenlos & unverbindlich
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-block rounded-full border border-[#7AA2FF]/20 bg-[#7AA2FF]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#7AA2FF] backdrop-blur-sm">
            Dein naechster Schritt
          </div>
          <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {leadName ? (
              <>
                <span className="text-[#2EE9C6]">{leadName}</span>, schau dir kurz an,
              </>
            ) : (
              "Schau dir kurz an,"
            )}
            <br />
            was wir machen & was du verdienen kannst.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-white/60 sm:text-lg">
            In diesem Video erfaehrst du, wie unser Remote-Modell funktioniert — und warum hunderte Menschen bereits erfolgreich damit arbeiten.
          </p>
        </div>

        {/* Video Card */}
        <div className="relative mx-auto mb-12 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl shadow-2xl shadow-[#7AA2FF]/5">
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="United Closing Info Video"
            />
          </div>
        </div>

        {/* Key Points */}
        <div className="mx-auto mb-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm7.9 9H16.7a15.6 15.6 0 00-1.2-6 8.03 8.03 0 014.4 6zM12 4c1 1.4 1.8 3.6 2.2 7H9.8C10.2 7.6 11 5.4 12 4z", title: "Ortsunabhaengig", desc: "Arbeite von ueberall — Homeoffice, Cafe oder Bali" },
            { icon: "M3 7h18v10H3V7zm2 2v6h14V9H5zm7 1a2 2 0 110 4 2 2 0 010-4z", title: "2.000–8.000\u20AC+/Monat", desc: "Performance-basiert — je nach Einsatz und Modell" },
            { icon: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 11h4v-2h-3V6h-2z", title: "Flexible Zeiten", desc: "Vollzeit oder nebenberuflich — du entscheidest" },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-[#7AA2FF]/20 hover:bg-white/[0.07]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#7AA2FF]">
                  <path d={item.icon} />
                </svg>
              </div>
              <div className="text-sm font-semibold text-white">{item.title}</div>
              <div className="mt-1 text-xs text-white/50">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Agent Section */}
        <div className="mx-auto mb-12 max-w-3xl rounded-3xl border border-[#7AA2FF]/15 bg-gradient-to-b from-[#7AA2FF]/5 to-transparent p-8 text-center backdrop-blur-xl sm:p-10">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            <span className="h-2 w-2 rounded-full bg-[#2EE9C6] animate-pulse" />
            KI-Assistent online
          </div>
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">
            Sprich kurz mit <span className="text-[#7AA2FF]">Vito</span>
          </h2>
          <p className="mb-6 text-sm text-white/60">
            Vito stellt dir 2–3 kurze Fragen, damit wir das Erstgespraech perfekt fuer dich vorbereiten koennen. Dauert nur 2 Minuten.
          </p>
          <div className="flex justify-center">
            {/* @ts-expect-error ElevenLabs custom element */}
            <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
          </div>
        </div>

        {/* Countdown + CTA */}
        <div className="mx-auto max-w-3xl">
          {/* Countdown */}
          <div className="mb-6 rounded-2xl border border-[#A78BFA]/15 bg-[#A78BFA]/5 p-5 text-center backdrop-blur-xl">
            <p className="mb-2 text-sm text-white/60">
              Dein Platz ist fuer <span className="font-semibold text-white">24 Stunden</span> reserviert
            </p>
            <div className="flex items-center justify-center gap-3 text-3xl font-bold tabular-nums">
              <div className="rounded-xl bg-white/5 px-4 py-2 text-[#7AA2FF]">{pad(hoursLeft.h)}</div>
              <span className="text-white/20">:</span>
              <div className="rounded-xl bg-white/5 px-4 py-2 text-[#7AA2FF]">{pad(hoursLeft.m)}</div>
              <span className="text-white/20">:</span>
              <div className="rounded-xl bg-white/5 px-4 py-2 text-[#7AA2FF]">{pad(hoursLeft.s)}</div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://cal.com/united-closing/erstgespraech"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#7AA2FF] to-[#A78BFA] px-8 py-5 text-lg font-bold text-white shadow-xl shadow-[#7AA2FF]/20 transition-all duration-300 hover:shadow-[#7AA2FF]/40 hover:brightness-110 sm:text-xl"
          >
            Jetzt Erstgespraech buchen
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 transition-transform group-hover:translate-x-1">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </a>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#2EE9C6]">
                <path d="M20 6L9 17l-5-5 2-2 3 3L18 4z" />
              </svg>
              15–20 Min.
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#2EE9C6]">
                <path d="M20 6L9 17l-5-5 2-2 3 3L18 4z" />
              </svg>
              Kostenlos
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#2EE9C6]">
                <path d="M20 6L9 17l-5-5 2-2 3 3L18 4z" />
              </svg>
              Unverbindlich
            </span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mx-auto mt-8 flex items-center gap-1 text-sm text-white/40 transition hover:text-white/60"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 rotate-180">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
            Zurueck zur Startseite
          </button>
        </div>
      </main>
    </div>
  );
}
