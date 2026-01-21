/**
 * Script to enable public access to Strapi API endpoints
 * Run this after logging into Strapi admin panel
 */

const STRAPI_URL = 'http://72.62.122.166';
const COLLECTIONS = [
  'api::article.article',
  'api::blog.blog',
  'api::dashboard.dashboard',
  'api::about-us.about-us',
  'api::contact.contact',
  'api::news-section.news-section',
  'api::blog-section.blog-section',
  'api::product-agriculture.product-agriculture',
  'api::product-livestock.product-livestock',
  'api::product-fishery.product-fishery',
  'api::product-and-service.product-and-service',
];

console.log(`
╔════════════════════════════════════════════════════════════════╗
║         STRAPI PERMISSIONS FIX - MANUAL INSTRUCTIONS          ║
╚════════════════════════════════════════════════════════════════╝

🔧 TO FIX THE 403 FORBIDDEN ERROR:

1. Open Strapi Admin Panel:
   → ${STRAPI_URL}/admin

2. Login with your admin credentials

3. Navigate to:
   Settings → Users & Permissions Plugin → Roles → Public

4. Enable these permissions for EACH collection:
   
   ✅ Articles
      - find
      - findOne
   
   ✅ Blogs
      - find
      - findOne
   
   ✅ Dashboard
      - find
      - findOne
   
   ✅ About-us
      - find
      - findOne
   
   ✅ Contact
      - find
      - findOne
   
   ✅ News-section
      - find
      - findOne
   
   ✅ Blog-section
      - find
      - findOne
   
   ✅ Product-agriculture
      - find
      - findOne
   
   ✅ Product-livestock
      - find
      - findOne
   
   ✅ Product-fishery
      - find
      - findOne
   
   ✅ Product-and-service
      - find
      - findOne

5. Click SAVE button

6. Test your website: https://cbi-web.vercel.app

═══════════════════════════════════════════════════════════════

📝 NOTE: The backend is running perfectly on the new VPS.
The only issue is that API endpoints are protected.
After enabling public access, your website will work!

═══════════════════════════════════════════════════════════════
`);
