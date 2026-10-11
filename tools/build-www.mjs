// Copies the app files into www/, the folder Capacitor packs into the Android app.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const files = ['index.html', 'helper.html', 'styles.css', 'app.js', 'helper.js', 'manifest.webmanifest', 'icons'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of files) cpSync(f, `www/${f}`, { recursive: true });
console.log('wrote www/');
