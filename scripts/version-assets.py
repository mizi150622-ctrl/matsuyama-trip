"""Refresh asset URLs after editing JS/CSS so browsers fetch the matching release."""
from hashlib import sha256
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
page = root / 'index.html'
html = page.read_text()
for asset, attribute in [('style.css', 'href'), ('widgets.js', 'src'), ('app.js', 'src')]:
    version = sha256((root / asset).read_bytes()).hexdigest()[:12]
    pattern = rf'{attribute}="{re.escape(asset)}(?:\?[^"\s]*)?"'
    html, matches = re.subn(pattern, f'{attribute}="{asset}?v={version}"', html)
    if matches != 1:
        raise SystemExit(f'Expected one reference for {asset}, found {matches}')
page.write_text(html)
print('Updated asset versions in index.html.')
