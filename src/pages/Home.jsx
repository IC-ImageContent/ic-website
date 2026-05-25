import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  motion, useInView, useMotionValue, useTransform,
  useScroll, animate, AnimatePresence,
} from 'framer-motion'

/* ════════════════════════════════════════════════
   SECURITY GRAPHICS — professional dark-tech style
   ════════════════════════════════════════════════ */

/* ── Graphic 1: Defense-in-Depth — dark, glowing rings ── */
function NetworkZoneDiagram() {
  const cx = 150, cy = 130
  const threatAngles = [0, 52, 108, 165, 220, 278, 330]
  return (
    <svg viewBox="0 0 300 240" width="300" height="240" style={{display:'block'}}>
      <defs>
        <radialGradient id="nzBg" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#1e3a5f"/>
          <stop offset="100%" stopColor="#080d18"/>
        </radialGradient>
        <radialGradient id="nzR1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef444430"/>
          <stop offset="100%" stopColor="#ef444408"/>
        </radialGradient>
        <radialGradient id="nzR2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f9731640"/>
          <stop offset="100%" stopColor="#f9731610"/>
        </radialGradient>
        <radialGradient id="nzR3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f655"/>
          <stop offset="100%" stopColor="#3b82f615"/>
        </radialGradient>
        <radialGradient id="shieldGrad" cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#60a5fa"/>
          <stop offset="100%" stopColor="#1d4ed8"/>
        </radialGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#000" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Dark background */}
      <rect width="300" height="240" fill="url(#nzBg)"/>
      {/* Subtle dot grid */}
      {Array.from({length:10}).map((_,r) =>
        Array.from({length:13}).map((_,c) => (
          <circle key={`${r}-${c}`} cx={12+c*24} cy={12+r*24} r="0.8" fill="rgba(255,255,255,0.06)"/>
        ))
      )}

      {/* Zone fills */}
      <circle cx={cx} cy={cy} r="115" fill="url(#nzR1)"/>
      <circle cx={cx} cy={cy} r="82"  fill="url(#nzR2)"/>
      <circle cx={cx} cy={cy} r="50"  fill="url(#nzR3)"/>

      {/* Zone ring borders */}
      <motion.circle cx={cx} cy={cy} r="115" fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="5 4"
        animate={{rotate:360}} transition={{duration:40, repeat:Infinity, ease:'linear'}} style={{transformOrigin:`${cx}px ${cy}px`}}/>
      <motion.circle cx={cx} cy={cy} r="82" fill="none" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.55"
        animate={{strokeOpacity:[0.3,0.7,0.3]}} transition={{duration:3, repeat:Infinity, ease:'easeInOut'}}/>
      <circle cx={cx} cy={cy} r="50" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.7"/>

      {/* Zone labels — pill style */}
      <rect x={cx-34} y={cy-130} width="68" height="16" rx="8" fill="#ef444420" stroke="#ef4444" strokeWidth="0.8" strokeOpacity="0.6"/>
      <text x={cx} y={cy-119} textAnchor="middle" fontSize="7.5" fill="#fca5a5" fontWeight="800" letterSpacing="1.5">INTERNET</text>

      <rect x={cx-42} y={cy-97} width="84" height="14" rx="7" fill="#f9731618" stroke="#f97316" strokeWidth="0.8" strokeOpacity="0.5"/>
      <text x={cx} y={cy-87} textAnchor="middle" fontSize="7" fill="#fdba74" fontWeight="700" letterSpacing="1">FIREWALL · DMZ</text>

      <rect x={cx-22} y={cy-65} width="44" height="13" rx="6.5" fill="#3b82f625" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.6"/>
      <text x={cx} y={cy-55.5} textAnchor="middle" fontSize="7" fill="#93c5fd" fontWeight="700" letterSpacing="1">LAN</text>

      {/* Center shield */}
      <motion.g filter="url(#softglow)" animate={{scale:[1,1.06,1]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}} style={{transformOrigin:`${cx}px ${cy}px`}}>
        <path d={`M${cx} ${cy-18} l-14 5.5v9c0 8.5 14 14 14 14s14-5.5 14-14v-9z`} fill="url(#shieldGrad)" filter="url(#drop)"/>
        <polyline points={`${cx-5},${cy+2} ${cx-1},${cy+7} ${cx+7},${cy-5}`} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.g>

      {/* Orbiting threats */}
      {threatAngles.map((deg,i) => {
        const r2 = (deg*Math.PI)/180
        const tx = cx + 103*Math.cos(r2), ty = cy + 103*Math.sin(r2)
        return (
          <motion.g key={i}
            animate={{opacity:[0.25,0.9,0.25], scale:[0.7,1,0.7]}}
            transition={{duration:2+i*0.28, repeat:Infinity, delay:i*0.38, ease:'easeInOut'}}
            style={{transformOrigin:`${tx}px ${ty}px`}}
          >
            <circle cx={tx} cy={ty} r="7" fill="#ef4444" opacity="0.9" filter="url(#glow)"/>
            <line x1={tx-3} y1={ty-3} x2={tx+3} y2={ty+3} stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1={tx+3} y1={ty-3} x2={tx-3} y2={ty+3} stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </motion.g>
        )
      })}

      {/* Animated safe data dots flowing inward */}
      {[30,150,270].map((deg,i) => {
        const r2 = (deg*Math.PI)/180
        const x1=cx+80*Math.cos(r2), y1=cy+80*Math.sin(r2)
        const x2=cx+52*Math.cos(r2), y2=cy+52*Math.sin(r2)
        return (
          <motion.circle key={`safe-${i}`} r="3.5" fill="#10b981" filter="url(#glow)"
            animate={{cx:[x1,x2,x2], cy:[y1,y2,y2], opacity:[0,1,0]}}
            transition={{duration:1.8, repeat:Infinity, delay:i*0.65, ease:'easeOut'}}/>
        )
      })}
    </svg>
  )
}

/* ── Graphic 2: Firewall — dark dashboard style ── */
function FirewallDiagram() {
  const blockedY = [52, 88, 124]
  const passedY  = [70, 106]
  return (
    <svg viewBox="0 0 300 200" width="300" height="200" style={{display:'block'}}>
      <defs>
        <linearGradient id="fwBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a"/>
          <stop offset="100%" stopColor="#1a0a2e"/>
        </linearGradient>
        <linearGradient id="fwShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#dc2626"/>
        </linearGradient>
        <linearGradient id="fwLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef444418"/>
          <stop offset="100%" stopColor="#ef444408"/>
        </linearGradient>
        <linearGradient id="fwRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b98108"/>
          <stop offset="100%" stopColor="#10b98120"/>
        </linearGradient>
        <filter id="fwGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="fwDrop">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#f97316" floodOpacity="0.4"/>
        </filter>
        <clipPath id="fwClipL"><rect x="0" y="0" width="105" height="200"/></clipPath>
        <clipPath id="fwClipR"><rect x="195" y="0" width="105" height="200"/></clipPath>
      </defs>

      <rect width="300" height="200" fill="url(#fwBg)"/>
      {/* Grid */}
      {Array.from({length:9}).map((_,r) =>
        Array.from({length:13}).map((_,c) => (
          <circle key={`${r}-${c}`} cx={12+c*24} cy={12+r*22} r="0.7" fill="rgba(255,255,255,0.05)"/>
        ))
      )}

      {/* Left zone — threat */}
      <rect x="0" y="0" width="105" height="200" fill="url(#fwLeft)" rx="0"/>
      <rect x="8" y="12" width="89" height="176" rx="10" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.2)" strokeWidth="1"/>
      {/* Threat label */}
      <rect x="16" y="20" width="74" height="16" rx="8" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="0.8"/>
      <text x="53" y="31.5" textAnchor="middle" fontSize="7.5" fill="#fca5a5" fontWeight="800" letterSpacing="1">BEDROHUNGEN</text>
      {/* Threat type tags */}
      {['Malware','DDoS','Phishing','Exploit'].map((t,i) => (
        <g key={t}>
          <rect x="18" y={46+i*30} width="70" height="18" rx="5" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.35)" strokeWidth="0.8"/>
          <circle cx="28" cy={55+i*30} r="3" fill="#ef4444"/>
          <text x="36" y={58.5+i*30} fontSize="7.5" fill="#fca5a5" fontWeight="600">{t}</text>
        </g>
      ))}

      {/* Center — Firewall shield */}
      <motion.g filter="url(#fwDrop)"
        animate={{scale:[0.97,1.03,0.97]}}
        transition={{duration:3, repeat:Infinity, ease:'easeInOut'}}
        style={{transformOrigin:'150px 100px'}}>
        <path d="M150 62 l-24 9v16c0 14 24 23 24 23s24-9 24-23V71z" fill="url(#fwShield)"/>
        {/* Flame on shield */}
        <path d="M144 84 Q146 76 150 81 Q152 73 156 80 Q159 74 158 84 Q155 78 156 84 Q152 76 150 82 Q147 76 144 84z" fill="rgba(255,255,255,0.85)"/>
      </motion.g>
      {/* FIREWALL label */}
      <text x="150" y="120" textAnchor="middle" fontSize="9" fill="white" fontWeight="800" letterSpacing="1.5">FIREWALL</text>
      {/* Status badge */}
      <rect x="120" y="126" width="60" height="14" rx="7" fill="rgba(16,185,129,0.25)" stroke="#10b981" strokeWidth="0.8"/>
      <motion.circle cx="129" cy="133" r="3" fill="#10b981" animate={{opacity:[0.4,1,0.4]}} transition={{duration:1.2,repeat:Infinity}}/>
      <text x="136" y="136.5" fontSize="7" fill="#6ee7b7" fontWeight="700">AKTIV</text>
      {/* Vertical divider lines */}
      <line x1="105" y1="10" x2="105" y2="190" stroke="rgba(249,115,22,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
      <line x1="195" y1="10" x2="195" y2="190" stroke="rgba(16,185,129,0.2)" strokeWidth="1" strokeDasharray="4 3"/>

      {/* Right zone — protected */}
      <rect x="195" y="0" width="105" height="200" fill="url(#fwRight)"/>
      <rect x="203" y="12" width="89" height="176" rx="10" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" strokeWidth="1"/>
      <rect x="210" y="20" width="74" height="16" rx="8" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="0.8"/>
      <text x="247" y="31.5" textAnchor="middle" fontSize="7.5" fill="#6ee7b7" fontWeight="800" letterSpacing="1">GESCHÜTZT</text>
      {['Daten sicher','Zugriff OK','Compliance','Monitoring'].map((t,i) => (
        <g key={t}>
          <rect x="210" y={46+i*30} width="74" height="18" rx="5" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8"/>
          <polyline points={`220,${55.5+i*30} 223,${58.5+i*30} 228,${52.5+i*30}`} fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="233" y={58.5+i*30} fontSize="7.5" fill="#6ee7b7" fontWeight="600">{t}</text>
        </g>
      ))}

      {/* Animated blocked packets (left → center, bounce back) */}
      {blockedY.map((y,i) => (
        <motion.g key={`b${i}`}
          animate={{x:[0,68,52,0], opacity:[0,1,0.8,0]}}
          transition={{duration:2.2, repeat:Infinity, delay:i*0.75, ease:'easeInOut'}}
        >
          <rect x="108" y={y} width="14" height="11" rx="3.5" fill="#ef4444"/>
          <line x1="112" y1={y+3.5} x2="118" y2={y+7.5} stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="118" y1={y+3.5} x2="112" y2={y+7.5} stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        </motion.g>
      ))}
      {/* Animated passing packets */}
      {passedY.map((y,i) => (
        <motion.g key={`p${i}`}
          animate={{x:[0,78,78], opacity:[0,1,0]}}
          transition={{duration:2.5, repeat:Infinity, delay:0.5+i*1, ease:'easeInOut'}}
        >
          <rect x="108" y={y} width="14" height="11" rx="3.5" fill="#10b981"/>
          <polyline points={`112,${y+7} 115,${y+9} 119,${y+4}`} fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.g>
      ))}
    </svg>
  )
}

/* ── Graphic 3: Proxy Gateway — dark, clean flow ── */
function ProxyDiagram() {
  return (
    <svg viewBox="0 0 300 200" width="300" height="200" style={{display:'block'}}>
      <defs>
        <linearGradient id="pxBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a"/>
          <stop offset="100%" stopColor="#022c22"/>
        </linearGradient>
        <radialGradient id="pxNodeBg" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#065f46"/>
          <stop offset="100%" stopColor="#022c22"/>
        </radialGradient>
        <linearGradient id="pxShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
        <filter id="pxGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="pxNodeShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#10b981" floodOpacity="0.3"/>
        </filter>
        <marker id="arrowG" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#10b981"/>
        </marker>
      </defs>

      <rect width="300" height="200" fill="url(#pxBg)"/>
      {Array.from({length:9}).map((_,r) =>
        Array.from({length:13}).map((_,c) => (
          <circle key={`${r}-${c}`} cx={12+c*24} cy={12+r*22} r="0.7" fill="rgba(255,255,255,0.04)"/>
        ))
      )}

      {/* ── NODE 1: Client ── */}
      <g transform="translate(30,70)">
        <rect x="-28" y="-28" width="56" height="56" rx="14" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.4)" strokeWidth="1.2"/>
        {/* Laptop icon */}
        <rect x="-16" y="-16" width="32" height="21" rx="3" fill="rgba(99,102,241,0.35)" stroke="rgba(165,180,252,0.6)" strokeWidth="1"/>
        <rect x="-12" y="-13" width="24" height="15" rx="2" fill="rgba(99,102,241,0.5)"/>
        <rect x="-20" y="5" width="40" height="3" rx="1.5" fill="rgba(99,102,241,0.5)"/>
        <rect x="-6" y="5" width="12" height="3" rx="1.5" fill="rgba(165,180,252,0.7)"/>
      </g>
      <text x="30" y="116" textAnchor="middle" fontSize="8" fill="#a5b4fc" fontWeight="700">Client</text>

      {/* ── CONNECTOR 1 ── */}
      <line x1="62" y1="70" x2="108" y2="70" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" strokeDasharray="5 3"/>
      {[0,1,2].map(i => (
        <motion.circle key={i} r="4" fill="#10b981" filter="url(#pxGlow)"
          animate={{cx:[62,108,108], opacity:[0,1,0]}}
          transition={{duration:1.6, repeat:Infinity, delay:i*0.55, ease:'easeInOut'}}
          cy="70"/>
      ))}

      {/* ── NODE 2: Proxy Server (center, prominent) ── */}
      <g transform="translate(150,70)" filter="url(#pxNodeShadow)">
        <rect x="-42" y="-48" width="84" height="96" rx="16" fill="url(#pxNodeBg)" stroke="#10b981" strokeWidth="1.5"/>
        {/* Shield */}
        <path d="M0 -36 l-14 5.5v9c0 9.5 14 15 14 15s14-5.5 14-15v-9z" fill="url(#pxShield)"/>
        <polyline points="-5,-18 -1,-13 7,-23" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Feature pills */}
        {['Filter','SSL','Anonym'].map((f,i) => (
          <g key={f}>
            <rect x="-30" y={10+i*22} width="60" height="15" rx="7.5" fill="rgba(16,185,129,0.2)" stroke="rgba(52,211,153,0.4)" strokeWidth="0.8"/>
            <text x="0" y={21+i*22} textAnchor="middle" fontSize="7" fill="#6ee7b7" fontWeight="700">{f}</text>
          </g>
        ))}
      </g>
      <text x="150" y="140" textAnchor="middle" fontSize="8" fill="#6ee7b7" fontWeight="800">PROXY SERVER</text>

      {/* ── CONNECTOR 2 ── */}
      <line x1="192" y1="70" x2="238" y2="70" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" strokeDasharray="5 3"/>
      {[0,1,2].map(i => (
        <motion.circle key={i} r="4" fill="#10b981" filter="url(#pxGlow)"
          animate={{cx:[192,238,238], opacity:[0,1,0]}}
          transition={{duration:1.6, repeat:Infinity, delay:0.8+i*0.55, ease:'easeInOut'}}
          cy="70"/>
      ))}

      {/* ── NODE 3: Internet / Cloud ── */}
      <g transform="translate(268,70)">
        <rect x="-24" y="-28" width="48" height="56" rx="14" fill="rgba(71,85,105,0.2)" stroke="rgba(148,163,184,0.35)" strokeWidth="1.2"/>
        {/* Globe */}
        <circle cx="0" cy="-4" r="16" fill="none" stroke="rgba(148,163,184,0.7)" strokeWidth="1.2"/>
        <ellipse cx="0" cy="-4" rx="7" ry="16" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="0.9"/>
        <line x1="-16" y1="-4" x2="16" y2="-4" stroke="rgba(148,163,184,0.5)" strokeWidth="0.9"/>
        <line x1="-12" y1="-14" x2="12" y2="-14" stroke="rgba(148,163,184,0.4)" strokeWidth="0.8"/>
        <line x1="-12" y1="6"  x2="12" y2="6"  stroke="rgba(148,163,184,0.4)" strokeWidth="0.8"/>
      </g>
      <text x="268" y="116" textAnchor="middle" fontSize="8" fill="#94a3b8" fontWeight="700">Internet</text>

      {/* IP badge at bottom */}
      <motion.g animate={{opacity:[0.5,1,0.5]}} transition={{duration:2.5, repeat:Infinity, ease:'easeInOut'}}>
        <rect x="90" y="158" width="120" height="22" rx="11" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1"/>
        <circle cx="105" cy="169" r="3.5" fill="#10b981"/>
        <text x="113" y="173" fontSize="7.5" fill="#6ee7b7" fontWeight="700">IP anonymisiert · SSL verschlüsselt</text>
      </motion.g>
    </svg>
  )
}

/* ════════════════════════════════════════════════
   INFRA GRAPHICS — dark-tech, same style as security
   ════════════════════════════════════════════════ */

/* ── Infra 1: Server Rack ── */
function ServerRackGraphic() {
  const units = [
    { label:'HP ProLiant DL380 Gen10', load:78, color:'#10b981' },
    { label:'Dell PowerEdge R740xd',   load:62, color:'#3b82f6' },
    { label:'Synology NAS RS2821RP+',  load:41, color:'#f97316' },
    { label:'Cisco Catalyst 9300',     load:-1, color:'#8b5cf6' },
    { label:'APC Smart-UPS 3000VA',    load:92, color:'#10b981' },
  ]
  return (
    <svg viewBox="0 0 300 240" width="300" height="240" style={{display:'block'}}>
      <defs>
        <linearGradient id="rkBg" x1="0" y1="0" x2=".5" y2="1">
          <stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#1e1b4b"/>
        </linearGradient>
        <linearGradient id="rkFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#374151"/><stop offset="100%" stopColor="#1f2937"/>
        </linearGradient>
        <linearGradient id="rkUnit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b"/><stop offset="100%" stopColor="#0f172a"/>
        </linearGradient>
        <filter id="rkGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="300" height="240" fill="url(#rkBg)"/>
      {Array.from({length:9}).map((_,r)=>Array.from({length:12}).map((_,c)=>(
        <circle key={`${r}-${c}`} cx={14+c*25} cy={14+r*26} r=".7" fill="rgba(255,255,255,.04)"/>
      )))}
      {/* Chassis */}
      <rect x="22" y="12" width="256" height="218" rx="6" fill="url(#rkFrame)" stroke="#4b5563" strokeWidth="1.5"/>
      <rect x="22" y="12" width="20" height="218" rx="3" fill="#293548" stroke="#4b5563" strokeWidth=".8"/>
      <rect x="258" y="12" width="20" height="218" rx="3" fill="#293548" stroke="#4b5563" strokeWidth=".8"/>
      {Array.from({length:11}).map((_,i)=>(
        <g key={i}>
          <rect x="27" y={22+i*18} width="10" height="7" rx="1.5" fill="#1a2030" stroke="#374151" strokeWidth=".5"/>
          <rect x="263" y={22+i*18} width="10" height="7" rx="1.5" fill="#1a2030" stroke="#374151" strokeWidth=".5"/>
        </g>
      ))}
      {/* Top label */}
      <rect x="44" y="18" width="212" height="12" rx="3" fill="rgba(0,0,0,.35)"/>
      <text x="150" y="27.5" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,.35)" fontWeight="700" letterSpacing="2">ImageContent GmbH · RACK-01</text>
      {/* Server units */}
      {units.map((u,i)=>(
        <motion.g key={i}
          initial={{x:-30,opacity:0}} whileInView={{x:0,opacity:1}} viewport={{once:true}}
          transition={{delay:.3+i*.15,duration:.5,ease:[.22,1,.36,1]}}>
          <g transform={`translate(43,${34+i*37})`}>
            <rect width="214" height="31" rx="2" fill="url(#rkUnit)" stroke="#374151" strokeWidth=".7"/>
            {[0,1,2,3,4].map(v=>(
              <line key={v} x1={172+v*6} y1="4" x2={172+v*6} y2="27" stroke="#1e293b" strokeWidth="4" strokeLinecap="round"/>
            ))}
            <motion.circle cx="13" cy="15.5" r="4.5"
              fill={u.color} filter="url(#rkGlow)"
              animate={{opacity:[.5,1,.5]}}
              transition={{duration:1.8+i*.3,repeat:Infinity,delay:i*.35}}/>
            <text x="23" y="11" fontSize="6.5" fill="rgba(255,255,255,.75)" fontWeight="600">{u.label}</text>
            {u.load>=0 ? (
              <>
                <rect x="23" y="17" width="120" height="4" rx="2" fill="rgba(255,255,255,.07)"/>
                <motion.rect x="23" y="17" height="4" rx="2" fill={u.color} opacity=".85"
                  initial={{width:0}} whileInView={{width:u.load*1.2}} viewport={{once:true}}
                  transition={{delay:.8+i*.2,duration:1.4,ease:'easeOut'}}/>
                <text x="148" y="21.5" fontSize="5.5" fill="rgba(255,255,255,.4)">{u.load}%</text>
                <motion.circle cx="204" cy="15.5" r="2.5" fill={u.color}
                  animate={{opacity:[.1,1,.1]}} transition={{duration:.35+i*.1,repeat:Infinity}}/>
              </>
            ) : (
              Array.from({length:12}).map((_,p)=>(
                <motion.rect key={p} x={23+p*12} y="14" width="9" height="7" rx="1.2"
                  fill="rgba(139,92,246,.2)" stroke="rgba(139,92,246,.5)" strokeWidth=".6"
                  animate={{opacity:[.4,1,.4]}} transition={{duration:.8,repeat:Infinity,delay:p*.07}}/>
              ))
            )}
          </g>
        </motion.g>
      ))}
      {/* Status bar */}
      <rect x="22" y="218" width="256" height="12" rx="0" fill="#0f172a"/>
      <motion.circle cx="38" cy="224" r="3" fill="#10b981" filter="url(#rkGlow)"
        animate={{opacity:[.5,1,.5]}} transition={{duration:1.5,repeat:Infinity}}/>
      <text x="46" y="227" fontSize="5.5" fill="#6ee7b7" fontWeight="700">ONLINE</text>
      <text x="90" y="227" fontSize="5.5" fill="rgba(255,255,255,.3)">·  TEMP 22 °C  ·  1,2 kW  ·  UPS 100 %</text>
    </svg>
  )
}

/* ── Infra 2: Virtualization ── */
function VirtualizationGraphic() {
  const vms = [
    {label:'Web Server', sub:'nginx · 4 vCPU',   color:'#3b82f6', load:72, col:0, row:0},
    {label:'DB Server',  sub:'MySQL · 8 vCPU',   color:'#10b981', load:85, col:1, row:0},
    {label:'App Server', sub:'Node.js · 4 vCPU', color:'#8b5cf6', load:58, col:0, row:1},
    {label:'Backup VM',  sub:'Veeam · 2 vCPU',   color:'#f97316', load:23, col:1, row:1},
  ]
  return (
    <svg viewBox="0 0 300 240" width="300" height="240" style={{display:'block'}}>
      <defs>
        <linearGradient id="vzBg" x1="0" y1="0" x2=".5" y2="1">
          <stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#1e0f2e"/>
        </linearGradient>
        <linearGradient id="vzPhys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b"/><stop offset="100%" stopColor="#0f172a"/>
        </linearGradient>
        <filter id="vzGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="vzSm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="300" height="240" fill="url(#vzBg)"/>
      {Array.from({length:9}).map((_,r)=>Array.from({length:12}).map((_,c)=>(
        <circle key={`${r}-${c}`} cx={14+c*25} cy={14+r*26} r=".7" fill="rgba(255,255,255,.04)"/>
      )))}
      {/* VM Cards */}
      {vms.map((vm,i)=>{
        const x=16+vm.col*150, y=12+vm.row*84
        return(
        <motion.g key={i}
          initial={{opacity:0,y:-14,scale:.92}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true}}
          transition={{delay:.2+i*.15,duration:.5,ease:[.22,1,.36,1]}}>
          <rect x={x} y={y} width="136" height="72" rx="10" fill={vm.color} opacity=".06" filter="url(#vzSm)"/>
          <rect x={x} y={y} width="136" height="72" rx="10" fill={`${vm.color}12`} stroke={vm.color} strokeWidth=".9" strokeOpacity=".55"/>
          <motion.circle cx={x+14} cy={y+17} r="4.5" fill={vm.color} filter="url(#vzSm)"
            animate={{opacity:[.5,1,.5]}} transition={{duration:2,repeat:Infinity,delay:i*.5}}/>
          <text x={x+25} y={y+14} fontSize="7.5" fill="white" fontWeight="800">{vm.label}</text>
          <text x={x+25} y={y+24} fontSize="6" fill="rgba(255,255,255,.45)">{vm.sub}</text>
          <text x={x+8} y={y+38} fontSize="5.5" fill="rgba(255,255,255,.35)" fontWeight="600">CPU</text>
          <rect x={x+28} y={y+32} width="96" height="4" rx="2" fill="rgba(255,255,255,.08)"/>
          <motion.rect x={x+28} y={y+32} height="4" rx="2" fill={vm.color} opacity=".8"
            initial={{width:0}} whileInView={{width:vm.load*.96}} viewport={{once:true}}
            transition={{delay:.8+i*.2,duration:1.2,ease:'easeOut'}}/>
          <text x={x+128} y={y+36.5} fontSize="5.5" fill="rgba(255,255,255,.4)" textAnchor="end">{vm.load}%</text>
          <text x={x+8} y={y+52} fontSize="5.5" fill="rgba(255,255,255,.35)" fontWeight="600">RAM</text>
          <rect x={x+28} y={y+46} width="96" height="4" rx="2" fill="rgba(255,255,255,.08)"/>
          <motion.rect x={x+28} y={y+46} height="4" rx="2" fill={vm.color} opacity=".5"
            initial={{width:0}} whileInView={{width:vm.load*.67}} viewport={{once:true}}
            transition={{delay:1+i*.2,duration:1.2,ease:'easeOut'}}/>
          <motion.line x1={x+68} y1={y+72} x2={x+68} y2={178}
            stroke={vm.color} strokeWidth="1" strokeOpacity=".3" strokeDasharray="4 3"
            animate={{strokeOpacity:[.15,.5,.15]}} transition={{duration:2.5,repeat:Infinity,delay:i*.4}}/>
        </motion.g>
      )})}
      {/* Hypervisor bar */}
      <rect x="12" y="178" width="276" height="20" rx="0"
        fill="rgba(124,58,237,.2)" stroke="rgba(124,58,237,.4)" strokeWidth=".8"/>
      <text x="150" y="191.5" textAnchor="middle" fontSize="7" fill="rgba(167,139,250,.9)" fontWeight="800" letterSpacing="1.5">HYPERVISOR  ·  VMware vSphere 8</text>
      {/* Physical host */}
      <g transform="translate(12,200)">
        <rect width="276" height="32" rx="5" fill="url(#vzPhys)" stroke="#334155" strokeWidth="1.2"/>
        <text x="20" y="12" fontSize="6.5" fill="rgba(255,255,255,.45)" fontWeight="700">PHYSISCHER HOST</text>
        {Array.from({length:8}).map((_,i)=>(
          <motion.rect key={i} x={68+i*24} y="16" width="18" height="10" rx="2.5"
            fill="rgba(59,130,246,.25)" stroke="rgba(59,130,246,.45)" strokeWidth=".7"
            animate={{opacity:[.3,.9,.3]}}
            transition={{duration:1+i*.12,repeat:Infinity,delay:i*.1}}/>
        ))}
        <text x="12" y="28" fontSize="5.5" fill="rgba(255,255,255,.22)">256 GB RAM · 2× Intel Xeon · 48 Cores · 8× NVMe SSD</text>
      </g>
      {/* New VM spawning */}
      <motion.g animate={{opacity:[0,1,0],scale:[.8,1,.8]}}
        transition={{duration:3.5,repeat:Infinity,delay:2}}
        style={{transformOrigin:'150px 100px'}}>
        <rect x="116" y="3" width="68" height="26" rx="7"
          fill="rgba(16,185,129,.15)" stroke="#10b981" strokeWidth=".9" strokeDasharray="3 2"/>
        <text x="150" y="14" textAnchor="middle" fontSize="7" fill="#6ee7b7" fontWeight="700">+ Neue VM</text>
        <text x="150" y="24" textAnchor="middle" fontSize="6" fill="rgba(110,231,183,.6)">wird provisioniert …</text>
      </motion.g>
    </svg>
  )
}

/* ── Infra 3: Commissioning / Go-Live ── */
function CommissioningGraphic() {
  const steps = [
    {label:'Analyse',    sub:'Ist-Aufnahme',  color:'#3b82f6', done:true },
    {label:'Lieferung',  sub:'HP · Dell',     color:'#8b5cf6', done:true },
    {label:'Montage',    sub:'Rack & Kabel',  color:'#f97316', done:true },
    {label:'Konfig',     sub:'Setup & Test',  color:'#10b981', done:false},
    {label:'Go-Live',    sub:'SLA & Support', color:'#06b6d4', done:false},
  ]
  return (
    <svg viewBox="0 0 300 240" width="300" height="240" style={{display:'block'}}>
      <defs>
        <linearGradient id="cmBg" x1="0" y1="0" x2=".5" y2="1">
          <stop offset="0%" stopColor="#0f172a"/><stop offset="100%" stopColor="#0c1a2e"/>
        </linearGradient>
        <filter id="cmGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="cmSm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="300" height="240" fill="url(#cmBg)"/>
      {Array.from({length:9}).map((_,r)=>Array.from({length:12}).map((_,c)=>(
        <circle key={`${r}-${c}`} cx={14+c*25} cy={14+r*26} r=".7" fill="rgba(255,255,255,.04)"/>
      )))}
      {/* Header */}
      <text x="150" y="34" textAnchor="middle" fontSize="9.5" fill="white" fontWeight="800" letterSpacing=".5">IMPLEMENTIERUNG</text>
      <text x="150" y="50" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,.38)">Schritt-für-Schritt — termingenau und dokumentiert</text>
      {/* Timeline base */}
      <line x1="30" y1="100" x2="270" y2="100" stroke="rgba(255,255,255,.08)" strokeWidth="2.5"/>
      <motion.line x1="30" y1="100" x2="162" y2="100"
        stroke="rgba(16,185,129,.55)" strokeWidth="2.5"
        initial={{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}}
        transition={{duration:1.6,ease:'easeInOut'}}/>
      {/* Steps */}
      {steps.map((s,i)=>{
        const x=30+i*60
        return(
        <motion.g key={i}
          initial={{opacity:0,scale:.7}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
          transition={{delay:.3+i*.2,duration:.5,ease:[.22,1,.36,1]}}>
          {/* Line to next */}
          {i<4&&(
            <line x1={x+16} y1={100} x2={x+44} y2={100}
              stroke={s.done?s.color:'rgba(255,255,255,.1)'} strokeWidth="2.5"/>
          )}
          {/* Circle */}
          <circle cx={x} cy={100} r={s.done?17:14}
            fill={s.done?`${s.color}22`:'rgba(255,255,255,.04)'}
            stroke={s.done?s.color:'rgba(255,255,255,.18)'}
            strokeWidth={s.done?1.5:1}
            filter={s.done?"url(#cmSm)":""}/>
          {/* Icon */}
          {s.done
            ? <polyline points={`${x-6},${100} ${x-2},${104} ${x+7},${94}`}
                fill="none" stroke={s.color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
            : <motion.circle cx={x} cy={100} r="4" fill={s.color} opacity=".4"
                animate={{opacity:[.2,.8,.2],r:[3,5.5,3]}}
                transition={{duration:1.8,repeat:Infinity,delay:i*.3}}
                style={{transformOrigin:`${x}px 100px`}}/>
          }
          {/* Labels */}
          <text x={x} y={126} textAnchor="middle" fontSize="7.5"
            fill={s.done?'rgba(255,255,255,.85)':'rgba(255,255,255,.35)'} fontWeight="700">{s.label}</text>
          <text x={x} y={137} textAnchor="middle" fontSize="6"
            fill={s.done?'rgba(255,255,255,.38)':'rgba(255,255,255,.18)'}>{s.sub}</text>
        </motion.g>
      )})}
      {/* Status card */}
      <rect x="50" y="152" width="200" height="68" rx="12"
        fill="rgba(16,185,129,.07)" stroke="rgba(16,185,129,.3)" strokeWidth="1"/>
      <motion.circle cx="68" cy="172" r="5.5" fill="#10b981" filter="url(#cmGlow)"
        animate={{opacity:[.4,1,.4],scale:[.8,1.2,.8]}}
        transition={{duration:2,repeat:Infinity}}
        style={{transformOrigin:'68px 172px'}}/>
      <text x="82" y="169" fontSize="7.5" fill="#6ee7b7" fontWeight="800">Status: Konfiguration läuft</text>
      <text x="82" y="181" fontSize="6.5" fill="rgba(255,255,255,.38)">Schritt 4 von 5 · Go-Live in 2 Tagen</text>
      <rect x="66" y="190" width="168" height="6" rx="3" fill="rgba(255,255,255,.08)"/>
      <motion.rect x="66" y="190" height="6" rx="3" fill="#10b981" opacity=".85"
        initial={{width:0}} whileInView={{width:118}} viewport={{once:true}}
        transition={{duration:1.5,delay:.5,ease:'easeOut'}}/>
      <text x="240" y="195.5" fontSize="6" fill="rgba(255,255,255,.4)" textAnchor="end">70 %</text>
      <text x="68" y="210" fontSize="6" fill="rgba(255,255,255,.25)">Übergabe inkl. Dokumentation &amp; SLA-Vertrag</text>
    </svg>
  )
}

/* ── Page transition wrapper ── */
const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: .5, ease: [.22,1,.36,1] }}
  >
    {children}
  </motion.div>
)

/* ── Animated counter ── */
function Counter({ to, suffix='', label }) {
  const ref = useRef(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => Math.round(v).toLocaleString('de'))
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (inView) {
      const ctrl = animate(count, to, { duration: 2.2, ease: 'easeOut' })
      return ctrl.stop
    }
  }, [inView])

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ duration:.6, ease:[.22,1,.36,1] }}
      style={{ textAlign:'center' }}
    >
      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:'clamp(36px,5vw,60px)', color:'#fff', lineHeight:1 }}>
        <motion.span>{rounded}</motion.span>
        <span style={{ color:'#3B82F6' }}>{suffix}</span>
      </div>
      <div style={{ fontSize:13, color:'rgba(255,255,255,.45)', marginTop:8, textTransform:'uppercase', letterSpacing:'.09em', fontWeight:600 }}>
        {label}
      </div>
    </motion.div>
  )
}

/* ── 3D Tilt card ── */
function TiltCard({ children, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-.5, .5], [5, -5])
  const rotateY = useTransform(x, [-.5, .5], [-5, 5])

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - .5)
    y.set((e.clientY - rect.top) / rect.height - .5)
  }
  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref}
      style={{ rotateX, rotateY, transformStyle:'preserve-3d', ...style }}
      whileHover={{ scale:1.02, zIndex:2 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      transition={{ type:'spring', stiffness:300, damping:30 }}
    >
      {children}
    </motion.div>
  )
}

/* ── Hero heading line (mask reveal) ── */
function HeroLine({ text, delay=0 }) {
  return (
    <div style={{ overflow:'hidden' }}>
      <motion.div
        initial={{ y:'110%' }}
        animate={{ y:0 }}
        transition={{ delay, duration:.9, ease:[.22,1,.36,1] }}
      >
        {text}
      </motion.div>
    </div>
  )
}

/* ── Service mini card ── */
const services = [
  {
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    title: 'IT-Sicherheit',
    sub: 'Sicherheitskonzepte auf höchstem Niveau',
    accent: '#2563EB',
  },
  {
    icon: <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    title: 'IT-Infrastruktur',
    sub: 'Planung und Betrieb – komplett aus einer Hand',
    accent: '#7C3AED',
  },
  {
    icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    title: 'Entwicklung',
    sub: 'Individuelle Software nach Ihren Anforderungen',
    accent: '#0891B2',
  },
]

const partners = ['Microsoft','HP Enterprise','Dell Technologies','VMware','Cisco','GEHC','Sectra','Philips','Dedalus']

export default function Home() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 120])

  return (
    <Page>
      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', background:'linear-gradient(160deg,#F0F6FF 0%,#EBF3FF 50%,#DBEAFE 100%)' }}>

        {/* Animated grid bg */}
        <div aria-hidden style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(37,99,235,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.06) 1px,transparent 1px)',
          backgroundSize:'56px 56px',
          maskImage:'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 80%)',
          WebkitMaskImage:'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 80%)',
        }}/>

        {/* Floating blobs */}
        {[
          { w:520, h:520, top:'-160px', right:'-80px', color:'rgba(37,99,235,.14)' },
          { w:380, h:380, bottom:'-100px', left:'-60px', color:'rgba(30,58,95,.11)', delay:'-4s' },
        ].map((b,i) => (
          <motion.div key={i} aria-hidden
            animate={{ x:[0,24,0], y:[0,-16,0], scale:[1,1.04,.98,1] }}
            transition={{ duration:9+i*2, repeat:Infinity, ease:'easeInOut', delay: i*4 }}
            style={{
              position:'absolute', width:b.w, height:b.h,
              top:b.top, bottom:b.bottom, right:b.right, left:b.left,
              background:`radial-gradient(circle,${b.color},transparent 70%)`,
              filter:'blur(70px)', pointerEvents:'none', borderRadius:'50%',
            }}
          />
        ))}

        <div className="container" style={{ paddingTop:100, paddingBottom:80, position:'relative', zIndex:1 }}>

          {/* Badge */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
            <span className="tag" style={{ marginBottom:28, display:'inline-flex', alignItems:'center', gap:8, background:'white', border:'1px solid #E8EEFE', color:'#2563EB', boxShadow:'0 2px 12px rgba(37,99,235,.1)' }}>
              <motion.span animate={{ opacity:[1,.3,1] }} transition={{ duration:2, repeat:Infinity }} style={{ width:7, height:7, background:'#2563EB', borderRadius:'50%', display:'inline-block' }}/>
              ISO 9001 zertifiziert · Gegründet 2000
            </span>
          </motion.div>

          {/* Headline mask reveal */}
          <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:900, fontSize:'clamp(48px,8vw,96px)', letterSpacing:'-3px', color:'#0F172A', lineHeight:1.05, marginBottom:28 }}>
            <HeroLine text="Ihre IT." delay={0.1}/>
            <HeroLine text={<><span style={{color:'#2563EB'}}>Sicher.</span> Skalierbar.</>} delay={0.25}/>
            <HeroLine text="Zertifiziert." delay={0.4}/>
          </h1>

          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.7, duration:.6 }}
            style={{ fontSize:'clamp(16px,2vw,20px)', color:'#64748B', maxWidth:500, lineHeight:1.7, marginBottom:40 }}>
            IT-Lösungen für Unternehmen im D-A-CH-Raum —<br/>
            von Security bis Healthcare, seit 2000.
          </motion.p>

          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.9, duration:.5 }}
            style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              <Link to="/kontakt" className="btn btn--primary">
                Beratung anfragen
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              <Link to="/leistungen" className="btn btn--outline">
                Leistungen entdecken
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4 }}
            style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)' }}>
            <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.8, repeat:Infinity }}
              style={{ width:24, height:40, border:'2px solid rgba(37,99,235,.3)', borderRadius:12, display:'flex', justifyContent:'center', paddingTop:6 }}>
              <motion.div style={{ width:4, height:8, background:'#2563EB', borderRadius:2 }}/>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE SERVICES (3 big cards) ───────────── */}
      <section className="section" style={{ background:'#F7F9FC' }}>
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="tag">Was wir tun</span>
            <h2 className="sec-title">Drei Kernkompetenzen.</h2>
          </div>

          <motion.div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}
            initial="hidden" whileInView="show" viewport={{ once:true, margin:'-80px' }}
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:.12 }} }}>
            {services.map((s, i) => (
              <motion.div key={s.title}
                variants={{ hidden:{ opacity:0, y:40 }, show:{ opacity:1, y:0, transition:{ duration:.6, ease:[.22,1,.36,1] } } }}>
                <TiltCard style={{ height:'100%' }}>
                  <div style={{
                    background:'white', border:'1px solid #E8EEFE', borderRadius:20,
                    padding:'36px 32px', height:'100%', position:'relative', overflow:'hidden',
                    cursor:'default',
                  }}>
                    {/* Top accent bar */}
                    <motion.div style={{
                      position:'absolute', top:0, left:0, right:0, height:3,
                      background:`linear-gradient(90deg,${s.accent},${s.accent}88)`,
                    }} initial={{ scaleX:0, transformOrigin:'left' }}
                      whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ duration:.8, delay: i*.15 }}/>

                    <div style={{
                      width:52, height:52, background:`${s.accent}14`, borderRadius:14,
                      display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20,
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke={s.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {s.icon}
                      </svg>
                    </div>

                    <h3 style={{ fontSize:22, fontWeight:800, marginBottom:10, color:'#0F172A' }}>{s.title}</h3>
                    <p style={{ fontSize:15, color:'#64748B', lineHeight:1.65 }}>{s.sub}</p>

                    <motion.div style={{ position:'absolute', bottom:28, right:28 }}
                      initial={{ opacity:0, x:-8 }} whileHover={{ opacity:1, x:0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke={s.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ delay:.4 }} style={{ textAlign:'center', marginTop:40 }}>
            <Link to="/leistungen" className="btn btn--outline">Alle 9 Leistungen ansehen →</Link>
          </motion.div>
        </div>
      </section>

      {/* ── IT-SICHERHEIT VISUALS ─────────────────── */}
      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="tag">IT-Sicherheit</span>
            <h2 className="sec-title">Ihr Netzwerk. <span style={{color:'#2563EB'}}>Mehrschichtig geschützt.</span></h2>
            <p className="sec-desc" style={{margin:'12px auto 0'}}>
              Wir implementieren Firewall, Proxy und DMZ — damit kein Angriff eine Chance hat.
            </p>
          </div>

          <motion.div
            className="security-grid"
            style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28}}
            initial="hidden" whileInView="show" viewport={{once:true, margin:'-60px'}}
            variants={{hidden:{}, show:{transition:{staggerChildren:.14}}}}
          >
            {[
              {
                graphic: <NetworkZoneDiagram/>,
                accent: '#2563EB',
                bg: '#EEF2FF',
                title: 'Netzwerksicherheit',
                desc: 'Mehrstufige Sicherheitszonen (Internet → Firewall → DMZ → LAN) isolieren Ihr internes Netz vollständig vom Internet.',
                bullets: ['Defense-in-Depth-Prinzip','Segmentierung & Zugriffskontrolle','Intrusion Detection & Prevention'],
              },
              {
                graphic: <FirewallDiagram/>,
                accent: '#EA580C',
                bg: '#FFF7ED',
                title: 'Firewall',
                desc: 'Schädlicher Traffic wird in Echtzeit erkannt und geblockt — legitime Verbindungen passieren ohne Verzögerung.',
                bullets: ['Next-Gen Firewall (NGFW)','Deep Packet Inspection','Regelbasierte Zugriffspolitik'],
              },
              {
                graphic: <ProxyDiagram/>,
                accent: '#10B981',
                bg: '#ECFDF5',
                title: 'Proxy & Web-Filter',
                desc: 'Der Proxy-Server agiert als Mittler: er anonymisiert Anfragen, filtert schädliche Inhalte und protokolliert den Traffic.',
                bullets: ['Content-Filtering & URL-Blocking','SSL-Inspection','Anonymisierung & Zugriffskontrolle'],
              },
            ].map((card, i) => (
              <motion.div key={card.title}
                variants={{hidden:{opacity:0,y:40}, show:{opacity:1,y:0,transition:{duration:.6,ease:[.22,1,.36,1]}}}}
                whileHover={{y:-6, boxShadow:'0 20px 60px rgba(0,0,0,.09)'}}
                style={{background:'white', border:'1px solid #E8EEFE', borderRadius:22, overflow:'hidden', display:'flex', flexDirection:'column', transition:'box-shadow .25s'}}
              >
                {/* Graphic area */}
                <div style={{background:'#080d18', height:240, display:'flex', justifyContent:'center', alignItems:'center', overflow:'hidden', borderRadius:'22px 22px 0 0'}}>
                  {card.graphic}
                </div>
                {/* Content */}
                <div style={{padding:'24px 26px 28px', flex:1, display:'flex', flexDirection:'column', gap:14}}>
                  <div>
                    <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:19, color:'#0F172A', marginBottom:8}}>
                      {card.title}
                    </h3>
                    <p style={{fontSize:13.5, color:'#64748B', lineHeight:1.65}}>{card.desc}</p>
                  </div>
                  <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:7}}>
                    {card.bullets.map(b => (
                      <li key={b} style={{display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#334155', fontWeight:500}}>
                        <div style={{width:6, height:6, borderRadius:'50%', background:card.accent, flexShrink:0}}/>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{marginTop:'auto', paddingTop:12}}>
                    <Link to="/leistungen" style={{fontSize:13, fontWeight:700, color:card.accent, display:'inline-flex', alignItems:'center', gap:5}}>
                      Mehr erfahren
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── IT-INFRASTRUKTUR VISUALS ─────────────── */}
      <section className="section" style={{ background:'#F7F9FC' }}>
        <div className="container">
          <div className="sec-head sec-head--center">
            <span className="tag">IT-Infrastruktur</span>
            <h2 className="sec-title">Technik, <span style={{color:'#7C3AED'}}>die trägt.</span></h2>
            <p className="sec-desc" style={{margin:'12px auto 0'}}>
              Von der Rack-Montage bis zur virtualisierten Cloud — wir planen, liefern und betreiben Ihre gesamte IT-Infrastruktur.
            </p>
          </div>

          <motion.div
            className="infra-grid"
            style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28}}
            initial="hidden" whileInView="show" viewport={{once:true, margin:'-60px'}}
            variants={{hidden:{}, show:{transition:{staggerChildren:.14}}}}
          >
            {[
              {
                graphic: <ServerRackGraphic/>,
                accent: '#7C3AED',
                title: 'Server & Rack',
                desc: 'Wir liefern, montieren und konfigurieren professionelle Server-Infrastruktur im Rack — von HP und Dell bis Cisco und Synology NAS.',
                bullets: ['Rack-Integration & Verkabelung', 'HP, Dell, Cisco, Synology', 'Remote-Monitoring & IPMI-Management'],
              },
              {
                graphic: <VirtualizationGraphic/>,
                accent: '#3B82F6',
                title: 'Virtualisierung',
                desc: 'VMware vSphere, Hyper-V oder Proxmox — wir virtualisieren Ihre Server-Landschaft und steigern damit Auslastung, Effizienz und Ausfallsicherheit.',
                bullets: ['VMware vSphere & ESXi', 'Live-Migration & High Availability', 'Automatisierte VM-Provisionierung'],
              },
              {
                graphic: <CommissioningGraphic/>,
                accent: '#10B981',
                title: 'Implementierung',
                desc: 'Vom ersten Beratungsgespräch bis zum Go-Live begleiten wir jedes Projekt strukturiert — termingerecht, dokumentiert und mit SLA-Garantie.',
                bullets: ['Projektplanung & Ist-Aufnahme', 'Rollout & Inbetriebnahme', 'Übergabe inkl. Dokumentation & SLA'],
              },
            ].map((card, i) => (
              <motion.div key={card.title}
                variants={{hidden:{opacity:0,y:40}, show:{opacity:1,y:0,transition:{duration:.6,ease:[.22,1,.36,1]}}}}
                whileHover={{y:-6, boxShadow:'0 20px 60px rgba(0,0,0,.09)'}}
                style={{background:'white', border:'1px solid #E8EEFE', borderRadius:22, overflow:'hidden', display:'flex', flexDirection:'column', transition:'box-shadow .25s'}}
              >
                {/* Graphic area */}
                <div style={{background:'#080d18', height:240, display:'flex', justifyContent:'center', alignItems:'center', overflow:'hidden', borderRadius:'22px 22px 0 0'}}>
                  {card.graphic}
                </div>
                {/* Content */}
                <div style={{padding:'24px 26px 28px', flex:1, display:'flex', flexDirection:'column', gap:14}}>
                  <div>
                    <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:19, color:'#0F172A', marginBottom:8}}>
                      {card.title}
                    </h3>
                    <p style={{fontSize:13.5, color:'#64748B', lineHeight:1.65}}>{card.desc}</p>
                  </div>
                  <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:7}}>
                    {card.bullets.map(b => (
                      <li key={b} style={{display:'flex', alignItems:'center', gap:8, fontSize:13, color:'#334155', fontWeight:500}}>
                        <div style={{width:6, height:6, borderRadius:'50%', background:card.accent, flexShrink:0}}/>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{marginTop:'auto', paddingTop:12}}>
                    <Link to="/leistungen" style={{fontSize:13, fontWeight:700, color:card.accent, display:'inline-flex', alignItems:'center', gap:5}}>
                      Mehr erfahren
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS (dark) ──────────────────────────── */}
      <section style={{ background:'#080D18', padding:'96px 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32 }}>
            <Counter to={25} suffix="+" label="Jahre Erfahrung"/>
            <Counter to={9}  suffix=""  label="Standorte in D-A-CH"/>
            <Counter to={24} suffix="×7" label="Support-Verfügbarkeit"/>
            <Counter to={9001} suffix="" label="ISO Zertifizierung"/>
          </div>
        </div>
      </section>

      {/* ── PARTNERS MARQUEE ──────────────────────── */}
      <section style={{ padding:'52px 0', borderTop:'1px solid #E8EEFE', borderBottom:'1px solid #E8EEFE' }}>
        <div className="container">
          <p style={{ fontSize:11, fontWeight:700, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.12em', textAlign:'center', marginBottom:28 }}>
            Technologiepartner
          </p>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...partners, ...partners].map((p, i) => (
              <span key={i} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:15, color:'#CBD5E1', whiteSpace:'nowrap' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQA TEASER ───────────────────────────── */}
      <section style={{ padding:'100px 0', background:'linear-gradient(135deg,#1E3A5F 0%,#1E40AF 55%,#2563EB 100%)', position:'relative', overflow:'hidden' }}>
        <div aria-hidden style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
          backgroundSize:'36px 36px',
        }}/>
        <div className="container" style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', justifyContent:'space-between', gap:48, flexWrap:'wrap' }}>
          <div style={{ maxWidth:560 }}>
            <span className="tag tag--white" style={{ marginBottom:18 }}>INQA-Coaching</span>
            <motion.h2 initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:.6, ease:[.22,1,.36,1] }}
              style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'#fff', letterSpacing:'-.8px', lineHeight:1.2 }}>
              Bis zu 80 % staatlich gefördert.
            </motion.h2>
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.2 }}
              style={{ fontSize:17, color:'rgba(255,255,255,.75)', marginTop:14, lineHeight:1.7 }}>
              INQA-Coaching des Bundesministeriums für Arbeit und Soziales — ImageContent setzt die Technologie um.
            </motion.p>
          </div>
          <motion.div initial={{ opacity:0, scale:.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:.5 }}>
            <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:.97 }}>
              <Link to="/kontakt" className="btn btn--white" style={{ fontSize:16, padding:'16px 36px' }}>
                Förderfähigkeit prüfen →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HEALTHCARE TEASER ─────────────────────── */}
      <section className="section">
        <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.7, ease:[.22,1,.36,1] }}>
            <span className="tag tag--green" style={{ marginBottom:16 }}>Healthcare-IT</span>
            <h2 className="sec-title" style={{ maxWidth:400 }}>Spezialist für medizinische IT.</h2>
            <p className="sec-desc" style={{ marginTop:12 }}>
              RIS, PACS, Kardiologie-Support — über 25 Jahre Erfahrung in klinischen Umgebungen.
            </p>
            <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }} style={{ marginTop:32, display:'inline-block' }}>
              <Link to="/healthcare" className="btn btn--primary" style={{ background:'#10B981', boxShadow:'0 4px 20px rgba(16,185,129,.3)' }}>
                Healthcare-IT entdecken
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual: 3 specialties listed */}
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.7, ease:[.22,1,.36,1] }}
            style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {['RIS & PACS-Systeme','Kardiologie-Support','Data Migration','C-RISi Support','Bildschirm-Abnahmen','Cloud für Healthcare'].map((item, i) => (
              <motion.div key={item}
                initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay: i*.08, duration:.5 }}
                whileHover={{ x:4, backgroundColor:'#F0FDF4' }}
                style={{
                  display:'flex', alignItems:'center', gap:14,
                  background:'#F7F9FC', border:'1px solid #E8EEFE',
                  borderRadius:12, padding:'16px 20px', cursor:'default',
                  transition:'background .2s',
                }}
              >
                <div style={{ width:8, height:8, background:'#10B981', borderRadius:'50%', flexShrink:0 }}/>
                <span style={{ fontSize:15, fontWeight:600, color:'#0F172A' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────── */}
      <section style={{ padding:'80px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.7 }}
            style={{
              background:'#080D18', borderRadius:24, padding:'72px 64px',
              textAlign:'center', position:'relative', overflow:'hidden',
            }}>
            <div aria-hidden style={{
              position:'absolute', top:'-30%', left:'50%', transform:'translateX(-50%)',
              width:600, height:400,
              background:'radial-gradient(ellipse,rgba(37,99,235,.2) 0%,transparent 70%)',
              pointerEvents:'none',
            }}/>
            <div style={{ position:'relative', zIndex:1 }}>
              <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, color:'#fff', letterSpacing:'-.8px', marginBottom:14 }}>
                Bereit für den nächsten IT-Schritt?
              </motion.h2>
              <p style={{ fontSize:17, color:'rgba(255,255,255,.6)', marginBottom:36 }}>
                Unverbindlich anfragen. Wir melden uns innerhalb von 24 Stunden.
              </p>
              <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
                <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
                  <a href="mailto:support@imagecontent.de" className="btn btn--primary" style={{ fontSize:15, padding:'14px 32px' }}>
                    support@imagecontent.de
                  </a>
                </motion.div>
                <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
                  <Link to="/kontakt" className="btn btn--ghost">
                    Kontaktformular →
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .security-grid { grid-template-columns: 1fr !important; }
          .infra-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .grid-3, .grid-4 { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .security-grid { grid-template-columns: 1fr 1fr !important; }
          .infra-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </Page>
  )
}
