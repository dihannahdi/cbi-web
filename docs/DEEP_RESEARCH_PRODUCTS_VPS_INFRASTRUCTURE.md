# 🔬 DEEP RESEARCH: Products & VPS Infrastructure
## Centra Biotech Indonesia
### Date: January 30, 2026

---

## 📦 ALL PRODUCTS ON WEBSITE (8 Products)

### 1. **RAJABIO** - Pupuk Organik Cair
- **Slug:** `rajabio-pupuk-organik`
- **Tagline:** Revolusi Organik untuk Pertanian Indonesia
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** pupuk organik cair, liquid organic fertilizer
- **Hero:** Pupuk Organik Cair Terbaik - RAJABIO Tingkatkan Panen Hingga 40%

### 2. **FLORA ONE** - Pupuk Hayati Cair & Padat
- **Slug:** `floraone-pupuk-hayati`
- **Tagline:** Fungsi Ganda: Tingkatkan Panen & Kendalikan Penyakit
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** pupuk hayati cair, liquid biofertilizer
- **Hero:** Pupuk Hayati Terbaik - FLORA ONE Tingkatkan Panen Hingga 86%

### 3. **BIOKILLER** - Insektisida Hayati Premium
- **Slug:** `biokiller-insektisida-hayati`
- **Tagline:** Pengendalian Hama Alami Tanpa Resistensi
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** insektisida hayati, biological insecticide
- **Hero:** Insektisida Hayati BIOKILLER - Basmi Wereng & Hama Tanpa Residu Kimia

### 4. **SIMBIOS** - Pupuk Hayati Premium
- **Slug:** `simbios-pupuk-hayati`
- **Tagline:** Premium Quality - Teknologi Optimal untuk Mikroba Aktif
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** pupuk hayati premium, premium biofertilizer
- **Hero:** Pupuk Hayati Premium SIMBIOS: Efektivitas 122% RAE

### 5. **FLORAONE Padat** - Pupuk Hayati Padat
- **Slug:** `floraone-pupuk-hayati-padat`
- **Tagline:** Pupuk Hayati Organik Bersertifikat
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** pupuk hayati padat, solid biofertilizer
- **Hero:** Tingkatkan Produktivitas Tanaman Anda dengan FloraOne Padat

### 6. **BLACK TURBO** - Asam Humat Premium
- **Slug:** `blackturbo-asam-humat`
- **Tagline:** Pembenah Tanah Terbaik
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** asam humat cair, humic acid fertilizer
- **Hero:** Pembenah Tanah Terbaik - BLACK TURBO Asam Humat 52,37%

### 7. **BIOJAGAT** - Pupuk Hayati Cair
- **Slug:** `biojagat-pupuk-hayati-cair`
- **Tagline:** Konsorsium Mikroorganisme Unggulan
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** pupuk hayati cair, liquid biofertilizer
- **Hero:** Pupuk Hayati Cair Terbaik - BIOJAGAT Tingkatkan Panen Hingga 60%

### 8. **BIOKALSI** - Pupuk Dolomit Premium
- **Slug:** `biokalsi-dolomit`
- **Tagline:** Netralkan Tanah Asam dengan Dolomit Premium
- **Category:** Agriculture
- **Locales:** Indonesian (id) + English (en)
- **SEO Keywords:** pupuk dolomit, dolomite fertilizer
- **Hero:** Atasi Tanah Asam dengan BIOKALSI - Dolomit Premium MgO 18,64% CaO 30,51%

---

## 📊 CONTENT INVENTORY SUMMARY

| Content Type | Count | Notes |
|--------------|-------|-------|
| **Products (Indonesian)** | 8 | All agriculture category |
| **Products (English)** | 8 | Fully bilingual |
| **Blog Posts (Indonesian)** | 45 | Primary content |
| **Blog Posts (English)** | 3 | Limited English content |
| **News Articles** | 11 | Indonesian only |
| **Media Files** | 200 | Images, PDFs, certificates |
| **Brochures** | Multiple | Product brochures |
| **Certificates** | Multiple | Kementan certifications |

---

## 🖥️ VPS INFRASTRUCTURE ANALYSIS

### Server Specifications

**Operating System:**
- Ubuntu 24.04.3 LTS (Noble Numbat)
- 64-bit

**CPU:**
- AMD EPYC 9354P 32-Core Processor
- 2 CPU cores allocated
- 2 threads

**Memory:**
- Total: 7.8 GB
- Used: 4.9 GB
- Available: 2.9 GB
- Swap: 0 GB

**Disk:**
- Total: 96 GB
- Used: 78 GB (81%)
- Available: 19 GB

### Installed Software Stack

**Programming Languages:**
- Node.js: v24.12.0
- Python: 3.12.3
- PHP: 8.3.6

**Web Server:**
- Nginx: 1.24.0

**Database:**
- SQLite3 (embedded in Strapi)
- PostgreSQL: Port 5432 (Docker)
- Redis: Port 6379 (Docker)

**Container Platform:**
- Docker: 29.1.3
- Docker Compose available

**Development Tools:**
- Git
- curl
- wget
- npm (Node Package Manager)
- PM2 (Process Manager)

**Search Engine:**
- Meilisearch: v1.10 (Port 7700)

### Running Services & Ports

| Service | Port | Status | Notes |
|---------|------|--------|-------|
| **Strapi CBI** | 9338 | Running | Main CMS (PM2: cbi-strapi) |
| **Nginx** | 80, 443 | Running | Reverse proxy + SSL |
| **PostgreSQL** | 5432 | Running | Docker container |
| **Redis** | 6379 | Running | Docker container |
| **Meilisearch** | 7700 | Running | Search engine |
| **Bahtsulmasail API** | 8080 | Running | Go application |
| **Tailscale** | 46326 | Running | VPN/SSH |
| **DNS** | 53 | Running | systemd-resolved |

### Nginx Virtual Hosts (Sites Enabled)

1. **api.centrabiotechindonesia.com** - Strapi API endpoint
2. **cbi-backend** - Backend alias (cbi-backend.my.id)
3. **docs-cbi** - Documentation site
4. **bahtsulmasail** - Project website
5. **bahtsulmasail.tech** - Tech domain
6. **santristem** - Educational platform

---

## 🗂️ STRAPI CMS STRUCTURE

### Content Types (API Endpoints)

1. **product-detail-page** - Main product pages (8 products)
2. **blog** - Blog posts (48 total)
3. **article** - News articles (11 total)
4. **blog-section** - Blog landing page config
5. **news-section** - News landing page config
6. **dashboard** - Homepage configuration
7. **about-us** - About page content
8. **contact** - Contact page data
9. **product-agriculture** - Agriculture products overview
10. **product-fishery** - Fishery products (future)
11. **product-livestock** - Livestock products (future)
12. **product-item** - Individual product items
13. **service** - Services offered
14. **brochure** - Product brochures
15. **certificate** - Certifications
16. **media-and-information** - Media resources
17. **management** - Team/management info
18. **ucp** - User Control Panel (custom)

### Database Structure

**Total Tables:** 150+ tables
- Core Strapi tables (admin, permissions, users, roles)
- Content type tables (blogs, articles, products)
- Component tables (SEO, metadata, sections)
- Relation tables (many-to-many links)
- Media tables (files, uploads)
- Localization tables (i18n support)

**Key Tables:**
- `product_detail_pages` - 16 records (8 ID + 8 EN)
- `blogs` - 48 records (45 ID + 3 EN)
- `articles` - 11 records (ID only)
- `files` - 200 media files
- `files_related_mph` - File relationships

---

## 🚀 VPS CAPABILITIES & POSSIBILITIES

### What Can Be Done on This VPS

#### 1. **Content Management**
- ✅ Full Strapi CMS access
- ✅ SQLite database management
- ✅ Direct SQL queries and updates
- ✅ Bulk content operations
- ✅ File upload and management
- ✅ API endpoint customization

#### 2. **Database Operations**
- ✅ Read/Write SQLite database
- ✅ Complex SQL queries
- ✅ Database backup/restore
- ✅ Data migration
- ✅ Schema modifications
- ✅ Performance optimization

#### 3. **Server Management**
- ✅ PM2 process management (restart, logs, monitoring)
- ✅ Nginx configuration (reverse proxy, SSL)
- ✅ Docker container management
- ✅ Service monitoring and logging
- ✅ Resource monitoring (CPU, memory, disk)
- ✅ Log analysis

#### 4. **Development & Deployment**
- ✅ Git repository management
- ✅ Node.js application deployment
- ✅ Python script execution
- ✅ PHP application hosting
- ✅ Custom API development
- ✅ Webhook integrations

#### 5. **Search & Indexing**
- ✅ Meilisearch integration
- ✅ Full-text search implementation
- ✅ Search index management
- ✅ Advanced search features

#### 6. **Security & Access**
- ✅ SSH access (root)
- ✅ Tailscale VPN
- ✅ SSL certificate management
- ✅ Firewall configuration
- ✅ User permissions

#### 7. **Automation Possibilities**
- ✅ Cron jobs for scheduled tasks
- ✅ Automated backups
- ✅ Content synchronization
- ✅ API integrations
- ✅ Monitoring alerts

### What CANNOT Be Done (Limitations)

❌ Scale beyond 2 CPU cores / 7.8 GB RAM
❌ Heavy ML/AI workloads
❌ Video transcoding at scale
❌ High-traffic concurrent users (limited resources)
❌ Install software requiring root compilation (limited disk)
❌ Run memory-intensive databases (PostgreSQL in Docker already using resources)

---

## 🔑 SSH ACCESS PROTOCOL

### Connection Command
```bash
ssh root@72.62.122.166
# OR
ssh hostinger  # Using SSH alias
```

### Current Session Status
- **Authenticated:** Yes
- **Method:** Tailscale SSH
- **User:** root
- **Working Directory:** /opt/cbi-strapi

### Common Operations

**Strapi Management:**
```bash
cd /opt/cbi-strapi
pm2 restart cbi-strapi
pm2 logs cbi-strapi
pm2 monit
```

**Database Queries:**
```bash
sqlite3 /opt/cbi-strapi/.tmp/data.db
# or
sqlite3 /opt/cbi-strapi/.tmp/data.db "SELECT * FROM products;"
```

**Nginx Management:**
```bash
systemctl status nginx
systemctl reload nginx
nginx -t  # Test configuration
```

**Docker Operations:**
```bash
docker ps
docker logs <container_name>
docker restart <container_name>
```

---

## 📈 CURRENT RESOURCE USAGE

**Memory:**
- 62% used (4.9 GB / 7.8 GB)
- 2 GB shared memory
- 4.8 GB buffer/cache

**Disk:**
- 81% used (78 GB / 96 GB)
- 19 GB available
- **⚠️ Warning:** Approaching disk space limit

**CPU:**
- Strapi CBI: 0% (idle)
- Normal operation load

**Network:**
- Multiple services listening
- Nginx handling HTTPS (443)
- API available on port 9338

---

## 🎯 RECOMMENDATIONS FOR VPS USAGE

### Immediate Actions
1. **Disk Space Management**
   - Clean up old logs: `/var/log/`
   - Remove unused Docker images: `docker system prune`
   - Archive old files

2. **Content Optimization**
   - Compress large images in `/opt/cbi-strapi/public/uploads/`
   - Remove duplicate files
   - Implement CDN for static assets

### Performance Optimization
1. Enable Strapi caching
2. Configure Nginx caching for static files
3. Optimize database queries
4. Implement Redis caching for API responses

### Monitoring
1. Set up disk space alerts (< 10% available)
2. Monitor memory usage trends
3. Track Strapi response times
4. Log API errors

---

## 📝 PRODUCT DEVELOPMENT ROADMAP

### Current Product Categories
- **Agriculture:** 8 products (100% coverage)
- **Fishery:** 0 products (infrastructure ready)
- **Livestock:** 0 products (infrastructure ready)

### Future Expansion Possibilities
1. Add fishery products (database structure exists)
2. Add livestock products (database structure exists)
3. Create service-based offerings
4. Expand to B2B product catalog
5. Develop custom formulation products

---

## 🔍 TECHNICAL INSIGHTS

### Strapi Version & Stack
- **Strapi:** v5.8.0 (Latest stable)
- **Framework:** Node.js-based CMS
- **Database:** SQLite (single-file, no server needed)
- **Process Manager:** PM2 (24h uptime, 2143 restarts)
- **Deployment:** Production mode

### API Architecture
- RESTful API at `https://cbi-backend.my.id/api/`
- Supports filters, pagination, population
- Localization (i18n) enabled for id/en
- Rich media handling
- Custom components and dynamic zones

### Security Features
- HTTPS enabled (SSL certificates)
- Nginx reverse proxy
- Strapi admin panel protected
- API token authentication
- Role-based access control (RBAC)

---

**Research Completed:** January 30, 2026  
**Researcher:** Automated Deep Research System  
**Access Level:** Full SSH root access  
**Next Review:** As needed for infrastructure changes

---

*This research was conducted via direct SSH access to VPS at 72.62.122.166, analyzing Strapi CMS database, system resources, and infrastructure configuration.*
