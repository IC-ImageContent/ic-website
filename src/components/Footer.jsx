import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const cols = [
  {
    title: 'Leistungen',
    links: [
      { label: 'IT-Sicherheit',        to: '/leistungen' },
      { label: 'IT-Infrastruktur',      to: '/leistungen' },
      { label: 'Anwendungsentwicklung', to: '/leistungen' },
      { label: 'Netzwerke',             to: '/leistungen' },
      { label: 'Support 24×7',          to: '/leistungen' },
    ],
  },
  {
    title: 'Bereiche',
    links: [
      { label: 'Healthcare-IT',    to: '/healthcare' },
      { label: 'RIS & PACS',       to: '/healthcare' },
      { label: 'INQA-Coaching',    to: '/leistungen' },
      { label: 'IT-Outsourcing',   to: '/leistungen' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns',   to: '/unternehmen' },
      { label: 'Standorte',  to: '/unternehmen' },
      { label: 'Karriere',   to: '/kontakt' },
      { label: 'Impressum',   to: '/impressum' },
      { label: 'Datenschutz', to: '/datenschutz' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background:'#080D18', color:'#fff', padding:'72px 0 32px' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:48, marginBottom:56, flexWrap:'wrap' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ width:34, height:34, background:'linear-gradient(135deg,#2563EB,#1E3A5F)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:17, color:'#fff' }}>
                Image<span style={{ color:'#3B82F6' }}>Content</span>
              </span>
            </div>
            <p style={{ fontSize:14, color:'rgba(255,255,255,.45)', lineHeight:1.75, marginBottom:24, maxWidth:260 }}>
              ImageContent GmbH & Co. KG<br/>
              ISO 9001 zertifiziert · Seit 2000<br/>
              D-A-CH: 9 Standorte
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {[
                { href:'https://www.instagram.com/imagecontent.de/', icon:<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                { href:'https://www.linkedin.com/company/imagecontent/', icon:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></> },
              ].map(({ href, icon }, i) => (
                <motion.a key={i} href={href} target="_blank" rel="noopener"
                  whileHover={{ scale:1.1, backgroundColor:'#2563EB' }}
                  style={{ width:36, height:36, background:'rgba(255,255,255,.08)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.35)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>{col.title}</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {col.links.map(({ label, to, href }) => (
                  <li key={label}>
                    {href
                      ? <a href={href} target="_blank" rel="noopener" style={{ fontSize:14, color:'rgba(255,255,255,.5)', transition:'color .2s' }}
                          onMouseEnter={e=>e.target.style.color='#fff'}
                          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.5)'}>{label}</a>
                      : <Link to={to} style={{ fontSize:14, color:'rgba(255,255,255,.5)', transition:'color .2s' }}
                          onMouseEnter={e=>e.target.style.color='#fff'}
                          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.5)'}>{label}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:28, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.3)' }}>© 2025 ImageContent GmbH & Co. KG. Alle Rechte vorbehalten.</p>
          <div style={{ display:'flex', gap:20 }}>
            {[{ label:'Impressum', to:'/impressum' },{ label:'Datenschutz', to:'/datenschutz' }].map(({ label, to }) => (
              <Link key={label} to={to}
                style={{ fontSize:13, color:'rgba(255,255,255,.3)', transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.7)'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.3)'}>{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
