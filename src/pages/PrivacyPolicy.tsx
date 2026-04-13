import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
            <img src="/united_closing-logo.webp" alt="RemoteStart Logo" className="h-12 w-auto" />
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
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-sm text-white/60">
          Stand: {new Date().toLocaleDateString("de-DE")}
        </p>

        <div className="mt-10 space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Datenschutz auf einen Blick</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
              Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Datenerfassung auf dieser Website</h3>
            <p className="font-semibold text-white">
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </p>
            <p className="mt-2">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
              können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
            </p>

            <p className="font-semibold text-white mt-4">Wie erfassen wir Ihre Daten?</p>
            <p className="mt-2">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
              Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="mt-2">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
              IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
              Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website
              betreten.
            </p>

            <p className="font-semibold text-white mt-4">Wofür nutzen wir Ihre Daten?</p>
            <p className="mt-2">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Die über das Kontaktformular
              eingegebenen Daten werden ausschließlich zur Kontaktaufnahme und Terminvereinbarung verwendet.
            </p>

            <p className="font-semibold text-white mt-4">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
            <p className="mt-2">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
              Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
              können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
              bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Hosting</h2>
            <p>
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden,
              werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen,
              Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe
              und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
            <p className="mt-2">
              Das Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden
              Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten
              Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
              dieser Datenschutzerklärung.
            </p>
            <p className="mt-2">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene
              Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende
              Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch,
              wie und zu welchem Zweck das geschieht.
            </p>
            <p className="mt-2">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail)
              Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
              nicht möglich.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <p className="font-semibold text-white">RemoteStart</p>
              <p className="mt-1">[Vollständiger Name oder Firma]</p>
              <p>[Straße und Hausnummer]</p>
              <p>[PLZ und Ort]</p>
              <p className="mt-2">
                Telefon: [Telefonnummer]<br />
                E-Mail: [E-Mail-Adresse]
              </p>
            </div>
            <p className="mt-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen
              über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen
              o. Ä.) entscheidet.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben
              Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
              berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
              werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung
              Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
              letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
              eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
              erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">
              Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
            </h3>
            <div className="rounded-2xl border border-[#7AA2FF]/30 bg-[#7AA2FF]/10 p-4 backdrop-blur-xl">
              <p className="font-semibold text-white">
                WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE
                JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE
                VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE
                BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT,
                ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN
                PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE
                FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE
                VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH
                NACH ART. 21 ABS. 1 DSGVO).
              </p>
              <p className="mt-4 font-semibold text-white">
                WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT,
                JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
                DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG
                IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT
                MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
              Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
              oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger
              verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
            <p>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
              automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
              aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
              verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Auskunft, Löschung und Berichtigung</h3>
            <p>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
              Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
              der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu
              weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
            <p>
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht
              in folgenden Fällen:
            </p>
            <ul className="mt-2 ml-6 space-y-2 list-disc">
              <li>
                Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen
                wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li>
                Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt
                der Löschung die Einschränkung der Datenverarbeitung verlangen.
              </li>
              <li>
                Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung
                oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die
                Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </li>
              <li>
                Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen
                Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
                überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                zu verlangen.
              </li>
            </ul>
            <p className="mt-2">
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von
              ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder
              Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen
              Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines
              Mitgliedstaats verarbeitet werden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Datenerfassung auf dieser Website</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
              von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-2">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
              mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an
              der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
            </p>
            <p className="mt-2">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
              auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
              (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen –
              insbesondere Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">Anfrage per E-Mail oder Telefon</h3>
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus
              hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei
              uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-2">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
              mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an
              der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
            </p>
            <p className="mt-2">
              Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung
              auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt
              (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen –
              insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Analyse-Tools und Werbung</h2>
            <p>
              Auf dieser Website werden derzeit keine Analyse-Tools oder Tracking-Technologien eingesetzt. Sollte
              sich dies in Zukunft ändern, werden wir diese Datenschutzerklärung entsprechend aktualisieren und Sie
              über die eingesetzten Tools sowie deren Zweck und Rechtsgrundlage informieren.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Plugins und Tools</h2>
            <p>
              Diese Website verwendet derzeit keine externen Plugins oder Tools von Drittanbietern. Sollten in Zukunft
              solche Dienste eingebunden werden, werden wir Sie an dieser Stelle darüber informieren.
            </p>
          </section>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-sm text-white/70">
              Diese Datenschutzerklärung wurde erstellt am {new Date().toLocaleDateString("de-DE")} und entspricht
              den Anforderungen der Datenschutz-Grundverordnung (DSGVO) und dem Bundesdatenschutzgesetz (BDSG).
            </p>
            <p className="mt-3 text-sm text-white/70">
              Bitte beachten Sie, dass die in eckigen Klammern [...] stehenden Platzhalter durch die tatsächlichen
              Angaben des Websitebetreibers zu ersetzen sind.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/20 mt-16">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src="/united_closing-logo.webp" alt="RemoteStart Logo" className="h-14 w-auto" />
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-white/60">
              <button
                className="hover:text-[#7AA2FF] transition"
                onClick={() => navigate("/")}
              >
                Zurück zur Startseite
              </button>
            </div>
          </div>

          <div className="mt-8 text-xs text-white/45">
            © {new Date().getFullYear()} RemoteStart
          </div>
        </div>
      </footer>
    </div>
  );
}
