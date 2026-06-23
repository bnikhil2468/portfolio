# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (port 5173, proxies /api → localhost:3001)
npm run build     # Production build → dist/
npm run server    # Start Express backend for Spotify API (port 3001)
npm run get-token # One-time script to get a Spotify OAuth refresh token
```

For local development with Spotify data, both servers must run concurrently: `npm run server` in one terminal and `npm run dev` in another. `server.js` reads `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` from `process.env` directly (no dotenv loader), so export a local `.env` into the shell first: `set -a && source .env && set +a && npm run server`.

## Git

This repo lives inside a parent directory (`Nikhil Portfolio/`) that is itself a git repo, making this an embedded/nested git repo. Always run git commands from inside `nikhilportfoliov2/` — the remote at `https://github.com/bnikhil2468/portfolio.git` is on this inner repo.

## Architecture

Single-page portfolio app — no routing, no tests, no linting config.

**Frontend:** React 18 + TypeScript + Tailwind CSS, bundled by Vite. Entry: `src/index.tsx` → `src/App.tsx`.

**Rendered layout hierarchy:**
```
App
├── GridBackground       # decorative CSS grid overlay
├── ThemeToggle          # fixed top-right; persists to localStorage, toggles `dark` class on <html>
├── Container → ContentWrapper
│   ├── Header → HeaderContent          # name + social links
│   ├── ExperienceSection → ExperienceList   # hardcoded cards with logo images
│   ├── EngineeringSection → ProjectGrid     # hardcoded project cards (labeled "Projects" in UI)
│   └── MusicSection → SpotifyTracks        # fetches top 6 tracks; shows "Last at MM/DD, H:MM AM/PM" timestamp on load
└── Footer               # "Carpe diem." on left, live analog clock + year on right
```

**Dead sections (exist in `src/sections/` but not imported in ContentWrapper):**
- `NowSection` — green/blue/violet status dots with current activities
- `ExperimentsSection` — grid of side-project links

**Path alias:** `@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**Static assets:** Vite `publicDir` is `./static`, so files in `static/` are served from `/`. Logo images for experience cards are in `static/images/`; project images are in `static/images/projects/`.

**Content is hardcoded** — experience entries in `ExperienceList.tsx`, projects in `ProjectGrid.tsx`, header links in `HeaderContent.tsx`. No CMS or data file.

**Dark mode:** Tailwind `darkMode: ["class"]`. The `dark` class is toggled on `<html>` by `ThemeToggle`. Use `dark:` variants for all dark-mode styles.

**MusicSection timestamp pattern:** `SpotifyTracks` accepts an `onLoaded?: (date: Date) => void` prop. `MusicSection` passes `setLastUpdated` as that callback and formats the date in the header row once tracks load.

**Spotify integration (two environments, same refresh-token logic duplicated):**
- *Local dev:* `server.js` (Express) at port 3001, proxied via Vite.
- *Production (Vercel):* `api/spotify/top-tracks.js` is a Vercel serverless function — auto-routed by filesystem, no rewrite config needed. Requires `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` in Vercel env vars.
- Refresh token needs `user-top-read` scope; `user-read-recently-played` returns 403.

**TypeScript:** `tsconfig.app.json` has `strict`, `noUnusedLocals`, and `noUnusedParameters`. No separate typecheck script — `npm run build` runs Vite only (no `tsc` step).
