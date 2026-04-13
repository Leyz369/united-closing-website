/*
  Ultra-moderne Landingpage (Remote-Arbeitsplätze) – Single-File React Component
  - Conversion-optimiert
  - Dark/Light-fähig (auto via prefers-color-scheme)
  - Responsive
  - Moderne UI: Glassmorphism, Gradient-Glow, Blur, Micro-Animations
  - Sections: Hero, Vorteile, Verdienstmöglichkeiten, Testimonials, Prozess, FAQ, CTA, Footer
  - Form-CTA mit Erstgespräch (Front-end only)
*/

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instagram } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import SyntheticHero from "@/components/ui/synthetic-hero";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { trackFormSubmitSuccess } from "@/lib/analytics";
import { InstagramFeed } from "@/components/InstagramFeed";

type FAQ = { q: string; a: string };
type Testimonial = { name: string; role: string; quote?: string; highlight: string; image?: string; quoteImage?: string };

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

function Icon({
  name,
  className,
}: {
  name:
    | "spark"
    | "shield"
    | "clock"
    | "globe"
    | "arrow"
    | "check"
    | "stars"
    | "money"
    | "bolt"
    | "chat"
    | "lock"
    | "users";
  className?: string;
}) {
  const common = "inline-block";
  const paths: Record<string, JSX.Element> = {
    spark: (
      <path d="M12 2l1.2 5.1L18 8.3l-4.3 2.6L12 16l-1.7-5.1L6 8.3l4.8-1.2L12 2z" />
    ),
    shield: (
      <path d="M12 2l8 4v6c0 5-3.4 9.6-8 10-4.6-.4-8-5-8-10V6l8-4z" />
    ),
    clock: (
      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 11h4v-2h-3V6h-2z" />
    ),
    globe: (
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.9 9H16.7a15.6 15.6 0 00-1.2-6 8.03 8.03 0 014.4 6zM12 4c1 1.4 1.8 3.6 2.2 7H9.8C10.2 7.6 11 5.4 12 4zM4.1 11a8.03 8.03 0 014.4-6 15.6 15.6 0 00-1.2 6H4.1zm0 2h3.2a15.6 15.6 0 001.2 6 8.03 8.03 0 01-4.4-6zM12 20c-1-1.4-1.8-3.6-2.2-7h4.4c-.4 3.4-1.2 5.6-2.2 7zm3.5-1a15.6 15.6 0 001.2-6h3.2a8.03 8.03 0 01-4.4 6z" />
    ),
    arrow: (
      <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
    ),
    check: <path d="M20 6L9 17l-5-5 2-2 3 3L18 4z" />,
    stars: (
      <path d="M12 2l1.5 4.8L18 8l-4.5 1.2L12 14l-1.5-4.8L6 8l4.5-1.2L12 2zm7 10l.9 2.7L22 16l-2.1.6L19 19l-.9-2.4L16 16l2.1-.6L19 12zM2 12l.9 2.7L5 16l-2.1.6L2 19l-.9-2.4L0 16l2.1-.6L2 12z" />
    ),
    money: (
      <path d="M3 7h18v10H3V7zm2 2v6h14V9H5zm7 1a2 2 0 110 4 2 2 0 010-4z" />
    ),
    bolt: (
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    ),
    chat: (
      <path d="M4 4h16v10H7l-3 3V4zm3 3h10v2H7V7zm0 4h7v2H7v-2z" />
    ),
    lock: (
      <path d="M7 10V8a5 5 0 0110 0v2h1a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h1zm2 0h6V8a3 3 0 00-6 0v2z" />
    ),
    users: (
      <path d="M16 11a4 4 0 10-3.9-4A4 4 0 0016 11zM6 11a3 3 0 10-3-3 3 3 0 003 3zm10 2c-2.7 0-8 1.4-8 4v3h16v-3c0-2.6-5.3-4-8-4zM6 13c-2.2 0-6 1.2-6 3.5V20h6v-3.5C6 15.2 6.6 14 7.7 13.2A8.8 8.8 0 006 13z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={cx(common, className)}
      fill="currentColor"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

function Toast({
  open,
  onClose,
  title,
  description,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] w-[min(520px,92vw)] -translate-x-1/2">
      <div className="rounded-2xl border border-white/10 bg-black/70 p-4 text-white shadow-2xl backdrop-blur-xl dark:bg-black/70">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-white/10 p-2">
            <Icon name="check" className="h-5 w-5 text-[#7AA2FF]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{title}</div>
            {description ? (
              <div className="mt-1 text-sm text-white/75">{description}</div>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xs text-white/70 hover:text-white"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}

function Pill({ children, purple }: { children: React.ReactNode; purple?: boolean }) {
  return (
    <span className={cx(
      "inline-flex items-center rounded-full border bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-md",
      purple ? "border-[#A78BFA]/30" : "border-white/10"
    )}>
      {children}
    </span>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <GlowingEffect
      variant="silver"
      disabled={false}
      proximity={60}
      spread={20}
      blur={1}
      borderWidth={1}
      movementDuration={1.8}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <div className="text-xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/70">{label}</div>
    </GlowingEffect>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7AA2FF]/80">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-pretty text-base text-white/70 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <GlowingEffect
      variant="silver"
      disabled={false}
      proximity={80}
      spread={25}
      blur={2}
      borderWidth={1.5}
      movementDuration={1.5}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[#7AA2FF]/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
          {icon}
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="mt-2 text-sm leading-relaxed text-white/70">{text}</div>
        </div>
      </div>
    </GlowingEffect>
  );
}

function ToggleFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <GlowingEffect
            key={i}
            variant="silver"
            disabled={false}
            proximity={70}
            spread={22}
            blur={2}
            borderWidth={1}
            movementDuration={1.6}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-white">{f.q}</span>
              <span
                className={cx(
                  "grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/10 text-[#7AA2FF] transition-transform",
                  isOpen && "rotate-90"
                )}
              >
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </button>
            <div
              className={cx(
                "px-5 pb-5 text-sm leading-relaxed text-white/70",
                !isOpen && "hidden"
              )}
            >
              {f.a}
            </div>
          </GlowingEffect>
        );
      })}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <GlowingEffect
      variant="silver"
      disabled={false}
      proximity={80}
      spread={30}
      blur={3}
      borderWidth={2}
      movementDuration={1.2}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#7AA2FF]/20"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#7AA2FF]/0 via-[#7AA2FF]/80 to-[#2EE9C6]/40" />
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#7AA2FF]/15 blur-3xl transition-all duration-700 group-hover:scale-150" />
      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#2EE9C6]/10 blur-3xl transition-all duration-700 group-hover:scale-150" />

      <div className="relative p-4 md:p-6">
        {t.image && (
          <div className="mb-4 md:mb-5 h-64 md:h-96 overflow-hidden rounded-2xl bg-white/5">
            <img
              src={t.image}
              alt={t.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        )}

        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-white">{t.name}</div>
            <div className="mt-1 text-sm text-white/60">{t.role}</div>
          </div>
          <div className="rounded-full bg-gradient-to-br from-[#7AA2FF]/20 to-[#2EE9C6]/20 px-3 py-1.5 text-xs font-semibold text-[#7AA2FF] backdrop-blur-sm border border-[#7AA2FF]/30">
            {t.highlight}
          </div>
        </div>

        {t.quoteImage ? (
          <div className="overflow-hidden rounded-xl">
            <img
              src={t.quoteImage}
              alt={`${t.name} Testimonial`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>
        ) : t.quote ? (
          <p className="text-sm leading-relaxed text-white/80">&bdquo;{t.quote}&ldquo;</p>
        ) : null}

        <div className="mt-5 flex items-center gap-1.5 text-[#7AA2FF]">
          <Icon name="stars" className="h-5 w-5 drop-shadow-[0_0_8px_rgba(122,162,255,0.5)]" />
          <Icon name="stars" className="h-5 w-5 drop-shadow-[0_0_8px_rgba(122,162,255,0.5)]" />
          <Icon name="stars" className="h-5 w-5 drop-shadow-[0_0_8px_rgba(122,162,255,0.5)]" />
          <Icon name="stars" className="h-5 w-5 drop-shadow-[0_0_8px_rgba(122,162,255,0.5)]" />
          <Icon name="stars" className="h-5 w-5 drop-shadow-[0_0_8px_rgba(122,162,255,0.5)]" />
        </div>
      </div>
    </GlowingEffect>
  );
}

function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Modal schließen"
      />
      <GlowingEffect
        variant="silver"
        disabled={false}
        proximity={100}
        spread={30}
        blur={3}
        borderWidth={2}
        movementDuration={1.2}
        className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0D14]/90 text-white shadow-2xl backdrop-blur-xl"
      >
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="hidden lg:block relative overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Professionelles Remote-Arbeiten mit Skyline-Blick"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#7AA2FF]/20 via-transparent to-black/40" />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-base font-semibold">{title}</div>
                <div className="mt-1 text-sm text-white/65">
                  Nur 3 Felder ausfüllen – wir melden uns innerhalb von 24h.
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/15"
              >
                Schließen
              </button>
            </div>
            <div className="mt-5">{children}</div>
            <div className="mt-5 text-xs text-white/50">
              Mit dem Absenden stimmst du zu, dass wir dich zum Zweck der Terminabstimmung
              kontaktieren. Keine Weitergabe an Dritte.
            </div>
          </div>
        </div>
      </GlowingEffect>
    </div>
  );
}

export default function RemoteJobsLandingpageUltraModern() {
  const reducedMotion = usePrefersReducedMotion();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; title: string; desc?: string }>({
    open: false,
    title: "",
    desc: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 600;
      setShowMobileCTA(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs: FAQ[] = useMemo(
    () => [
      {
        q: "Brauche ich Vorkenntnisse, um remote zu starten?",
        a: "Nein. Viele Einstiegsmodelle sind auch für Quereinsteiger geeignet. Wichtig sind Zuverlässigkeit, Lernbereitschaft und ein klarer Plan. Im Erstgespräch finden wir den passenden Einstieg für dich.",
      },
      {
        q: "Wie schnell kann ich erste Einnahmen erzielen?",
        a: "Es geht um reale Remote-Tätigkeiten für renommierte Unternehmen und Dienstleister – keine leeren Versprechen. Wir sprechen offen über Aufwand, Timeline und realistische Erwartungen.",
      },
      {
        q: "Kann ich neben meinem Job starten?",
        a: "Ja. Viele starten nebenberuflich und skalieren später. Wir richten die Schritte so aus, dass es in deinen Alltag passt.",
      },
      {
        q: "Was kostet das Erstgespräch?",
        a: "Nichts. Es ist kostenlos und unverbindlich. Ziel ist Klarheit: passt es – und wenn ja, wie sieht dein sinnvoller Start aus?",
      },
      {
        q: 'Ist das seriös oder ein "Schnell-reich"-Ding?',
        a: "Es geht um reale Remote-Tätigkeiten und marktnachgefragte Modelle – keine leeren Versprechen. Wir sprechen offen über Aufwand, Timeline und realistische Erwartungen.",
      },
    ],
    []
  );

  const testimonials: Testimonial[] = useMemo(
    () => [
      {
        name: "Omar S.",
        role: "24 Jahre",
        highlight: "mehr Freiheit",
        quoteImage: "/whatsapp_times_edited_10_40_10_43_done.webp",
        image: "/hf_20260212_134311_00ebd0e4-1558-48f7-8c6c-ae1dd5eedc52.webp",
      },
      {
        name: "Bert",
        role: "39 Jahre",
        highlight: "skalierbares Einkommen",
        quoteImage: "/whatsapp_times_edited.webp",
        image: "/hf_20260212_173652_4f6fa683-056b-45ba-ae18-667255c420af.webp",
      },
      {
        name: "Sarah",
        role: "29 • Quereinsteigerin",
        highlight: "strukturierter Einstieg",
        quoteImage: "/WhatsApp_Image_2026-02-12_at_20.14.20.webp",
        image: "/hf_20260212_180933_cc0d0342-4937-4324-956a-6453f6c666c3.webp",
      },
    ],
    []
  );

  const earningOptions = useMemo(
    () => [
      {
        title: "Online-Sales & Beratung",
        text:
          "Performance-orientierte Tätigkeiten mit starkem Upside – ideal, wenn du gerne kommunizierst und Ziele magst.",
        icon: <Icon name="money" className="h-5 w-5 text-[#7AA2FF]" />,
      },
      {
        title: "Digitale Assistenz & Projekte",
        text:
          "Planbares Einkommen durch strukturierte Aufgaben: Koordination, Orga, Termine, Kundenkommunikation.",
        icon: <Icon name="clock" className="h-5 w-5 text-[#7AA2FF]" />,
      },
      {
        title: "Content & Social Media",
        text:
          "Kreative Remote-Aufgaben rund um Inhalte, Posting, Community, Text – mit wachsender Nachfrage.",
        icon: <Icon name="spark" className="h-5 w-5 text-[#7AA2FF]" />,
      },
      {
        title: "Recruiting & Partner-Modelle",
        text:
          "Remote Rollen mit Skalierungspotenzial: Vorqualifizierung, Terminierung, Prozessunterstützung.",
        icon: <Icon name="users" className="h-5 w-5 text-[#7AA2FF]" />,
      },
    ],
    []
  );

  function openCTA() {
    window.open('https://cal.com/jan-freude/remote-karriere-check-mit-united-closing', '_blank', 'noopener,noreferrer');
    setMobileMenu(false);
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    setMobileMenu(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!form.name.trim() || !emailOk || !form.phone.trim()) {
      setToast({
        open: true,
        title: "Bitte prüfe deine Angaben",
        desc: "Name, E-Mail und Telefon sind erforderlich.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            ...form,
            availability: "Nebenberuflich",
            goals: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      trackFormSubmitSuccess("erstgespraech_anfrage");

      // Lead-ID + Name in localStorage fuer VideoPage
      const responseData = await response.json();
      if (responseData.submissionId) {
        localStorage.setItem("uc_submission_id", responseData.submissionId);
      }
      localStorage.setItem("uc_lead_name", form.name.split(" ")[0]);

      setModalOpen(false);
      setForm({ name: "", email: "", phone: "" });

      // Redirect zu Video-Seite statt nur Toast
      navigate("/video");
    } catch (error) {
      console.error("Error submitting form:", error);
      setToast({
        open: true,
        title: "Ups! Da ist etwas schiefgelaufen.",
        desc: "Bitte versuche es in wenigen Minuten erneut oder kontaktiere uns direkt per E-Mail.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#06070A] text-white selection:bg-white/20">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-22%] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[#7AA2FF]/20 blur-[200px] opacity-60" />
        <div className="absolute right-[-14%] top-[6%] h-[520px] w-[520px] rounded-full bg-[#2EE9C6]/15 blur-[180px] opacity-60" />
        <div className="absolute bottom-[-22%] left-[6%] h-[680px] w-[680px] rounded-full bg-[#A78BFA]/15 blur-[220px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      <header className="relative sticky top-0 z-40 border-b border-white/10 bg-black/25 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => scrollToId("top")}
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-white/5 flex-shrink-0"
            aria-label="Zur Startseite"
          >
            <img src="/United_closing.webp" alt="United Closing Logo" className="h-8 w-auto sm:h-10" width="2262" height="433" />
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              ["Vorteile", "benefits"],
              ["Über uns", "about"],
              ["Verdienst", "earning"],
              ["Erfolge", "testimonials"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/5 hover:text-white"
              >
                {label}
              </button>
            ))}
            <GetStartedButton
              onClick={openCTA}
              trackingLocation="header"
              className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold"
            >
              Erstgespräch sichern
            </GetStartedButton>
            <a
              href="https://www.instagram.com/united_closing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 rounded-xl p-2 text-white/75 hover:bg-white/5 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="/admin"
              className="ml-1 rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              Login
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="https://www.instagram.com/united_closing"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 p-2 text-white/75 hover:bg-white/15 hover:text-white transition-colors flex-shrink-0"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <button
              className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15 flex-shrink-0"
              onClick={() => setMobileMenu((v) => !v)}
            >
              Menü
            </button>
          </div>
        </div>

        {mobileMenu ? (
          <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-3">
              <div className="grid gap-2">
                {[
                  ["Vorteile", "benefits"],
                  ["Über uns", "about"],
                  ["Verdienst", "earning"],
                  ["Erfolge", "testimonials"],
                  ["FAQ", "faq"],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollToId(id)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={openCTA}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold hover:bg-white/15"
                >
                  Erstgespräch sichern
                </button>
                <a
                  href="https://www.instagram.com/united_closing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href="/admin"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/60 hover:bg-white/10"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <SyntheticHero
          title="Arbeite von überall – und baue dir ein attraktives Online-Einkommen auf"
          description="Ein Remote-Business, das zu dir passt: Von überall aus arbeiten, flexible Zeiten und echte Perspektiven. Wir zeigen dir reale Remote-Modelle, die auf deinen Alltag und deine Ziele abgestimmt sind – inklusive klarem Einstiegspfad."
          logo="/United_closing.webp"
          ctaButtons={[
            { text: "Jetzt kostenloses Erstgespräch sichern", primary: true, onClick: openCTA, trackingLocation: "hero" },
          ]}
          microDetails={[
            "Ortsunabhängig arbeiten – von überall",
            "Vollzeit oder nebenberuflich möglich",
            "Persönliche Begleitung im Erstgespräch",
          ]}
          ctaMicrocopy="15-20 Min. • Kostenlos & unverbindlich • Antwort innerhalb 24h"
        />

        <section id="benefits" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <SectionTitle
            eyebrow="Warum Remote?"
            title="Mehr Freiheit – Mehr Einkommen."
            subtitle="Remote-Arbeiten funktioniert dann richtig gut, wenn du ein klares Modell, eine Struktur und einen realistischen Plan hast."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Card
              icon={<Icon name="globe" className="h-5 w-5 text-[#7AA2FF]" />}
              title="Ortsunabhängigkeit"
              text="Arbeite im Homeoffice oder von überall – du entscheidest, wo dein Arbeitsplatz ist."
            />
            <Card
              icon={<Icon name="clock" className="h-5 w-5 text-[#7AA2FF]" />}
              title="Flexible Zeiten"
              text="Vollzeit oder nebenberuflich: Du wählst ein Modell, das zu deinem Alltag passt."
            />
            <Card
              icon={<Icon name="money" className="h-5 w-5 text-[#7AA2FF]" />}
              title="Einkommenspotenzial"
              text="Je nach Modell und Einsatz sind skalierbare Verdienste möglich – ohne leere Versprechen."
            />
            <Card
              icon={<Icon name="shield" className="h-5 w-5 text-[#7AA2FF]" />}
              title="Seriös & klar"
              text='Kein "Schnell-reich". Wir sprechen offen über Aufwand, Timeline und realistische Schritte.'
            />
            <Card
              icon={<Icon name="spark" className="h-5 w-5 text-[#7AA2FF]" />}
              title="Skills, die bleiben"
              text="Digitale Tätigkeiten sind zukunftssicher – du baust wertvolle Kompetenzen auf."
            />
            <Card
              icon={<Icon name="chat" className="h-5 w-5 text-[#7AA2FF]" />}
              title="Persönliche Begleitung"
              text="Im Erstgespräch beantworten wir deine Fragen und besprechen deinen optimalen Einstieg."
            />
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <SectionTitle
            eyebrow="Über uns"
            title="Das Team hinter United Closing."
            subtitle="Wir begleiten Menschen auf dem Weg in die Remote-Arbeitswelt – mit Klarheit, Struktur und Ehrlichkeit."
          />

          <div className="mt-10">
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#7AA2FF]/20 blur-3xl opacity-40" />
              <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#2EE9C6]/15 blur-3xl opacity-40" />

              <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="/3_final_seite_(2).webp"
                    alt="United Closing Team"
                    loading="lazy"
                    decoding="async"
                    width="1074"
                    height="1074"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                    Erfahrung trifft Struktur
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/70">
                    Wir vermarkten Produkte und Dienstleistungen namenhafter Unternehmen aus der DACH Region. Unser Fokus liegt darauf, Mehrwerte für unsere Auftraggeber, Mitarbeiter und Geschäftspartner zu schaffen. Über 150.000 vermittelte Geschäftsabschlüsse und mehr als 10 Jahre Erfahrung im Sales Bereich sprechen für uns.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-white/70">
                    Während unserer jahrelangen Tätigkeit im Sales Business haben wir hunderte Menschen begleitet. Unser Ansatz: klare Strategien, persönliche Betreuung und ein Plan, der zu deinem Leben passt.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill>
                      <Icon name="users" className="mr-2 h-4 w-4 text-[#7AA2FF]" />
                      Erfahrenes Team
                    </Pill>
                    <Pill>
                      <Icon name="shield" className="mr-2 h-4 w-4 text-[#7AA2FF]" />
                      Seriös & transparent
                    </Pill>
                    <Pill>
                      <Icon name="spark" className="mr-2 h-4 w-4 text-[#7AA2FF]" />
                      Praxisnah
                    </Pill>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-white/5">
                <img
                  src="/julian_Final.webp"
                  alt="Team Mitglied 1"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-white">Julian</h4>
                <div className="mt-1 text-sm text-[#7AA2FF]">Steuerung & Strategie</div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Experte für den Aufbau von Vertriebsstrukturen und Skalierungsstrategien. Über 10 Jahre Erfahrung in der Business-Administration.
                </p>
              </div>
            </GlowingEffect>

            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-white/5">
                <img
                  src="/jan_final.webp"
                  alt="Team Mitglied 2"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-white">Jan</h4>
                  <a
                    href="https://instagram.com/leyz_369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 transition-colors hover:text-[#7AA2FF]"
                    aria-label="Jan auf Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
                <div className="mt-1 text-sm text-[#7AA2FF]">Operations & Marketing</div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Spezialisiert auf Prozessoptimierung und Marketing Strategien. Über 8 Jahre Erfahrung im Bereich Sales und Marketing.
                </p>
              </div>
            </GlowingEffect>

            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-white/5">
                <img
                  src="/cenk_final.webp"
                  alt="Team Mitglied 3"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-white">Cenk</h4>
                <div className="mt-1 text-sm text-[#7AA2FF]">Vertrieb & Training</div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Verantwortlich für Schulungen und Skill-Aufbau. Cenk hilft dir, die nötigen Kompetenzen schnell zu entwickeln.
                </p>
              </div>
            </GlowingEffect>
          </div>

          <div className="mt-10 flex justify-center">
            <GetStartedButton
              onClick={openCTA}
              trackingLocation="about_section"
              className="px-6 py-3 rounded-2xl text-sm font-semibold"
            >
              Zum Erstgespräch
            </GetStartedButton>
          </div>
        </section>

        <section id="earning" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <SectionTitle
            eyebrow="Verdienstmöglichkeiten"
            title="Wähle das Modell, das zu dir passt."
            subtitle='Du musst nicht "alles" können. Entscheidend ist das passende Setup und eine saubere Umsetzung.'
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
            <div className="grid gap-5 sm:grid-cols-2">
              {earningOptions.map((o) => (
                <Card key={o.title} icon={o.icon} title={o.title} text={o.text} />
              ))}
            </div>

            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:sticky lg:top-24"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/522bb5be-0eea-42fc-b663-26cc9f605d3e.webp"
                  alt="Remote arbeiten von überall - im Auto, Café oder Homeoffice"
                  loading="lazy"
                  decoding="async"
                  width="965"
                  height="721"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-semibold text-white">Arbeite von überall</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  Im Auto, im Café, im Homeoffice – du entscheidest, wo dein Arbeitsplatz ist.
                  Maximale Flexibilität für deinen Lifestyle.
                </div>
              </div>
            </GlowingEffect>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold">Wichtig:</div>
                <div className="mt-1 text-sm text-white/70">
                  Wir versprechen keine Fantasie-Zahlen. Im Gespräch klären wir realistische Erwartungen
                  – basierend auf Zeit, Skills und Modell.
                </div>
              </div>
              <GetStartedButton
                onClick={openCTA}
                trackingLocation="earning_section"
                className="px-5 py-3 rounded-2xl text-sm font-semibold"
              >
                Modelle prüfen im Erstgespräch
              </GetStartedButton>
            </div>
          </div>
        </section>

        <section id="testimonials" className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-[48px]">
            <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#7AA2FF]/10 blur-[120px]" />
            <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-[#2EE9C6]/10 blur-[120px]" />
          </div>

          <div className="relative rounded-[48px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-12 backdrop-blur-sm">
            <SectionTitle
              eyebrow="Erfolgsgeschichten"
              title="Menschen, die den Schritt schon gegangen sind."
              subtitle="Keine Perfektion nötig. Aber ein Plan, der zu dir passt."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* <InstagramFeed /> — aktivieren sobald Instagram API Token vorhanden */}

        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute right-1/3 top-0 h-[400px] w-[400px] rounded-full bg-[#2EE9C6]/10 blur-[100px]" />
          </div>

          <div className="text-center mb-12">
            <div className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm mb-4">
              Live aus der Praxis
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Auszug aus einem unserer Projekte
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Echte Ergebnisse, echte Menschen. So sieht der Alltag in unserem Team aus.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
              <div className="relative aspect-[9/19.5] overflow-hidden">
                <img
                  src="/WhatsApp_Image_2026-02-12_at_19.07.43.webp"
                  alt="Team Tagesergebnisse"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
              <div className="relative aspect-[9/19.5] overflow-hidden">
                <img
                  src="/WhatsApp_Image_2026-02-12_at_19.07.43_(1).webp"
                  alt="Team Performance Updates"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <SectionTitle
            eyebrow="So läuft's ab"
            title="In 3 klaren Schritten zum Remote-Start."
            subtitle="Kurz, verständlich, ohne Overload."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] items-start">
            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:sticky lg:top-24"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/d3e6d2b4-9f8c-4a91-9be5-95511aa3dec9.webp"
                  alt="Remote arbeiten aus dem Hotel oder Café - Flexibles Arbeiten von überall"
                  loading="lazy"
                  decoding="async"
                  width="1016"
                  height="759"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-semibold text-white">Professionell & flexibel</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  Arbeite aus Hotels, Cafés oder Co-Working-Spaces – mit dem richtigen Setup ist dein Office überall.
                </div>
              </div>
            </GlowingEffect>

            <div className="grid gap-5">
              {[
                {
                  step: "1",
                  title: "Erstgespräch (15–20 min)",
                  text: "Wir klären Ziele, Zeit, Erfahrung – und welches Remote-Modell zu dir passt.",
                  icon: "chat" as const,
                },
                {
                  step: "2",
                  title: "Einstiegspfad definieren",
                  text: "Du bekommst einen klaren Plan für die nächsten 7–14 Tage.",
                  icon: "bolt" as const,
                },
                {
                  step: "3",
                  title: "Umsetzung & Optimierung",
                  text: "Du setzt um, wir justieren nach – so ist dein Erfolg garantiert.",
                  icon: "spark" as const,
                },
              ].map((x) => (
                <div
                  key={x.step}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl opacity-40" />
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 text-sm font-semibold">
                        {x.step}
                      </div>
                      <div className="text-base font-semibold">{x.title}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <Icon name={x.icon} className="h-5 w-5 text-[#7AA2FF]" />
                    </div>
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-white/70">{x.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <GetStartedButton
              onClick={openCTA}
              trackingLocation="process_section"
              className="px-6 py-3 rounded-2xl text-sm font-semibold"
            >
              Erstgespräch starten
            </GetStartedButton>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Fragen, die fast immer kommen."
            subtitle="Kurz beantwortet – damit du sicher entscheiden kannst."
          />
          <ToggleFAQ faqs={faqs} />
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 pt-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-stretch">
            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="group overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
                <img
                  src="/5edb0c5b-466d-4db6-ad03-1870bb833ad2-2.webp"
                  alt="Professionelles Remote-Arbeiten - Erfolgreicher Business-Lifestyle"
                  loading="lazy"
                  decoding="async"
                  width="915"
                  height="737"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    <Icon name="spark" className="h-4 w-4 text-[#7AA2FF]" />
                    <span>Dein Weg zur Remote-Freiheit</span>
                  </div>
                </div>
              </div>
            </GlowingEffect>

            <GlowingEffect
              variant="silver"
              disabled={false}
              proximity={80}
              spread={25}
              blur={2}
              borderWidth={1.5}
              movementDuration={1.5}
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:p-10"
            >
              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#7AA2FF]/20 blur-3xl opacity-40" />
              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#2EE9C6]/15 blur-3xl opacity-40" />

              <div className="relative text-center sm:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
                  <Icon name="shield" className="h-4 w-4 text-[#7AA2FF]" /> Kostenlos & unverbindlich
                </div>
                <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Blitzbewerbung in 2 Minuten!
                </h3>
                <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                  Wenn du ortsunabhängig arbeiten willst, aber keinen Bock auf Fake-Versprechen
                  oder "Trial & Error" hast – dann ist das Gespräch der schnellste Weg zu einem sauberen Start.
                </p>
                <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2">
                  <Pill>Individuelle Einschätzung</Pill>
                  <Pill>Konkreter Einstiegspfad</Pill>
                  <Pill>Realistische Timeline</Pill>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-white">
                    <Icon name="bolt" className="h-4 w-4 text-[#7AA2FF]" />
                    <span>In 2 Minuten eingetragen</span>
                  </div>
                  <div className="mt-1 text-sm text-white/65">
                    Danach melden wir uns zur Terminabstimmung.
                  </div>

                  <div className="mt-5 grid gap-3">
                    <GetStartedButton
                      onClick={openCTA}
                      trackingLocation="final_cta_section"
                      className="w-full px-5 py-3 rounded-2xl text-sm font-semibold"
                    >
                      Jetzt Erstgespräch sichern
                    </GetStartedButton>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-2 rounded-xl bg-white/5 p-3 text-xs text-white/55">
                    <Icon name="lock" className="h-3.5 w-3.5 flex-shrink-0 text-[#7AA2FF]" />
                    <span className="text-center sm:text-left">
                      Tipp: Wenn du nebenberuflich startest, sag uns einfach, wie viele Stunden pro Woche
                      realistisch sind – wir richten das Setup danach aus.
                    </span>
                  </div>
                </div>
              </div>
            </GlowingEffect>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <img src="/United_closing.webp" alt="United Closing Logo" className="h-8 w-auto sm:h-10" width="2262" height="433" />
                <a
                  href="https://www.instagram.com/united_closing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-2 text-white/60 hover:bg-white/5 hover:text-[#7AA2FF] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-white/60">
                <button className="hover:text-[#7AA2FF] transition" onClick={() => scrollToId("top")}>
                  Start
                </button>
                <button className="hover:text-[#7AA2FF] transition" onClick={() => scrollToId("benefits")}>
                  Vorteile
                </button>
                <button className="hover:text-[#7AA2FF] transition" onClick={() => scrollToId("about")}>
                  Über uns
                </button>
                <button className="hover:text-[#7AA2FF] transition" onClick={() => scrollToId("faq")}>
                  FAQ
                </button>
                <button className="hover:text-[#7AA2FF] transition" onClick={openCTA}>
                  Erstgespräch
                </button>
                <button className="hover:text-[#7AA2FF] transition" onClick={() => navigate("/impressum")}>
                  Impressum
                </button>
                <button className="hover:text-[#7AA2FF] transition" onClick={() => navigate("/datenschutz")}>
                  Datenschutz
                </button>
              </div>
            </div>

            <div className="mt-8 text-xs text-white/45">
              © {new Date().getFullYear()} United Closing • Hinweis: Diese Seite dient der Information und
              Terminvereinbarung. Kein Garantieversprechen für Einkommen. Ergebnisse hängen von Einsatz,
              Zeit und Umsetzung ab.
            </div>
          </div>
        </footer>
      </main>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Kostenloses Erstgespräch">
        <form onSubmit={submit} className="grid gap-4">
          <label className="grid gap-1.5">
            <span className="text-xs font-medium text-white/80">Dein Name *</span>
            <input
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#7AA2FF]/45 focus:ring-4 focus:ring-[#7AA2FF]/10 transition"
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
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#7AA2FF]/45 focus:ring-4 focus:ring-[#7AA2FF]/10 transition"
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
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#7AA2FF]/45 focus:ring-4 focus:ring-[#7AA2FF]/10 transition"
              placeholder="+49 170 1234567"
              required
            />
          </label>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/70 leading-relaxed">
            <div className="font-semibold text-white mb-2">Was passiert als Nächstes?</div>
            <ol className="space-y-1.5 list-decimal list-inside">
              <li>Wir melden uns innerhalb von 24 Stunden bei dir</li>
              <li>Gemeinsam finden wir einen passenden Termin</li>
              <li>Im 15-20 minütigen Gespräch klären wir deinen optimalen Einstieg</li>
            </ol>
          </div>

          <GetStartedButton
            type="submit"
            disabled={submitting}
            trackingLocation="modal_form"
            className="mt-2 w-full px-5 py-3 rounded-2xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Wird gesendet..." : "Jetzt Erstgespräch anfragen"}
          </GetStartedButton>

          <div className="flex items-start gap-2 text-xs text-white/50">
            <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#7AA2FF]" />
            <span>
              Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
            </span>
          </div>
        </form>
      </Modal>

      <Toast
        open={toast.open}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
        title={toast.title}
        description={toast.desc}
      />

      <div
        className={cx(
          "fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 p-4 backdrop-blur-xl transition-transform duration-300 md:hidden",
          showMobileCTA ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto flex max-w-sm items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">Bereit zum Start?</div>
            <div className="text-xs text-white/60">Sichere dir dein Erstgespräch</div>
          </div>
          <GetStartedButton
            onClick={openCTA}
            trackingLocation="mobile_sticky_cta"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0"
          >
            Jetzt anfragen
          </GetStartedButton>
        </div>
      </div>
    </div>
  );
}
