# CBI Web - Quick Reference Guide

## 🌐 URLs
- **Production**: https://www.centrabiotechindonesia.com
- **Backend**: https://cbi-backend.my.id
- **Production**: https://www.centrabiotechindonesia.com
- **Vercel**: https://cbi-web.vercel.app

## 📁 Important Files

### SEO & Metadata
- `public/robots.txt` - Static robots file (fallback)
- `app/robots.ts` - Dynamic robots generator ⭐
- `app/sitemap.ts` - Dynamic sitemap with i18n
- `app/[lang]/manifest.ts` - Locale-specific PWA manifest ⭐
- `app/[lang]/layout.tsx` - Root layout with metadata
- `app/llms.txt` - AI assistant context ⭐

### Configuration
- `i18n-config.ts` - Locale configuration
- `dictionaries/` - Translation files
- `utils/seo.ts` - SEO utilities

### Standards & Discovery
- `public/.well-known/ai-plugin.json` - OpenAI plugin manifest ⭐
- `public/.well-known/security.txt` - Security contact info ⭐
- `public/openapi.json` - API documentation ⭐
- `public/manifest.json` - Global PWA manifest

## 🔧 Common Tasks

### Deploy to Production
```bash
vercel --prod
```

### Build Locally
```bash
npm run build
npm run start
```

### SSH to VPS
```bash
ssh root@72.62.122.166
cd /opt/cbi-strapi
pm2 restart cbi-strapi-dev
```

### Check Logs
```bash
pm2 logs cbi-strapi-dev
```

## 🌍 Locales
- **Indonesian**: `id` (default) - routes: `/id/*`
- **English**: `en` - routes: `/en/*`

## 📱 PWA Shortcuts
### Indonesian
- Produk: `/id/product/agriculture`
- Tentang: `/id/about-us`
- Kontak: `/id/contact`

### English
- Products: `/en/product/agriculture`
- About: `/en/about-us`
- Contact: `/en/contact`

## 🔍 SEO Checklist

### Pre-Deploy
- [ ] Updated sitemap.ts
- [ ] Checked robots.ts
- [ ] Verified metadata in layout.tsx
- [ ] Tested both locales

### Post-Deploy
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify hreflang tags
- [ ] Test Open Graph previews
- [ ] Check PWA installation

## 🛠️ Key Features
- ✅ Multilingual (id, en)
- ✅ Dynamic sitemap
- ✅ Locale-specific manifests
- ✅ Open Graph & Twitter Cards
- ✅ Structured data ready
- ✅ PWA support
- ✅ AI-readable documentation

## 📊 Analytics & Monitoring
- Google Search Console
- Bing Webmaster Tools
- Vercel Analytics
- Next.js Speed Insights

## 🔐 Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://www.centrabiotechindonesia.com
NEXT_PUBLIC_URL_API=https://cbi-backend.my.id
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

## 📚 Documentation
- Full Update: `docs/SEO_UPDATE_SUMMARY.md`
- LLM Context: `app/llms.txt`
- API Docs: `public/openapi.json`

---

*Quick reference for CBI Web development team*
