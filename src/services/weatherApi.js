/**
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
