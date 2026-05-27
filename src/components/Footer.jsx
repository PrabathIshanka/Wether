import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
                <Cloud size={18} className="text-white" />
              </div>
              <div>
                <span className="text-white font-bold">LK</span>
                <span className="text-blue-400 font-bold"> Weather</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Modern weather forecasting for all nine provinces of Sri Lanka.
            </p>
          </div>

          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4">Provinces</h4>
            <div className="space-y-2 text-sm text-white/40">
              {['Western', 'Central', 'Southern', 'Northern', 'Eastern'].map(p => (
                <div key={p}>{p} Province</div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Vite'].map(t => (
                <span key={t} className="px-2.5 py-1 glass rounded-lg text-xs text-white/50 border-glass">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 px-3 py-2 glass rounded-xl border-glass w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">API Integration Ready</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm flex items-center gap-2">
            Built with <Heart size={12} className="text-red-400" fill="currentColor" /> for Sri Lanka
          </p>
          <p className="text-white/20 text-xs">
            © 2026 LK Weather • Mock data for demonstration
          </p>
        </div>
      </div>
    </footer>
  );
}
