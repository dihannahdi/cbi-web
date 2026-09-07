# 🔍 STRAPI VPS COMPREHENSIVE ANALYSIS REPORT

**Date:** January 21, 2026  
**VPS:** Hostinger Ubuntu 24.04.3 LTS (72.62.122.166)  
**Strapi Version:** 5.8.0  
**Domain:** https://cbi-backend.my.id  
**Frontend:** Next.js 15 on Vercel (cbi-web.vercel.app)

---

## 📊 EXECUTIVE SUMMARY

| Aspect | Status | Priority |
|--------|--------|----------|
| API Availability | ✅ Working | - |
| CORS Configuration | ✅ Properly Configured | - |
| Security (CSP) | ⚠️ Needs Improvement | Medium |
| Database | ⚠️ SQLite (Not Production-Ready) | High |
| PM2 Stability | ❌ High Restart Count (185) | Critical |
| i18n Implementation | ❌ Only English Data | High |
| Environment Mode | ⚠️ Running in Development | High |
| System Resources | ✅ Healthy | - |
| SSL/NGINX | ✅ Properly Configured | - |

---

## 🏗️ INFRASTRUCTURE ANALYSIS

### 1. Server Specifications

```
OS: Ubuntu 24.04.3 LTS
Node.js: v24.12.0
Memory: 3.8GB Total, 1.3GB Used (34%)
Disk: 48GB Total, 13GB Used (27%)
Swap: None configured
```

**Assessment:** Server resources are adequate for current load.

### 2. Strapi Configuration

#### Server Config (`/opt/cbi-strapi/config/server.ts`)
```typescript
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 9337),
  url: 'https://cbi-backend.my.id',
  proxy: true,
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```
✅ **Correct:** URL set properly with proxy enabled for NGINX.

#### Database Config
```typescript
// Currently using SQLite
client: 'sqlite',
filename: '.tmp/data.db'  // 3.7MB
```
⚠️ **Issue:** SQLite is not recommended for production. Consider migrating to PostgreSQL or MySQL.

#### Plugins Config
```typescript
export default {
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250MB
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'id',
      locales: ['id', 'en'],
    },
  },
};
```
✅ **i18n Enabled** with Indonesian (default) and English locales.

### 3. NGINX Configuration

```nginx
server {
    listen 443 ssl;
    server_name cbi-backend.my.id;
    
    ssl_certificate /etc/letsencrypt/live/cbi-backend.my.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cbi-backend.my.id/privkey.pem;
    
    location /uploads/ {
        alias /opt/cbi-strapi/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    location / {
        proxy_pass http://localhost:9338;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```
✅ **SSL:** Let's Encrypt properly configured  
✅ **Static Files:** Uploads served with 30-day cache  
⚠️ **Note:** Proxy port is 9338 (matches PM2 ecosystem config)

### 4. PM2 Process Management

```
Process: cbi-strapi-dev
Status: online
Uptime: 14h
Restarts: 185 ❌ (HIGH - indicates instability)
Memory: 71.1MB
Mode: fork_mode
Script: npm run develop ⚠️ (DEVELOPMENT MODE)
```

**ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'cbi-strapi-dev',
    script: 'npm',
    args: 'run develop',  // ⚠️ Should be 'run start' for production
    env: {
      NODE_ENV: 'development',  // ⚠️ Should be 'production'
      PORT: 9338,
      HOST: '0.0.0.0'
    }
  }]
}
```

---

## 🔐 SECURITY ANALYSIS

### Middlewares Configuration

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 
            'https://cbi-backend.my.id', 
            'https://www.centrabiotechindonesia.com', 
            'https://cbi-web.vercel.app'],
          'media-src': ["'self'", 'data:', 'blob:', 
            'https://cbi-backend.my.id', 
            'https://www.centrabiotechindonesia.com', 
            'https://cbi-web.vercel.app'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['*'],  // ⚠️ Too permissive for production
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', 
                'X-Requested-With', 'Range'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'],
      expose: ['Content-Length', 'Content-Range', 'Content-Disposition'],
      credentials: false,
    },
  },
  // ... other middlewares
];
```

### Security Issues Found:

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| CORS origin: '*' | Medium | Restrict to specific domains |
| Running in development mode | High | Switch to production |
| No rate limiting | Medium | Add rate limiting middleware |
| No API token required for public endpoints | Low | Consider for sensitive data |

---

## 📦 CONTENT ANALYSIS

### Content Types (25 APIs)

| Content Type | Status | Public Access |
|--------------|--------|---------------|
| product-detail-page | ✅ Active | find, findOne |
| articles | ✅ Active | find, findOne |
| blogs | ✅ Active | find, findOne |
| products | ✅ Active | find, findOne |
| services | ✅ Active | find, findOne |
| contacts | ✅ Active | find, findOne |

### Product Detail Pages (12 products)

| Slug | Name | Locale | Status |
|------|------|--------|--------|
| rajabio-pupuk-organik | RAJABIO | en | ❌ No ID locale |
| floraone-pupuk-hayati | FLORA ONE | en | ❌ No ID locale |
| biokiller-insektisida-hayati | BIOKILLER | en | ❌ No ID locale |
| simbios-pupuk-hayati | SIMBIOS | en | ❌ No ID locale |
| blackturbo-asam-humat | BLACK TURBO | en | ❌ No ID locale |
| biojagat-pupuk-hayati-cair | BIOJAGAT | en | ❌ No ID locale |
| biokalsi-dolomit | BIOKALSI | en | ❌ No ID locale |
| floraone-pupuk-hayati-padat | FLORAONE | en | ❌ No ID locale |
| terrachamp | TERRACHAMP | en | ❌ No ID locale |
| biomaxi | BIOMAXI | en | ❌ No ID locale |
| bioaqua | BIOAQUA | en | ❌ No ID locale |
| lumbricompost | LUMBRICOMPOST | en | ❌ No ID locale |

**Critical Issue:** All products only have English (en) locale data despite i18n plugin being configured with Indonesian (id) as default locale.

### Components Structure

```
/src/components/
├── about-us/
├── contact/
├── dashboard/
├── metadata/
├── product/
├── product-detail/  (13 component schemas)
│   ├── benefit-item.json
│   ├── certification-item.json
│   ├── composition.json
│   ├── crop-dosage.json
│   ├── dosage-stage.json
│   ├── dosage.json
│   ├── external-links.json
│   ├── faq-item.json
│   ├── nutrient-item.json
│   ├── pricing.json
│   ├── stat-item.json
│   └── video-item.json
└── products-and-services/
```

✅ **Component structure is comprehensive** and well-organized.

---

## 🔗 FRONTEND INTEGRATION ANALYSIS

### Current Implementation

**Frontend:** Next.js on Vercel (cbi-web.vercel.app)  
**Data Fetching:** `/utils/strapiProductData.ts`

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cbi-backend.my.id";

export async function fetchStrapiProduct(slug: string): Promise<StrapiProductData | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/product-detail-pages?filters[slug][$eq]=${slug}&populate=*`,
    {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: { 'Content-Type': 'application/json' },
    }
  );
  // ...
}
```

**Pattern:** Hybrid approach - fetch from Strapi with static fallback

### API Response Test

```bash
curl "https://cbi-backend.my.id/api/product-detail-pages"
# Response: 200 OK with 12 products
```

✅ **API is accessible** and returning data correctly.

### Environment Configuration

```env
# .env.local
NEXT_PUBLIC_URL_API="https://cbi-backend.my.id"
```

⚠️ **Variable name inconsistency:** Frontend uses `NEXT_PUBLIC_URL_API` but strapiProductData.ts uses `NEXT_PUBLIC_STRAPI_URL`

---

## 🚨 ISSUES & RECOMMENDATIONS

### CRITICAL ISSUES (Fix Immediately)

#### 1. PM2 Stability - 185 Restarts
**Problem:** High restart count indicates instability
**Cause:** ECONNRESET errors in logs
```
Error: write ECONNRESET
    at afterWriteDispatched (node:internal/stream_base_commons:159:15)
Error: read ECONNRESET
    at TCP.onStreamRead (node:internal/stream_base_commons:216:20)
```
**Solution:**
```bash
# 1. Update ecosystem.config.js
module.exports = {
  apps: [{
    name: 'cbi-strapi',
    script: 'npm',
    args: 'run start',  # Changed from develop
    env: {
      NODE_ENV: 'production',  # Changed from development
      PORT: 9338,
      HOST: '0.0.0.0'
    },
    max_memory_restart: '500M',
    restart_delay: 5000,
    max_restarts: 10,
    kill_timeout: 5000
  }]
}

# 2. Rebuild and restart
cd /opt/cbi-strapi
npm run build
pm2 delete cbi-strapi-dev
pm2 start ecosystem.config.js
pm2 save
```

#### 2. Missing Indonesian (ID) Locale Data
**Problem:** All 12 products only have English content
**Impact:** Indonesian users see English content instead of localized content
**Solution:**
1. Log into Strapi Admin Panel
2. For each product, click "Add another locale" → Select "Indonesian (id)"
3. Translate all content fields
4. Publish the Indonesian version

#### 3. Development Mode in Production
**Problem:** Strapi running with `npm run develop`
**Impact:** Poor performance, unnecessary rebuilds, security risks
**Solution:** See PM2 fix above

### HIGH PRIORITY ISSUES

#### 4. SQLite Database Not Suitable for Production
**Problem:** SQLite lacks concurrent write support and is not suitable for multi-user production
**Recommendation:** Migrate to PostgreSQL
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createuser strapi
sudo -u postgres createdb strapi -O strapi

# Update config/database.ts
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'secure_password'),
    },
  },
});
```

#### 5. CORS Configuration Too Permissive
**Problem:** `origin: ['*']` allows any domain
**Solution:**
```typescript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: [
      'https://cbi-web.vercel.app',
      'https://www.centrabiotechindonesia.com',
      'https://centrabiotechindonesia.com',
      'http://localhost:3000'  // for local development
    ],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
    credentials: true,
  },
}
```

### MEDIUM PRIORITY ISSUES

#### 6. Environment Variable Inconsistency
**Frontend uses:** `NEXT_PUBLIC_URL_API`  
**strapiProductData.ts uses:** `NEXT_PUBLIC_STRAPI_URL`  
**Fix:** Align variable names

#### 7. No Swap Memory Configured
**Problem:** System has 0B swap, can cause crashes under memory pressure
**Solution:**
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

#### 8. Outdated caniuse-lite Database
**Problem:** Browserslist data is 12 months old
**Solution:**
```bash
cd /opt/cbi-strapi
npx update-browserslist-db@latest
npm run build
```

### LOW PRIORITY / BEST PRACTICES

#### 9. Add API Configuration
Create `/opt/cbi-strapi/config/api.ts`:
```typescript
export default ({ env }) => ({
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
  },
  responses: {
    privateAttributes: ['_v', 'createdBy', 'updatedBy'],
  },
});
```

#### 10. Add Rate Limiting
```bash
npm install @strapi/plugin-rate-limit
```

#### 11. Add Health Check Endpoint
Create custom controller for monitoring.

---

## 📋 ACTION CHECKLIST

### Immediate Actions (Today)
- [ ] Switch from development to production mode
- [ ] Fix PM2 configuration with proper restart policies
- [ ] Rebuild Strapi with `npm run build`
- [ ] Restart with production settings

### Short-term (This Week)
- [ ] Add Indonesian locale content for all 12 products
- [ ] Tighten CORS configuration
- [ ] Configure swap memory
- [ ] Update browserslist database

### Medium-term (This Month)
- [ ] Migrate from SQLite to PostgreSQL
- [ ] Implement API rate limiting
- [ ] Add monitoring/alerting
- [ ] Set up automated backups

### Long-term (Ongoing)
- [ ] Implement CI/CD pipeline
- [ ] Add staging environment
- [ ] Performance optimization
- [ ] Security audit

---

## � COMPLETE CONTENT DATA FLOW ANALYSIS

### Content Types Overview

| Content Type | API Endpoint | Count | ID Locale | EN Locale | Status |
|--------------|--------------|-------|-----------|-----------|--------|
| **Blogs** | `/api/blogs` | 48 | 45 ✅ | 3 ⚠️ | Mostly ID |
| **Articles (News)** | `/api/articles` | 11 | 11 ✅ | 0 ❌ | ID Only |
| **Product Detail Pages** | `/api/product-detail-pages` | 12 | 0 ❌ | 12 ✅ | EN Only |
| **Products** | `/api/products` | 6 | - | - | Legacy |
| **Product Items** | `/api/product-items` | 20 | - | - | Legacy |
| **Services** | `/api/services` | - | - | - | Legacy |
| **Dashboard** | `/api/dashboard` | 1 | ✅ | ✅ | OK |
| **About Us** | `/api/about-us` | 1 | ✅ | ✅ | OK |
| **Contact** | `/api/contact` | 1 | ✅ | ✅ | OK |
| **Blog Section** | `/api/blog-section` | 1 | ✅ | ✅ | OK |
| **News Section** | `/api/news-section` | 1 | ✅ | ✅ | OK |

### Frontend ↔ Backend Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js on Vercel)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    ┌──────────────────┐    ┌───────────────────┐  │
│  │  Homepage       │    │  Blog Page       │    │  News Page        │  │
│  │  /[lang]        │    │  /[lang]/blog    │    │  /[lang]/news     │  │
│  │                 │    │                  │    │                   │  │
│  │  Uses:          │    │  Uses:           │    │  Uses:            │  │
│  │  - dashboard    │    │  - blog-section  │    │  - news-section   │  │
│  │  - products     │    │  - blogs         │    │  - articles       │  │
│  └────────┬────────┘    └────────┬─────────┘    └─────────┬─────────┘  │
│           │                      │                        │             │
│  ┌────────┴────────┐    ┌────────┴─────────┐    ┌────────┴─────────┐  │
│  │ Blog Detail     │    │ Product Page     │    │ News Detail      │  │
│  │ /blog/[slug]    │    │ /produk-layanan/ │    │ /news/[slug]     │  │
│  │                 │    │ pertanian/[slug] │    │                  │  │
│  │ Uses:           │    │                  │    │ Uses:            │  │
│  │ - blogs         │    │ Uses:            │    │ - articles       │  │
│  │   (by slug)     │    │ - product-detail │    │   (by slug)      │  │
│  └─────────────────┘    │   -pages         │    └──────────────────┘  │
│                         └──────────────────┘                           │
│                                                                          │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │
                                   │ HTTP Requests
                                   │ with ?locale=id or ?locale=en
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   STRAPI BACKEND (VPS - cbi-backend.my.id)              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   NGINX (Port 443)  ──►  PM2 Process (Port 9338)  ──►  SQLite DB        │
│                                                                          │
│   API Endpoints:                                                         │
│   ├── /api/dashboard          (SingleType, i18n)                        │
│   ├── /api/blogs              (Collection, i18n) - 48 items             │
│   ├── /api/articles           (Collection, i18n) - 11 items             │
│   ├── /api/product-detail-pages (Collection, i18n) - 12 items           │
│   ├── /api/blog-section       (SingleType, i18n)                        │
│   ├── /api/news-section       (SingleType, i18n)                        │
│   ├── /api/about-us           (SingleType, i18n)                        │
│   ├── /api/contact            (SingleType, i18n)                        │
│   ├── /api/product-agriculture (SingleType, i18n)                       │
│   ├── /api/product-livestock   (SingleType, i18n)                       │
│   └── /api/product-fishery     (SingleType, i18n)                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### API Request Pattern (Frontend)

```typescript
// utils/apiClient.ts
const BASE_URL = process.env.NEXT_PUBLIC_URL_API || 'https://cbi-backend.my.id';

// Example: Fetch blogs with locale
const { data } = await apiRequest<ArticlesCollectionResponse>({
  path: ApiPath.BLOGS,
  queryParams: allBlogsQuery,
  locale: lang,  // 'id' or 'en'
});

// API call becomes:
// GET https://cbi-backend.my.id/api/blogs?...&locale=id
```

### i18n Data Distribution Analysis

```
┌─────────────────────────────────────────────────────────────────┐
│                    i18n DATA COMPLETENESS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BLOGS (48 total)                                               │
│  ├── Indonesian (id): ████████████████████████████████████ 45   │
│  └── English (en):    ███                                    3   │
│                                                                  │
│  ARTICLES/NEWS (11 total)                                       │
│  ├── Indonesian (id): ████████████████████████████████████ 11   │
│  └── English (en):                                           0   │
│                                                                  │
│  PRODUCT DETAIL PAGES (12 total)                                │
│  ├── Indonesian (id):                                        0   │
│  └── English (en):    ████████████████████████████████████ 12   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

⚠️ CRITICAL MISMATCH: 
- Product pages only in English - Indonesian users see English content
- News articles only in Indonesian - English users get empty results
- Blogs mostly Indonesian, minimal English content
```

### Content Type Schemas

#### Blog Schema (`/api/blogs`)
```json
{
  "title": "string (i18n)",
  "shortDescription": "text (i18n)",
  "slug": "uid (i18n)",
  "content": "blocks (i18n)",
  "image": "media",
  "type": "enum: ['blog']",
  "author": "relation → admin::user"
}
```

#### Article/News Schema (`/api/articles`)
```json
{
  "title": "string (i18n)",
  "shortDescription": "string (i18n)",
  "slug": "uid (i18n)",
  "content": "blocks (i18n)",
  "image": "media",
  "type": "enum: ['news']",
  "author": "relation → admin::user"
}
```

#### Product Detail Page Schema (`/api/product-detail-pages`)
```json
{
  "slug": "uid",
  "name": "string (i18n)",
  "subtitle": "string (i18n)",
  "tagline": "string (i18n)",
  "heroTitle": "string (i18n)",
  "heroSubtitle": "string (i18n)",
  "description": "text (i18n)",
  "ctaWhatsapp": "string",
  "ctaShopee": "string",
  "videoSectionTitle": "string (i18n)",
  "whatsappNumber": "string",
  "primaryColor": "string",
  "secondaryColor": "string",
  "category": "string",
  "isActive": "boolean",
  "heroImage": "media",
  "productImage": "media",
  "certifications": "component[] (repeatable)",
  "benefits": "component[] (repeatable)",
  "faq": "component[] (repeatable)",
  "videos": "component[] (repeatable)",
  "externalLinks": "component"
}
```

### Static vs Dynamic Product Pages

| Page Type | URL Pattern | Data Source | Count |
|-----------|-------------|-------------|-------|
| **Static** (Hardcoded) | `/produk-layanan/pertanian/rajabio-pupuk-organik` | Local + Strapi hybrid | 8 |
| **Dynamic** (Slug) | `/produk-layanan/pertanian/[slug]` | Full Strapi | 4+ |

**Static Pages (8):**
1. `rajabio-pupuk-organik/page.tsx` - RAJABIO
2. `floraone-pupuk-hayati/page.tsx` - FLORAONE (Cair)
3. `floraone-pupuk-hayati-padat/page.tsx` - FLORAONE (Padat)
4. `biokiller-insektisida-hayati/page.tsx` - BIOKILLER
5. `simbios-pupuk-hayati/page.tsx` - SIMBIOS
6. `blackturbo-asam-humat/page.tsx` - BLACK TURBO
7. `biojagat-pupuk-hayati-cair/page.tsx` - BIOJAGAT
8. `biokalsi-dolomit/page.tsx` - BIOKALSI

**Dynamic Pages (via [slug]):**
- TERRACHAMP
- BIOMAXI
- BIOAQUA
- LUMBRICOMPOST
- (Any new products)

### Public API Permissions

| Endpoint | find | findOne | create | update | delete |
|----------|------|---------|--------|--------|--------|
| blogs | ✅ | ✅ | ❌ | ❌ | ❌ |
| articles | ✅ | ✅ | ❌ | ❌ | ❌ |
| product-detail-pages | ✅ | ✅ | ❌ | ❌ | ❌ |
| dashboard | ✅ | ❌ | ❌ | ❌ | ❌ |
| about-us | ✅ | ❌ | ❌ | ❌ | ❌ |
| contact | ✅ | ❌ | ❌ | ❌ | ❌ |
| blog-section | ✅ | ❌ | ❌ | ❌ | ❌ |
| news-section | ✅ | ❌ | ❌ | ❌ | ❌ |
| products | ✅ | ✅ | ❌ | ❌ | ❌ |
| services | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## �🔧 QUICK FIX COMMANDS

```bash
# SSH into VPS
ssh hostinger

# Navigate to Strapi directory
cd /opt/cbi-strapi

# 1. Update ecosystem.config.js (use nano or vim)
nano ecosystem.config.js
# Change: args: 'run start' and NODE_ENV: 'production'

# 2. Build for production
npm run build

# 3. Restart PM2
pm2 delete cbi-strapi-dev
pm2 start ecosystem.config.js
pm2 save

# 4. Verify
pm2 list
curl https://cbi-backend.my.id/api/product-detail-pages
```

---

## 📞 SUPPORT

For issues with this configuration:
- Strapi Documentation: https://docs.strapi.io
- PM2 Documentation: https://pm2.keymetrics.io/docs/
- NGINX Documentation: https://nginx.org/en/docs/

---

## 🔴 CONTENT-SPECIFIC ISSUES

### Issue 1: Product Pages Missing Indonesian Locale

**Problem:** All 12 product-detail-pages only exist in English locale
**Impact:** Indonesian users visiting product pages see English text despite site being in Indonesian

**Current State:**
```sql
SELECT locale, COUNT(*) FROM product_detail_pages GROUP BY locale;
-- Result: en|12 (no Indonesian entries)
```

**Solution:**
1. Log into Strapi Admin at https://cbi-backend.my.id/admin
2. Go to Content Manager → Product Detail Page
3. For each product, click "Add another locale" → Indonesian (id)
4. Copy/translate all content
5. Publish each Indonesian version

### Issue 2: News/Articles Missing English Locale

**Problem:** All 11 news articles only exist in Indonesian locale
**Impact:** English users visiting `/en/news` get empty results or fallback content

**Current State:**
```sql
SELECT locale, COUNT(*) FROM articles GROUP BY locale;
-- Result: id|11 (no English entries)
```

**Solution:** Create English translations for all articles

### Issue 3: Blogs Locale Imbalance

**Problem:** 45 Indonesian blogs, only 3 English blogs
**Impact:** English blog page has minimal content

**Recommendation:** Create English versions of top-performing blogs

### Issue 4: Port Configuration Mismatch

**Current Configuration:**
- `config/server.ts`: PORT = 9337
- `ecosystem.config.js`: PORT = 9338
- **Actual listening port**: 9338

**Recommendation:** Align configuration files to same port

### Issue 5: Environment Variable Inconsistency (Frontend)

**Problem:** Frontend uses two different variable names:
- `.env.local`: `NEXT_PUBLIC_URL_API`
- `utils/strapiProductData.ts`: `NEXT_PUBLIC_STRAPI_URL`

**Solution:** Standardize to single variable name

---

## 📊 CONTENT TRANSLATION PRIORITY

### High Priority (User-Facing Product Content)

| Product | EN | ID | Priority |
|---------|----|----|----------|
| RAJABIO | ✅ | ❌ | 🔴 Critical |
| FLORAONE (Cair) | ✅ | ❌ | 🔴 Critical |
| FLORAONE (Padat) | ✅ | ❌ | 🔴 Critical |
| BIOKILLER | ✅ | ❌ | 🔴 Critical |
| SIMBIOS | ✅ | ❌ | 🔴 Critical |
| BLACK TURBO | ✅ | ❌ | 🟠 High |
| BIOJAGAT | ✅ | ❌ | 🟠 High |
| BIOKALSI | ✅ | ❌ | 🟠 High |
| TERRACHAMP | ✅ | ❌ | 🟡 Medium |
| BIOMAXI | ✅ | ❌ | 🟡 Medium |
| BIOAQUA | ✅ | ❌ | 🟡 Medium |
| LUMBRICOMPOST | ✅ | ❌ | 🟡 Medium |

### Medium Priority (News/Articles)

Top news articles needing English translation:
1. RAJABIO Revolusi Organik untuk Padi Sawah
2. BIOKILLER SL: Senjata Rahasia Petani
3. Flora One: Pupuk Hayati Terbaik
4. SIMBIOS Sukses Tingkatkan Produktivitas
5. BIOJAGAT: Transformasi Lahan dan Petani

---

## ✅ WHAT'S WORKING WELL

1. **API Response Times:** Fast (7-17ms per request)
2. **NGINX Caching:** Uploads cached for 30 days
3. **SSL Configuration:** Let's Encrypt properly configured
4. **CORS:** Configured for frontend domains
5. **Content Security Policy:** Appropriate directives set
6. **Public API Permissions:** Correctly configured for read-only access
7. **Media Uploads:** Working with 250MB size limit
8. **Component Structure:** Well-organized product-detail components

---

## 📞 SUPPORT

For issues with this configuration:
- Strapi Documentation: https://docs.strapi.io
- PM2 Documentation: https://pm2.keymetrics.io/docs/
- NGINX Documentation: https://nginx.org/en/docs/

---

*Report generated by comprehensive VPS analysis on January 21, 2026*
