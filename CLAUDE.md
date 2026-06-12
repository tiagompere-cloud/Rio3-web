# Rio3 · Main Website — Project Handoff

## What this project is

The main marketing website for Rio3 (Rio3 — Integrative Health, Deerfield Beach).
It includes a Square Appointments booking integration.

## Repo structure

Everything lives inside the `Rio3/` subfolder:
- `Rio3/index.html` — the main page (React + Babel, loaded from CDN, no build step)
- `Rio3/src/components.tsx` — React components
- `Rio3/src/heroes.tsx` — hero section components
- `Rio3/styles.css` — stylesheet
- `Rio3/tweaks-panel.tsx` — staff tweaks panel
- `Rio3/image-slot.ts` — image slot web component
- `Rio3/api/` — Square API serverless functions (availability, bookings)

There is no build step. Cloudflare Pages serves the `Rio3/` subfolder directly.

## Hosting

- **Platform:** Cloudflare Pages (migrated from Netlify)
- **Project name:** `rio3-web` (under account `ozone.rita`)
- **Custom domains:** `rio3.com` and `www.rio3.com`
- **DNS:** Managed by Cloudflare (nameservers: `curt.ns.cloudflare.com` / `holly.ns.cloudflare.com`)
- **GitHub repo:** `https://github.com/tiagompere-cloud/Rio3-web` (private)
- Auto-deploys on every push to `main`

## Current state — IMPORTANT

The live site at `rio3.com` is currently showing a **maintenance page**.
The real site was replaced in commit `b76f152` ("temp: maintenance page").

To restore the real site, revert that commit:
```
git revert b76f152
git push
```
Or simply replace `Rio3/index.html` with the working version from git history.

## Other Rio3 projects

- `rio3-iv-program-builder` — internal IV program builder tool, separate Cloudflare Pages project at `https://github.com/tiagompere-cloud/rio3-iv-program-builder`

## Netlify (old hosting — no longer in use)

The following Netlify sites still exist but are paused and no longer serve traffic:
- `rio3.com` (Netlify project)
- `rio3-website`
- `rio3usa`
- `neon-maamoul-0567ad`

These can be deleted from app.netlify.com when convenient.

## Local path (Windows)

```
C:\Users\tiago\Documents\Projects\Rio3\rio3-web
```
