# Quantum landing

Vite + React landing page for the Quantum macOS browser. Uses Instrument Sans and the supplied light stone design system. The browser preview is an interactive visual demo, not an embedded browser.

```sh
npm install
npm run dev
npm run build
```

To activate the macOS DMG download when a real release exists, set `VITE_QUANTUM_DMG_URL` to the release asset URL in Vercel and redeploy. Until then the page says “Coming soon” and does not link to a nonexistent installer.

Vercel: Framework = Vite; Build command = `npm run build`; Output directory = `dist`.