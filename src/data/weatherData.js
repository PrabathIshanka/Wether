export const PROVINCES = [
  { id: 'western',      name: 'Western Province',       capital: 'Colombo',       emoji: '🏙', color: 'from-blue-500 to-cyan-600',    region: 'Western' },
  { id: 'central',      name: 'Central Province',       capital: 'Kandy',         emoji: '⛰️',  color: 'from-emerald-500 to-teal-700', region: 'Central' },
  { id: 'southern',     name: 'Southern Province',      capital: 'Galle',         emoji: '🏖️',  color: 'from-amber-500 to-orange-600', region: 'Southern' },
  { id: 'northern',     name: 'Northern Province',      capital: 'Jaffna',        emoji: '🌴',  color: 'from-yellow-500 to-amber-600', region: 'Northern' },
  { id: 'eastern',      name: 'Eastern Province',       capital: 'Trincomalee',   emoji: '🌊',  color: 'from-sky-500 to-blue-700',     region: 'Eastern' },
  { id: 'north_western',name: 'North Western Province', capital: 'Kurunegala',    emoji: '🌳',  color: 'from-lime-500 to-green-700',   region: 'NW' },
  { id: 'north_central',name: 'North Central Province', capital: 'Anuradhapura',  emoji: '📿',  color: 'from-orange-500 to-red-600',   region: 'NC' },
  { id: 'uva',          name: 'Uva Province',           capital: 'Badulla',       emoji: '🍵',  color: 'from-purple-500 to-violet-700',region: 'Uva' },
  { id: 'sabaragamuwa', name: 'Sabaragamuwa Province',  capital: 'Ratnapura',     emoji: '💎',  color: 'from-pink-500 to-rose-700',    region: 'Sabara' },
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
  sunny:        { label: 'Sunny',         emoji: '☀️',  gradient: 'from-amber-900/80 via-orange-900/70 to-yellow-900/80',  bg: 'bg-amber-500' },
  partly_cloudy:{ label: 'Partly Cloudy', emoji: '⛅',  gradient: 'from-slate-800/90 via-blue-900/80 to-slate-900/90',     bg: 'bg-sky-400' },
  cloudy:       { label: 'Cloudy',        emoji: '☁️',  gradient: 'from-slate-900/95 via-gray-800/90 to-slate-800/95',   bg: 'bg-gray-400' },
  rainy:        { label: 'Rainy',         emoji: '🌧️', gradient: 'from-blue-950/95 via-indigo-900/90 to-blue-900/95',   bg: 'bg-blue-500' },
  thunderstorm: { label: 'Thunderstorm',  emoji: '⛈️', gradient: 'from-gray-950/98 via-purple-950/95 to-slate-950/98',  bg: 'bg-purple-600' },
  drizzle:      { label: 'Drizzle',       emoji: '💧', gradient: 'from-teal-900/90 via-cyan-900/85 to-blue-900/90',     bg: 'bg-teal-500' },
  foggy:        { label: 'Foggy',         emoji: '🌫️', gradient: 'from-slate-700/90 via-gray-600/85 to-slate-700/90', bg: 'bg-gray-500' },
};
