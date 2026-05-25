import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      const t = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  function accept(type) {
    localStorage.setItem('cookie-consent', type)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)',
            maxWidth: 860,
            zIndex: 9999,
          }}
        >
          <div style={{
            background: '#080D18',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 18,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            boxShadow: '0 24px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(37,99,235,.15)',
          }}>

            {/* Shield icon */}
            <div style={{
              flexShrink: 0,
              width: 44, height: 44,
              background: 'rgba(37,99,235,.14)',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 3 }}>
                Cookies &amp; Datenschutz
              </p>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.48)', lineHeight: 1.55 }}>
                Wir verwenden ausschließlich technisch notwendige Cookies für den Betrieb dieser Website.{' '}
                <Link to="/datenschutz"
                  style={{ color: '#3B82F6', fontWeight: 600 }}
                  onClick={() => setVisible(false)}>
                  Datenschutzerklärung
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, flexShrink: 0, alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => accept('declined')}
                style={{
                  fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.38)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '8px 6px', transition: 'color .2s',
                }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.7)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.38)'}
              >
                Ablehnen
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
                onClick={() => accept('essential')}
                style={{
                  fontSize: 13, fontWeight: 600, padding: '9px 18px',
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.18)',
                  borderRadius: 9, color: 'rgba(255,255,255,.75)',
                  cursor: 'pointer', transition: 'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.13)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
              >
                Nur essenziell
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}
                onClick={() => accept('accepted')}
                style={{
                  fontSize: 13, fontWeight: 700, padding: '9px 20px',
                  background: '#2563EB', border: 'none',
                  borderRadius: 9, color: 'white',
                  cursor: 'pointer', boxShadow: '0 4px 16px rgba(37,99,235,.4)',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
                onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
              >
                Alle akzeptieren
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
