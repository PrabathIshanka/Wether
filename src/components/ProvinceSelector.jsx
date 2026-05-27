import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { PROVINCES } from '../data/weatherData';

export default function ProvinceSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selected = PROVINCES.find(p => p.id === value);
  const filtered = PROVINCES.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.capital.toLowerCase().includes(search.toLowerCase()));

  const select = (id) => { onChange(id); setOpen(false); setSearch(''); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      className="max-w-2xl mx-auto px-4"
      id="explore"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Select a Province</h2>
        <p className="text-white/50">Choose a province to view the 7-day weather forecast</p>
      </div>

      <div className="relative">
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full glass-strong rounded-2xl px-5 py-4 flex items-center justify-between border-glass shadow-glass transition-all hover:border-blue-400/30"
        >
          {selected ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selected.emoji}</span>
              <div className="text-left">
                <div className="text-white font-semibold">{selected.name}</div>
                <div className="text-white/50 text-sm flex items-center gap-1">
                  <MapPin size={11} />
                  {selected.capital}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-white/50">
              <MapPin size={18} className="text-blue-400" />
              <span className="text-white/60 text-lg">Choose a province...</span>
            </div>
          )}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={20} className="text-white/50" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-2xl border-glass shadow-glass overflow-hidden"
            >
              <div className="p-3 border-b border-white/10">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
                  <Search size={14} className="text-white/40" />
                  <input
                    autoFocus
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search provinces..."
                    className="bg-transparent text-white text-sm outline-none placeholder-white/30 flex-1"
                  />
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => select(p.id)}
                    className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all " + (value === p.id ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/6 border border-transparent')}
                  >
                    <span className="text-xl flex-shrink-0">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">{p.name}</div>
                      <div className="text-white/40 text-xs flex items-center gap-1">
                        <MapPin size={9} />
                        {p.capital}
                      </div>
                    </div>
                    <div className={"w-2 h-2 rounded-full bg-gradient-to-r " + p.color + " flex-shrink-0"} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
