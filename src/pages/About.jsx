import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

const Page = ({ children }) => (
  <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
    transition={{duration:.5,ease:[.22,1,.36,1]}}>{children}</motion.div>
)

function Counter({ to, suffix='', label, dark=true }) {
  const ref = useRef(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v).toLocaleString('de'))
  const inView = useInView(ref, { once:true, margin:'-60px' })
  useEffect(() => {
    if (inView) { const c = animate(count, to, { duration:2, ease:'easeOut' }); return c.stop }
  }, [inView])
  return (
    <motion.div ref={ref} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
      viewport={{once:true}} transition={{duration:.6}} style={{textAlign:'center'}}>
      <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:'clamp(40px,5vw,64px)',color:dark?'#fff':'#1E3A5F',lineHeight:1}}>
        <motion.span>{rounded}</motion.span>
        <span style={{color:'#2563EB'}}>{suffix}</span>
      </div>
      <div style={{fontSize:13,color:dark?'rgba(255,255,255,.45)':'#64748B',marginTop:8,textTransform:'uppercase',letterSpacing:'.09em',fontWeight:600}}>
        {label}
      </div>
    </motion.div>
  )
}

const values = [
  { title:'Innovation', desc:'Neueste Technologien für Ihren Vorsprung.', accent:'#2563EB', icon:<><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></> },
  { title:'Qualität', desc:'ISO 9001 – zertifiziert und konsequent gelebt.', accent:'#7C3AED', icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> },
  { title:'Kundenorientierung', desc:'Maßgeschneidert – nicht von der Stange.', accent:'#0891B2', icon:<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></> },
  { title:'Verantwortung', desc:'Datenschutz und Sicherheit an erster Stelle.', accent:'#059669', icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></> },
]

export default function About() {
  return (
    <Page>
      <div className="page">

        {/* Hero with large background text */}
        <section style={{position:'relative',padding:'80px 0 60px',overflow:'hidden',background:'#F7F9FC'}}>
          {/* Background word */}
          <div aria-hidden style={{
            position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
            fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,
            fontSize:'clamp(80px,18vw,220px)',color:'rgba(37,99,235,.04)',
            letterSpacing:'-8px',whiteSpace:'nowrap',userSelect:'none',pointerEvents:'none',
          }}>
            SEIT 2000
          </div>
          <div className="container" style={{position:'relative',zIndex:1}}>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <span className="tag" style={{marginBottom:16}}>Unternehmen</span>
              <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:'clamp(36px,6vw,72px)',letterSpacing:'-2px',lineHeight:1.1,maxWidth:680}}>
                Verlässlich.<br/><span style={{color:'#2563EB'}}>Seit 2000.</span>
              </h1>
              <p style={{fontSize:18,color:'#64748B',marginTop:16,maxWidth:520,lineHeight:1.7}}>
                ImageContent GmbH & Co. KG — Ihr IT-Dienstleister im D-A-CH-Raum. ISO 9001 zertifiziert. Über 25 Jahre Erfahrung.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats dark */}
        <section style={{background:'#080D18',padding:'80px 0'}}>
          <div className="container">
            <div className="r-grid-4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:32}}>
              <Counter to={25} suffix="+" label="Jahre Erfahrung"/>
              <Counter to={9} label="Standorte"/>
              <Counter to={24} suffix="×7" label="Support"/>
              <Counter to={9001} label="ISO Zertifikat"/>
            </div>
          </div>
        </section>

        {/* ISO Certification */}
        <section className="section" style={{background:'white'}}>
          <div className="container r-grid-2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:72,alignItems:'center'}}>
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}}
              viewport={{once:true}} transition={{duration:.6,ease:[.22,1,.36,1]}}>
              <span className="tag" style={{marginBottom:16}}>Qualitätsstandard</span>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:'clamp(26px,3.5vw,42px)',letterSpacing:'-.7px',marginBottom:16}}>
                DIN ISO 9001<br/>zertifiziert.
              </h2>
              <p style={{fontSize:16,color:'#64748B',lineHeight:1.75}}>
                Unsere ISO 9001 Zertifizierung ist die Basis für den kontinuierlichen Verbesserungsprozess unseres Qualitätsmanagementsystems — nicht nur Nachweis, sondern gelebte Praxis.
              </p>
            </motion.div>

            <motion.div initial={{opacity:0,scale:.92}} whileInView={{opacity:1,scale:1}}
              viewport={{once:true}} transition={{duration:.6}}>
              <div style={{background:'linear-gradient(135deg,#1E3A5F,#2563EB)',borderRadius:24,padding:'48px',textAlign:'center',position:'relative',overflow:'hidden'}}>
                {/* shine */}
                <motion.div
                  animate={{x:['-100%','200%']}}
                  transition={{duration:3,repeat:Infinity,repeatDelay:2,ease:'easeInOut'}}
                  style={{position:'absolute',top:0,left:0,width:'40%',height:'100%',background:'linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)',transform:'skewX(-20deg)',pointerEvents:'none'}}/>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:72,color:'white',lineHeight:1}}>DIN</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:44,color:'rgba(255,255,255,.8)',letterSpacing:3}}>ISO</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:56,color:'white',lineHeight:1}}>9001</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,.5)',marginTop:12,letterSpacing:'.08em',textTransform:'uppercase'}}>Qualitätsmanagementsystem</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="section" style={{background:'#F7F9FC'}}>
          <div className="container">
            <div className="sec-head sec-head--center">
              <span className="tag">Unsere Werte</span>
              <h2 className="sec-title">Was uns antreibt.</h2>
            </div>

            <motion.div className="r-grid-4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18}}
              initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}}
              variants={{hidden:{},show:{transition:{staggerChildren:.1}}}}>
              {values.map((v,i)=>(
                <motion.div key={v.title}
                  variants={{hidden:{opacity:0,y:40},show:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1]}}}}
                  whileHover={{y:-6,boxShadow:'0 12px 40px rgba(0,0,0,.1)'}}>
                  <div style={{background:'white',border:'1px solid #E8EEFE',borderRadius:18,padding:'28px 24px',height:'100%',position:'relative',overflow:'hidden',transition:'box-shadow .2s'}}>
                    <motion.div style={{position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${v.accent},${v.accent}44)`}}
                      initial={{scaleX:0,transformOrigin:'left'}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:.7,delay:i*.1}}/>
                    <div style={{width:44,height:44,background:`${v.accent}12`,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={v.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{v.icon}</svg>
                    </div>
                    <h3 style={{fontSize:16,fontWeight:800,marginBottom:8}}>{v.title}</h3>
                    <p style={{fontSize:14,color:'#64748B',lineHeight:1.6}}>{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Locations */}
        <section className="section" style={{background:'white'}}>
          <div className="container">
            <div className="sec-head sec-head--center">
              <span className="tag">Standorte</span>
              <h2 className="sec-title">Für Sie da — bundesweit.</h2>
            </div>

            <motion.div style={{display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center'}}
              initial="hidden" whileInView="show" viewport={{once:true}}
              variants={{hidden:{},show:{transition:{staggerChildren:.07}}}}>
              {['Hannover','Heidelberg','Berlin','Hamburg','Frankfurt am Main','Leipzig','München','Stuttgart','Ulm'].map(city=>(
                <motion.div key={city}
                  variants={{hidden:{opacity:0,scale:.85},show:{opacity:1,scale:1,transition:{duration:.4,ease:[.22,1,.36,1]}}}}
                  whileHover={{scale:1.06,borderColor:'#2563EB',color:'#2563EB'}}
                  style={{display:'flex',alignItems:'center',gap:8,background:'white',border:'1.5px solid #E8EEFE',borderRadius:50,padding:'10px 20px',fontSize:14,fontWeight:600,cursor:'default',transition:'border-color .2s,color .2s'}}>
                  <div style={{width:8,height:8,background:'#2563EB',borderRadius:'50%'}}/>
                  {city}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="section" style={{background:'#F7F9FC'}}>
          <div className="container">
            <div className="sec-head sec-head--center">
              <span className="tag">Team</span>
              <h2 className="sec-title">Die Köpfe dahinter.</h2>
              <p className="sec-desc">Über 25 Jahre Erfahrung — gewachsen aus echten IT-Projekten, nicht aus Präsentationen.</p>
            </div>

            {/* TODO-Banner */}
            <div style={{background:'#FFFBEB',border:'1.5px dashed #F59E0B',borderRadius:12,padding:'14px 20px',marginBottom:32,display:'flex',alignItems:'center',gap:12}}>
              <span style={{fontSize:18}}>⚠️</span>
              <p style={{fontSize:13,color:'#92400E',lineHeight:1.5}}>
                <strong>Platzhalter:</strong> Bitte ersetzen Sie die Beispieldaten durch echte Teammitglieder (Name, Rolle, Foto-URL oder Initialen).
              </p>
            </div>

            <motion.div className="r-grid-4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20}}
              initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}}
              variants={{hidden:{},show:{transition:{staggerChildren:.1}}}}>
              {[
                { name:'Vorname Nachname', role:'Geschäftsführer', initials:'GF', accent:'#2563EB', linkedin:null },
                { name:'Vorname Nachname', role:'Leiterin Healthcare-IT', initials:'HC', accent:'#10B981', linkedin:null },
                { name:'Vorname Nachname', role:'Head of Security', initials:'SE', accent:'#7C3AED', linkedin:null },
                { name:'Vorname Nachname', role:'IT-Infrastruktur & Support', initials:'IT', accent:'#0891B2', linkedin:null },
              ].map((p,i)=>(
                <motion.div key={i}
                  variants={{hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:.5,ease:[.22,1,.36,1]}}}}
                  whileHover={{y:-6,boxShadow:'0 12px 40px rgba(0,0,0,.09)'}}
                  style={{background:'white',border:'1px solid #E8EEFE',borderRadius:18,padding:'28px 20px',textAlign:'center',transition:'box-shadow .2s'}}>
                  {/* Avatar */}
                  <div style={{
                    width:72,height:72,borderRadius:'50%',
                    background:`linear-gradient(135deg,${p.accent},${p.accent}88)`,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    margin:'0 auto 16px',
                    fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,
                    fontSize:20,color:'white',
                    boxShadow:`0 8px 24px ${p.accent}40`,
                  }}>
                    {p.initials}
                  </div>
                  <div style={{fontSize:15,fontWeight:800,color:'#0F172A',marginBottom:4}}>{p.name}</div>
                  <div style={{fontSize:12,color:'#64748B',fontWeight:600,textTransform:'uppercase',letterSpacing:'.06em'}}>{p.role}</div>
                  {/* Accent line */}
                  <div style={{width:32,height:2,background:p.accent,borderRadius:2,margin:'14px auto 0'}}/>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{padding:'0 0 96px'}}>
          <div className="container">
            <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{duration:.6}}
              className="about-cta"
            style={{background:'linear-gradient(135deg,#1E3A5F,#2563EB)',borderRadius:22,padding:'56px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:32,flexWrap:'wrap'}}>
              <div>
                <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:'clamp(22px,3vw,34px)',color:'white',marginBottom:8}}>Jetzt Kontakt aufnehmen.</h3>
                <p style={{fontSize:16,color:'rgba(255,255,255,.7)'}}>Unverbindlich — wir melden uns innerhalb von 24 Stunden.</p>
              </div>
              <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
                <Link to="/kontakt" className="btn btn--white" style={{fontSize:15,padding:'14px 32px'}}>Anfrage stellen →</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>
      <style>{`
        /* About-specific overrides handled via r-grid-* classes in index.css */
        @media(max-width:580px) {
          /* ISO card font sizes */
          .iso-card div:first-child { font-size: 52px !important; }
          .iso-card div:nth-child(2) { font-size: 32px !important; }
          .iso-card div:nth-child(3) { font-size: 40px !important; }
        }
      `}</style>
    </Page>
  )
}
