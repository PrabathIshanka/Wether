import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WEATHER_DATA } from './data/weatherData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProvinceSelector from './components/ProvinceSelector';
import WeatherBackground from './components/WeatherBackground';
import WeatherDashboard from './components/WeatherDashboard';
import LoadingState from './components/LoadingState';
import Footer from './components/Footer';

export default function App() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [displayProvince, setDisplayProvince] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dashboardRef = useRef(null);

  const currentCondition = displayProvince && WEATHER_DATA[displayProvince]
    ? WEATHER_DATA[displayProvince].forecast[0].condition
    : 'partly_cloudy';

  const handleProvinceChange = (id) => {
    if (id === displayProvince) return;
    setSelectedProvince(id);
    setIsLoading(true);
    setTimeout(() => {
      setDisplayProvince(id);
      setIsLoading(false);
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1200);
  };

  const handleBack = () => {
    setDisplayProvince('');
    setSelectedProvince('');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleExplore = () => {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen text-white">
      <WeatherBackground condition={currentCondition} />
      <Navbar />

      <AnimatePresence mode="wait">
        {!displayProvince && !isLoading && (
          <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <Hero onExplore={handleExplore} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={displayProvince ? 'pt-24' : ''}>
        <AnimatePresence mode="wait">
          {!displayProvince && !isLoading && (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="pb-20"
            >
              <ProvinceSelector value={selectedProvince} onChange={handleProvinceChange} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={dashboardRef}>
          <AnimatePresence mode="wait">
            {displayProvince && !isLoading && (
              <WeatherDashboard key={displayProvince} provinceId={displayProvince} onBack={handleBack} />
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
