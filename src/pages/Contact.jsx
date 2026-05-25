import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Page = ({ children }) => (
  <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}
    transition={{duration:.5,ease:[.22,1,.36,1]}}>{children}</motion.div>
)

const info = [
  {
    icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>,
    label: 'E-Mail',
    value: 'support@imagecontent.de',
    link: 'mailto:support@imagecontent.de',
  },
  {
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    label: 'Remote Support',
    value: 'TeamViewer-Sitzung starten',
    link: 'https://dl.teamviewer.com/download/TeamViewerQS.exe',
  },
  {
    icon: <circle cx="12" cy="12" r="10"/>,
    label: 'Standorte',
    value: '9 Städte in Deutschland',
    link: null,
  },
]

const cities = ['Hannover','Heidelberg','Berlin','Hamburg','Frankfurt am Main','Leipzig','München','Stuttgart','Ulm']

const topics = ['IT-Sicherheit','IT-Infrastruktur','Healthcare-IT','Anwendungsentwicklung','Support & Wartung','INQA-Coaching','Sonstiges']

const steps = ['Kontaktdaten','Ihr Anliegen','Nachricht']

const inputBase = {
  width: '100%', padding: '13px 16px', fontSize: 15,
  border: '1.5px solid #E8EEFE', borderRadius: 10, background: '#F7F9FC',
  fontFamily: 'inherit', color: '#0F172A', outline: 'none',
  transition: 'border-color .2s, box-shadow .2s', boxSizing: 'border-box',
}
const inputErr = { borderColor: '#EF4444', background: '#FEF2F2' }

function Label({ children }) {
  return (
    <label style={{fontSize:12,fontWeight:700,color:'#64748B',display:'block',marginBottom:6,textTransform:'uppercase',letterSpacing:'.06em'}}>
      {children}
    </label>
  )
}

function StepIndicator({ step }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:0,marginBottom:32}}>
      {steps.map((s, i) => {
        const idx = i + 1
        const done = step > idx
        const active = step === idx
        return (
          <div key={s} style={{display:'flex',alignItems:'center',flex: i < steps.length - 1 ? 1 : 'none'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <motion.div
                animate={{
                  background: done ? '#10B981' : active ? '#2563EB' : '#E8EEFE',
                  scale: active ? 1.12 : 1,
                }}
                transition={{duration:.25}}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 13,
                  color: done || active ? 'white' : '#94A3B8',
                  boxShadow: active ? '0 0 0 4px rgba(37,99,235,.15)' : 'none',
                }}
              >
                {done
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : idx
                }
              </motion.div>
              <span style={{fontSize:10,fontWeight:600,color:active?'#2563EB':done?'#10B981':'#94A3B8',whiteSpace:'nowrap'}}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                animate={{background: done ? '#10B981' : '#E8EEFE'}}
                transition={{duration:.4}}
                style={{flex:1,height:2,marginBottom:18,marginLeft:4,marginRight:4}}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function SuccessScreen() {
  return (
    <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} style={{textAlign:'center',padding:'48px 24px'}}>
      <motion.div
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{type:'spring',stiffness:300,damping:20,delay:.1}}
        style={{
          width:80,height:80,
          background:'linear-gradient(135deg,#10B981,#059669)',
          borderRadius:'50%',
          display:'flex',alignItems:'center',justifyContent:'center',
          margin:'0 auto 24px',
          boxShadow:'0 8px 32px rgba(16,185,129,.35)',
        }}>
        <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{pathLength:0}} animate={{pathLength:1}} transition={{delay:.4,duration:.5}}>
          <polyline points="20 6 9 17 4 12"/>
        </motion.svg>
      </motion.div>
      <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:24,color:'#0F172A',marginBottom:10}}>
        E-Mail-Client geöffnet!
      </h3>
      <p style={{color:'#64748B',fontSize:15,lineHeight:1.7,maxWidth:320,margin:'0 auto'}}>
        Ihre Anfrage wurde vorausgefüllt. Bitte senden Sie die E-Mail ab — wir melden uns innerhalb von 24 Stunden.
      </p>
    </motion.div>
  )
}

export default function Contact() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name:'', company:'', phone:'', topic:'', subject:'', message:'' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [dir, setDir] = useState(1) // slide direction

  function set(field, val) {
    setForm(f => ({...f, [field]: val}))
    if (errors[field]) setErrors(e => ({...e, [field]: false}))
  }

  function validateStep() {
    const e = {}
    if (step === 1) {
      if (!form.name.trim()) e.name = true
    }
    if (step === 2) {
      if (!form.topic) e.topic = true
      if (!form.subject.trim()) e.subject = true
    }
    if (step === 3) {
      if (!form.message.trim()) e.message = true
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (!validateStep()) return
    setDir(1)
    setStep(s => s + 1)
  }

  function back() {
    setDir(-1)
    setStep(s => s - 1)
  }

  function submit() {
    if (!validateStep()) return
    const body = [
      `Name: ${form.name}`,
      form.company ? `Unternehmen: ${form.company}` : '',
      form.phone ? `Telefon: ${form.phone}` : '',
      `Thema: ${form.topic}`,
      '',
      form.message,
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:support@imagecontent.de?subject=${encodeURIComponent(form.subject || form.topic)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -48 : 48, opacity: 0 }),
  }

  return (
    <Page>
      <div className="page">

        {/* Header */}
        <section style={{background:'linear-gradient(160deg,#F0F6FF,#EBF3FF)',padding:'80px 0 56px'}}>
          <div className="container">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
              <span className="tag" style={{marginBottom:16}}>Kontakt</span>
              <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:'clamp(36px,6vw,72px)',letterSpacing:'-2px',lineHeight:1.1,color:'#0F172A'}}>
                Wir sind<br/><span style={{color:'#2563EB'}}>für Sie da.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Main grid */}
        <section className="section">
          <div className="container contact-grid" style={{display:'grid',gridTemplateColumns:'1fr 1.25fr',gap:64,alignItems:'start'}}>

            {/* ── Info side ── */}
            <motion.div initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{duration:.6,ease:[.22,1,.36,1]}}>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:26,marginBottom:8,color:'#0F172A'}}>Kontaktaufnahme</h2>
              <p style={{fontSize:15,color:'#64748B',lineHeight:1.7,marginBottom:36}}>
                Schreiben Sie uns oder nutzen Sie das Formular — wir melden uns innerhalb von 24 Stunden.
              </p>

              <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:40}}>
                {info.map(({icon,label,value,link},i)=>(
                  <motion.div key={label} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                    transition={{delay:.1+i*.1}} whileHover={{x:4}}
                    style={{display:'flex',alignItems:'center',gap:16,background:'#F7F9FC',border:'1px solid #E8EEFE',borderRadius:14,padding:'18px 20px',cursor:'default'}}>
                    <div style={{width:44,height:44,background:'#EEF2FF',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                    </div>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:3}}>{label}</div>
                      {link
                        ? <a href={link} style={{fontSize:14,fontWeight:600,color:'#2563EB'}}>{value}</a>
                        : <span style={{fontSize:14,fontWeight:600,color:'#0F172A'}}>{value}</span>
                      }
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cities */}
              <div style={{marginBottom:32}}>
                <p style={{fontSize:12,fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:12}}>Standorte</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {cities.map(c=>(
                    <span key={c} style={{fontSize:12,fontWeight:600,background:'#F0F4FF',color:'#3B5BDB',padding:'5px 12px',borderRadius:50}}>{c}</span>
                  ))}
                </div>
              </div>

              {/* ISO badge */}
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6}}
                style={{display:'flex',alignItems:'center',gap:14,background:'linear-gradient(135deg,#1E3A5F,#2563EB)',borderRadius:14,padding:'16px 20px'}}>
                <div style={{width:40,height:40,background:'rgba(255,255,255,.15)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:9,color:'white',textAlign:'center',lineHeight:1.3}}>
                  DIN<br/>ISO<br/>9001
                </div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:'white'}}>ISO 9001 zertifiziert</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,.6)'}}>Qualitätsmanagementsystem nach internationalem Standard</div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Form side ── */}
            <motion.div initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:.6,ease:[.22,1,.36,1],delay:.1}}>
              <div className="form-card" style={{background:'white',border:'1px solid #E8EEFE',borderRadius:22,padding:'40px',boxShadow:'0 8px 48px rgba(0,0,0,.07)',overflow:'hidden'}}>

                {sent ? <SuccessScreen /> : (
                  <>
                    <StepIndicator step={step}/>

                    <div style={{overflow:'hidden',position:'relative'}}>
                      <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                          key={step}
                          custom={dir}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{duration:.28,ease:[.22,1,.36,1]}}
                        >

                          {/* ── Step 1: Kontaktdaten ── */}
                          {step === 1 && (
                            <div>
                              <p style={{fontSize:13,color:'#64748B',marginBottom:24,lineHeight:1.6}}>
                                Wie dürfen wir Sie ansprechen?
                              </p>
                              <div style={{marginBottom:16}}>
                                <Label>Name *</Label>
                                <input value={form.name} onChange={e=>set('name',e.target.value)}
                                  style={{...inputBase,...(errors.name?inputErr:{})}}
                                  placeholder="Max Mustermann"
                                  onFocus={e=>{e.target.style.borderColor='#2563EB';e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,.12)'}}
                                  onBlur={e=>{e.target.style.borderColor=errors.name?'#EF4444':'#E8EEFE';e.target.style.boxShadow='none'}}/>
                                {errors.name && <p style={{fontSize:11,color:'#EF4444',marginTop:4}}>Bitte geben Sie Ihren Namen ein.</p>}
                              </div>
                              <div style={{marginBottom:16}}>
                                <Label>Unternehmen</Label>
                                <input value={form.company} onChange={e=>set('company',e.target.value)}
                                  style={inputBase} placeholder="Muster GmbH (optional)"
                                  onFocus={e=>{e.target.style.borderColor='#2563EB';e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,.12)'}}
                                  onBlur={e=>{e.target.style.borderColor='#E8EEFE';e.target.style.boxShadow='none'}}/>
                              </div>
                              <div style={{marginBottom:28}}>
                                <Label>Telefon</Label>
                                <input value={form.phone} onChange={e=>set('phone',e.target.value)}
                                  style={inputBase} placeholder="+49 (optional)"
                                  onFocus={e=>{e.target.style.borderColor='#2563EB';e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,.12)'}}
                                  onBlur={e=>{e.target.style.borderColor='#E8EEFE';e.target.style.boxShadow='none'}}/>
                              </div>
                              <motion.button whileHover={{scale:1.02}} whileTap={{scale:.97}}
                                onClick={next}
                                className="btn btn--primary"
                                style={{width:'100%',justifyContent:'center',padding:'15px',fontSize:15}}>
                                Weiter
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                              </motion.button>
                            </div>
                          )}

                          {/* ── Step 2: Thema ── */}
                          {step === 2 && (
                            <div>
                              <p style={{fontSize:13,color:'#64748B',marginBottom:24,lineHeight:1.6}}>
                                Welches Thema möchten Sie besprechen?
                              </p>
                              <div style={{marginBottom:16}}>
                                <Label>Themenbereich *</Label>
                                <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:4}}>
                                  {topics.map(t=>(
                                    <motion.button key={t} whileTap={{scale:.95}}
                                      onClick={()=>set('topic',t)}
                                      style={{
                                        padding:'8px 14px',fontSize:13,fontWeight:600,
                                        borderRadius:8,cursor:'pointer',
                                        border:`1.5px solid ${form.topic===t?'#2563EB':'#E8EEFE'}`,
                                        background: form.topic===t?'#EEF2FF':'#F7F9FC',
                                        color: form.topic===t?'#2563EB':'#64748B',
                                        transition:'all .15s',
                                      }}>
                                      {t}
                                    </motion.button>
                                  ))}
                                </div>
                                {errors.topic && <p style={{fontSize:11,color:'#EF4444',marginTop:4}}>Bitte wählen Sie ein Thema.</p>}
                              </div>
                              <div style={{marginBottom:28}}>
                                <Label>Betreff *</Label>
                                <input value={form.subject} onChange={e=>set('subject',e.target.value)}
                                  style={{...inputBase,...(errors.subject?inputErr:{})}}
                                  placeholder="Worum geht es konkret?"
                                  onFocus={e=>{e.target.style.borderColor='#2563EB';e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,.12)'}}
                                  onBlur={e=>{e.target.style.borderColor=errors.subject?'#EF4444':'#E8EEFE';e.target.style.boxShadow='none'}}/>
                                {errors.subject && <p style={{fontSize:11,color:'#EF4444',marginTop:4}}>Bitte geben Sie einen Betreff ein.</p>}
                              </div>
                              <div style={{display:'flex',gap:12}}>
                                <motion.button whileHover={{scale:1.02}} whileTap={{scale:.97}}
                                  onClick={back}
                                  className="btn btn--outline"
                                  style={{flex:1,justifyContent:'center',padding:'14px',fontSize:14}}>
                                  Zurück
                                </motion.button>
                                <motion.button whileHover={{scale:1.02}} whileTap={{scale:.97}}
                                  onClick={next}
                                  className="btn btn--primary"
                                  style={{flex:2,justifyContent:'center',padding:'14px',fontSize:15}}>
                                  Weiter
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                                </motion.button>
                              </div>
                            </div>
                          )}

                          {/* ── Step 3: Nachricht ── */}
                          {step === 3 && (
                            <div>
                              <p style={{fontSize:13,color:'#64748B',marginBottom:24,lineHeight:1.6}}>
                                Beschreiben Sie Ihr Anliegen — je mehr Details, desto besser können wir Ihnen helfen.
                              </p>
                              <div style={{marginBottom:28}}>
                                <Label>Ihre Nachricht *</Label>
                                <textarea value={form.message} onChange={e=>set('message',e.target.value)}
                                  rows={6} style={{...inputBase,...(errors.message?inputErr:{}),resize:'vertical'}}
                                  placeholder="Beschreiben Sie Ihr Anliegen, Ihre aktuelle Situation und was Sie sich wünschen..."
                                  onFocus={e=>{e.target.style.borderColor='#2563EB';e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,.12)'}}
                                  onBlur={e=>{e.target.style.borderColor=errors.message?'#EF4444':'#E8EEFE';e.target.style.boxShadow='none'}}/>
                                {errors.message && <p style={{fontSize:11,color:'#EF4444',marginTop:4}}>Bitte geben Sie eine Nachricht ein.</p>}
                              </div>
                              <div style={{display:'flex',gap:12}}>
                                <motion.button whileHover={{scale:1.02}} whileTap={{scale:.97}}
                                  onClick={back}
                                  className="btn btn--outline"
                                  style={{flex:1,justifyContent:'center',padding:'14px',fontSize:14}}>
                                  Zurück
                                </motion.button>
                                <motion.button whileHover={{scale:1.02}} whileTap={{scale:.97}}
                                  onClick={submit}
                                  className="btn btn--primary"
                                  style={{flex:2,justifyContent:'center',padding:'14px',fontSize:15}}>
                                  Anfrage absenden
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                                </motion.button>
                              </div>
                              <p style={{fontSize:11.5,color:'#94A3B8',marginTop:12,textAlign:'center'}}>
                                Öffnet Ihren E-Mail-Client mit vorausgefüllter Anfrage.
                              </p>
                            </div>
                          )}

                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </section>

      </div>
      <style>{`
        @media(max-width:800px){
          .contact-grid{grid-template-columns:1fr!important;gap:32px!important}
        }
      `}</style>
    </Page>
  )
}
