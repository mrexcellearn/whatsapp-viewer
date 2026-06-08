# Chat Viewer (PWA)

Read an exported WhatsApp chat `.txt` in a familiar chat layout. Installable to your
phone's home screen and works offline. **Your chat file never leaves your device** — it is
read locally in the browser and is never uploaded, fetched, or cached by the app.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole app (UI + parser + viewer) |
| `manifest.webmanifest` | Makes it installable as a PWA |
| `sw.js` | Service worker — offline support & install |
| `icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` | App icons |

Keep all files together in the same folder. **Do not** commit your chat `.txt` — that
would publish a private conversation to the public web.

## Deploy to GitHub Pages

1. Create a new repository (e.g. `chat-viewer`).
2. Upload **all** the files in this folder to the repo root.
3. Repo **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save.
4. After ~1 minute it's live at `https://<your-username>.github.io/chat-viewer/`.

## Install on your phone

- Open the Pages URL in your phone's browser.
- **Android / Chrome:** menu → *Add to Home screen* / *Install app*.
- **iPhone / Safari:** Share button → *Add to Home Screen*.

It now opens full-screen like a native app, and the app shell works offline (you still
pick your chat file each time — it isn't stored).

## Notes

- WhatsApp exports don't include media files, so images and voice notes show as
  placeholders (`Media omitted`).
- Large exports (hundreds of thousands of messages) take a few seconds to parse on first
  load; scrolling stays smooth because only the visible part is rendered at a time.
- A PWA requires HTTPS. GitHub Pages serves HTTPS automatically, so installation works.
