#!/usr/bin/env python3
"""Build a single-file preview of the app (dist/helping-hand-preview.html).

The preview inlines the CSS and JS and sets HH_PREVIEW so that calls,
messages, the microphone and location are shown on screen instead of used.
It's for hosted previews (like a claude.ai artifact) where those device
features aren't allowed. The real app is index.html.
"""
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "styles.css").read_text(encoding="utf-8")
js = (root / "app.js").read_text(encoding="utf-8")

title = re.search(r"<title>.*?</title>", html, re.S).group(0)
body = re.search(r"<!-- BODY:START -->(.*)<!-- BODY:END -->", html, re.S).group(1)

FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Noto+Kufi+Arabic:wght@500;700&display=swap">'

out = f"""{title}
{FONTS}
<style>
{css}
</style>
{body}
<script>window.HH_PREVIEW = true;</script>
<script>
{js}
</script>
"""
dist = root / "dist"
dist.mkdir(exist_ok=True)
(dist / "helping-hand-preview.html").write_text(out, encoding="utf-8")
print("wrote", dist / "helping-hand-preview.html")
