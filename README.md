# Quantum landing

Vite + React landing page for the Quantum macOS browser. Light, minimalist, based on the supplied Instrument Sans/stone design references.

## Start

```sh
npm install
npm run dev
npm run build
```

## Add your Quantum demo video

Place an MP4 at **`public/quantum-demo.mp4`**. The landing page automatically replaces the placeholder with an HTML5 video player (controls enabled). The app checks the video URL's MIME type before rendering the player, so a missing video doesn't display a broken player. Vite includes the video in `dist/` automatically. No code changes required.

Example:

```sh
cp ~/Movies/quantum-demo.mp4 public/quantum-demo.mp4
npm run build
```

If your source is `.mov` or another container, convert it to H.264 MP4 for broad browser support before adding it.

## Deployment

Vercel project: Vite framework, build `npm run build`, output `dist`.

The download button links to the existing **8,660-byte source prototype ZIP on Google Drive**, not a compiled/notarized macOS installer. The site intentionally avoids claims of a 10 KB installed app or measured RAM use.