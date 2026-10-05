# Portfoli — Adrià Bausili

Static portfolio site (plain HTML, CSS, and JavaScript). No framework.

Catalan copy. Desktop-first layout from the Figma file *Portfoli web*.

## Open locally

From this folder:

```bash
python3 -m http.server 8765
```

Then open [http://127.0.0.1:8765](http://127.0.0.1:8765).

Or open `index.html` directly in a browser (some features that use `localStorage` still work from `file://`).

## Pages

| File | Status |
| --- | --- |
| `index.html` | Projectes — card stack + interactions |
| `sobre-mi.html` | Placeholder |
| `barmood.html` | Placeholder |
| `miro.html` | Placeholder |
| `especimen.html` | Placeholder |

## Interactions (index)

1. **Stack tilt** — the whole `conjunt` rotates and translates slightly with the mouse.
2. **Card lift** — hovering a project lifts that card.
3. **Cursor tag** — project type follows the cursor: `disseny web` / `redisseny` / `especimen`.
4. **Pale background** — every page load picks a soft pastel color, writes it to `localStorage` under `portfoli-page-bg`, and sets CSS `--page-bg` so later pages can share the same mechanism.

## Fonts

| Role in Figma | Used here |
| --- | --- |
| Fontlab Regular | `fonts/fontlab-webfont.woff` (`Fontlab`) — name, nav, cursor tags |
| Roca One Black | `fonts/RocaOne-Bl.woff2` — Barmood wordmark on the index |
| Roca One Bold Italic | `fonts/RocaOne-BdIt.woff` — ready for Barmood marquees / UI |
| Roca One Heavy Italic | `fonts/RocaOne-HvIt.woff2` — ready for Barmood marquees |
| Instrument Serif | Instrument Serif (Google Fonts) — role, footer |
| Bricolage Grotesque | Bricolage Grotesque variable (Google Fonts) |
| Inter Semi Bold | Inter (Google Fonts) — available for Miró “Barcelona” if needed as text |

Miró card on the index uses the provided signature + Barcelona SVG (`assets/miro-signature.svg`).


## Assets

- `assets/asterisk.svg` — specimen asterisk (approximated; Figma MCP export was rate-limited)
- `assets/miro-signature.svg` — Miró signature + Barcelona lockup from design
- Barmood index card uses CSS + Roca One Black wordmark (full illustrated export still pending from Figma)


## Structure

```
index.html
sobre-mi.html
barmood.html
miro.html
especimen.html
css/styles.css
js/main.js
assets/
README.md
```
