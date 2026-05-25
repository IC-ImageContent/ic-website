import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Page = ({ children }) => (
  <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
    transition={{duration:.5,ease:[.22,1,.36,1]}}>{children}</motion.div>
)

const specialties = [
  { num:'01', title:'RIS & PACS-Systeme', desc:'Implementierung und Integration radiologischer Informationssysteme', accent:'#10B981' },
  { num:'02', title:'C-RISi Support', desc:'L1–L4 Applikations- und Technik-Support', accent:'#0891B2' },
  { num:'03', title:'Data Migration & PACS', desc:'GEHC, SECTRA, DEDALUS, SYNEDRA, PHILIPS', accent:'#7C3AED' },
  { num:'04', title:'Kardiologie-Support', desc:'Schnittstellentechnik, Installation, Wartung', accent:'#DC2626' },
  { num:'05', title:'Bildschirm-Abnahmen', desc:'Abnahmeprüfungen nach DIN-Norm', accent:'#D97706' },
  { num:'06', title:'Cloud & Virtualisierung', desc:'Sichere Healthcare-Hostinglösungen', accent:'#10B981' },
]

const partners = ['GEHC','SECTRA','Dedalus','SYNEDRA','Philips','Siemens Healthineers']

export default function Healthcare() {
  return (
    <Page>
      <div className="page">

        {/* Dark hero */}
        <section style={{background:'#080D18',padding:'80px 0 72px',position:'relative',overflow:'hidden'}}>
          <div aria-hidden style={{
            position:'absolute',inset:0,
            backgroundImage:'linear-gradient(rgba(16,185,129,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.05) 1px,transparent 1px)',
            backgroundSize:'44px 44px',pointerEvents:'none',
          }}/>
          <div aria-hidden style={{position:'absolute',top:'-20%',right:'-10%',width:600,height:600,background:'radial-gradient(circle,rgba(16,185,129,.12),transparent 70%)',filter:'blur(60px)',pointerEvents:'none'}}/>

          <div className="container" style={{position:'relative',zIndex:1}}>
            <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <span className="tag tag--green" style={{marginBottom:20}}>Healthcare-IT</span>
              <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:'clamp(40px,7vw,80px)',letterSpacing:'-2.5px',lineHeight:1.05,color:'white',marginBottom:20}}>
                Spezialisiert.<br/>
                <span style={{color:'#10B981'}}>Zertifiziert.</span>
              </h1>
              <p style={{fontSize:18,color:'rgba(255,255,255,.6)',maxWidth:480,lineHeight:1.7}}>
                Über 25 Jahre Erfahrung in klinischen und radiologischen IT-Umgebungen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Specialties grid */}
        <section className="section" style={{background:'#F7F9FC'}}>
          <div className="container">
            <div className="sec-head sec-head--center">
              <span className="tag tag--green">Fachbereiche</span>
              <h2 className="sec-title">Sechs Spezialgebiete.</h2>
            </div>

            <motion.div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}
              initial="hidden" whileInView="show" viewport={{once:true,margin:'-60px'}}
              variants={{hidden:{},show:{transition:{staggerChildren:.1}}}}>
              {specialties.map((s,i)=>(
                <motion.div key={s.num}
                  variants={{hidden:{opacity:0,y:40},show:{opacity:1,y:0,transition:{duration:.55,ease:[.22,1,.36,1]}}}}
                  whileHover={{y:-5,boxShadow:'0 16px 48px rgba(0,0,0,.1)'}}>
                  <div style={{background:'white',border:'1px solid #E8EEFE',borderRadius:18,padding:'32px 28px',height:'100%',position:'relative',overflow:'hidden',transition:'box-shadow .2s'}}>
                    <motion.div style={{position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${s.accent},${s.accent}44)`}}
                      initial={{scaleX:0,transformOrigin:'left'}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:.8,delay:i*.08}}/>

                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:36,color:`${s.accent}22`,letterSpacing:'-1px',marginBottom:12,lineHeight:1}}>
                      {s.num}
                    </div>
                    <h3 style={{fontSize:18,fontWeight:800,color:'#0F172A',marginBottom:8}}>{s.title}</h3>
                    <p style={{fontSize:14,color:'#64748B',lineHeight:1.65}}>{s.desc}</p>

                    <div style={{marginTop:16,width:32,height:3,background:s.accent,borderRadius:2}}/>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Partners */}
        <section style={{background:'white',padding:'64px 0'}}>
          <div className="container">
            <p style={{textAlign:'center',fontSize:12,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:36}}>
              Systempartner & Hersteller
            </p>
            <motion.div style={{display:'flex',flexWrap:'wrap',gap:16,justifyContent:'center'}}
              initial="hidden" whileInView="show" viewport={{once:true}}
              variants={{hidden:{},show:{transition:{staggerChildren:.08}}}}>
              {partners.map(p=>(
                <motion.div key={p}
                  variants={{hidden:{opacity:0,scale:.9},show:{opacity:1,scale:1}}}
                  whileHover={{scale:1.05,borderColor:'#10B981',color:'#10B981'}}
                  style={{background:'#F7F9FC',border:'1.5px solid #E8EEFE',borderRadius:12,padding:'12px 24px',fontSize:14,fontWeight:700,color:'#64748B',transition:'all .2s',cursor:'default'}}>
                  {p}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* INQA + CTA */}
        <section style={{background:'linear-gradient(135deg,#065F46,#047857,#10B981)',padding:'80px 0',position:'relative',overflow:'hidden'}}>
          <div aria-hidden style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',backgroundSize:'36px 36px'}}/>
          <div className="container" style={{position:'relative',zIndex:1,display:'flex',alignItems:'center',justifyContent:'space-between',gap:40,flexWrap:'wrap'}}>
            <div style={{maxWidth:520}}>
              <span className="tag" style={{marginBottom:16,background:'rgba(255,255,255,.15)',color:'white'}}>Kontakt</span>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:'clamp(26px,4vw,42px)',color:'white',letterSpacing:'-.8px',marginBottom:14}}>
                Healthcare-IT Beratung anfragen.
              </h2>
              <p style={{fontSize:16,color:'rgba(255,255,255,.75)',lineHeight:1.7}}>
                Sprechen Sie mit unseren Experten für klinische IT-Systeme.
              </p>
            </div>
            <motion.div whileHover={{scale:1.04}} whileTap={{scale:.97}}>
              <Link to="/kontakt" className="btn btn--white" style={{fontSize:15,padding:'14px 32px',color:'#065F46'}}>
                Beratungsgespräch anfragen →
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
      <style>{`
        @media(max-width:900px){.container>div[style*="repeat(3"]{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:600px){.container>div[style*="repeat(3"]{grid-template-columns:1fr!important}}
      `}</style>
    </Page>
  )
}
