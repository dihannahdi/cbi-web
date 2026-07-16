# CBI-WEB DEPLOY & INFRA NOTES

> Verified 2026-07-11 (this repo = the marketing site `centrabiotechindonesia.com`).
> Production is the **VPS**, NOT Vercel. The `vercel.json` and any "Vercel edge cache"
> comments in code are **legacy/stale** — we do not use Vercel anymore.

## Where the marketing site actually runs

- Domain `centrabiotechindonesia.com` / `www.` → **Cloudflare** → nginx on the VPS.
- nginx: `/etc/nginx/sites-available/centrabiotechindonesia.com` → `location /` `proxy_pass http://centrabio_frontend;` → upstream `centrabio_frontend` = **`127.0.0.1:3034`**.
- Served by pm2 process **`centrabio-frontend`** running **`/var/www/centrabiotechindonesia/server.js`** on **PORT 3034** (Node 24, fork mode).
- The app is a **Next.js standalone build** (`next.config` `output: 'standalone'`). App dir `/var/www/centrabiotechindonesia/` contains: `server.js`, `.next/`, `node_modules/` (minimal), `public/`, `data/`, `package.json`.
- **`/var/www/centrabiotechindonesia/` is NOT a git repo** — it is a copied build artifact. `.next` owner UID `197609` hints the build is produced on a Windows/WSL machine (Dihan's laptop) and copied over. Last deploy ~2026-06-11.

## ⚠️ pm2 naming traps (do NOT confuse)

| pm2 name | dir | port | what it is |
|---|---|---|---|
| **centrabio-frontend** | /var/www/centrabiotechindonesia | 3034 | **THE marketing site (this repo)** |
| cbi-frontend | /var/www/cbi-monitoring | 3001 | QC **monitoring** app (riste.centrabiotechindonesia.com) — NOT this repo |
| cbi-backend | /var/www/api.cbimonitoring | 3003 | monitoring API |
| cbi-strapi | /opt/cbi-strapi | 9338 | Strapi CMS → backend.centrabiotechindonesia.com |

## Deploy procedure (Next.js standalone → VPS)

1. Ensure **production env** is set locally before building (NEXT_PUBLIC_* are baked at build time). Confirm `next.config.ts` matches prod (image remotePatterns include `backend.centrabiotechindonesia.com`).
2. `npm run build` locally → produces `.next/standalone/` (+ `.next/static`, `public`).
3. Transfer to VPS `/var/www/centrabiotechindonesia/` (exact tool — rsync/scp/script — confirm with Dihan; a `/root/deployment-*.log` suggests an existing routine):
   - `.next/standalone/*` → app root
   - `.next/static` → `/var/www/centrabiotechindonesia/.next/static`
   - `public` → `/var/www/centrabiotechindonesia/public`
4. **Back up the current build first** (`.next`, `server.js`) so a bad deploy can be reverted.
5. `pm2 restart centrabio-frontend` and verify `curl -I http://127.0.0.1:3034/` (200) + the live domain.

### Direct tar-over-SSH method (verified 2026-07-17 — the one that actually works from Dihan's Windows laptop)

`rsync` is **not installed locally** (Git Bash on Windows), and `cp -r` into a staging dir is **slow and prone to stalling/locks** on the `.next/server` tree. Stream straight from the build with `tar` instead. A code-only change (reskin, components, catalog) does **not** change `node_modules` — only ship `.next` (server + static) + `server.js` (+ any new `public/` asset).

```bash
# from repo root, after `npm run build`
LOCAL_ID=$(cat .next/BUILD_ID)

# 1) stream standalone server build + server.js, then static, into a temp dir
ssh cbi-vps 'rm -rf /tmp/cbi-deploy-new && mkdir -p /tmp/cbi-deploy-new'
tar czf - -C .next/standalone .next server.js | ssh cbi-vps 'tar xzf - -C /tmp/cbi-deploy-new'
tar czf - -C .next static              | ssh cbi-vps 'tar xzf - -C /tmp/cbi-deploy-new/.next'
# verify: BUILD_ID matches, structure present
ssh cbi-vps 'cat /tmp/cbi-deploy-new/.next/BUILD_ID; test -d /tmp/cbi-deploy-new/.next/server && test -d /tmp/cbi-deploy-new/.next/static && test -f /tmp/cbi-deploy-new/server.js && echo OK'

# 2) instant mv-backup + atomic-ish swap + restart (run on VPS)
ssh cbi-vps 'set -e; cd /var/www/centrabiotechindonesia
  ts=$(date +%Y%m%d-%H%M%S)
  mv .next ".next.bak-$ts"; cp server.js "server.js.bak-$ts"
  mv /tmp/cbi-deploy-new/.next .next; mv /tmp/cbi-deploy-new/server.js server.js
  chmod -R a+rX .next
  pm2 restart centrabio-frontend --update-env'

# 3) new public assets (only if added) — e.g. a logo
# scp public/logo-mark.png cbi-vps:/var/www/centrabiotechindonesia/public/
```

**Verify:** `curl` `http://127.0.0.1:3034/<routes>` on the VPS (origin) first, then the live domain. Grep the served HTML/CSS for a marker unique to the new build. **Rollback:** `rm -rf .next && mv .next.bak-<ts> .next && cp server.js.bak-<ts> server.js && pm2 restart centrabio-frontend`.

**Cloudflare edge cache:** dynamic pages pass through (`Cf-Cache-Status: DYNAMIC`), but **`sitemap-*.xml` (Cache-Control max-age=3600) and some listing pages are edge-cached** — new content shows at origin immediately but lags at the edge until TTL (~1h). Purge Cloudflare for those paths if you need them fresh immediately.

**Backups:** each deploy leaves a `.next.bak-<ts>` (a full `.next` grows to ~0.5–1.4G at runtime from `.next/cache`). Git holds every commit, so keep only the **most recent** backup as the one-step rollback and prune the rest: `rm -rf .next.bak-<old-ts> server.js.bak-<old-ts>`.

## SSH

- `ssh hostinger` = same box as `ssh cbi-vps` (srv1232668, 72.62.122.166). Use **`cbi-vps`** for scripted/headless work — the `hostinger` alias uses Tailscale SSH which needs interactive browser re-auth.

## Content deploys (blog/news/product meta) — separate, no rebuild needed

Strapi content (blogs/articles) is edited directly on the VPS DB `/opt/cbi-strapi/.tmp/data.db` and is reflected by the site immediately (ISR ~10 min). See `docs/GSC_ACTION_PLAN_JULY_11_2026.md` and memory `cbi-seo-monitor`. A CODE change (components, tracking, funnel) DOES require the full build+copy deploy above.
