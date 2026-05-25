import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
    transition={{ duration:.5, ease:[.22,1,.36,1] }}
  >{children}</motion.div>
)

export default function NotFound() {
  return (
    <Page>
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg,#F0F6FF 0%,#EBF3FF 55%,#DBEAFE 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated grid bg */}
        <div aria-hidden style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(37,99,235,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.05) 1px,transparent 1px)',
          backgroundSize:'48px 48px',
          maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)',
          WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)',
        }}/>

        <div style={{ position:'relative', zIndex:1, maxWidth:520 }}>

          {/* 404 */}
          <motion.div
            initial={{ opacity:0, scale:.7 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:.7, ease:[.22,1,.36,1] }}
            style={{
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(96px,20vw,180px)',
              letterSpacing: '-6px',
              lineHeight: 1,
              background: 'linear-gradient(135deg,#BFDBFE 0%,#2563EB 60%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              userSelect: 'none',
              marginBottom: 4,
            }}
          >
            404
          </motion.div>

          {/* Bouncing icon */}
          <motion.div
            animate={{ y:[0,-14,0] }}
            transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}
            style={{
              width:52, height:52,
              background:'linear-gradient(135deg,#2563EB,#1E3A5F)',
              borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              margin:'-20px auto 32px',
              boxShadow:'0 8px 28px rgba(37,99,235,.4)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:.2, duration:.6 }}
            style={{
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              fontWeight:800, fontSize:'clamp(24px,4vw,36px)',
              color:'#0F172A', letterSpacing:'-.5px', marginBottom:14,
            }}
          >
            Diese Seite existiert nicht.
          </motion.h1>

          <motion.p
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:.35, duration:.5 }}
            style={{ fontSize:17, color:'#64748B', lineHeight:1.75, marginBottom:40 }}
          >
            Die gesuchte URL wurde nicht gefunden — möglicherweise wurde sie verschoben
            oder der Link ist fehlerhaft.
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:.5, duration:.5 }}
            style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}
          >
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              <Link to="/" className="btn btn--primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Zur Startseite
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              <Link to="/kontakt" className="btn btn--outline">Kontakt aufnehmen</Link>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </Page>
  )
}
