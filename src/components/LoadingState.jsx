import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
    >
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-blue-400/50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-2 border-transparent border-t-purple-400 border-r-purple-400/50"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-3xl"
        >
          🌤️
        </motion.div>
      </div>
      <div className="text-center">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/70 text-lg font-medium"
        >
          Loading weather data...
        </motion.p>
        <p className="text-white/40 text-sm mt-1">Fetching forecast for your province</p>
      </div>
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            className="w-2 h-2 rounded-full bg-blue-400"
          />
        ))}
      </div>
    </motion.div>
  );
}
