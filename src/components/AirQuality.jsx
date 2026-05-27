import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { getAQIColor } from '../utils/weatherUtils';

export default function AirQuality({ airQuality }) {
  const info = getAQIColor(airQuality.aqi);
  const pct = Math.min(100, (airQuality.aqi / 300) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-5 shadow-glass border-glass"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/60 text-xs uppercase tracking-wider font-medium">Air Quality</h3>
        <Wind size={14} className="text-white/30" />
      </div>

      <div className="flex items-end gap-3 mb-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-4xl font-black"
          style={{ color: info.color }}
        >
          {airQuality.aqi}
        </motion.div>
        <div className="mb-1">
          <div className="text-white/40 text-xs">AQI</div>
          <div className="text-sm font-semibold" style={{ color: info.color }}>{info.label}</div>
        </div>
      </div>

      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: pct + '%' }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #10b981, ' + info.color + ')' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-1 text-center">
        {[['0-50','Good'],['51-100','Moderate'],['100+','Poor']].map(([r,l]) => (
          <div key={l} className="text-xs text-white/30">
            <div className="font-medium">{r}</div>
            <div>{l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
