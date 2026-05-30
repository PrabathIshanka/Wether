import { useState, useEffect, useRef } from "react";
import { fetchLiveWeather } from "../services/weatherApi";
import { WEATHER_DATA } from "../data/weatherData";

// In-memory cache so switching provinces doesn't re-fetch within the same session
const cache = {};

export function useWeather(provinceId) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!provinceId) {
      setWeather(null);
      return;
    }

    // Return cached result instantly
    if (cache[provinceId]) {
      setWeather(cache[provinceId].data);
      setIsLive(cache[provinceId].live);
      setIsLoading(false);
      return;
    }

    // Abort any in-flight fetch
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    fetchLiveWeather(provinceId)
      .then((liveData) => {
        if (liveData) {
          cache[provinceId] = { data: liveData, live: true };
          setWeather(liveData);
          setIsLive(true);
        } else {
          // Fallback to mock data
          const mock = WEATHER_DATA[provinceId];
          if (mock) {
            cache[provinceId] = { data: mock, live: false };
            setWeather(mock);
            setIsLive(false);
          } else {
            setError("No data available for this province.");
          }
        }
      })
      .catch((err) => {
        // Fallback to mock on any error
        const mock = WEATHER_DATA[provinceId];
        if (mock) {
          setWeather(mock);
          setIsLive(false);
        } else {
          setError(err.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => abortRef.current?.abort();
  }, [provinceId]);

  return { weather, isLoading, isLive, error };
}
