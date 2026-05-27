import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Eye, Gauge, Zap } from 'lucide-react';
import { CONDITION_META } from '../data/weatherData';
import { getUVLabel } from '../utils/weatherUtils';
import LiveClock from './LiveClock';
import SunriseSunset from './SunriseSunset';
import AirQuality from './AirQuality';

export default function TodayHighlight({ province, weather, today }) {
  const meta = CONDITION_META[today.condition] || CONDITION_META.partly_cloudy;
  const uvInfo = getUVLabel(today.uv);

  const metrics = [
    { icon: Thermometer, label: 'Feels Like', value: today.feelsLike + '°C', color: 'text-orange-400' },
    { icon: Droplets,   label: 'Humidity',   value: today.humidity + '%',      color: 'text-blue-400' },
    { icon: Wind,       label: 'Wind Speed', value: today.wind + ' km/h',      color: 'text-teal-400' },
    { icon: Eye,        label: 'Visibility', value: today.vis + ' km',          color: 'text-purple-400' },
    { icon: Gauge,      label: 'Pressure',   value: today.pressure + ' hPa',   color: 'text-pink-400' },
    { icon: Zap,        label: 'UV Index',   value: today.uv + ' • ' + uvInfo.label, color: 'text-amber-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="space-y-4"
    >
      <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-glass border-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-32 translate-x-32 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.8) 0%, transparent 70%)' }} />

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{province.emoji}</span>
                <h2 className="text-xl font-bold text-white">{province.name}</h2>
              </div>
              <p className="text-white/50 text-sm">{today.desc}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl mb-1">{meta.emoji}</div>
              <div className="text-xs text-white/40 font-medium">{meta.label}</div>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <div>
              <div className="text-8xl font-black text-white leading-none">{today.high}°</div>
              <div className="text-white/40 text-lg font-medium mt-1">High / <span className="text-blue-400">{today.low}°</span> Low</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {metrics.map(m => (
              <motion.div key={m.label} whileHover={{ scale: 1.03 }} className="glass rounded-2xl p-3.5 border-glass">
                <div className="flex items-center gap-2 mb-1.5">
                  <m.icon size={14} className={m.color} />
                  <span className="text-white/40 text-xs">{m.label}</span>
                </div>
                <div className="text-white font-semibold text-sm">{m.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SunriseSunset sunrise={weather.sunrise} sunset={weather.sunset} />
        <AirQuality airQuality={weather.airQuality} />
      </div>

      <LiveClock />
    </motion.div>
  );
}
