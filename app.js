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

/* ---------- Preview mode (the hosted artifact can't call, text or use the mic) ---------- */
const PREVIEW = !!window.HH_PREVIEW;

/* ---------- Words in each language ---------- */
const STRINGS = {
  en: {
    appName: 'Helping Hand',
    skip: 'Skip to main content',
    previewBanner: 'Preview. Calls and messages are shown here instead of being sent, and you type instead of speaking. Install the full app on a phone to use them.',
    back: 'Back', settings: 'Settings',
    heroSay: 'Speak. Tell me what you need.', heroText: 'Tap and say what you need',
    groceries: 'Groceries', groceriesSay: 'Groceries delivery',
    medicine: 'Medicine', medicineSay: 'Medicine and pharmacy',
    ride: 'Ride', rideSay: 'Get a ride',
    helper: 'Helper', helperSay: 'Ask someone to help me',
    family: 'Call family', history: 'My requests',
    emergency: 'EMERGENCY', emergencyTitle: 'Emergency', emergencySay: 'Emergency. Get help now.',
    speakRequest: 'Speak my request', typeHere: 'Or type it here', quick: 'Quick choices',
    shareLoc: 'Include my location', send: 'Send request',
    clearList: 'Clear list', clearSay: 'Clear all requests',
    callNow: 'Call now', alertHelper: 'Send my location to helper',
    cancel: 'Cancel', cancelSay: 'Cancel. Do not call.',
    listening: 'Listening…', listenType: 'Or type here', done: 'Done',
    copy: 'Copy', close: 'Close', copied: 'Copied.',
    language: 'Language', aboutMe: 'About me', myName: 'My name', myAddress: 'My home address',
    myHelper: 'My helper',
    helperHint: 'Requests are sent to this person (a relative, neighbour, carer or local shop).',
    helperName: "Helper's name", helperPhone: "Helper's phone number",
    sendVia: 'Send messages by', whatsapp: 'WhatsApp', sms: 'Text message (SMS)',
    familyToCall: 'Family to call', name: 'Name', phone: 'Phone',
    fam1Name: 'Family person 1 name', fam1Phone: 'Family person 1 phone',
    fam2Name: 'Family person 2 name', fam2Phone: 'Family person 2 phone',
    fam3Name: 'Family person 3 name', fam3Phone: 'Family person 3 phone',
    emergencyNumber: 'Emergency number', emergencyPh: 'e.g. 123, 112, 911',
    countdownLabel: 'Seconds before calling automatically',
    noAuto: "Don't call automatically", sec5: '5 seconds', sec10: '10 seconds',
    seeing: 'Seeing and hearing', readAloud: 'Read everything aloud',
    confirmTap: 'Tap once to hear, tap again to choose',
    srHint: 'Turn off "tap once to hear" if you use VoiceOver or TalkBack.',
    rate: 'Voice speed', slow: 'Slow', normal: 'Normal', fast: 'Fast',
    size: 'Text size', large: 'Large', xl: 'Extra large', huge: 'Huge',
    colours: 'Colours', themeDark: 'Dark (white on black)',
    themeYellow: 'High contrast (yellow on black)', themeLight: 'Light (black on white)',
    save: 'Save', saveSay: 'Save settings',

    tapAgain: '{label}. Tap again to choose.',
    noVoiceTyping: "Voice typing isn't available here. Type what you need, then tap Done.",
    allowMic: 'The microphone is off. Type what you need, then tap Done.',
    didntHear: "I didn't hear anything. Please try again.",
    setupFirst: 'Set up my helper first', setupFirstSay: 'Set up my helper and family first',
    welcomeTail: 'Tap the top button and say what you need, or choose a picture button.',
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
    greetName: ', {name}', greet: "{part}{name}. It's {day}, {time}.",
    notSure: "I heard: {text}. I'm not sure what you need. You can say groceries, medicine, ride, helper, call family, or emergency.",
    calling: 'Calling {name}',
    wrote: '{title}. I wrote: {text}. Tap send request to send it.',
    wroteReady: "I wrote: {text}. Tap send request when you're ready.",
    reqIntro: '{title}. {prompt} Tap speak my request, or choose from the list.',
    familyIntro: 'Call family. Choose who to call.',
    historyIntro: 'My requests. You have {n}.',
    settingsIntro: 'Settings.',
    added: '{label}, added.', removed: '{label}, removed.',
    sendHintTo: 'This will be sent to {name} by {via}.', yourHelper: 'your helper',
    viaSms: 'text message', viaWa: 'WhatsApp',
    needHelperPhone: "First add your helper's phone number in Settings.",
    needDetails: 'Please say or choose what you need first.',
    sending: 'Sending your request.',
    msgHello: 'Hello{name}, this is {me}.', msgHelloAnon: 'Hello{name}.', msgName: ' {name}',
    msgAddress: 'My address: {a}', msgLocation: 'My location: {l}',
    msgFooter: '(Sent with Helping Hand)',
    opening: 'Opening your messages. Press send to finish.',
    noRequests: 'No requests yet.',
    sentAt: '{title}. {text}. Sent {when}.',
    listEmpty: 'Your list is now empty.',
    noFamily: 'No family numbers saved yet.', addFamily: 'Add family numbers',
    callX: 'Call {name}', familyN: 'Family {n}', myHelperName: 'My helper',
    noEmergencyText: 'No emergency number saved. Add one in Settings.',
    noEmergencySay: 'Emergency. No emergency number is saved. You can send your location to your helper, or add a number in settings.',
    tapCallNowText: 'Tap "Call now" to call {num}.',
    tapCallNowSay: 'Emergency. Tap call now to call {num}.',
    callingInText: 'Calling {num} in {n}…',
    callingInSay: 'Emergency. Calling for help in {n} seconds. Tap cancel at the bottom to stop.',
    callingNum: 'Calling {num}…',
    addEmergencyNum: 'Please add an emergency number in Settings.',
    cancelled: 'Cancelled. No call was made.',
    findingLoc: 'Finding your location.',
    emergencyMsg: 'EMERGENCY: {name} needs help now!', emergencyMsgAnon: 'EMERGENCY: I need help now!',
    emergencyAlert: 'Emergency alert',
    saved: 'Saved.', settingsSaved: 'Settings saved.',
    previewMsgTitle: 'Message to send', previewCallTitle: 'Phone call',
    previewMsgSay: 'In the full app this message opens in {via}, ready to send to {name}.',
    previewCallSay: 'In the full app this calls {num}.',
    to: 'To: {name} {num}',
    example: '(example)',
    langSwitchTo: 'العربية',
  },
  ar: {
    appName: 'يد العون',
    skip: 'انتقل إلى المحتوى',
    previewBanner: 'معاينة. تظهر المكالمات والرسائل هنا بدلًا من إرسالها، وتكتب بدلًا من الكلام. ثبّت التطبيق الكامل على الهاتف لاستخدامها.',
    back: 'رجوع', settings: 'الإعدادات',
    heroSay: 'تكلّم. قل لي ماذا تحتاج.', heroText: 'اضغط وقل ما تحتاجه',
    groceries: 'البقالة', groceriesSay: 'توصيل البقالة',
    medicine: 'الدواء', medicineSay: 'الدواء والصيدلية',
    ride: 'توصيلة', rideSay: 'اطلب توصيلة',
    helper: 'مساعدة', helperSay: 'اطلب من أحد أن يساعدني',
    family: 'اتصل بالعائلة', history: 'طلباتي',
    emergency: 'طوارئ', emergencyTitle: 'الطوارئ', emergencySay: 'طوارئ. اطلب النجدة الآن.',
    speakRequest: 'قل طلبك بصوتك', typeHere: 'أو اكتبه هنا', quick: 'اختيارات سريعة',
    shareLoc: 'أرسل موقعي', send: 'أرسل الطلب',
    clearList: 'امسح القائمة', clearSay: 'امسح كل الطلبات',
    callNow: 'اتصل الآن', alertHelper: 'أرسل موقعي إلى المساعد',
    cancel: 'إلغاء', cancelSay: 'إلغاء. لا تتصل.',
    listening: 'أستمع إليك…', listenType: 'أو اكتب هنا', done: 'تم',
    copy: 'نسخ', close: 'إغلاق', copied: 'تم النسخ.',
    language: 'اللغة', aboutMe: 'بياناتي', myName: 'اسمي', myAddress: 'عنوان بيتي',
    myHelper: 'مساعدي',
    helperHint: 'تُرسل الطلبات إلى هذا الشخص (قريب أو جار أو مرافق أو محل قريب).',
    helperName: 'اسم المساعد', helperPhone: 'رقم هاتف المساعد',
    sendVia: 'أرسل الرسائل عن طريق', whatsapp: 'واتساب', sms: 'رسالة نصية (SMS)',
    familyToCall: 'أفراد العائلة', name: 'الاسم', phone: 'الهاتف',
    fam1Name: 'اسم فرد العائلة ١', fam1Phone: 'هاتف فرد العائلة ١',
    fam2Name: 'اسم فرد العائلة ٢', fam2Phone: 'هاتف فرد العائلة ٢',
    fam3Name: 'اسم فرد العائلة ٣', fam3Phone: 'هاتف فرد العائلة ٣',
    emergencyNumber: 'رقم الطوارئ', emergencyPh: 'مثل 123 أو 122',
    countdownLabel: 'ثوانٍ قبل الاتصال تلقائيًا',
    noAuto: 'لا تتصل تلقائيًا', sec5: '٥ ثوانٍ', sec10: '١٠ ثوانٍ',
    seeing: 'الرؤية والسمع', readAloud: 'اقرأ كل شيء بصوت عالٍ',
    confirmTap: 'اضغط مرة لتسمع، ومرة ثانية لتختار',
    srHint: 'أوقف خيار "اضغط مرة لتسمع" إذا كنت تستخدم VoiceOver أو TalkBack.',
    rate: 'سرعة الصوت', slow: 'بطيء', normal: 'عادي', fast: 'سريع',
    size: 'حجم الخط', large: 'كبير', xl: 'كبير جدًا', huge: 'ضخم',
    colours: 'الألوان', themeDark: 'داكن (أبيض على أسود)',
    themeYellow: 'تباين عالٍ (أصفر على أسود)', themeLight: 'فاتح (أسود على أبيض)',
    save: 'حفظ', saveSay: 'احفظ الإعدادات',

    tapAgain: '{label}. اضغط مرة أخرى للاختيار.',
    noVoiceTyping: 'الكتابة بالصوت غير متاحة هنا. اكتب ما تحتاجه ثم اضغط تم.',
    allowMic: 'الميكروفون مغلق. اكتب ما تحتاجه ثم اضغط تم.',
    didntHear: 'لم أسمع شيئًا. حاول مرة أخرى.',
    setupFirst: 'جهّز مساعدك أولًا', setupFirstSay: 'جهّز رقم المساعد والعائلة أولًا',
    welcomeTail: 'اضغط الزر العلوي وقل ما تحتاجه، أو اختر أحد الأزرار المصورة.',
    morning: 'صباح الخير', afternoon: 'مساء الخير', evening: 'مساء الخير',
    greetName: ' يا {name}', greet: '{part}{name}. اليوم {day}، الساعة {time}.',
    notSure: 'سمعت: {text}. لم أفهم ما تحتاجه. يمكنك أن تقول: بقالة، دواء، توصيلة، مساعدة، اتصل بالعائلة، أو طوارئ.',
    calling: 'جارٍ الاتصال بـ {name}',
    wrote: '{title}. كتبت: {text}. اضغط أرسل الطلب لإرساله.',
    wroteReady: 'كتبت: {text}. اضغط أرسل الطلب عندما تكون جاهزًا.',
    reqIntro: '{title}. {prompt} اضغط قل طلبك بصوتك، أو اختر من القائمة.',
    familyIntro: 'الاتصال بالعائلة. اختر من تريد الاتصال به.',
    historyIntro: 'طلباتي. لديك {n}.',
    settingsIntro: 'الإعدادات.',
    added: 'تمت إضافة {label}.', removed: 'تمت إزالة {label}.',
    sendHintTo: 'سيُرسل الطلب إلى {name} عبر {via}.', yourHelper: 'مساعدك',
    viaSms: 'رسالة نصية', viaWa: 'واتساب',
    needHelperPhone: 'أضف أولًا رقم هاتف مساعدك في الإعدادات.',
    needDetails: 'من فضلك قل أو اختر ما تحتاجه أولًا.',
    sending: 'جارٍ إرسال طلبك.',
    msgHello: 'مرحبًا{name}، معك {me}.', msgHelloAnon: 'مرحبًا{name}.', msgName: ' يا {name}',
    msgAddress: 'عنواني: {a}', msgLocation: 'موقعي: {l}',
    msgFooter: '(أُرسلت عبر تطبيق يد العون)',
    opening: 'جارٍ فتح الرسائل. اضغط إرسال لإتمام الطلب.',
    noRequests: 'لا توجد طلبات بعد.',
    sentAt: '{title}. {text}. أُرسل {when}.',
    listEmpty: 'تم مسح القائمة.',
    noFamily: 'لم تُحفظ أرقام للعائلة بعد.', addFamily: 'أضف أرقام العائلة',
    callX: 'اتصل بـ {name}', familyN: 'فرد العائلة {n}', myHelperName: 'مساعدي',
    noEmergencyText: 'لا يوجد رقم طوارئ محفوظ. أضفه من الإعدادات.',
    noEmergencySay: 'طوارئ. لا يوجد رقم طوارئ محفوظ. يمكنك إرسال موقعك إلى مساعدك، أو إضافة رقم من الإعدادات.',
    tapCallNowText: 'اضغط "اتصل الآن" للاتصال بـ {num}.',
    tapCallNowSay: 'طوارئ. اضغط اتصل الآن للاتصال بـ {num}.',
    callingInText: 'الاتصال بـ {num} خلال {n}…',
    callingInSay: 'طوارئ. سأتصل بالنجدة خلال {n} ثوانٍ. اضغط إلغاء في الأسفل للإيقاف.',
    callingNum: 'جارٍ الاتصال بـ {num}…',
    addEmergencyNum: 'من فضلك أضف رقم الطوارئ في الإعدادات.',
    cancelled: 'تم الإلغاء. لم يتم الاتصال.',
    findingLoc: 'جارٍ تحديد موقعك.',
    emergencyMsg: 'طوارئ: {name} يحتاج إلى مساعدة الآن!', emergencyMsgAnon: 'طوارئ: أحتاج إلى مساعدة الآن!',
    emergencyAlert: 'تنبيه طوارئ',
    saved: 'تم الحفظ.', settingsSaved: 'تم حفظ الإعدادات.',
    previewMsgTitle: 'الرسالة التي ستُرسل', previewCallTitle: 'مكالمة هاتفية',
    previewMsgSay: 'في التطبيق الكامل تُفتح هذه الرسالة في {via} جاهزة للإرسال إلى {name}.',
    previewCallSay: 'في التطبيق الكامل يتم الاتصال بالرقم {num}.',
    to: 'إلى: {name} {num}',
    example: '(مثال)',
    langSwitchTo: 'English',
  },
};

const REQUESTS = {
  groceries: {
    icon: 'bag',
    en: { prompt: 'What food or shopping do you need?',
      chips: ['Bread', 'Milk', 'Eggs', 'Water', 'Rice', 'Fruit', 'Vegetables', 'Tea', 'Sugar', 'Cleaning things'],
      intro: 'Please bring me some groceries:' },
    ar: { prompt: 'ما الطعام أو المشتريات التي تحتاجها؟',
      chips: ['عيش', 'لبن', 'بيض', 'مياه', 'أرز', 'فاكهة', 'خضار', 'شاي', 'سكر', 'منظفات'],
      intro: 'من فضلك أحضر لي بعض المشتريات:' },
  },
  medicine: {
    icon: 'pill',
    en: { prompt: 'Which medicine do you need?',
      chips: ['My usual medicine', 'Pain relief', 'Vitamins', 'Blood pressure tablets', 'Diabetes supplies', 'Eye drops'],
      intro: 'Please get me this from the pharmacy:' },
    ar: { prompt: 'ما الدواء الذي تحتاجه؟',
      chips: ['دوائي المعتاد', 'مسكن للألم', 'فيتامينات', 'دواء الضغط', 'مستلزمات السكري', 'قطرة للعين'],
      intro: 'من فضلك أحضر لي من الصيدلية:' },
  },
  ride: {
    icon: 'car',
    en: { prompt: 'Where do you want to go?',
      chips: ['Doctor', 'Hospital', 'Pharmacy', 'Market', 'Place of worship', 'Family visit', 'Bank'],
      intro: 'I need a ride to:' },
    ar: { prompt: 'إلى أين تريد أن تذهب؟',
      chips: ['الطبيب', 'المستشفى', 'الصيدلية', 'السوق', 'دار العبادة', 'زيارة العائلة', 'البنك'],
      intro: 'أحتاج توصيلة إلى:' },
  },
  helper: {
    icon: 'heart',
    en: { prompt: 'What do you need help with?',
      chips: ['Read my mail', 'Cleaning', 'Cooking', 'Go for a walk', 'Fix something', 'Company and a chat', 'Pay a bill'],
      intro: 'Could you please help me with:' },
    ar: { prompt: 'بماذا تحتاج المساعدة؟',
      chips: ['قراءة رسائلي', 'التنظيف', 'الطبخ', 'نزهة مشي', 'تصليح شيء', 'ونس ودردشة', 'دفع فاتورة'],
      intro: 'هل يمكنك مساعدتي في:' },
  },
};

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
  lang: /^ar\b/i.test(navigator.language || '') ? 'ar' : 'en',
  name: '', address: '',
  helperName: '', helperPhone: '', sendVia: 'whatsapp',
  fam1Name: '', fam1Phone: '', fam2Name: '', fam2Phone: '', fam3Name: '', fam3Phone: '',
  emergency: '', countdown: '5',
  voice: true, confirmTap: true, rate: '0.9', size: '1', theme: 'dark',
};
const savedSettings = store.get('hh.settings', null);
let settings = { ...DEFAULTS, ...(savedSettings || {}) };
let requests = store.get('hh.history', []);

// The preview opens filled with clearly marked example contacts so every screen works.
if (PREVIEW && !savedSettings) {
  const ex = STRINGS[settings.lang].example;
  Object.assign(settings, {
    helperName: `Sara ${ex}`, helperPhone: '+20 100 000 0000',
    fam1Name: `Omar ${ex}`, fam1Phone: '+20 111 000 0000',
    emergency: '123', countdown: '0',
  });
  if (!requests.length) {
    requests = [{ type: 'groceries', text: `${settings.lang === 'ar' ? 'عيش، لبن' : 'Bread, Milk'} ${ex}`, at: Date.now() - 86400000 }];
  }
}

/* ---------- Translation ---------- */
function T(key, vars = {}) {
  const s = (STRINGS[settings.lang] && STRINGS[settings.lang][key]) ?? STRINGS.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
}
function req(type) {
  const r = REQUESTS[type] || REQUESTS.helper;
  return { icon: r.icon, title: T(type), ...(r[settings.lang] || r.en) };
}
function locale() { return settings.lang === 'ar' ? 'ar-EG' : undefined; }
function speechLang() {
  if (settings.lang === 'ar') return /^ar/i.test(navigator.language || '') ? navigator.language : 'ar-EG';
  return /^ar/i.test(navigator.language || '') ? 'en-US' : (navigator.language || 'en-US');
}

function applyLanguage() {
  const root = document.documentElement;
  root.lang = settings.lang;
  root.dir = settings.lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = T(el.dataset.t); });
  document.querySelectorAll('[data-t-aria]').forEach(el => el.setAttribute('aria-label', T(el.dataset.tAria)));
  document.querySelectorAll('[data-t-ph]').forEach(el => el.setAttribute('placeholder', T(el.dataset.tPh)));
  const langBtn = document.getElementById('langBtn');
  const other = T('langSwitchTo');
  langBtn.textContent = settings.lang === 'ar' ? 'EN' : 'ع';
  langBtn.setAttribute('aria-label', other);
  langBtn.setAttribute('lang', settings.lang === 'ar' ? 'en' : 'ar');
  langBtn.dataset.say = other;
}

function applyLook() {
  document.documentElement.dataset.look = settings.theme;
  document.documentElement.style.setProperty('--scale', settings.size);
}

/* ---------- Speech out ---------- */
const synth = window.speechSynthesis;
function pickVoice(lang) {
  if (!synth) return null;
  const voices = synth.getVoices();
  const base = lang.slice(0, 2).toLowerCase();
  return voices.find(v => v.lang.toLowerCase() === lang.toLowerCase())
    || voices.find(v => v.lang.toLowerCase().startsWith(base)) || null;
}
function speak(text, { force = false } = {}) {
  if (!synth || (!settings.voice && !force) || !text) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = parseFloat(settings.rate) || 0.9;
  u.lang = speechLang();
  const v = pickVoice(u.lang);
  if (v) u.voice = v;
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

/* ---------- Speech in (with typing as a fallback) ---------- */
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const overlay = document.getElementById('listening');
const heard = document.getElementById('heard');
const typed = document.getElementById('typedCmd');
let activeRec = null;
let finishListening = null;

function listen() {
  return new Promise(resolve => {
    heard.textContent = '';
    typed.value = '';
    overlay.hidden = false;
    synth && synth.cancel();

    let done = false;
    finishListening = () => {
      if (done) return;
      done = true;
      if (activeRec) { try { activeRec.abort(); } catch { /* already stopped */ } activeRec = null; }
      overlay.hidden = true;
      finishListening = null;
      resolve((typed.value || heard.textContent || '').trim());
    };
    const fallBackToTyping = msgKey => {
      heard.textContent = T(msgKey);
      speak(T(msgKey));
      typed.focus();
    };

    if (!Recognition || PREVIEW) { fallBackToTyping('noVoiceTyping'); return; }

    const rec = new Recognition();
    activeRec = rec;
    rec.lang = speechLang();
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    let finalText = '';
    let failed = false;

    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript; else interim += r[0].transcript;
      }
      typed.value = (finalText + ' ' + interim).trim();
    };
    rec.onerror = e => {
      failed = true;
      fallBackToTyping(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'allowMic' : 'didntHear');
    };
    rec.onend = () => {
      activeRec = null;
      // Heard something: finish straight away. Otherwise leave the box open for typing.
      if (finalText.trim()) finishListening && finishListening();
      else if (!failed) fallBackToTyping('didntHear');
    };
    try { rec.start(); } catch { fallBackToTyping('noVoiceTyping'); }
  });
}
document.getElementById('stopListening').addEventListener('click', () => finishListening && finishListening());
typed.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); finishListening && finishListening(); } });

/* ---------- "Tap once to hear, tap again to choose" ---------- */
let armedEl = null, armedAt = 0;
function labelOf(el) {
  const key = el.dataset.say;
  return (key && T(key)) || el.getAttribute('aria-label') || el.textContent.trim();
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
  speak(T('tapAgain', { label: labelOf(el) }), { force: true });
}, true);
function disarm() {
  if (armedEl) armedEl.classList.remove('armed');
  armedEl = null;
}

/* ---------- Routing ---------- */
// The installed app routes with the URL hash so the phone's back button works.
// The preview keeps routes in memory, since the artifact frame owns its URL.
const backBtn = document.getElementById('backBtn');
const titleEl = document.getElementById('screenTitle');
const memStack = [];
let navigatedInApp = false;
let currentRequest = 'helper';
let emergencyTimer = null;
let pendingText = '';

function currentRoute() {
  return PREVIEW ? (memStack[memStack.length - 1] || 'home') : ((location.hash || '#home').slice(1) || 'home');
}
function go(route) {
  if (PREVIEW) { memStack.push(route); render(); return; }
  navigatedInApp = true;
  const hash = '#' + route;
  if (location.hash === hash) render(); else location.hash = hash;
}
backBtn.addEventListener('click', () => {
  if (PREVIEW) { memStack.pop(); render(); return; }
  if (navigatedInApp) window.history.back(); else location.replace('#home');
});
if (!PREVIEW) window.addEventListener('hashchange', render);

document.addEventListener('click', e => {
  const t = e.target.closest('[data-go]');
  if (t) go(t.dataset.go);
});
document.getElementById('skipLink').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('main').focus();
});

function render() {
  const [screen, arg] = currentRoute().split(':');
  stopEmergency();
  disarm();

  const section = document.getElementById(`screen-${screen}`);
  if (!section) { go('home'); return; }
  document.querySelectorAll('.screen').forEach(s => { s.hidden = s !== section; });

  backBtn.hidden = screen === 'home';
  let title = T(section.dataset.title);

  if (screen === 'home') renderHome();
  if (screen === 'request') title = renderRequest(arg);
  if (screen === 'family') renderFamily();
  if (screen === 'history') renderHistory();
  if (screen === 'settings') renderSettings();
  if (screen === 'emergency') startEmergency();

  titleEl.textContent = title;
  document.title = screen === 'home' ? T('appName') : `${title} · ${T('appName')}`;
  window.scrollTo(0, 0);
  titleEl.focus({ preventScroll: true });

  if (screen === 'request') {
    const cfg = req(currentRequest);
    speak(pendingText
      ? T('wrote', { title, text: pendingText })
      : T('reqIntro', { title, prompt: cfg.prompt }));
    pendingText = '';
  } else if (screen === 'family') speak(T('familyIntro'));
  else if (screen === 'history') speak(T('historyIntro', { n: requests.length }));
  else if (screen === 'settings') speak(T('settingsIntro'));
}

/* ---------- Home ---------- */
let greeted = false;
function greetingText() {
  const now = new Date();
  const h = now.getHours();
  const part = T(h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening');
  const name = settings.name ? T('greetName', { name: settings.name }) : '';
  const day = now.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long' });
  const time = now.toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' });
  return T('greet', { part, name, day, time });
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
    btn.dataset.say = 'setupFirstSay';
    btn.innerHTML = `<span class="ico">${iconSVG('gear')}</span><span></span>`;
    btn.lastChild.textContent = T('setupFirst');
    document.getElementById('greeting').after(btn);
  }
  if (!greeted) {
    greeted = true;
    // Browsers only allow speech after the first touch, so greet on it.
    const hello = () => speak(`${greetingText()} ${T('welcomeTail')}`);
    document.addEventListener('pointerdown', hello, { once: true });
  }
}

document.getElementById('heroMic').addEventListener('click', async () => {
  const said = await listen();
  if (!said) { speak(T('didntHear')); return; }
  handleCommand(said);
});

// Keyword matching in English and Arabic (Egyptian and Modern Standard words).
const COMMANDS = [
  ['emergency', /emergenc|\bsos\b|ambulance|police|\bfire\b|i fell|fallen|i('m| am) hurt|help me now|طوارئ|طوارىء|اسعاف|إسعاف|نجدة|النجده|شرطة|بوليس|حريق|وقعت|الحقوني|إلحقوني/],
  ['call', /\b(call|phone|ring)\b|اتصل|إتصل|كلم|كلّم|رن على|رنّ/],
  ['medicine', /medic|pharm|pill|tablet|drug|prescription|drops|دوا|دواء|صيدلي|حبوب|برشام|روشت|قطر/],
  ['ride', /\bride\b|taxi|\bcar\b|drive|take me|go to|lift|uber|careem|مشوار|عربية|تاكسي|اوبر|أوبر|كريم|وصلني|وصّلني|وديني|ودّيني|خدني|توصيلة|اروح|أروح|أذهب/],
  ['history', /my requests|history|طلباتي|السجل/],
  ['groceries', /grocer|food|shop|bread|milk|egg|water|deliver|buy|rice|fruit|vegetable|tea|sugar|بقالة|بقاله|أكل|اكل|طعام|عيش|خبز|لبن|حليب|بيض|مية|مياه|ماء|رز|أرز|فاكه|خضار|شاي|سكر|سوبر ?ماركت|اشتري|أشتري|طلبات|توصيل/],
  ['helper', /help|assist|someone|read|clean|cook|walk|fix|bill|lonely|chat|مساعد|ساعد|حد ي|اقرا|اقرأ|نظاف|تنظيف|طبخ|اطبخ|اتمشى|تمشية|مشي|صلّح|تصليح|فاتور|وحيد|ونس/],
  ['settings', /setting|اعدادات|إعدادات/],
  ['family', /family|عيلة|عائلة|أهلي|اهلي/],
];
function handleCommand(text) {
  const t = text.toLowerCase();
  const match = (COMMANDS.find(([, re]) => re.test(t)) || [])[0];

  switch (match) {
    case 'emergency': return go('emergency');
    case 'call': {
      const fam = familyContacts().find(c => t.includes(c.name.toLowerCase().replace(/\s*\(.*\)$/, '')));
      if (fam) return callNumber(fam.phone, fam.name);
      return go('family');
    }
    case 'medicine': case 'ride': case 'groceries': case 'helper':
      return openRequestWith(match, text);
    case 'history': return go('history');
    case 'settings': return go('settings');
    case 'family': return go('family');
    default:
      speak(T('notSure', { text }));
  }
}

function openRequestWith(type, text) {
  pendingText = text;
  go(`request:${type}`);
}

/* ---------- Request ---------- */
function renderRequest(type) {
  currentRequest = type in REQUESTS ? type : 'helper';
  const cfg = req(currentRequest);
  document.getElementById('reqIcon').innerHTML = iconSVG(cfg.icon);
  document.getElementById('reqPrompt').textContent = cfg.prompt;
  document.getElementById('reqText').value = pendingText;
  document.getElementById('sendHint').textContent = settings.helperPhone
    ? T('sendHintTo', { name: settings.helperName || T('yourHelper'), via: T(settings.sendVia === 'sms' ? 'viaSms' : 'viaWa') })
    : T('needHelperPhone');

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
      speak(T(on ? 'added' : 'removed', { label }));
    });
    chips.appendChild(b);
  });
  return cfg.title;
}

document.getElementById('dictateBtn').addEventListener('click', async () => {
  const said = await listen();
  if (!said) { speak(T('didntHear')); return; }
  const box = document.getElementById('reqText');
  box.value = (box.value ? box.value + (settings.lang === 'ar' ? '، ' : ', ') : '') + said;
  speak(T('wroteReady', { text: said }));
});

document.getElementById('sendReqBtn').addEventListener('click', async () => {
  const cfg = req(currentRequest);
  const sep = settings.lang === 'ar' ? '، ' : ', ';
  const picked = [...document.querySelectorAll('#quickChips .chip[aria-pressed="true"]')].map(b => b.textContent);
  const typedText = document.getElementById('reqText').value.trim();
  const details = [...picked, typedText].filter(Boolean).join(sep);

  if (!details) { toast(T('needDetails')); return; }
  if (!settings.helperPhone) { toast(T('needHelperPhone')); go('settings'); return; }

  const withLoc = document.getElementById('shareLoc').checked;
  speak(T('sending'));
  const loc = withLoc ? await getLocationLink() : '';

  const helperName = settings.helperName ? T('msgName', { name: settings.helperName }) : '';
  const lines = [
    settings.name ? T('msgHello', { name: helperName, me: settings.name }) : T('msgHelloAnon', { name: helperName }),
    `${cfg.intro} ${details}.`,
  ];
  if (settings.address) lines.push(T('msgAddress', { a: settings.address }));
  if (loc) lines.push(T('msgLocation', { l: loc }));
  lines.push(T('msgFooter'));

  addHistory({ type: currentRequest, text: details });
  sendMessage(settings.helperPhone, lines.join('\n'));
});

/* ---------- Messaging and calling ---------- */
function cleanPhone(p) { return String(p || '').replace(/[^\d+]/g, ''); }

const sheet = document.getElementById('sheet');
function showSheet(title, to, body, sayText) {
  document.getElementById('sheetTitle').textContent = title;
  document.getElementById('sheetTo').textContent = to;
  const bodyEl = document.getElementById('sheetBody');
  bodyEl.textContent = body;
  bodyEl.hidden = !body;
  sheet.hidden = false;
  document.getElementById('sheetClose').focus();
  speak(sayText, { force: true });
}
document.getElementById('sheetClose').addEventListener('click', () => { sheet.hidden = true; });
document.getElementById('sheetCopy').addEventListener('click', () => {
  const text = [document.getElementById('sheetTo').textContent, document.getElementById('sheetBody').textContent].filter(Boolean).join('\n\n');
  const fallback = () => {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('sheetBody'));
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  };
  try {
    navigator.clipboard.writeText(text).then(() => toast(T('copied')), fallback);
  } catch { fallback(); }
});

function sendMessage(phone, body) {
  const num = cleanPhone(phone);
  const via = T(settings.sendVia === 'sms' ? 'viaSms' : 'viaWa');
  if (PREVIEW) {
    const name = settings.helperName || T('yourHelper');
    showSheet(T('previewMsgTitle'), T('to', { name, num }), body, T('previewMsgSay', { via, name }));
    return;
  }
  const url = settings.sendVia === 'sms'
    ? `sms:${num}?&body=${encodeURIComponent(body)}`
    : `https://wa.me/${num.replace(/^\+/, '')}?text=${encodeURIComponent(body)}`;
  toast(T('opening'));
  setTimeout(() => { location.href = url; }, 1800);
}

function callNumber(phone, name) {
  const num = cleanPhone(phone);
  if (PREVIEW) {
    showSheet(T('previewCallTitle'), T('to', { name: name || '', num }), '', T('previewCallSay', { num: num.split('').join(' ') }));
    return;
  }
  if (name) speak(T('calling', { name }));
  setTimeout(() => { location.href = `tel:${num}`; }, name ? 1000 : 0);
}

function getLocationLink() {
  return new Promise(resolve => {
    if (PREVIEW || !navigator.geolocation) return resolve('');
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
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = T('noRequests');
    list.appendChild(p);
    return;
  }
  requests.forEach(h => {
    const cfg = req(h.type);
    const when = new Date(h.at).toLocaleString(locale(), { weekday: 'long', hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short' });
    const btn = document.createElement('button');
    btn.className = 'bigbtn bigbtn-gray history-item';
    btn.dataset.instant = '';
    btn.innerHTML = `<span class="ico">${iconSVG(cfg.icon)}</span><span><strong></strong><br><small></small></span>`;
    btn.querySelector('strong').textContent = `${cfg.title}: ${h.text}`;
    btn.querySelector('small').textContent = when;
    btn.addEventListener('click', () => speak(T('sentAt', { title: cfg.title, text: h.text, when }), { force: true }));
    list.appendChild(btn);
  });
}
document.getElementById('clearHistory').addEventListener('click', () => {
  requests = [];
  store.set('hh.history', requests);
  renderHistory();
  toast(T('listEmpty'));
});

/* ---------- Family ---------- */
function familyContacts() {
  const out = [];
  for (const i of [1, 2, 3]) {
    const name = String(settings[`fam${i}Name`] || '').trim(), phone = String(settings[`fam${i}Phone`] || '').trim();
    if (phone) out.push({ name: name || T('familyN', { n: i }), phone });
  }
  if (settings.helperPhone) out.push({ name: settings.helperName || T('myHelperName'), phone: settings.helperPhone });
  return out;
}
function renderFamily() {
  const list = document.getElementById('familyList');
  list.innerHTML = '';
  const people = familyContacts();
  if (!people.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = T('noFamily');
    const b = document.createElement('button');
    b.className = 'bigbtn bigbtn-blue';
    b.dataset.go = 'settings';
    b.dataset.say = 'addFamily';
    b.innerHTML = `<span class="ico">${iconSVG('gear')}</span><span></span>`;
    b.lastChild.textContent = T('addFamily');
    list.append(p, b);
    return;
  }
  people.forEach(p => {
    const label = T('callX', { name: p.name });
    const b = document.createElement('button');
    b.className = 'bigbtn bigbtn-green';
    b.dataset.say = label;
    b.innerHTML = `<span class="ico">${iconSVG('person')}</span><span></span>`;
    b.lastChild.textContent = label;
    b.addEventListener('click', () => callNumber(p.phone, p.name));
    list.appendChild(b);
  });
}

/* ---------- Emergency ---------- */
function startEmergency() {
  const text = document.getElementById('countdownText');
  const num = cleanPhone(settings.emergency);
  if (!num) {
    text.textContent = T('noEmergencyText');
    speak(T('noEmergencySay'));
    return;
  }
  const spokenNum = num.split('').join(' ');
  const total = parseInt(settings.countdown, 10) || 0;
  if (!total || PREVIEW) {
    text.textContent = T('tapCallNowText', { num });
    speak(T('tapCallNowSay', { num: spokenNum }));
    return;
  }
  let left = total;
  const tick = () => {
    if (left <= 0) {
      stopEmergency();
      text.textContent = T('callingNum', { num });
      callNumber(num);
      return;
    }
    text.textContent = T('callingInText', { num, n: left.toLocaleString(locale()) });
    speak(left === total ? T('callingInSay', { n: left }) : left.toLocaleString(locale()), { force: true });
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
  if (!num) { toast(T('addEmergencyNum')); return; }
  callNumber(num);
});
document.getElementById('cancelEmergency').addEventListener('click', () => {
  stopEmergency();
  speak(T('cancelled'), { force: true });
  go('home');
});
document.getElementById('alertHelperBtn').addEventListener('click', async () => {
  stopEmergency();
  if (!settings.helperPhone) { toast(T('needHelperPhone')); return; }
  speak(T('findingLoc'), { force: true });
  const loc = await getLocationLink();
  const lines = [settings.name ? T('emergencyMsg', { name: settings.name }) : T('emergencyMsgAnon')];
  if (settings.address) lines.push(T('msgAddress', { a: settings.address }));
  if (loc) lines.push(T('msgLocation', { l: loc }));
  addHistory({ type: 'helper', text: T('emergencyAlert') });
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
function saveSettings(next) {
  settings = next;
  store.set('hh.settings', settings);
  applyLook();
  applyLanguage();
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const next = { ...settings };
  for (const k of Object.keys(DEFAULTS)) {
    const el = form.elements[k];
    if (!el) continue;
    next[k] = el.type === 'checkbox' ? el.checked : el.value.trim();
  }
  saveSettings(next);
  toast(T('saved'), { say: false });
  speak(T('settingsSaved'), { force: true });
  go('home');
});

// One-tap language switch in the top bar.
document.getElementById('langBtn').addEventListener('click', () => {
  saveSettings({ ...settings, lang: settings.lang === 'ar' ? 'en' : 'ar' });
  render();
  speak(`${T('appName')}. ${T('welcomeTail')}`, { force: true });
});

/* ---------- Start ---------- */
if (PREVIEW) {
  document.documentElement.classList.add('preview');
  document.getElementById('previewBanner').hidden = false;
}
paintIcons();
applyLook();
applyLanguage();
render();
if (synth) synth.getVoices(); // starts loading voices early on Chrome

if (!PREVIEW && 'serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
