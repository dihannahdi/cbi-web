const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 9337;

app.use(cors());
app.use(express.json());

// Load data from JSON file
let data = {};
try {
  const dataPath = path.join(__dirname, 'data.json');
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log('✅ Data loaded successfully');
  } else {
    console.warn('⚠️  data.json not found. Run "npm run extract" first.');
  }
} catch (error) {
  console.error('Error loading data:', error);
}

// Serve uploaded files
const uploadsPath = path.join(__dirname, '..', 'cbi-strapi-sqlite', 'public', 'uploads');
if (fs.existsSync(uploadsPath)) {
  app.use('/uploads', express.static(uploadsPath));
  console.log(`🖼️  Serving uploads from: ${uploadsPath}`);
}

// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: data && Object.keys(data).length > 0,
      uploadsFolder: fs.existsSync(uploadsPath),
      collections: Object.keys(data).length,
      endpoints: {
        dashboard: data.dashboards?.length > 0,
        aboutUs: data.aboutUses?.length > 0,
        contact: data.contacts?.length > 0,
        newsSection: data.newsSections?.length > 0,
        productAgriculture: data.productAgricultures?.length > 0,
        productLivestock: data.productLivestocks?.length > 0,
        productFishery: data.productFisheries?.length > 0
      }
    }
  };
  
  // Check if any critical data is missing
  const criticalMissing = !health.checks.database || 
                         !health.checks.endpoints.dashboard || 
                         !health.checks.endpoints.aboutUs;
  
  if (criticalMissing) {
    health.status = 'degraded';
    res.status(503).json(health);
  } else {
    res.json(health);
  }
});

// Detailed health check with validation
app.get('/health/detailed', async (req, res) => {
  try {
    const { runHealthCheck } = require('./comprehensive-health-check');
    const result = await runHealthCheck();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Special endpoint for dashboard (singular) - returns the first published dashboard
app.get('/api/dashboard', (req, res) => {
  try {
    const dashboards = data.dashboards || [];
    const publishedDashboard = dashboards.find(d => d.published_at) || dashboards[0];
    
    if (!publishedDashboard) {
      return res.status(404).json({ error: 'Dashboard not found' });
    }
    
    // Remove database metadata fields
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedDashboard;
    
    res.json({
      data: {
        id: publishedDashboard.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// About-us page endpoint
app.get('/api/about-us', (req, res) => {
  try {
    const aboutUses = data.aboutUses || [];
    const publishedAboutUs = aboutUses.find(d => d.published_at) || aboutUses[0];
    
    if (!publishedAboutUs) {
      return res.status(404).json({ error: 'About-us page not found' });
    }
    
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedAboutUs;
    
    res.json({
      data: {
        id: publishedAboutUs.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Contact page endpoint
app.get('/api/contact', (req, res) => {
  try {
    const contacts = data.contacts || [];
    const publishedContact = contacts.find(d => d.published_at) || contacts[0];
    
    if (!publishedContact) {
      return res.status(404).json({ error: 'Contact page not found' });
    }
    
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedContact;
    
    res.json({
      data: {
        id: publishedContact.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// News section page endpoint
app.get('/api/news-section', (req, res) => {
  try {
    const newsSections = data.newsSections || [];
    const publishedNewsSection = newsSections.find(d => d.published_at) || newsSections[0];
    
    if (!publishedNewsSection) {
      return res.status(404).json({ error: 'News section not found' });
    }
    
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedNewsSection;
    
    res.json({
      data: {
        id: publishedNewsSection.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Blog section page endpoint
app.get('/api/blog-section', (req, res) => {
  try {
    const blogSections = data.blogSections || [];
    const publishedBlogSection = blogSections.find(d => d.published_at) || blogSections[0];
    
    if (!publishedBlogSection) {
      return res.status(404).json({ error: 'Blog section not found' });
    }
    
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedBlogSection;
    
    res.json({
      data: {
        id: publishedBlogSection.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Product Agriculture page endpoint
app.get('/api/product-agriculture', (req, res) => {
  try {
    const productAgricultures = data.productAgricultures || [];
    const publishedProduct = productAgricultures.find(d => d.published_at) || productAgricultures[0];
    
    if (!publishedProduct) {
      return res.status(404).json({ error: 'Product agriculture page not found' });
    }
    
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedProduct;
    
    res.json({
      data: {
        id: publishedProduct.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Product Livestock page endpoint
app.get('/api/product-livestock', (req, res) => {
  try {
    const productLivestocks = data.productLivestocks || [];
    const publishedProduct = productLivestocks.find(d => d.published_at) || productLivestocks[0];
    
    if (!publishedProduct) {
      return res.status(404).json({ error: 'Product livestock page not found' });
    }
    
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedProduct;
    
    res.json({
      data: {
        id: publishedProduct.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Product Fishery page endpoint
app.get('/api/product-fishery', (req, res) => {
  try {
    const productFisheries = data.productFisheries || [];
    const publishedProduct = productFisheries.find(d => d.published_at) || productFisheries[0];
    
    if (!publishedProduct) {
      return res.status(404).json({ error: 'Product fishery page not found' });
    }
    
    const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = publishedProduct;
    
    res.json({
      data: {
        id: publishedProduct.id,
        ...attributes
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generic API endpoint for any Strapi collection
app.get('/api/:collection', (req, res) => {
  try {
    const { collection } = req.params;
    const collectionData = data[collection] || [];
    
    res.json({
      data: collectionData.map(item => ({
        id: item.id,
        attributes: item
      })),
      meta: {
        pagination: {
          page: 1,
          pageSize: collectionData.length,
          pageCount: 1,
          total: collectionData.length
        }
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Single item endpoint
app.get('/api/:collection/:id', (req, res) => {
  try {
    const { collection, id } = req.params;
    const collectionData = data[collection] || [];
    const item = collectionData.find(item => item.id === parseInt(id));
    
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    // For dashboards, return the populated structure directly
    if (collection === 'dashboards') {
      // Remove database metadata fields from attributes
      const { document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, ...attributes } = item;
      
      res.json({
        data: {
          id: item.id,
          ...attributes
        }
      });
    } else {
      res.json({
        data: {
          id: item.id,
          attributes: item
        }
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// List all available collections (for debugging)
app.get('/api-debug/collections', (req, res) => {
  res.json({ collections: Object.keys(data) });
});

app.listen(PORT, () => {
  console.log(`🚀 CBI Local API Server running on http://localhost:${PORT}`);
  console.log(`📊 Available collections: ${Object.keys(data).length}`);
});
