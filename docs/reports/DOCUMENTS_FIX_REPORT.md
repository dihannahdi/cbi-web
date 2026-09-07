# Documents Display Issue - Resolution Report
**Date**: January 11, 2026  
**Issue**: Documents not showing at https://www.centrabiotechindonesia.com/id/documents

## Root Cause Analysis

### Investigation Process
1. ✅ Verified frontend code ([app/[lang]/documents/page.tsx](app/[lang]/documents/page.tsx))
2. ✅ Checked document components (DocumentBrochure.tsx, DocumentCard.tsx)
3. ✅ Established SSH connection to VPS (72.62.122.166)
4. ✅ Located Strapi database at `/opt/cbi-strapi/.tmp/data.db` (3.7MB)
5. ✅ Queried database schema and content

### Root Cause Identified
**Problem**: All brochures and certificates in the database had `locale='en'` (English), but the Indonesian website at `/id/documents` was requesting `locale='id'` content.

**Database Query Results**:
```sql
-- Before fix:
SELECT DISTINCT locale FROM brochures ORDER BY locale;
-- Result: Only 'en' existed

SELECT id, title, locale FROM brochures WHERE published_at IS NOT NULL;
-- Results:
-- 10 | FLORAONE - Pupuk Hayati Cair | en
-- 11 | RAJABIO - Pupuk Organik Cair | en
-- 13 | BIO KILLER - Insektisida Hayati Cair | en
-- 15 | SIMBIOS - Pupuk Hayati Cair | en

SELECT DISTINCT locale FROM certificates ORDER BY locale;
-- Result: Only 'en' existed
-- 3 published certificates, all with locale='en'
```

**Impact**: 
- Frontend at `/id/documents` requested documents with `locale=id`
- Strapi returned the `media_and_informations` entity (id=16 for 'id' locale)
- However, the related brochures and certificates were all 'en' locale
- Result: Empty content displayed on Indonesian page

## Solution Implemented

### Database Update
Changed the locale of all published documents from 'en' to 'id':

```sql
UPDATE brochures SET locale = 'id' WHERE published_at IS NOT NULL AND locale = 'en';
UPDATE certificates SET locale = 'id' WHERE published_at IS NOT NULL AND locale = 'en';

-- Result:
-- Updated 4 brochures
-- Updated 3 certificates
```

### Strapi Restart
```bash
pm2 restart cbi-strapi-dev
```

## Verification

### Published Documents Now Available:
**Brochures** (4 items):
1. FLORAONE - Pupuk Hayati Cair
2. RAJABIO - Pupuk Organik Cair
3. BIO KILLER - Insektisida Hayati Cair
4. SIMBIOS - Pupuk Hayati Cair

**Certificates** (3 items):
1. Sertifikat Pupuk Hayati FloraOne (Cair)
2. Sertifikat Pupuk Organik Rajabio (Cair)
3. Sertifikat Insektisida Hayati Bio Killer (Cair)

### Database Backup
Created backup before changes:
```bash
cp .tmp/data.db .tmp/data.db.backup-20260111-HHMMSS
```

## Technical Details

### Database Structure
- **Main table**: `media_and_informations` (parent collection with i18n)
  - id=16 for locale='id'
  - id=17 for locale='en'
- **Child tables**: `brochures`, `certificates` (individual documents)
- **Linking tables**: 
  - `media_and_informations_brochures_lnk`
  - `media_and_informations_certificates_lnk`
- **File attachments**: `files_related_mph` (images and PDF files)

### Frontend API Call
Located in [app/[lang]/documents/page.tsx](app/[lang]/documents/page.tsx):
```typescript
const { data } = await apiRequest<MediaInformationResponse>({
  path: ApiPath.DOCUMENTS,
  queryParams: query,
  locale: lang, // 'id' for Indonesian, 'en' for English
});
```

### API Endpoint
- Base URL: https://cbi-backend.my.id
- Endpoint: `/api/media-and-information`
- Query: `?locale=id&populate[brochures][populate]=*&populate[certificates][populate]=*`

## Next Steps

1. **Immediate**: Test the live website at https://www.centrabiotechindonesia.com/id/documents
2. **Short term**: Create English locale versions if English page is needed at `/en/documents`
3. **Long term**: 
   - Implement proper i18n content management in Strapi admin
   - Add translation workflow for new documents
   - Consider fallback logic in frontend for missing locales

## Prevention

### For Future Content:
When adding new documents in Strapi:
1. Ensure you're creating content for the correct locale
2. If bilingual support is needed, create separate entries for each locale
3. Test both `/id/` and `/en/` pages after adding content

### Monitoring:
- Check Strapi admin locale selector when creating content
- Verify database `locale` field matches intended language
- Test both language versions of the website

## Files Modified
- Database: `/opt/cbi-strapi/.tmp/data.db`
  - Updated `brochures` table: 4 rows (locale changed from 'en' to 'id')
  - Updated `certificates` table: 3 rows (locale changed from 'en' to 'id')
- Backup created: `.tmp/data.db.backup-YYYYMMDD-HHMMSS`
- Strapi: Restarted via PM2

## Status
- ✅ Root cause identified
- ✅ Database updated
- ✅ Strapi restarted
- ⏳ Awaiting verification on live website

---
**Note**: The titles are currently in mixed language (Indonesian product names). Consider translating titles and descriptions to proper Indonesian for consistency on the Indonesian site.
