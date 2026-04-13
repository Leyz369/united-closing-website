import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GetStartedButton } from "@/components/ui/get-started-button";
import { Shield, Clock, Users } from "lucide-react";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

gsap.registerPlugin(SplitText, useGSAP);

interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href?: string; primary?: boolean; onClick?: () => void; trackingLocation?: string }>;
  microDetails?: Array<string>;
  logo?: string;
  ctaMicrocopy?: string;
}

const SyntheticHero = ({
  title = "Arbeite von überall – und baue dir ein attraktives Online-Einkommen auf",
  description = "Ein Remote-Business, das zu dir passt: Von überall aus arbeiten, flexible Zeiten und echte Perspektiven. Wir zeigen dir reale Remote-Modelle, die auf deinen Alltag und deine Ziele abgestimmt sind – inklusive klarem Einstiegspfad.",
  badgeText = "Remote",
  badgeLabel = "United Closing",
  ctaButtons = [
    { text: "Kostenloses Erstgespräch", href: "#", primary: true },
    { text: "Mehr erfahren", href: "#benefits" },
  ],
  microDetails = [
    "Ortsunabhängig arbeiten",
    "Klar & seriös",
    "Vollzeit oder nebenberuflich",
  ],
  logo,
  ctaMicrocopy,
}: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      if (!headingRef.current) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(headingRef.current!, {
          type: "lines",
          wordsClass: "hero-lines",
        });

        gsap.set(split.lines, {
          filter: "blur(16px)",
          yPercent: 24,
          autoAlpha: 0,
          scale: 1.04,
          transformOrigin: "50% 100%",
        });

        if (badgeWrapperRef.current) {
          gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -8 });
        }
        if (paragraphRef.current) {
          gsap.set(paragraphRef.current, { autoAlpha: 0, y: 8 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
        }

        const microItems = microRef.current
          ? Array.from(microRef.current.querySelectorAll("li"))
          : [];
        if (microItems.length > 0) {
          gsap.set(microItems, { autoAlpha: 0, y: 6 });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (badgeWrapperRef.current) {
          tl.to(
            badgeWrapperRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            0,
          );
        }

        tl.to(
          split.lines,
          {
            filter: "blur(0px)",
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
          },
          0.1,
        );

        if (paragraphRef.current) {
          tl.to(
            paragraphRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.55",
          );
        }

        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.35",
          );
        }

        if (microItems.length > 0) {
          tl.to(
            microItems,
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.25",
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[#06070A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,162,255,0.08)_0%,transparent_50%)]" />
      </div>

      <div className="absolute inset-0 z-[5] opacity-40 pointer-events-none overflow-hidden">
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2300px] h-[2300px]">
          <RotatingEarth width={2300} height={2300} />
        </div>
        <div className="block md:hidden absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px]">
          <RotatingEarth width={600} height={600} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 py-12 md:px-6 md:py-20 mt-12">
        <div ref={badgeWrapperRef}>
          {logo ? (
            <div className="mb-12 md:mb-16 flex flex-col items-center justify-center gap-4 md:gap-6">
              <img src="/Logo_icon.webp" alt="United Closing Icon" className="h-24 md:h-32 w-auto object-contain" width="960" height="957" />
              <img src={logo} alt="United Closing Logo" className="h-26 md:h-52 w-auto object-contain max-w-[90vw]" width="2262" height="433" />
            </div>
          ) : (
            <Badge className="mb-4 bg-white/10 hover:bg-white/15 text-[#7AA2FF] backdrop-blur-md border border-white/20 uppercase tracking-wider font-medium flex items-center gap-2 px-4 py-1.5">
              <span className="text-[10px] font-light tracking-[0.18em] text-white/80">
                {badgeLabel}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#7AA2FF]/60" />
              <span className="text-xs font-light tracking-tight text-white">
                {badgeText}
              </span>
            </Badge>
          )}
        </div>

        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl font-light tracking-tight text-white mb-6 leading-tight"
        >
          {title}
        </h1>

        <p
          ref={paragraphRef}
          className="text-white/80 text-base md:text-xl max-w-3xl mx-auto mb-8 font-light leading-relaxed"
        >
          {description}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            {ctaButtons.map((button, index) => {
              const isPrimary = button.primary ?? index === 0;

              if (isPrimary) {
                return (
                  <GetStartedButton
                    key={index}
                    href={button.href}
                    onClick={button.onClick}
                    trackingLocation={button.trackingLocation || 'hero'}
                    className="px-6 py-2.5 md:px-8 md:py-3 rounded-xl text-sm md:text-base font-medium shadow-lg transition-all cursor-pointer"
                  >
                    {button.text}
                  </GetStartedButton>
                );
              }

              const classes = "px-6 py-2.5 md:px-8 md:py-3 rounded-xl text-sm md:text-base font-medium border-white/30 text-white hover:bg-white/10 backdrop-blur-lg transition-all cursor-pointer";

              if (button.href) {
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={classes}
                    asChild
                  >
                    <a href={button.href}>{button.text}</a>
                  </Button>
                );
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={classes}
                  onClick={button.onClick}
                >
                  {button.text}
                </Button>
              );
            })}
          </div>
          {ctaMicrocopy && (
            <p className="text-xs md:text-sm text-white/60 font-light">
              {ctaMicrocopy}
            </p>
          )}
        </div>

        {microDetails.length > 0 && (
          <ul
            ref={microRef}
            className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-xs font-light tracking-tight text-white/70"
          >
            {microDetails.map((detail, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#7AA2FF]/60" />
                {detail}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:px-6 md:py-4 backdrop-blur-xl max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#7AA2FF]" />
              <span>100% kostenfrei & unverbindlich</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#7AA2FF]" />
              <span>Antwort innerhalb von 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#7AA2FF]" />
              <span>Über 150.000 vermittelte Abschlüsse</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default SyntheticHero;
