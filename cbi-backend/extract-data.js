const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function extractData() {
  try {
    console.log('📦 Loading database...');
    const SQL = await initSqlJs();
    const dbBuffer = fs.readFileSync(path.join(__dirname, 'database.db'));
    const db = new SQL.Database(dbBuffer);

    // Helper to execute query and return results
    const query = (sql) => {
      const result = db.exec(sql);
      if (result.length === 0) return [];
      const columns = result[0].columns;
      const values = result[0].values;
      return values.map(row => {
        const obj = {};
        columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        return obj;
      });
    };

    // Get files/images related to a component
    const getRelatedFiles = (componentType, componentId, field = 'image') => {
      const files = query(`
        SELECT files.* FROM files 
        JOIN files_related_mph ON files.id = files_related_mph.file_id
        WHERE files_related_mph.related_type = '${componentType}'
        AND files_related_mph.related_id = ${componentId}
        AND files_related_mph.field = '${field}'
      `);
      return files.length > 0 ? files[0] : null;
    };

    console.log('📊 Extracting and populating data...');

    // Extract dashboards with populated relationships
    const dashboards = query('SELECT * FROM dashboards');
    const populatedDashboards = dashboards.map(dashboard => {
      const result = { ...dashboard };
      
      if (dashboard.id) {
        // Get components for this dashboard
        const components = query(`SELECT * FROM dashboards_cmps WHERE entity_id = ${dashboard.id}`);
        
        components.forEach(comp => {
          switch (comp.component_type) {
            case 'dashboard.headline':
              const headlines = query(`SELECT * FROM components_dashboard_headlines WHERE id = ${comp.cmp_id}`);
              if (headlines.length > 0) {
                const headline = headlines[0];
                headline.image = getRelatedFiles('dashboard.headline', comp.cmp_id, 'image');
                result.headline = headline;
              }
              break;
              
            case 'dashboard.why-section':
              const whySections = query(`SELECT * FROM components_dashboard_why_sections WHERE id = ${comp.cmp_id}`);
              if (whySections.length > 0) {
                const whySection = whySections[0];
                whySection.image = getRelatedFiles('dashboard.why-section', comp.cmp_id, 'image');
                result.whySection = whySection;
              }
              break;
              
            case 'dashboard.produk-and-layanan':
              const productServices = query(`SELECT * FROM components_dashboard_produk_and_layanans WHERE id = ${comp.cmp_id}`);
              if (productServices.length > 0) {
                const productService = productServices[0];
                // Get linked products
                const linkedProducts = query(`
                  SELECT products.* FROM products 
                  JOIN components_dashboard_produk_and_layanans_products_lnk lnk 
                  ON products.id = lnk.product_id
                  WHERE lnk.produk_and_layanan_id = ${comp.cmp_id}
                  ORDER BY lnk.product_ord
                `);
                productService.products = linkedProducts.map(p => {
                  p.image = getRelatedFiles('api::product.product', p.id, 'image');
                  return p;
                });
                result.productService = productService;
              }
              break;
              
            case 'dashboard.dampak-kami':
              const impacts = query(`SELECT * FROM components_dashboard_dampak_kamis WHERE id = ${comp.cmp_id}`);
              if (impacts.length > 0) {
                const impact = impacts[0];
                impact.product1image = getRelatedFiles('dashboard.dampak-kami', comp.cmp_id, 'product1image');
                impact.product1bgimage = getRelatedFiles('dashboard.dampak-kami', comp.cmp_id, 'product1bgimage');
                impact.product2image = getRelatedFiles('dashboard.dampak-kami', comp.cmp_id, 'product2image');
                impact.product2bgimage = getRelatedFiles('dashboard.dampak-kami', comp.cmp_id, 'product2bgimage');
                result.ourImpact = impact;
              }
              break;
              
            case 'dashboard.banner-kontak':
              const bannerKontaks = query(`SELECT * FROM components_dashboard_banner_kontaks WHERE id = ${comp.cmp_id}`);
              if (bannerKontaks.length > 0) {
                const bannerKontak = bannerKontaks[0];
                bannerKontak.image = getRelatedFiles('dashboard.banner-kontak', comp.cmp_id, 'image');
                result.bannerCTA = bannerKontak; // Use bannerCTA to match frontend
              }
              break;
              
            case 'dashboard.latest-news':
              const latestNewsList = query(`SELECT * FROM components_dashboard_latest_news WHERE id = ${comp.cmp_id}`);
              if (latestNewsList.length > 0) {
                const latestNews = latestNewsList[0];
                
                // Get linked blogs
                const linkedBlogs = query(`
                  SELECT blogs.* 
                  FROM blogs 
                  JOIN components_dashboard_latest_news_blogs_lnk lnk ON blogs.id = lnk.blog_id
                  WHERE lnk.latest_news_id = ${comp.cmp_id}
                  ORDER BY lnk.blog_ord
                `);
                latestNews.blogs = linkedBlogs.map(blog => {
                  blog.image = getRelatedFiles('api::blog.blog', blog.id, 'image');
                  return blog;
                });
                
                // Get linked news/articles
                const linkedNews = query(`
                  SELECT articles.* 
                  FROM articles 
                  JOIN components_dashboard_latest_news_news_lnk lnk ON articles.id = lnk.article_id
                  WHERE lnk.latest_news_id = ${comp.cmp_id}
                  ORDER BY lnk.article_ord
                `);
                latestNews.news = linkedNews.map(article => {
                  article.image = getRelatedFiles('api::article.article', article.id, 'image');
                  return article;
                });
                
                result.latestNews = latestNews;
              }
              break;
          }
        });
      }
      
      return result;
    });

    // Extract products with images
    const products = query('SELECT * FROM products').map(product => {
      product.image = getRelatedFiles('api::product.product', product.id, 'image');
      return product;
    });

    // Extract services with images
    const services = query('SELECT * FROM services').map(service => {
      service.image = getRelatedFiles('api::service.service', service.id, 'image');
      return service;
    });

    // Extract blogs with populated author and image
    const blogs = query('SELECT * FROM blogs').map(blog => {
      blog.image = getRelatedFiles('api::blog.blog', blog.id, 'image');
      const authors = query(`SELECT up_users.* FROM up_users JOIN blogs_author_lnk ON up_users.id = blogs_author_lnk.user_id WHERE blogs_author_lnk.blog_id = ${blog.id}`);
      if (authors.length > 0) {
        blog.author = authors[0];
      }
      return blog;
    });

    // Extract articles with populated author and image
    const articles = query('SELECT * FROM articles').map(article => {
      article.image = getRelatedFiles('api::article.article', article.id, 'image');
      const authors = query(`SELECT up_users.* FROM up_users JOIN articles_author_lnk ON up_users.id = articles_author_lnk.user_id WHERE articles_author_lnk.article_id = ${article.id}`);
      if (authors.length > 0) {
        article.author = authors[0];
      }
      return article;
    });

    // Extract managements with images
    const managements = query('SELECT * FROM managements').map(management => {
      management.image = getRelatedFiles('api::management.management', management.id, 'image');
      return management;
    });

    // Extract certificates with files
    const certificates = query('SELECT * FROM certificates').map(cert => {
      cert.file = getRelatedFiles('api::certificate.certificate', cert.id, 'file');
      return cert;
    });

    // Extract brochures with files
    const brochures = query('SELECT * FROM brochures').map(brochure => {
      brochure.file = getRelatedFiles('api::brochure.brochure', brochure.id, 'file');
      return brochure;
    });

    // Extract about-us pages with components
    const aboutUses = query('SELECT * FROM about_uses').map(aboutUs => {
      const result = { ...aboutUs };
      
      const components = query(`SELECT * FROM about_uses_cmps WHERE entity_id = ${aboutUs.id}`);
      components.forEach(comp => {
        switch(comp.component_type) {
          case 'about-us.headline':
            const headlines = query(`SELECT * FROM components_about_us_headlines WHERE id = ${comp.cmp_id}`);
            if (headlines.length > 0) {
              result.headline = headlines[0];
              result.headline.image = getRelatedFiles('about-us.headline', comp.cmp_id, 'image');
            }
            break;
          
          case 'about-us.tentang-kami':
            const tentang = query(`SELECT * FROM components_about_us_tentang_kamis WHERE id = ${comp.cmp_id}`);
            if (tentang.length > 0) {
              result.aboutUs = tentang[0];
              result.aboutUs.image = getRelatedFiles('about-us.tentang-kami', comp.cmp_id, 'image');
            }
            break;
            
          case 'about-us.visi-misi':
            const visiMisi = query(`SELECT * FROM components_about_us_visi_misis WHERE id = ${comp.cmp_id}`);
            if (visiMisi.length > 0) {
              result.visionMission = visiMisi[0];
              // Get vision items
              const visionItems = query(`
                SELECT * FROM components_about_us_vision_items vi
                JOIN components_about_us_visi_misis_cmps vm ON vi.id = vm.cmp_id
                WHERE vm.entity_id = ${comp.cmp_id}
                ORDER BY vm.[order]
              `);
              result.visionMission.items = visionItems.map(item => {
                item.image = getRelatedFiles('about-us.vision-item', item.id, 'image');
                return item;
              });
            }
            break;
            
          case 'about-us.corporate-value':
            const corpValue = query(`SELECT * FROM components_about_us_corporate_values WHERE id = ${comp.cmp_id}`);
            if (corpValue.length > 0) {
              result.corporateValue = corpValue[0];
              // Get corporate value items
              const corpItems = query(`
                SELECT * FROM components_about_us_corporate_value_items cvi
                JOIN components_about_us_corporate_values_cmps cvc ON cvi.id = cvc.cmp_id
                WHERE cvc.entity_id = ${comp.cmp_id}
                ORDER BY cvc.[order]
              `);
              result.corporateValue.items = corpItems.map(item => {
                item.image = getRelatedFiles('about-us.corporate-value-item', item.id, 'image');
                return item;
              });
            }
            break;
            
          case 'about-us.banner-karir':
            const bannerKarir = query(`SELECT * FROM components_about_us_banner_karirs WHERE id = ${comp.cmp_id}`);
            if (bannerKarir.length > 0) {
              result.bannerCTA = bannerKarir[0];
              result.bannerCTA.image = getRelatedFiles('about-us.banner-karir', comp.cmp_id, 'image');
            }
            break;
        }
      });
      
      // Get managements for about-us page
      result.managements = managements;
      
      return result;
    });

    // Extract contacts with components
    const contacts = query('SELECT * FROM contacts').map(contact => {
      const result = { ...contact };
      
      const components = query(`SELECT * FROM contacts_cmps WHERE entity_id = ${contact.id}`);
      components.forEach(comp => {
        switch(comp.component_type) {
          case 'dashboard.headline':
            const headlines = query(`SELECT * FROM components_dashboard_headlines WHERE id = ${comp.cmp_id}`);
            if (headlines.length > 0) {
              result.headline = headlines[0];
              result.headline.image = getRelatedFiles('dashboard.headline', comp.cmp_id, 'image');
            }
            break;
            
          case 'contact.address-and-contact':
            const addresses = query(`SELECT * FROM components_contact_address_and_contacts WHERE id = ${comp.cmp_id}`);
            if (addresses.length > 0) {
              result.addressAndContact = addresses[0];
            }
            break;
        }
      });
      
      return result;
    });

    // Extract news-sections with components
    const newsSections = query('SELECT * FROM news_sections').map(newsSection => {
      const result = { ...newsSection };
      
      const components = query(`SELECT * FROM news_sections_cmps WHERE entity_id = ${newsSection.id}`);
      components.forEach(comp => {
        switch(comp.component_type) {
          case 'dashboard.headline':
            const headlines = query(`SELECT * FROM components_dashboard_headlines WHERE id = ${comp.cmp_id}`);
            if (headlines.length > 0) {
              result.headline = headlines[0];
              result.headline.image = getRelatedFiles('dashboard.headline', comp.cmp_id, 'image');
            }
            break;
            
          case 'dashboard.banner-kontak':
            const bannerKontaks = query(`SELECT * FROM components_dashboard_banner_kontaks WHERE id = ${comp.cmp_id}`);
            if (bannerKontaks.length > 0) {
              result.bannerCTA = bannerKontaks[0];
              result.bannerCTA.image = getRelatedFiles('dashboard.banner-kontak', comp.cmp_id, 'image');
            }
            break;
        }
      });
      
      // Get recent news and blogs (limit to 6 each, sorted by date)
      const recentArticles = articles
        .filter(a => a.published_at)
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      
      result.headlineNews = recentArticles[0] || null;
      result.news1 = recentArticles.slice(1, 7);
      result.news2 = recentArticles.slice(7, 13);
      
      return result;
    });

    // Extract blog-sections (similar to news-sections but for blogs)
    const blogSections = query('SELECT * FROM blog_sections').map(blogSection => {
      const result = { ...blogSection };
      
      const components = query(`SELECT * FROM blog_sections_cmps WHERE entity_id = ${blogSection.id}`);
      components.forEach(comp => {
        switch(comp.component_type) {
          case 'dashboard.headline':
            const headlines = query(`SELECT * FROM components_dashboard_headlines WHERE id = ${comp.cmp_id}`);
            if (headlines.length > 0) {
              result.headline = headlines[0];
              result.headline.image = getRelatedFiles('dashboard.headline', comp.cmp_id, 'image');
            }
            break;
            
          case 'dashboard.banner-kontak':
            const bannerKontaks = query(`SELECT * FROM components_dashboard_banner_kontaks WHERE id = ${comp.cmp_id}`);
            if (bannerKontaks.length > 0) {
              result.bannerCTA = bannerKontaks[0];
              result.bannerCTA.image = getRelatedFiles('dashboard.banner-kontak', comp.cmp_id, 'image');
            }
            break;
        }
      });
      
      // Get recent blogs
      const recentBlogs = blogs
        .filter(b => b.published_at)
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      
      result.headlineBlog = recentBlogs[0] || null;
      result.blogs1 = recentBlogs.slice(1, 7);
      result.blogs2 = recentBlogs.slice(7, 13);
      
      return result;
    });

    // Extract product-agricultures with components
    const productAgricultures = query('SELECT * FROM product_agricultures').map(product => {
      const result = { ...product };
      
      const components = query(`SELECT * FROM product_agricultures_cmps WHERE entity_id = ${product.id}`);
      components.forEach(comp => {
        switch(comp.component_type) {
          case 'dashboard.headline':
            const headlines = query(`SELECT * FROM components_dashboard_headlines WHERE id = ${comp.cmp_id}`);
            if (headlines.length > 0) {
              result.headline = headlines[0];
              result.headline.image = getRelatedFiles('dashboard.headline', comp.cmp_id, 'image');
            }
            break;
            
          case 'product.about-section':
            const aboutSections = query(`SELECT * FROM components_product_about_sections WHERE id = ${comp.cmp_id}`);
            if (aboutSections.length > 0) {
              result.aboutSection = aboutSections[0];
            }
            break;
            
          case 'product.why-section':
            const whySections = query(`SELECT * FROM components_product_why_sections WHERE id = ${comp.cmp_id}`);
            if (whySections.length > 0) {
              result.whySection = whySections[0];
              // Get why items
              const whyItems = query(`
                SELECT * FROM components_product_product_whies pw
                JOIN components_product_why_sections_cmps ws ON pw.id = ws.cmp_id
                WHERE ws.entity_id = ${comp.cmp_id}
                ORDER BY ws.[order]
              `);
              result.whySection.items = whyItems.map(item => {
                item.image = getRelatedFiles('product.product-why', item.id, 'image');
                return item;
              });
            }
            break;
            
          case 'dashboard.banner-kontak':
            const bannerKontaks = query(`SELECT * FROM components_dashboard_banner_kontaks WHERE id = ${comp.cmp_id}`);
            if (bannerKontaks.length > 0) {
              result.bannerCTA = bannerKontaks[0];
              result.bannerCTA.image = getRelatedFiles('dashboard.banner-kontak', comp.cmp_id, 'image');
            }
            break;
        }
      });
      
      return result;
    });

    // Extract product-livestocks with components
    const productLivestocks = query('SELECT * FROM product_livestocks').map(product => {
      const result = { ...product };
      
      const components = query(`SELECT * FROM product_livestocks_cmps WHERE entity_id = ${product.id}`);
      components.forEach(comp => {
        switch(comp.component_type) {
          case 'dashboard.headline':
            const headlines = query(`SELECT * FROM components_dashboard_headlines WHERE id = ${comp.cmp_id}`);
            if (headlines.length > 0) {
              result.headline = headlines[0];
              result.headline.image = getRelatedFiles('dashboard.headline', comp.cmp_id, 'image');
            }
            break;
            
          case 'product.about-section':
            const aboutSections = query(`SELECT * FROM components_product_about_sections WHERE id = ${comp.cmp_id}`);
            if (aboutSections.length > 0) {
              result.aboutSection = aboutSections[0];
            }
            break;
            
          case 'product.why-section':
            const whySections = query(`SELECT * FROM components_product_why_sections WHERE id = ${comp.cmp_id}`);
            if (whySections.length > 0) {
              result.whySection = whySections[0];
              // Get why items
              const whyItems = query(`
                SELECT * FROM components_product_product_whies pw
                JOIN components_product_why_sections_cmps ws ON pw.id = ws.cmp_id
                WHERE ws.entity_id = ${comp.cmp_id}
                ORDER BY ws.[order]
              `);
              result.whySection.items = whyItems.map(item => {
                item.image = getRelatedFiles('product.product-why', item.id, 'image');
                return item;
              });
            }
            break;
            
          case 'dashboard.banner-kontak':
            const bannerKontaks = query(`SELECT * FROM components_dashboard_banner_kontaks WHERE id = ${comp.cmp_id}`);
            if (bannerKontaks.length > 0) {
              result.bannerCTA = bannerKontaks[0];
              result.bannerCTA.image = getRelatedFiles('dashboard.banner-kontak', comp.cmp_id, 'image');
            }
            break;
        }
      });
      
      return result;
    });

    // Extract product-fisheries with components
    const productFisheries = query('SELECT * FROM product_fisheries').map(product => {
      const result = { ...product };
      
      const components = query(`SELECT * FROM product_fisheries_cmps WHERE entity_id = ${product.id}`);
      components.forEach(comp => {
        switch(comp.component_type) {
          case 'dashboard.headline':
            const headlines = query(`SELECT * FROM components_dashboard_headlines WHERE id = ${comp.cmp_id}`);
            if (headlines.length > 0) {
              result.headline = headlines[0];
              result.headline.image = getRelatedFiles('dashboard.headline', comp.cmp_id, 'image');
            }
            break;
            
          case 'product.about-section':
            const aboutSections = query(`SELECT * FROM components_product_about_sections WHERE id = ${comp.cmp_id}`);
            if (aboutSections.length > 0) {
              result.aboutSection = aboutSections[0];
            }
            break;
            
          case 'product.why-section':
            const whySections = query(`SELECT * FROM components_product_why_sections WHERE id = ${comp.cmp_id}`);
            if (whySections.length > 0) {
              result.whySection = whySections[0];
              // Get why items
              const whyItems = query(`
                SELECT * FROM components_product_product_whies pw
                JOIN components_product_why_sections_cmps ws ON pw.id = ws.cmp_id
                WHERE ws.entity_id = ${comp.cmp_id}
                ORDER BY ws.[order]
              `);
              result.whySection.items = whyItems.map(item => {
                item.image = getRelatedFiles('product.product-why', item.id, 'image');
                return item;
              });
            }
            break;
            
          case 'dashboard.banner-kontak':
            const bannerKontaks = query(`SELECT * FROM components_dashboard_banner_kontaks WHERE id = ${comp.cmp_id}`);
            if (bannerKontaks.length > 0) {
              result.bannerCTA = bannerKontaks[0];
              result.bannerCTA.image = getRelatedFiles('dashboard.banner-kontak', comp.cmp_id, 'image');
            }
            break;
        }
      });
      
      return result;
    });

    const data = {
      dashboards: populatedDashboards,
      products,
      services,
      blogs,
      articles,
      managements,
      certificates,
      brochures,
      aboutUses,
      contacts,
      newsSections,
      blogSections,
      productAgricultures,
      productLivestocks,
      productFisheries
    };

    // Save to JSON file
    fs.writeFileSync(
      path.join(__dirname, 'data.json'),
      JSON.stringify(data, null, 2)
    );

    console.log('✅ Data extracted and populated successfully!');
    console.log(`   - ${populatedDashboards.length} dashboards`);
    console.log(`   - ${products.length} products`);
    console.log(`   - ${services.length} services`);
    console.log(`   - ${blogs.length} blogs`);
    console.log(`   - ${articles.length} articles`);
    console.log(`   - ${aboutUses.length} about-us pages`);
    console.log(`   - ${contacts.length} contact pages`);
    console.log(`   - ${newsSections.length} news sections`);
    console.log(`   - ${blogSections.length} blog sections`);
    console.log(`   - ${productAgricultures.length} agriculture products`);
    console.log(`   - ${productLivestocks.length} livestock products`);
    console.log(`   - ${productFisheries.length} fishery products`);
    
    db.close();
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error.stack);
  }
}

extractData();
