import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
    transition={{ duration:.5, ease:[.22,1,.36,1] }}
  >{children}</motion.div>
)

/* ═══════════════════════════════════════════════════
   DATA — 4 Hauptbereiche, jeweils mit Sub-Leistungen
   ═══════════════════════════════════════════════════ */

const categories = [
  {
    accent: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    tag: 'Planung & Betrieb',
    title: 'IT-Infrastruktur',
    desc: 'Von der Rack-Montage bis zur virtualisierten Cloud — wir planen, liefern und betreiben Ihre gesamte IT-Infrastruktur. ISO 9001-zertifiziert, herstellerneutral, aus einer Hand.',
    icon: <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    stat: '7 Leistungsfelder',
    services: [
      {
        title: 'Server & Storage',
        desc: 'Beschaffung, Rack-Montage und Konfiguration von HP ProLiant, Dell PowerEdge und Synology NAS. Inklusive Verkabelung, Dokumentation und Remote-Monitoring.',
        icon: <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
        badges: ['HP ProLiant', 'Dell PowerEdge', 'Synology NAS'],
      },
      {
        title: 'Rechenzentrum & Housing',
        desc: 'Planung eigener RZ-Flächen sowie Colocation bei zertifizierten Partnern mit garantierten Verfügbarkeits-SLAs und physischer Zugangssicherung.',
        icon: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
        badges: ['Colocation', 'TIER III', 'ISO 27001'],
      },
      {
        title: 'Backup & Disaster Recovery',
        desc: 'Automatisierte Backup-Strategien mit verifizierbarer Wiederherstellung — lokal, extern und in der Cloud. RPO/RTO nach Ihren individuellen Anforderungen.',
        icon: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
        badges: ['Veeam', 'Acronis', 'Azure Backup'],
      },
      {
        title: 'Hardware-Beschaffung & Rollout',
        desc: 'Herstellerneutrale Beratung und bundesweiter Rollout — von der Bestellung bis zur betriebsbereiten Inbetriebnahme. Inklusive Inventarisierung und Lifecycle-Management.',
        icon: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
        badges: ['HP', 'Dell', 'Cisco', 'Lenovo'],
      },
      {
        title: 'Virtualisierung',
        desc: 'Server-Konsolidierung durch VMware, Hyper-V oder Proxmox steigert Auslastung und Ausfallsicherheit. On-premises oder in der Cloud — wir beraten herstellerneutral.',
        icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h10M7 12h5"/></>,
        badges: ['VMware vSphere', 'Hyper-V', 'Proxmox'],
      },
      {
        title: 'Netzwerke & WLAN',
        desc: 'Strukturierte Verkabelung, LAN/WAN-Design und professionelle WLAN-Ausleuchtung. Segmentierung, SD-WAN und permanentes Netzwerkmonitoring inklusive.',
        icon: <><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5.5" y2="16"/><line x1="12" y1="8" x2="18.5" y2="16"/></>,
        badges: ['Cisco', 'Ubiquiti', 'SD-WAN', 'VLAN'],
      },
      {
        title: 'Betriebssysteme',
        desc: 'Administration und Wartung von Windows Server, Linux und macOS. Active Directory, Gruppenrichtlinien und automatisiertes Patch-Management aus einer Hand.',
        icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
        badges: ['Windows Server', 'Linux', 'Active Directory'],
      },
    ],
  },
  {
    accent: '#2563EB',
    bg: '#EEF2FF',
    border: '#C7D7FE',
    tag: 'Schutz & Compliance',
    title: 'IT-Sicherheit',
    desc: 'Mehrschichtige Absicherung Ihrer IT-Umgebung — von der Firewall bis zum zertifizierten ISMS. Wir implementieren Schutzkonzepte, die echten Angriffen standhalten.',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    stat: '4 Leistungsfelder',
    services: [
      {
        title: 'Firewall & Endpoint Protection',
        desc: 'Next-Gen Firewalls mit Deep Packet Inspection blocken Bedrohungen in Echtzeit. Endpoint-Lösungen schützen jeden Arbeitsplatz vor Malware, Ransomware und Zero-Day-Angriffen.',
        icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
        badges: ['Fortinet', 'Palo Alto', 'Sophos', 'CrowdStrike'],
      },
      {
        title: 'Penetration Testing & Audits',
        desc: 'Gezielte Angriffssimulationen decken Schwachstellen in Infrastruktur, Applikationen und Prozessen auf — bevor ein echter Angreifer sie findet. Inklusive detailliertem Auditbericht.',
        icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
        badges: ['OWASP Top 10', 'Kali Linux', 'Metasploit'],
      },
      {
        title: 'Sicherheitskonzepte & ISMS',
        desc: 'Aufbau und Begleitung von Informationssicherheits-Managementsystemen nach ISO 27001 und BSI IT-Grundschutz. Von der Risikoanalyse bis zur erfolgreichen Zertifizierung.',
        icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
        badges: ['ISO 27001', 'BSI Grundschutz', 'DSGVO'],
      },
      {
        title: 'Security Monitoring 24×7',
        desc: 'Kontinuierliche Überwachung Ihrer IT-Umgebung mit automatischer Alarmierung und sofortiger Reaktion bei sicherheitsrelevanten Ereignissen rund um die Uhr.',
        icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
        badges: ['SIEM', 'SOC', 'IDS/IPS', 'Splunk'],
      },
    ],
  },
  {
    accent: '#0891B2',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    tag: 'Maßgeschneidert',
    title: 'Anwendungsentwicklung',
    desc: 'Individuelle Software, die exakt zu Ihren Prozessen passt — von der Webapplikation bis zur Datenbankintegration. Von der Idee bis zur langfristigen Wartung, alles aus einer Hand.',
    icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    stat: '4 Leistungsfelder',
    services: [
      {
        title: 'Individualsoftware & Portale',
        desc: 'Maßgeschneiderte Web- und Desktop-Applikationen für Ihre Prozesse: Portale, Dashboards, Automatisierungstools und Branchenlösungen — genau nach Ihren Anforderungen entwickelt.',
        icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
        badges: ['React', 'Node.js', '.NET', 'Vue.js'],
      },
      {
        title: 'API-Integration & Schnittstellen',
        desc: 'Nahtlose Verbindung von ERP, CRM, Branchensoftware und Drittsystemen. Wir entwickeln und dokumentieren moderne REST- und SOAP-Schnittstellen für Ihre Systemlandschaft.',
        icon: <><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></>,
        badges: ['REST API', 'SOAP', 'GraphQL', 'OpenAPI'],
      },
      {
        title: 'Datenbanken',
        desc: 'Administration, Performance-Optimierung und sichere Migration Ihrer Datenbanklandschaft. Backup-Konzepte, Hochverfügbarkeit und Monitoring inklusive.',
        icon: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
        badges: ['MS SQL', 'MySQL', 'PostgreSQL', 'Oracle'],
      },
      {
        title: 'Wartung & Weiterentwicklung',
        desc: 'Langfristige Softwarebetreuung: Security-Updates, Performance-Optimierungen und kontinuierliche Weiterentwicklung. Wir sind Ihr verlässlicher Partner über den Go-Live hinaus.',
        icon: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></>,
        badges: ['CI/CD', 'Git', 'Docker', 'Monitoring'],
      },
    ],
  },
]

const supportFeatures = [
  { label:'Level 1–4 Helpdesk',      sub:'Vollständige Support-Abdeckung',    icon:<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></> },
  { label:'E-Mail, Chat & Telefon',   sub:'Alle Kommunikationskanäle',         icon:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> },
  { label:'Remote via TeamViewer',    sub:'Sofortige Fernwartung',             icon:<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></> },
  { label:'Vor-Ort in 9 Städten',     sub:'Hannover, Berlin, München u.v.m.', icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></> },
]

/* ═══════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════ */

function SubCard({ service, accent, bg, i }) {
  return (
    <motion.div
      variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.5,ease:[.22,1,.36,1]}} }}
      whileHover={{ y:-4, boxShadow:'0 12px 40px rgba(0,0,0,.09)' }}
      style={{ background:'white', border:'1px solid #E8EEFE', borderRadius:16, padding:'22px', display:'flex', flexDirection:'column', gap:14, transition:'box-shadow .22s' }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX:0, transformOrigin:'left' }}
        whileInView={{ scaleX:1 }}
        viewport={{ once:true }}
        transition={{ duration:.7, delay:i*.07 }}
        style={{ height:2, background:`linear-gradient(90deg,${accent},${accent}44)`, borderRadius:2 }}
      />
      {/* Icon + Title */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <div style={{ width:40, height:40, background:`${accent}12`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {service.icon}
          </svg>
        </div>
        <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:15, color:'#0F172A', lineHeight:1.3, paddingTop:2 }}>
          {service.title}
        </h3>
      </div>
      {/* Description */}
      <p style={{ fontSize:13.5, color:'#64748B', lineHeight:1.7, flex:1 }}>{service.desc}</p>
      {/* Badges */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
        {service.badges.map(b => (
          <span key={b} style={{ fontSize:10.5, fontWeight:700, padding:'3px 9px', borderRadius:50, background:`${accent}10`, color:accent, border:`1px solid ${accent}28` }}>
            {b}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function CategoryBlock({ cat, index }) {
  const sectionBg = index % 2 === 0 ? '#F7F9FC' : 'white'
  return (
    <section className="section" style={{ background:sectionBg }}>
      <div className="container">

        {/* ── Category Banner ── */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-60px' }}
          transition={{ duration:.6, ease:[.22,1,.36,1] }}
          className="cat-banner"
          style={{
            background: cat.bg,
            border: `1px solid ${cat.border}`,
            borderRadius: 22,
            padding: '32px 40px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Dot pattern bg */}
          <div aria-hidden style={{
            position:'absolute', inset:0, opacity:.35,
            backgroundImage:`radial-gradient(circle, ${cat.accent}30 1px, transparent 1px)`,
            backgroundSize:'22px 22px',
          }}/>

          {/* Icon */}
          <motion.div
            whileHover={{ scale:1.08, rotate:-4 }}
            transition={{ type:'spring', stiffness:350, damping:20 }}
            style={{
              width:72, height:72,
              background: cat.accent,
              borderRadius:20,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
              boxShadow:`0 8px 32px ${cat.accent}55`,
              position:'relative',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {cat.icon}
            </svg>
          </motion.div>

          {/* Text */}
          <div style={{ position:'relative', flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', color:cat.accent, background:`${cat.accent}18`, padding:'4px 12px', borderRadius:50 }}>
                {cat.tag}
              </span>
              <span style={{ fontSize:11, fontWeight:600, color:'rgba(0,0,0,.3)', background:'rgba(0,0,0,.06)', padding:'4px 10px', borderRadius:50 }}>
                {cat.stat}
              </span>
            </div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:'clamp(22px,3vw,34px)', color:'#0F172A', letterSpacing:'-.5px', marginBottom:8 }}>
              {cat.title}
            </h2>
            <p style={{ fontSize:15, color:'#475569', lineHeight:1.7, maxWidth:640 }}>{cat.desc}</p>
          </div>
        </motion.div>

        {/* ── Sub-services Grid ── */}
        <motion.div
          className="sub-grid"
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}
          initial="hidden"
          whileInView="show"
          viewport={{ once:true, margin:'-40px' }}
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:.07 }} }}
        >
          {cat.services.map((service, i) => (
            <SubCard key={service.title} service={service} accent={cat.accent} bg={cat.bg} i={i}/>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════ */

const faqs = [
  { q: 'Was kostet IT-Outsourcing bei ImageContent?', a: 'Die Kosten richten sich nach Unternehmensgröße, gewünschtem Serviceumfang und SLA-Level. Wir erstellen Ihnen ein individuelles Angebot — meist innerhalb von 24 Stunden nach dem ersten Gespräch. Gerne beginnen wir mit einem kostenlosen Beratungsgespräch.' },
  { q: 'Wie schnell reagiert Ihr Support?', a: 'Im Durchschnitt antworten wir innerhalb von 4 Minuten. Unser 24×7-Team löst 78 % aller Tickets bereits im First-Level ohne Weiterleitung. Für kritische Systeme bieten wir SLAs mit garantierten Reaktionszeiten ab 15 Minuten.' },
  { q: 'Betreut ihr auch kleinere Unternehmen?', a: 'Ja — unsere Kunden reichen von 5-Mann-Kanzleien bis zu Kliniken mit 800 Mitarbeitern. Das Leistungspaket wird immer individuell auf Ihre Größe und Ihr Budget zugeschnitten. Es gibt keine Mindestgröße.' },
  { q: 'Können wir mit bestehender Hardware weiterarbeiten?', a: 'In den meisten Fällen ja. Wir analysieren Ihre aktuelle Infrastruktur und empfehlen nur dann Neuanschaffungen, wenn es technisch oder wirtschaftlich sinnvoll ist. Herstellerneutrale Beratung ist für uns selbstverständlich.' },
  { q: 'Wie läuft ein typisches Projekt ab?', a: 'Nach dem Erstgespräch folgt eine Ist-Analyse, dann ein detaillierter Projektplan mit Zeitrahmen und Meilensteinen. Wir arbeiten nach einem strukturierten 5-Phasen-Modell: Analyse → Planung → Lieferung → Implementierung → Go-Live & Support.' },
  { q: 'Welche Branchen betreut ihr?', a: 'Wir sind branchenübergreifend tätig — mit besonderer Expertise in Healthcare (Kliniken, Radiologie, Kardiologie), professionellen Dienstleistungen (Kanzleien, Steuerberater) und mittelständischen Produktions- und Handelsunternehmen.' },
  { q: 'Gibt es SLA-Verträge mit Garantie?', a: 'Ja. Alle Support-Leistungen werden durch individuelle SLA-Verträge abgesichert. Je nach Paket definieren wir gemeinsam Reaktionszeiten, Verfügbarkeitsziele und Eskalationsprozesse. Alle Verträge sind ISO 9001-konform dokumentiert.' },
  { q: 'Bietet ihr auch Cloud-Lösungen an?', a: 'Ja — von Microsoft Azure über hybride On-Premises/Cloud-Lösungen bis hin zu speziellen Healthcare-Cloud-Umgebungen. Wir beraten herstellerneutral und wählen die Lösung, die zu Ihren Anforderungen und Ihrem Budget passt.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section" style={{ background:'#F7F9FC' }}>
      <div className="container">
        <div className="sec-head sec-head--center" style={{ marginBottom:48 }}>
          <span className="tag">FAQ</span>
          <h2 className="sec-title">Häufige Fragen.</h2>
          <p className="sec-desc">Alles Wichtige auf einen Blick — falls noch etwas offen bleibt, melden Sie sich einfach.</p>
        </div>

        <div style={{ maxWidth:780, margin:'0 auto', display:'flex', flexDirection:'column', gap:12 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div key={i}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-30px' }}
                transition={{ delay: i * .04, duration:.4, ease:[.22,1,.36,1] }}
                style={{
                  background:'white', border:`1.5px solid ${isOpen ? '#2563EB' : '#E8EEFE'}`,
                  borderRadius:14, overflow:'hidden',
                  transition:'border-color .2s, box-shadow .2s',
                  boxShadow: isOpen ? '0 4px 24px rgba(37,99,235,.1)' : 'none',
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                    gap:16, padding:'20px 24px', background:'none', border:'none',
                    cursor:'pointer', fontFamily:'inherit', textAlign:'left',
                  }}
                >
                  <span style={{ fontSize:15, fontWeight:700, color: isOpen ? '#2563EB' : '#0F172A', lineHeight:1.4, flex:1 }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration:.25 }}
                    style={{
                      width:28, height:28, borderRadius:'50%', flexShrink:0,
                      background: isOpen ? '#EEF2FF' : '#F1F5F9',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={isOpen ? '#2563EB' : '#64748B'} strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:.3, ease:[.22,1,.36,1] }}
                      style={{ overflow:'hidden' }}
                    >
                      <p style={{
                        fontSize:14.5, color:'#64748B', lineHeight:1.75,
                        padding:'0 24px 20px', borderTop:'1px solid #F1F5F9',
                        paddingTop:16,
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ delay:.3 }} style={{ textAlign:'center', marginTop:40 }}>
          <p style={{ fontSize:15, color:'#64748B', marginBottom:16 }}>
            Noch eine Frage? Wir antworten innerhalb von 24 Stunden.
          </p>
          <Link to="/kontakt" className="btn btn--outline">Frage stellen →</Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function Services() {
  return (
    <Page>
      <div className="page">

        {/* ── HERO ── */}
        <section style={{ background:'linear-gradient(160deg,#F0F6FF,#EBF3FF)', padding:'80px 0 60px' }}>
          <div className="container">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
              <span className="tag" style={{ marginBottom:16 }}>Leistungen</span>
              <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:'clamp(36px,6vw,72px)', letterSpacing:'-2px', lineHeight:1.1, color:'#0F172A' }}>
                Was wir<br/><span style={{ color:'#2563EB' }}>für Sie tun.</span>
              </h1>
              <p style={{ fontSize:17, color:'#64748B', marginTop:16, maxWidth:520, lineHeight:1.75 }}>
                Vier Kernbereiche — strukturiert, vollständig und aus einer Hand. IT-Infrastruktur, Sicherheit, Entwicklung und Support.
              </p>
              {/* Quick-Nav */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:28 }}>
                {['IT-Infrastruktur','IT-Sicherheit','Anwendungsentwicklung','Support 24×7'].map((label, i) => {
                  const colors = ['#7C3AED','#2563EB','#0891B2','#059669']
                  return (
                    <motion.a key={label} href={`#cat-${i}`}
                      whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}
                      style={{ fontSize:13, fontWeight:600, padding:'8px 18px', borderRadius:50, background:`${colors[i]}12`, color:colors[i], border:`1px solid ${colors[i]}30`, textDecoration:'none', transition:'background .2s' }}>
                      {label}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORY BLOCKS ── */}
        {categories.map((cat, i) => (
          <div key={cat.title} id={`cat-${i}`}>
            <CategoryBlock cat={cat} index={i}/>
          </div>
        ))}

        {/* ── SUPPORT 24×7 ── */}
        <div id="cat-3">
          <section style={{ background:'linear-gradient(135deg,#064E3B 0%,#065F46 55%,#047857 100%)', padding:'80px 0', position:'relative', overflow:'hidden' }}>
            <div aria-hidden style={{
              position:'absolute', inset:0,
              backgroundImage:'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
              backgroundSize:'36px 36px',
            }}/>
            <div className="container" style={{ position:'relative', zIndex:1 }}>

              {/* Header */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center', marginBottom:56 }} className="support-header">
                <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}>
                  <span className="tag tag--white" style={{ marginBottom:16 }}>L1 – L4</span>
                  <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:'clamp(28px,4vw,44px)', color:'white', letterSpacing:'-.6px', marginBottom:14 }}>
                    Support 24×7
                  </h2>
                  <p style={{ fontSize:16, color:'rgba(255,255,255,.7)', lineHeight:1.75, marginBottom:28 }}>
                    Zuverlässiger IT-Support rund um die Uhr — remote und vor Ort in 9 deutschen Städten. Wir lösen 78 % aller Anfragen im First-Level mit Ø 4 Min. Reaktionszeit.
                  </p>
                  <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }} style={{ display:'inline-block' }}>
                    <Link to="/kontakt" className="btn btn--white">Support anfragen</Link>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
                  style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  {[
                    { val:'24×7', label:'Verfügbarkeit' },
                    { val:'9',    label:'Standorte D-A-CH' },
                    { val:'78 %', label:'First-Level-Quote' },
                    { val:'4 min',label:'Ø Reaktionszeit' },
                  ].map(({ val, label }) => (
                    <div key={label} style={{ background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', borderRadius:14, padding:'20px 22px' }}>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:28, color:'white', lineHeight:1 }}>{val}</div>
                      <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', fontWeight:600, marginTop:6, textTransform:'uppercase', letterSpacing:'.08em' }}>{label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Feature cards */}
              <motion.div
                style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}
                className="support-grid"
                initial="hidden" whileInView="show" viewport={{ once:true }}
                variants={{ hidden:{}, show:{ transition:{ staggerChildren:.08 }} }}
              >
                {supportFeatures.map((f, i) => (
                  <motion.div key={f.label}
                    variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:.5}} }}
                    style={{ background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', borderRadius:14, padding:'20px 20px' }}
                  >
                    <div style={{ width:42, height:42, background:'rgba(255,255,255,.12)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {f.icon}
                      </svg>
                    </div>
                    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:14, color:'white', marginBottom:4 }}>{f.label}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,.5)' }}>{f.sub}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </div>

        {/* ── FAQ ── */}
        <FAQ />

        {/* ── OUTSOURCING CTA ── */}
        <section className="section" style={{ background:'white' }}>
          <div className="container cta-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
            <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:.6, ease:[.22,1,.36,1] }}>
              <span className="tag" style={{ marginBottom:16 }}>IT-Outsourcing</span>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:'clamp(26px,3.5vw,40px)', letterSpacing:'-.6px', marginBottom:16, color:'#0F172A' }}>
                Ihre externe IT-Abteilung.
              </h2>
              <p style={{ fontSize:16, color:'#64748B', lineHeight:1.75, marginBottom:32 }}>
                Wir übernehmen Ihre IT vollständig oder ergänzen Ihr bestehendes Team gezielt — skalierbar, kostentransparent und ISO 9001-zertifiziert.
              </p>
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }} style={{ display:'inline-block' }}>
                <Link to="/kontakt" className="btn btn--primary">Outsourcing anfragen</Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:.6 }}
              style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                { label:'Vollständige IT-Übernahme',  badge:'Komplett',   color:'#7C3AED' },
                { label:'Ergänzender IT-Support',     badge:'Flexibel',   color:'#2563EB' },
                { label:'Projekt-basiertes Outsourcing',badge:'Skalierbar',color:'#0891B2' },
                { label:'SLA-gesicherter Betrieb',    badge:'ISO 9001',   color:'#059669' },
              ].map(({ label, badge, color }, i) => (
                <motion.div key={label}
                  initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay: i*.08 }}
                  whileHover={{ x:4 }}
                  style={{ display:'flex', alignItems:'center', gap:14, background:'#F7F9FC', border:'1px solid #E8EEFE', borderRadius:12, padding:'16px 20px', transition:'background .2s' }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', background:color, flexShrink:0 }}/>
                  <span style={{ fontSize:14, fontWeight:600, flex:1, color:'#0F172A' }}>{label}</span>
                  <span style={{ fontSize:11, fontWeight:700, background:`${color}12`, color, padding:'3px 10px', borderRadius:50, border:`1px solid ${color}28` }}>{badge}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      </div>

      <style>{`
        @media(max-width:1024px) {
          .sub-grid { grid-template-columns: repeat(2,1fr) !important; }
          .support-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:700px) {
          .sub-grid { grid-template-columns: 1fr !important; }
          .support-grid { grid-template-columns: 1fr 1fr !important; }
          .support-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media(max-width:520px) {
          .support-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Page>
  )
}
