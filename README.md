# Easy Help

A simple phone app for **elders**: everyday help, medicine reminders, family calls and location, with large text and big buttons. It works in English and Arabic (العربية). There is no voice; everything is on screen.

It's a web app: open it in the phone's browser and choose **Add to Home screen**. It then works like a normal app.

## Tabs

A tab bar at the bottom of every screen:

| Tab | What's on it |
|---|---|
| **Home** | The time and date, a red **Emergency** button, one tile for each kind of help (**Groceries**, **Pharmacy**, **A ride**, **Help at home**), the next medicine, and a **Call** button for each family member. |
| **Requests** | Every request sent, with the helper's answer (Sent, Seen, On the way, Coming later, Can't help, Done). |
| **Medicines** | Each medicine with today's times marked Taken, Due now, Not taken or Later. At each time a reminder pops up and buzzes: "I took it", "Remind me in 10 minutes" or "Skip". |
| **Location** | A street map with your position, your street address, **Send my location** to your helper, **Open in Maps**, and your home: save where you are as home, see how far away it is, and get directions back. |
| **Profile** | Account, your name and address, your helper, up to three family numbers, the emergency number, language and text size. |

## Each kind of help

Groceries, Pharmacy, A ride and Help at home each have their own screen with their own choices (bread, milk… / blood pressure tablets… / doctor, market… / cleaning, cooking…), a box for anything else, **when** (Right away, Later today, Tomorrow) and whether to include your location (for a ride: "Pick me up from where I am now"). The app writes a WhatsApp or SMS message to your helper with your name, address and location, and you press Send.

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

It is built with Capacitor (`capacitor.config.json`, `android/`). To build it yourself you need Node, Java 21 and the Android SDK:

```bash
npm ci
npm run apk   # copies the app into www/, syncs, and builds android/app/build/outputs/apk/debug/app-debug.apk
```

The **Build Android APK** GitHub Action does the same on every push to `main` and attaches the APK to the run. This APK is signed with a debug key, which is fine for installing directly; publishing on Google Play needs a release key.

### Preview build

`python3 tools/build-preview.py` writes `dist/helping-hand-preview.html`, a single-file preview of the app for claude.ai artifacts, and `dist/website-preview.html`, the website preview (publish it with `icons/logo.jpg` as `logo.jpg` and the files in `website/` next to it). Artifacts can't make calls, send texts or read GPS, so the preview shows those on screen instead, with an example location. Sign-in there uses the viewer's claude.ai account, and helper replies are acted out with an example reply.

## Website

`website/index.html` is the business plan as a one-page website, with one section for each of the 18 slides of the "Easy Help" Canva pitch deck (team, problem, market, solution, how it works, app design, value, audience, competitors, marketing, the video ad, plans and pricing, revenue, plan, the ask, conclusion). It is published with the app at `/website/`, and its "Try the app" buttons open the app.

Prices: 1 month 250 EGP, 3 months 650 EGP, 6 months 1,200 EGP, 1 year 2,000 EGP.

`website/ad.mp4` is the 32-second 2D animated video ad (voice-over and music), shown in the "Our Ad" section. `website/app-mockup.png` is the app-design picture.

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
