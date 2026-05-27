import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind } from 'lucide-react';
import { CONDITION_META } from '../data/weatherData';

export default function ForecastCard({ day, index, isActive, onClick }) {
  const meta = CONDITION_META[day.condition] || CONDITION_META.partly_cloudy;
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={"w-full text-left rounded-2xl border transition-all duration-300 " + (isActive
        ? 'glass-strong border-blue-400/40 shadow-glow-blue shadow-glass'
        : 'glass border-white/10 hover:border-white/20')}
    >
      <div className="p-4 sm:p-5">
        <div className="text-center mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">{day.day}</div>
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mx-auto mb-1 animate-pulse" />}
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl mb-2">{meta.emoji}</div>
          <div className="text-xs text-white/40 font-medium truncate px-1">{meta.label}</div>
        </div>

        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-white">{day.high}°</div>
          <div className="text-sm text-white/40">{day.low}°</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-1">
              <Droplets size={10} className="text-blue-400" />
              <span>{day.rain}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind size={10} className="text-teal-400" />
              <span>{day.wind}km/h</span>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: day.rain + '%' }}
              transition={{ delay: index * 0.07 + 0.3, duration: 0.6 }}
              className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
