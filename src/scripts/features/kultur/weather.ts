// @ts-nocheck
// Wetter je Fläche über Open-Meteo – komplett client-side (kein API-Key, CORS,
// GitHub Pages tauglich). Tageswerte werden auf ISO-Kalenderwochen aggregiert
// und an der aktuellen KW in "Ist/Archiv" (Vergangenheit) und "Vorhersage"
// getrennt. Antworten liegen in localStorage und werden 1×/Tag erneuert.
//
// Künftiges Backend: dieselbe Aggregation lässt sich server-seitig cachen
// (ein Proxy mit demselben Cache-Key lat3_lon3), die UI bleibt unverändert.
import { getIsoWeek, weekKeyOf, parseIsoDate } from "@scripts/core/utils";

export interface WeekWeather {
  weekKey: string;
  year: number;
  week: number;
  tMaxAvg: number | null;
  tMinAvg: number | null;
  tMeanAvg: number | null;
  precipSum: number | null;
  sunHours: number | null;
  days: number;
  isForecast: boolean;
}

export interface WeatherBundle {
  lat: number;
  lon: number;
  fetchedAt: string;
  stale?: boolean;
  weeks: WeekWeather[];
}

export const WEATHER_ATTRIBUTION = "Wetterdaten: Open-Meteo (CC BY 4.0)";

const CACHE_PREFIX = "psm.weather.";

function todayStr(): string {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}
function cacheKey(lat: number, lon: number): string {
  return CACHE_PREFIX + lat.toFixed(3) + "_" + lon.toFixed(3);
}
function readCache(key: string): WeatherBundle | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as WeatherBundle) : null;
  } catch {
    return null;
  }
}
function writeCache(key: string, bundle: WeatherBundle): void {
  try {
    localStorage.setItem(key, JSON.stringify(bundle));
  } catch {}
}
function isFromToday(iso?: string): boolean {
  return !!iso && iso.slice(0, 10) === todayStr();
}

function aggregate(daily: any, lat: number, lon: number): WeatherBundle {
  const dates: string[] = daily?.time || [];
  const tmax: number[] = daily?.temperature_2m_max || [];
  const tmin: number[] = daily?.temperature_2m_min || [];
  const precip: number[] = daily?.precipitation_sum || [];
  const sun: number[] = daily?.sunshine_duration || [];
  const cur = getIsoWeek(new Date());
  const curKey = weekKeyOf(cur.year, cur.week);
  const map = new Map<string, any>();
  for (let i = 0; i < dates.length; i++) {
    const d = parseIsoDate(dates[i]);
    if (!d) continue;
    const { year, week } = getIsoWeek(d);
    const key = weekKeyOf(year, week);
    let e = map.get(key);
    if (!e) {
      e = { key, year, week, tmaxSum: 0, tmaxN: 0, tminSum: 0, tminN: 0, precip: 0, precipN: 0, sun: 0, sunN: 0, days: 0 };
      map.set(key, e);
    }
    if (Number.isFinite(tmax[i])) { e.tmaxSum += tmax[i]; e.tmaxN++; }
    if (Number.isFinite(tmin[i])) { e.tminSum += tmin[i]; e.tminN++; }
    if (Number.isFinite(precip[i])) { e.precip += precip[i]; e.precipN++; }
    if (Number.isFinite(sun[i])) { e.sun += sun[i]; e.sunN++; }
    e.days++;
  }
  const weeks: WeekWeather[] = [...map.values()]
    .sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
    .map((e) => {
      const tMaxAvg = e.tmaxN ? e.tmaxSum / e.tmaxN : null;
      const tMinAvg = e.tminN ? e.tminSum / e.tminN : null;
      return {
        weekKey: e.key,
        year: e.year,
        week: e.week,
        tMaxAvg,
        tMinAvg,
        tMeanAvg: tMaxAvg != null && tMinAvg != null ? (tMaxAvg + tMinAvg) / 2 : tMaxAvg,
        precipSum: e.precipN ? e.precip : null,
        sunHours: e.sunN ? e.sun / 3600 : null,
        days: e.days,
        // Aktuelle KW ist noch nicht abgeschlossen (enthält Forecast-Tage) ->
        // zur Vorhersage zählen, nicht als fertiges "Ist".
        isForecast: e.key >= curKey,
      };
    });
  return { lat, lon, fetchedAt: new Date().toISOString(), weeks };
}

export async function getWeather(lat: number, lon: number): Promise<WeatherBundle> {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return { lat, lon, fetchedAt: new Date().toISOString(), weeks: [] };
  }
  const key = cacheKey(lat, lon);
  const cached = readCache(key);
  if (cached && isFromToday(cached.fetchedAt) && cached.weeks?.length) return cached;
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    if (cached) return { ...cached, stale: true };
    return { lat, lon, fetchedAt: new Date().toISOString(), weeks: [] };
  }
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat.toFixed(4) +
    "&longitude=" +
    lon.toFixed(4) +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration" +
    "&timezone=Europe%2FBerlin&past_days=92&forecast_days=16";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    const bundle = aggregate(json.daily, lat, lon);
    if (bundle.weeks.length) writeCache(key, bundle);
    return bundle;
  } catch {
    if (cached) return { ...cached, stale: true };
    return { lat, lon, fetchedAt: new Date().toISOString(), weeks: [] };
  }
}
