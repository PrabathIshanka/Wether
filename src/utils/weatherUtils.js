export function getAQIColor(aqi) {
  if (aqi <= 50) return { color: '#10b981', label: 'Good', bg: 'bg-emerald-500' };
  if (aqi <= 100) return { color: '#f59e0b', label: 'Moderate', bg: 'bg-amber-500' };
  if (aqi <= 150) return { color: '#f97316', label: 'Unhealthy for Sensitive', bg: 'bg-orange-500' };
  if (aqi <= 200) return { color: '#ef4444', label: 'Unhealthy', bg: 'bg-red-500' };
  return { color: '#8b5cf6', label: 'Very Unhealthy', bg: 'bg-purple-500' };
}

export function getUVLabel(uv) {
  if (uv <= 2) return { label: 'Low', color: '#10b981' };
  if (uv <= 5) return { label: 'Moderate', color: '#f59e0b' };
  if (uv <= 7) return { label: 'High', color: '#f97316' };
  if (uv <= 10) return { label: 'Very High', color: '#ef4444' };
  return { label: 'Extreme', color: '#8b5cf6' };
}

export function getWindLabel(speed) {
  if (speed < 5) return 'Calm';
  if (speed < 15) return 'Gentle Breeze';
  if (speed < 25) return 'Moderate Wind';
  if (speed < 40) return 'Strong Wind';
  return 'Storm';
}

export function formatSriLankaTime() {
  return new Date().toLocaleString('en-LK', {
    timeZone: 'Asia/Colombo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export function getSriLankaDate() {
  return new Date().toLocaleString('en-LK', {
    timeZone: 'Asia/Colombo',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getSunPosition(sunrise, sunset) {
  const now = new Date();
  const slNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
  const [riseH, riseM] = sunrise.split(':').map(Number);
  const [setH, setM] = sunset.split(':').map(Number);
  const riseMin = riseH * 60 + riseM;
  const setMin = setH * 60 + setM;
  const nowMin = slNow.getHours() * 60 + slNow.getMinutes();
  const progress = Math.max(0, Math.min(1, (nowMin - riseMin) / (setMin - riseMin)));
  return progress;
}
