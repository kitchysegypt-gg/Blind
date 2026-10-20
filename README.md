# Easy Help

A simple phone app for **elders**: everyday help, medicine reminders, family calls and location, with large text and big buttons. It works in English and Arabic (العربية). There is no voice; everything is on screen.

It's a web app: open it in the phone's browser and choose **Add to Home screen**. It then works like a normal app.

## Tabs

A tab bar at the bottom of every screen:

| Tab | What's on it |
|---|---|
| **Home** | The time and date, a red **Emergency** button, a **Tell my family I'm OK** button, one tile for each kind of help (**Groceries**, **Pharmacy**, **A ride**, **Help at home**, **Professionals**, **Bills & papers**), the next medicine, and a **Call** button for each family member. |
| **Requests** | Every request sent, with the helper's answer (Sent, Seen, On the way, Coming later, Can't help, Done). |
| **Medicines** | Each medicine with today's times marked Taken, Due now, Not taken or Later. At each time a reminder pops up and buzzes: "I took it", "Remind me in 10 minutes" or "Skip". |
| **Location** | A street map with your position, your street address, **Send my location** to your helper, **Open in Maps**, and your home: save where you are as home, see how far away it is, and get directions back. |
| **Profile** | Account, your plan, your name and address, your helper, up to three family numbers, the emergency number, language, text size, and a QR code your family scans to open Easy Help. |

## Each kind of help

Groceries, Pharmacy, A ride and Help at home each have their own screen with their own choices (bread, milk… / blood pressure tablets… / doctor, market… / cleaning, cooking…), a box for anything else, **when** (Right away, Later today, Tomorrow) and whether to include your location (for a ride: "Pick me up from where I am now"). The app writes a WhatsApp or SMS message to your helper with your name, address and location, and you press Send.

## Plans

Three plans. Plus and Premium can be paid for 1, 3, 6 or 12 months.

| | Free | Plus | Premium |
|---|---|---|---|
| Price (1 / 3 / 6 / 12 months) | 0 | 250 / 650 / 1,200 / 2,000 EGP | 450 / 1,150 / 2,150 / 3,600 EGP |
| Who helps | Your family helper | Shopping and medicine delivered by Talabat and partner pharmacies, bills and papers | Everything in Plus, plus nurses and doctors at home, home lab tests with Alfa Lab, rides and help at home |
| Extras | Reminders, SOS, location, daily "I'm OK" | Alerts to family when a dose is missed, support line | A helper within 1 hour, weekly family report, support day and night |

Requests the plan covers go to the Easy Help team once its WhatsApp number is set in `TEAM_PHONE` at the top of `app.js`; until then, and for anything the plan doesn't cover, they go to the family helper. Payment is not built into the app yet.

The pitch asks for 5M EGP for 15% (about 33M valuation), exactly the 12-month launch budget with no reserve. Delivery goes through partners instead of our own fleet (estimated prices): Talabat at about 15 EGP an order 450k, Alfa Lab home tests 150k (no monthly fee; members get about 20% off and Alfa Lab pays us about 10% a test), 100 local pharmacies 150k (free to join, they deliver themselves and pay us 5% an order). The rest: 250 helpers 1.7M, 2 developers at 30k a month 720k, 2 support staff 288k, marketing 1.32M, servers, apps and legal 220k. Forecast profit: year 1 -3.5M (sales 1.5M), year 2 +0.3M (sales 9M), year 3 +6M (sales 22M).

## Emergency

Calls your emergency number after a short countdown you can cancel (or straight away with **Call now**), or sends an alert with your location to your helper.

## Helpers can reply

When you're signed in, every request message ends with a private link. The helper taps it, sees what you need and where, and answers with one tap: **I'm on my way**, **I'll come later**, **It's done** or **Sorry, I can't**. The answer pops up in the app and shows on the Home and Requests tabs. The helper needs no app and no account; the link only opens that one request.

## Sign in

The first screen asks you to sign in with an email and password, or to create an account. Your helper, family numbers, settings and requests are saved to your account, so they come back on a new phone. You can also choose **Use without an account**; then everything stays on that phone only.

Accounts are stored in the Supabase project `ggg` (`sjlgitmupecmqhfmuyds`), in two tables:

- `hh_profiles`: one row per person with their settings
- `hh_requests`: their request history

Row-level security means each person can read and change only their own rows. Helpers reach one request only through its secret link, using two database functions (`hh_request_for_helper` and `hh_helper_reply`) that can't list or change anything else. The SQL is in `supabase/migrations/`.

## Limits to know about

- **Medicine reminders** only go off while the app is open (it can be in the background, but not closed). Reminders that work with the app fully closed need a push-notification server, which isn't built yet.

## Location

The Location tab uses the phone's GPS. It turns the position into a street address with OpenStreetMap's free Nominatim service and draws the map from OpenStreetMap tiles; neither needs a key.

## Running it

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Put it online with GitHub Pages

`.github/workflows/pages.yml` publishes the app each time `main` changes. One-time setup:

1. Merge this branch into `main`.
2. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and run **Deploy to GitHub Pages**.

The app will be at `https://<user>.github.io/<repo>/`. GPS and the install features need HTTPS, and GitHub Pages provides it.

If you later turn on "Confirm email" in Supabase, add the Pages address under **Authentication → URL Configuration** so the email link opens the app.

### Android app (APK)

`dist/EasyHelp.apk` is the app for Android phones (Android 6 or newer). Copy it to the phone, open it, and allow "Install unknown apps" when asked. The app's files are inside the APK, so it opens without internet; sending requests, sign-in, the map and addresses still need internet.

In the Android app, medicine reminders are real phone notifications every day, so they come even when Easy Help is closed. Helper reply links point to the GitHub Pages copy (`https://kitchysegypt-gg.github.io/Blind/helper.html`), so GitHub Pages must be turned on (see above) for helpers to answer.

### Push notifications (Firebase)

1. In the Firebase console, add an Android app with package name `com.easyhelp.elders` and download `google-services.json`.
2. Put it at `android/app/google-services.json` and run `npm run apk`. The build turns push on only when that file is there (without it Android would crash on start).
3. The app asks for permission, registers with Firebase, and saves the phone's token in the `hh_push_tokens` table (one row per phone, readable only by its owner). Send a test from the console with **Messaging → Send test message** and that token, or a campaign to the app.
5. When a helper answers a request, `helper.js` calls the `hh-notify` Supabase Edge Function (`supabase/functions/hh-notify`), which sends "Sara is on the way" to that person's phones. It needs the Edge Function secret `FIREBASE_SERVICE_ACCOUNT` set to the whole Firebase service-account JSON (Firebase console → Project settings → Service accounts → Generate new private key). Never commit that file.
4. Custom data `screen` = `requests`, `meds`, `location`, `profile`, `home` or `emergency` opens that tab when the notification is tapped.

It is built with Capacitor (`capacitor.config.json`, `android/`). To build it yourself you need Node, Java 21 and the Android SDK:

```bash
npm ci
npm run apk   # copies the app into www/, syncs, and builds android/app/build/outputs/apk/debug/app-debug.apk
```

The **Build Android APK** GitHub Action does the same on every push to `main` and attaches the APK to the run. This APK is signed with a debug key, which is fine for installing directly; publishing on Google Play needs a release key.

### Preview build

`python3 tools/build-preview.py` writes `dist/helping-hand-preview.html`, a single-file preview of the app for claude.ai artifacts, and `dist/website-preview.html`, the website preview (publish it with `icons/logo.jpg` as `logo.jpg` and the files in `website/` next to it). Artifacts can't make calls, send texts or read GPS, so the preview shows those on screen instead, with an example location. Sign-in there uses the viewer's claude.ai account, and helper replies are acted out with an example reply.

## Website

`website/index.html` is the business plan as a one-page website, with one section for each of the slides of the "Easy Help" Canva pitch deck (team, problem, market, solution, how it works, app design, value, audience, competitors, marketing, the video ad, plans and pricing, revenue, plan, the ask, conclusion). It is published with the app at `/website/`, and its "Try the app" buttons open the app.

Plans: Free (the family are the helpers), and paid plans that add Easy Help helpers and professionals: 1 month 250 EGP, 3 months 650 EGP, 6 months 1,200 EGP, 1 year 2,000 EGP.

`website/ad.mp4` is the 32-second 2D animated video ad (voice-over and music), shown in the "Our Ad" section. `website/app-mockup.png` is the app-design picture; `website/qr-app.png` and `website/qr-web.png` are the QR codes.

## Files

- `index.html`: the screens
- `helper.html`, `helper.js`: the page a helper opens to reply
- `styles.css`: the look (green and cream like the logo, a dark mode, and 3 text sizes)
- `app.js`: tabs, sign-in, the help screens and replies, medicine reminders, location, calling and profile
- `sw.js`, `manifest.webmanifest`, `icons/`: offline support, install and the Easy Help logo
- `supabase/migrations/`: the database tables
- `website/index.html`: the business-plan website; `website/ad.mp4`, `website/ad-poster.jpg`, `website/app-mockup.png`: its video ad and pictures
- `tools/build-preview.py`: builds the artifact previews of the app and the website
- `package.json`, `capacitor.config.json`, `android/`, `assets/`, `tools/build-www.mjs`: the Android app
- `dist/EasyHelp.apk`: the built Android app
