'use strict';

/* The page a helper opens from the link in a request message.
   No account needed: the link's secret token is the key to this one request. */

const SUPABASE_URL = 'https://sjlgitmupecmqhfmuyds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_sgYgEuoQbf1UhuED29P3zg_TQRm_mZF';

const ICONS = {
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  car: '<path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3 16.5h18M4 12h16"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

const STRINGS = {
  en: {
    title: 'Easy Help', loading: 'Loading the request…',
    notFound: "This link doesn't work. It may be old or copied wrongly.",
    offline: 'No internet connection. Please try again.',
    needs: '{name} needs', someone: 'Someone',
    groceries: 'Groceries', medicine: 'Medicine', ride: 'A ride', helper: 'Help', location: 'Location',
    where: 'Where', openMap: 'Open the map', yourAnswer: 'Your answer',
    coming: "I'm on my way", later: "I'll come later", done: "It's done", cant: "Sorry, I can't",
    sent: 'Thank you. {name} will hear: "{answer}".',
    sentAt: 'Sent {when}', langSwitchTo: 'العربية',
  },
  ar: {
    title: 'إيزي هيلب', loading: 'جارٍ تحميل الطلب…',
    notFound: 'هذا الرابط لا يعمل. ربما يكون قديمًا أو منسوخًا بشكل خاطئ.',
    offline: 'لا يوجد اتصال بالإنترنت. حاول مرة أخرى.',
    needs: '{name} يحتاج', someone: 'شخص',
    groceries: 'بقالة', medicine: 'دواء', ride: 'توصيلة', helper: 'مساعدة', location: 'الموقع',
    where: 'المكان', openMap: 'افتح الخريطة', yourAnswer: 'ردّك',
    coming: 'أنا في الطريق', later: 'سآتي لاحقًا', done: 'تم', cant: 'آسف، لا أستطيع',
    sent: 'شكرًا. سيسمع {name}: «{answer}».',
    sentAt: 'أُرسل {when}', langSwitchTo: 'English',
  },
};

let lang = /^ar\b/i.test(navigator.language || '') ? 'ar' : 'en';
let request = null;
const token = new URLSearchParams(location.search).get('r') || '';

function T(key, vars = {}) {
  const s = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
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
  if (request) showRequest();
}

function showRequest() {
  const r = request;
  document.getElementById('whoNeeds').textContent = T('needs', { name: r.requester_name || T('someone') });
  document.getElementById('what').textContent = `${T(r.type)}: ${r.text}`;
  document.getElementById('when').textContent = T('sentAt', {
    when: new Date(r.created_at).toLocaleString(lang === 'ar' ? 'ar-EG' : undefined, { weekday: 'long', hour: 'numeric', minute: '2-digit' }),
  });
  const hasPlace = r.address || r.location_url;
  document.getElementById('whereBox').hidden = !hasPlace;
  document.getElementById('address').textContent = r.address || '';
  const map = document.getElementById('mapLink');
  // Only ever link to the map address the app itself writes.
  const safeMap = r.location_url && /^https:\/\/maps\.google\.com\/\?q=-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(r.location_url);
  map.hidden = !safeMap;
  if (safeMap) map.href = r.location_url;
  document.getElementById('requestBox').hidden = false;
}

async function load() {
  const status = document.getElementById('loading');
  status.textContent = T('loading');
  if (!/^[0-9a-f-]{36}$/i.test(token)) { status.textContent = T('notFound'); return; }
  try {
    const rows = await rpc('hh_request_for_helper', { p_token: token });
    if (!rows || !rows.length) { status.textContent = T('notFound'); return; }
    request = rows[0];
    status.textContent = '';
    showRequest();
    rpc('hh_helper_reply', { p_token: token, p_status: 'seen' }).catch(() => {});
  } catch (e) {
    status.textContent = T(e instanceof TypeError ? 'offline' : 'notFound');
  }
}

document.querySelectorAll('[data-status]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const result = document.getElementById('result');
    document.querySelectorAll('[data-status]').forEach(b => { b.disabled = true; });
    try {
      await rpc('hh_helper_reply', { p_token: token, p_status: btn.dataset.status });
      result.textContent = T('sent', { name: request.requester_name || T('someone'), answer: T(btn.dataset.status) });
    } catch {
      result.textContent = T('offline');
    } finally {
      document.querySelectorAll('[data-status]').forEach(b => { b.disabled = false; });
    }
  });
});
document.getElementById('langBtn').addEventListener('click', () => { lang = lang === 'ar' ? 'en' : 'ar'; paint(); });

paint();
load();
