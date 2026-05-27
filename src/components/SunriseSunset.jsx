import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';
import { getSunPosition } from '../utils/weatherUtils';

export default function SunriseSunset({ sunrise, sunset }) {
  const progress = getSunPosition(sunrise, sunset);
  const angle = progress * 180;
  const rad = (angle * Math.PI) / 180;
  const r = 45;
  const cx = 60, cy = 70;
  const sunX = cx + r * Math.cos(Math.PI - rad);
  const sunY = cy - r * Math.sin(rad);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-5 shadow-glass border-glass"
    >
      <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4 font-medium">Sunrise & Sunset</h3>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Sunrise size={14} className="text-amber-400" />
          <span className="text-white/70 text-xs">Sunrise</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-white/70 text-xs">Sunset</span>
          <Sunset size={14} className="text-orange-400" />
        </div>
      </div>

      <div className="relative h-20 mb-3">
        <svg viewBox="0 0 120 80" className="w-full h-full">
          <path d="M 15,70 A 45,45 0 0 1 105,70" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <path
            d={"M 15,70 A 45,45 0 0 1 " + (cx + r * Math.cos(Math.PI - rad)) + "," + (cy - r * Math.sin(rad))}
            stroke="url(#sunGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"
          />
          <defs>
            <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          {progress > 0 && progress < 1 && (
            <>
              <circle cx={sunX} cy={sunY} r="7" fill="rgba(251,191,36,0.3)" />
              <circle cx={sunX} cy={sunY} r="4" fill="#fbbf24" />
            </>
          )}
          <circle cx="15" cy="70" r="3" fill="#f59e0b" opacity="0.7" />
          <circle cx="105" cy="70" r="3" fill="#f97316" opacity="0.7" />
        </svg>
      </div>

      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-white font-bold text-lg">{sunrise}</div>
          <div className="text-white/40 text-xs">AM</div>
        </div>
        <div className="text-center">
          <div className="text-white/50 text-xs">Day length</div>
          <div className="text-white/70 text-sm font-medium">12h 20m</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-lg">{sunset}</div>
          <div className="text-white/40 text-xs">PM</div>
        </div>
      </div>
    </motion.div>
  );
}
