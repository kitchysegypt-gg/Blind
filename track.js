'use strict';

/* The page family members open from a live-location link.
   No account needed: the link's secret token shows this one person's position,
   and only while they are sharing it. */

const SUPABASE_URL = 'https://sjlgitmupecmqhfmuyds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_sgYgEuoQbf1UhuED29P3zg_TQRm_mZF';

const ICONS = {
  homeheart: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M12 17.5s-3-1.8-3-3.8a1.6 1.6 0 0 1 3-.9 1.6 1.6 0 0 1 3 .9c0 2-3 3.8-3 3.8z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  car: '<path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3 16.5h18M4 12h16"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
};

const STRINGS = {
  en: {
    title: 'Easy Help', loading: 'Finding where they are…',
    notFound: 'This link no longer works. They may have stopped sharing their location.',
    offline: 'No internet connection. Trying again…',
    who: '{name} is here, live', someone: 'Your family member',
    updated: 'Updated {when}', justNow: 'just now', secondsAgo: '{n} seconds ago', minutesAgo: '{n} minutes ago',
    stale: 'No new position for a while. Their phone may be off or Easy Help closed.',
    accuracy: 'Accurate to about {m} metres.',
    openMaps: 'Open in Google Maps', directions: 'Directions to them', langSwitchTo: 'العربية',
  },
  ar: {
    title: 'إيزي هيلب', loading: 'جارٍ تحديد المكان…',
    notFound: 'هذا الرابط لم يعد يعمل. ربما أوقف مشاركة موقعه.',
    offline: 'لا يوجد اتصال بالإنترنت. نحاول مرة أخرى…',
    who: '{name} هنا الآن', someone: 'فرد عائلتك',
    updated: 'آخر تحديث {when}', justNow: 'الآن', secondsAgo: 'منذ {n} ثانية', minutesAgo: 'منذ {n} دقيقة',
    stale: 'لا يوجد موقع جديد منذ فترة. ربما الهاتف مغلق أو التطبيق مغلق.',
    accuracy: 'الدقة حوالي {m} متر.',
    openMaps: 'افتح في خرائط جوجل', directions: 'الطريق إليه', langSwitchTo: 'English',
  },
};

let lang = /^ar\b/i.test(navigator.language || '') ? 'ar' : 'en';
let place = null;
const token = new URLSearchParams(location.search).get('t') || '';

function T(key, vars = {}) {
  const s = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
}
function num(n) { return n.toLocaleString(lang === 'ar' ? 'ar-EG' : undefined); }
function ago(ms) {
  const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (s < 10) return T('justNow');
  if (s < 90) return T('secondsAgo', { n: num(s) });
  return T('minutesAgo', { n: num(Math.round(s / 60)) });
}

async function rpc(fn, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`http_${res.status}`);
  return res.json();
}

// A small street map made of OpenStreetMap tiles, centred on the person.
function drawMap(pos) {
  const box = document.getElementById('mapTiles');
  box.innerHTML = '';
  const z = 16;
  const W = box.clientWidth || 360, H = box.clientHeight || 240;
  const n = 2 ** z;
  const px = (pos.lng + 180) / 360 * n * 256;
  const latR = pos.lat * Math.PI / 180;
  const py = (1 - Math.log(Math.tan(latR) + 1 / Math.cos(latR)) / Math.PI) / 2 * n * 256;
  const left = px - W / 2, top = py - H / 2;
  for (let tx = Math.floor(left / 256); tx <= Math.floor((left + W) / 256); tx++) {
    for (let ty = Math.floor(top / 256); ty <= Math.floor((top + H) / 256); ty++) {
      const img = document.createElement('img');
      img.alt = '';
      img.src = `https://tile.openstreetmap.org/${z}/${((tx % n) + n) % n}/${ty}.png`;
      img.style.left = `${Math.round(tx * 256 - left)}px`;
      img.style.top = `${Math.round(ty * 256 - top)}px`;
      img.onerror = () => img.remove();
      box.appendChild(img);
    }
  }
}

function show() {
  if (!place) return;
  const at = Date.parse(place.updated_at);
  document.getElementById('who').textContent = T('who', { name: place.name || T('someone') });
  document.getElementById('updated').textContent = Date.now() - at > 5 * 60000 ? T('stale') : T('updated', { when: ago(at) });
  document.getElementById('accuracy').textContent = place.acc >= 1 ? T('accuracy', { m: num(Math.round(place.acc)) }) : '';
  const q = `${place.lat.toFixed(5)},${place.lng.toFixed(5)}`;
  document.getElementById('mapsLink').href = `https://maps.google.com/?q=${q}`;
  document.getElementById('directions').href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

let lastKey = '';
async function load() {
  const status = document.getElementById('loading');
  if (!/^[0-9a-f-]{36}$/i.test(token)) { status.textContent = T('notFound'); return; }
  try {
    const rows = await rpc('hh_live_for_token', { p_token: token });
    if (!rows || !rows.length) {
      place = null;
      document.getElementById('liveBox').hidden = true;
      status.textContent = T('notFound');
      return;
    }
    place = rows[0];
    status.textContent = '';
    document.getElementById('liveBox').hidden = false;
    const key = `${place.lat},${place.lng}`;
    if (key !== lastKey) { lastKey = key; drawMap(place); }
    show();
  } catch {
    status.textContent = T('offline');
  }
}

function paint() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = T('title');
  document.getElementById('title').textContent = T('title');
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = T(el.dataset.t); });
  document.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[el.dataset.icon] || ''}</svg>`;
  });
  const btn = document.getElementById('langBtn');
  btn.textContent = lang === 'ar' ? 'EN' : 'ع';
  btn.setAttribute('aria-label', T('langSwitchTo'));
  btn.setAttribute('lang', lang === 'ar' ? 'en' : 'ar');
  if (!place) document.getElementById('loading').textContent = T('loading');
  show();
}
document.getElementById('langBtn').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; paint(); });

paint();
load();
setInterval(load, 10000);
setInterval(show, 5000);
