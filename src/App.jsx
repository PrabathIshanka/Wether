import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWeather } from "./hooks/useWeather";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProvinceSelector from "./components/ProvinceSelector";
import WeatherBackground from "./components/WeatherBackground";
import WeatherDashboard from "./components/WeatherDashboard";
import LoadingState from "./components/LoadingState";
import Footer from "./components/Footer";

export default function App() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [displayProvince, setDisplayProvince] = useState("");
  const dashboardRef = useRef(null);

  const { weather, isLoading, isLive, error } = useWeather(selectedProvince);

  // Show dashboard once data is ready
  const showDashboard = displayProvince && weather && !isLoading;

  const currentCondition = weather?.forecast?.[0]?.condition ?? "partly_cloudy";

  const handleProvinceChange = (id) => {
    if (id === selectedProvince && showDashboard) return;
    setSelectedProvince(id);
    setDisplayProvince(""); // hide old dashboard while loading
    // After data loads, App re-renders and we set displayProvince
  };

  // Once weather arrives, reveal the dashboard
  React.useEffect(() => {
    if (weather && selectedProvince && !isLoading) {
      setDisplayProvince(selectedProvince);
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [weather, isLoading, selectedProvince]);

  const handleBack = () => {
    setDisplayProvince("");
    setSelectedProvince("");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  const handleExplore = () => {
    document
      .getElementById("explore")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className='min-h-screen text-white'>
      <WeatherBackground condition={currentCondition} />
      <Navbar />

      <AnimatePresence mode='wait'>
        {!showDashboard && !isLoading && (
          <motion.div
            key='hero'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Hero onExplore={handleExplore} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={showDashboard ? "pt-24" : ""}>
        <AnimatePresence mode='wait'>
          {!showDashboard && !isLoading && (
            <motion.div
              key='selector'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className='pb-20'
            >
              <ProvinceSelector
                value={selectedProvince}
                onChange={handleProvinceChange}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState />
            </motion.div>
          )}
        </AnimatePresence>

        {error && !isLoading && (
          <div className='text-center py-16 text-red-400 text-sm'>{error}</div>
        )}

        <div ref={dashboardRef}>
          <AnimatePresence mode='wait'>
            {showDashboard && (
              <WeatherDashboard
                key={displayProvince}
                provinceId={displayProvince}
                weather={weather}
                isLive={isLive}
                onBack={handleBack}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
