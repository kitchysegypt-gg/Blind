'use strict';

/* =========================================================
   Easy Help — a simple helper app for elders
   ========================================================= */

const PREVIEW = !!window.HH_PREVIEW; // hosted preview: no calls, texts or GPS

// Supabase project for accounts. The publishable key is safe to ship in an app;
// row-level security keeps each person's data private.
const SUPABASE_URL = 'https://sjlgitmupecmqhfmuyds.supabase.co';
const SUPABASE_KEY = 'sb_publishable_sgYgEuoQbf1UhuED29P3zg_TQRm_mZF';

/* ---------- Icons: plain line symbols ---------- */
const ICONS = {
  homeheart: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M12 17.5s-3-1.8-3-3.8a1.6 1.6 0 0 1 3-.9 1.6 1.6 0 0 1 3 .9c0 2-3 3.8-3 3.8z"/>',
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  pill: '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  phone: '<path d="M21.5 16.6v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 3.9 2 2 0 0 1 3.6 1.7h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.5 9.6a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  bag: '<path d="M5.5 8h13l-1 13h-11z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  car: '<path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3 16.5h18M4 12h16"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>',
  hands: '<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.7 2.7 0 0 0 16 4a2.7 2.7 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chev: '<path d="m9 18 6-6-6-6"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  send: '<path d="M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8-8-4z"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.4 6.4L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 15.4-6.4L21 8"/><path d="M21 3v5h-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
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
    appName: 'Easy Help', skip: 'Skip to main content', back: 'Back',
    previewBanner: 'Preview. Calls, messages and your location are shown here instead of used. Install the app on a phone for the real thing.',
    tabsLabel: 'Main sections', tabHome: 'Home', tabRequests: 'Requests', tabMeds: 'Medicines', tabLocation: 'Location', tabProfile: 'Profile',

    signinIntro: 'Sign in so your helper, family, medicines and requests are kept safe.',
    email: 'Email', password: 'Password', signIn: 'Sign in', createAccount: 'Create account',
    newHere: "I'm new. Create an account", haveAccount: 'I already have an account',
    forgot: 'I forgot my password', noAccount: 'Use without an account',
    continueAs: 'Continue as {name}', continueAsYou: 'Continue with my Claude account',
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
    recovered: 'You are signed in. Please choose a new password below.',

    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', greetName: ', {name}',
    emergency: 'Emergency', emergencySub: 'Call for help now',
    needSomething: 'What do you need today?',
    groceries: 'Groceries', groceriesSub: 'Food and shopping brought to your door',
    medicine: 'Pharmacy', medicineSub: 'Medicine picked up for you',
    ride: 'A ride', rideSub: 'To the doctor, the market or family',
    helper: 'Help at home', helperSub: 'Cleaning, cooking, repairs or company',
    nextMedTitle: 'Next medicine', seeAll: 'See all', edit: 'Edit',
    noMedsHome: 'No reminders yet', noMedsHomeSub: 'Tap to add your medicines',
    nextDoseTitle: '{name}', nextDoseSub: 'Today at {time}', nextDoseTomorrow: 'Tomorrow at {time}',
    familyTitle: 'Family', callBtn: 'Call', noFamily: 'Add your family numbers so you can call them with one tap.', addFamily: 'Add family numbers',
    familyN: 'Family member {n}', myHelperName: 'My helper', helperTag: 'Helper',
    setupHelper: 'Add your helper', setupHelperSub: 'Requests go to them by WhatsApp or text message.',

    otherLabel: 'Anything else? (optional)',
    whenLabel: 'When do you need it?', whenNow: 'Right away', whenToday: 'Later today', whenTomorrow: 'Tomorrow',
    shareLoc: 'Include my location', shareLocRide: 'Pick me up from where I am now',
    sendTo: 'Send to {name}', sendReq: 'Send request',
    sendHintTo: 'Sent by {via}. {name} can answer with one tap, and you will see the answer in Requests.',
    needHelperPhone: "Please add your helper's phone number in Profile first.",
    needDetails: 'Please choose or write what you need first.',
    yourHelper: 'your helper', viaSms: 'text message', viaWa: 'WhatsApp',
    opening: 'Opening {via}. Press send to finish.',
    msgHello: 'Hello{name}, this is {me}.', msgHelloAnon: 'Hello{name}.', msgName: ' {name}',
    msgWhen: 'When: {w}', msgAddress: 'My address: {a}', msgLocation: 'My location: {l}', msgHere: 'I am at: {p}',
    msgFooter: '(Sent with Easy Help)', replyLink: 'Tap to answer: {url}',

    requestsLead: 'Requests you sent, and your helper’s answers.',
    noRequests: 'No requests yet. Choose a service on the Home tab to ask for help.',
    clearList: 'Clear list', listEmpty: 'Your list is now empty.',
    locationShared: 'Location shared', emergencyAlert: 'Emergency alert',
    status_sent: 'Sent', status_seen: 'Seen', status_coming: 'On the way', status_later: 'Coming later', status_cant: "Can't help", status_done: 'Done',
    reply_seen: '{name} has seen your request: {what}.', reply_coming: '{name} is on the way: {what}.',
    reply_later: '{name} will come later: {what}.', reply_cant: "{name} can't help with this one: {what}.",
    reply_done: '{name} says it is done: {what}.',

    medsLead: 'You will get a reminder at each time while Easy Help is open.',
    noMeds: 'No medicines yet. Tap "Add a medicine" to set your first reminder.',
    addMed: 'Add a medicine', medName: 'Medicine name', medNamePh: 'For example: Concor 5 mg',
    medTimes: 'Times to take it', addTime: 'Add another time', saveMed: 'Save medicine', removeTime: 'Remove this time',
    deleteMed: 'Remove {name}', medSaved: 'Saved. Reminders at {times}.', medDeleted: '{name} removed.',
    needMedName: 'Please type the medicine name.', needMedTime: 'Please add at least one time.',
    medsHint: 'Keep Easy Help open on your phone so the reminders can appear.',
    dose_taken: 'Taken', dose_skipped: 'Skipped', dose_due: 'Due now', dose_missed: 'Not taken', dose_later: 'Later',
    remindTitle: 'Time for your medicine', tookIt: 'I took it', later10: 'Remind me in 10 minutes', skipDose: 'Skip this one',
    doseTaken: 'Well done. Marked as taken.', snoozed: 'We will remind you again in 10 minutes.', doseSkipped: 'Skipped.',

    youAreAt: 'You are here', finding: 'Finding where you are…', mapAlt: 'Map of where you are',
    noGps: 'We can’t find your location. Please turn on location for this app in your phone settings, then tap "Update".',
    accuracy: 'Accurate to about {m} metres.', nearCoords: 'Near {lat}, {lng}',
    sendLocation: 'Send my location to {name}', openMaps: 'Open in Maps', refresh: 'Update',
    homeAddress: 'My home', noHome: 'No home address saved yet. When you are at home, tap "Save as home".',
    directionsHome: 'Directions home', saveHome: 'Save as home', homeSaved: 'Saved as your home address.',
    fromHome: 'You are about {d} from home.', atHome: 'You are at home.',
    exampleLocation: 'Tahrir Square, Downtown, Cairo',
    previewLocation: 'Example. In the installed app this shows your real address.',

    account: 'Account', signedInAs: 'Signed in as {who}', notSignedIn: 'Not signed in. Your details are saved only on this phone.',
    signOut: 'Sign out', signInNow: 'Sign in', signedOut: 'You are signed out.',
    newPassword: 'New password', changePassword: 'Change password', passwordChanged: 'Your password is changed.',
    aboutMe: 'About me', myName: 'My name', myAddress: 'My home address', yourName: 'Your name',
    myHelper: 'My helper', helperHint: 'Your requests are sent to this person: a relative, neighbour, carer or local shop.',
    helperName: "Helper's name", helperPhone: "Helper's phone number",
    sendVia: 'Send messages by', whatsapp: 'WhatsApp', sms: 'Text message (SMS)',
    fam1: 'Family member 1', fam2: 'Family member 2', fam3: 'Family member 3', famName: 'Name', famPhone: 'Phone number',
    emergencyNumber: 'Emergency number', emergencyPh: 'For example: 123',
    countdownLabel: 'Call automatically after', noAuto: "Don't call automatically", sec5: '5 seconds', sec10: '10 seconds',
    display: 'Display', language: 'Language', size: 'Text size', normal: 'Normal', large: 'Large', xl: 'Extra large',
    save: 'Save changes', saved: 'Saved.',

    noEmergencyText: 'No emergency number is saved. Add one in Profile, or send an alert to your helper.',
    tapCallNowText: 'Tap "Call now" to call {num}.',
    callingInText: 'Calling {num} automatically…', callingNum: 'Calling {num}…',
    callNow: 'Call now', alertHelper: 'Send an alert to {name}', cancel: 'Cancel',
    cancelled: 'Cancelled. No call was made.', addEmergencyNum: 'Please add an emergency number in Profile.',
    findingLoc: 'Finding your location…',
    emergencyMsg: 'EMERGENCY: {name} needs help now!', emergencyMsgAnon: 'EMERGENCY: I need help now!',
    calling: 'Calling {name}…',

    previewMsgTitle: 'Message ready to send', previewCallTitle: 'Phone call',
    previewMsgNote: 'In the installed app this opens in {via}, ready to send.', previewCallNote: 'In the installed app this calls the number straight away.',
    to: 'To: {name} {num}', copy: 'Copy', close: 'Close', copied: 'Copied.',
    example: '(example)', langSwitchTo: 'العربية',
  },
  ar: {
    appName: 'إيزي هيلب', skip: 'انتقل إلى المحتوى', back: 'رجوع',
    previewBanner: 'معاينة. تظهر المكالمات والرسائل وموقعك هنا بدلًا من استخدامها. ثبّت التطبيق على الهاتف للاستخدام الحقيقي.',
    tabsLabel: 'الأقسام الرئيسية', tabHome: 'الرئيسية', tabRequests: 'طلباتي', tabMeds: 'أدويتي', tabLocation: 'موقعي', tabProfile: 'حسابي',

    signinIntro: 'سجّل الدخول حتى تُحفظ بيانات مساعدك وعائلتك وأدويتك وطلباتك.',
    email: 'البريد الإلكتروني', password: 'كلمة المرور', signIn: 'تسجيل الدخول', createAccount: 'إنشاء حساب',
    newHere: 'أنا جديد. أنشئ حسابًا', haveAccount: 'لدي حساب بالفعل',
    forgot: 'نسيت كلمة المرور', noAccount: 'الاستخدام بدون حساب',
    continueAs: 'المتابعة باسم {name}', continueAsYou: 'المتابعة بحساب Claude',
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
    recovered: 'تم تسجيل الدخول. من فضلك اختر كلمة مرور جديدة بالأسفل.',

    morning: 'صباح الخير', afternoon: 'مساء الخير', evening: 'مساء الخير', greetName: ' يا {name}',
    emergency: 'طوارئ', emergencySub: 'اطلب النجدة الآن',
    needSomething: 'ماذا تحتاج اليوم؟',
    groceries: 'البقالة', groceriesSub: 'طعام ومشتريات حتى باب البيت',
    medicine: 'الصيدلية', medicineSub: 'نحضر لك دواءك',
    ride: 'توصيلة', rideSub: 'إلى الطبيب أو السوق أو العائلة',
    helper: 'مساعدة في البيت', helperSub: 'تنظيف أو طبخ أو تصليح أو ونس',
    nextMedTitle: 'الدواء التالي', seeAll: 'عرض الكل', edit: 'تعديل',
    noMedsHome: 'لا توجد تذكيرات بعد', noMedsHomeSub: 'اضغط لإضافة أدويتك',
    nextDoseTitle: '{name}', nextDoseSub: 'اليوم الساعة {time}', nextDoseTomorrow: 'غدًا الساعة {time}',
    familyTitle: 'العائلة', callBtn: 'اتصال', noFamily: 'أضف أرقام عائلتك لتتصل بهم بضغطة واحدة.', addFamily: 'أضف أرقام العائلة',
    familyN: 'فرد العائلة {n}', myHelperName: 'مساعدي', helperTag: 'المساعد',
    setupHelper: 'أضف مساعدك', setupHelperSub: 'تُرسل الطلبات إليه عبر واتساب أو رسالة نصية.',

    otherLabel: 'أي شيء آخر؟ (اختياري)',
    whenLabel: 'متى تحتاجه؟', whenNow: 'فورًا', whenToday: 'لاحقًا اليوم', whenTomorrow: 'غدًا',
    shareLoc: 'أرسل موقعي', shareLocRide: 'خذني من مكاني الحالي',
    sendTo: 'أرسل إلى {name}', sendReq: 'أرسل الطلب',
    sendHintTo: 'يُرسل عبر {via}. يستطيع {name} الرد بضغطة واحدة، وسترى الرد في طلباتي.',
    needHelperPhone: 'من فضلك أضف رقم هاتف مساعدك في حسابي أولًا.',
    needDetails: 'من فضلك اختر أو اكتب ما تحتاجه أولًا.',
    yourHelper: 'مساعدك', viaSms: 'رسالة نصية', viaWa: 'واتساب',
    opening: 'جارٍ فتح {via}. اضغط إرسال لإتمام الطلب.',
    msgHello: 'مرحبًا{name}، معك {me}.', msgHelloAnon: 'مرحبًا{name}.', msgName: ' يا {name}',
    msgWhen: 'الموعد: {w}', msgAddress: 'عنواني: {a}', msgLocation: 'موقعي: {l}', msgHere: 'أنا الآن في: {p}',
    msgFooter: '(أُرسلت عبر تطبيق إيزي هيلب)', replyLink: 'اضغط للرد: {url}',

    requestsLead: 'الطلبات التي أرسلتها وردود مساعدك.',
    noRequests: 'لا توجد طلبات بعد. اختر خدمة من الرئيسية لطلب المساعدة.',
    clearList: 'امسح القائمة', listEmpty: 'تم مسح القائمة.',
    locationShared: 'تم إرسال الموقع', emergencyAlert: 'تنبيه طوارئ',
    status_sent: 'أُرسل', status_seen: 'تمت رؤيته', status_coming: 'في الطريق', status_later: 'سيأتي لاحقًا', status_cant: 'لا يستطيع', status_done: 'تم',
    reply_seen: '{name} رأى طلبك: {what}.', reply_coming: '{name} في الطريق إليك: {what}.',
    reply_later: '{name} سيأتي لاحقًا: {what}.', reply_cant: '{name} لا يستطيع المساعدة في هذا الطلب: {what}.',
    reply_done: '{name} يقول إن الطلب تم: {what}.',

    medsLead: 'سيظهر لك تذكير في كل موعد ما دام إيزي هيلب مفتوحًا.',
    noMeds: 'لا توجد أدوية بعد. اضغط "أضف دواء" لضبط أول تذكير.',
    addMed: 'أضف دواء', medName: 'اسم الدواء', medNamePh: 'مثال: كونكور ٥ مجم',
    medTimes: 'مواعيد الدواء', addTime: 'أضف موعدًا آخر', saveMed: 'احفظ الدواء', removeTime: 'احذف هذا الموعد',
    deleteMed: 'احذف {name}', medSaved: 'تم الحفظ. التذكير الساعة {times}.', medDeleted: 'تم حذف {name}.',
    needMedName: 'من فضلك اكتب اسم الدواء.', needMedTime: 'من فضلك أضف موعدًا واحدًا على الأقل.',
    medsHint: 'اترك إيزي هيلب مفتوحًا على هاتفك حتى يظهر التذكير.',
    dose_taken: 'أُخذ', dose_skipped: 'تم تخطيه', dose_due: 'حان موعده', dose_missed: 'لم يؤخذ', dose_later: 'لاحقًا',
    remindTitle: 'موعد الدواء', tookIt: 'أخذته', later10: 'ذكّرني بعد ١٠ دقائق', skipDose: 'تخطَّ هذه المرة',
    doseTaken: 'أحسنت. تم التسجيل.', snoozed: 'سنذكّرك مرة أخرى بعد ١٠ دقائق.', doseSkipped: 'تم التخطي.',

    youAreAt: 'أنت هنا', finding: 'جارٍ تحديد مكانك…', mapAlt: 'خريطة مكانك',
    noGps: 'لا نستطيع تحديد موقعك. من فضلك شغّل خدمة الموقع لهذا التطبيق من إعدادات الهاتف، ثم اضغط "تحديث".',
    accuracy: 'الدقة حوالي {m} متر.', nearCoords: 'بالقرب من {lat}، {lng}',
    sendLocation: 'أرسل موقعي إلى {name}', openMaps: 'افتح الخريطة', refresh: 'تحديث',
    homeAddress: 'بيتي', noHome: 'لم يُحفظ عنوان البيت بعد. عندما تكون في البيت اضغط "احفظه كبيتي".',
    directionsHome: 'الطريق إلى البيت', saveHome: 'احفظه كبيتي', homeSaved: 'تم حفظه كعنوان بيتك.',
    fromHome: 'أنت على بعد حوالي {d} من البيت.', atHome: 'أنت في البيت.',
    exampleLocation: 'ميدان التحرير، وسط البلد، القاهرة',
    previewLocation: 'مثال. في التطبيق المثبّت يظهر عنوانك الحقيقي.',

    account: 'الحساب', signedInAs: 'مسجّل الدخول باسم {who}', notSignedIn: 'لم تسجّل الدخول. بياناتك محفوظة على هذا الهاتف فقط.',
    signOut: 'تسجيل الخروج', signInNow: 'تسجيل الدخول', signedOut: 'تم تسجيل الخروج.',
    newPassword: 'كلمة مرور جديدة', changePassword: 'غيّر كلمة المرور', passwordChanged: 'تم تغيير كلمة المرور.',
    aboutMe: 'بياناتي', myName: 'اسمي', myAddress: 'عنوان بيتي', yourName: 'اسمك',
    myHelper: 'مساعدي', helperHint: 'تُرسل طلباتك إلى هذا الشخص: قريب أو جار أو مرافق أو محل قريب.',
    helperName: 'اسم المساعد', helperPhone: 'رقم هاتف المساعد',
    sendVia: 'أرسل الرسائل عن طريق', whatsapp: 'واتساب', sms: 'رسالة نصية (SMS)',
    fam1: 'فرد العائلة ١', fam2: 'فرد العائلة ٢', fam3: 'فرد العائلة ٣', famName: 'الاسم', famPhone: 'رقم الهاتف',
    emergencyNumber: 'رقم الطوارئ', emergencyPh: 'مثال: 123',
    countdownLabel: 'الاتصال تلقائيًا بعد', noAuto: 'لا تتصل تلقائيًا', sec5: '٥ ثوانٍ', sec10: '١٠ ثوانٍ',
    display: 'العرض', language: 'اللغة', size: 'حجم الخط', normal: 'عادي', large: 'كبير', xl: 'كبير جدًا',
    save: 'احفظ التغييرات', saved: 'تم الحفظ.',

    noEmergencyText: 'لا يوجد رقم طوارئ محفوظ. أضفه من حسابي، أو أرسل تنبيهًا إلى مساعدك.',
    tapCallNowText: 'اضغط "اتصل الآن" للاتصال بـ {num}.',
    callingInText: 'سيتم الاتصال بـ {num} تلقائيًا…', callingNum: 'جارٍ الاتصال بـ {num}…',
    callNow: 'اتصل الآن', alertHelper: 'أرسل تنبيهًا إلى {name}', cancel: 'إلغاء',
    cancelled: 'تم الإلغاء. لم يتم الاتصال.', addEmergencyNum: 'من فضلك أضف رقم الطوارئ في حسابي.',
    findingLoc: 'جارٍ تحديد موقعك…',
    emergencyMsg: 'طوارئ: {name} يحتاج إلى مساعدة الآن!', emergencyMsgAnon: 'طوارئ: أحتاج إلى مساعدة الآن!',
    calling: 'جارٍ الاتصال بـ {name}…',

    previewMsgTitle: 'رسالة جاهزة للإرسال', previewCallTitle: 'مكالمة هاتفية',
    previewMsgNote: 'في التطبيق المثبّت تُفتح في {via} جاهزة للإرسال.', previewCallNote: 'في التطبيق المثبّت يتم الاتصال بالرقم مباشرة.',
    to: 'إلى: {name} {num}', copy: 'نسخ', close: 'إغلاق', copied: 'تم النسخ.',
    example: '(مثال)', langSwitchTo: 'English',
  },
};

// Each kind of help has its own screen, colour, choices and message.
const SERVICES = {
  groceries: {
    icon: 'bag', tone: 'green',
    en: { lead: 'Choose what you need. Your helper brings it to your door.', prompt: 'What should they bring?',
      chips: ['Bread', 'Milk', 'Eggs', 'Water', 'Rice', 'Fruit', 'Vegetables', 'Tea', 'Sugar', 'Cheese', 'Cleaning things'],
      intro: 'Please bring me some groceries:' },
    ar: { lead: 'اختر ما تحتاجه، وسيحضره مساعدك حتى باب البيت.', prompt: 'ماذا يحضر لك؟',
      chips: ['عيش', 'لبن', 'بيض', 'مياه', 'أرز', 'فاكهة', 'خضار', 'شاي', 'سكر', 'جبن', 'منظفات'],
      intro: 'من فضلك أحضر لي بعض المشتريات:' },
  },
  medicine: {
    icon: 'pill', tone: 'blue',
    en: { lead: 'Your helper picks up your medicine from the pharmacy.', prompt: 'Which medicine do you need?',
      chips: ['My usual medicine', 'Blood pressure tablets', 'Diabetes supplies', 'Pain relief', 'Vitamins', 'Eye drops', 'Cough syrup'],
      intro: 'Please get me this from the pharmacy:' },
    ar: { lead: 'يحضر لك مساعدك دواءك من الصيدلية.', prompt: 'ما الدواء الذي تحتاجه؟',
      chips: ['دوائي المعتاد', 'دواء الضغط', 'مستلزمات السكر', 'مسكن للألم', 'فيتامينات', 'قطرة للعين', 'شراب للكحة'],
      intro: 'من فضلك أحضر لي من الصيدلية:' },
  },
  ride: {
    icon: 'car', tone: 'amber',
    en: { lead: 'Someone you trust drives you there.', prompt: 'Where do you want to go?',
      chips: ['Doctor', 'Hospital', 'Pharmacy', 'Market', 'Mosque or church', 'Family visit', 'Bank', 'Club'],
      intro: 'I need a ride to:' },
    ar: { lead: 'شخص تثق به يوصلك إلى هناك.', prompt: 'إلى أين تريد أن تذهب؟',
      chips: ['الطبيب', 'المستشفى', 'الصيدلية', 'السوق', 'المسجد أو الكنيسة', 'زيارة العائلة', 'البنك', 'النادي'],
      intro: 'أحتاج توصيلة إلى:' },
  },
  helper: {
    icon: 'hands', tone: 'purple',
    en: { lead: 'Someone comes to help you at home.', prompt: 'What do you need help with?',
      chips: ['Cleaning', 'Cooking', 'Fix something', 'Read my mail', 'Pay a bill', 'Go for a walk', 'Company and a chat'],
      intro: 'Could you please help me with:' },
    ar: { lead: 'شخص يأتي ليساعدك في البيت.', prompt: 'بماذا تحتاج المساعدة؟',
      chips: ['التنظيف', 'الطبخ', 'تصليح شيء', 'قراءة الأوراق', 'دفع فاتورة', 'نزهة مشي', 'ونس ودردشة'],
      intro: 'هل يمكنك مساعدتي في:' },
  },
};
const STATUSES = ['sent', 'seen', 'coming', 'later', 'cant', 'done'];
const TABS = ['home', 'requests', 'meds', 'location', 'profile'];
const TAB_OF = { service: 'home', medadd: 'meds' };

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
  name: '', address: '', homePos: null,
  helperName: '', helperPhone: '', sendVia: 'whatsapp',
  fam1Name: '', fam1Phone: '', fam2Name: '', fam2Phone: '', fam3Name: '', fam3Phone: '',
  emergency: '', countdown: '5', size: '1',
  meds: [], // [{ id, name, times: ['08:00', '20:00'] }]
};
let settings = { ...DEFAULTS, ...store.get('hh.settings', {}) };
if (!['1', '1.15', '1.3'].includes(String(settings.size))) settings.size = '1';
let requests = store.get('hh.history', []);
let skippedSignIn = store.get('hh.skipSignIn', false);

/* ---------- Translation and formatting ---------- */
function T(key, vars = {}) {
  const s = (STRINGS[settings.lang] && STRINGS[settings.lang][key]) ?? STRINGS.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
}
function service(type) {
  const s = SERVICES[type] || SERVICES.helper;
  return { type, icon: s.icon, tone: s.tone, title: T(type), ...(s[settings.lang] || s.en) };
}
function locale() { return settings.lang === 'ar' ? 'ar-EG' : undefined; }
function listSep() { return settings.lang === 'ar' ? '، ' : ', '; }
function fmtTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const d = new Date(); d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' });
}
function initials(name) {
  const parts = String(name || '').replace(/\(.*?\)/g, '').trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts.slice(0, 2).map(p => p[0]).join('').toUpperCase() : '•';
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
  updateAuthMode();
}
function applySize() {
  document.documentElement.style.setProperty('--scale', settings.size);
}

let toastTimer;
function toast(text) {
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4500);
}
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}
function icon(name) {
  const s = el('span', 'ico');
  s.innerHTML = iconSVG(name);
  return s;
}

/* ---------- Platform capabilities (hosted preview only) ---------- */
function useCapability(name) {
  return window.claude && window.claude.use ? window.claude.use(name).catch(() => null) : Promise.resolve(null);
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
  user: null, db: null, id: null, name: '', ready: Promise.resolve(),
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
  applySize();
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
function setAuthMsg(text) { authMsg.textContent = text; }
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
  setAuthMsg('');
  document.getElementById('authSubmitLabel').textContent = T('signinBusy');
  try {
    if (authMode === 'signup') {
      if (name) settings.name = name;
      const result = await Account.signUp(name, email, password);
      if (result === 'check_email') { authMode = 'signin'; updateAuthMode(); setAuthMsg(T('checkEmail')); return; }
    } else {
      await Account.signIn(email, password);
    }
    document.getElementById('authPassword').value = '';
    await afterSignIn();
    toast(T('welcomeBack'));
    goReplace('home');
  } catch (err) {
    setAuthMsg(authErrorText(err));
  } finally {
    btn.disabled = false;
    updateAuthMode();
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
    goReplace('home');
  } catch { toast(T('errGeneric')); }
});
document.getElementById('skipSignIn').addEventListener('click', () => {
  skippedSignIn = true;
  store.set('hh.skipSignIn', true);
  goReplace('home');
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
const titleEl = document.getElementById('screenTitle');
const memStack = [];
let navigatedInApp = false;
let currentService = 'groceries';
let emergencyTimer = null;

function currentRoute() {
  return PREVIEW ? (memStack[memStack.length - 1] || 'home') : ((location.hash || '#home').slice(1) || 'home');
}
function go(route) {
  if (PREVIEW) { memStack.push(route); render(); return; }
  navigatedInApp = true;
  const hash = '#' + route;
  if (location.hash === hash) render(); else location.hash = hash;
}
// Go somewhere without leaving the current screen in the back history.
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
document.querySelectorAll('[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    if (screenNow() === tab.dataset.tab) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    // Tabs swap the screen in place, so Back always leads out of a sub-screen, not around the tabs.
    if (PREVIEW) { memStack.length = 0; go(tab.dataset.tab); return; }
    TABS.includes(screenNow()) ? goReplace(tab.dataset.tab) : go(tab.dataset.tab);
  });
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

  const section = document.getElementById(`screen-${screen}`);
  if (!section) { goReplace('home'); return; }
  document.querySelectorAll('.screen').forEach(s => { s.hidden = s !== section; });

  const isTab = TABS.includes(screen);
  const noTabs = screen === 'signin' || screen === 'emergency';
  backBtn.hidden = isTab || screen === 'signin';
  document.getElementById('brandmark').hidden = !backBtn.hidden;
  document.getElementById('tabbar').hidden = noTabs;
  document.body.classList.toggle('no-tabs', noTabs);
  document.body.classList.toggle('sos-mode', screen === 'emergency');
  const activeTab = TAB_OF[screen] || screen;
  document.querySelectorAll('[data-tab]').forEach(t => {
    if (t.dataset.tab === activeTab) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
  });

  let title = T(section.dataset.title);
  if (screen === 'signin') renderSignin();
  if (screen === 'home') renderHome();
  if (screen === 'service') title = renderService(arg);
  if (screen === 'requests') renderRequests();
  if (screen === 'meds') renderMeds();
  if (screen === 'medadd') renderMedAdd();
  if (screen === 'location') renderLocation();
  if (screen === 'profile') renderProfile();
  if (screen === 'emergency') startEmergency();

  titleEl.textContent = title;
  document.title = screen === 'home' || screen === 'signin' ? T('appName') : `${title} · ${T('appName')}`;
  window.scrollTo(0, 0);
  titleEl.focus({ preventScroll: true });
}

/* ---------- Home ---------- */
function greetingParts() {
  const now = new Date();
  const h = now.getHours();
  const part = T(h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening');
  const name = settings.name ? T('greetName', { name: settings.name.split(' ')[0] }) : '';
  return {
    hello: `${part}${name}`,
    day: now.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long' }),
    time: now.toLocaleTimeString(locale(), { hour: 'numeric', minute: '2-digit' }),
  };
}
function renderToday() {
  const g = greetingParts();
  document.getElementById('todayHello').textContent = g.hello;
  document.getElementById('todayTime').textContent = g.time;
  document.getElementById('todayDate').textContent = g.day;
}
function notice(iconName, tone, title, sub, onClick) {
  const n = el('button', 'notice');
  const ic = el('span', 'row-ico');
  ic.dataset.tone = tone;
  ic.appendChild(icon(iconName));
  const txt = el('span', 'row-text');
  txt.append(el('span', 'row-title', title));
  if (sub) txt.append(el('span', 'row-sub', sub));
  const chev = el('span', 'chev');
  chev.innerHTML = iconSVG('chev');
  n.append(ic, txt, chev);
  n.addEventListener('click', onClick);
  return n;
}
function renderHome() {
  renderToday();

  const notices = document.getElementById('homeNotices');
  notices.innerHTML = '';
  const last = store.get('hh.lastReply', null);
  if (last && Date.now() - last.at < 6 * 3600 * 1000) {
    notices.appendChild(notice('check', 'green', replyText(last), '', () => go('requests')));
  }
  if (!settings.helperPhone) {
    notices.appendChild(notice('user', 'amber', T('setupHelper'), T('setupHelperSub'), () => go('profile')));
  }

  const next = nextDose();
  document.getElementById('homeMedTitle').textContent = next ? next.med.name : T('noMedsHome');
  document.getElementById('homeMedSub').textContent = next
    ? T(next.tomorrow ? 'nextDoseTomorrow' : 'nextDoseSub', { time: fmtTime(next.time) })
    : T('noMedsHomeSub');

  const list = document.getElementById('familyList');
  list.innerHTML = '';
  const people = familyContacts();
  if (!people.length) {
    const box = el('div', 'list-empty');
    box.append(el('p', 'hint', T('noFamily')));
    const b = el('button', 'btn btn-secondary');
    b.append(icon('plus'), el('span', '', T('addFamily')));
    b.dataset.go = 'profile';
    box.append(b);
    list.append(box);
    return;
  }
  people.forEach(p => {
    const row = el('div', 'person');
    const txt = el('div', 'row-text');
    txt.append(el('p', 'row-title', p.name));
    const sub = el('p', 'row-sub', p.helper ? `${T('helperTag')} · ` : '');
    const num = el('bdi', '', p.phone);
    num.dir = 'ltr';
    sub.append(num);
    txt.append(sub);
    const call = el('button', 'callbtn');
    call.append(icon('phone'), el('span', '', T('callBtn')));
    call.setAttribute('aria-label', `${T('callBtn')} ${p.name}`);
    call.addEventListener('click', () => callNumber(p.phone, p.name));
    row.append(el('span', 'avatar', initials(p.name)), txt, call);
    list.append(row);
  });
}
setInterval(() => { if (screenNow() === 'home') renderToday(); }, 30000);

/* ---------- One service ---------- */
function renderService(type) {
  currentService = type in SERVICES ? type : 'groceries';
  const s = service(currentService);
  const head = document.getElementById('serviceHead');
  head.dataset.tone = s.tone;
  document.getElementById('serviceIcon').innerHTML = iconSVG(s.icon);
  document.getElementById('serviceTitle').textContent = s.title;
  document.getElementById('serviceLead').textContent = s.lead;
  document.getElementById('servicePrompt').textContent = s.prompt;
  document.getElementById('reqText').value = '';
  document.querySelector('#whenGroup input[value="now"]').checked = true;
  document.getElementById('shareLoc').checked = true;
  document.getElementById('shareLocLabel').textContent = T(currentService === 'ride' ? 'shareLocRide' : 'shareLoc');
  const name = settings.helperName || T('yourHelper');
  document.getElementById('sendReqLabel').textContent = settings.helperPhone ? T('sendTo', { name }) : T('sendReq');
  document.getElementById('sendHint').textContent = settings.helperPhone
    ? T('sendHintTo', { name, via: T(settings.sendVia === 'sms' ? 'viaSms' : 'viaWa') })
    : T('needHelperPhone');

  const chips = document.getElementById('quickChips');
  chips.innerHTML = '';
  s.chips.forEach(label => {
    const b = el('button', 'chip', label);
    b.type = 'button';
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
    chips.appendChild(b);
  });
  return s.title;
}
function helperLink(token) {
  return `${location.origin}${location.pathname.replace(/[^/]*$/, '')}helper.html?r=${token}`;
}
function greetLine() {
  const helperName = settings.helperName ? T('msgName', { name: settings.helperName }) : '';
  return settings.name ? T('msgHello', { name: helperName, me: settings.name }) : T('msgHelloAnon', { name: helperName });
}
document.getElementById('sendReqBtn').addEventListener('click', async () => {
  const s = service(currentService);
  const picked = [...document.querySelectorAll('#quickChips .chip[aria-pressed="true"]')].map(b => b.textContent);
  const typedText = document.getElementById('reqText').value.trim();
  const details = [...picked, typedText].filter(Boolean).join(listSep());
  if (!details) { toast(T('needDetails')); return; }
  if (!settings.helperPhone) { toast(T('needHelperPhone')); go('profile'); return; }

  const btn = document.getElementById('sendReqBtn');
  btn.disabled = true;
  const whenKey = { now: 'whenNow', today: 'whenToday', tomorrow: 'whenTomorrow' }[document.querySelector('#whenGroup input:checked').value];
  const pos = document.getElementById('shareLoc').checked ? await getPosition() : null;
  const lines = [greetLine(), `${s.intro} ${details}.`, T('msgWhen', { w: T(whenKey) })];
  if (settings.address) lines.push(T('msgAddress', { a: settings.address }));
  if (pos) lines.push(T('msgLocation', { l: mapsLink(pos) }));
  const text = `${details} · ${T(whenKey)}`;
  const token = await addHistory({ type: currentService, text }, {
    requester_name: settings.name || null, address: settings.address || null, location_url: pos ? mapsLink(pos) : null,
  });
  if (token) lines.push(T('replyLink', { url: helperLink(token) }));
  lines.push(T('msgFooter'));
  btn.disabled = false;
  sendMessage(settings.helperPhone, lines.join('\n'));
  if (PREVIEW) simulateReply(currentService, text);
});

/* ---------- Helper replies ---------- */
function historyTitle(type) {
  if (type === 'location') return T('locationShared');
  return T(type in SERVICES ? type : 'helper');
}
function replyText(r) {
  const name = settings.helperName || T('yourHelper');
  const what = r.type === 'location' ? T('locationShared') : historyTitle(r.type);
  return T(`reply_${r.status}`, { name, what });
}
function announceReply(r) {
  store.set('hh.lastReply', { type: r.type, text: r.text, status: r.status, at: Date.now() });
  const msg = replyText(r);
  toast(msg);
  if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
  notify(T('appName'), msg);
  if (screenNow() === 'home') renderHome();
  if (screenNow() === 'requests') drawRequests();
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

/* ---------- Requests ---------- */
async function addHistory(item, extra) {
  requests.unshift({ ...item, status: 'sent', at: Date.now() });
  requests = requests.slice(0, 50);
  store.set('hh.history', requests);
  if (!Account.signedIn()) return null;
  try { return await Account.addRequest(item, extra); } catch { return null; }
}
function drawRequests() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  document.getElementById('clearHistory').hidden = !requests.length;
  if (!requests.length) { list.appendChild(el('p', 'empty', T('noRequests'))); return; }
  requests.forEach(h => {
    const card = el('div', 'card req');
    const ic = el('span', 'row-ico');
    const svc = SERVICES[h.type];
    ic.dataset.tone = svc ? svc.tone : (h.text === T('emergencyAlert') ? 'red' : 'green');
    ic.appendChild(icon(svc ? svc.icon : 'pin'));
    const txt = el('div', 'row-text');
    txt.append(el('p', 'row-title', historyTitle(h.type)));
    txt.append(el('p', 'row-sub', h.text));
    txt.append(el('p', 'row-sub', new Date(h.at).toLocaleString(locale(), { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })));
    const status = STATUSES.includes(h.status) ? h.status : 'sent';
    const pill = el('span', 'pill', T(`status_${status}`));
    pill.dataset.s = status;
    txt.append(pill);
    card.append(ic, txt);
    list.appendChild(card);
  });
}
function renderRequests() {
  drawRequests();
  if (Account.signedIn()) {
    Account.loadRequests().then(r => {
      requests = r;
      store.set('hh.history', requests);
      if (screenNow() === 'requests') drawRequests();
    }).catch(() => {});
  }
}
document.getElementById('clearHistory').addEventListener('click', () => {
  requests = [];
  store.set('hh.history', requests);
  if (Account.signedIn()) Account.clearRequests().catch(() => {});
  drawRequests();
  toast(T('listEmpty'));
});

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
    const tomorrow = mins < 0;
    if (tomorrow) mins += 24 * 60;
    if (!best || mins < best.mins) best = { med, time, mins, tomorrow };
  }));
  return best;
}
function doseState(med, time) {
  const state = getDoses()[doseKey(med, time, new Date())];
  if (state === 'taken' || state === 'skipped') return state;
  const [h, m] = time.split(':').map(Number);
  const due = new Date(); due.setHours(h, m, 0, 0);
  const late = Date.now() - due;
  return late < 0 ? 'later' : late > 3 * 3600 * 1000 ? 'missed' : 'due';
}
function renderMeds() {
  const list = document.getElementById('medList');
  list.innerHTML = '';
  const meds = settings.meds || [];
  if (!meds.length) { list.appendChild(el('p', 'empty', T('noMeds'))); return; }
  meds.forEach(med => {
    const card = el('div', 'card med');
    const top = el('div', 'med-top');
    const ic = el('span', 'row-ico');
    ic.dataset.tone = 'blue';
    ic.appendChild(icon('pill'));
    const del = el('button', 'smallbtn');
    del.setAttribute('aria-label', T('deleteMed', { name: med.name }));
    del.appendChild(icon('trash'));
    del.addEventListener('click', () => {
      saveSettings({ ...settings, meds: settings.meds.filter(m => m.id !== med.id) });
      toast(T('medDeleted', { name: med.name }));
      renderMeds();
    });
    top.append(ic, el('p', 'med-name', med.name), del);
    const doses = el('div', 'doses');
    med.times.forEach(time => {
      const state = doseState(med, time);
      const d = el('span', 'dose');
      d.dataset.s = state;
      d.append(icon(state === 'taken' ? 'check' : state === 'skipped' ? 'x' : 'clock'), el('span', '', `${fmtTime(time)} · ${T(`dose_${state}`)}`));
      doses.append(d);
    });
    card.append(top, doses);
    list.appendChild(card);
  });
}
function addTimeRow(value) {
  const wrap = document.getElementById('medTimes');
  const row = el('div', 'time-row');
  const input = el('input', 'field');
  input.type = 'time';
  input.value = value;
  input.setAttribute('aria-label', T('medTimes'));
  const del = el('button', 'smallbtn');
  del.type = 'button';
  del.setAttribute('aria-label', T('removeTime'));
  del.appendChild(icon('trash'));
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
  if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 300]);
  notify(T('remindTitle'), `${med.name} · ${fmtTime(time)}`);
}
function closeReminder(value, messageKey) {
  if (!reminderNow) return;
  setDose(reminderNow.key, value);
  reminderNow = null;
  reminderEl.hidden = true;
  toast(T(messageKey));
  if (screenNow() === 'home') renderHome();
  if (screenNow() === 'meds') renderMeds();
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
    if (PREVIEW) return resolve({ lat: 30.04442, lng: 31.23571, acc: 20 });
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude, acc: p.coords.accuracy }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  });
}
function mapsLink(pos) { return `https://maps.google.com/?q=${pos.lat.toFixed(5)},${pos.lng.toFixed(5)}`; }
function distanceM(a, b) {
  const R = 6371000, rad = x => x * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function fmtDistance(m) {
  const n = new Intl.NumberFormat(locale(), { maximumFractionDigits: m < 10000 ? 1 : 0 });
  if (m < 1000) return settings.lang === 'ar' ? `${n.format(Math.round(m / 10) * 10)} متر` : `${Math.round(m / 10) * 10} m`;
  return settings.lang === 'ar' ? `${n.format(m / 1000)} كم` : `${n.format(m / 1000)} km`;
}

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

// A small street map made of OpenStreetMap tiles, centred on the person.
function drawMap(pos) {
  const box = document.getElementById('mapTiles');
  box.innerHTML = '';
  if (!pos) return;
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
      img.decoding = 'async';
      img.referrerPolicy = 'strict-origin-when-cross-origin';
      img.src = `https://tile.openstreetmap.org/${z}/${((tx % n) + n) % n}/${ty}.png`;
      img.style.left = `${Math.round(tx * 256 - left)}px`;
      img.style.top = `${Math.round(ty * 256 - top)}px`;
      img.onerror = () => img.remove();
      box.appendChild(img);
    }
  }
}

function renderHomePlace() {
  const name = settings.helperName || T('yourHelper');
  document.getElementById('sendPlaceLabel').textContent = T('sendLocation', { name });
  document.getElementById('homeAddressText').textContent = settings.address || T('noHome');
  const dir = document.getElementById('directionsHome');
  const dest = settings.homePos ? `${settings.homePos.lat},${settings.homePos.lng}` : settings.address;
  dir.hidden = !dest;
  if (dest) dir.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
  const dist = document.getElementById('homeDistance');
  dist.textContent = '';
  if (lastPlace && settings.homePos) {
    const m = distanceM(lastPlace.pos, settings.homePos);
    dist.textContent = m < 60 ? T('atHome') : T('fromHome', { d: fmtDistance(m) });
  }
}
function renderLocation() {
  renderHomePlace();
  findMe();
}
async function findMe() {
  const addrEl = document.getElementById('placeAddress');
  const noteEl = document.getElementById('placeNote');
  const maps = document.getElementById('openMaps');
  addrEl.textContent = T('finding');
  noteEl.textContent = '';
  maps.hidden = true;

  const pos = await getPosition();
  if (!pos) {
    lastPlace = null;
    drawMap(null);
    addrEl.textContent = T('noGps');
    return;
  }
  const address = PREVIEW ? T('exampleLocation') : await addressFor(pos);
  lastPlace = { pos, address: address || T('nearCoords', { lat: pos.lat.toFixed(4), lng: pos.lng.toFixed(4) }) };
  if (screenNow() !== 'location') return; // they left while we were looking
  addrEl.textContent = lastPlace.address;
  noteEl.textContent = PREVIEW ? T('previewLocation') : pos.acc >= 1 ? T('accuracy', { m: Math.round(pos.acc).toLocaleString(locale()) }) : '';
  maps.href = mapsLink(pos);
  maps.hidden = false;
  drawMap(pos);
  renderHomePlace();
}
document.getElementById('refreshPlace').addEventListener('click', findMe);
document.getElementById('savePlace').addEventListener('click', () => {
  if (!lastPlace) { findMe(); return; }
  saveSettings({ ...settings, address: lastPlace.address, homePos: { lat: +lastPlace.pos.lat.toFixed(5), lng: +lastPlace.pos.lng.toFixed(5) } });
  renderHomePlace();
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
function showSheet(title, to, body, note) {
  document.getElementById('sheetTitle').textContent = title;
  document.getElementById('sheetTo').textContent = to;
  const bodyEl = document.getElementById('sheetBody');
  bodyEl.textContent = body;
  bodyEl.hidden = !body;
  document.getElementById('sheetCopy').hidden = !body;
  document.getElementById('sheetNote').textContent = note;
  sheet.hidden = false;
  document.getElementById('sheetClose').focus();
}
document.getElementById('sheetClose').addEventListener('click', () => { sheet.hidden = true; });
document.getElementById('sheetCopy').addEventListener('click', () => {
  const text = document.getElementById('sheetBody').textContent;
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
    showSheet(T('previewMsgTitle'), T('to', { name, num }), body, T('previewMsgNote', { via }));
    return;
  }
  const url = settings.sendVia === 'sms'
    ? `sms:${num}?&body=${encodeURIComponent(body)}`
    : `https://wa.me/${num.replace(/^\+/, '')}?text=${encodeURIComponent(body)}`;
  toast(T('opening', { via }));
  setTimeout(() => { location.href = url; }, 900);
}
function callNumber(phone, name) {
  const num = cleanPhone(phone);
  if (PREVIEW) {
    showSheet(T('previewCallTitle'), T('to', { name: name || '', num }), '', T('previewCallNote'));
    return;
  }
  if (name) toast(T('calling', { name }));
  location.href = `tel:${num}`;
}

/* ---------- Family ---------- */
function familyContacts() {
  const out = [];
  for (const i of [1, 2, 3]) {
    const name = String(settings[`fam${i}Name`] || '').trim(), phone = String(settings[`fam${i}Phone`] || '').trim();
    if (phone) out.push({ name: name || T('familyN', { n: i }), phone });
  }
  if (settings.helperPhone) out.push({ name: settings.helperName || T('myHelperName'), phone: settings.helperPhone, helper: true });
  return out;
}

/* ---------- Emergency ---------- */
function startEmergency() {
  const text = document.getElementById('countdownText');
  const count = document.getElementById('countdownNum');
  const num = cleanPhone(settings.emergency);
  const helperName = settings.helperName || T('yourHelper');
  document.getElementById('alertHelperLabel').textContent = T('alertHelper', { name: helperName });
  document.getElementById('alertHelperBtn').hidden = !settings.helperPhone;
  document.getElementById('callEmergencyNow').hidden = !num;
  count.textContent = '';
  if (!num) { text.textContent = T('noEmergencyText'); return; }
  const total = parseInt(settings.countdown, 10) || 0;
  if (!total || PREVIEW) { text.textContent = T('tapCallNowText', { num }); return; }
  let left = total;
  text.textContent = T('callingInText', { num });
  const tick = () => {
    if (left <= 0) { stopEmergency(); count.textContent = ''; text.textContent = T('callingNum', { num }); callNumber(num); return; }
    count.textContent = left.toLocaleString(locale());
    if (navigator.vibrate) navigator.vibrate(120);
    left -= 1;
  };
  tick();
  emergencyTimer = setInterval(tick, 1000);
}
function stopEmergency() {
  if (emergencyTimer) { clearInterval(emergencyTimer); emergencyTimer = null; }
  const count = document.getElementById('countdownNum');
  if (count) count.textContent = '';
}
document.getElementById('callEmergencyNow').addEventListener('click', () => {
  stopEmergency();
  const num = cleanPhone(settings.emergency);
  if (!num) { toast(T('addEmergencyNum')); return; }
  callNumber(num);
});
document.getElementById('cancelEmergency').addEventListener('click', () => {
  stopEmergency();
  toast(T('cancelled'));
  if (PREVIEW) { memStack.pop(); render(); return; }
  if (navigatedInApp) window.history.back(); else location.replace('#home');
});
document.getElementById('alertHelperBtn').addEventListener('click', async () => {
  stopEmergency();
  if (!settings.helperPhone) { toast(T('needHelperPhone')); return; }
  document.getElementById('countdownText').textContent = T('findingLoc');
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

/* ---------- Profile ---------- */
const form = document.getElementById('settingsForm');
function renderProfile() {
  const signedIn = Account.signedIn();
  document.getElementById('avatar').textContent = initials(settings.name);
  document.getElementById('profileName').textContent = settings.name || T('yourName');
  document.getElementById('accountLine').textContent = signedIn ? T('signedInAs', { who: Account.who() }) : T('notSignedIn');
  document.getElementById('accountBtnLabel').textContent = T(signedIn ? 'signOut' : 'signInNow');
  document.getElementById('passwordChange').hidden = !(signedIn && !PREVIEW);
  for (const [k, v] of Object.entries(settings)) {
    const field = form.elements[k];
    if (field) field.value = v ?? '';
  }
}
function saveSettings(next) {
  settings = next;
  store.set('hh.settings', settings);
  applySize();
  applyLanguage();
  if (Account.signedIn()) Account.saveSettings(settings).catch(() => {});
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const next = { ...settings };
  for (const k of Object.keys(DEFAULTS)) {
    const field = form.elements[k];
    if (field) next[k] = field.value.trim();
  }
  if (next.address !== settings.address) next.homePos = null; // typed by hand, so the saved map point no longer matches
  saveSettings(next);
  toast(T('saved'));
  render();
});
document.getElementById('accountBtn').addEventListener('click', async () => {
  if (Account.signedIn()) {
    await Account.signOut();
    toast(T('signedOut'));
  }
  skippedSignIn = false;
  store.set('hh.skipSignIn', false);
  goReplace('signin');
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
      if (ClaudeAccount.signedIn()) afterSignIn().then(render);
      else if (screenNow() === 'signin' || needsSignIn()) render();
    });
    // Clearly marked examples so every screen works in the preview.
    if (!store.get('hh.settings', null)) {
      const ex = STRINGS[settings.lang].example;
      const ar = settings.lang === 'ar';
      Object.assign(settings, {
        name: ar ? 'فاطمة' : 'Fatma',
        helperName: ar ? `سارة ${ex}` : `Sara ${ex}`, helperPhone: '+20 100 000 0000',
        fam1Name: ar ? `عمر ${ex}` : `Omar ${ex}`, fam1Phone: '+20 111 000 0000',
        fam2Name: ar ? `منى ${ex}` : `Mona ${ex}`, fam2Phone: '+20 122 000 0000',
        emergency: '123', countdown: '0',
        meds: [{ id: 'ex1', name: `${ar ? 'دواء الضغط' : 'Blood pressure tablet'} ${ex}`, times: ['08:00', '20:00'] }],
      });
    }
  }
  paintIcons();
  applySize();
  applyLanguage();

  let linkType = null;
  if (!PREVIEW && SupabaseAccount.configured()) linkType = await SupabaseAccount.takeLinkTokens();
  if (linkType) {
    await afterSignIn();
    goReplace(linkType === 'recovery' ? 'profile' : 'home');
    toast(T(linkType === 'recovery' ? 'recovered' : 'welcomeBack'));
    return;
  }
  render();
  if (Account.signedIn()) afterSignIn().then(() => { if (screenNow() === 'home') renderHome(); checkReplies(); });
  checkReminders();
})();

if (!PREVIEW && 'serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
