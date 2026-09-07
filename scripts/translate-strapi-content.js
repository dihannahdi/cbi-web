/**
 * Strapi Content Translation Script
 * 
 * This script uses Strapi's REST API to properly create English localizations
 * following Strapi's i18n best practices. Instead of manually duplicating database
 * entries, we use PUT requests with locale parameter to let Strapi handle the
 * component relationships correctly.
 */

const STRAPI_URL = 'http://72.62.122.166:9338';
const API_TOKEN = 'YOUR_API_TOKEN_HERE'; // You'll need to generate this from Strapi admin

// Simple translations (you can use Google Translate API or manual translations)
const translations = {
  // Dashboard Headlines
  'PT Centra Biotech Indonesia - Perusahaan Bioteknologi di Indonesia untuk Pertanian, Peternakan & Perikanan': 
    'PT Centra Biotech Indonesia - Biotechnology Company in Indonesia for Agriculture, Livestock & Fisheries',
  'Temukan bagaimana solusi bioteknologi kami dapat mengatasi permasalahan global di industri pertanian, peternakan, dan perikanan.':
    'Discover how our biotechnology solutions can address global challenges in agriculture, livestock, and fisheries industries.',
  'Perusahaan Bioteknologi  Terkemuka di Indonesia':
    'Leading Biotechnology Company in Indonesia',
  'Tingkatkan Produktivitas Anda dengan Produk Bioteknologi Berkualitas Tinggi':
    'Increase Your Productivity with High-Quality Biotechnology Products',
  'Produk & Layanan': 'Products & Services',
  'Tingkatkan Hasil Panen Anda dengan Produk Bioteknologi Berkualitas Tinggi':
    'Increase Your Harvest with High-Quality Biotechnology Products',
  'Pertanian': 'Agriculture',
  'Perikanan': 'Fishery',
  'Peternakan': 'Livestock',
  'Berita': 'News',
  'Blog': 'Blog',
  'Media & Informasi': 'Media & Information',
  'Brosur & Dokumen': 'Brochures & Documents',
  'Hubungi Kami': 'Contact Us',
  'Tingkatkan Kualitas Ternak Anda dengan Produk Bioteknologi Berkualitas':
    'Improve Your Livestock Quality with Quality Biotechnology Products',
  'Tingkatkan Hasil Perikanan Anda dengan Produk Bioteknologi Berkualitas Tinggi':
    'Increase Your Fishery Results with High-Quality Biotechnology Products',
  'PT Centra Biotech Indonesia: Solusi Bioteknologi Terintegrasi untuk Pertanian, Peternakan & Perikanan':
    'PT Centra Biotech Indonesia: Integrated Biotechnology Solutions for Agriculture, Livestock & Fisheries',
    
  // About Us
  'Tentang Kami': 'About Us',
  'PT Centra Biotech Indonesia merupakan perusahaan nasional yang memproduksi dan memasarkan produk-produk bioteknologi ramah lingkungan dengan basis mikroba khusus sebagai komposisi utama. Kami menyediakan produk bioteknologi pada bidang pertanian yang mencakup berbagai macam produk spesifik untuk menunjang kesehatan dan produktivitas tanaman.\n\nPerusahaan Centra Biotech Indonesia telah berdiri sejak tanggal 10 Februari 2010 dan mendapatkan pengesahan dari Menteri Kehakiman dan Hak Asasi Manusia Republik Indonesia dengan nomor : AHU-20782.AH.01.01.Tahun 2010\n\nCentra Biotech Indonesia dengan tenaga–tenaga ahli di bidang mikrobiologi selalu berkreasi dan berinovasi untuk menghadirkan produk-produk dengan bahan-bahan alami pilihan agar dan terbaik untuk memberikan produk yang berkualitas, dan bermanfaat bagi petani.':
    'PT Centra Biotech Indonesia is a national company that produces and markets environmentally friendly biotechnology products with special microbes as the main composition. We provide biotechnology products in agriculture that include various specific products to support plant health and productivity.\n\nCentra Biotech Indonesia has been established since February 10, 2010 and received approval from the Minister of Law and Human Rights of the Republic of Indonesia with number: AHU-20782.AH.01.01.Year 2010\n\nCentra Biotech Indonesia with expert personnel in microbiology always creates and innovates to present products with selected natural ingredients that are the best to provide quality products that are beneficial for farmers.'
};

// Helper function to translate text
function translate(text) {
  return translations[text] || text;
}

// Helper function to recursively translate object properties
function translateObject(obj) {
  if (typeof obj === 'string') {
    return translate(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => translateObject(item));
  }
  if (obj && typeof obj === 'object') {
    const translated = {};
    for (const [key, value] of Object.entries(obj)) {
      // Translate common text fields
      if (['title', 'subtitle', 'description', 'content', 'text', 'name', 'cta_text', 'label'].includes(key)) {
        translated[key] = typeof value === 'string' ? translate(value) : translateObject(value);
      } else {
        translated[key] = translateObject(value);
      }
    }
    return translated;
  }
  return obj;
}

async function fetchContentInLocale(contentType, locale = 'id') {
  const response = await fetch(`${STRAPI_URL}/api/${contentType}?locale=${locale}&populate=deep`, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${contentType}: ${response.statusText}`);
  }
  
  return await response.json();
}

async function createOrUpdateLocalization(contentType, documentId, data, locale = 'en') {
  const response = await fetch(`${STRAPI_URL}/api/${contentType}/${documentId}?locale=${locale}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update ${contentType}/${documentId}: ${response.statusText}\n${error}`);
  }
  
  return await response.json();
}

async function translateContentType(contentType) {
  console.log(`\n📋 Processing ${contentType}...`);
  
  // Fetch Indonesian content
  const indonesianData = await fetchContentInLocale(contentType, 'id');
  
  if (!indonesianData.data) {
    console.log(`  ⚠️ No data found for ${contentType}`);
    return;
  }
  
  const items = Array.isArray(indonesianData.data) ? indonesianData.data : [indonesianData.data];
  
  for (const item of items) {
    const documentId = item.documentId || item.id;
    console.log(`  🔄 Translating document ${documentId}...`);
    
    // Remove system fields
    const { id, documentId: _, createdAt, updatedAt, publishedAt, locale, ...contentData } = item;
    
    // Translate the content
    const translatedData = translateObject(contentData);
    
    // Create/update English localization
    try {
      await createOrUpdateLocalization(contentType, documentId, translatedData, 'en');
      console.log(`  ✅ Successfully translated ${documentId}`);
    } catch (error) {
      console.error(`  ❌ Error translating ${documentId}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting Strapi Content Translation...\n');
  console.log(`📡 Connecting to: ${STRAPI_URL}`);
  console.log('🌍 Translating from Indonesian (id) to English (en)\n');
  
  const contentTypes = [
    'dashboard',
    'about-us',
    'contact',
    'product-agriculture',
    'product-livestock',
    'product-fishery',
    'products-and-service',
    'blog-section',
    'news-section',
    'document'
  ];
  
  for (const contentType of contentTypes) {
    try {
      await translateContentType(contentType);
    } catch (error) {
      console.error(`❌ Failed to process ${contentType}:`, error.message);
    }
  }
  
  console.log('\n✨ Translation completed!');
  console.log('🔄 Please restart Strapi: pm2 restart cbi-strapi-dev');
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { translate, translateObject, fetchContentInLocale, createOrUpdateLocalization };
