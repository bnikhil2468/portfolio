# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (port 5173, proxies /api → localhost:3001)
npm run build     # Production build → dist/
npm run server    # Start Express backend for Spotify API (port 3001)
npm run get-token # One-time script to get a Spotify OAuth refresh token
```

For local development with Spotify data, both servers must run concurrently: `npm run server` in one terminal and `npm run dev` in another.

## Architecture

Single-page portfolio app — no routing, no tests, no linting config.

**Frontend:** React 18 + TypeScript + Tailwind CSS, bundled by Vite. Entry: `src/index.tsx` → `src/App.tsx`.

**Layout hierarchy:**
```
App
├── GridBackground       # decorative CSS grid overlay
├── ThemeToggle          # fixed top-right button; persists to localStorage, toggles `dark` class on <html>
├── Container → ContentWrapper
│   ├── Header           # name, tagline, social links
│   ├── ExperienceSection → ExperienceList   # hardcoded experience cards with logo images
│   ├── EngineeringSection → ProjectGrid     # hardcoded project cards
│   └── MusicSection → SpotifyTracks        # fetches from /api/spotify/recently-played
└── Footer
```

**Path alias:** `@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Static assets:** Vite `publicDir` is `./static`, so files in `static/` are served from `/`. Logo images for experience cards live in `static/images/` and are referenced as `/images/<filename>`.

**Spotify integration (two environments):**
- *Local dev:* `server.js` (Express) handles `/api/spotify/recently-played`, uses env vars `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`. Vite proxies `/api` to port 3001.
- *Netlify:* `netlify.toml` redirects `/api/spotify/recently-played` to `/.netlify/functions/spotify-recently-played` (serverless function, not yet in repo).

**Dark mode:** Tailwind `darkMode: ["class"]`. The `dark` class is toggled on `<html>` by `ThemeToggle`. Use `dark:` variants for all dark-mode styles.

**Content is hardcoded** — experience entries are in `ExperienceList.tsx`, projects in `ProjectGrid.tsx`, header links in `HeaderContent.tsx`. There is no CMS or data file.
