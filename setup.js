#!/usr/bin/env node
/**
 * Sri Lanka Weather App - Project Setup Script
 * Run: node setup.js
 * Then: npm install && npm run dev
 */
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = __dirname;

function write(relPath, content) {
  const fullPath = join(ROOT, relPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, content, "utf8");
  console.log("  \u2713 " + relPath);
}

// ============================================================
// 1. SOURCE FILES
// ============================================================

write(
  "src/index.css",
  `@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: #020817;
  color: #e2e8f0;
  overflow-x: hidden;
  min-height: 100vh;
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }

@layer utilities {
  .glass {
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.12);
  }
  .glass-strong {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.18);
  }
  .glass-hover { transition: all 0.3s ease; }
  .glass-hover:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  .text-gradient {
    background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .border-glass { border: 1px solid rgba(255,255,255,0.12); }
  .shadow-glass { box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2); }
  .shadow-glow-blue { box-shadow: 0 0 30px rgba(96,165,250,0.3); }
}
::selection { background: rgba(96,165,250,0.3); color: #fff; }
.recharts-cartesian-grid-horizontal line,
.recharts-cartesian-grid-vertical line { stroke: rgba(255,255,255,0.06) !important; }
.recharts-text { fill: rgba(255,255,255,0.5) !important; font-size: 11px !important; }
.recharts-legend-item-text { color: rgba(255,255,255,0.7) !important; font-size: 12px !important; }
.recharts-tooltip-wrapper { filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5)); }
`,
);

write(
  "src/main.jsx",
  `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
);

// ============================================================
// DATA
// ============================================================
write(
  "src/data/weatherData.js",
  `export const PROVINCES = [
  { id: 'western',      name: 'Western Province',       capital: 'Colombo',       emoji: '\u{1F3D9}', color: 'from-blue-500 to-cyan-600',    region: 'Western' },
  { id: 'central',      name: 'Central Province',       capital: 'Kandy',         emoji: '\u26F0\uFE0F',  color: 'from-emerald-500 to-teal-700', region: 'Central' },
  { id: 'southern',     name: 'Southern Province',      capital: 'Galle',         emoji: '\u{1F3D6}\uFE0F',  color: 'from-amber-500 to-orange-600', region: 'Southern' },
  { id: 'northern',     name: 'Northern Province',      capital: 'Jaffna',        emoji: '\u{1F334}',  color: 'from-yellow-500 to-amber-600', region: 'Northern' },
  { id: 'eastern',      name: 'Eastern Province',       capital: 'Trincomalee',   emoji: '\u{1F30A}',  color: 'from-sky-500 to-blue-700',     region: 'Eastern' },
  { id: 'north_western',name: 'North Western Province', capital: 'Kurunegala',    emoji: '\u{1F333}',  color: 'from-lime-500 to-green-700',   region: 'NW' },
  { id: 'north_central',name: 'North Central Province', capital: 'Anuradhapura',  emoji: '\u{1F4FF}',  color: 'from-orange-500 to-red-600',   region: 'NC' },
  { id: 'uva',          name: 'Uva Province',           capital: 'Badulla',       emoji: '\u{1F375}',  color: 'from-purple-500 to-violet-700',region: 'Uva' },
  { id: 'sabaragamuwa', name: 'Sabaragamuwa Province',  capital: 'Ratnapura',     emoji: '\u{1F48E}',  color: 'from-pink-500 to-rose-700',    region: 'Sabara' },
];

const D = ['Today','Thu','Fri','Sat','Sun','Mon','Tue'];

export const WEATHER_DATA = {
  western: {
    airQuality: { aqi: 58, label: 'Moderate', color: '#f59e0b' },
    sunrise: '05:56', sunset: '18:16',
    forecast: [
      { day:D[0], high:31, low:24, feelsLike:34, humidity:82, wind:16, windDir:'SW', rain:75, condition:'rainy',       desc:'Heavy afternoon showers', uv:6,  vis:8,  pressure:1009 },
      { day:D[1], high:29, low:23, feelsLike:32, humidity:85, wind:18, windDir:'SW', rain:85, condition:'thunderstorm',desc:'Thunderstorms likely',     uv:4,  vis:5,  pressure:1007 },
      { day:D[2], high:30, low:24, feelsLike:33, humidity:80, wind:15, windDir:'W',  rain:65, condition:'rainy',       desc:'Morning drizzle',          uv:5,  vis:9,  pressure:1008 },
      { day:D[3], high:32, low:25, feelsLike:35, humidity:76, wind:12, windDir:'SW', rain:45, condition:'cloudy',      desc:'Overcast with breaks',     uv:7,  vis:12, pressure:1010 },
      { day:D[4], high:33, low:25, feelsLike:36, humidity:73, wind:10, windDir:'S',  rain:30, condition:'partly_cloudy',desc:'Partly cloudy',           uv:8,  vis:15, pressure:1012 },
      { day:D[5], high:31, low:24, feelsLike:34, humidity:79, wind:14, windDir:'SW', rain:60, condition:'rainy',       desc:'Evening showers',          uv:6,  vis:10, pressure:1009 },
      { day:D[6], high:30, low:23, feelsLike:33, humidity:83, wind:17, windDir:'SW', rain:70, condition:'thunderstorm',desc:'Stormy conditions',         uv:4,  vis:6,  pressure:1006 },
    ],
  },
  central: {
    airQuality: { aqi: 28, label: 'Good', color: '#10b981' },
    sunrise: '06:02', sunset: '18:12',
    forecast: [
      { day:D[0], high:27, low:18, feelsLike:28, humidity:72, wind:10, windDir:'W',  rain:60, condition:'cloudy',      desc:'Cool and overcast',        uv:5,  vis:10, pressure:1015 },
      { day:D[1], high:25, low:17, feelsLike:26, humidity:75, wind:12, windDir:'SW', rain:70, condition:'rainy',       desc:'Afternoon showers',        uv:4,  vis:8,  pressure:1014 },
      { day:D[2], high:26, low:18, feelsLike:27, humidity:70, wind:9,  windDir:'W',  rain:55, condition:'partly_cloudy',desc:'Misty morning',           uv:5,  vis:9,  pressure:1015 },
      { day:D[3], high:28, low:19, feelsLike:29, humidity:68, wind:8,  windDir:'NW', rain:35, condition:'partly_cloudy',desc:'Partly sunny',            uv:7,  vis:14, pressure:1016 },
      { day:D[4], high:29, low:20, feelsLike:30, humidity:65, wind:7,  windDir:'N',  rain:25, condition:'sunny',       desc:'Beautiful clear day',      uv:9,  vis:20, pressure:1017 },
      { day:D[5], high:27, low:18, feelsLike:28, humidity:73, wind:11, windDir:'SW', rain:65, condition:'rainy',       desc:'Rain likely',              uv:4,  vis:8,  pressure:1013 },
      { day:D[6], high:26, low:17, feelsLike:27, humidity:76, wind:13, windDir:'SW', rain:72, condition:'cloudy',      desc:'Gloomy skies',             uv:3,  vis:7,  pressure:1013 },
    ],
  },
  southern: {
    airQuality: { aqi: 35, label: 'Good', color: '#10b981' },
    sunrise: '05:58', sunset: '18:14',
    forecast: [
      { day:D[0], high:30, low:24, feelsLike:33, humidity:86, wind:20, windDir:'SW', rain:80, condition:'thunderstorm',desc:'Thunderstorms and rough sea',uv:4, vis:5,  pressure:1006 },
      { day:D[1], high:29, low:23, feelsLike:31, humidity:88, wind:22, windDir:'SW', rain:85, condition:'thunderstorm',desc:'Heavy monsoon rains',       uv:3,  vis:4,  pressure:1005 },
      { day:D[2], high:30, low:24, feelsLike:32, humidity:84, wind:18, windDir:'W',  rain:75, condition:'rainy',       desc:'Continuous drizzle',       uv:4,  vis:7,  pressure:1007 },
      { day:D[3], high:31, low:25, feelsLike:34, humidity:80, wind:16, windDir:'SW', rain:60, condition:'rainy',       desc:'Showers in the evening',   uv:6,  vis:9,  pressure:1009 },
      { day:D[4], high:32, low:25, feelsLike:35, humidity:77, wind:14, windDir:'S',  rain:45, condition:'cloudy',      desc:'Overcast but no rain',     uv:7,  vis:11, pressure:1010 },
      { day:D[5], high:31, low:24, feelsLike:33, humidity:82, wind:19, windDir:'SW', rain:70, condition:'rainy',       desc:'Wet and windy',            uv:5,  vis:7,  pressure:1007 },
      { day:D[6], high:30, low:24, feelsLike:32, humidity:85, wind:21, windDir:'SW', rain:80, condition:'thunderstorm',desc:'Stormy monsoon',           uv:3,  vis:5,  pressure:1005 },
    ],
  },
  northern: {
    airQuality: { aqi: 45, label: 'Good', color: '#10b981' },
    sunrise: '05:52', sunset: '18:10',
    forecast: [
      { day:D[0], high:36, low:27, feelsLike:40, humidity:58, wind:22, windDir:'SW', rain:15, condition:'sunny',       desc:'Hot and sunny',            uv:11, vis:25, pressure:1008 },
      { day:D[1], high:37, low:28, feelsLike:42, humidity:55, wind:24, windDir:'W',  rain:10, condition:'sunny',       desc:'Very hot, clear sky',      uv:12, vis:30, pressure:1007 },
      { day:D[2], high:35, low:27, feelsLike:39, humidity:60, wind:20, windDir:'SW', rain:20, condition:'partly_cloudy',desc:'Slight cloud cover',      uv:10, vis:22, pressure:1009 },
      { day:D[3], high:34, low:26, feelsLike:38, humidity:63, wind:18, windDir:'SW', rain:25, condition:'partly_cloudy',desc:'Hazy and warm',           uv:9,  vis:18, pressure:1010 },
      { day:D[4], high:36, low:27, feelsLike:41, humidity:57, wind:21, windDir:'W',  rain:12, condition:'sunny',       desc:'Scorching afternoon',      uv:11, vis:28, pressure:1008 },
      { day:D[5], high:35, low:26, feelsLike:39, humidity:62, wind:23, windDir:'SW', rain:18, condition:'sunny',       desc:'Hot with sea breeze',      uv:10, vis:24, pressure:1007 },
      { day:D[6], high:33, low:25, feelsLike:37, humidity:65, wind:19, windDir:'SW', rain:30, condition:'partly_cloudy',desc:'Bit more cloud',          uv:9,  vis:18, pressure:1009 },
    ],
  },
  eastern: {
    airQuality: { aqi: 22, label: 'Good', color: '#10b981' },
    sunrise: '05:50', sunset: '18:08',
    forecast: [
      { day:D[0], high:34, low:26, feelsLike:38, humidity:65, wind:18, windDir:'SW', rain:20, condition:'partly_cloudy',desc:'Warm and hazy',           uv:9,  vis:20, pressure:1010 },
      { day:D[1], high:35, low:27, feelsLike:39, humidity:62, wind:20, windDir:'W',  rain:15, condition:'sunny',       desc:'Beautiful beach weather',  uv:11, vis:25, pressure:1010 },
      { day:D[2], high:33, low:26, feelsLike:37, humidity:68, wind:16, windDir:'SW', rain:30, condition:'partly_cloudy',desc:'Some afternoon cloud',    uv:8,  vis:18, pressure:1011 },
      { day:D[3], high:32, low:25, feelsLike:36, humidity:70, wind:14, windDir:'S',  rain:40, condition:'cloudy',      desc:'Increasing cloud cover',   uv:7,  vis:14, pressure:1010 },
      { day:D[4], high:33, low:26, feelsLike:37, humidity:67, wind:16, windDir:'SW', rain:25, condition:'partly_cloudy',desc:'Mix of sun and cloud',    uv:9,  vis:20, pressure:1011 },
      { day:D[5], high:34, low:27, feelsLike:38, humidity:63, wind:18, windDir:'W',  rain:18, condition:'sunny',       desc:'Sunny intervals',          uv:10, vis:22, pressure:1010 },
      { day:D[6], high:31, low:25, feelsLike:35, humidity:72, wind:15, windDir:'SW', rain:45, condition:'rainy',       desc:'Light showers possible',   uv:6,  vis:12, pressure:1009 },
    ],
  },
  north_western: {
    airQuality: { aqi: 48, label: 'Good', color: '#10b981' },
    sunrise: '05:58', sunset: '18:14',
    forecast: [
      { day:D[0], high:32, low:24, feelsLike:35, humidity:74, wind:14, windDir:'SW', rain:55, condition:'cloudy',      desc:'Mostly cloudy',            uv:6,  vis:11, pressure:1010 },
      { day:D[1], high:31, low:24, feelsLike:34, humidity:77, wind:16, windDir:'SW', rain:65, condition:'rainy',       desc:'Afternoon showers',        uv:5,  vis:9,  pressure:1009 },
      { day:D[2], high:33, low:25, feelsLike:36, humidity:71, wind:12, windDir:'W',  rain:42, condition:'partly_cloudy',desc:'Partly sunny spells',     uv:7,  vis:14, pressure:1011 },
      { day:D[3], high:34, low:26, feelsLike:37, humidity:68, wind:10, windDir:'NW', rain:28, condition:'sunny',       desc:'Warm sunny day',           uv:9,  vis:20, pressure:1013 },
      { day:D[4], high:35, low:27, feelsLike:38, humidity:65, wind:9,  windDir:'N',  rain:20, condition:'sunny',       desc:'Hot with clear skies',     uv:10, vis:22, pressure:1013 },
      { day:D[5], high:32, low:25, feelsLike:35, humidity:73, wind:13, windDir:'SW', rain:58, condition:'rainy',       desc:'Evening showers',          uv:5,  vis:10, pressure:1010 },
      { day:D[6], high:31, low:24, feelsLike:34, humidity:76, wind:15, windDir:'SW', rain:68, condition:'cloudy',      desc:'Persistent cloud',         uv:4,  vis:9,  pressure:1009 },
    ],
  },
  north_central: {
    airQuality: { aqi: 38, label: 'Good', color: '#10b981' },
    sunrise: '05:54', sunset: '18:12',
    forecast: [
      { day:D[0], high:35, low:26, feelsLike:40, humidity:60, wind:12, windDir:'SW', rain:25, condition:'sunny',       desc:'Hot dry conditions',       uv:11, vis:25, pressure:1009 },
      { day:D[1], high:36, low:27, feelsLike:42, humidity:57, wind:14, windDir:'W',  rain:18, condition:'sunny',       desc:'Extreme heat',             uv:12, vis:30, pressure:1008 },
      { day:D[2], high:34, low:26, feelsLike:38, humidity:63, wind:11, windDir:'SW', rain:32, condition:'partly_cloudy',desc:'Some afternoon cloud',    uv:9,  vis:20, pressure:1010 },
      { day:D[3], high:33, low:25, feelsLike:37, humidity:66, wind:10, windDir:'S',  rain:40, condition:'cloudy',      desc:'Cloud buildup',            uv:7,  vis:16, pressure:1010 },
      { day:D[4], high:34, low:26, feelsLike:39, humidity:62, wind:12, windDir:'SW', rain:28, condition:'sunny',       desc:'Bright and hot',           uv:10, vis:22, pressure:1011 },
      { day:D[5], high:35, low:27, feelsLike:40, humidity:59, wind:13, windDir:'W',  rain:22, condition:'sunny',       desc:'Clear skies',              uv:11, vis:26, pressure:1009 },
      { day:D[6], high:32, low:25, feelsLike:36, humidity:68, wind:11, windDir:'SW', rain:38, condition:'partly_cloudy',desc:'Bit more cloud',          uv:8,  vis:18, pressure:1010 },
    ],
  },
  uva: {
    airQuality: { aqi: 18, label: 'Good', color: '#10b981' },
    sunrise: '05:59', sunset: '18:13',
    forecast: [
      { day:D[0], high:26, low:17, feelsLike:26, humidity:70, wind:20, windDir:'NE', rain:40, condition:'partly_cloudy',desc:'Cool and breezy',         uv:7,  vis:18, pressure:1017 },
      { day:D[1], high:25, low:16, feelsLike:25, humidity:73, wind:22, windDir:'NE', rain:50, condition:'cloudy',      desc:'Overcast and windy',       uv:5,  vis:14, pressure:1016 },
      { day:D[2], high:27, low:18, feelsLike:27, humidity:68, wind:18, windDir:'E',  rain:35, condition:'partly_cloudy',desc:'Cool mornings',           uv:7,  vis:20, pressure:1017 },
      { day:D[3], high:28, low:19, feelsLike:29, humidity:65, wind:15, windDir:'NE', rain:28, condition:'sunny',       desc:'Pleasant highland weather',uv:8,  vis:25, pressure:1018 },
      { day:D[4], high:29, low:19, feelsLike:30, humidity:62, wind:14, windDir:'N',  rain:20, condition:'sunny',       desc:'Gorgeous sunny day',       uv:9,  vis:28, pressure:1019 },
      { day:D[5], high:26, low:17, feelsLike:26, humidity:72, wind:21, windDir:'NE', rain:45, condition:'cloudy',      desc:'Windy with cloud',         uv:5,  vis:15, pressure:1016 },
      { day:D[6], high:25, low:16, feelsLike:25, humidity:75, wind:23, windDir:'NE', rain:55, condition:'rainy',       desc:'Light rain showers',       uv:4,  vis:12, pressure:1015 },
    ],
  },
  sabaragamuwa: {
    airQuality: { aqi: 32, label: 'Good', color: '#10b981' },
    sunrise: '06:00', sunset: '18:14',
    forecast: [
      { day:D[0], high:29, low:22, feelsLike:31, humidity:88, wind:12, windDir:'SW', rain:90, condition:'thunderstorm',desc:'Very heavy rain',          uv:3,  vis:4,  pressure:1007 },
      { day:D[1], high:28, low:21, feelsLike:30, humidity:91, wind:14, windDir:'SW', rain:92, condition:'thunderstorm',desc:'Torrential downpours',     uv:2,  vis:3,  pressure:1006 },
      { day:D[2], high:29, low:22, feelsLike:31, humidity:87, wind:11, windDir:'W',  rain:85, condition:'rainy',       desc:'Heavy and persistent rain',uv:3,  vis:5,  pressure:1007 },
      { day:D[3], high:30, low:23, feelsLike:32, humidity:84, wind:10, windDir:'SW', rain:75, condition:'rainy',       desc:'Rainy with brief breaks',  uv:4,  vis:7,  pressure:1008 },
      { day:D[4], high:31, low:23, feelsLike:33, humidity:80, wind:9,  windDir:'S',  rain:65, condition:'cloudy',      desc:'Cloudy with showers',      uv:5,  vis:9,  pressure:1009 },
      { day:D[5], high:29, low:22, feelsLike:31, humidity:88, wind:13, windDir:'SW', rain:88, condition:'thunderstorm',desc:'Storm returns',            uv:3,  vis:4,  pressure:1006 },
      { day:D[6], high:28, low:21, feelsLike:30, humidity:90, wind:15, windDir:'SW', rain:90, condition:'thunderstorm',desc:'Continuous monsoon',       uv:2,  vis:3,  pressure:1005 },
    ],
  },
};

export const CONDITION_META = {
  sunny:        { label: 'Sunny',         emoji: '\u2600\uFE0F',  gradient: 'from-amber-900/80 via-orange-900/70 to-yellow-900/80',  bg: 'bg-amber-500' },
  partly_cloudy:{ label: 'Partly Cloudy', emoji: '\u26C5',  gradient: 'from-slate-800/90 via-blue-900/80 to-slate-900/90',     bg: 'bg-sky-400' },
  cloudy:       { label: 'Cloudy',        emoji: '\u2601\uFE0F',  gradient: 'from-slate-900/95 via-gray-800/90 to-slate-800/95',   bg: 'bg-gray-400' },
  rainy:        { label: 'Rainy',         emoji: '\u{1F327}\uFE0F', gradient: 'from-blue-950/95 via-indigo-900/90 to-blue-900/95',   bg: 'bg-blue-500' },
  thunderstorm: { label: 'Thunderstorm',  emoji: '\u26C8\uFE0F', gradient: 'from-gray-950/98 via-purple-950/95 to-slate-950/98',  bg: 'bg-purple-600' },
  drizzle:      { label: 'Drizzle',       emoji: '\u{1F4A7}', gradient: 'from-teal-900/90 via-cyan-900/85 to-blue-900/90',     bg: 'bg-teal-500' },
  foggy:        { label: 'Foggy',         emoji: '\u{1F32B}\uFE0F', gradient: 'from-slate-700/90 via-gray-600/85 to-slate-700/90', bg: 'bg-gray-500' },
};
`,
);

// ============================================================
// UTILS & HOOKS
// ============================================================
write(
  "src/utils/weatherUtils.js",
  `export function getAQIColor(aqi) {
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
`,
);

write(
  "src/hooks/useClock.js",
  `import { useState, useEffect } from 'react';

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
`,
);

// ============================================================
// COMPONENTS
// ============================================================
write(
  "src/components/LiveClock.jsx",
  `import React from 'react';
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
`,
);

write(
  "src/components/LoadingState.jsx",
  `import React from 'react';
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
          \u{1F324}\uFE0F
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
`,
);

write(
  "src/components/WeatherBackground.jsx",
  `import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RainDrops() {
  const drops = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.6 + Math.random() * 0.6,
    height: 30 + Math.random() * 50,
    opacity: 0.3 + Math.random() * 0.4,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map(d => (
        <motion.div
          key={d.id}
          className="absolute w-px rounded-full"
          style={{
            left: d.left + '%',
            height: d.height,
            background: 'linear-gradient(to bottom, transparent, rgba(147,197,253,0.7))',
            opacity: d.opacity,
          }}
          animate={{ y: ['-10vh', '110vh'] }}
          transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function LightningFlash() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: [0, 0, 0, 1, 0, 0.5, 0, 0, 0, 0] }}
      transition={{ duration: 5, repeat: Infinity, times: [0, 0.7, 0.75, 0.76, 0.77, 0.78, 0.79, 0.85, 0.9, 1] }}
      style={{ background: 'rgba(200, 180, 255, 0.15)' }}
    />
  );
}

function SunnyGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-16 right-16 w-64 h-64 rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,191,36,0.1) 60%, transparent 80%)',
          boxShadow: '0 0 120px 60px rgba(251,191,36,0.2)',
        }}
      />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-16 right-16 w-px"
          style={{
            height: '140px',
            transformOrigin: '0 0',
            rotate: i * 45,
            background: 'linear-gradient(to bottom, rgba(251,191,36,0.4), transparent)',
            marginLeft: '128px',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function FloatingClouds() {
  const clouds = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: 5 + i * 12,
    size: 120 + i * 40,
    duration: 18 + i * 8,
    delay: i * 4,
    opacity: 0.12 + i * 0.02,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map(c => (
        <motion.div
          key={c.id}
          className="absolute rounded-full"
          style={{
            top: c.top + '%',
            width: c.size,
            height: c.size * 0.55,
            background: 'rgba(255,255,255,' + c.opacity + ')',
            filter: 'blur(20px)',
          }}
          animate={{ x: ['-15vw', '115vw'] }}
          transition={{ duration: c.duration, repeat: Infinity, delay: c.delay, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

const BG_GRADIENTS = {
  sunny:         'radial-gradient(ellipse at 70% 20%, #78350f 0%, #1c1917 40%, #0a0a0a 100%)',
  partly_cloudy: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
  cloudy:        'linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%)',
  rainy:         'linear-gradient(180deg, #020617 0%, #0c1445 50%, #020c2e 100%)',
  thunderstorm:  'linear-gradient(180deg, #020617 0%, #1a0533 50%, #020617 100%)',
  drizzle:       'linear-gradient(135deg, #042f2e 0%, #0e3d3b 50%, #064e3b 100%)',
  foggy:         'linear-gradient(135deg, #374151 0%, #4b5563 50%, #374151 100%)',
};

export default function WeatherBackground({ condition = 'partly_cloudy' }) {
  const bg = BG_GRADIENTS[condition] || BG_GRADIENTS.partly_cloudy;
  const isRainy = condition === 'rainy' || condition === 'thunderstorm' || condition === 'drizzle';
  const isThunder = condition === 'thunderstorm';
  const isSunny = condition === 'sunny';
  const isCloudy = condition === 'cloudy' || condition === 'partly_cloudy';

  return (
    <div className="fixed inset-0 -z-10 transition-all duration-1000" style={{ background: bg }}>
      <AnimatePresence mode="wait">
        {isRainy && <RainDrops key="rain" />}
        {isThunder && <LightningFlash key="lightning" />}
        {isSunny && <SunnyGlow key="sun" />}
        {isCloudy && <FloatingClouds key="clouds" />}
      </AnimatePresence>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.04) 0%, transparent 70%)' }} />
    </div>
  );
}
`,
);

write(
  "src/components/Navbar.jsx",
  `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Wifi, WifiOff } from 'lucide-react';
import LiveClock from './LiveClock';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 " + (scrolled ? 'glass shadow-glass py-3' : 'py-5')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center shadow-glow-blue">
            <Cloud size={18} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">LK</span>
            <span className="text-blue-400 font-bold text-lg tracking-tight"> Weather</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25">
            <Wifi size={10} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium">API Ready</span>
          </div>
        </motion.div>
        <div className="flex items-center gap-4">
          <LiveClock compact />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl glass border-glass text-sm text-white/70 hover:text-white cursor-default transition-colors"
          >
            <span className="text-base">\u{1F1F1}\u{1F1F0}</span>
            <span>Sri Lanka</span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
`,
);

write(
  "src/components/Hero.jsx",
  `import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wind } from 'lucide-react';

function SriLankaMapSVG() {
  return (
    <svg viewBox="0 0 120 180" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path
        d="M 58,6 C 62,5 68,8 74,14 C 80,20 85,30 87,42 C 90,55 89,68 86,80 C 84,90 80,100 76,112 C 72,124 66,138 60,152 C 57,158 55,165 54,170 C 52,164 50,157 47,150 C 41,136 34,122 30,110 C 26,98 22,86 20,74 C 18,62 18,50 21,40 C 24,30 30,20 38,14 C 45,9 52,7 58,6 Z"
        fill="url(#mapGrad)"
        stroke="rgba(96,165,250,0.5)"
        strokeWidth="1"
        filter="url(#glow)"
      />
      <path
        d="M 40,40 C 50,38 62,38 72,42"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M 30,70 C 45,65 65,65 82,70"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M 24,100 C 40,93 68,93 86,100"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="54" cy="88" r="3" fill="rgba(96,165,250,0.8)" />
      <circle cx="54" cy="88" r="6" fill="rgba(96,165,250,0.2)" />
    </svg>
  );
}

function Particles() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 3, dur: 3 + Math.random() * 4, delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{ left: p.x + '%', top: p.y + '%', width: p.size, height: p.size, opacity: 0.4 }}
          animate={{ y: [-20, -60], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default function Hero({ onExplore }) {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } } };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      <Particles />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glass mb-8">
            <span className="text-base">\u{1F1F1}\u{1F1F0}</span>
            <span className="text-sm text-white/70">Sri Lanka</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400">Live Forecast</span>
          </motion.div>

          <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Sri Lanka
            <br />
            <span className="text-gradient">Weather</span>
            <br />
            <span className="text-white/80 text-4xl sm:text-5xl lg:text-6xl font-bold">Forecast</span>
          </motion.h1>

          <motion.p variants={item} className="text-white/55 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            Real-time 7-day weather predictions for all nine provinces.
            Powered by advanced forecasting models.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={onExplore}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(96,165,250,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold text-lg shadow-lg transition-all"
            >
              Explore Forecast \u2192
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="px-8 py-4 rounded-2xl glass border-glass text-white/70 font-medium text-lg flex items-center gap-2"
            >
              <Wind size={18} className="text-blue-400" />
              9 Provinces
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start">
            {[
              { val: '9', label: 'Provinces' },
              { val: '7', label: 'Day Forecast' },
              { val: '24/7', label: 'Live Updates' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22,1,0.36,1] }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-16 rounded-full border border-blue-400/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-violet-400/10"
            />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-64 h-96"
            >
              <SriLankaMapSVG />
            </motion.div>

            {[
              { label: 'Colombo', sub: '31\u00b0C \u{1F327}\uFE0F', pos: 'top-28 -right-20' },
              { label: 'Kandy',   sub: '27\u00b0C \u{1F325}\uFE0F', pos: 'top-32 -left-24' },
              { label: 'Jaffna',  sub: '36\u00b0C \u2600\uFE0F',  pos: '-top-4 right-0' },
            ].map((pin, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.2 }}
                className={"absolute " + pin.pos + " glass rounded-xl px-3 py-2 border-glass"}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin size={10} className="text-blue-400 flex-shrink-0" />
                  <span className="text-white text-xs font-semibold">{pin.label}</span>
                </div>
                <div className="text-white/60 text-xs mt-0.5">{pin.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`,
);

write(
  "src/components/ProvinceSelector.jsx",
  `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { PROVINCES } from '../data/weatherData';

export default function ProvinceSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selected = PROVINCES.find(p => p.id === value);
  const filtered = PROVINCES.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.capital.toLowerCase().includes(search.toLowerCase()));

  const select = (id) => { onChange(id); setOpen(false); setSearch(''); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      className="max-w-2xl mx-auto px-4"
      id="explore"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Select a Province</h2>
        <p className="text-white/50">Choose a province to view the 7-day weather forecast</p>
      </div>

      <div className="relative">
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full glass-strong rounded-2xl px-5 py-4 flex items-center justify-between border-glass shadow-glass transition-all hover:border-blue-400/30"
        >
          {selected ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selected.emoji}</span>
              <div className="text-left">
                <div className="text-white font-semibold">{selected.name}</div>
                <div className="text-white/50 text-sm flex items-center gap-1">
                  <MapPin size={11} />
                  {selected.capital}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-white/50">
              <MapPin size={18} className="text-blue-400" />
              <span className="text-white/60 text-lg">Choose a province...</span>
            </div>
          )}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={20} className="text-white/50" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-2xl border-glass shadow-glass overflow-hidden"
            >
              <div className="p-3 border-b border-white/10">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
                  <Search size={14} className="text-white/40" />
                  <input
                    autoFocus
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search provinces..."
                    className="bg-transparent text-white text-sm outline-none placeholder-white/30 flex-1"
                  />
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => select(p.id)}
                    className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all " + (value === p.id ? 'bg-blue-500/20 border border-blue-500/30' : 'hover:bg-white/6 border border-transparent')}
                  >
                    <span className="text-xl flex-shrink-0">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">{p.name}</div>
                      <div className="text-white/40 text-xs flex items-center gap-1">
                        <MapPin size={9} />
                        {p.capital}
                      </div>
                    </div>
                    <div className={"w-2 h-2 rounded-full bg-gradient-to-r " + p.color + " flex-shrink-0"} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
`,
);

write(
  "src/components/ForecastCard.jsx",
  `import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind } from 'lucide-react';
import { CONDITION_META } from '../data/weatherData';

export default function ForecastCard({ day, index, isActive, onClick }) {
  const meta = CONDITION_META[day.condition] || CONDITION_META.partly_cloudy;
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={"w-full text-left rounded-2xl border transition-all duration-300 " + (isActive
        ? 'glass-strong border-blue-400/40 shadow-glow-blue shadow-glass'
        : 'glass border-white/10 hover:border-white/20')}
    >
      <div className="p-4 sm:p-5">
        <div className="text-center mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">{day.day}</div>
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mx-auto mb-1 animate-pulse" />}
        </div>

        <div className="text-center mb-4">
          <div className="text-3xl mb-2">{meta.emoji}</div>
          <div className="text-xs text-white/40 font-medium truncate px-1">{meta.label}</div>
        </div>

        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-white">{day.high}\u00b0</div>
          <div className="text-sm text-white/40">{day.low}\u00b0</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-1">
              <Droplets size={10} className="text-blue-400" />
              <span>{day.rain}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind size={10} className="text-teal-400" />
              <span>{day.wind}km/h</span>
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: day.rain + '%' }}
              transition={{ delay: index * 0.07 + 0.3, duration: 0.6 }}
              className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
`,
);

write(
  "src/components/TodayHighlight.jsx",
  `import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Eye, Gauge, Zap } from 'lucide-react';
import { CONDITION_META } from '../data/weatherData';
import { getUVLabel } from '../utils/weatherUtils';
import LiveClock from './LiveClock';
import SunriseSunset from './SunriseSunset';
import AirQuality from './AirQuality';

export default function TodayHighlight({ province, weather, today }) {
  const meta = CONDITION_META[today.condition] || CONDITION_META.partly_cloudy;
  const uvInfo = getUVLabel(today.uv);

  const metrics = [
    { icon: Thermometer, label: 'Feels Like', value: today.feelsLike + '\u00b0C', color: 'text-orange-400' },
    { icon: Droplets,   label: 'Humidity',   value: today.humidity + '%',      color: 'text-blue-400' },
    { icon: Wind,       label: 'Wind Speed', value: today.wind + ' km/h',      color: 'text-teal-400' },
    { icon: Eye,        label: 'Visibility', value: today.vis + ' km',          color: 'text-purple-400' },
    { icon: Gauge,      label: 'Pressure',   value: today.pressure + ' hPa',   color: 'text-pink-400' },
    { icon: Zap,        label: 'UV Index',   value: today.uv + ' \u2022 ' + uvInfo.label, color: 'text-amber-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="space-y-4"
    >
      <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-glass border-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-32 translate-x-32 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.8) 0%, transparent 70%)' }} />

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{province.emoji}</span>
                <h2 className="text-xl font-bold text-white">{province.name}</h2>
              </div>
              <p className="text-white/50 text-sm">{today.desc}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl mb-1">{meta.emoji}</div>
              <div className="text-xs text-white/40 font-medium">{meta.label}</div>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <div>
              <div className="text-8xl font-black text-white leading-none">{today.high}\u00b0</div>
              <div className="text-white/40 text-lg font-medium mt-1">High / <span className="text-blue-400">{today.low}\u00b0</span> Low</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {metrics.map(m => (
              <motion.div key={m.label} whileHover={{ scale: 1.03 }} className="glass rounded-2xl p-3.5 border-glass">
                <div className="flex items-center gap-2 mb-1.5">
                  <m.icon size={14} className={m.color} />
                  <span className="text-white/40 text-xs">{m.label}</span>
                </div>
                <div className="text-white font-semibold text-sm">{m.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SunriseSunset sunrise={weather.sunrise} sunset={weather.sunset} />
        <AirQuality airQuality={weather.airQuality} />
      </div>

      <LiveClock />
    </motion.div>
  );
}
`,
);

write(
  "src/components/SunriseSunset.jsx",
  `import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';
import { getSunPosition } from '../utils/weatherUtils';

export default function SunriseSunset({ sunrise, sunset }) {
  const progress = getSunPosition(sunrise, sunset);
  const angle = progress * 180;
  const rad = (angle * Math.PI) / 180;
  const r = 45;
  const cx = 60, cy = 70;
  const sunX = cx + r * Math.cos(Math.PI - rad);
  const sunY = cy - r * Math.sin(rad);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-5 shadow-glass border-glass"
    >
      <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4 font-medium">Sunrise & Sunset</h3>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Sunrise size={14} className="text-amber-400" />
          <span className="text-white/70 text-xs">Sunrise</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-white/70 text-xs">Sunset</span>
          <Sunset size={14} className="text-orange-400" />
        </div>
      </div>

      <div className="relative h-20 mb-3">
        <svg viewBox="0 0 120 80" className="w-full h-full">
          <path d="M 15,70 A 45,45 0 0 1 105,70" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
          <path
            d={"M 15,70 A 45,45 0 0 1 " + (cx + r * Math.cos(Math.PI - rad)) + "," + (cy - r * Math.sin(rad))}
            stroke="url(#sunGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"
          />
          <defs>
            <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          {progress > 0 && progress < 1 && (
            <>
              <circle cx={sunX} cy={sunY} r="7" fill="rgba(251,191,36,0.3)" />
              <circle cx={sunX} cy={sunY} r="4" fill="#fbbf24" />
            </>
          )}
          <circle cx="15" cy="70" r="3" fill="#f59e0b" opacity="0.7" />
          <circle cx="105" cy="70" r="3" fill="#f97316" opacity="0.7" />
        </svg>
      </div>

      <div className="flex justify-between">
        <div className="text-center">
          <div className="text-white font-bold text-lg">{sunrise}</div>
          <div className="text-white/40 text-xs">AM</div>
        </div>
        <div className="text-center">
          <div className="text-white/50 text-xs">Day length</div>
          <div className="text-white/70 text-sm font-medium">12h 20m</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-lg">{sunset}</div>
          <div className="text-white/40 text-xs">PM</div>
        </div>
      </div>
    </motion.div>
  );
}
`,
);

write(
  "src/components/AirQuality.jsx",
  `import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { getAQIColor } from '../utils/weatherUtils';

export default function AirQuality({ airQuality }) {
  const info = getAQIColor(airQuality.aqi);
  const pct = Math.min(100, (airQuality.aqi / 300) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-5 shadow-glass border-glass"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/60 text-xs uppercase tracking-wider font-medium">Air Quality</h3>
        <Wind size={14} className="text-white/30" />
      </div>

      <div className="flex items-end gap-3 mb-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-4xl font-black"
          style={{ color: info.color }}
        >
          {airQuality.aqi}
        </motion.div>
        <div className="mb-1">
          <div className="text-white/40 text-xs">AQI</div>
          <div className="text-sm font-semibold" style={{ color: info.color }}>{info.label}</div>
        </div>
      </div>

      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: pct + '%' }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #10b981, ' + info.color + ')' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-1 text-center">
        {[['0-50','Good'],['51-100','Moderate'],['100+','Poor']].map(([r,l]) => (
          <div key={l} className="text-xs text-white/30">
            <div className="font-medium">{r}</div>
            <div>{l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
`,
);

write(
  "src/components/WeatherChart.jsx",
  `import React, { useState } from 'react';
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
  { id: 'temp',     label: 'Temperature', icon: '\u{1F321}\uFE0F' },
  { id: 'rain',     label: 'Rain Chance', icon: '\u{1F327}\uFE0F' },
  { id: 'humidity', label: 'Humidity',    icon: '\u{1F4A7}' },
];

export default function WeatherChart({ forecast }) {
  const [tab, setTab] = useState('temp');
  const data = forecast.map(d => ({
    day: d.day,
    'High (\u00b0C)': d.high,
    'Low (\u00b0C)': d.low,
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
            <Area type="monotone" dataKey="High (\u00b0C)" stroke="#f97316" strokeWidth={2.5} fill="url(#highGrad)" dot={{ fill: '#f97316', r: 4 }} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="Low (\u00b0C)" stroke="#60a5fa" strokeWidth={2.5} fill="url(#lowGrad)" dot={{ fill: '#60a5fa', r: 4 }} activeDot={{ r: 6 }} />
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
`,
);

write(
  "src/components/WeatherDashboard.jsx",
  `import React, { useState } from 'react';
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
            <span>\u{1F1F1}\u{1F1F0} Sri Lanka</span>
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
`,
);

write(
  "src/components/Footer.jsx",
  `import React from 'react';
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
            \u00a9 2026 LK Weather \u2022 Mock data for demonstration
          </p>
        </div>
      </div>
    </footer>
  );
}
`,
);

// ============================================================
// APP.JSX
// ============================================================
write(
  "src/App.jsx",
  `import React, { useState, useRef } from 'react';
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
`,
);

// ============================================================
// FAVICON
// ============================================================
write(
  "public/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <text x="16" y="22" text-anchor="middle" font-size="18" font-family="Arial">&#9925;</text>
</svg>
`,
);

// ============================================================
// API INTEGRATION STUB
// ============================================================
write(
  "src/services/weatherApi.js",
  `/**
 * Weather API Integration - Future Ready
 * Replace mock data with real API calls here.
 *
 * Supported APIs:
 *  - OpenWeatherMap: https://openweathermap.org/api
 *  - WeatherAPI: https://www.weatherapi.com/
 *  - Open-Meteo (free): https://open-meteo.com/
 */

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.weatherapi.com/v1';

const PROVINCE_COORDS = {
  western:       { lat: 6.9271,  lon: 79.8612, name: 'Colombo' },
  central:       { lat: 7.2906,  lon: 80.6337, name: 'Kandy' },
  southern:      { lat: 6.0535,  lon: 80.2210, name: 'Galle' },
  northern:      { lat: 9.6615,  lon: 80.0255, name: 'Jaffna' },
  eastern:       { lat: 8.5874,  lon: 81.2152, name: 'Trincomalee' },
  north_western: { lat: 7.4867,  lon: 80.3647, name: 'Kurunegala' },
  north_central: { lat: 8.3114,  lon: 80.4037, name: 'Anuradhapura' },
  uva:           { lat: 6.9934,  lon: 81.0550, name: 'Badulla' },
  sabaragamuwa:  { lat: 6.6828,  lon: 80.3992, name: 'Ratnapura' },
};

export async function fetchForecast(provinceId) {
  if (!API_KEY) {
    // Return null to signal using mock data
    return null;
  }
  const coords = PROVINCE_COORDS[provinceId];
  if (!coords) throw new Error('Unknown province: ' + provinceId);

  const url = BASE_URL + '/forecast.json?key=' + API_KEY + '&q=' + coords.lat + ',' + coords.lon + '&days=7&aqi=yes';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather API error: ' + res.status);
  return res.json();
}

export function transformApiResponse(apiData) {
  // Transform WeatherAPI.com response to app's data format
  return {
    airQuality: {
      aqi: apiData.current.air_quality?.['us-epa-index'] * 25 || 50,
      label: 'Live',
      color: '#10b981',
    },
    sunrise: apiData.forecast.forecastday[0].astro.sunrise,
    sunset:  apiData.forecast.forecastday[0].astro.sunset,
    forecast: apiData.forecast.forecastday.map((d, i) => ({
      day: i === 0 ? 'Today' : new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
      high: Math.round(d.day.maxtemp_c),
      low:  Math.round(d.day.mintemp_c),
      feelsLike: Math.round(d.day.maxtemp_c + 2),
      humidity: d.day.avghumidity,
      wind: Math.round(d.day.maxwind_kph),
      windDir: 'SW',
      rain: d.day.daily_chance_of_rain,
      condition: mapConditionCode(d.day.condition.code),
      desc: d.day.condition.text,
      uv: Math.round(d.day.uv),
      vis: Math.round(d.day.avgvis_km),
      pressure: 1010,
    })),
  };
}

function mapConditionCode(code) {
  if ([1000].includes(code)) return 'sunny';
  if ([1003, 1006].includes(code)) return 'partly_cloudy';
  if ([1009].includes(code)) return 'cloudy';
  if ([1063, 1180, 1183, 1186, 1189, 1192, 1195].includes(code)) return 'rainy';
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return 'thunderstorm';
  if ([1150, 1153, 1168, 1171].includes(code)) return 'drizzle';
  if ([1030, 1135, 1147].includes(code)) return 'foggy';
  return 'partly_cloudy';
}
`,
);

write(
  ".env.example",
  `# Weather API Integration
# Copy this to .env and fill in your API key

VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_URL=https://api.weatherapi.com/v1
`,
);

console.log("\n\u2705  All files created successfully!\n");
console.log("\u{1F4E6}  Next steps:");
console.log("   1. npm install");
console.log("   2. npm run dev");
console.log("   3. Open http://localhost:5173\n");
console.log(
  "\u{1F4A1}  Optional: Add your WeatherAPI key to .env for live data\n",
);
