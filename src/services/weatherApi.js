/**
 * Open-Meteo Weather API Integration
 * - 100% FREE, no API key required
 * - Docs: https://open-meteo.com/en/docs
 * - Air Quality: https://open-meteo.com/en/docs/air-quality-api
 */

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const AQI_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

export const PROVINCE_COORDS = {
  western: { lat: 6.9271, lon: 79.8612, name: "Colombo" },
  central: { lat: 7.2906, lon: 80.6337, name: "Kandy" },
  southern: { lat: 6.0535, lon: 80.221, name: "Galle" },
  northern: { lat: 9.6615, lon: 80.0255, name: "Jaffna" },
  eastern: { lat: 8.5874, lon: 81.2152, name: "Trincomalee" },
  north_western: { lat: 7.4867, lon: 80.3647, name: "Kurunegala" },
  north_central: { lat: 8.3114, lon: 80.4037, name: "Anuradhapura" },
  uva: { lat: 6.9934, lon: 81.055, name: "Badulla" },
  sabaragamuwa: { lat: 6.6828, lon: 80.3992, name: "Ratnapura" },
};

// WMO weather code → condition key
function wmoToCondition(code) {
  if (code === 0 || code === 1) return "sunny";
  if (code === 2) return "partly_cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "foggy";
  if (code >= 51 && code <= 57) return "drizzle";
  if (code >= 61 && code <= 67) return "rainy";
  if (code >= 71 && code <= 77) return "rainy";
  if (code >= 80 && code <= 82) return "rainy";
  if (code >= 85 && code <= 86) return "rainy";
  if (code === 95) return "thunderstorm";
  if (code === 96 || code === 99) return "thunderstorm";
  return "partly_cloudy";
}

// WMO code → human-readable description
function wmoToDescription(code) {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Icy fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    77: "Snow grains",
    80: "Slight showers",
    81: "Moderate showers",
    82: "Violent showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm",
  };
  return map[code] || "Variable conditions";
}

// Wind degrees → cardinal direction
function degreesToCardinal(deg) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

// Format sunrise/sunset "2024-06-01T05:56" → "05:56"
function fmtTime(iso) {
  if (!iso) return "--:--";
  return iso.slice(11, 16);
}

// AQI value → label
function aqiLabel(aqi) {
  if (aqi <= 50) return { label: "Good", color: "#10b981" };
  if (aqi <= 100) return { label: "Moderate", color: "#f59e0b" };
  if (aqi <= 150) return { label: "Unhealthy for Some", color: "#f97316" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#ef4444" };
  return { label: "Very Unhealthy", color: "#8b5cf6" };
}

/**
 * Fetch 7-day forecast + AQI for a province.
 * Returns null on network error (caller uses mock data as fallback).
 */
export async function fetchLiveWeather(provinceId) {
  const coords = PROVINCE_COORDS[provinceId];
  if (!coords) return null;

  const { lat, lon } = coords;

  const forecastParams = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: [
      "weathercode",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "precipitation_probability_max",
      "windspeed_10m_max",
      "winddirection_10m_dominant",
      "uv_index_max",
      "visibility_mean",
      "surface_pressure_mean",
      "relative_humidity_2m_max",
      "sunrise",
      "sunset",
    ].join(","),
    timezone: "Asia/Colombo",
    forecast_days: 7,
  });

  const aqiParams = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: "us_aqi",
    timezone: "Asia/Colombo",
  });

  try {
    const [forecastRes, aqiRes] = await Promise.all([
      fetch(`${FORECAST_URL}?${forecastParams}`),
      fetch(`${AQI_URL}?${aqiParams}`),
    ]);

    if (!forecastRes.ok) throw new Error(`Forecast API ${forecastRes.status}`);

    const forecast = await forecastRes.json();
    const aqiData = aqiRes.ok ? await aqiRes.json() : null;

    return transform(forecast, aqiData);
  } catch (err) {
    console.warn("[WeatherAPI] Fetch failed, using mock data:", err.message);
    return null;
  }
}

function transform(data, aqiData) {
  const d = data.daily;
  const days = d.time.length;

  const forecast = Array.from({ length: days }, (_, i) => {
    const date = new Date(d.time[i] + "T00:00:00");
    const label =
      i === 0
        ? "Today"
        : date.toLocaleDateString("en-US", { weekday: "short" });
    const wmo = d.weathercode[i];
    return {
      day: label,
      high: Math.round(d.temperature_2m_max[i]),
      low: Math.round(d.temperature_2m_min[i]),
      feelsLike: Math.round(d.apparent_temperature_max[i]),
      humidity: Math.round(d.relative_humidity_2m_max[i]),
      wind: Math.round(d.windspeed_10m_max[i]),
      windDir: degreesToCardinal(d.winddirection_10m_dominant[i]),
      rain: d.precipitation_probability_max[i] ?? 0,
      condition: wmoToCondition(wmo),
      desc: wmoToDescription(wmo),
      uv: Math.round(d.uv_index_max[i] ?? 0),
      vis: Math.round((d.visibility_mean[i] ?? 10000) / 1000),
      pressure: Math.round(d.surface_pressure_mean[i] ?? 1010),
    };
  });

  const rawAqi = aqiData?.current?.us_aqi ?? 50;
  const aqiInfo = aqiLabel(rawAqi);

  return {
    isLive: true,
    sunrise: fmtTime(d.sunrise[0]),
    sunset: fmtTime(d.sunset[0]),
    airQuality: {
      aqi: rawAqi,
      label: aqiInfo.label,
      color: aqiInfo.color,
    },
    forecast,
  };
}
