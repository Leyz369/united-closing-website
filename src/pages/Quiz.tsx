import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Types ---------- */
interface QuizQuestion {
  question: string;
  options: { label: string; score: number }[];
}

type LeadTier = "A" | "B" | "C";

/* ---------- Questions ---------- */
const QUESTIONS: QuizQuestion[] = [
  {
    question: "Hast du bereits Erfahrung im Vertrieb oder Verkauf?",
    options: [
      { label: "Ja, mehrere Jahre", score: 3 },
      { label: "Ein wenig", score: 2 },
      { label: "Nein, bin aber motiviert", score: 1 },
    ],
  },
  {
    question: "Wie viele Stunden pro Woche kannst du investieren?",
    options: [
      { label: "Vollzeit (30-40h)", score: 3 },
      { label: "Teilzeit (15-25h)", score: 2 },
      { label: "Nebenberuflich (5-15h)", score: 1 },
    ],
  },
  {
    question: "Was ist dein Einkommensziel pro Monat?",
    options: [
      { label: "5.000\u20AC+", score: 3 },
      { label: "3.000-5.000\u20AC", score: 2 },
      { label: "1.000-3.000\u20AC", score: 1 },
    ],
  },
  {
    question: "Wann moechtest du starten?",
    options: [
      { label: "Sofort", score: 3 },
      { label: "In 2-4 Wochen", score: 2 },
      { label: "Nur informieren", score: 1 },
    ],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1; // questions + contact form

function classifyLead(score: number): LeadTier {
  if (score >= 9) return "A";
  if (score >= 5) return "B";
  return "C";
}

/* ---------- Component ---------- */
export default function Quiz() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0-3 = questions, 4 = contact form
  const [scores, setScores] = useState<number[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ tier: LeadTier; score: number } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const handleOptionSelect = useCallback(
    (optionScore: number, optionIndex: number) => {
      if (selectedOption !== null) return; // prevent double-click
      setSelectedOption(optionIndex);

      // Short delay for visual feedback, then advance
      setTimeout(() => {
        setScores((prev) => [...prev, optionScore]);
        setStep((prev) => prev + 1);
        setSelectedOption(null);
      }, 350);
    },
    [selectedOption]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!form.name.trim() || !emailOk || !form.phone.trim()) return;

    setSubmitting(true);
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const tier = classifyLead(totalScore);

    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            availability: "Quiz",
            goals: `Quiz Score: ${totalScore}/12 (${tier}-Lead)`,
            quiz_score: totalScore,
          }),
        }
      );

      // GA4 event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "quiz_form",
          quiz_score: totalScore,
          lead_tier: tier,
        });
      }

      // Facebook Pixel
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", { quiz_score: totalScore });
      }

      setResult({ tier, score: totalScore });
    } catch (error) {
      console.error("Quiz submit error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- Result Screen ---------- */
  if (result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f] px-4 text-white">
        <div className="w-full max-w-lg">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-10">
            {result.tier === "A" && (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7AA2FF] to-[#A78BFA]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
                    <path d="M12 2l1.2 5.1L18 8.3l-4.3 2.6L12 16l-1.7-5.1L6 8.3l4.8-1.2L12 2z" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold">Perfekt! Du passt ideal zu uns.</h2>
                <p className="mb-6 text-white/70">
                  Dein Ergebnis: {result.score}/12 Punkte. Buche jetzt dein persoenliches Gespraech:
                </p>
                <a
                  href="https://cal.com/united-closing/erstgespraech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7AA2FF] to-[#A78BFA] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#7AA2FF]/20 transition hover:shadow-[#7AA2FF]/40 hover:brightness-110"
                >
                  Jetzt Gespraech buchen
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                  </svg>
                </a>
              </>
            )}

            {result.tier === "B" && (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7AA2FF]/70 to-[#A78BFA]/70">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white">
                    <path d="M20 6L9 17l-5-5 2-2 3 3L18 4z" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold">Gute Voraussetzungen!</h2>
                <p className="mb-6 text-white/70">
                  Dein Ergebnis: {result.score}/12 Punkte. Schau dir unser Info-Video an:
                </p>
                <button
                  onClick={() => {
                    localStorage.setItem("uc_lead_name", form.name);
                    navigate("/video");
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7AA2FF] to-[#A78BFA] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#7AA2FF]/20 transition hover:shadow-[#7AA2FF]/40 hover:brightness-110"
                >
                  Video ansehen
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                  </svg>
                </button>
              </>
            )}

            {result.tier === "C" && (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-white/70">
                    <path d="M20 6L9 17l-5-5 2-2 3 3L18 4z" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold">Danke fuer dein Interesse!</h2>
                <p className="mb-6 text-white/70">
                  Dein Ergebnis: {result.score}/12 Punkte. Wir melden uns bei dir.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10"
                >
                  Zurueck zur Startseite
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Quiz Flow ---------- */
  const isContactStep = step >= QUESTIONS.length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f] px-4 text-white">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <button onClick={() => navigate("/")} className="mb-6 transition hover:opacity-80">
            <img src="/United_closing.webp" alt="United Closing" className="mx-auto h-8 w-auto" />
          </button>
          <h1 className="text-lg font-semibold text-white/90 sm:text-xl">
            Finde heraus ob Remote-Vertrieb zu dir passt
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-white/50">
            <span>Schritt {step + 1} von {TOTAL_STEPS}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7AA2FF] to-[#A78BFA] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          {!isContactStep ? (
            /* Question Step */
            <div>
              <h2 className="mb-6 text-center text-lg font-semibold sm:text-xl">
                {QUESTIONS[step].question}
              </h2>
              <div className="grid gap-3">
                {QUESTIONS[step].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(option.score, i)}
                    disabled={selectedOption !== null}
                    className={`group relative rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200 sm:text-base ${
                      selectedOption === i
                        ? "border-[#7AA2FF]/60 bg-[#7AA2FF]/15 text-white shadow-lg shadow-[#7AA2FF]/10"
                        : "border-white/10 bg-white/5 text-white/80 hover:border-[#7AA2FF]/30 hover:bg-[#7AA2FF]/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                          selectedOption === i
                            ? "border-[#7AA2FF] bg-[#7AA2FF] text-white"
                            : "border-white/20 bg-white/5 text-white/50 group-hover:border-[#7AA2FF]/40 group-hover:text-white/70"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Contact Form Step */
            <div>
              <h2 className="mb-2 text-center text-lg font-semibold sm:text-xl">
                Fast geschafft!
              </h2>
              <p className="mb-6 text-center text-sm text-white/60">
                Trage deine Daten ein, damit wir dein Ergebnis auswerten koennen.
              </p>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-white/80">Dein Name *</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#7AA2FF]/45 focus:ring-4 focus:ring-[#7AA2FF]/10"
                    placeholder="Max Mustermann"
                    required
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-white/80">Deine E-Mail *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#7AA2FF]/45 focus:ring-4 focus:ring-[#7AA2FF]/10"
                    placeholder="max@mail.de"
                    required
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-white/80">Deine Telefonnummer *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#7AA2FF]/45 focus:ring-4 focus:ring-[#7AA2FF]/10"
                    placeholder="+49 170 1234567"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#7AA2FF] to-[#A78BFA] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#7AA2FF]/20 transition hover:shadow-[#7AA2FF]/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                >
                  {submitting ? "Wird ausgewertet..." : "Ergebnis anzeigen"}
                </button>

                <div className="flex items-start gap-2 text-xs text-white/50">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#7AA2FF]">
                    <path d="M7 10V8a5 5 0 0110 0v2h1a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h1zm2 0h6V8a3 3 0 00-6 0v2z" />
                  </svg>
                  <span>Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.</span>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Back button for question steps */}
        {step > 0 && !isContactStep && (
          <button
            onClick={() => {
              setScores((prev) => prev.slice(0, -1));
              setStep((prev) => prev - 1);
              setSelectedOption(null);
            }}
            className="mx-auto mt-4 flex items-center gap-1 text-xs text-white/40 transition hover:text-white/60"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 rotate-180">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
            Zurueck
          </button>
        )}
      </div>
    </div>
  );
}
