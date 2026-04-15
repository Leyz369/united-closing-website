import { useNavigate } from "react-router-dom";

export default function Impressum() {
  const navigate = useNavigate();

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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-white/5"
            aria-label="Zur Startseite"
          >
            <img src="/united_closing-logo.webp" alt="United Closing Logo" className="h-12 w-auto" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            Zurück zur Startseite
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Impressum
        </h1>
        <p className="mt-4 text-sm text-white/60">
          Angaben gemäß § 5 TMG
        </p>

        <div className="mt-10 space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Anbieter</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="font-semibold text-white text-lg">United Closing</p>
              <p className="mt-2 text-white/70">ist eine Unternehmung der</p>
              <p className="mt-3 font-semibold text-white">SBK Service & Consulting UG</p>
              <p className="mt-2">Bei den Mühren 1</p>
              <p>20457 Hamburg</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Kontakt</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p>
                <span className="font-semibold text-white">E-Mail:</span>{" "}
                <a href="mailto:kontakt@sbk-consulting.de" className="text-[#7AA2FF] hover:underline">
                  kontakt@sbk-consulting.de
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Registereintrag</h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-2">
              <p>
                <span className="font-semibold text-white">Eintragung:</span> Handelsregister
              </p>
              <p>
                <span className="font-semibold text-white">Registergericht:</span> Amtsgericht Hamburg
              </p>
              <p>
                <span className="font-semibold text-white">Registernummer:</span> HRB 195022
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="font-semibold text-white">Jan Freude</p>
              <p className="mt-2">Bei den Mühren 1</p>
              <p>20457 Hamburg</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Haftungsausschluss</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
              verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-3">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
              einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
              Links umgehend entfernen.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-3">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem
              auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7AA2FF] hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-3">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h3>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-white/70">
              Dieses Impressum wurde erstellt in Übereinstimmung mit den gesetzlichen Anforderungen gemäß
              § 5 TMG (Telemediengesetz) und § 55 RStV (Rundfunkstaatsvertrag).
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/20 mt-16">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src="/united_closing-logo.webp" alt="United Closing Logo" className="h-14 w-auto" />
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-white/60">
              <button
                className="hover:text-[#7AA2FF] transition"
                onClick={() => navigate("/")}
              >
                Zurück zur Startseite
              </button>
              <button
                className="hover:text-[#7AA2FF] transition"
                onClick={() => navigate("/datenschutz")}
              >
                Datenschutz
              </button>
            </div>
          </div>

          <div className="mt-8 text-xs text-white/45">
            © {new Date().getFullYear()} United Closing • SBK Service & Consulting UG
          </div>
        </div>
      </footer>
    </div>
  );
}
