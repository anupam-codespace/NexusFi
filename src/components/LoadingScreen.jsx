import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------- tiny helpers ------- */
function rand(min, max) { return Math.random() * (max - min) + min; }

/* ------- Particle Canvas ------- */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    const pts = Array.from({ length: 55 }, () => ({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18),
      r: rand(1, 2.2),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96,165,250,0.45)';
        ctx.fill();
      });
      // connect close particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.6 }} />;
}

/* ------- Scan line ------- */
function ScanLine() {
  return (
    <motion.div
      style={{
        position:'absolute', left:0, right:0, height:1,
        background:'linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(139,92,246,0.7),rgba(99,102,241,0.5),transparent)',
        boxShadow:'0 0 12px rgba(139,92,246,0.6)',
        zIndex:2, pointerEvents:'none',
      }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
    />
  );
}


/* ------- Data Ticker ------- */
const TICKERS = [
  ['RELIANCE', '+2.34%'], ['NIFTY50', '+0.87%'], ['GOLD', '+1.12%'],
  ['SENSEX', '+1.45%'], ['INFY', '-0.22%'], ['TCS', '+0.91%'],
];
function DataTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TICKERS.length), 900);
    return () => clearInterval(t);
  }, []);
  const [sym, chg] = TICKERS[idx];
  const up = chg.startsWith('+');
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      style={{
        display:'flex', alignItems:'center', gap:8,
        fontSize:11, fontFamily:'monospace', letterSpacing:'.5px',
        color:'rgba(148,163,184,0.8)',
      }}
    >
      <span style={{ color:'#94a3b8' }}>{sym}</span>
      <span style={{ color: up ? '#4ade80' : '#f87171', fontWeight:600 }}>{chg}</span>
    </motion.div>
  );
}

/* ------- Main Component ------- */
const STEPS = [
  { label: 'Booting secure kernel…',     pct: 0  },
  { label: 'Loading financial modules…', pct: 22 },
  { label: 'Syncing market indices…',    pct: 48 },
  { label: 'Decrypting vault data…',     pct: 70 },
  { label: 'Calibrating AI insights…',  pct: 88 },
  { label: 'System ready.',             pct: 100 },
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  const currentStep = STEPS.findLast(s => progress >= s.pct) ?? STEPS[0];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const start = Date.now();
    const duration = 2600;
    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min((elapsed / duration) * 100, 100);
      // Ease-out with some hesitation steps
      const eased = raw < 70
        ? raw * 0.95
        : 70 + (raw - 70) * 1.05;
      const pct = Math.min(Math.round(eased), 100);
      setProgress(pct);
      if (pct < 100) { raf = requestAnimationFrame(tick); }
      else {
        setTimeout(() => { setPhase(2); setTimeout(() => { setDone(true); setTimeout(onComplete, 300); }, 500); }, 250);
      }
    };
    const t2 = setTimeout(() => { raf = requestAnimationFrame(tick); }, 500);
    return () => { clearTimeout(t1); clearTimeout(t2); cancelAnimationFrame(raf); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position:'fixed', inset:0, zIndex:9999,
            background:'#060b14',
            display:'flex', alignItems:'center', justifyContent:'center',
            overflow:'hidden',
          }}
        >
          {/* Particle field */}
          <ParticleCanvas />

          {/* Scan line */}
          <ScanLine />

          {/* Background grid */}
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage:'linear-gradient(rgba(59,130,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.04) 1px,transparent 1px)',
            backgroundSize:'48px 48px',
            opacity: phase >= 1 ? 1 : 0,
            transition:'opacity 0.8s',
          }}/>

          {/* Corner decorations */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} style={{
              position:'absolute',
              top: pos.startsWith('t') ? 24 : undefined,
              bottom: pos.startsWith('b') ? 24 : undefined,
              left: pos.endsWith('l') ? 24 : undefined,
              right: pos.endsWith('r') ? 24 : undefined,
              width:28, height:28,
              borderTop: pos.startsWith('t') ? '1.5px solid rgba(99,102,241,0.4)' : undefined,
              borderBottom: pos.startsWith('b') ? '1.5px solid rgba(99,102,241,0.4)' : undefined,
              borderLeft: pos.endsWith('l') ? '1.5px solid rgba(99,102,241,0.4)' : undefined,
              borderRight: pos.endsWith('r') ? '1.5px solid rgba(99,102,241,0.4)' : undefined,
            }}/>
          ))}

          {/* Ambient glows */}
          <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,.1) 0,transparent 70%)', top:-150, right:-100, pointerEvents:'none' }}/>
          <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,.1) 0,transparent 70%)', bottom:-120, left:-80, pointerEvents:'none' }}/>

          {/* ── CORE CONTENT ── */}
          <div style={{ position:'relative', zIndex:3, display:'flex', flexDirection:'column', alignItems:'center', gap:28 }}>


            {/* Brand */}
            <motion.div
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.35, duration:0.5 }}
              style={{ textAlign:'center' }}
            >
              <div style={{
                fontFamily:"'Space Grotesk',sans-serif",
                fontSize:32, fontWeight:700, letterSpacing:'-0.5px',
                background:'linear-gradient(135deg,#f1f5f9 0%,#94a3b8 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text',
              }}>NexusFi</div>
              <div style={{ fontSize:12, color:'#475569', marginTop:4, letterSpacing:'2px', textTransform:'uppercase' }}>
                Intelligent Wealth Command Centre
              </div>
            </motion.div>

            {/* Data ticker */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ duration:0.4 }}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:99, padding:'5px 14px',
                }}
              >
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 6px #4ade80', flexShrink:0 }}/>
                <AnimatePresence mode="wait">
                  <DataTicker key="ticker"/>
                </AnimatePresence>
              </motion.div>
            )}

            {/* Progress block */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.35 }}
                style={{ width:300 }}
              >
                {/* Bar track */}
                <div style={{
                  position:'relative', height:3,
                  background:'rgba(255,255,255,0.06)',
                  borderRadius:99, overflow:'visible', marginBottom:10,
                }}>
                  <motion.div
                    style={{
                      height:'100%',
                      background:'linear-gradient(90deg,#3b82f6,#6366f1,#8b5cf6)',
                      borderRadius:99,
                      width:`${progress}%`,
                      transition:'width 0.12s linear',
                      position:'relative',
                    }}
                  >
                    {/* Glowing tip */}
                    <div style={{
                      position:'absolute', right:-5, top:-4,
                      width:11, height:11, borderRadius:'50%',
                      background:'#818cf8',
                      boxShadow:'0 0 16px 4px rgba(129,140,248,0.7)',
                    }}/>
                  </motion.div>
                </div>

                {/* Step label + counter */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <motion.span
                    key={currentStep.label}
                    initial={{ opacity:0, x:-6 }}
                    animate={{ opacity:1, x:0 }}
                    style={{ fontSize:11, color:'#64748b', fontFamily:'monospace' }}
                  >
                    {currentStep.label}
                  </motion.span>
                  <span style={{
                    fontSize:13, fontWeight:700,
                    fontFamily:"'Space Grotesk',monospace",
                    background:'linear-gradient(90deg,#60a5fa,#a78bfa)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                  }}>
                    {progress}%
                  </span>
                </div>

                {/* Step dots */}
                <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:14 }}>
                  {STEPS.map((s, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        background: progress >= s.pct
                          ? 'linear-gradient(90deg,#3b82f6,#8b5cf6)'
                          : 'rgba(255,255,255,0.1)',
                        width: progress >= s.pct && i === STEPS.findLastIndex(x => progress >= x.pct) ? 20 : 6,
                      }}
                      transition={{ duration:0.3 }}
                      style={{ height:4, borderRadius:99 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Version */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:0.35 }}
              transition={{ delay:0.6 }}
              style={{ fontSize:10, color:'#334155', letterSpacing:'1px', fontFamily:'monospace' }}
            >
              NEXUSFI v2.0.0 &nbsp;·&nbsp; SECURE SESSION &nbsp;·&nbsp; {new Date().getFullYear()}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
