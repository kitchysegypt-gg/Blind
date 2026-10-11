# Easy Help

A simple, voice-guided phone app for **blind and elderly people**. It works in English and Arabic (العربية).

It's a web app: open it in the phone's browser and choose **Add to Home screen**. It then works like a normal app.

## The home screen

The time and date in large type, then seven big buttons, top to bottom:

| Button | What it does |
|---|---|
| **Speak** | Say what you need ("I need milk and bread", "where am I", "call Omar", «وديني للدكتور»). The app opens the right screen. |
| **Ask for help** | Groceries, medicine, a ride, or someone to help. The app writes a WhatsApp or SMS message to your helper with your name, address and location, and you press Send. |
| **Read text** | Take a photo of a letter, label or medicine box and hear what it says. Works in English and Arabic, on the phone itself, with no account or key. |
| **My medicines** | Add each medicine and the times to take it. At each time the app speaks the reminder, buzzes, and asks "I took it", "Remind me in 10 minutes" or "Skip". |
| **Where am I?** | Says your street address out loud. You can send it to your helper, open it in Maps, or save it as your home address. |
| **Call family** | One big button for each saved family member. |
| **Emergency** | Calls your emergency number (with a countdown you can cancel) or sends your location to your helper. |

Everything is read aloud. By default you tap once to hear a button and tap again to choose it; people who use VoiceOver or TalkBack can turn that off in Settings.

## Helpers can reply

When you're signed in, every request message ends with a private link. The helper taps it, sees what you need and where, and answers with one tap: **I'm on my way**, **I'll come later**, **It's done** or **Sorry, I can't**. The app speaks the answer aloud (for example "Sara is on the way. Groceries: milk and bread") and shows it on the home screen and in My requests. The helper needs no app and no account; the link only opens that one request.

## Sign in

The first screen asks you to sign in with an email and password, or to create an account. Your helper, family numbers, settings and requests are saved to your account, so they come back on a new phone. You can also choose **Use without an account**; then everything stays on that phone only.

Accounts are stored in the Supabase project `ggg` (`sjlgitmupecmqhfmuyds`), in two tables:

- `hh_profiles`: one row per person with their settings
- `hh_requests`: their request history

Row-level security means each person can read and change only their own rows. Helpers reach one request only through its secret link, using two database functions (`hh_request_for_helper` and `hh_helper_reply`) that can't list or change anything else. The SQL is in `supabase/migrations/`.

## Limits to know about

- **Medicine reminders** only go off while the app is open (it can be in the background, but not closed). Reminders that work with the app fully closed need a push-notification server, which isn't built yet.
- **Read text** downloads its reader (about 15 MB) the first time it's used, so the first read needs internet and takes about a minute.

## Location

"Where am I?" uses the phone's GPS. It turns the position into a street address with OpenStreetMap's free Nominatim service, which needs no key.

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

The app will be at `https://<user>.github.io/<repo>/`. The microphone, GPS and install features need HTTPS, and GitHub Pages provides it.

If you later turn on "Confirm email" in Supabase, add the Pages address under **Authentication → URL Configuration** so the email link opens the app.

### Preview build

`python3 tools/build-preview.py` writes `dist/helping-hand-preview.html`, a single-file preview for claude.ai artifacts. Artifacts can't make calls, send texts, use the microphone or read GPS, so the preview shows those on screen instead, with an example location. Sign-in there uses the viewer's claude.ai account, Read text uses Claude to read the photo, and helper replies are acted out with an example reply.

## Website

`website/index.html` is the business plan as a one-page website, in the same design as the "Easy help" Canva presentation. It is published with the app at `/website/`, and its "Try the app" buttons open the app.

## Files

- `index.html`: the screens
- `helper.html`, `helper.js`: the page a helper opens to reply
- `styles.css`: the look (3 colour options and 3 text sizes)
- `app.js`: voice, sign-in, requests and replies, reading text, medicine reminders, location, calling and settings
- `sw.js`, `manifest.webmanifest`, `icons/`: offline support and install
- `supabase/migrations/`: the database tables
- `website/index.html`: the business-plan website
- `tools/build-preview.py`: builds the artifact previews of the app and the website
