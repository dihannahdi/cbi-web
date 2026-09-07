# CLAUDE.md

Project instructions for Claude Code when working on the CBI Web (PT Centra Biotech Indonesia) repository. Derived from `.github/copilot-instructions.md` and adapted for Claude.

## Project Overview

- **Stack**: Next.js 16 (App Router, Turbopack), React 19, TypeScript 5, Tailwind CSS 3.
- **Frontend**: This repository (`cbi-web`) deployed to the VPS, NOT Vercel — see `.claude/DEPLOY.md` for the authoritative procedure.
- **Backend**: Strapi CMS at `cbi-backend/` and on the VPS at `/opt/cbi-strapi/`.
- **Domains**: `centrabiotechindonesia.com` (frontend), `cbi-backend.my.id` (Strapi).
- **i18n**: `/[lang]/*` routes with `id` and `en` dictionaries in `dictionaries/`.

## Deployment

- **Production is the VPS, NOT Vercel.** Verified 2026-09-06: nginx on the VPS proxies `centrabiotechindonesia.com` to pm2 process `centrabio-frontend` (`/var/www/centrabiotechindonesia/server.js`, port 3034), `next.config` builds `output: "standalone"`, and the `vercel` CLI on this machine reports "No existing credentials found." Any `vercel.json` or "Vercel edge cache" comment in the code is legacy/stale.
- **Authority for the deploy procedure is `.claude/DEPLOY.md`** — do not duplicate or improvise the steps here; read that file before deploying. It covers the build-and-copy-to-VPS flow, the pm2 process names (and the naming trap with the unrelated `cbi-frontend` monitoring app), the tar-over-SSH transfer method, cache-busting verification, and rollback.
- Deploy only after the user confirms, or when they explicitly ask for deployment.
- Always deploy from the project root, not from a worktree, unless the user says otherwise.

## VPS / SSH Access

### Target
- **Host alias**: `hostinger` (configured in the user's SSH config).
- **IP**: `72.62.122.166`
- **User**: `root`
- **Strapi path**: `/opt/cbi-strapi/`

### SSH Protocol (strict)
1. When the user asks to "log in", "open SSH", or references the VPS, run only:
   ```bash
   ssh hostinger
   ```
   Then stop. Do not chain any further command, do not check status, do not probe. Yield with: "SSH connection opened. Please log in, then let me know when you're ready."
2. Always reuse the authenticated shell. Never open a second SSH session when one is already active.
3. Never simplify or rewrite the SSH command. Use `ssh hostinger` exactly.
4. Never ask for the password again during an active session.
5. For SCP transfers, open a separate terminal, then return to the SSH terminal.

### VPS Operations (always in the same authenticated terminal)
- Reading or editing config files
- PM2 (`pm2 restart`, `pm2 logs`, `pm2 list`, etc.)
- Database queries
- Service status checks
- Log viewing
- Strapi backend changes
- Article inspection and management on the VPS

### Prohibited
- Opening multiple SSH connections at once.
- Asking for the password repeatedly while a session is active.
- Switching terminals unnecessarily.
- Shortening the SSH command.

## Working Process

1. **Deep analysis first**: Read and understand the relevant files, routes, and VPS state before editing.
2. **Systematic and step-by-step**: Work section by section. Do not skip ahead.
3. **Finish end-to-end**: No half-implemented changes. Verify at each checkpoint.
4. **Break down long work**: For large changes, split into clear steps and complete each before the next.
5. **Use Context7** (`npx ctx7@latest ...`) when you need current library or SDK docs. Do not rely on training data for library APIs.

## Code Standards

- Prefer editing existing files over creating new ones.
- Do not simplify technical commands, domain terms, or instructions.
- Use full commands (SSH, deploy, PM2) without shortcuts.
- Keep responses concise; keep reasoning thorough.
- No emojis in code or prose unless the user asks. No em-dashes.
- Do not guess APIs, versions, flags, SHAs, or package names. Verify in code or docs first.

## Design Standards

- **Consistency**: Reuse existing design patterns, spacing, typography, and color tokens from the current site.
- **No new design styles**: Do not introduce new visual languages.
- **Professional and corporate**: World-class, brand-aligned presentation.
- **No shadows**: Do not use box-shadow / drop-shadow in UI components (explicit project rule).

## Contact Data

- **Business WhatsApp**: `085196214187` (international: `6285196214187`).
- **Email**: `centrabioindo@gmail.com`
- **Address**: Sawahan RT 02 RW 07 Pasungan, Ceper, Klaten, Jawa Tengah 57465.

Keep these values in sync across:
- `utils/seo.ts` (SITE_CONFIG)
- `utils/whatsappContact.ts` (default `businessPhone` and `getBusinessWhatsAppNumber`)
- `components/common/WhatsAppFloat.tsx`
- `components/layout/footer/CompanyInfo.tsx`
- Per-product pages under `app/[lang]/produk-layanan/**` and `app/[lang]/produk/**`
- Dictionaries `dictionaries/id.json`, `dictionaries/en.json`
- Public assets: `public/openapi.json`, `public/llms.txt`, `public/llms-full.txt`, `public/humans.txt`, `public/.well-known/security.txt`, `public/.well-known/ai-plugin.json`, `public/manifest.json`, `public/robots.txt`
- Manifests and metadata: `app/[lang]/manifest.ts`

## Quick Reference

```bash
# SSH to VPS
ssh hostinger

# Deploy frontend — see .claude/DEPLOY.md for the full procedure
# (production is the VPS, NOT Vercel)

# Local dev
npm run dev

# Build
npm run build
```

## Article Management

- **Local** files: edit in this workspace.
- **VPS** articles: always inspect and manage over the active `ssh hostinger` session. Do not duplicate state locally.
