# Blog Images Generation Guide
## VPS Database Research Summary - January 19, 2026

### Research Findings

After deep analysis of the VPS database at `/opt/cbi-strapi/.tmp/data.db`, I discovered:

- **Articles Status**: All 11 published news articles have images ✅
- **Blogs Status**: Found **45 published blogs without images** ❌

All missing images are for "maklon" (fertilizer outsourcing) type blog posts in Indonesian language.

---

## Image Specifications

### Recommended Aspect Ratios for Blog Images

**Primary Ratio: 16:9 (1920x1080px)**
- Best for hero images and featured blog covers
- Perfect for social media sharing (Facebook, LinkedIn, Twitter)
- Optimal for OpenGraph and SEO previews

**Alternative Ratios:**
- 4:3 (1200x900px) - Traditional blog format
- 3:2 (1500x1000px) - Photography-style balance
- 21:9 (2560x1080px) - Ultra-wide cinematic (for special features)

**File Requirements:**
- Format: WebP (for web performance) or JPEG
- Maximum size: 300KB (compressed)
- Minimum resolution: 1200px width
- Color space: sRGB

---

## AI Image Generation Prompts

### Prompt Structure Template
```
[Main Subject] + [Style] + [Composition] + [Technical Details]
```

**Style Guidelines:**
- Professional photography
- Natural agricultural settings
- Bright, vibrant colors (green fields, healthy plants)
- Indonesian farming context
- Authentic, documentary-style approach
- Avoid overly staged or fake-looking scenes

---

## Complete Image Prompts for All 45 Blogs

### 1. Blog ID 45: Formulasi Pupuk Custom
**Title**: Formulasi Pupuk Custom: Panduan Membuat Formula Pupuk Sesuai Kebutuhan

**DALL-E Prompt**:
```
Professional photography of a modern agricultural laboratory in Indonesia, scientist in white lab coat mixing custom fertilizer formula in beakers and test tubes, microscope and agricultural soil samples on table, precision measuring equipment, clean professional setting with natural lighting, bright green plants in background, high-quality commercial photography, 16:9 aspect ratio, photorealistic, vibrant colors
```

---

### 2. Blog ID 56: Teknologi Fermentasi Pupuk Hayati
**Title**: Teknologi Fermentasi Pupuk Hayati Modern & Aplikasinya

**DALL-E Prompt**:
```
Modern fermentation facility for biological fertilizer production, large industrial fermentation tanks in clean factory, Indonesian workers in protective equipment monitoring bioreactor systems, digital control panels showing fermentation parameters, microscopic view of beneficial microorganisms overlay, high-tech agricultural biotechnology setting, professional industrial photography, natural lighting from skylights, 16:9 aspect ratio, photorealistic
```

---

### 3. Blog ID 58: Strategi Branding Pupuk Organik
**Title**: Strategi Branding Pupuk Organik: Bangun Brand yang Kuat

**DALL-E Prompt**:
```
Professional product photography of organic fertilizer packaging design, modern eco-friendly bags and bottles with attractive branding, arranged on rustic wooden table with fresh green plants and healthy soil, marketing materials and laptop showing brand strategy, bright natural daylight, commercial advertising style, vibrant green and earth tones, 16:9 aspect ratio, high-end product photography
```

---

### 4. Blog ID 59: Cara Daftar Pupuk ke Kementan RI
**Title**: Cara Daftar Pupuk ke Kementan RI: Syarat & Prosedur Lengkap

**DALL-E Prompt**:
```
Professional office scene showing Indonesian Ministry of Agriculture certification process, official documents and registration forms on desk, Indonesian government building in background, official stamp and certification papers, laptop displaying online registration portal, professional business photography, clean organized workspace, natural office lighting, 16:9 aspect ratio, photorealistic, official government atmosphere
```

---

### 5. Blog ID 61: Tren Pupuk Organik Indonesia 2024-2025
**Title**: Tren Pupuk Organik Indonesia 2024-2025: Peluang dan Tantangan

**DALL-E Prompt**:
```
Modern Indonesian agricultural landscape showing contrast between traditional and modern organic farming methods, split composition: left side shows traditional farming, right side shows modern organic agriculture with technology, drones monitoring fields, farmers using smartphones for precision agriculture, lush green rice paddies, sunrise lighting creating golden hour effect, aerial photography style, 16:9 aspect ratio, cinematic, vibrant colors
```

---

### 6. Blog ID 66: Pupuk Hayati - Panduan Lengkap 2026
**Title**: Pupuk Hayati: Pengertian, Jenis, Manfaat & Cara Aplikasi [Panduan Lengkap 2026]

**DALL-E Prompt**:
```
Comprehensive visual guide showing biological fertilizer application, Indonesian farmer applying biofertilizer to healthy rice plants, close-up of liquid biofertilizer bottle, microscopic view of beneficial microorganisms, before-and-after comparison of plant growth, vibrant green paddy field, educational infographic style merged with real photography, bright natural daylight, 16:9 aspect ratio, professional agricultural photography
```

---

### 7. Blog ID 67: 15 Jenis Pupuk Hayati Terbaik
**Title**: 15 Jenis Pupuk Hayati Terbaik untuk Pertanian: Fungsi & Cara Penggunaannya

**DALL-E Prompt**:
```
Professional product display of 15 different types of biological fertilizer bottles and packages arranged in organized grid layout, each clearly labeled, natural wooden shelf display, fresh agricultural plants growing behind each product showing results, clean commercial photography, bright even lighting, green and earth tone color palette, 16:9 aspect ratio, catalog-style professional photography
```

---

### 8. Blog ID 68: 20 Manfaat Pupuk Hayati
**Title**: 20 Manfaat Pupuk Hayati untuk Pertanian: Bukti Ilmiah & Testimoni Petani

**DALL-E Prompt**:
```
Split-screen comparison photography: left side showing traditional chemical farming with stressed plants, right side showing thriving organic agriculture using biofertilizer with extremely healthy vibrant crops, Indonesian farmer examining healthy plants with satisfaction, scientific charts and graphs floating as overlays, bright natural sunlight, professional agricultural documentary style, 16:9 aspect ratio, photorealistic, high contrast
```

---

### 9. Blog ID 69: Cara Membuat Pupuk Hayati Sendiri
**Title**: Cara Membuat Pupuk Hayati Sendiri: Panduan Lengkap dari Ahli Mikrobiologi

**DALL-E Prompt**:
```
Step-by-step DIY biofertilizer production setup at Indonesian home garden, local ingredients like molasses, organic matter, microorganism culture in fermentation containers, Indonesian person in casual clothes mixing ingredients, measuring tools, fermentation bubbling actively, natural outdoor setting, educational how-to photography style, warm natural lighting, 16:9 aspect ratio, authentic documentary photography
```

---

### 10. Blog ID 70: Pupuk Hayati untuk Padi
**Title**: Pupuk Hayati untuk Padi: Panduan Lengkap Meningkatkan Hasil Panen hingga 30%

**DALL-E Prompt**:
```
Spectacular aerial view of Indonesian rice paddy fields in peak growth stage, farmer spraying biofertilizer using backpack sprayer in foreground, lush green terraced rice paddies stretching to horizon, healthy robust rice plants with heavy grain heads, golden sunrise lighting, dramatic sky, professional agricultural photography, vibrant green colors, 16:9 aspect ratio, cinematic composition
```

---

### 11. Blog ID 71: Pupuk Hayati untuk Jagung
**Title**: Pupuk Hayati untuk Jagung: Tingkatkan Hasil Panen hingga 25% dengan Mikroorganisme

**DALL-E Prompt**:
```
Indonesian corn plantation showing exceptionally healthy tall corn plants, farmer examining corn cob quality in mature cornfield, close-up of plump golden corn kernels, biofertilizer application equipment in background, blue sky with white clouds, professional agricultural photography, vibrant yellows and greens, natural sunlight, 16:9 aspect ratio, photorealistic
```

---

### 12. Blog ID 72: Pupuk Hayati vs Pupuk Kimia
**Title**: Pupuk Hayati vs Pupuk Kimia: Perbandingan Lengkap Kelebihan, Kekurangan & Efektivitas

**DALL-E Prompt**:
```
Visual comparison layout: two identical plots side by side, left plot using chemical fertilizer showing moderate growth, right plot using biofertilizer showing superior growth and soil health, soil cross-section revealing healthy microorganism activity vs depleted soil, scientific comparison charts overlay, Indonesian agricultural setting, professional documentary photography, 16:9 aspect ratio, educational style, clear visual contrast
```

---

### 13. Blog ID 73: Harga Pupuk Hayati 2026
**Title**: Harga Pupuk Hayati 2026: Daftar Lengkap, Faktor Penentu & Tips Memilih Produk Berkualitas

**DALL-E Prompt**:
```
Professional commercial photography of various biofertilizer products with visible price tags, calculator showing cost analysis, Indonesian rupiah currency, laptop displaying price comparison chart, quality certificates, agricultural products in background, clean organized table setting, professional business photography style, bright even lighting, 16:9 aspect ratio, commercial catalog aesthetic
```

---

### 14. Blog ID 74: 10 Pupuk Hayati Terbaik di Indonesia 2026
**Title**: 10 Pupuk Hayati Terbaik di Indonesia 2026: Review Lengkap & Rekomendasi

**DALL-E Prompt**:
```
Professional product review composition showing top 10 biofertilizer brands in Indonesia, award podium display with gold, silver, bronze tiers, each product with star ratings and review badges, lush healthy plants growing from each product, modern commercial photography, bright studio lighting, green and gold color scheme, 16:9 aspect ratio, premium editorial photography style
```

---

### 15. Blog ID 75: Produsen Pupuk Hayati Terpercaya
**Title**: Produsen Pupuk Hayati Terpercaya di Indonesia: Panduan Memilih Pabrik Berkualitas

**DALL-E Prompt**:
```
Professional photography of modern Indonesian biofertilizer manufacturing facility, clean production floor with quality control processes, workers in white protective gear, certification plaques on wall, advanced fermentation equipment, quality testing laboratory in background, professional industrial photography, bright clean environment, 16:9 aspect ratio, trustworthy corporate atmosphere
```

---

### 16. Blog ID 76: Pupuk Hayati untuk Kopi
**Title**: Pupuk Hayati untuk Kopi: Tingkatkan Produktivitas dan Kualitas Biji Kopi

**DALL-E Prompt**:
```
Indonesian coffee plantation on mountain slopes, farmer applying biofertilizer to arabica coffee plants loaded with red coffee cherries, close-up of premium quality coffee berries, misty morning atmosphere, volcanic soil, traditional baskets filled with harvested coffee, professional agricultural photography, rich reds and greens, natural lighting, 16:9 aspect ratio, cinematic depth
```

---

### 17. Blog ID 77: Pupuk Hayati untuk Kakao
**Title**: Pupuk Hayati untuk Kakao: Panduan Meningkatkan Produktivitas dan Kualitas Biji

**DALL-E Prompt**:
```
Thriving Indonesian cacao plantation, farmer tending to cocoa trees with abundant pods, biofertilizer being applied at tree base, close-up of healthy yellow and red cacao pods growing on trunk, split cacao pod showing premium quality beans, tropical forest setting, natural shade, professional agricultural photography, warm earthy tones, 16:9 aspect ratio, photorealistic
```

---

### 18. Blog ID 78: Pupuk Hayati untuk Karet
**Title**: Pupuk Hayati untuk Karet: Panduan Meningkatkan Produksi Lateks Berkualitas

**DALL-E Prompt**:
```
Indonesian rubber plantation worker tapping rubber tree with collection cup, healthy rubber trees in organized rows, white latex flowing into collecting container, biofertilizer application system visible, early morning mist, professional agricultural documentation, natural forest lighting, green and white color palette, 16:9 aspect ratio, documentary style photography
```

---

### 19. Blog ID 79: Pupuk Hayati untuk Teh
**Title**: Pupuk Hayati untuk Teh: Panduan Meningkatkan Kualitas dan Produktivitas Daun

**DALL-E Prompt**:
```
Beautiful Indonesian tea plantation on rolling hills, tea pickers harvesting premium tea leaves from perfectly manicured bushes, biofertilizer spraying equipment, close-up of fresh green tea shoots, misty mountain backdrop, sunrise golden hour lighting, professional plantation photography, vibrant greens, 16:9 aspect ratio, serene and picturesque composition
```

---

### 20. Blog ID 80: Pupuk Hayati untuk Kentang
**Title**: Pupuk Hayati untuk Kentang: Panduan Meningkatkan Hasil dan Kualitas Umbi

**DALL-E Prompt**:
```
Indonesian highland potato farm, farmer harvesting large healthy potato tubers from rich soil, cross-section of soil showing robust root system and perfect tubers, biofertilizer application tools, cool mountain climate vegetation, professional agricultural photography, earthy browns and greens, natural sunlight, 16:9 aspect ratio, abundant harvest theme
```

---

### 21. Blog ID 81: Pupuk Hayati untuk Bawang Merah
**Title**: Pupuk Hayati untuk Bawang Merah: Panduan Meningkatkan Hasil dan Kualitas Umbi

**DALL-E Prompt**:
```
Indonesian shallot farm with rows of healthy red onion plants, farmer examining large quality shallot bulbs freshly harvested, baskets full of premium red shallots, biofertilizer being applied to crops, bright sunny day, professional agricultural photography, vibrant reds and greens, 16:9 aspect ratio, commercial crop photography
```

---

### 22. Blog ID 82: Pupuk Hayati untuk Cabai
**Title**: Pupuk Hayati untuk Cabai: Panduan Meningkatkan Hasil dan Kualitas Buah

**DALL-E Prompt**:
```
Indonesian chili pepper plantation, plants heavily loaded with bright red and green chilies, farmer examining chili quality, biofertilizer application in progress, healthy green foliage, close-up of perfect glossy chilies, professional agricultural photography, vivid reds and greens, natural lighting, 16:9 aspect ratio, vibrant colors, abundant harvest
```

---

### 23. Blog ID 83: Pupuk Hayati MOL (Mikroorganisme Lokal)
**Title**: Pupuk Hayati MOL (Mikroorganisme Lokal): Panduan Lengkap Pembuatan dan Aplikasi

**DALL-E Prompt**:
```
Traditional Indonesian MOL (Local Microorganism) production setup, transparent fermentation containers showing active bubbling, local organic materials like bamboo shoots, fruit peels, rice wash water, Indonesian person demonstrating MOL preparation process, natural rural setting, educational documentation style, warm natural lighting, 16:9 aspect ratio, authentic traditional agricultural practice
```

---

### 24. Blog ID 84: Pupuk Hayati vs Pupuk Organik
**Title**: Pupuk Hayati vs Pupuk Organik: Panduan Lengkap Perbedaan dan Cara Memilih

**DALL-E Prompt**:
```
Side-by-side comparison display: biofertilizer bottle with microorganism symbols vs organic compost pile, microscope showing live microorganisms vs decomposed organic matter, scientific diagrams explaining differences, Indonesian farmer considering both options, professional educational photography, clean modern layout, 16:9 aspect ratio, informative infographic style with real photography
```

---

### 25. Blog ID 85: Aplikasi Pupuk Hayati Musim Hujan
**Title**: Aplikasi Pupuk Hayati Musim Hujan: Strategi Optimal untuk Hasil Maksimal

**DALL-E Prompt**:
```
Indonesian farmer applying biofertilizer during rainy season, rain clouds in background, healthy crops thriving in wet conditions, waterproof spraying equipment, droplets on vibrant green leaves, dramatic weather photography, professional agricultural documentation, moody atmospheric lighting with breaks of sunlight, 16:9 aspect ratio, dynamic weather conditions
```

---

### 26. Blog ID 86: Pupuk Hayati untuk Tomat
**Title**: Pupuk Hayati untuk Tomat: Panduan Meningkatkan Hasil dan Kualitas Buah

**DALL-E Prompt**:
```
Indonesian greenhouse tomato cultivation, plants heavy with perfect red ripe tomatoes on vines, farmer harvesting premium quality tomatoes, biofertilizer drip irrigation system, close-up of glossy perfect tomatoes, controlled environment growing, professional horticultural photography, vibrant reds and greens, clean bright lighting, 16:9 aspect ratio, commercial produce quality
```

---

### 27. Blog ID 87: Pupuk Hayati untuk Melon dan Semangka
**Title**: Pupuk Hayati untuk Melon dan Semangka: Panduan Meningkatkan Kemanisan dan Hasil

**DALL-E Prompt**:
```
Indonesian melon and watermelon farm, farmer displaying massive perfectly round melons and watermelons, cut fruit showing sweet red flesh and high sugar content, biofertilizer application equipment, sprawling healthy vines covering ground, professional agricultural photography, vibrant greens, reds, and yellows, natural sunlight, 16:9 aspect ratio, bountiful harvest theme
```

---

### 28. Blog ID 88: Pupuk Hayati untuk Lahan Gambut
**Title**: Pupuk Hayati untuk Lahan Gambut: Strategi Optimalisasi Pertanian Berkelanjutan

**DALL-E Prompt**:
```
Indonesian peatland agriculture, rehabilitated peat soil showing healthy crop growth, cross-section revealing improved soil structure with biofertilizer treatment, farmer examining soil quality, water management systems, sustainable farming practices, environmental conservation theme, professional documentary photography, earthy tones with green growth, 16:9 aspect ratio, conservation agriculture
```

---

### 29. Blog ID 89: Pupuk Hayati untuk Revegetasi Lahan Kritis
**Title**: Pupuk Hayati untuk Revegetasi Lahan Kritis: Panduan Rehabilitasi Lahan Terdegradasi

**DALL-E Prompt**:
```
Dramatic before-and-after split image: degraded barren land transforming into lush vegetation, Indonesian environmental workers planting trees with biofertilizer application, young trees establishing in restored soil, erosion control measures, hope and renewal theme, professional environmental photography, contrast between brown degraded soil and vibrant green growth, 16:9 aspect ratio, restoration success story
```

---

### 30. Blog ID 90: Pupuk Hayati untuk Urban Farming
**Title**: Pupuk Hayati untuk Urban Farming: Solusi Pertanian Perkotaan Berkelanjutan

**DALL-E Prompt**:
```
Modern Indonesian urban rooftop garden or vertical farm, city skyline in background, diverse vegetables growing in containers and vertical systems, young urban farmer applying biofertilizer to container plants, sustainable city agriculture, professional lifestyle photography, contrast between urban architecture and green agriculture, bright natural light, 16:9 aspect ratio, contemporary urban farming aesthetic
```

---

### 31. Blog ID 91: Pupuk Hayati dan Adaptasi Perubahan Iklim
**Title**: Pupuk Hayati dan Adaptasi Perubahan Iklim: Strategi Pertanian Masa Depan

**DALL-E Prompt**:
```
Futuristic Indonesian agriculture scene, climate-resilient crops thriving with biofertilizer support, weather monitoring technology, drought-resistant plants in challenging conditions, scientific overlays showing climate adaptation data, sustainable agriculture technology, professional agricultural futurism photography, hope and innovation theme, 16:9 aspect ratio, forward-looking perspective with natural and technological elements
```

---

### 32. Blog ID 92: Pupuk Hayati untuk Pembibitan
**Title**: Pupuk Hayati untuk Pembibitan: Panduan Lengkap Produksi Bibit Berkualitas

**DALL-E Prompt**:
```
Indonesian plant nursery facility, rows of healthy seedling trays, biofertilizer being applied to young plants, close-up of robust seedlings with strong root systems, greenhouse environment, professional horticulture photography, vibrant greens, controlled lighting, 16:9 aspect ratio, commercial seedling production, healthy growth theme
```

---

### 33. Blog ID 93: Pupuk Hayati Starter untuk Transplanting
**Title**: Pupuk Hayati Starter untuk Transplanting: Minimalkan Stress Pindah Tanam

**DALL-E Prompt**:
```
Indonesian farmer transplanting seedlings from nursery tray to field, biofertilizer starter solution being applied to roots, healthy seedlings with minimal transplant shock, close-up of root treatment process, professional agricultural documentation, gentle handling techniques, natural daylight, 16:9 aspect ratio, educational step-by-step photography, care and precision theme
```

---

### 34. Blog ID 94: Pupuk Hayati untuk Tanaman Hias
**Title**: Pupuk Hayati untuk Tanaman Hias: Rahasia Koleksi Tanaman Sehat dan Cantik

**DALL-E Prompt**:
```
Beautiful Indonesian indoor plant collection, diverse ornamental plants in perfect health, person applying biofertilizer to potted decorative plants, lush green foliage, flowering plants in bloom, aesthetic home garden setting, professional lifestyle photography, vibrant natural colors, soft natural window lighting, 16:9 aspect ratio, Instagram-worthy plant collection
```

---

### 35. Blog ID 95: Pupuk Hayati untuk Perkebunan Skala Kecil
**Title**: Pupuk Hayati untuk Perkebunan Skala Kecil: Solusi Hemat untuk Petani Mandiri

**DALL-E Prompt**:
```
Small-scale Indonesian family farm, independent farmer with small biofertilizer supply managing diverse crops efficiently, intimate farming scale, mixed vegetable garden, cost-effective farming practices, personal connection to land, professional documentary photography, warm authentic atmosphere, natural lighting, 16:9 aspect ratio, sustainable smallholder agriculture
```

---

### 36. Blog ID 96: Pupuk Hayati untuk Sayuran
**Title**: Pupuk Hayati untuk Sayuran: Panduan Lengkap Budidaya Sayuran Organik Berkualitas

**DALL-E Prompt**:
```
Abundant Indonesian organic vegetable garden, farmer harvesting diverse vegetables like leafy greens, carrots, lettuce, herbs, biofertilizer application equipment, extremely healthy vibrant vegetables, professional agricultural photography, rich greens and earth tones, natural sunlight, 16:9 aspect ratio, organic produce quality, farm-to-table theme
```

---

### 37. Blog ID 97: Pupuk Hayati untuk Kelapa Sawit
**Title**: Pupuk Hayati untuk Kelapa Sawit: Tingkatkan Produktivitas TBS hingga 25%

**DALL-E Prompt**:
```
Extensive Indonesian oil palm plantation, healthy mature palm trees with heavy bunches of fresh fruit (TBS), plantation worker applying biofertilizer at palm base, harvested fresh fruit bunches, organized plantation rows stretching to horizon, professional plantation photography, vibrant greens and oranges, natural lighting, 16:9 aspect ratio, commercial palm oil production
```

---

### 38. Blog ID 98: Pupuk Hayati untuk Tebu
**Title**: Pupuk Hayati untuk Tebu: Tingkatkan Rendemen Gula hingga 20%

**DALL-E Prompt**:
```
Indonesian sugarcane plantation, tall healthy sugarcane stalks swaying in wind, farmer examining cane quality and sugar content, biofertilizer application in progress, close-up of robust sugarcane stems, harvesting equipment in background, professional agricultural photography, bright greens and yellows, blue sky, 16:9 aspect ratio, commercial sugar production
```

---

### 39. Blog ID 99: Pupuk Hayati Cair vs Padat
**Title**: Pupuk Hayati Cair vs Padat: Mana yang Lebih Efektif? [Perbandingan Lengkap]

**DALL-E Prompt**:
```
Product comparison layout: liquid biofertilizer bottle on left vs granular/powder biofertilizer bag on right, plants grown with each type showing results, application methods demonstrated, scientific comparison charts, Indonesian farmer considering both options, professional product photography, clean modern presentation, 16:9 aspect ratio, educational comparative photography
```

---

### 40. Blog ID 100: Pupuk Hayati untuk Greenhouse
**Title**: Pupuk Hayati untuk Greenhouse: Panduan Lengkap Budidaya Tanaman di Rumah Kaca

**DALL-E Prompt**:
```
Modern Indonesian greenhouse interior, controlled environment agriculture, diverse crops thriving under optimal conditions, automated biofertilizer fertigation system, temperature and humidity controls, professional horticultural photography, bright clean atmosphere, vibrant plant growth, technological precision, 16:9 aspect ratio, advanced agricultural technology
```

---

### 41. Blog ID 101: Pupuk Hayati Bersertifikat Kementan
**Title**: Pupuk Hayati Bersertifikat Kementan: Panduan Memilih Produk Resmi dan Berkualitas

**DALL-E Prompt**:
```
Official Indonesian Ministry of Agriculture certified biofertilizer products, prominent certification seals and registration numbers visible, official product labels, quality assurance symbols, government approval documentation, professional product photography, trustworthy presentation, clean organized display, 16:9 aspect ratio, official certification emphasis
```

---

### 42. Blog ID 102: Cara Menyimpan Pupuk Hayati yang Benar
**Title**: Cara Menyimpan Pupuk Hayati yang Benar: Panduan Lengkap agar Mikroba Tetap Hidup

**DALL-E Prompt**:
```
Proper biofertilizer storage facility, climate-controlled storage room, biofertilizer products on organized shelves, temperature and humidity monitoring equipment, expiry date checking, professional storage management, Indonesian worker maintaining optimal storage conditions, clean organized environment, 16:9 aspect ratio, proper handling and storage procedures
```

---

### 43. Blog ID 103: Efek Samping Pupuk Hayati
**Title**: Efek Samping Pupuk Hayati: Fakta vs Mitos dan Cara Penggunaan yang Aman

**DALL-E Prompt**:
```
Scientific educational composition: healthy plants using biofertilizer correctly vs misuse scenarios, safety equipment, proper application techniques, mythbusting visual elements with checkmarks and X marks, Indonesian agricultural scientist explaining safe usage, professional scientific photography, clean educational layout, 16:9 aspect ratio, safety and education focus
```

---

### 44. Blog ID 104: Pupuk Hayati untuk Tanaman Buah
**Title**: Pupuk Hayati untuk Tanaman Buah: Panduan Lengkap Meningkatkan Kualitas dan Hasil Panen

**DALL-E Prompt**:
```
Indonesian fruit orchard, diverse fruit trees loaded with high-quality fruits (mangoes, citrus, papayas), farmer applying biofertilizer to fruit trees, close-up of perfect ripe fruits, abundant harvest baskets, professional agricultural photography, vibrant fruit colors, natural sunlight, 16:9 aspect ratio, premium fruit production
```

---

### 45. Blog ID 105: Pupuk Hayati untuk Hidroponik
**Title**: Pupuk Hayati untuk Hidroponik: Panduan Lengkap Sistem Tanam Tanpa Tanah

**DALL-E Prompt**:
```
Modern Indonesian hydroponic system, plants growing in nutrient solution with biofertilizer additives, NFT channels or deep water culture setup, high-tech soilless cultivation, roots visible in clear solution, automated dosing system, professional hydroponic photography, clean futuristic aesthetic, bright grow lights, 16:9 aspect ratio, advanced agricultural technology
```

---

## Implementation Workflow

### Step 1: Generate Images
1. Use DALL-E 3, Midjourney, or Stable Diffusion
2. Generate in 16:9 ratio (1920x1080px or 1792x1024px)
3. Use prompts above verbatim for consistency
4. Generate 2-3 variations per prompt
5. Select best quality image

### Step 2: Optimize Images
```bash
# Convert to WebP and optimize
cwebp -q 85 input.jpg -o output.webp

# Or use ImageMagick
convert input.jpg -quality 85 -define webp:lossless=false output.webp
```

### Step 3: Upload to Strapi
1. SSH to VPS: `ssh hostinger`
2. Navigate to uploads: `cd /opt/cbi-strapi/public/uploads`
3. Upload images via SCP or SFTP
4. Update database to link images to blogs

### Step 4: Database Update Query Template
```sql
-- Insert file record
INSERT INTO files (name, alternative_text, caption, width, height, hash, ext, mime, size, url, created_at, updated_at)
VALUES ('blog-image-45.webp', 'Formulasi Pupuk Custom', NULL, 1920, 1080, 'blog_image_45_hash', '.webp', 'image/webp', 150.5, '/uploads/blog-image-45.webp', datetime('now'), datetime('now'));

-- Link file to blog
INSERT INTO files_related_mph (file_id, related_id, related_type, field, "order")
VALUES ((SELECT id FROM files WHERE name = 'blog-image-45.webp'), 45, 'api::blog.blog', 'image', 1);
```

---

## Quick Reference

**Total Blogs Needing Images**: 45
**Content Type**: Maklon (Fertilizer Outsourcing)
**Language**: Indonesian (id)
**All Published**: Yes

**Image Specifications**:
- Primary ratio: 16:9 (1920x1080px)
- Format: WebP or JPEG
- Max size: 300KB
- Min width: 1200px

**Database Location**: `/opt/cbi-strapi/.tmp/data.db`
**Table**: `blogs`
**Link Table**: `files_related_mph`

---

## Notes

- All prompts designed for Indonesian agricultural context
- Emphasizes natural, authentic documentary style
- Avoids overly staged or artificial compositions
- Focuses on vibrant, healthy agricultural scenes
- Includes specific Indonesian farming practices and landscapes
- Professional quality suitable for SEO and social media sharing

**Generated**: January 19, 2026
**Research Source**: VPS Database at 72.62.122.166
