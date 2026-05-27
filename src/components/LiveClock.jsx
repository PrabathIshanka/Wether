import React from 'react';
import { useClock } from '../hooks/useClock';
import { Clock } from 'lucide-react';

export default function LiveClock({ compact = false }) {
  const { time, date } = useClock();
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/70">
        <Clock size={13} className="text-blue-400" />
        <span className="font-mono font-medium text-white/90">{time}</span>
        <span className="text-white/40">LKT</span>
      </div>
    );
  }
  return (
    <div className="glass rounded-2xl p-5 text-center shadow-glass">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Clock size={14} className="text-blue-400" />
        <span className="text-xs text-white/50 uppercase tracking-wider font-medium">Sri Lanka Time (LKT)</span>
      </div>
      <div className="font-mono text-3xl font-bold text-white tracking-wide">{time}</div>
      <div className="text-xs text-white/50 mt-1">{date}</div>
    </div>
  );
}
