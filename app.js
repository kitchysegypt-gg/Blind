'use strict';

/* =========================================================
   Helping Hand — voice-first helper app for blind & elderly
   ========================================================= */

/* ---------- 3D icons (shaded SVG, gradients live in index.html) ---------- */
const SHADOW = '<ellipse cx="50" cy="94" rx="32" ry="5" fill="url(#g-shadow)"/>';
const ICONS = {
  bag: `${SHADOW}
    <path d="M35 36 C35 16 65 16 65 36" fill="none" stroke="#8a3a00" stroke-width="6" stroke-linecap="round"/>
    <path d="M56 33 L67 10 L74 13 L64 36z" fill="url(#g-yellow)"/>
    <circle cx="40" cy="31" r="10" fill="url(#g-green)"/>
    <path d="M40 21 q3 -6 8 -6" stroke="#14792c" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M18 36 h64 l-6 50 a6 6 0 0 1 -6 5 h-40 a6 6 0 0 1 -6 -5z" fill="url(#g-orange)"/>
    <path d="M18 36 h64 l-1 7 h-62z" fill="#ffd9a3" opacity=".75"/>
    <path d="M27 48 q2 22 5 36" stroke="url(#g-gloss)" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  pill: `${SHADOW}
    <g transform="rotate(-35 46 46)">
      <rect x="10" y="30" width="72" height="32" rx="16" fill="url(#g-white)"/>
      <path d="M46 30 h20 a16 16 0 0 1 0 32 h-20z" fill="url(#g-red)"/>
      <rect x="18" y="34" width="58" height="8" rx="4" fill="url(#g-gloss)"/>
    </g>
    <circle cx="74" cy="76" r="13" fill="url(#g-white)"/>
    <path d="M65 76 h18" stroke="#9aa4b4" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="70" cy="70" rx="6" ry="3" fill="#fff" opacity=".8"/>`,
  car: `${SHADOW}
    <path d="M18 60 l8 -20 a8 8 0 0 1 7 -5 h34 a8 8 0 0 1 7 5 l8 20z" fill="url(#g-blue)"/>
    <path d="M30 58 l5 -15 h30 l5 15z" fill="url(#g-glass)"/>
    <path d="M50 43 v15" stroke="#1a55c4" stroke-width="3"/>
    <path d="M36 46 l4 -1" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>
    <rect x="6" y="55" width="88" height="24" rx="11" fill="url(#g-blue)"/>
    <rect x="12" y="58" width="76" height="6" rx="3" fill="url(#g-gloss)"/>
    <circle cx="15" cy="66" r="4" fill="url(#g-yellow)"/><circle cx="85" cy="66" r="4" fill="url(#g-yellow)"/>
    <circle cx="28" cy="79" r="11" fill="url(#g-dark)"/><circle cx="28" cy="79" r="5" fill="url(#g-gray)"/>
    <circle cx="72" cy="79" r="11" fill="url(#g-dark)"/><circle cx="72" cy="79" r="5" fill="url(#g-gray)"/>`,
  heart: `${SHADOW}
    <path d="M50 88 C20 66 8 50 12 34 C16 18 38 14 50 31 C62 14 84 18 88 34 C92 50 80 66 50 88z" fill="url(#g-pink)"/>
    <ellipse cx="31" cy="33" rx="11" ry="6" transform="rotate(-35 31 33)" fill="#fff" opacity=".7"/>
    <path d="M30 56 q20 14 40 0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>
    <circle cx="38" cy="44" r="4" fill="#fff"/><circle cx="62" cy="44" r="4" fill="#fff"/>`,
  phone: `${SHADOW}
    <rect x="10" y="10" width="80" height="80" rx="24" fill="url(#g-green)"/>
    <rect x="18" y="14" width="64" height="26" rx="13" fill="url(#g-gloss)" opacity=".7"/>
    <path d="M36 26 c2 -1 5 0 6 2 l5 9 c1 2 0 4 -1 6 l-4 4 c3 6 7 10 13 13 l4 -4 c2 -1 4 -2 6 -1 l9 5 c2 1 3 4 2 6 l-3 6 c-1 2 -3 3 -6 3 C46 75 25 54 25 33 c0 -3 1 -5 3 -6z" fill="url(#g-white)"/>`,
  list: `${SHADOW}
    <rect x="18" y="14" width="64" height="78" rx="10" fill="url(#g-orange)"/>
    <rect x="26" y="24" width="48" height="60" rx="5" fill="url(#g-white)"/>
    <rect x="37" y="7" width="26" height="14" rx="5" fill="url(#g-gray)"/>
    <path d="M32 38 l4 4 l7 -8 M32 54 l4 4 l7 -8 M32 70 l4 4 l7 -8" stroke="#178a33" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="48" y="36" width="20" height="4" rx="2" fill="#8793a5"/>
    <rect x="48" y="52" width="20" height="4" rx="2" fill="#8793a5"/>
    <rect x="48" y="68" width="20" height="4" rx="2" fill="#8793a5"/>`,
  siren: `${SHADOW}
    <g stroke="#ffd21f" stroke-width="6" stroke-linecap="round">
      <path d="M50 6 v10"/><path d="M17 19 l7 7"/><path d="M83 19 l-7 7"/><path d="M5 46 h10"/><path d="M95 46 h-10"/>
    </g>
    <path d="M27 74 v-24 a23 23 0 0 1 46 0 v24z" fill="url(#g-red)"/>
    <path d="M36 68 v-18 a14 14 0 0 1 8 -12" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/>
    <rect x="16" y="72" width="68" height="17" rx="6" fill="url(#g-gray)"/>
    <rect x="20" y="74" width="60" height="4" rx="2" fill="#fff" opacity=".5"/>`,
  mic: `${SHADOW}
    <path d="M24 44 a26 26 0 0 0 52 0" stroke="url(#g-white)" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="46" y="68" width="8" height="15" fill="url(#g-white)"/>
    <rect x="30" y="81" width="40" height="9" rx="4.5" fill="url(#g-white)"/>
    <rect x="34" y="6" width="32" height="56" rx="16" fill="url(#g-gray)"/>
    <g stroke="#3a4152" stroke-width="2.5" opacity=".6"><path d="M38 22 h24"/><path d="M36 30 h28"/><path d="M36 38 h28"/></g>
    <rect x="38" y="10" width="8" height="40" rx="4" fill="url(#g-gloss)"/>`,
  gear: `${SHADOW}
    <g fill="url(#g-gray)">${[0, 45, 90, 135, 180, 225, 270, 315].map(a =>
      `<rect x="42" y="6" width="16" height="22" rx="4" transform="rotate(${a} 50 50)"/>`).join('')}</g>
    <circle cx="50" cy="50" r="31" fill="url(#g-gray)"/>
    <circle cx="50" cy="50" r="13" fill="url(#g-dark)"/>
    <path d="M30 40 a22 22 0 0 1 18 -16" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`,
  back: `${SHADOW}
    <circle cx="50" cy="48" r="40" fill="url(#g-blue)"/>
    <path d="M24 30 a30 22 0 0 1 52 0" fill="url(#g-gloss)" opacity=".7"/>
    <path d="M58 26 L36 48 L58 70" stroke="url(#g-white)" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  send: `${SHADOW}
    <path d="M8 48 L90 12 L68 86 L50 62z" fill="url(#g-white)"/>
    <path d="M50 62 L90 12 L42 56z" fill="url(#g-gray)"/>
    <path d="M50 62 L54 82 L60 70z" fill="#8793a5"/>`,
  pin: `${SHADOW}
    <path d="M50 92 C50 92 18 60 18 38 a32 32 0 0 1 64 0 C82 60 50 92 50 92z" fill="url(#g-red)"/>
    <circle cx="50" cy="38" r="12" fill="url(#g-white)"/>
    <ellipse cx="34" cy="26" rx="7" ry="4" transform="rotate(-35 34 26)" fill="#fff" opacity=".7"/>`,
  person: `${SHADOW}
    <path d="M18 90 a32 30 0 0 1 64 0z" fill="url(#g-blue)"/>
    <circle cx="50" cy="34" r="20" fill="url(#g-orange)"/>
    <ellipse cx="42" cy="26" rx="7" ry="4" transform="rotate(-30 42 26)" fill="#fff" opacity=".7"/>`,
};

function iconSVG(name) {
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;
}
function paintIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = iconSVG(el.dataset.icon); });
}

/* ---------- Storage ---------- */
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode: keep in memory */ }
  },
};

const DEFAULTS = {
  name: '', address: '',
  helperName: '', helperPhone: '', sendVia: 'whatsapp',
  fam1Name: '', fam1Phone: '', fam2Name: '', fam2Phone: '', fam3Name: '', fam3Phone: '',
  emergency: '', countdown: '5',
  voice: true, confirmTap: true, rate: '0.9', size: '1', theme: 'dark',
};
let settings = { ...DEFAULTS, ...store.get('hh.settings', {}) };
let requests = store.get('hh.history', []);

function applyLook() {
  document.documentElement.dataset.theme = settings.theme;
  document.documentElement.style.setProperty('--scale', settings.size);
}

/* ---------- Speech out ---------- */
const synth = window.speechSynthesis;
function speak(text, { force = false } = {}) {
  if (!synth || (!settings.voice && !force) || !text) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = parseFloat(settings.rate) || 0.9;
  u.lang = navigator.language || 'en-US';
  synth.speak(u);
}

let toastTimer;
function toast(text, { say = true } = {}) {
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4500);
  if (say) speak(text);
}

/* ---------- Speech in ---------- */
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let activeRec = null;

function listen() {
  return new Promise(resolve => {
    if (!Recognition) {
      toast("Voice typing isn't available here. Use the microphone on your keyboard instead.");
      resolve('');
      return;
    }
    const overlay = document.getElementById('listening');
    const heard = document.getElementById('heard');
    heard.textContent = '';
    overlay.hidden = false;
    synth && synth.cancel();

    const rec = new Recognition();
    activeRec = rec;
    rec.lang = navigator.language || 'en-US';
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    let finalText = '';

    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript; else interim += r[0].transcript;
      }
      heard.textContent = (finalText + ' ' + interim).trim();
    };
    rec.onerror = e => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        toast('Please allow the microphone so I can hear you.');
      }
    };
    rec.onend = () => {
      overlay.hidden = true;
      activeRec = null;
      resolve((finalText || heard.textContent || '').trim());
    };
    try { rec.start(); } catch { overlay.hidden = true; resolve(''); }
  });
}
document.getElementById('stopListening').addEventListener('click', () => activeRec && activeRec.stop());

/* ---------- "Tap once to hear, tap again to choose" ---------- */
let armedEl = null, armedAt = 0;
function labelOf(el) {
  return el.dataset.say || el.getAttribute('aria-label') || el.textContent.trim();
}
document.addEventListener('click', e => {
  const el = e.target.closest('button');
  if (!el) return;
  // Keyboard / screen-reader activation (detail === 0) and instant buttons go straight through.
  if (!settings.confirmTap || el.hasAttribute('data-instant') || e.detail === 0) {
    if (navigator.vibrate) navigator.vibrate(15);
    return;
  }
  if (armedEl === el && Date.now() - armedAt < 6000) {
    disarm();
    return; // second tap: let the click through
  }
  e.preventDefault();
  e.stopImmediatePropagation();
  disarm();
  armedEl = el; armedAt = Date.now();
  el.classList.add('armed');
  if (navigator.vibrate) navigator.vibrate(30);
  speak(`${labelOf(el)}. Tap again to choose.`, { force: true });
}, true);
function disarm() {
  if (armedEl) armedEl.classList.remove('armed');
  armedEl = null;
}

/* ---------- Routing ---------- */
const REQUESTS = {
  groceries: {
    title: 'Groceries', icon: 'bag', color: 'orange',
    prompt: 'What food or shopping do you need?',
    chips: ['Bread', 'Milk', 'Eggs', 'Water', 'Rice', 'Fruit', 'Vegetables', 'Tea', 'Sugar', 'Cleaning things'],
    intro: 'Please bring me some groceries:',
  },
  medicine: {
    title: 'Medicine', icon: 'pill', color: 'red',
    prompt: 'Which medicine do you need?',
    chips: ['My usual medicine', 'Pain relief', 'Vitamins', 'Blood pressure tablets', 'Diabetes supplies', 'Eye drops'],
    intro: 'Please get me this from the pharmacy:',
  },
  ride: {
    title: 'Ride', icon: 'car', color: 'blue',
    prompt: 'Where do you want to go?',
    chips: ['Doctor', 'Hospital', 'Pharmacy', 'Market', 'Place of worship', 'Family visit', 'Bank'],
    intro: 'I need a ride to:',
  },
  helper: {
    title: 'Helper', icon: 'heart', color: 'pink',
    prompt: 'What do you need help with?',
    chips: ['Read my mail', 'Cleaning', 'Cooking', 'Go for a walk', 'Fix something', 'Company and a chat', 'Pay a bill'],
    intro: 'Could you please help me with:',
  },
};

const backBtn = document.getElementById('backBtn');
const titleEl = document.getElementById('screenTitle');
let currentRequest = null;
let emergencyTimer = null;

function go(route) {
  const hash = '#' + route;
  navigatedInApp = true;
  if (location.hash === hash) render(); else location.hash = hash;
}
let navigatedInApp = false;
backBtn.addEventListener('click', () => {
  if (navigatedInApp) window.history.back(); else location.replace('#home');
});
window.addEventListener('hashchange', render);

document.addEventListener('click', e => {
  const t = e.target.closest('[data-go]');
  if (t) go(t.dataset.go);
});

function render() {
  const route = (location.hash || '#home').slice(1);
  const [screen, arg] = route.split(':');
  stopEmergency();
  disarm();

  document.querySelectorAll('.screen').forEach(s => { s.hidden = s.id !== `screen-${screen}`; });
  const section = document.getElementById(`screen-${screen}`);
  if (!section) { go('home'); return; }

  backBtn.hidden = screen === 'home';
  let title = section.dataset.title;

  if (screen === 'home') renderHome();
  if (screen === 'request') title = renderRequest(arg);
  if (screen === 'family') renderFamily();
  if (screen === 'history') renderHistory();
  if (screen === 'settings') renderSettings();
  if (screen === 'emergency') startEmergency();

  titleEl.textContent = title;
  document.title = screen === 'home' ? 'Helping Hand' : `${title} · Helping Hand`;
  window.scrollTo(0, 0);
  titleEl.focus({ preventScroll: true });

  if (screen === 'request') {
    speak(pendingText
      ? `${title}. I wrote: ${pendingText}. Tap send request to send it.`
      : `${title}. ${REQUESTS[currentRequest].prompt} Tap speak my request, or choose from the list.`);
    pendingText = '';
  }
  else if (screen === 'family') speak('Call family. Choose who to call.');
  else if (screen === 'history') speak(`My requests. You have ${requests.length} ${requests.length === 1 ? 'request' : 'requests'}.`);
  else if (screen === 'settings') speak('Settings.');
}

/* ---------- Home ---------- */
let greeted = false;
function greetingText() {
  const now = new Date();
  const h = now.getHours();
  const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const name = settings.name ? `, ${settings.name}` : '';
  const day = now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${part}${name}. It's ${day}, ${time}.`;
}
function renderHome() {
  document.getElementById('greeting').textContent = greetingText();
  const existing = document.getElementById('setupCard');
  if (existing) existing.remove();
  if (!settings.helperPhone) {
    const btn = document.createElement('button');
    btn.id = 'setupCard';
    btn.className = 'bigbtn bigbtn-blue';
    btn.dataset.go = 'settings';
    btn.dataset.say = 'Set up my helper and family first';
    btn.innerHTML = '<span class="ico" data-icon="gear"></span><span>Set up my helper first</span>';
    paintIcons(btn);
    document.getElementById('greeting').after(btn);
  }
  if (!greeted) {
    greeted = true;
    // Browsers only allow speech after the first touch, so greet on it.
    const hello = () => speak(`${greetingText()} Tap the top button and say what you need, or choose a picture button.`);
    document.addEventListener('pointerdown', hello, { once: true });
  }
}

document.getElementById('heroMic').addEventListener('click', async () => {
  const said = await listen();
  if (!said) { speak("I didn't hear anything. Please try again."); return; }
  handleCommand(said);
});

function handleCommand(text) {
  const t = text.toLowerCase();
  const has = re => re.test(t);

  if (has(/emergenc|sos|ambulance|police|fire\b|i fell|fallen|i('m| am) hurt|help me now/)) return go('emergency');

  if (has(/\b(call|phone|ring)\b/)) {
    const fam = familyContacts().find(c => t.includes(c.name.toLowerCase()));
    if (fam) { speak(`Calling ${fam.name}`); setTimeout(() => { location.href = `tel:${cleanPhone(fam.phone)}`; }, 1200); return; }
    return go('family');
  }
  if (has(/medic|pharm|pill|tablet|drug|prescription|drops/)) return openRequestWith('medicine', text);
  if (has(/\bride\b|taxi|\bcar\b|drive|take me|go to|lift|uber|careem/)) return openRequestWith('ride', text);
  if (has(/grocer|food|shop|bread|milk|egg|water|deliver|buy|rice|fruit|vegetable|tea|sugar/)) return openRequestWith('groceries', text);
  if (has(/help|assist|someone|read|clean|cook|walk|fix|bill|lonely|chat/)) return openRequestWith('helper', text);
  if (has(/request|history|list/)) return go('history');
  if (has(/setting/)) return go('settings');
  if (has(/family/)) return go('family');

  speak(`I heard: ${text}. I'm not sure what you need. You can say groceries, medicine, ride, helper, call family, or emergency.`);
}

let pendingText = '';
function openRequestWith(type, text) {
  pendingText = text;
  go(`request:${type}`);
}

/* ---------- Request ---------- */
function renderRequest(type) {
  const cfg = REQUESTS[type] || REQUESTS.helper;
  currentRequest = type in REQUESTS ? type : 'helper';
  const icon = document.getElementById('reqIcon');
  icon.innerHTML = iconSVG(cfg.icon);
  document.getElementById('reqPrompt').textContent = cfg.prompt;
  document.getElementById('reqText').value = pendingText;
  document.getElementById('sendHint').textContent = settings.helperPhone
    ? `This will be sent to ${settings.helperName || 'your helper'} by ${settings.sendVia === 'sms' ? 'text message' : 'WhatsApp'}.`
    : 'First add your helper\'s phone number in Settings.';

  const chips = document.getElementById('quickChips');
  chips.innerHTML = '';
  cfg.chips.forEach(label => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = label;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      speak(`${label}, ${on ? 'added' : 'removed'}.`);
    });
    chips.appendChild(b);
  });
  return cfg.title;
}

document.getElementById('dictateBtn').addEventListener('click', async () => {
  const said = await listen();
  if (!said) { speak("I didn't hear anything. Please try again."); return; }
  const box = document.getElementById('reqText');
  box.value = (box.value ? box.value + ', ' : '') + said;
  speak(`I wrote: ${said}. Tap send request when you're ready.`);
});

document.getElementById('sendReqBtn').addEventListener('click', async () => {
  const cfg = REQUESTS[currentRequest];
  const picked = [...document.querySelectorAll('#quickChips .chip[aria-pressed="true"]')].map(b => b.textContent);
  const typed = document.getElementById('reqText').value.trim();
  const details = [...picked, typed].filter(Boolean).join(', ');

  if (!details) { toast(`Please say or choose what you need first.`); return; }
  if (!settings.helperPhone) { toast('Please add your helper\'s phone number first.'); go('settings'); return; }

  const withLoc = document.getElementById('shareLoc').checked;
  speak('Sending your request.');
  const loc = withLoc ? await getLocationLink() : '';

  const lines = [
    `Hello${settings.helperName ? ' ' + settings.helperName : ''}, this is ${settings.name || 'me'}.`,
    `${cfg.intro} ${details}.`,
  ];
  if (settings.address) lines.push(`My address: ${settings.address}`);
  if (loc) lines.push(`My location: ${loc}`);
  lines.push('(Sent with Helping Hand)');

  addHistory({ type: currentRequest, text: details });
  sendMessage(settings.helperPhone, lines.join('\n'));
});

/* ---------- Messaging helpers ---------- */
function cleanPhone(p) { return String(p || '').replace(/[^\d+]/g, ''); }

function sendMessage(phone, body) {
  const num = cleanPhone(phone);
  const url = settings.sendVia === 'sms'
    ? `sms:${num}?&body=${encodeURIComponent(body)}`
    : `https://wa.me/${num.replace(/^\+/, '')}?text=${encodeURIComponent(body)}`;
  toast('Opening your messages. Press send to finish.');
  setTimeout(() => { location.href = url; }, 1800);
}

function getLocationLink() {
  return new Promise(resolve => {
    if (!navigator.geolocation) return resolve('');
    navigator.geolocation.getCurrentPosition(
      p => resolve(`https://maps.google.com/?q=${p.coords.latitude.toFixed(5)},${p.coords.longitude.toFixed(5)}`),
      () => resolve(''),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  });
}

/* ---------- History ---------- */
function addHistory(item) {
  requests.unshift({ ...item, at: Date.now() });
  requests = requests.slice(0, 50);
  store.set('hh.history', requests);
}
function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  if (!requests.length) {
    list.innerHTML = '<p class="empty">No requests yet.</p>';
    return;
  }
  requests.forEach(h => {
    const cfg = REQUESTS[h.type] || REQUESTS.helper;
    const when = new Date(h.at).toLocaleString(undefined, { weekday: 'long', hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short' });
    const btn = document.createElement('button');
    btn.className = 'bigbtn bigbtn-gray';
    btn.style.justifyContent = 'flex-start';
    btn.style.textAlign = 'left';
    btn.dataset.instant = '';
    btn.innerHTML = `<span class="ico">${iconSVG(cfg.icon)}</span><span><strong></strong><br><small></small></span>`;
    btn.querySelector('strong').textContent = `${cfg.title}: ${h.text}`;
    btn.querySelector('small').textContent = when;
    btn.addEventListener('click', () => speak(`${cfg.title}. ${h.text}. Sent ${when}.`, { force: true }));
    list.appendChild(btn);
  });
}
document.getElementById('clearHistory').addEventListener('click', () => {
  requests = [];
  store.set('hh.history', requests);
  renderHistory();
  toast('Your list is now empty.');
});

/* ---------- Family ---------- */
function familyContacts() {
  const out = [];
  for (const i of [1, 2, 3]) {
    const name = settings[`fam${i}Name`].trim(), phone = settings[`fam${i}Phone`].trim();
    if (phone) out.push({ name: name || `Family ${i}`, phone });
  }
  if (settings.helperPhone) out.push({ name: settings.helperName || 'My helper', phone: settings.helperPhone });
  return out;
}
function renderFamily() {
  const list = document.getElementById('familyList');
  list.innerHTML = '';
  const people = familyContacts();
  if (!people.length) {
    list.innerHTML = '<p class="empty">No family numbers saved yet.</p>';
    const b = document.createElement('button');
    b.className = 'bigbtn bigbtn-blue';
    b.dataset.go = 'settings';
    b.dataset.say = 'Add family phone numbers';
    b.innerHTML = `<span class="ico">${iconSVG('gear')}</span><span>Add family numbers</span>`;
    list.appendChild(b);
    return;
  }
  people.forEach(p => {
    const b = document.createElement('button');
    b.className = 'bigbtn bigbtn-green';
    b.dataset.say = `Call ${p.name}`;
    b.innerHTML = `<span class="ico">${iconSVG('person')}</span><span></span>`;
    b.lastChild.textContent = `Call ${p.name}`;
    b.addEventListener('click', () => {
      speak(`Calling ${p.name}`);
      setTimeout(() => { location.href = `tel:${cleanPhone(p.phone)}`; }, 1000);
    });
    list.appendChild(b);
  });
}

/* ---------- Emergency ---------- */
function startEmergency() {
  const text = document.getElementById('countdownText');
  const num = cleanPhone(settings.emergency);
  if (!num) {
    text.textContent = 'No emergency number saved. Add one in Settings.';
    speak('Emergency. No emergency number is saved. You can send your location to your helper, or add a number in settings.');
    return;
  }
  let left = parseInt(settings.countdown, 10) || 0;
  if (!left) {
    text.textContent = `Tap "Call now" to call ${num}.`;
    speak(`Emergency. Tap call now to call ${num.split('').join(' ')}.`);
    return;
  }
  const tick = () => {
    if (left <= 0) {
      stopEmergency();
      text.textContent = `Calling ${num}…`;
      location.href = `tel:${num}`;
      return;
    }
    text.textContent = `Calling ${num} in ${left}…`;
    speak(left === parseInt(settings.countdown, 10)
      ? `Emergency. Calling for help in ${left} seconds. Tap cancel at the bottom to stop.`
      : String(left), { force: true });
    left -= 1;
  };
  tick();
  emergencyTimer = setInterval(tick, 1000);
}
function stopEmergency() {
  if (emergencyTimer) { clearInterval(emergencyTimer); emergencyTimer = null; }
}
document.getElementById('callEmergencyNow').addEventListener('click', () => {
  stopEmergency();
  const num = cleanPhone(settings.emergency);
  if (!num) { toast('Please add an emergency number in Settings.'); return; }
  location.href = `tel:${num}`;
});
document.getElementById('cancelEmergency').addEventListener('click', () => {
  stopEmergency();
  speak('Cancelled. No call was made.', { force: true });
  go('home');
});
document.getElementById('alertHelperBtn').addEventListener('click', async () => {
  stopEmergency();
  if (!settings.helperPhone) { toast('Please add your helper\'s phone number in Settings.'); return; }
  speak('Finding your location.', { force: true });
  const loc = await getLocationLink();
  const lines = [`EMERGENCY: ${settings.name || 'I'} need${settings.name ? 's' : ''} help now!`];
  if (settings.address) lines.push(`Address: ${settings.address}`);
  if (loc) lines.push(`Location: ${loc}`);
  addHistory({ type: 'helper', text: 'Emergency alert' });
  sendMessage(settings.helperPhone, lines.join('\n'));
});

/* ---------- Settings ---------- */
const form = document.getElementById('settingsForm');
function renderSettings() {
  for (const [k, v] of Object.entries(settings)) {
    const el = form.elements[k];
    if (!el) continue;
    if (el.type === 'checkbox') el.checked = !!v; else el.value = v;
  }
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const next = { ...settings };
  for (const k of Object.keys(DEFAULTS)) {
    const el = form.elements[k];
    if (!el) continue;
    next[k] = el.type === 'checkbox' ? el.checked : el.value.trim();
  }
  settings = next;
  store.set('hh.settings', settings);
  applyLook();
  toast('Saved.', { say: false });
  speak('Settings saved.', { force: true });
  go('home');
});

/* ---------- Start ---------- */
paintIcons();
applyLook();
render();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
