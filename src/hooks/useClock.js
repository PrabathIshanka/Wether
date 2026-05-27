import { useState, useEffect } from 'react';

export function useClock() {
  const [time, setTime] = useState(getTime());
  const [date, setDate] = useState(getDate());

  function getTime() {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
    });
  }
  function getDate() {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  }

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(getTime());
      setDate(getDate());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return { time, date };
}
