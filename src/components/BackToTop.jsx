import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity:0, scale:.6, y:16 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:.6, y:16 }}
          whileHover={{ scale:1.12 }}
          whileTap={{ scale:.93 }}
          transition={{ type:'spring', stiffness:400, damping:25 }}
          onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          aria-label="Nach oben scrollen"
          style={{
            position: 'fixed',
            bottom: 28,
            right: 24,
            zIndex: 89,
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg,#2563EB,#1E3A5F)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37,99,235,.45)',
            cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
