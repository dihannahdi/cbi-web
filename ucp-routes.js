const express = require('express');
const axios = require('axios');
const router = express.Router();

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

/**
 * UCP Products Endpoint
 * Returns products in UCP-compatible format for AI discovery
 */
router.get('/products', async (req, res) => {
  try {
    // Fetch products from Strapi
    const response = await axios.get(`${STRAPI_URL}/api/products?populate=image&pagination[pageSize]=100`);
    
    const products = response.data.data || [];
    
    // Transform to UCP format
    const ucpProducts = products.map(product => {
      const attributes = product.attributes || {};
      const image = attributes.image?.data?.[0]?.attributes || attributes.image?.data?.attributes;
      
      return {
        id: product.documentId || product.id,
        name: attributes.name || attributes.title,
        description: attributes.description || attributes.content || '',
        slug: attributes.slug,
        category: attributes.category || 'agriculture',
        available: attributes.publishedAt ? true : false,
        price: {
          amount: attributes.price || 0,
          currency: 'IDR',
          display: attributes.price ? `Rp ${attributes.price.toLocaleString('id-ID')}` : 'Contact for price'
        },
        images: image ? [{
          url: image.url?.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`,
          alt: image.alternativeText || attributes.name,
          width: image.width,
          height: image.height
        }] : [],
        metadata: {
          updated_at: attributes.updatedAt,
          published_at: attributes.publishedAt,
          created_at: attributes.createdAt
        },
        urls: {
          product_page: `https://www.centrabiotechindonesia.com/id/product/${attributes.slug}`,
          product_page_en: `https://www.centrabiotechindonesia.com/en/product/${attributes.slug}`
        }
      };
    });
    
    // Add hardcoded RAJABIO product (since it's not in Strapi)
    const rajabioProduct = {
      id: 'rajabio-1l',
      name: 'RAJABIO Pupuk Organik Cair',
      name_en: 'RAJABIO Liquid Organic Fertilizer',
      description: 'Pupuk organik cair premium bersertifikat Kementan RI. C-Organik >10%, terbukti meningkatkan panen hingga 40%. Tersedia di E-Katalog Pemerintah & Shopee.',
      description_en: 'Premium liquid organic fertilizer certified by Ministry of Agriculture RI. C-Organic >10%, proven to increase harvest up to 40%. Available on Government E-Catalog & Shopee.',
      slug: 'rajabio-pupuk-organik-cair',
      category: 'agriculture',
      subcategory: 'organic_fertilizer',
      available: true,
      price: {
        amount: 62000,
        currency: 'IDR',
        display: 'Rp 62.000',
        original_price: 75000,
        discount: '17% OFF'
      },
      package: {
        size: '1 Liter',
        type: 'bottle'
      },
      specifications: {
        c_organic: '10.05%',
        ph: '8.02',
        nitrogen: '2.56%',
        n_organic: '0.57%',
        phosphate: '< 0.0074%',
        potassium: '< 0.0017%',
        form: 'liquid',
        color: 'brown'
      },
      certifications: [
        {
          name: 'Ministry of Agriculture RI',
          number: '02.02.2023.883',
          issued_by: 'Kementerian Pertanian Republik Indonesia'
        },
        {
          name: 'LeSOS Organic Certificate',
          number: '442-LSO-005-IDN-08-22',
          issued_by: 'LeSOS Certification Body'
        },
        {
          name: 'SNI Standard',
          number: 'SNI 6729:2016',
          issued_by: 'Badan Standardisasi Nasional'
        }
      ],
      benefits: [
        'Meningkatkan hasil panen hingga 40%',
        'C-Organik >10% memperbaiki struktur tanah',
        'Meningkatkan imunitas tanaman',
        '100% organik dan ramah lingkungan',
        'Mengurangi kebutuhan pupuk kimia hingga 50%'
      ],
      dosage: {
        standard: '5 ml per liter air',
        interval: 'Setiap 1-2 minggu',
        application: 'Semprot daun atau siram akar'
      },
      applications: [
        {
          crop: 'Padi Sawah',
          dosage: '5 ml/liter',
          interval: 'Setiap 2 minggu',
          duration: 'Hingga usia 60 hari'
        },
        {
          crop: 'Sayuran & Hortikultura',
          dosage: '5 ml/liter',
          interval: '1-2x/minggu',
          duration: 'Sepanjang masa tanam'
        },
        {
          crop: 'Perkebunan Produktif',
          dosage: '5 ml/liter',
          interval: '1x/bulan',
          duration: 'Rutin'
        }
      ],
      images: [{
        url: 'https://www.centrabiotechindonesia.com/products/rajabio/rajabio-cover.webp',
        alt: 'RAJABIO Pupuk Organik Cair',
        type: 'cover'
      }, {
        url: 'https://www.centrabiotechindonesia.com/products/rajabio/rajabio-poster.jpg',
        alt: 'RAJABIO Product Poster',
        type: 'poster'
      }],
      urls: {
        product_page: 'https://www.centrabiotechindonesia.com/id/rajabio-pupuk-organik-cair',
        product_page_en: 'https://www.centrabiotechindonesia.com/en/rajabio-pupuk-organik-cair',
        shopee: 'https://shopee.co.id/Rajabio-Pupuk-Cair-Organik-Nutrisi-Lengkap-i.1083634538.23485056818',
        e_catalog: 'https://katalog.inaproc.id/search?keyword=rajabio&page=1',
        brochure: 'https://cbi-backend.my.id/uploads/e_brochure_Rajabio_0a91d17adf.pdf',
        certificate: 'https://cbi-backend.my.id/uploads/SK_RAJABIO_9ec75a4ec2.pdf',
        youtube: 'https://www.youtube.com/shorts/A5twMwN51Kw'
      },
      contact: {
        whatsapp: '+6281235003655',
        phone: '0812 3500 3655'
      },
      metadata: {
        updated_at: new Date().toISOString(),
        featured: true,
        ai_discoverable: true
      }
    };
    
    // Add RAJABIO as first product
    ucpProducts.unshift(rajabioProduct);
    
    // Return UCP response
    res.json({
      ucp: {
        version: '2026-01-11',
        capabilities: [
          {
            name: 'com.centrabiotechindonesia.discovery.products',
            version: '2026-01-11'
          }
        ]
      },
      company: {
        name: 'PT. Centra Biotech Indonesia',
        website: 'https://www.centrabiotechindonesia.com'
      },
      products: ucpProducts,
      pagination: {
        total: ucpProducts.length,
        page: 1,
        page_size: 100
      },
      metadata: {
        generated_at: new Date().toISOString(),
        api_version: '1.0'
      }
    });
    
  } catch (error) {
    console.error('UCP Products Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch products',
      message: error.message,
      ucp: {
        version: '2026-01-11'
      }
    });
  }
});

/**
 * UCP Company Information Endpoint
 */
router.get('/company', async (req, res) => {
  res.json({
    ucp: {
      version: '2026-01-11',
      capabilities: [
        {
          name: 'com.centrabiotechindonesia.discovery.company',
          version: '2026-01-11'
        }
      ]
    },
    company: {
      name: 'PT. Centra Biotech Indonesia',
      legal_name: 'PT. Centra Biotech Indonesia',
      description: 'Indonesian biotechnology company specializing in organic fertilizers and agricultural solutions',
      industry: ['Agriculture', 'Biotechnology', 'Organic Fertilizers'],
      founded: '2020',
      website: 'https://www.centrabiotechindonesia.com',
      contact: {
        phone: '+6281235003655',
        email: 'info@centrabiotechindonesia.com',
        whatsapp: '+6281235003655'
      },
      address: {
        city: 'Klaten',
        region: 'Central Java',
        country: 'Indonesia',
        country_code: 'ID'
      },
      certifications: [
        {
          name: 'ISO 9001:2015 (Planned)',
          type: 'quality_management'
        }
      ]
    }
  });
});

module.exports = router;
