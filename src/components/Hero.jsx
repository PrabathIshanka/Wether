import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wind } from 'lucide-react';

function SriLankaMapSVG() {
  return (
    <svg viewBox="0 0 120 180" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path
        d="M 58,6 C 62,5 68,8 74,14 C 80,20 85,30 87,42 C 90,55 89,68 86,80 C 84,90 80,100 76,112 C 72,124 66,138 60,152 C 57,158 55,165 54,170 C 52,164 50,157 47,150 C 41,136 34,122 30,110 C 26,98 22,86 20,74 C 18,62 18,50 21,40 C 24,30 30,20 38,14 C 45,9 52,7 58,6 Z"
        fill="url(#mapGrad)"
        stroke="rgba(96,165,250,0.5)"
        strokeWidth="1"
        filter="url(#glow)"
      />
      <path
        d="M 40,40 C 50,38 62,38 72,42"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M 30,70 C 45,65 65,65 82,70"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M 24,100 C 40,93 68,93 86,100"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="54" cy="88" r="3" fill="rgba(96,165,250,0.8)" />
      <circle cx="54" cy="88" r="6" fill="rgba(96,165,250,0.2)" />
    </svg>
  );
}

function Particles() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 3, dur: 3 + Math.random() * 4, delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{ left: p.x + '%', top: p.y + '%', width: p.size, height: p.size, opacity: 0.4 }}
          animate={{ y: [-20, -60], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default function Hero({ onExplore }) {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      <Particles />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glass mb-8">
            <span className="text-base">🇱🇰</span>
            <span className="text-sm text-white/70">Sri Lanka</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400">Live Forecast</span>
          </motion.div>

          <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Sri Lanka
            <br />
            <span className="text-gradient">Weather</span>
            <br />
            <span className="text-white/80 text-4xl sm:text-5xl lg:text-6xl font-bold">Forecast</span>
          </motion.h1>

          <motion.p variants={item} className="text-white/55 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            Real-time 7-day weather predictions for all nine provinces.
            Powered by advanced forecasting models.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={onExplore}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(96,165,250,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold text-lg shadow-lg transition-all"
            >
              Explore Forecast →
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="px-8 py-4 rounded-2xl glass border-glass text-white/70 font-medium text-lg flex items-center gap-2"
            >
              <Wind size={18} className="text-blue-400" />
              9 Provinces
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start">
            {[
              { val: '9', label: 'Provinces' },
              { val: '7', label: 'Day Forecast' },
              { val: '24/7', label: 'Live Updates' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22,1,0.36,1] }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-16 rounded-full border border-blue-400/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-violet-400/10"
            />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-64 h-96"
            >
              <SriLankaMapSVG />
            </motion.div>

            {[
              { label: 'Colombo', sub: '31°C 🌧️', pos: 'top-28 -right-20' },
              { label: 'Kandy',   sub: '27°C 🌥️', pos: 'top-32 -left-24' },
              { label: 'Jaffna',  sub: '36°C ☀️',  pos: '-top-4 right-0' },
            ].map((pin, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.2 }}
                className={"absolute " + pin.pos + " glass rounded-xl px-3 py-2 border-glass"}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin size={10} className="text-blue-400 flex-shrink-0" />
                  <span className="text-white text-xs font-semibold">{pin.label}</span>
                </div>
                <div className="text-white/60 text-xs mt-0.5">{pin.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
