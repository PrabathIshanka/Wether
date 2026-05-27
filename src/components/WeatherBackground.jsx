import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RainDrops() {
  const drops = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.6 + Math.random() * 0.6,
    height: 30 + Math.random() * 50,
    opacity: 0.3 + Math.random() * 0.4,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map(d => (
        <motion.div
          key={d.id}
          className="absolute w-px rounded-full"
          style={{
            left: d.left + '%',
            height: d.height,
            background: 'linear-gradient(to bottom, transparent, rgba(147,197,253,0.7))',
            opacity: d.opacity,
          }}
          animate={{ y: ['-10vh', '110vh'] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function LightningFlash() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: [0, 0, 0, 1, 0, 0.5, 0, 0, 0, 0] }}
      transition={{ duration: 5, repeat: Infinity, times: [0, 0.7, 0.75, 0.76, 0.77, 0.78, 0.79, 0.85, 0.9, 1] }}
      style={{ background: 'rgba(200, 180, 255, 0.15)' }}
    />
  );
}

function SunnyGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-16 right-16 w-64 h-64 rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0.1) 60%, transparent 80%)',
          boxShadow: '0 0 120px 60px rgba(251,191,36,0.2)',
        }}
      />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-16 right-16 w-px"
          style={{
            height: '140px',
            transformOrigin: '0 0',
            rotate: i * 45,
            background: 'linear-gradient(to bottom, rgba(251,191,36,0.4), transparent)',
            marginLeft: '128px',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function FloatingClouds() {
  const clouds = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: 5 + i * 12,
    size: 120 + i * 40,
    duration: 18 + i * 8,
    delay: i * 4,
    opacity: 0.12 + i * 0.02,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map(c => (
        <motion.div
          key={c.id}
          className="absolute rounded-full"
          style={{
            top: c.top + '%',
            width: c.size,
            height: c.size * 0.55,
            background: 'rgba(255,255,255,' + c.opacity + ')',
            filter: 'blur(20px)',
          }}
          animate={{ x: ['-15vw', '115vw'] }}
          transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

const BG_GRADIENTS = {
  sunny:         'radial-gradient(ellipse at 70% 20%, #78350f 0%, #1c1917 40%, #0a0a0a 100%)',
  partly_cloudy: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
  cloudy:        'linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)',
  rainy:         'linear-gradient(180deg, #020617 0%, #0c1445 50%, #020c2e 100%)',
  thunderstorm:  'linear-gradient(180deg, #020617 0%, #1a0533 50%, #020617 100%)',
  drizzle:       'linear-gradient(135deg, #042f2e 0%, #0e3d3b 50%, #064e3b 100%)',
  foggy:         'linear-gradient(135deg, #374151 0%, #4b5563 50%, #374151 100%)',
};

export default function WeatherBackground({ condition = 'partly_cloudy' }) {
  const bg = BG_GRADIENTS[condition] || BG_GRADIENTS.partly_cloudy;
  const isRainy = condition === 'rainy' || condition === 'thunderstorm' || condition === 'drizzle';
  const isThunder = condition === 'thunderstorm';
  const isSunny = condition === 'sunny';
  const isCloudy = condition === 'cloudy' || condition === 'partly_cloudy';

  return (
    <div className="fixed inset-0 -z-10 transition-all duration-1000" style={{ background: bg }}>
      <AnimatePresence mode="wait">
        {isRainy && <RainDrops key="rain" />}
        {isThunder && <LightningFlash key="lightning" />}
        {isSunny && <SunnyGlow key="sun" />}
        {isCloudy && <FloatingClouds key="clouds" />}
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.04) 0%, transparent 70%)' }} />
    </div>
  );
}
