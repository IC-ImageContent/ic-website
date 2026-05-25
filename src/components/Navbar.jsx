import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const links = [
  { to: '/leistungen',  label: 'Leistungen' },
  { to: '/unternehmen', label: 'Unternehmen' },
  { to: '/healthcare',  label: 'Healthcare-IT' },
]

const Logo = () => (
  <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
    <motion.div
      whileHover={{ scale: 1.08, rotate: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{
        width: 36, height: 36,
        background: 'linear-gradient(135deg, #2563EB, #1E3A5F)',
        borderRadius: 9,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    </motion.div>
    <span style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 800, fontSize: 19,
      color: '#1E3A5F', letterSpacing: '-.3px',
    }}>
      Image<span style={{ color: '#2563EB' }}>Content</span>
    </span>
  </Link>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        animate={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0)', boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : '0 0 0 transparent' }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>
          <Logo />

          {/* Desktop links */}
          <div style={{ display:'flex', alignItems:'center', gap:4 }} className="nav-desktop">
            <Link to="/" style={{ position:'relative', padding:'8px 12px', color: pathname === '/' ? '#2563EB' : '#64748B', transition:'color .2s', borderRadius:8, display:'flex', alignItems:'center' }}>
              <HomeIcon />
              {pathname === '/' && (
                <motion.div layoutId="nav-indicator" style={{
                  position:'absolute', bottom:2, left:'50%', transform:'translateX(-50%)',
                  width:16, height:2, background:'#2563EB', borderRadius:2,
                }} />
              )}
            </Link>
            {links.map(({ to, label }) => (
              <Link key={to} to={to} style={{ position:'relative', padding:'8px 14px', fontSize:14, fontWeight:500, color: pathname === to ? '#2563EB' : '#64748B', transition:'color .2s', borderRadius:8 }}>
                {label}
                {pathname === to && (
                  <motion.div layoutId="nav-indicator" style={{
                    position:'absolute', bottom:2, left:'50%', transform:'translateX(-50%)',
                    width:20, height:2, background:'#2563EB', borderRadius:2,
                  }} />
                )}
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ marginLeft:8 }}>
              <Link to="/kontakt" className="btn btn--primary" style={{ padding:'10px 22px', fontSize:14 }}>
                Kontakt
              </Link>
            </motion.div>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menü"
            style={{ background:'none', border:'none', padding:8, display:'none' }}
            className="nav-hamburger"
          >
            {[0,1,2].map(i => (
              <motion.span key={i} animate={{ opacity: open && i===1 ? 0 : 1, rotate: open ? (i===0 ? 45 : i===2 ? -45 : 0) : 0, y: open ? (i===0 ? 7 : i===2 ? -7 : 0) : 0 }}
                style={{ display:'block', width:22, height:2, background:'#0F172A', borderRadius:2, marginBottom: i<2 ? 5 : 0 }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
            transition={{ duration:.25, ease:[.22,1,.36,1] }}
            style={{
              position:'fixed', top:72, left:0, right:0, zIndex:99,
              background:'rgba(255,255,255,.98)', backdropFilter:'blur(20px)',
              borderBottom:'1px solid #E8EEFE', padding:'16px 24px 24px',
            }}
          >
            {[{ to:'/', label:'Startseite' }, ...links, { to:'/kontakt', label:'Kontakt' }].map(({ to, label }, i) => (
              <motion.div key={to}
                initial={{ opacity:0, x:-16 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={to} style={{
                  display:'block', padding:'14px 0', fontSize:18, fontWeight:600,
                  color: pathname===to ? '#2563EB' : '#0F172A',
                  borderBottom:'1px solid #F1F5F9',
                }}>
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  )
}
