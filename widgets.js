'use strict';

// Approximate forecast points for the areas visited each day; no device location is used.
const weatherRegions = {
 1: {name:'도고온천 주변', latitude:33.851, longitude:132.786},
 2: {name:'마쓰야마성·오카이도', latitude:33.845, longitude:132.766},
 3: {name:'미쓰하마·바이신지 해안', latitude:33.873, longitude:132.718},
 4: {name:'오카이도·시내', latitude:33.839, longitude:132.769}
};
const weatherRequests = new Map();
let weatherRequestId = 0;
let activeWeatherDay = 1;
let exchangeRate = null;
const wonFormat = new Intl.NumberFormat('ko-KR', {maximumFractionDigits:0});

async function fetchWidgetData(url) {
 const controller = new AbortController();
 const timer = setTimeout(() => controller.abort(), 12000);
 try {
  const response = await fetch(url, {signal:controller.signal, credentials:'omit'});
  if (!response.ok) throw new Error('Data unavailable');
  return await response.json();
 } finally { clearTimeout(timer); }
}

function weatherDescription(code) {
 if (code === 0) return ['☀️','맑음'];
 if (code === 1) return ['🌤️','대체로 맑음'];
 if (code === 2) return ['⛅','구름 조금'];
 if (code === 3) return ['☁️','흐림'];
 if ([45,48].includes(code)) return ['🌫️','안개'];
 if ([51,53,55,56,57].includes(code)) return ['🌦️','이슬비'];
 if ([61,63,65,66,67,80,81,82].includes(code)) return ['🌧️','비'];
 if ([71,73,75,77,85,86].includes(code)) return ['🌨️','눈'];
 if ([95,96,99].includes(code)) return ['⛈️','뇌우'];
 return ['🌡️','날씨 정보'];
}

function weatherNumber(value, unit) {
 return typeof value === 'number' && Number.isFinite(value) ? Math.round(value) + unit : '—';
}

async function showDayWeather(day, refresh = false) {
 activeWeatherDay = day.id;
 document.getElementById('weather-day').value = String(day.id);
 const region = weatherRegions[day.id];
 const tripDate = `2026-12-0${day.id + 2}`;
 const ticket = ++weatherRequestId;
 const content = document.getElementById('weather-content');
 const retry = document.getElementById('weather-retry');
 document.getElementById('weather-region').textContent = region.name;
 content.textContent = '날씨를 불러오는 중이에요…';
 retry.hidden = true;
 const cached = weatherRequests.get(day.id);
 let request = cached && Date.now() - cached.time < 600000 && !refresh ? cached.promise : null;
 if (!request) {
  const params = new URLSearchParams({
   latitude:region.latitude, longitude:region.longitude,
   current:'temperature_2m,weather_code,wind_speed_10m',
   daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
   timezone:'Asia/Tokyo', forecast_days:'16', wind_speed_unit:'ms'
  });
  request = fetchWidgetData('https://api.open-meteo.com/v1/forecast?' + params);
  weatherRequests.set(day.id, {time:Date.now(), promise:request});
 }
 try {
  const data = await request;
  if (ticket !== weatherRequestId) return;
  const daily = data.daily;
  if (!Array.isArray(daily?.time)) throw new Error('Missing forecast');
  const index = daily.time.indexOf(tripDate);
  const forecastAvailable = index >= 0 && typeof daily.weather_code?.[index] === 'number';
  const current = data.current;
  if (!forecastAvailable && (typeof current?.temperature_2m !== 'number' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(current.time))) throw new Error('Missing current weather');
  const [emoji, description] = weatherDescription(forecastAvailable ? daily.weather_code[index] : current.weather_code);
  const todayIndex = daily.time.indexOf(current?.time?.slice(0,10));
  const row = forecastAvailable ? index : todayIndex;
  const high = weatherNumber(daily.temperature_2m_max?.[row], '°');
  const low = weatherNumber(daily.temperature_2m_min?.[row], '°');
  const rain = weatherNumber(daily.precipitation_probability_max?.[row], '%');
  const temperature = forecastAvailable ? `${low} / ${high}` : weatherNumber(current.temperature_2m, '°');
  const period = forecastAvailable ? `12월 ${day.id+2}일 예보 · 최저 / 최고` : `${Number(current.time.slice(5,7))}월 ${Number(current.time.slice(8,10))}일 ${current.time.slice(11,16)} 현재 · 일본 시간`;
  const detail = forecastAvailable ? `강수 확률 ${rain} · 최대 바람 ${weatherNumber(daily.wind_speed_10m_max?.[row], 'm/s')}` : `오늘 ${low} / ${high} · 강수 확률 ${rain}`;
  // Only locally defined labels and validated numbers are inserted as HTML.
  content.innerHTML = `<p class="weather-period">${period}</p><div class="weather-main"><span class="weather-emoji" aria-hidden="true">${emoji}</span><strong>${temperature}</strong><span>${description}</span></div><p class="weather-detail">${detail}</p><p class="weather-notice"></p>`;
  const notice = content.querySelector('.weather-notice');
  notice.textContent = forecastAvailable ? '' : tripDate > current.time.slice(0,10) ? `12월 ${day.id+2}일 예보는 아직 없어요. 현재 지역 날씨를 보여드려요.` : '여행일 예보 제공 기간이 지나 현재 지역 날씨를 보여드려요.';
  notice.hidden = !notice.textContent;
 } catch {
  weatherRequests.delete(day.id);
  if (ticket !== weatherRequestId) return;
  content.textContent = '날씨를 불러오지 못했어요. 잠시 후 다시 눌러 주세요.';
  retry.hidden = false;
 }
}

function validExchangeRate(value) {
 return value && value.base === 'JPY' && value.quote === 'KRW' && typeof value.rate === 'number' && Number.isFinite(value.rate) && value.rate > 0 && /^\d{4}-\d{2}-\d{2}$/.test(value.date);
}

function updateConversion() {
 const field = document.getElementById('yen-amount');
 const output = document.getElementById('won-result');
 const raw = field.value.trim();
 field.removeAttribute('aria-invalid');
 if (!raw) { output.textContent = '금액을 입력하면 원화가 보여요.'; output.classList.remove('has-amount'); return; }
 // Accept plain numbers or properly grouped thousands, including pasted prices.
 const valid = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$/.test(raw);
 const amount = Number(raw.replaceAll(',', ''));
 if (!valid || !Number.isFinite(amount) || amount < 0 || amount > 1000000000) {
  field.setAttribute('aria-invalid','true'); output.textContent = '0~10억 사이의 숫자를 입력해 주세요.'; output.classList.remove('has-amount'); return;
 }
 output.classList.toggle('has-amount', !!exchangeRate);
 output.textContent = exchangeRate ? `약 ${wonFormat.format(amount * exchangeRate.rate)}원` : '환율을 불러오면 바로 계산돼요.';
}

function paintExchangeRate(saved = false) {
 const status = document.getElementById('exchange-status');
 const formatted = exchangeRate.rate.toLocaleString('ko-KR',{maximumFractionDigits:4});
 status.textContent = `${saved ? '저장된 환율 · ' : ''}1엔 ≈ ${formatted}원 · ${exchangeRate.date.replaceAll('-','.')} 기준`;
 updateConversion();
}

async function loadExchangeRate() {
 const retry = document.getElementById('exchange-retry');
 const status = document.getElementById('exchange-status');
 retry.hidden = true;
 if (!exchangeRate) status.textContent = '최신 기준 환율을 불러오는 중이에요…';
 try {
  const data = await fetchWidgetData('https://api.frankfurter.dev/v2/rate/JPY/KRW');
  if (!validExchangeRate(data)) throw new Error('Invalid exchange rate');
  exchangeRate = {base:data.base,quote:data.quote,rate:data.rate,date:data.date};
  try { localStorage.setItem('matsuyama-jpy-krw-v1', JSON.stringify(exchangeRate)); } catch {}
  paintExchangeRate();
 } catch {
  if (exchangeRate) paintExchangeRate(true);
  else status.textContent = '환율을 불러오지 못했어요. 다시 눌러 주세요.';
  retry.hidden = false;
 }
}

document.getElementById('yen-amount').addEventListener('input', updateConversion);
document.getElementById('exchange-retry').addEventListener('click', loadExchangeRate);
document.getElementById('weather-retry').addEventListener('click', () => showDayWeather({id:activeWeatherDay}, true));
document.getElementById('weather-day').addEventListener('change', event => renderDay(Number(event.target.value)));
try {
 const savedRate = JSON.parse(localStorage.getItem('matsuyama-jpy-krw-v1'));
 if (validExchangeRate(savedRate)) { exchangeRate = savedRate; paintExchangeRate(true); }
} catch {}
loadExchangeRate();
