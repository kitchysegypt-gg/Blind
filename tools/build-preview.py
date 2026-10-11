#!/usr/bin/env python3
"""Build a single-file preview of the app (dist/helping-hand-preview.html).

The preview inlines the CSS and JS and sets HH_PREVIEW so that calls,
messages and location are shown on screen instead of used.
It's for hosted previews (like a claude.ai artifact) where those device
features aren't allowed. The real app is index.html.
"""
import base64
import pathlib
import re

root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "styles.css").read_text(encoding="utf-8")
js = (root / "app.js").read_text(encoding="utf-8")

title = re.search(r"<title>.*?</title>", html, re.S).group(0)
body = re.search(r"<!-- BODY:START -->(.*)<!-- BODY:END -->", html, re.S).group(1)

FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Cairo:wght@500;600;700;800&display=swap">'

# The logo goes inside the page, since a single-file preview has no icons folder.
logo = base64.b64encode((root / "icons" / "logo.jpg").read_bytes()).decode()
body = body.replace('src="icons/logo.jpg"', f'src="data:image/jpeg;base64,{logo}"')

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

# The business-plan website, as a single page for a hosted preview.
# Its "Try the app" buttons point at the hosted app preview instead of ../
APP_PREVIEW_URL = "https://claude.ai/artifact/KKW63YRKGg9pmyEHGDsNVm"
site = (root / "website" / "index.html").read_text(encoding="utf-8")
head = re.search(r"<head>(.*)</head>", site, re.S).group(1)
body = re.search(r"<body>(.*)</body>", site, re.S).group(1)
head = re.sub(r'\s*<meta[^>]*>|\s*<link rel="(icon|preconnect)"[^>]*>', "", head)
body = body.replace('href="../" data-app-link', f'href="{APP_PREVIEW_URL}" target="_blank" rel="noopener" data-app-link')
(dist / "website-preview.html").write_text(head.strip() + "\n" + body.strip() + "\n", encoding="utf-8")
print("wrote", dist / "website-preview.html")
