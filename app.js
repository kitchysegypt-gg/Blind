'use strict';

/* =========================================================
   Easy Help — voice-first helper app for blind & elderly
   ========================================================= */

const PREVIEW = !!window.HH_PREVIEW; // hosted preview: no calls, texts, mic or GPS

// Accounts live in Supabase. The publishable key is meant to be public;
// row-level security keeps each person's data to themselves.
const SUPABASE_URL = 'https://sjlgitmupecmqhfmuyds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_sgYgEuoQbf1UhuED29P3zg_TQRm_mZF';

/* ---------- Icons: plain line symbols ---------- */
const ICONS = {
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/>',
  heart: '<path d="M12 20.5s-7.5-4.6-9.6-9.2A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.6 5.3c-2.1 4.6-9.6 9.2-9.6 9.2z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M21.5 16.6v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 3.9 2 2 0 0 1 3.6 1.7h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.5 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  gear: '<path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.5a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.5a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  bag: '<path d="M5.5 8h13l-1 13h-11z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  pill: '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>',
  car: '<path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3 16.5h18M4 12h16"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  send: '<path d="M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8-8-4z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  speaker: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9.5 9.5 0 0 1 0 13"/>',
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
  camera: '<path d="M14.5 4h-5L7.5 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5z"/><circle cx="12" cy="13" r="3.5"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chev: '<path d="m9 18 6-6-6-6"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
};
function iconSVG(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`;
}
function paintIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = iconSVG(el.dataset.icon); });
}

/* ---------- Words in each language ---------- */
const STRINGS = {
  en: {
    appName: 'Easy Help', skip: 'Skip to main content',
    previewBanner: 'Preview. Calls, messages and location are shown here instead of used. Install the app on a phone for the real thing.',
    back: 'Back', settings: 'Settings',
    heroSay: 'Speak. Tell me what you need.', heroText: 'Speak',
    askHelp: 'Ask for help', askHelpSay: 'Ask for help with groceries, medicine, a ride, or anything else',
    whereAmI: 'Where am I?', whereAmISay: 'Where am I? Hear your address',
    family: 'Call family', emergency: 'Emergency', emergencyTitle: 'Emergency', emergencySay: 'Emergency. Get help now.',
    groceries: 'Groceries', groceriesSay: 'Groceries',
    medicine: 'Medicine', medicineSay: 'Medicine from the pharmacy',
    ride: 'A ride', rideSay: 'A ride',
    helper: 'Someone to help me', helperSay: 'Someone to help me',
    history: 'My requests',
    speakRequest: 'Speak my request', typeHere: 'Or type it here', quick: 'Quick choices',
    shareLoc: 'Include my location', send: 'Send request',
    clearList: 'Clear list', clearSay: 'Clear all requests',
    callNow: 'Call now', cancel: 'Cancel', cancelSay: 'Cancel. Do not call.',
    listening: 'Listening…', listenType: 'Or type here', done: 'Done',
    copy: 'Copy', close: 'Close', copied: 'Copied.',

    signinIntro: 'Sign in so your helper, family and requests are saved.',
    email: 'Email', password: 'Password', signIn: 'Sign in', createAccount: 'Create account',
    newHere: "I'm new. Create an account", haveAccount: 'I already have an account',
    forgot: 'I forgot my password', noAccount: 'Use without an account',
    continueAs: 'Continue as {name}', continueAsYou: 'Continue with my Claude account',
    signinSay: 'Welcome to Easy Help. Type your email and password, then tap sign in. New here? Tap create an account.',
    signinBusy: 'One moment…',
    needEmail: 'Please type your email address.',
    needPassword: 'Please type a password with at least 6 characters.',
    errWrong: 'That email or password is not right. Please try again.',
    errExists: 'There is already an account with this email. Tap "I already have an account" to sign in.',
    errWeak: 'Please use a password with at least 6 characters.',
    errConfirm: 'Please open the email we sent you and tap the link, then sign in.',
    errBadEmail: 'Please check the email address.',
    errRate: 'Too many tries. Please wait a minute and try again.',
    errOffline: 'No internet connection. Please try again.',
    errGeneric: 'Something went wrong. Please try again.',
    checkEmail: 'Account made. We sent you an email. Open it and tap the link to finish.',
    resetSent: 'If that email has an account, we sent a link to reset the password.',
    welcomeBack: 'You are signed in.',
    recoveredSay: 'You are signed in. Please choose a new password here.',
    account: 'Account', signedInAs: 'Signed in as {who}', notSignedIn: 'Not signed in. Your settings are saved only on this phone.',
    signOut: 'Sign out', signInNow: 'Sign in', signedOut: 'You are signed out.',
    newPassword: 'New password', changePassword: 'Change password', passwordChanged: 'Your password is changed.',

    youAreAt: 'You are at', readAgain: 'Read it again', sendLocation: 'Send my location to my helper',
    openMaps: 'Open in Maps', saveHome: 'Save as my home address', tryAgain: 'Find me again',
    finding: 'Finding where you are…',
    noGps: "I can't find your location. Please turn on location for this app in your phone settings.",
    youAreAtSay: 'You are at {place}.', accuracy: 'Accurate to about {m} metres.',
    nearCoords: 'Near {lat}, {lng}', homeSaved: 'Saved as your home address.',
    exampleLocation: 'Tahrir Square, Downtown, Cairo',
    previewLocation: 'Example. In the installed app this shows your real address.',

    language: 'Language', aboutMe: 'About me', myName: 'My name', myAddress: 'My home address',
    myHelper: 'My helper', helperHint: 'Requests are sent to this person (a relative, neighbour, carer or local shop).',
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
    srHint: 'Turn this off if you use VoiceOver or TalkBack.',
    rate: 'Voice speed', slow: 'Slow', normal: 'Normal', fast: 'Fast',
    size: 'Text size', large: 'Large', xl: 'Extra large', huge: 'Huge',
    colours: 'Colours', themeDark: 'Dark', themeYellow: 'Yellow on black', themeLight: 'Cream and blue',
    save: 'Save',

    tapAgain: '{label}. Tap again to choose.',
    noVoiceTyping: "Voice typing isn't available here. Type what you need, then tap Done.",
    allowMic: 'The microphone is off. Type what you need, then tap Done.',
    didntHear: "I didn't hear anything. Please try again.",
    setupFirst: 'Add my helper', setupFirstSay: 'Add your helper and family first',
    homeSay: 'Home. Five buttons: Speak, Ask for help, Where am I, Call family, Emergency.',
    helpSay: 'Ask for help. Groceries, medicine, a ride, or someone to help you.',
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
    greetName: ', {name}', greet: "{part}{name}. It's {day}, {time}.",
    notSure: "I heard: {text}. I'm not sure what you need. You can say groceries, medicine, ride, help, where am I, call family, or emergency.",
    calling: 'Calling {name}',
    wrote: '{title}. I wrote: {text}. Tap send request to send it.',
    wroteReady: "I wrote: {text}. Tap send request when you're ready.",
    reqIntro: '{title}. {prompt} Tap speak my request, or choose from the list.',
    familyIntro: 'Call family. Choose who to call.',
    historyIntro: 'My requests. You have {n}.',
    settingsIntro: 'Settings.',
    added: '{label}, added.', removed: '{label}, removed.',
    sendHintTo: 'This goes to {name} by {via}.', yourHelper: 'your helper',
    viaSms: 'text message', viaWa: 'WhatsApp',
    needHelperPhone: "First add your helper's phone number in Settings.",
    needDetails: 'Please say or choose what you need first.',
    sending: 'Sending your request.',
    msgHello: 'Hello{name}, this is {me}.', msgHelloAnon: 'Hello{name}.', msgName: ' {name}',
    msgAddress: 'My address: {a}', msgLocation: 'My location: {l}', msgHere: 'I am at: {p}',
    msgFooter: '(Sent with Easy Help)',
    opening: 'Opening your messages. Press send to finish.',
    noRequests: 'No requests yet.', sentAt: '{title}. {text}. Sent {when}.', listEmpty: 'Your list is now empty.',
    noFamily: 'No family numbers saved yet.', addFamily: 'Add family numbers',
    callX: 'Call {name}', familyN: 'Family {n}', myHelperName: 'My helper',
    noEmergencyText: 'No emergency number saved. Add one in Settings.',
    noEmergencySay: 'Emergency. No emergency number is saved. You can send your location to your helper, or add a number in settings.',
    tapCallNowText: 'Tap "Call now" to call {num}.', tapCallNowSay: 'Emergency. Tap call now to call {num}.',
    callingInText: 'Calling {num} in {n}…',
    callingInSay: 'Emergency. Calling for help in {n} seconds. Tap cancel at the bottom to stop.',
    callingNum: 'Calling {num}…', addEmergencyNum: 'Please add an emergency number in Settings.',
    cancelled: 'Cancelled. No call was made.', findingLoc: 'Finding your location.',
    emergencyMsg: 'EMERGENCY: {name} needs help now!', emergencyMsgAnon: 'EMERGENCY: I need help now!',
    emergencyAlert: 'Emergency alert', locationShared: 'Location shared',
    saved: 'Saved.', settingsSaved: 'Settings saved.',
    previewMsgTitle: 'Message to send', previewCallTitle: 'Phone call',
    previewMsgSay: 'In the installed app this message opens in {via}, ready to send to {name}.',
    previewCallSay: 'In the installed app this calls {num}.',
    heroSub: 'Say what you need', askHelpSub: 'Groceries, medicine, a ride', whereAmISub: 'Hear your street address',
    emergencySub: 'Call for help now', readText: 'Read text', readTextSub: 'Point the camera at a letter or label',
    readTextSay: 'Read text with the camera', meds: 'My medicines', medsSay: 'My medicines and reminders',
    medsSubEmpty: 'Set reminders for your tablets', nextDose: 'Next: {name} at {time}',
    familySubEmpty: 'Add family numbers in Settings',
    readHow: 'Hold the phone about 30 cm (one foot) above the words, in good light.',
    takePhoto: 'Take a photo', itSays: 'It says', stopReading: 'Stop reading',
    readIntro: 'Read text. Tap take a photo, then point the camera at the words.',
    readingNow: 'Reading the words. Please wait…',
    readNothing: "I couldn't find any words. Hold the phone a little further away, in good light, and try again.",
    readFail: "I couldn't read that photo. Please try again.",
    readNeedsApp: 'Reading text works in the installed app.',
    readLoading: 'Getting the reader ready. The first time takes a minute…',
    medsIntro: 'My medicines. You have {n}. {next}', medsIntroNone: 'My medicines. You have none yet. Tap add a medicine.',
    noMeds: 'No medicines yet.', addMed: 'Add a medicine', medName: 'Medicine name', speakName: 'Say the name',
    medTimes: 'Times to take it', addTime: 'Add another time', saveMed: 'Save medicine', removeTime: 'Remove this time',
    deleteMed: 'Remove {name}', medSaved: 'Saved. I will remind you at {times}.', medDeleted: '{name} removed.',
    needMedName: 'Please say or type the medicine name.', needMedTime: 'Please add at least one time.',
    medsHint: 'Reminders work while Easy Help is open. Leave it open on your phone.',
    remindTitle: 'Time for your medicine', remindSay: "It's time for {name}. Tap I took it, or remind me later.",
    tookIt: 'I took it', later10: 'Remind me in 10 minutes', skipDose: 'Skip this one',
    doseTaken: 'Well done. {name} marked as taken.', snoozed: 'I will remind you again in 10 minutes.', doseSkipped: 'Skipped.',
    replyLink: 'Tap to answer: {url}',
    status_sent: 'Sent', status_seen: 'Seen', status_coming: 'On the way', status_later: 'Coming later', status_cant: "Can't help", status_done: 'Done',
    reply_seen: '{name} has seen your request. {what}.', reply_coming: '{name} is on the way. {what}.',
    reply_later: '{name} will come later. {what}.', reply_cant: "{name} can't help with this one. {what}. You could ask someone else.",
    reply_done: '{name} says it is done. {what}.',
    to: 'To: {name} {num}', example: '(example)', langSwitchTo: 'العربية',
  },
  ar: {
    appName: 'إيزي هيلب', skip: 'انتقل إلى المحتوى',
    previewBanner: 'معاينة. تظهر المكالمات والرسائل والموقع هنا بدلًا من استخدامها. ثبّت التطبيق على الهاتف للاستخدام الحقيقي.',
    back: 'رجوع', settings: 'الإعدادات',
    heroSay: 'تكلّم. قل لي ماذا تحتاج.', heroText: 'تكلّم',
    askHelp: 'اطلب مساعدة', askHelpSay: 'اطلب مساعدة في البقالة أو الدواء أو توصيلة أو أي شيء آخر',
    whereAmI: 'أين أنا؟', whereAmISay: 'أين أنا؟ اسمع عنوانك',
    family: 'اتصل بالعائلة', emergency: 'طوارئ', emergencyTitle: 'الطوارئ', emergencySay: 'طوارئ. اطلب النجدة الآن.',
    groceries: 'البقالة', groceriesSay: 'البقالة',
    medicine: 'الدواء', medicineSay: 'دواء من الصيدلية',
    ride: 'توصيلة', rideSay: 'توصيلة',
    helper: 'شخص يساعدني', helperSay: 'شخص يساعدني',
    history: 'طلباتي',
    speakRequest: 'قل طلبك بصوتك', typeHere: 'أو اكتبه هنا', quick: 'اختيارات سريعة',
    shareLoc: 'أرسل موقعي', send: 'أرسل الطلب',
    clearList: 'امسح القائمة', clearSay: 'امسح كل الطلبات',
    callNow: 'اتصل الآن', cancel: 'إلغاء', cancelSay: 'إلغاء. لا تتصل.',
    listening: 'أستمع إليك…', listenType: 'أو اكتب هنا', done: 'تم',
    copy: 'نسخ', close: 'إغلاق', copied: 'تم النسخ.',

    signinIntro: 'سجّل الدخول حتى تُحفظ بيانات مساعدك وعائلتك وطلباتك.',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', signIn: 'تسجيل الدخول', createAccount: 'إنشاء حساب',
    newHere: 'أنا جديد. أنشئ حسابًا', haveAccount: 'لدي حساب بالفعل',
    forgot: 'نسيت كلمة المرور', noAccount: 'الاستخدام بدون حساب',
    continueAs: 'المتابعة باسم {name}', continueAsYou: 'المتابعة بحساب Claude',
    signinSay: 'أهلًا بك في إيزي هيلب. اكتب بريدك الإلكتروني وكلمة المرور ثم اضغط تسجيل الدخول. إذا كنت جديدًا اضغط أنشئ حسابًا.',
    signinBusy: 'لحظة من فضلك…',
    needEmail: 'من فضلك اكتب بريدك الإلكتروني.',
    needPassword: 'من فضلك اكتب كلمة مرور من ٦ أحرف على الأقل.',
    errWrong: 'البريد أو كلمة المرور غير صحيحة. حاول مرة أخرى.',
    errExists: 'يوجد حساب بهذا البريد بالفعل. اضغط "لدي حساب بالفعل" لتسجيل الدخول.',
    errWeak: 'من فضلك استخدم كلمة مرور من ٦ أحرف على الأقل.',
    errConfirm: 'من فضلك افتح الرسالة التي أرسلناها إلى بريدك واضغط الرابط، ثم سجّل الدخول.',
    errBadEmail: 'من فضلك تأكد من البريد الإلكتروني.',
    errRate: 'محاولات كثيرة. انتظر دقيقة ثم حاول مرة أخرى.',
    errOffline: 'لا يوجد اتصال بالإنترنت. حاول مرة أخرى.',
    errGeneric: 'حدث خطأ. حاول مرة أخرى.',
    checkEmail: 'تم إنشاء الحساب. أرسلنا رسالة إلى بريدك. افتحها واضغط الرابط لإكمال التسجيل.',
    resetSent: 'إذا كان لهذا البريد حساب، فقد أرسلنا رابطًا لتغيير كلمة المرور.',
    welcomeBack: 'تم تسجيل الدخول.',
    recoveredSay: 'تم تسجيل الدخول. من فضلك اختر كلمة مرور جديدة هنا.',
    account: 'الحساب', signedInAs: 'مسجّل الدخول باسم {who}', notSignedIn: 'لم تسجّل الدخول. إعداداتك محفوظة على هذا الهاتف فقط.',
    signOut: 'تسجيل الخروج', signInNow: 'تسجيل الدخول', signedOut: 'تم تسجيل الخروج.',
    newPassword: 'كلمة مرور جديدة', changePassword: 'غيّر كلمة المرور', passwordChanged: 'تم تغيير كلمة المرور.',

    youAreAt: 'أنت في', readAgain: 'اقرأ مرة أخرى', sendLocation: 'أرسل موقعي إلى مساعدي',
    openMaps: 'افتح في الخرائط', saveHome: 'احفظه كعنوان بيتي', tryAgain: 'حدّد مكاني مرة أخرى',
    finding: 'جارٍ تحديد مكانك…',
    noGps: 'لا أستطيع تحديد موقعك. من فضلك شغّل خدمة الموقع لهذا التطبيق من إعدادات الهاتف.',
    youAreAtSay: 'أنت في {place}.', accuracy: 'الدقة حوالي {m} متر.',
    nearCoords: 'بالقرب من {lat}، {lng}', homeSaved: 'تم حفظه كعنوان بيتك.',
    exampleLocation: 'ميدان التحرير، وسط البلد، القاهرة',
    previewLocation: 'مثال. في التطبيق المثبّت يظهر عنوانك الحقيقي.',

    language: 'اللغة', aboutMe: 'بياناتي', myName: 'اسمي', myAddress: 'عنوان بيتي',
    myHelper: 'مساعدي', helperHint: 'تُرسل الطلبات إلى هذا الشخص (قريب أو جار أو مرافق أو محل قريب).',
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
    srHint: 'أوقف هذا الخيار إذا كنت تستخدم VoiceOver أو TalkBack.',
    rate: 'سرعة الصوت', slow: 'بطيء', normal: 'عادي', fast: 'سريع',
    size: 'حجم الخط', large: 'كبير', xl: 'كبير جدًا', huge: 'ضخم',
    colours: 'الألوان', themeDark: 'داكن', themeYellow: 'أصفر على أسود', themeLight: 'كريمي وأزرق',
    save: 'حفظ',

    tapAgain: '{label}. اضغط مرة أخرى للاختيار.',
    noVoiceTyping: 'الكتابة بالصوت غير متاحة هنا. اكتب ما تحتاجه ثم اضغط تم.',
    allowMic: 'الميكروفون مغلق. اكتب ما تحتاجه ثم اضغط تم.',
    didntHear: 'لم أسمع شيئًا. حاول مرة أخرى.',
    setupFirst: 'أضف مساعدي', setupFirstSay: 'أضف مساعدك وعائلتك أولًا',
    homeSay: 'الرئيسية. خمسة أزرار: تكلّم، اطلب مساعدة، أين أنا، اتصل بالعائلة، طوارئ.',
    helpSay: 'اطلب مساعدة. البقالة، الدواء، توصيلة، أو شخص يساعدك.',
    morning: 'صباح الخير', afternoon: 'مساء الخير', evening: 'مساء الخير',
    greetName: ' يا {name}', greet: '{part}{name}. اليوم {day}، الساعة {time}.',
    notSure: 'سمعت: {text}. لم أفهم ما تحتاجه. يمكنك أن تقول: بقالة، دواء، توصيلة، مساعدة، أين أنا، اتصل بالعائلة، أو طوارئ.',
    calling: 'جارٍ الاتصال بـ {name}',
    wrote: '{title}. كتبت: {text}. اضغط أرسل الطلب لإرساله.',
    wroteReady: 'كتبت: {text}. اضغط أرسل الطلب عندما تكون جاهزًا.',
    reqIntro: '{title}. {prompt} اضغط قل طلبك بصوتك، أو اختر من القائمة.',
    familyIntro: 'الاتصال بالعائلة. اختر من تريد الاتصال به.',
    historyIntro: 'طلباتي. لديك {n}.',
    settingsIntro: 'الإعدادات.',
    added: 'تمت إضافة {label}.', removed: 'تمت إزالة {label}.',
    sendHintTo: 'يُرسل إلى {name} عبر {via}.', yourHelper: 'مساعدك',
    viaSms: 'رسالة نصية', viaWa: 'واتساب',
    needHelperPhone: 'أضف أولًا رقم هاتف مساعدك في الإعدادات.',
    needDetails: 'من فضلك قل أو اختر ما تحتاجه أولًا.',
    sending: 'جارٍ إرسال طلبك.',
    msgHello: 'مرحبًا{name}، معك {me}.', msgHelloAnon: 'مرحبًا{name}.', msgName: ' يا {name}',
    msgAddress: 'عنواني: {a}', msgLocation: 'موقعي: {l}', msgHere: 'أنا الآن في: {p}',
    msgFooter: '(أُرسلت عبر تطبيق إيزي هيلب)',
    opening: 'جارٍ فتح الرسائل. اضغط إرسال لإتمام الطلب.',
    noRequests: 'لا توجد طلبات بعد.', sentAt: '{title}. {text}. أُرسل {when}.', listEmpty: 'تم مسح القائمة.',
    noFamily: 'لم تُحفظ أرقام للعائلة بعد.', addFamily: 'أضف أرقام العائلة',
    callX: 'اتصل بـ {name}', familyN: 'فرد العائلة {n}', myHelperName: 'مساعدي',
    noEmergencyText: 'لا يوجد رقم طوارئ محفوظ. أضفه من الإعدادات.',
    noEmergencySay: 'طوارئ. لا يوجد رقم طوارئ محفوظ. يمكنك إرسال موقعك إلى مساعدك، أو إضافة رقم من الإعدادات.',
    tapCallNowText: 'اضغط "اتصل الآن" للاتصال بـ {num}.', tapCallNowSay: 'طوارئ. اضغط اتصل الآن للاتصال بـ {num}.',
    callingInText: 'الاتصال بـ {num} خلال {n}…',
    callingInSay: 'طوارئ. سأتصل بالنجدة خلال {n} ثوانٍ. اضغط إلغاء في الأسفل للإيقاف.',
    callingNum: 'جارٍ الاتصال بـ {num}…', addEmergencyNum: 'من فضلك أضف رقم الطوارئ في الإعدادات.',
    cancelled: 'تم الإلغاء. لم يتم الاتصال.', findingLoc: 'جارٍ تحديد موقعك.',
    emergencyMsg: 'طوارئ: {name} يحتاج إلى مساعدة الآن!', emergencyMsgAnon: 'طوارئ: أحتاج إلى مساعدة الآن!',
    emergencyAlert: 'تنبيه طوارئ', locationShared: 'تم إرسال الموقع',
    saved: 'تم الحفظ.', settingsSaved: 'تم حفظ الإعدادات.',
    previewMsgTitle: 'الرسالة التي ستُرسل', previewCallTitle: 'مكالمة هاتفية',
    previewMsgSay: 'في التطبيق المثبّت تُفتح هذه الرسالة في {via} جاهزة للإرسال إلى {name}.',
    previewCallSay: 'في التطبيق المثبّت يتم الاتصال بالرقم {num}.',
    heroSub: 'قل ما تحتاجه', askHelpSub: 'بقالة، دواء، توصيلة', whereAmISub: 'اسمع عنوانك',
    emergencySub: 'اطلب النجدة الآن', readText: 'اقرأ لي', readTextSub: 'وجّه الكاميرا إلى رسالة أو ملصق',
    readTextSay: 'اقرأ النص بالكاميرا', meds: 'أدويتي', medsSay: 'أدويتي ومواعيدها',
    medsSubEmpty: 'اضبط تذكيرًا لأدويتك', nextDose: 'التالي: {name} الساعة {time}',
    familySubEmpty: 'أضف أرقام العائلة من الإعدادات',
    readHow: 'امسك الهاتف على بعد ٣٠ سم تقريبًا فوق الكلام، في مكان مضاء.',
    takePhoto: 'التقط صورة', itSays: 'المكتوب', stopReading: 'أوقف القراءة',
    readIntro: 'اقرأ لي. اضغط التقط صورة، ثم وجّه الكاميرا إلى الكلام.',
    readingNow: 'جارٍ قراءة الكلام. انتظر قليلًا…',
    readNothing: 'لم أجد كلامًا. أبعد الهاتف قليلًا في مكان مضاء وحاول مرة أخرى.',
    readFail: 'لم أستطع قراءة الصورة. حاول مرة أخرى.',
    readNeedsApp: 'قراءة النص تعمل في التطبيق المثبّت.',
    readLoading: 'جارٍ تجهيز القارئ. المرة الأولى تأخذ دقيقة…',
    medsIntro: 'أدويتي. لديك {n}. {next}', medsIntroNone: 'أدويتي. لا توجد أدوية بعد. اضغط أضف دواء.',
    noMeds: 'لا توجد أدوية بعد.', addMed: 'أضف دواء', medName: 'اسم الدواء', speakName: 'قل الاسم',
    medTimes: 'مواعيد الدواء', addTime: 'أضف موعدًا آخر', saveMed: 'احفظ الدواء', removeTime: 'احذف هذا الموعد',
    deleteMed: 'احذف {name}', medSaved: 'تم الحفظ. سأذكّرك الساعة {times}.', medDeleted: 'تم حذف {name}.',
    needMedName: 'من فضلك قل أو اكتب اسم الدواء.', needMedTime: 'من فضلك أضف موعدًا واحدًا على الأقل.',
    medsHint: 'التذكير يعمل ما دام تطبيق إيزي هيلب مفتوحًا. اتركه مفتوحًا على هاتفك.',
    remindTitle: 'موعد الدواء', remindSay: 'حان موعد {name}. اضغط أخذته، أو ذكّرني لاحقًا.',
    tookIt: 'أخذته', later10: 'ذكّرني بعد ١٠ دقائق', skipDose: 'تخطَّ هذه المرة',
    doseTaken: 'أحسنت. تم تسجيل {name}.', snoozed: 'سأذكّرك بعد ١٠ دقائق.', doseSkipped: 'تم التخطي.',
    replyLink: 'اضغط للرد: {url}',
    status_sent: 'أُرسل', status_seen: 'تمت رؤيته', status_coming: 'في الطريق', status_later: 'سيأتي لاحقًا', status_cant: 'لا يستطيع', status_done: 'تم',
    reply_seen: '{name} رأى طلبك. {what}.', reply_coming: '{name} في الطريق إليك. {what}.',
    reply_later: '{name} سيأتي لاحقًا. {what}.', reply_cant: '{name} لا يستطيع المساعدة في هذا الطلب. {what}. يمكنك أن تطلب من شخص آخر.',
    reply_done: '{name} يقول إن الطلب تم. {what}.',
    to: 'إلى: {name} {num}', example: '(مثال)', langSwitchTo: 'English',
  },
};

const REQUESTS = {
  groceries: {
    en: { prompt: 'What food or shopping do you need?',
      chips: ['Bread', 'Milk', 'Eggs', 'Water', 'Rice', 'Fruit', 'Vegetables', 'Tea', 'Sugar', 'Cleaning things'],
      intro: 'Please bring me some groceries:' },
    ar: { prompt: 'ما الطعام أو المشتريات التي تحتاجها؟',
      chips: ['عيش', 'لبن', 'بيض', 'مياه', 'أرز', 'فاكهة', 'خضار', 'شاي', 'سكر', 'منظفات'],
      intro: 'من فضلك أحضر لي بعض المشتريات:' },
  },
  medicine: {
    en: { prompt: 'Which medicine do you need?',
      chips: ['My usual medicine', 'Pain relief', 'Vitamins', 'Blood pressure tablets', 'Diabetes supplies', 'Eye drops'],
      intro: 'Please get me this from the pharmacy:' },
    ar: { prompt: 'ما الدواء الذي تحتاجه؟',
      chips: ['دوائي المعتاد', 'مسكن للألم', 'فيتامينات', 'دواء الضغط', 'مستلزمات السكري', 'قطرة للعين'],
      intro: 'من فضلك أحضر لي من الصيدلية:' },
  },
  ride: {
    en: { prompt: 'Where do you want to go?',
      chips: ['Doctor', 'Hospital', 'Pharmacy', 'Market', 'Place of worship', 'Family visit', 'Bank'],
      intro: 'I need a ride to:' },
    ar: { prompt: 'إلى أين تريد أن تذهب؟',
      chips: ['الطبيب', 'المستشفى', 'الصيدلية', 'السوق', 'دار العبادة', 'زيارة العائلة', 'البنك'],
      intro: 'أحتاج توصيلة إلى:' },
  },
  helper: {
    en: { prompt: 'What do you need help with?',
      chips: ['Read my mail', 'Cleaning', 'Cooking', 'Go for a walk', 'Fix something', 'Company and a chat', 'Pay a bill'],
      intro: 'Could you please help me with:' },
    ar: { prompt: 'بماذا تحتاج المساعدة؟',
      chips: ['قراءة رسائلي', 'التنظيف', 'الطبخ', 'نزهة مشي', 'تصليح شيء', 'ونس ودردشة', 'دفع فاتورة'],
      intro: 'هل يمكنك مساعدتي في:' },
  },
};
const REQUEST_ICONS = { groceries: 'bag', medicine: 'pill', ride: 'car', helper: 'person', location: 'pin' };
const STATUSES = ['sent', 'seen', 'coming', 'later', 'cant', 'done'];

/* ---------- Local storage ---------- */
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode: keep in memory */ }
  },
  remove(key) { try { localStorage.removeItem(key); } catch { /* ignore */ } },
};

const DEFAULTS = {
  lang: /^ar\b/i.test(navigator.language || '') ? 'ar' : 'en',
  name: '', address: '',
  helperName: '', helperPhone: '', sendVia: 'whatsapp',
  fam1Name: '', fam1Phone: '', fam2Name: '', fam2Phone: '', fam3Name: '', fam3Phone: '',
  emergency: '', countdown: '5',
  voice: true, confirmTap: true, rate: '0.9', size: '1', theme: 'light', look: 2,
  meds: [], // [{ id, name, times: ['08:00', '20:00'] }]
};
let settings = { ...DEFAULTS, ...store.get('hh.settings', {}) };
// Version 2 of the look (the presentation's cream and blue) becomes everyone's default once.
if (settings.look !== 2) settings = { ...settings, theme: 'light', look: 2 };
let requests = store.get('hh.history', []);
let skippedSignIn = store.get('hh.skipSignIn', false);

/* ---------- Translation ---------- */
function T(key, vars = {}) {
  const s = (STRINGS[settings.lang] && STRINGS[settings.lang][key]) ?? STRINGS.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
}
function req(type) {
  const r = REQUESTS[type] || REQUESTS.helper;
  return { title: T(type), ...(r[settings.lang] || r.en) };
}
function locale() { return settings.lang === 'ar' ? 'ar-EG' : undefined; }
function speechLang() {
  const nav = navigator.language || 'en-US';
  if (settings.lang === 'ar') return /^ar/i.test(nav) ? nav : 'ar-EG';
  return /^ar/i.test(nav) ? 'en-US' : nav;
}
function listSep() { return settings.lang === 'ar' ? '، ' : ', '; }
function fmtTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date(); d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' });
}

function applyLanguage() {
  const root = document.documentElement;
  root.lang = settings.lang;
  root.dir = settings.lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = T(el.dataset.t); });
  document.querySelectorAll('[data-t-aria]').forEach(el => el.setAttribute('aria-label', T(el.dataset.tAria)));
  document.querySelectorAll('[data-t-ph]').forEach(el => el.setAttribute('placeholder', T(el.dataset.tPh)));
  const langBtn = document.getElementById('langBtn');
  langBtn.textContent = settings.lang === 'ar' ? 'EN' : 'ع';
  langBtn.setAttribute('aria-label', T('langSwitchTo'));
  langBtn.setAttribute('lang', settings.lang === 'ar' ? 'en' : 'ar');
  langBtn.dataset.say = T('langSwitchTo');
  updateAuthMode();
}
function applyLook() {
  document.documentElement.dataset.look = settings.theme;
  document.documentElement.style.setProperty('--scale', settings.size);
}

// Markup for buttons made in code, matching the ones in index.html.
function btnInner(icon, title, sub, { chevron = false } = {}) {
  const wrap = document.createElement('template');
  wrap.innerHTML = `<span class="ico-tile"><span class="ico">${iconSVG(icon)}</span></span><span class="b-text"><span class="b-title"></span><span class="b-sub"></span></span>${chevron ? `<span class="chev">${iconSVG('chev')}</span>` : ''}`;
  wrap.content.querySelector('.b-title').textContent = title;
  wrap.content.querySelector('.b-sub').textContent = sub || '';
  return wrap.content;
}
function makeBtn(cls, icon, title, sub, opts) {
  const b = document.createElement('button');
  b.className = `btn ${cls}`;
  b.appendChild(btnInner(icon, title, sub, opts));
  return b;
}

/* ---------- Speech out ---------- */
const synth = window.speechSynthesis;
function utter(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = parseFloat(settings.rate) || 0.9;
  u.lang = speechLang();
  const base = u.lang.slice(0, 2).toLowerCase();
  const voice = synth.getVoices().find(v => v.lang.toLowerCase().startsWith(base));
  if (voice) u.voice = voice;
  return u;
}
function speak(text, { force = false } = {}) {
  if (!synth || (!settings.voice && !force) || !text) return;
  synth.cancel();
  synth.speak(utter(text));
}
// Long text in short pieces: some phones stop speaking a single long sentence after ~15 seconds.
function speakLong(text) {
  if (!synth || !text) return;
  synth.cancel();
  const pieces = text.replace(/\s*\n\s*/g, '\n').split(/(?<=[.!?؟\n])\s+/).flatMap(p => p.match(/.{1,180}(\s|$)|.{1,180}/g) || []);
  pieces.filter(p => p.trim()).forEach(p => synth.speak(utter(p.trim())));
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

/* ---------- Platform capabilities (hosted preview only) ---------- */
function useCapability(name) {
  return window.claude && window.claude.use ? window.claude.use(name).catch(() => null) : Promise.resolve(null);
}

/* ---------- Speech in (typing when the mic isn't available) ---------- */
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
      resolve(typed.value.trim());
    };
    const fallBackToTyping = key => { heard.textContent = T(key); speak(T(key)); typed.focus(); };

    if (!Recognition || PREVIEW) { fallBackToTyping('noVoiceTyping'); return; }

    const rec = new Recognition();
    activeRec = rec;
    rec.lang = speechLang();
    rec.interimResults = true;
    let finalText = '';
    let failed = false;
    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript; else interim += e.results[i][0].transcript;
      }
      typed.value = (finalText + ' ' + interim).trim();
    };
    rec.onerror = e => {
      failed = true;
      fallBackToTyping(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'allowMic' : 'didntHear');
    };
    rec.onend = () => {
      activeRec = null;
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
  return (key && T(key)) || el.getAttribute('aria-label') || el.textContent.trim().replace(/\s+/g, ' ');
}
document.addEventListener('click', e => {
  const el = e.target.closest('button, a.btn');
  if (!el) return;
  // Keyboard and screen-reader activation (detail 0) and instant buttons act straight away.
  if (!settings.confirmTap || el.hasAttribute('data-instant') || e.detail === 0) {
    if (navigator.vibrate) navigator.vibrate(15);
    return;
  }
  if (armedEl === el && Date.now() - armedAt < 6000) { disarm(); return; }
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

/* =========================================================
   Accounts
   - Installed app: Supabase email + password.
   - Hosted preview: the viewer's claude.ai account, data in the artifact's db.
   ========================================================= */
class AuthError extends Error {
  constructor(code) { super(code); this.code = code; }
}

const SupabaseAccount = {
  session: store.get('hh.session', null),

  configured() { return SUPABASE_KEY && !SUPABASE_KEY.startsWith('__'); },
  signedIn() { return !!this.session; },
  who() { return this.session && this.session.user.email; },

  async auth(path, body, token) {
    let res;
    try {
      res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
        method: body === undefined ? 'GET' : (path === 'user' ? 'PUT' : 'POST'),
        headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch { throw new AuthError('offline'); }
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new AuthError(json.error_code || json.code || `http_${res.status}`);
    return json;
  },
  keep(json) {
    this.session = {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_at: json.expires_at || Math.floor(Date.now() / 1000) + (json.expires_in || 3600),
      user: { id: json.user.id, email: json.user.email },
    };
    store.set('hh.session', this.session);
  },
  drop() { this.session = null; store.remove('hh.session'); },

  async token() {
    if (!this.session) return null;
    if (this.session.expires_at - 60 > Date.now() / 1000) return this.session.access_token;
    try {
      this.keep(await this.auth('token?grant_type=refresh_token', { refresh_token: this.session.refresh_token }));
    } catch (e) {
      if (e.code !== 'offline') this.drop(); // refresh token no longer valid
      return null;
    }
    return this.session.access_token;
  },
  async rest(path, { method = 'GET', body, prefer } = {}) {
    const token = await this.token();
    if (!token) throw new AuthError('signed_out');
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      method,
      headers: {
        apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
        ...(prefer ? { Prefer: prefer } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!res.ok) throw new AuthError(`http_${res.status}`);
    return res.status === 204 ? null : res.json().catch(() => null);
  },

  redirect() { return encodeURIComponent(location.origin + location.pathname); },
  async signIn(email, password) {
    this.keep(await this.auth('token?grant_type=password', { email, password }));
  },
  async signUp(name, email, password) {
    const json = await this.auth(`signup?redirect_to=${this.redirect()}`, { email, password, data: { name } });
    if (json.access_token) { this.keep(json); return 'signed_in'; }
    return 'check_email';
  },
  async forgot(email) { await this.auth(`recover?redirect_to=${this.redirect()}`, { email }); },
  async changePassword(password) {
    const token = await this.token();
    if (!token) throw new AuthError('signed_out');
    await this.auth('user', { password }, token);
  },
  async signOut() {
    const token = this.session && this.session.access_token;
    this.drop();
    if (token) fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` } }).catch(() => {});
  },
  // The link in a confirmation or password-reset email lands here with tokens in the URL hash.
  async takeLinkTokens() {
    const h = new URLSearchParams(location.hash.slice(1));
    if (!h.get('access_token')) return null;
    const type = h.get('type');
    history.replaceState(null, '', location.pathname + location.search);
    try {
      const user = await this.auth('user', undefined, h.get('access_token'));
      this.keep({
        access_token: h.get('access_token'), refresh_token: h.get('refresh_token'),
        expires_at: Number(h.get('expires_at')) || undefined, expires_in: Number(h.get('expires_in')) || 3600, user,
      });
      return type;
    } catch { return null; }
  },

  async loadSettings() {
    const rows = await this.rest(`hh_profiles?select=settings&id=eq.${this.session.user.id}`);
    return rows && rows[0] ? rows[0].settings : null;
  },
  async saveSettings(s) {
    await this.rest('hh_profiles', {
      method: 'POST', prefer: 'resolution=merge-duplicates,return=minimal',
      body: { id: this.session.user.id, settings: s, updated_at: new Date().toISOString() },
    });
  },
  async loadRequests() {
    const rows = await this.rest('hh_requests?select=type,text,status,created_at&order=created_at.desc&limit=50');
    return (rows || []).map(r => ({ type: r.type, text: r.text, status: r.status, at: Date.parse(r.created_at) }));
  },
  // Returns the secret token for the helper's reply link.
  async addRequest(r, extra = {}) {
    const rows = await this.rest('hh_requests?select=token', {
      method: 'POST', prefer: 'return=representation',
      body: { type: r.type, text: r.text, ...extra },
    });
    return rows && rows[0] ? rows[0].token : null;
  },
  async clearRequests() { await this.rest(`hh_requests?user_id=eq.${this.session.user.id}`, { method: 'DELETE' }); },
  async repliesSince(iso) {
    return this.rest(`hh_requests?select=type,text,status,status_at&status_at=gt.${encodeURIComponent(iso)}&order=status_at.asc`);
  },
};

const ClaudeAccount = {
  user: null, db: null, id: null, name: '', ready: null,
  configured() { return true; },
  signedIn() { return !!this.id && !!store.get('hh.claudeSignedIn', false); },
  who() { return this.name || T('continueAsYou'); },
  init() {
    this.ready = Promise.all([useCapability('user'), useCapability('db')]).then(async ([user, db]) => {
      this.user = user; this.db = db;
      if (user) {
        this.id = await user.id();
        this.name = (await user.name()) || '';
      }
    }).catch(() => {});
    return this.ready;
  },
  available() { return !!(this.db && this.id); },
  col() { return this.db.collection(`data/users/${this.id}`); },
  async signIn() { await this.ready; if (!this.available()) throw new AuthError('unavailable'); store.set('hh.claudeSignedIn', true); },
  async signOut() { store.set('hh.claudeSignedIn', false); },
  async loadSettings() { const s = await this.col().doc('profile').get(); return s.exists ? s.data().settings : null; },
  async saveSettings(s) { await this.col().doc('profile').set({ settings: s }); },
  async loadRequests() { const s = await this.col().doc('requests').get(); return s.exists ? (s.data().items || []) : []; },
  async addRequest() { await this.saveRequests(); return null; },
  async saveRequests() { await this.col().doc('requests').set({ items: requests.slice(0, 50) }); },
  async clearRequests() { await this.col().doc('requests').set({ items: [] }); },
  async repliesSince() { return []; },
};

const Account = PREVIEW ? ClaudeAccount : SupabaseAccount;

async function afterSignIn() {
  try {
    const remote = await Account.loadSettings();
    if (remote) {
      settings = { ...DEFAULTS, ...remote };
      store.set('hh.settings', settings);
    } else {
      await Account.saveSettings(settings);
    }
    const remoteReqs = await Account.loadRequests();
    if (remoteReqs.length) { requests = remoteReqs; store.set('hh.history', requests); }
  } catch { /* offline: keep what's on the phone */ }
  if (!store.get('hh.lastReplyAt', null)) store.set('hh.lastReplyAt', new Date().toISOString());
  applyLook();
  applyLanguage();
}

/* ---------- Sign-in screen ---------- */
let authMode = 'signin'; // or 'signup'
const authMsg = document.getElementById('authMsg');
function updateAuthMode() {
  const signup = authMode === 'signup';
  document.getElementById('nameRow').hidden = !signup;
  document.getElementById('authSubmitLabel').textContent = T(signup ? 'createAccount' : 'signIn');
  document.getElementById('authToggleLabel').textContent = T(signup ? 'haveAccount' : 'newHere');
  document.getElementById('authForgot').hidden = signup;
  document.getElementById('authPassword').autocomplete = signup ? 'new-password' : 'current-password';
}
function setAuthMsg(text) { authMsg.textContent = text; if (text) speak(text, { force: true }); }
function authErrorText(e) {
  const map = {
    invalid_credentials: 'errWrong', user_already_exists: 'errExists', email_exists: 'errExists',
    weak_password: 'errWeak', email_not_confirmed: 'errConfirm', email_address_invalid: 'errBadEmail',
    validation_failed: 'errBadEmail', over_email_send_rate_limit: 'errRate', over_request_rate_limit: 'errRate',
    offline: 'errOffline', http_429: 'errRate',
  };
  return T(map[e.code] || 'errGeneric');
}
document.getElementById('authToggle').addEventListener('click', () => {
  authMode = authMode === 'signin' ? 'signup' : 'signin';
  setAuthMsg('');
  updateAuthMode();
  speak(T(authMode === 'signup' ? 'createAccount' : 'signIn'), { force: true });
});
document.getElementById('authForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const name = document.getElementById('authName').value.trim();
  if (!email) { setAuthMsg(T('needEmail')); document.getElementById('authEmail').focus(); return; }
  if (password.length < 6) { setAuthMsg(T('needPassword')); document.getElementById('authPassword').focus(); return; }
  const btn = document.getElementById('authSubmit');
  btn.disabled = true;
  setAuthMsg(T('signinBusy'));
  try {
    if (authMode === 'signup') {
      if (name) settings.name = name;
      const result = await Account.signUp(name, email, password);
      if (result === 'check_email') { setAuthMsg(T('checkEmail')); authMode = 'signin'; updateAuthMode(); return; }
    } else {
      await Account.signIn(email, password);
    }
    document.getElementById('authPassword').value = '';
    setAuthMsg('');
    await afterSignIn();
    toast(T('welcomeBack'));
    go('home');
  } catch (err) {
    setAuthMsg(authErrorText(err));
  } finally {
    btn.disabled = false;
  }
});
document.getElementById('authForgot').addEventListener('click', async () => {
  const email = document.getElementById('authEmail').value.trim();
  if (!email) { setAuthMsg(T('needEmail')); document.getElementById('authEmail').focus(); return; }
  try { await Account.forgot(email); setAuthMsg(T('resetSent')); } catch (err) { setAuthMsg(authErrorText(err)); }
});
document.getElementById('continueAs').addEventListener('click', async () => {
  try {
    await Account.signIn();
    await afterSignIn();
    toast(T('welcomeBack'));
    go('home');
  } catch { toast(T('errGeneric')); }
});
document.getElementById('skipSignIn').addEventListener('click', () => {
  skippedSignIn = true;
  store.set('hh.skipSignIn', true);
  go('home');
});
function renderSignin() {
  document.getElementById('authForm').hidden = PREVIEW;
  document.getElementById('previewAuth').hidden = !PREVIEW;
  if (PREVIEW) {
    const btn = document.getElementById('continueAs');
    const label = document.getElementById('continueAsLabel');
    label.textContent = T('continueAsYou');
    btn.disabled = true;
    ClaudeAccount.ready.then(() => {
      btn.disabled = !ClaudeAccount.available();
      label.textContent = ClaudeAccount.name ? T('continueAs', { name: ClaudeAccount.name }) : T('continueAsYou');
    });
  }
  updateAuthMode();
}

/* ---------- Routing ---------- */
// The installed app routes with the URL hash so the phone's back button works.
// The preview keeps routes in memory, since the artifact frame owns its URL.
const backBtn = document.getElementById('backBtn');
const settingsBtn = document.getElementById('settingsBtn');
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
// Go somewhere without leaving the current screen in the back history (after a form is done).
function goReplace(route) {
  if (PREVIEW) { memStack.pop(); memStack.push(route); render(); return; }
  location.replace('#' + route);
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

function needsSignIn() { return Account.configured() && !Account.signedIn() && !skippedSignIn; }
function screenNow() { return currentRoute().split(':')[0]; }

function render() {
  let [screen, arg] = currentRoute().split(':');
  if (needsSignIn() && screen !== 'signin') screen = 'signin';
  stopEmergency();
  disarm();
  if (screen !== 'read' && synth && reading) { synth.cancel(); reading = false; }

  const section = document.getElementById(`screen-${screen}`);
  if (!section) { go('home'); return; }
  document.querySelectorAll('.screen').forEach(s => { s.hidden = s !== section; });

  backBtn.hidden = screen === 'home' || screen === 'signin';
  settingsBtn.hidden = screen === 'signin';
  let title = T(section.dataset.title);

  if (screen === 'signin') renderSignin();
  if (screen === 'home') renderHome();
  if (screen === 'request') title = renderRequest(arg);
  if (screen === 'location') findMe();
  if (screen === 'family') renderFamily();
  if (screen === 'history') renderHistory();
  if (screen === 'settings') renderSettings();
  if (screen === 'emergency') startEmergency();
  if (screen === 'read') renderRead();
  if (screen === 'meds') renderMeds();
  if (screen === 'medadd') renderMedAdd();

  titleEl.textContent = title;
  document.title = screen === 'home' || screen === 'signin' ? T('appName') : `${title} · ${T('appName')}`;
  window.scrollTo(0, 0);
  titleEl.focus({ preventScroll: true });

  if (screen === 'signin') speak(T('signinSay'));
  else if (screen === 'help') speak(T('helpSay'));
  else if (screen === 'request') {
    speak(pendingText ? T('wrote', { title, text: pendingText }) : T('reqIntro', { title, prompt: req(currentRequest).prompt }));
    pendingText = '';
  } else if (screen === 'family') speak(T('familyIntro'));
  else if (screen === 'history') speak(T('historyIntro', { n: requests.length }));
  else if (screen === 'settings') speak(T('settingsIntro'));
  else if (screen === 'read') speak(T('readIntro'));
  else if (screen === 'meds') speak(medsSummary());
  else if (screen === 'medadd') speak(T('addMed'));
}

/* ---------- Home ---------- */
let greeted = false;
function greetingParts() {
  const now = new Date();
  const h = now.getHours();
  const part = T(h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening');
  const name = settings.name ? T('greetName', { name: settings.name }) : '';
  return {
    hello: `${part}${name}`,
    day: now.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long' }),
    time: now.toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' }),
  };
}
function greetingText() {
  const g = greetingParts();
  return T('greet', { part: g.hello, name: '', day: g.day, time: g.time });
}
function renderToday() {
  const g = greetingParts();
  document.getElementById('todayHello').textContent = g.hello;
  document.getElementById('todayTime').textContent = g.time;
  document.getElementById('todayDate').textContent = g.day;
}
function renderHome() {
  renderToday();
  const next = nextDose();
  document.getElementById('medsSub').textContent = next ? T('nextDose', { name: next.med.name, time: fmtTime(next.time) }) : T('medsSubEmpty');
  const fam = familyContacts().map(c => c.name);
  document.getElementById('familySub').textContent = fam.length ? fam.join(listSep()) : T('familySubEmpty');

  const notices = document.getElementById('homeNotices');
  notices.innerHTML = '';
  const last = store.get('hh.lastReply', null);
  if (last && Date.now() - last.at < 6 * 3600 * 1000) {
    const n = document.createElement('button');
    n.className = 'notice';
    n.dataset.instant = '';
    n.innerHTML = `<span class="ico">${iconSVG('check')}</span><span></span>`;
    n.lastChild.textContent = replyText(last);
    n.addEventListener('click', () => speak(replyText(last), { force: true }));
    notices.appendChild(n);
  }
  if (!settings.helperPhone) {
    const btn = makeBtn('btn-outline', 'gear', T('setupFirst'));
    btn.dataset.go = 'settings';
    btn.dataset.say = 'setupFirstSay';
    notices.appendChild(btn);
  }
  if (greeted) { speak(T('homeSay')); return; }
  greeted = true;
  // Browsers only allow speech after the first touch, so greet on it.
  document.addEventListener('pointerdown', () => speak(`${greetingText()} ${T('homeSay')}`), { once: true });
}
setInterval(() => { if (screenNow() === 'home') renderToday(); }, 30000);

document.getElementById('heroMic').addEventListener('click', async () => {
  const said = await listen();
  if (!said) { speak(T('didntHear')); return; }
  handleCommand(said);
});

// Keyword matching in English and Arabic (Egyptian and Modern Standard words).
const COMMANDS = [
  ['emergency', /emergenc|\bsos\b|ambulance|police|\bfire\b|i fell|fallen|i('m| am) hurt|help me now|طوارئ|طوارىء|اسعاف|إسعاف|نجدة|النجده|شرطة|بوليس|حريق|وقعت|الحقوني|إلحقوني/],
  ['location', /where am i|where i am|my location|location|address|أنا فين|انا فين|أين أنا|اين انا|مكاني|موقعي|عنواني/],
  ['read', /read (this|it|text|the (label|letter|box|paper))|camera|photo|scan|what does (this|it) say|اقرأ لي|اقرا لي|اقرأ الورق|كاميرا|صورة|صوّر|ايه المكتوب|إيه المكتوب/],
  ['meds', /remind|my medicines|my pills|medicine times|pill times|تذكير|ذكرني|ذكّرني|أدويتي|ادويتي|مواعيد الدوا|مواعيد العلاج/],
  ['call', /\b(call|phone|ring)\b|اتصل|إتصل|كلم|كلّم|رن على/],
  ['medicine', /medic|pharm|pill|tablet|drug|prescription|drops|دوا|دواء|صيدلي|حبوب|برشام|روشت|قطرة/],
  ['ride', /\bride\b|taxi|\bcar\b|drive|take me|go to|lift|uber|careem|مشوار|عربية|تاكسي|اوبر|أوبر|كريم|وصلني|وصّلني|وديني|ودّيني|خدني|توصيلة|اروح|أروح|أذهب/],
  ['history', /my requests|history|طلباتي|السجل/],
  ['groceries', /grocer|food|shop|bread|milk|egg|water|deliver|buy|rice|fruit|vegetable|tea|sugar|بقالة|بقاله|أكل|اكل|طعام|عيش|خبز|لبن|حليب|بيض|مية|مياه|ماء|رز|أرز|فاكه|خضار|شاي|سكر|سوبر ?ماركت|اشتري|أشتري|طلبات|توصيل/],
  ['helper', /help|assist|someone|read|clean|cook|walk|fix|bill|lonely|chat|مساعد|ساعد|اقرا|اقرأ|نظاف|تنظيف|طبخ|اطبخ|اتمشى|تمشية|تصليح|فاتور|وحيد|ونس/],
  ['settings', /setting|اعدادات|إعدادات/],
  ['family', /family|عيلة|عائلة|أهلي|اهلي/],
];
function handleCommand(text) {
  const t = text.toLowerCase();
  const match = (COMMANDS.find(([, re]) => re.test(t)) || [])[0];
  switch (match) {
    case 'emergency': return go('emergency');
    case 'location': return go('location');
    case 'read': return go('read');
    case 'meds': return go('meds');
    case 'call': {
      const fam = familyContacts().find(c => t.includes(c.name.toLowerCase().replace(/\s*\(.*\)$/, '')));
      return fam ? callNumber(fam.phone, fam.name) : go('family');
    }
    case 'medicine': case 'ride': case 'groceries': case 'helper':
      pendingText = text;
      return go(`request:${match}`);
    case 'history': return go('history');
    case 'settings': return go('settings');
    case 'family': return go('family');
    default: speak(T('notSure', { text }));
  }
}

/* ---------- Request ---------- */
function renderRequest(type) {
  currentRequest = type in REQUESTS ? type : 'helper';
  const cfg = req(currentRequest);
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
  box.value = (box.value ? box.value + listSep() : '') + said;
  speak(T('wroteReady', { text: said }));
});
function helperLink(token) {
  return `${location.origin}${location.pathname.replace(/[^/]*$/, '')}helper.html?r=${token}`;
}
function greetLine() {
  const helperName = settings.helperName ? T('msgName', { name: settings.helperName }) : '';
  return settings.name ? T('msgHello', { name: helperName, me: settings.name }) : T('msgHelloAnon', { name: helperName });
}
document.getElementById('sendReqBtn').addEventListener('click', async () => {
  const cfg = req(currentRequest);
  const picked = [...document.querySelectorAll('#quickChips .chip[aria-pressed="true"]')].map(b => b.textContent);
  const typedText = document.getElementById('reqText').value.trim();
  const details = [...picked, typedText].filter(Boolean).join(listSep());
  if (!details) { toast(T('needDetails')); return; }
  if (!settings.helperPhone) { toast(T('needHelperPhone')); go('settings'); return; }

  speak(T('sending'));
  const pos = document.getElementById('shareLoc').checked ? await getPosition() : null;
  const lines = [greetLine(), `${cfg.intro} ${details}.`];
  if (settings.address) lines.push(T('msgAddress', { a: settings.address }));
  if (pos) lines.push(T('msgLocation', { l: mapsLink(pos) }));
  const token = await addHistory({ type: currentRequest, text: details }, {
    requester_name: settings.name || null, address: settings.address || null, location_url: pos ? mapsLink(pos) : null,
  });
  if (token) lines.push(T('replyLink', { url: helperLink(token) }));
  lines.push(T('msgFooter'));
  sendMessage(settings.helperPhone, lines.join('\n'));
  if (PREVIEW) simulateReply(currentRequest, details);
});

/* ---------- Helper replies ---------- */
function replyText(r) {
  const name = settings.helperName || T('yourHelper');
  const what = r.type === 'location' ? `${T('locationShared')}` : `${req(r.type).title}: ${r.text}`;
  return T(`reply_${r.status}`, { name, what });
}
function announceReply(r) {
  store.set('hh.lastReply', { type: r.type, text: r.text, status: r.status, at: Date.now() });
  const msg = replyText(r);
  toast(msg, { say: false });
  speak(msg, { force: true });
  if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
  notify(T('appName'), msg);
  if (screenNow() === 'home') renderHome();
  if (screenNow() === 'history') renderHistory();
}
let polling = false;
async function checkReplies() {
  if (polling || PREVIEW || !Account.signedIn() || document.hidden) return;
  polling = true;
  try {
    const since = store.get('hh.lastReplyAt', new Date().toISOString());
    const rows = await Account.repliesSince(since);
    if (rows && rows.length) {
      store.set('hh.lastReplyAt', rows[rows.length - 1].status_at);
      requests = await Account.loadRequests();
      store.set('hh.history', requests);
      rows.forEach(announceReply);
    }
  } catch { /* try again next time */ }
  polling = false;
}
setInterval(checkReplies, 20000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) { checkReplies(); checkReminders(); } });

// The preview has no server, so it plays out an example reply.
function simulateReply(type, text) {
  setTimeout(() => {
    const item = requests.find(r => r.text === text && r.type === type);
    if (item) { item.status = 'coming'; store.set('hh.history', requests); if (Account.signedIn()) Account.saveRequests().catch(() => {}); }
    announceReply({ type, text, status: 'coming' });
  }, 9000);
}

/* ---------- Read text with the camera ---------- */
let reading = false;
let ocrWorker = null;
const photoInput = document.getElementById('photoInput');
function renderRead() {
  document.getElementById('readStatus').textContent = '';
  document.getElementById('readResult').hidden = true;
  document.getElementById('readActions').hidden = true;
}
document.getElementById('photoBtn').addEventListener('click', () => { photoInput.value = ''; photoInput.click(); });
photoInput.addEventListener('change', () => { if (photoInput.files[0]) readPhoto(photoInput.files[0]); });

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}
// Phone photos are huge; a smaller copy reads just as well and much faster.
async function shrink(file, max = 1800) {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}
async function ocrOnPhone(file) {
  if (!window.Tesseract) {
    setReadStatus(T('readLoading'));
    await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js');
  }
  if (!ocrWorker) {
    const langs = settings.lang === 'ar' ? ['ara', 'eng'] : ['eng', 'ara'];
    ocrWorker = await window.Tesseract.createWorker(langs);
  }
  setReadStatus(T('readingNow'));
  const { data } = await ocrWorker.recognize(await shrink(file));
  return data.text || '';
}
async function ocrWithClaude(file) {
  const sample = await useCapability('sample');
  const limits = sample ? await sample.limits().catch(() => null) : null;
  if (!sample || !limits || !limits.images) throw new Error('unavailable');
  const blob = await shrinkToBlob(file);
  const res = await sample(
    'This photo was taken by a blind or elderly person who wants to hear what it says. ' +
    'Write out all the readable text in reading order, in its original language. ' +
    'If it is a medicine box or label, give the medicine name, strength and any warnings first. ' +
    'Reply with only the text. If there is no readable text, reply exactly NO_TEXT.',
    { images: [blob] },
  );
  return res.text === 'NO_TEXT' ? '' : res.text;
}
async function shrinkToBlob(file) {
  const canvas = await shrink(file, 1600);
  return new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.85));
}
function setReadStatus(text) {
  document.getElementById('readStatus').textContent = text;
  speak(text, { force: true });
}
function cleanText(text) {
  return text.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(l => /[\p{L}\p{N}]{2,}/u.test(l)).join('\n');
}
async function readPhoto(file) {
  document.getElementById('readResult').hidden = true;
  document.getElementById('readActions').hidden = true;
  setReadStatus(T('readingNow'));
  let text = '';
  try {
    text = cleanText(PREVIEW ? await ocrWithClaude(file) : await ocrOnPhone(file));
  } catch (e) {
    setReadStatus(T(PREVIEW && e.message === 'unavailable' ? 'readNeedsApp' : 'readFail'));
    return;
  }
  if (!text) { setReadStatus(T('readNothing')); return; }
  document.getElementById('readStatus').textContent = '';
  document.getElementById('readText').textContent = text;
  document.getElementById('readResult').hidden = false;
  document.getElementById('readActions').hidden = false;
  reading = true;
  speakLong(text);
}
document.getElementById('readAgainBtn').addEventListener('click', () => {
  reading = true;
  speakLong(document.getElementById('readText').textContent);
});
document.getElementById('stopReadBtn').addEventListener('click', () => { reading = false; synth && synth.cancel(); });

/* ---------- Medicines and reminders ---------- */
function todayKey(d = new Date()) { return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
function doseKey(med, time, d) { return `${todayKey(d)}|${med.id}|${time}`; }
function getDoses() { return store.get('hh.doses', {}); }
function setDose(key, value) {
  const doses = getDoses();
  doses[key] = value;
  // Keep about two weeks.
  const keys = Object.keys(doses);
  if (keys.length > 300) keys.slice(0, keys.length - 300).forEach(k => delete doses[k]);
  store.set('hh.doses', doses);
}
function nextDose() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  let best = null;
  (settings.meds || []).forEach(med => med.times.forEach(time => {
    const [h, m] = time.split(':').map(Number);
    let mins = h * 60 + m - nowMin;
    if (mins < 0) mins += 24 * 60;
    if (!best || mins < best.mins) best = { med, time, mins };
  }));
  return best;
}
function medsSummary() {
  const meds = settings.meds || [];
  if (!meds.length) return T('medsIntroNone');
  const next = nextDose();
  return T('medsIntro', { n: meds.length, next: next ? T('nextDose', { name: next.med.name, time: fmtTime(next.time) }) + '.' : '' });
}
function renderMeds() {
  const list = document.getElementById('medList');
  list.innerHTML = '';
  const meds = settings.meds || [];
  if (!meds.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = T('noMeds');
    list.appendChild(p);
    return;
  }
  meds.forEach(med => {
    const card = document.createElement('div');
    card.className = 'card med';
    const main = document.createElement('div');
    main.className = 'med-main';
    const name = document.createElement('p');
    name.className = 'med-name';
    name.textContent = med.name;
    const times = document.createElement('p');
    times.className = 'med-times';
    times.textContent = med.times.map(fmtTime).join(' · ');
    main.append(name, times);
    const del = document.createElement('button');
    del.className = 'iconbtn iconbtn-lg';
    del.dataset.say = T('deleteMed', { name: med.name });
    del.setAttribute('aria-label', T('deleteMed', { name: med.name }));
    del.innerHTML = `<span class="ico">${iconSVG('trash')}</span>`;
    del.addEventListener('click', () => {
      saveSettings({ ...settings, meds: settings.meds.filter(m => m.id !== med.id) });
      toast(T('medDeleted', { name: med.name }));
      renderMeds();
    });
    card.append(main, del);
    list.appendChild(card);
  });
}
function addTimeRow(value) {
  const wrap = document.getElementById('medTimes');
  const row = document.createElement('div');
  row.className = 'time-row';
  const input = document.createElement('input');
  input.type = 'time';
  input.className = 'field';
  input.value = value;
  input.setAttribute('aria-label', T('medTimes'));
  const del = document.createElement('button');
  del.type = 'button';
  del.className = 'iconbtn iconbtn-lg';
  del.dataset.instant = '';
  del.setAttribute('aria-label', T('removeTime'));
  del.innerHTML = `<span class="ico">${iconSVG('trash')}</span>`;
  del.addEventListener('click', () => { row.remove(); });
  row.append(input, del);
  wrap.appendChild(row);
}
function renderMedAdd() {
  document.getElementById('medName').value = '';
  document.getElementById('medTimes').innerHTML = '';
  addTimeRow('08:00');
}
document.getElementById('addTimeBtn').addEventListener('click', () => {
  if (document.querySelectorAll('#medTimes input').length < 6) addTimeRow('20:00');
});
document.getElementById('medNameMic').addEventListener('click', async () => {
  const said = await listen();
  if (said) { document.getElementById('medName').value = said; speak(said, { force: true }); }
});
document.getElementById('saveMedBtn').addEventListener('click', () => {
  const name = document.getElementById('medName').value.trim();
  const times = [...new Set([...document.querySelectorAll('#medTimes input')].map(i => i.value).filter(Boolean))].sort();
  if (!name) { toast(T('needMedName')); document.getElementById('medName').focus(); return; }
  if (!times.length) { toast(T('needMedTime')); return; }
  const med = { id: Date.now().toString(36), name, times };
  saveSettings({ ...settings, meds: [...(settings.meds || []), med] });
  askNotificationPermission();
  toast(T('medSaved', { times: times.map(fmtTime).join(listSep()) }));
  goReplace('meds');
});

// Reminders: checked every 20 seconds while the app is open.
const reminderEl = document.getElementById('reminder');
let reminderNow = null; // { med, time, key }
let reminderRepeat = null;
function checkReminders() {
  if (reminderNow || needsSignIn()) return;
  const now = new Date();
  const doses = getDoses();
  for (const med of settings.meds || []) {
    for (const time of med.times) {
      const [h, m] = time.split(':').map(Number);
      const due = new Date(now); due.setHours(h, m, 0, 0);
      const late = now - due;
      if (late < 0 || late > 3 * 3600 * 1000) continue; // due within the last 3 hours
      const key = doseKey(med, time, now);
      const state = doses[key];
      if (state === 'taken' || state === 'skipped') continue;
      if (state && state.snooze && Date.now() < state.snooze) continue;
      showReminder(med, time, key);
      return;
    }
  }
}
function showReminder(med, time, key) {
  reminderNow = { med, time, key };
  document.getElementById('reminderWhat').textContent = `${med.name} · ${fmtTime(time)}`;
  reminderEl.hidden = false;
  document.getElementById('tookItBtn').focus();
  const say = () => speak(T('remindSay', { name: med.name }), { force: true });
  say();
  reminderRepeat = setInterval(say, 45000);
  if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 300]);
  notify(T('remindTitle'), T('remindSay', { name: med.name }));
}
function closeReminder(value, messageKey) {
  if (!reminderNow) return;
  setDose(reminderNow.key, value);
  const name = reminderNow.med.name;
  reminderNow = null;
  clearInterval(reminderRepeat);
  reminderEl.hidden = true;
  speak(T(messageKey, { name }), { force: true });
  if (screenNow() === 'home') renderHome();
}
document.getElementById('tookItBtn').addEventListener('click', () => closeReminder('taken', 'doseTaken'));
document.getElementById('snoozeBtn').addEventListener('click', () => closeReminder({ snooze: Date.now() + 10 * 60000 }, 'snoozed'));
document.getElementById('skipDoseBtn').addEventListener('click', () => closeReminder('skipped', 'doseSkipped'));
setInterval(checkReminders, 20000);

function askNotificationPermission() {
  if (PREVIEW || !('Notification' in window) || Notification.permission !== 'default') return;
  Notification.requestPermission().catch(() => {});
}
// A phone notification as well, for when the screen is off or another app is open.
function notify(title, body) {
  if (PREVIEW || !document.hidden || !('Notification' in window) || Notification.permission !== 'granted') return;
  if (navigator.serviceWorker && navigator.serviceWorker.ready) {
    navigator.serviceWorker.ready.then(reg => reg.showNotification(title, { body, icon: 'icons/icon.svg', tag: 'easy-help', renotify: true, vibrate: [300, 150, 300] })).catch(() => {});
  }
}

/* ---------- Location ---------- */
let lastPlace = null; // { pos, address }

function getPosition() {
  return new Promise(resolve => {
    if (PREVIEW || !navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  });
}
function mapsLink(pos) { return `https://maps.google.com/?q=${pos.lat.toFixed(5)},${pos.lng.toFixed(5)}`; }

// Street address from OpenStreetMap (free, no key needed). Tries twice; the service is sometimes busy.
async function addressFor(pos) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&addressdetails=1&lat=${pos.lat}&lon=${pos.lng}&accept-language=${settings.lang}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error();
      const j = await res.json();
      const a = j.address || {};
      const street = [a.house_number, a.road || a.pedestrian || a.footway].filter(Boolean).join(' ');
      const area = a.neighbourhood || a.suburb || a.quarter || a.city_district;
      const city = a.city || a.town || a.village || a.state;
      const parts = [street, area, city].filter(Boolean);
      return parts.length ? parts.join(listSep()) : (j.display_name || null);
    } catch {
      await new Promise(r => setTimeout(r, 1200));
    }
  }
  return null;
}

async function findMe() {
  const addrEl = document.getElementById('placeAddress');
  const noteEl = document.getElementById('placeNote');
  const maps = document.getElementById('openMaps');
  addrEl.textContent = T('finding');
  noteEl.textContent = '';
  maps.hidden = true;
  speak(T('finding'));

  if (PREVIEW) {
    lastPlace = { pos: { lat: 30.04442, lng: 31.23571, acc: 20 }, address: T('exampleLocation') };
  } else {
    const pos = await getPosition();
    if (!pos) {
      lastPlace = null;
      addrEl.textContent = T('noGps');
      speak(T('noGps'));
      return;
    }
    const address = await addressFor(pos);
    lastPlace = { pos, address: address || T('nearCoords', { lat: pos.lat.toFixed(4), lng: pos.lng.toFixed(4) }) };
  }
  if (screenNow() !== 'location') return; // they left while we were looking
  addrEl.textContent = lastPlace.address;
  noteEl.textContent = PREVIEW ? T('previewLocation') : T('accuracy', { m: Math.round(lastPlace.pos.acc).toLocaleString(locale()) });
  maps.href = mapsLink(lastPlace.pos);
  maps.hidden = false;
  speak(T('youAreAtSay', { place: lastPlace.address }));
}
document.getElementById('readPlace').addEventListener('click', () => {
  if (lastPlace) speak(T('youAreAtSay', { place: lastPlace.address }), { force: true });
  else findMe();
});
document.getElementById('refreshPlace').addEventListener('click', findMe);
document.getElementById('savePlace').addEventListener('click', () => {
  if (!lastPlace) return;
  saveSettings({ ...settings, address: lastPlace.address });
  toast(T('homeSaved'));
});
document.getElementById('sendPlace').addEventListener('click', async () => {
  if (!settings.helperPhone) { toast(T('needHelperPhone')); return; }
  if (!lastPlace) { findMe(); return; }
  const lines = [greetLine(), T('msgHere', { p: lastPlace.address }), T('msgLocation', { l: mapsLink(lastPlace.pos) }), T('msgFooter')];
  await addHistory({ type: 'location', text: lastPlace.address });
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
  try { navigator.clipboard.writeText(text).then(() => toast(T('copied')), fallback); } catch { fallback(); }
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

/* ---------- History ---------- */
async function addHistory(item, extra) {
  requests.unshift({ ...item, status: 'sent', at: Date.now() });
  requests = requests.slice(0, 50);
  store.set('hh.history', requests);
  if (!Account.signedIn()) return null;
  try { return await Account.addRequest(item, extra); } catch { return null; }
}
function historyTitle(type) { return type === 'location' ? T('locationShared') : req(type).title; }
function drawHistory() {
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
    const title = historyTitle(h.type);
    const when = new Date(h.at).toLocaleString(locale(), { weekday: 'long', hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short' });
    const status = STATUSES.includes(h.status) ? h.status : 'sent';
    const btn = makeBtn('btn-gray history-item', REQUEST_ICONS[h.type] || 'list', `${title}: ${h.text}`, when);
    btn.dataset.instant = '';
    const chip = document.createElement('span');
    chip.className = 'chip-status';
    chip.dataset.s = status;
    chip.textContent = T(`status_${status}`);
    btn.querySelector('.b-text').appendChild(chip);
    btn.addEventListener('click', () => speak(`${T('sentAt', { title, text: h.text, when })} ${T(`status_${status}`)}.`, { force: true }));
    list.appendChild(btn);
  });
}
function renderHistory() {
  drawHistory();
  if (Account.signedIn()) {
    Account.loadRequests().then(r => {
      requests = r;
      store.set('hh.history', requests);
      if (screenNow() === 'history') drawHistory();
    }).catch(() => {});
  }
}
document.getElementById('clearHistory').addEventListener('click', () => {
  requests = [];
  store.set('hh.history', requests);
  if (Account.signedIn()) Account.clearRequests().catch(() => {});
  drawHistory();
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
    const b = makeBtn('btn-blue', 'gear', T('addFamily'));
    b.dataset.go = 'settings';
    b.dataset.say = 'addFamily';
    list.append(p, b);
    return;
  }
  people.forEach(p => {
    const label = T('callX', { name: p.name });
    const b = makeBtn('btn-green btn-home', 'phone', label, p.phone);
    b.dataset.say = label;
    b.querySelector('.b-sub').dir = 'ltr';
    b.addEventListener('click', () => callNumber(p.phone, p.name));
    list.appendChild(b);
  });
}

/* ---------- Emergency ---------- */
function startEmergency() {
  const text = document.getElementById('countdownText');
  const num = cleanPhone(settings.emergency);
  if (!num) { text.textContent = T('noEmergencyText'); speak(T('noEmergencySay')); return; }
  const spokenNum = num.split('').join(' ');
  const total = parseInt(settings.countdown, 10) || 0;
  if (!total || PREVIEW) {
    text.textContent = T('tapCallNowText', { num });
    speak(T('tapCallNowSay', { num: spokenNum }));
    return;
  }
  let left = total;
  const tick = () => {
    if (left <= 0) { stopEmergency(); text.textContent = T('callingNum', { num }); callNumber(num); return; }
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
  const pos = await getPosition();
  const lines = [settings.name ? T('emergencyMsg', { name: settings.name }) : T('emergencyMsgAnon')];
  if (settings.address) lines.push(T('msgAddress', { a: settings.address }));
  if (pos) lines.push(T('msgLocation', { l: mapsLink(pos) }));
  const token = await addHistory({ type: 'helper', text: T('emergencyAlert') }, {
    requester_name: settings.name || null, address: settings.address || null, location_url: pos ? mapsLink(pos) : null,
  });
  if (token) lines.push(T('replyLink', { url: helperLink(token) }));
  sendMessage(settings.helperPhone, lines.join('\n'));
});

/* ---------- Settings ---------- */
const form = document.getElementById('settingsForm');
function renderAccount() {
  const line = document.getElementById('accountLine');
  const btnLabel = document.getElementById('accountBtnLabel');
  const signedIn = Account.signedIn();
  line.textContent = signedIn ? T('signedInAs', { who: Account.who() }) : T('notSignedIn');
  btnLabel.textContent = T(signedIn ? 'signOut' : 'signInNow');
  document.getElementById('passwordChange').hidden = !(signedIn && !PREVIEW);
}
function renderSettings() {
  renderAccount();
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
  if (Account.signedIn()) Account.saveSettings(settings).catch(() => {});
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
document.getElementById('accountBtn').addEventListener('click', async () => {
  if (Account.signedIn()) {
    await Account.signOut();
    toast(T('signedOut'));
  }
  skippedSignIn = false;
  store.set('hh.skipSignIn', false);
  go('signin');
});
document.getElementById('savePassword').addEventListener('click', async () => {
  const input = document.getElementById('newPassword');
  if (input.value.length < 6) { toast(T('needPassword')); input.focus(); return; }
  try {
    await Account.changePassword(input.value);
    input.value = '';
    toast(T('passwordChanged'));
  } catch (err) { toast(authErrorText(err)); }
});

// One-tap language switch in the top bar.
document.getElementById('langBtn').addEventListener('click', () => {
  saveSettings({ ...settings, lang: settings.lang === 'ar' ? 'en' : 'ar' });
  render();
});

/* ---------- Start ---------- */
(async function start() {
  if (PREVIEW) {
    document.documentElement.classList.add('preview');
    document.getElementById('previewBanner').hidden = false;
    ClaudeAccount.init().then(() => {
      if (ClaudeAccount.signedIn()) { afterSignIn(); render(); }
    });
    // Clearly marked examples so every screen works in the preview.
    if (!store.get('hh.settings', null)) {
      const ex = STRINGS[settings.lang].example;
      Object.assign(settings, {
        helperName: `Sara ${ex}`, helperPhone: '+20 100 000 0000',
        fam1Name: `Omar ${ex}`, fam1Phone: '+20 111 000 0000', emergency: '123', countdown: '0',
        meds: [{ id: 'ex1', name: `${settings.lang === 'ar' ? 'دواء الضغط' : 'Blood pressure tablet'} ${ex}`, times: ['08:00', '20:00'] }],
      });
    }
  }
  paintIcons();
  applyLook();
  applyLanguage();

  let linkType = null;
  if (!PREVIEW && SupabaseAccount.configured()) linkType = await SupabaseAccount.takeLinkTokens();
  if (linkType) {
    await afterSignIn();
    if (linkType === 'recovery') { go('settings'); toast(T('recoveredSay')); return; }
    toast(T('welcomeBack'));
    go('home');
    return;
  }
  render();
  if (Account.signedIn()) afterSignIn().then(() => { if (screenNow() === 'home') renderHome(); checkReplies(); });
  checkReminders();
})();
if (synth) synth.getVoices(); // starts loading voices early on Chrome

if (!PREVIEW && 'serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
