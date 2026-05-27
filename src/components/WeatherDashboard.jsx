import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { WEATHER_DATA, PROVINCES } from '../data/weatherData';
import TodayHighlight from './TodayHighlight';
import ForecastCard from './ForecastCard';
import WeatherChart from './WeatherChart';

export default function WeatherDashboard({ provinceId, onBack }) {
  const [activeDay, setActiveDay] = useState(0);
  const weather = WEATHER_DATA[provinceId];
  const province = PROVINCES.find(p => p.id === provinceId);

  if (!weather || !province) return null;

  const today = weather.forecast[activeDay];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={provinceId}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-16"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-8 pt-4"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl border-glass text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={15} />
            Change Province
          </motion.button>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>🇱🇰 Sri Lanka</span>
            <span>/</span>
            <span className="text-white/70 font-medium">{province.name}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TodayHighlight province={province} weather={weather} today={today} />
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <h3 className="text-white/60 text-xs uppercase tracking-wider font-medium mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-blue-400 inline-block" />
                7-Day Forecast
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {weather.forecast.map((day, i) => (
                  <ForecastCard
                    key={i}
                    day={day}
                    index={i}
                    isActive={activeDay === i}
                    onClick={() => setActiveDay(i)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <WeatherChart forecast={weather.forecast} />
      </motion.div>
    </AnimatePresence>
  );
}
