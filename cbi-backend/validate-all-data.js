const fs = require('fs');

console.log('🔍 COMPREHENSIVE DATA VALIDATION\n');

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// Validate Dashboard
console.log('═══════════════════════════════════');
console.log('📊 DASHBOARD VALIDATION');
console.log('═══════════════════════════════════\n');

const dashboard = data.dashboards.find(d => d.published_at);
if (!dashboard) {
  console.log('❌ No published dashboard found!');
} else {
  console.log('✅ Published dashboard found\n');
  
  // Check each required component
  const components = [
    { name: 'headline', key: 'headline', hasImage: true },
    { name: 'whySection', key: 'whySection', hasImage: true },
    { name: 'productService', key: 'productService', hasProducts: true },
    { name: 'ourImpact', key: 'ourImpact', hasMultipleImages: true },
    { name: 'bannerCTA', key: 'bannerCTA', hasImage: true },
    { name: 'latestNews', key: 'latestNews', hasBlogs: true, hasNews: true }
  ];
  
  components.forEach(comp => {
    console.log(`📦 ${comp.name}:`);
    if (!dashboard[comp.key]) {
      console.log(`   ❌ MISSING - ${comp.key} not found!`);
      return;
    }
    
    console.log(`   ✅ EXISTS`);
    
    if (comp.hasImage) {
      const image = dashboard[comp.key].image;
      if (image && image.url) {
        console.log(`   ✅ Image: ${image.name}`);
      } else {
        console.log(`   ❌ Image: MISSING or NULL`);
      }
    }
    
    if (comp.hasMultipleImages) {
      const images = ['product1image', 'product1bgimage', 'product2image', 'product2bgimage'];
      images.forEach(img => {
        const imageData = dashboard[comp.key][img];
        if (imageData && imageData.url) {
          console.log(`   ✅ ${img}: ${imageData.name}`);
        } else {
          console.log(`   ❌ ${img}: MISSING or NULL`);
        }
      });
    }
    
    if (comp.hasProducts) {
      const products = dashboard[comp.key].products;
      if (products && products.length > 0) {
        console.log(`   ✅ Products: ${products.length} products`);
        products.forEach((p, i) => {
          if (p.image && p.image.url) {
            console.log(`      ✅ Product ${i+1} (${p.title}): Has image`);
          } else {
            console.log(`      ❌ Product ${i+1} (${p.title}): NO IMAGE`);
          }
        });
      } else {
        console.log(`   ❌ Products: MISSING or EMPTY`);
      }
    }
    
    if (comp.hasBlogs) {
      const blogs = dashboard[comp.key].blogs;
      if (blogs && blogs.length > 0) {
        console.log(`   ✅ Blogs: ${blogs.length} blogs`);
        blogs.forEach((b, i) => {
          if (b.image && b.image.url) {
            console.log(`      ✅ Blog ${i+1} (${b.title}): Has image`);
          } else {
            console.log(`      ❌ Blog ${i+1} (${b.title}): NO IMAGE`);
          }
        });
      } else {
        console.log(`   ❌ Blogs: MISSING or EMPTY`);
      }
    }
    
    if (comp.hasNews) {
      const news = dashboard[comp.key].news;
      if (news && news.length > 0) {
        console.log(`   ✅ News: ${news.length} news articles`);
        news.forEach((n, i) => {
          if (n.image && n.image.url) {
            console.log(`      ✅ News ${i+1} (${n.title}): Has image`);
          } else {
            console.log(`      ❌ News ${i+1} (${n.title}): NO IMAGE`);
          }
        });
      } else {
        console.log(`   ❌ News: MISSING or EMPTY`);
      }
    }
    
    console.log('');
  });
}

// Validate Products
console.log('═══════════════════════════════════');
console.log('📦 PRODUCTS VALIDATION');
console.log('═══════════════════════════════════\n');

if (data.products && data.products.length > 0) {
  console.log(`✅ ${data.products.length} products found\n`);
  data.products.forEach((p, i) => {
    console.log(`Product ${i+1}: ${p.title}`);
    if (p.image && p.image.url) {
      console.log(`   ✅ Image: ${p.image.name}`);
    } else {
      console.log(`   ❌ Image: MISSING or NULL`);
    }
  });
} else {
  console.log('❌ No products found!');
}

// Validate Services
console.log('\n═══════════════════════════════════');
console.log('🛠️  SERVICES VALIDATION');
console.log('═══════════════════════════════════\n');

if (data.services && data.services.length > 0) {
  console.log(`✅ ${data.services.length} services found\n`);
  data.services.forEach((s, i) => {
    console.log(`Service ${i+1}: ${s.title}`);
    if (s.image && s.image.url) {
      console.log(`   ✅ Image: ${s.image.name}`);
    } else {
      console.log(`   ❌ Image: MISSING or NULL`);
    }
  });
} else {
  console.log('❌ No services found!');
}

// Validate Blogs
console.log('\n═══════════════════════════════════');
console.log('📝 BLOGS VALIDATION');
console.log('═══════════════════════════════════\n');

if (data.blogs && data.blogs.length > 0) {
  console.log(`✅ ${data.blogs.length} blogs found\n`);
  data.blogs.forEach((b, i) => {
    console.log(`Blog ${i+1}: ${b.title}`);
    if (b.image && b.image.url) {
      console.log(`   ✅ Image: ${b.image.name}`);
    } else {
      console.log(`   ❌ Image: MISSING or NULL`);
    }
    if (b.author) {
      console.log(`   ✅ Author: ${b.author.username || 'N/A'}`);
    } else {
      console.log(`   ❌ Author: MISSING`);
    }
  });
} else {
  console.log('❌ No blogs found!');
}

// Validate Articles
console.log('\n═══════════════════════════════════');
console.log('📰 ARTICLES VALIDATION');
console.log('═══════════════════════════════════\n');

if (data.articles && data.articles.length > 0) {
  console.log(`✅ ${data.articles.length} articles found\n`);
  data.articles.forEach((a, i) => {
    console.log(`Article ${i+1}: ${a.title}`);
    if (a.image && a.image.url) {
      console.log(`   ✅ Image: ${a.image.name}`);
    } else {
      console.log(`   ❌ Image: MISSING or NULL`);
    }
    if (a.author) {
      console.log(`   ✅ Author: ${a.author.username || 'N/A'}`);
    } else {
      console.log(`   ❌ Author: MISSING`);
    }
  });
} else {
  console.log('❌ No articles found!');
}

console.log('\n═══════════════════════════════════');
console.log('✅ VALIDATION COMPLETE');
console.log('═══════════════════════════════════\n');
