# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (port 5173, proxies /api → localhost:3001)
npm run build     # Production build → dist/
npm run server    # Start Express backend for Spotify API (port 3001)
npm run get-token # One-time script to get a Spotify OAuth refresh token
```

For local development with Spotify data, both servers must run concurrently: `npm run server` in one terminal and `npm run dev` in another. `server.js` reads `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` from `process.env` directly (no dotenv loader), so export a local `.env` into the shell first, e.g. `set -a && source .env && set +a && npm run server`.

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
│   └── MusicSection → SpotifyTracks        # fetches top 6 tracks from /api/spotify/top-tracks
└── Footer
```

**Path alias:** `@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Static assets:** Vite `publicDir` is `./static`, so files in `static/` are served from `/`. Logo images for experience cards live in `static/images/` and are referenced as `/images/<filename>`.

**Spotify integration (two environments, same refresh-token logic duplicated):**
- *Local dev:* `server.js` (Express) handles `/api/spotify/top-tracks`, calling `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=6`. Vite proxies `/api` to port 3001.
- *Production (Vercel):* `api/spotify/top-tracks.js` is a Vercel serverless function (auto-routed to `/api/spotify/top-tracks` by Vercel's filesystem-based API routing — no rewrite config needed). Requires the same three `SPOTIFY_*` env vars to be set in the Vercel project's environment variables.
- The refresh token must be authorized with the `user-top-read` scope (not `user-read-recently-played`) — the top tracks endpoint returns 403 "Insufficient client scope" otherwise.
- `get-spotify-token.js` (`npm run get-token`) is a one-time interactive script to mint a refresh token via the OAuth code flow, using redirect URI `http://127.0.0.1:5173/callback` (served by `public/callback.html` — but note Vite's `publicDir` is set to `./static`, so this file is not actually served; the redirect still works for copying the code from the browser's address bar even if the page itself 404s).

**Dark mode:** Tailwind `darkMode: ["class"]`. The `dark` class is toggled on `<html>` by `ThemeToggle`. Use `dark:` variants for all dark-mode styles.

**Content is hardcoded** — experience entries are in `ExperienceList.tsx`, projects in `ProjectGrid.tsx`, header links in `HeaderContent.tsx`. There is no CMS or data file.

**TypeScript:** `tsconfig.app.json` has `strict`, `noUnusedLocals`, and `noUnusedParameters` enabled. There is no separate lint or typecheck script — `npm run build` runs Vite's build only (no `tsc` type-check step).
