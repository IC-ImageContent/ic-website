import { motion } from 'framer-motion'

const Page = ({ children }) => (
  <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
    transition={{duration:.5,ease:[.22,1,.36,1]}}>{children}</motion.div>
)

const Section = ({ title, children }) => (
  <div style={{marginBottom:40}}>
    <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:20,color:'#0F172A',marginBottom:14,paddingBottom:10,borderBottom:'1px solid #E8EEFE'}}>{title}</h2>
    {children}
  </div>
)

const p = {fontSize:15,color:'#334155',lineHeight:1.8,marginBottom:10}
const todo = {display:'inline-block',background:'#FEF9C3',color:'#92400E',fontWeight:700,fontSize:13,padding:'1px 8px',borderRadius:4,fontFamily:'monospace'}

export default function Impressum() {
  return (
    <Page>
      <div className="page">

        {/* Hero */}
        <section style={{background:'linear-gradient(160deg,#F0F6FF,#EBF3FF)',padding:'80px 0 52px'}}>
          <div className="container">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <span className="tag" style={{marginBottom:16}}>Rechtliches</span>
              <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:'clamp(36px,6vw,68px)',letterSpacing:'-2px',lineHeight:1.1,color:'#0F172A'}}>
                Impressum
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container" style={{maxWidth:760}}>

            <Section title="Angaben gemäß § 5 TMG">
              <p style={p}>
                <strong>ImageContent GmbH &amp; Co. KG</strong><br/>
                <span style={todo}>{'{TODO: Straße und Hausnummer}'}</span><br/>
                <span style={todo}>{'{TODO: PLZ und Stadt}'}</span><br/>
                Deutschland
              </p>
            </Section>

            <Section title="Vertreten durch">
              <p style={p}>
                <span style={todo}>{'{TODO: Name des Geschäftsführers}'}</span>
              </p>
            </Section>

            <Section title="Handelsregister">
              <p style={p}>
                Registergericht: <span style={todo}>{'{TODO: z.B. Amtsgericht Hannover}'}</span><br/>
                Registernummer: <span style={todo}>{'{TODO: HRA / HRB Nummer}'}</span>
              </p>
            </Section>

            <Section title="Umsatzsteuer-ID">
              <p style={p}>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br/>
                <span style={todo}>{'{TODO: DE XXXXXXXXX}'}</span>
              </p>
            </Section>

            <Section title="Kontakt">
              <p style={p}>
                E-Mail: <a href="mailto:support@imagecontent.de" style={{color:'#2563EB',fontWeight:600}}>support@imagecontent.de</a><br/>
                Telefon: <span style={todo}>{'{TODO: +49 (0) XXX XXXXXXX}'}</span>
              </p>
            </Section>

            <Section title="EU-Streitschlichtung">
              <p style={p}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{color:'#2563EB'}}>
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p style={p}>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </Section>

            <Section title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
              <p style={p}>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </Section>

            <Section title="Haftung für Inhalte">
              <p style={p}>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte
                fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
              <p style={p}>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </Section>

            <Section title="Haftung für Links">
              <p style={p}>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                der Seiten verantwortlich.
              </p>
            </Section>

            <Section title="Urheberrecht">
              <p style={p}>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </Section>

            <div style={{background:'#FEF9C3',border:'1px solid #FDE68A',borderRadius:12,padding:'16px 20px',marginTop:24}}>
              <p style={{fontSize:13,color:'#78350F',fontWeight:600,margin:0}}>
                ⚠️ Hinweis: Ersetzen Sie alle gelb markierten Platzhalter mit Ihren echten Firmendaten, bevor Sie die Seite veröffentlichen.
              </p>
            </div>

          </div>
        </section>

      </div>
    </Page>
  )
}
