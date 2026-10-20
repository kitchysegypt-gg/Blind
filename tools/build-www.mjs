// Copies the app files into www/, the folder Capacitor packs into the Android app.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const files = ['index.html', 'helper.html', 'track.html', 'styles.css', 'app.js', 'helper.js', 'track.js', 'manifest.webmanifest', 'icons'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of files) cpSync(f, `www/${f}`, { recursive: true });

// Push notifications need Firebase. Without google-services.json the app must not
// register for push (Android would crash), so the app only turns it on when the file is there.
if (existsSync('android/app/google-services.json')) {
  const html = readFileSync('www/index.html', 'utf8');
  writeFileSync('www/index.html', html.replace('<script src="app.js"', '<script>window.HH_PUSH = true;</script>\n  <script src="app.js"'));
  console.log('push notifications: on (google-services.json found)');
} else {
  console.log('push notifications: off (add android/app/google-services.json to turn them on)');
}
console.log('wrote www/');
