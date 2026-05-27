import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Wifi, WifiOff } from 'lucide-react';
import LiveClock from './LiveClock';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 " + (scrolled ? 'glass shadow-glass py-3' : 'py-5')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center shadow-glow-blue">
            <Cloud size={18} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">LK</span>
            <span className="text-blue-400 font-bold text-lg tracking-tight"> Weather</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25">
            <Wifi size={10} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium">API Ready</span>
          </div>
        </motion.div>
        <div className="flex items-center gap-4">
          <LiveClock compact />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl glass border-glass text-sm text-white/70 hover:text-white cursor-default transition-colors"
          >
            <span className="text-base">🇱🇰</span>
            <span>Sri Lanka</span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
