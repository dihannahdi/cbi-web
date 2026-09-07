# GEMINI Context: Centra Biotech Indonesia (CBI) Web

This file provides critical project context, architectural overview, and development guidelines for the Centra Biotech Indonesia (CBI) web platform.

## 🏗 Project Overview
CBI Web is a high-performance, SEO-optimized enterprise platform built for **PT Centra Biotech Indonesia**, a leading agro-biotechnology firm. The system is designed to showcase products (agriculture, livestock, fishery) and provide B2B manufacturing (Maklon) services.

- **Primary Tech Stack:** Next.js 16.1.1 (App Router), React 19.2.3, TypeScript, Tailwind CSS.
- **Backend:** Strapi CMS v5.8.0 (hosted on a VPS) with SQLite.
- **Internationalization (i18n):** Supports Indonesian (`id`, default) and English (`en`).
- **SEO Strategy:** Massive focus on Enterprise SEO, featuring automated article generation, rich structured data, and complex redirection logic for SERP optimization.

## 📁 Key Directory Structure
- `/app`: Next.js App Router.
  - `/[lang]`: Localized routes (Home, Products, News, Blog, etc.).
  - `/api`: Backend proxy routes, analytics, and revalidation logic.
- `/components`: Modular UI components.
  - `/layout`: Shared UI (Navbar, Footer, Container).
  - `/ui`: Radix-based low-level components.
  - `/product`, `/home`, `/about-us`: Feature-specific components.
- `/lib`: Core utilities (WhatsApp analytics, base utils).
- `/utils`: Heavyweight logic for SEO, Structured Data, and API client.
  - `seo.ts`: Central source of truth for SEO config and metadata generation.
  - `structuredData.tsx`: Complex Schema.org implementations.
- `/scripts`: Automation and maintenance tools.
  - `article-automation/`: System for processing DOCX to Strapi.
  - `python/`, `sql/`: Migration and analysis scripts.
- `/docs`: Comprehensive system documentation (Architecture, SEO Audits, GSC Reports).

## 🚀 Key Commands
| Command | Action |
|---------|--------|
| `npm run dev` | Starts development server with Turbopack. |
| `npm run build` | Builds the production application. |
| `npm run start` | Starts the built production server. |
| `npm run lint` | Runs ESLint for code quality. |
| `npm run seo:validate` | Validates SEO metadata and structure. |

## 🛠 Development Guidelines

### 1. Internationalization (i18n)
- All user-facing text must be externalized in `dictionaries/{id,en}.json`.
- Use the `getDictionary(lang)` utility in Server Components.
- The `middleware.ts` handles locale detection and 301 redirects for SEO.

### 2. SEO-First Engineering
- Every page must utilize `generateMetadata` or `generateMetadataFromProps` from `@/utils/seo`.
- Follow the **Master Keyword Strategy** defined in `utils/seo.ts`.
- Structured data (Schema.org) is mandatory for Products, Articles, and Local Business. Use `StructuredData` component.
- **Redirects:** Managed in `next.config.ts`. Do NOT add `www` redirects (handled by Vercel).

### 3. Image Optimization
- All images must use the Next.js `Image` component.
- Remote patterns are restricted to `backend.centrabiotechindonesia.com` and specific VPS IPs.
- SVG placeholders and blur effects are encouraged.

### 4. Integration with Strapi
- The frontend fetches data from the Strapi VPS (configured in `next.config.ts`).
- Content automation scripts in `/scripts/article-automation` process DOCX files from the VPS `drafts/` folder every 6 hours.

### 5. Styling
- Use Tailwind CSS with the `cn` utility (`tailwind-merge` + `clsx`) for dynamic classes.
- Follow the design tokens defined in `tailwind.config.ts`.

## 🌐 Remote Environment (Hostinger VPS)
The backend and automation systems are hosted on a Hostinger VPS. Access is available via `ssh hostinger`.

### 📍 Key Remote Paths
| Component | Path on VPS | Process Name (PM2) |
|-----------|-------------|--------------------|
| **Strapi CMS** | `/opt/cbi-strapi` | `cbi-strapi` |
| **Article Automation** | `/opt/cbi-article-automation` | N/A (Cron/Manual) |
| **GSC Monitor** | `/opt/cbi-gsc-monitor` | N/A |
| **Auxiliary Monitoring** | `/var/www/cbi-monitoring` | `cbi-frontend` |
| **Auxiliary API** | `/var/www/api.cbimonitoring` | `cbi-backend` |

### 🛠 Remote Workflow Commands
- **Check Status:** `ssh hostinger "pm2 status"`
- **View Logs:** `ssh hostinger "pm2 logs cbi-strapi"`
- **Restart Backend:** `ssh hostinger "pm2 restart cbi-strapi"`
- **Manual Automation Run:**
  ```bash
  ssh hostinger
  cd /opt/cbi-article-automation
  node article-uploader.js
  ```

## 📜 Strategic Documentation
- `docs/COMPLETE_SYSTEM_ARCHITECTURE.md`: Deep dive into infrastructure.
- `docs/ARTICLE_AUTOMATION_SYSTEM.md`: Details on the automated content pipeline.
- `docs/ULTRA_ADVANCED_SEO_IMPLEMENTATION.md`: SEO roadmap and best practices.
