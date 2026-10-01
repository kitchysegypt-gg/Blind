# Helping Hand

A simple, voice-guided phone app for **blind and elderly people** to get everyday help: groceries, medicine, a ride, a helper, calling family, and emergencies.

It's a web app (PWA). Open it in a phone browser and choose **"Add to Home screen"**. It then works like a normal app, including offline. You don't need an app store or a build step.

## What it does

| Button | What happens |
|---|---|
| 🎤 **Tap and say what you need** | Speak normally ("I need milk and bread", "take me to the doctor", "call Ahmed", "emergency"). The app works out what you mean and opens the right screen with your words already filled in. |
| 🛍 **Groceries** / 💊 **Medicine** / 🚗 **Ride** / ❤️ **Helper** | Say or pick what you need, then press **Send request**. A ready-written WhatsApp or SMS message goes to your helper (a relative, carer, neighbour or local shop) with your name, your address and a map link to where you are. |
| 📞 **Call family** | Big buttons that call each saved family member. |
| 📋 **My requests** | A list of what you've asked for. Tap one to hear it read aloud. |
| 🚨 **EMERGENCY** | Counts down out loud and then calls your emergency number. You can cancel the countdown or call straight away. It can also send your live location to your helper. |

## Made for blind and low-vision users

- **Everything is spoken aloud** using the phone's own voice.
- **Tap once to hear, tap again to choose.** Nothing happens by accident. Turn this off in Settings if you use VoiceOver or TalkBack.
- Works with screen readers: real buttons, labels and live announcements.
- Huge buttons, very large text (3 sizes), and 3 colour themes, including yellow-on-black high contrast.
- Vibration feedback on each tap.
- 3D-style icons with strong shapes and colours that are easy to tell apart with low vision.

## First-time setup

Open **Settings** (the gear at the top right) and fill in:
1. Your name and home address
2. Your helper's name and phone number, and whether to use WhatsApp or SMS
3. Up to 3 family numbers
4. Your local emergency number (for example 123 for an ambulance in Egypt, 112 in Europe, 911 in the US) and the countdown length

Settings are saved only on the phone. Nothing is sent to any server.

## Running it

Any static web server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

To put it on a phone, host the folder on any HTTPS static host (GitHub Pages, Netlify, etc.). The microphone, location and install-to-home-screen features need HTTPS.

## Files

- `index.html` – screens and layout
- `styles.css` – large, high-contrast, 3D button styling and themes
- `app.js` – voice in and out, commands, requests, calling, emergency, settings, and the 3D SVG icons
- `sw.js`, `manifest.webmanifest`, `icons/` – offline support and installable app

## Notes

- Voice commands use the browser's speech recognition (Chrome on Android, Safari on iOS 14.5+). If it isn't available, the app says so and you can use the keyboard's microphone instead.
- Requests go through your own WhatsApp or SMS app, so you press **Send** once to finish. Sending messages and calls with no tap at all would need a backend service; that could be added later.
