import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-strong rounded-xl px-4 py-3 border-glass shadow-glass">
      <p className="text-white/60 text-xs mb-2 font-medium">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/70">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}{p.unit || ''}</span>
        </div>
      ))}
    </div>
  );
};

const TABS = [
  { id: 'temp',     label: 'Temperature', icon: '🌡️' },
  { id: 'rain',     label: 'Rain Chance', icon: '🌧️' },
  { id: 'humidity', label: 'Humidity',    icon: '💧' },
];

export default function WeatherChart({ forecast }) {
  const [tab, setTab] = useState('temp');
  const data = forecast.map(d => ({
    day: d.day,
    'High (°C)': d.high,
    'Low (°C)': d.low,
    'Rain (%)': d.rain,
    'Humidity (%)': d.humidity,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass rounded-3xl p-6 sm:p-8 shadow-glass border-glass"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-white font-bold text-xl">7-Day Overview</h3>
        <div className="flex gap-1 p-1 glass rounded-xl border-glass">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={"px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 " + (tab === t.id ? 'bg-blue-500/30 text-white border border-blue-500/40' : 'text-white/50 hover:text-white/80')}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        {tab === 'temp' ? (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} domain={['dataMin - 3', 'dataMax + 3']} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="High (°C)" stroke="#f97316" strokeWidth={2.5} fill="url(#highGrad)" dot={{ fill: '#f97316', r: 4 }} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="Low (°C)" stroke="#60a5fa" strokeWidth={2.5} fill="url(#lowGrad)" dot={{ fill: '#60a5fa', r: 4 }} activeDot={{ r: 6 }} />
          </AreaChart>
        ) : tab === 'rain' ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Rain (%)" fill="url(#rainGrad)" radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Humidity (%)" stroke="#a78bfa" strokeWidth={2.5} fill="url(#humidGrad)" dot={{ fill: '#a78bfa', r: 4 }} activeDot={{ r: 6 }} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
}
