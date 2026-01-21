#!/bin/bash
# Fix broken internal links in Strapi database

cd /opt/cbi-strapi

# Update Flora One article (ID 33) - fix links
sqlite3 .tmp/data.db "UPDATE articles SET content = REPLACE(content, '/article/rajabio', '/news/rajabio-revolusi-organik-untuk-padi-sawah-indonesia-janjikan-panen-berlimpah-dan-lahan-lestari') WHERE id = 33;"

sqlite3 .tmp/data.db "UPDATE articles SET content = REPLACE(content, '/blog/pengertian-pupuk-organik-jenis-manfaat-dan-cara-penggunaannya-untuk-pertanian-berkelanjutan', '/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya') WHERE id = 33;"

# Update Rajabio article (ID 28) - fix links
sqlite3 .tmp/data.db "UPDATE articles SET content = REPLACE(content, '/article/flora-one', '/news/revolusi-hijau-di-sawah-nusantara-pupuk-hayati-cair-flora-one-buktikan-diri-sebagai-kunci-panen-padi-melimpah-dan-menguntungkan') WHERE id = 28;"

sqlite3 .tmp/data.db "UPDATE articles SET content = REPLACE(content, '/blog/pengertian-pupuk-organik-jenis-manfaat-dan-cara-penggunaannya-untuk-pertanian-berkelanjutan', '/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya') WHERE id = 28;"

# Update Sampah Organik blog (ID 23) - fix links
sqlite3 .tmp/data.db "UPDATE blogs SET content = REPLACE(content, '/blog/pengertian-pupuk-organik-jenis-manfaat-dan-cara-penggunaannya-untuk-pertanian-berkelanjutan', '/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya') WHERE id = 23;"

# Update Pupuk Organik blog (ID 35) - fix any broken links
sqlite3 .tmp/data.db "UPDATE blogs SET content = REPLACE(content, '/blog/pengertian-pupuk-organik-jenis-manfaat-dan-cara-penggunaannya-untuk-pertanian-berkelanjutan', '/blog/pengertian-pupuk-organik-jenis-dan-manfaatnya') WHERE id = 35;"

echo "Links updated successfully!"

# Restart Strapi
pm2 restart cbi-strapi-dev
