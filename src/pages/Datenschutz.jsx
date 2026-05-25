import { motion } from 'framer-motion'

const Page = ({ children }) => (
  <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
    transition={{duration:.5,ease:[.22,1,.36,1]}}>{children}</motion.div>
)

const Section = ({ num, title, children }) => (
  <div style={{marginBottom:44}}>
    <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:20,color:'#0F172A',marginBottom:14,paddingBottom:10,borderBottom:'1px solid #E8EEFE'}}>
      {num}. {title}
    </h2>
    {children}
  </div>
)

const p = {fontSize:15,color:'#334155',lineHeight:1.8,marginBottom:10}
const h3s = {fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:16,color:'#0F172A',marginBottom:8,marginTop:20}

export default function Datenschutz() {
  return (
    <Page>
      <div className="page">

        {/* Hero */}
        <section style={{background:'linear-gradient(160deg,#F0F6FF,#EBF3FF)',padding:'80px 0 52px'}}>
          <div className="container">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <span className="tag" style={{marginBottom:16}}>Rechtliches</span>
              <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:'clamp(36px,6vw,68px)',letterSpacing:'-2px',lineHeight:1.1,color:'#0F172A'}}>
                Datenschutz&shy;erklärung
              </h1>
              <p style={{fontSize:15,color:'#64748B',marginTop:14}}>Stand: Mai 2025 · Gültig für imagecontent.de</p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container" style={{maxWidth:760}}>

            <Section num="1" title="Datenschutz auf einen Blick">
              <h3 style={h3s}>Allgemeine Hinweise</h3>
              <p style={p}>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche
                Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
                Datenschutzerklärung.
              </p>

              <h3 style={h3s}>Datenerfassung auf dieser Website</h3>
              <p style={p}>
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br/>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Impressum dieser Website entnehmen.
              </p>
              <p style={p}>
                <strong>Wie erfassen wir Ihre Daten?</strong><br/>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. durch
                Eingabe im Kontaktformular). Andere Daten werden automatisch oder nach Ihrer Einwilligung
                beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische
                Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
              <p style={p}>
                <strong>Wofür nutzen wir Ihre Daten?</strong><br/>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p style={p}>
                <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br/>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
                Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
                die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
                Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft
                widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung
                der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen
                ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </Section>

            <Section num="2" title="Verantwortliche Stelle">
              <p style={p}>
                Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p style={{...p,background:'#F7F9FC',border:'1px solid #E8EEFE',borderRadius:10,padding:'16px 20px'}}>
                <strong>ImageContent GmbH &amp; Co. KG</strong><br/>
                E-Mail: <a href="mailto:support@imagecontent.de" style={{color:'#2563EB'}}>support@imagecontent.de</a>
              </p>
              <p style={p}>
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam
                mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
                (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </Section>

            <Section num="3" title="Speicherdauer">
              <p style={p}>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung
                entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung
                zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen
                rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
              </p>
            </Section>

            <Section num="4" title="Hosting">
              <p style={p}>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website
                erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich
                v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
                Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert
                werden, handeln.
              </p>
              <p style={p}>
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen
                und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren,
                schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen
                Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </Section>

            <Section num="5" title="Kontaktformular">
              <p style={p}>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p style={p}>
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
                sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
                auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
                Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
                DSGVO), sofern diese abgefragt wurde.
              </p>
              <p style={p}>
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
                Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
                Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende
                gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.
              </p>
            </Section>

            <Section num="6" title="Cookies">
              <p style={p}>
                Unsere Website verwendet sogenannte „Cookies". Cookies sind kleine Datenpakete und richten
                auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer
                einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät
                gespeichert.
              </p>
              <p style={p}>
                Wir verwenden ausschließlich technisch notwendige Cookies, die für den Betrieb der Website
                erforderlich sind (z.B. Speicherung Ihrer Cookie-Einwilligung). Die Rechtsgrundlage für
                die Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am einwandfreien
                Betrieb der Website).
              </p>
            </Section>

            <Section num="7" title="Ihre Rechte">
              <p style={p}>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
              <ul style={{paddingLeft:20,color:'#334155',fontSize:15,lineHeight:2}}>
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
                <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
                <li>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO)</li>
              </ul>
              <p style={{...p,marginTop:14}}>
                Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an:{' '}
                <a href="mailto:support@imagecontent.de" style={{color:'#2563EB',fontWeight:600}}>support@imagecontent.de</a>
              </p>
            </Section>

          </div>
        </section>

      </div>
    </Page>
  )
}
