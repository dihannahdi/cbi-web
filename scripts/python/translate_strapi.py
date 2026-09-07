#!/usr/bin/env python3
"""
Strapi i18n Content Translation Script
Properly creates English translations by duplicating and translating Indonesian components
"""

import sqlite3
import sys
from typing import Dict, List, Tuple

# Translation dictionary - Indonesian to English
TRANSLATIONS = {
    # Dashboard Headlines
    'PT Centra Biotech Indonesia - Perusahaan Bioteknologi di Indonesia untuk Pertanian, Peternakan & Perikanan': 
        'PT Centra Biotech Indonesia - Biotechnology Company in Indonesia for Agriculture, Livestock & Fisheries',
    'PT Centra Biotech Indonesia: Solusi Bioteknologi Terintegrasi untuk Pertanian, Peternakan & Perikanan':
        'PT Centra Biotech Indonesia: Integrated Biotechnology Solutions for Agriculture, Livestock & Fisheries',
    'Temukan bagaimana solusi bioteknologi kami dapat mengatasi permasalahan global di industri pertanian, peternakan, dan perikanan.':
        'Discover how our biotechnology solutions can address global challenges in agriculture, livestock, and fisheries industries.',
    'Temukan bagaimana solusi bioteknologi kami dapat mengatasi permasalahan global di industri pertanian, peternakan, dan perikanan':
        'Discover how our biotechnology solutions can address global challenges in agriculture, livestock, and fisheries',
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
    
    # About Us
    'Tentang Kami': 'About Us',
    
    # Vision & Mission
    'Visi & Misi Kami': 'Our Vision & Mission',
    'Mensejahterakan Petani dan Peternak dengan Produk yang Ramah Lingkungan dan Berkelanjutan':
        'Prospering Farmers and Breeders with Environmentally Friendly and Sustainable Products',
    
    # Corporate Values
    'Corporate Value': 'Corporate Value',
    
    # Our Impact
    'Dampak Kami': 'Our Impact',
    'Produk kami telah digunakan oleh ribuan petani dan peternak di seluruh Indonesia dengan hasil yang terbukti meningkatkan produktivitas.':
        'Our products have been used by thousands of farmers and breeders throughout Indonesia with proven results in increasing productivity.',
    
    # Why Sections
    'Mengapa Bioteknologi?': 'Why Biotechnology?',
    'Sektor agribisnis berada di persimpangan kritis. Penurunan kualitas lahan, dampak bahan kimia, dan ancaman krisis ekosistem memaksa kita untuk mencari solusi baru yang tidak hanya efektif, tetapi juga berkelanjutan. Di tengah tantangan ini, bioteknologi muncul sebagai terobosan yang menjanjikan transformasi menyeluruh.\n\nMelalui pendekatan ilmiah berbasis mikroba alami, bioteknologi memberikan cara baru untuk meningkatkan produktivitas sekaligus memperbaiki keseimbangan alam. Ini bukan sekadar inovasi—ini adalah langkah visioner untuk memastikan pertanian, peternakan, dan perikanan tidak hanya bertahan, tetapi juga berkembang dengan cara yang lebih cerdas, efisien, dan selaras dengan masa depan bumi':
        'The agribusiness sector is at a critical crossroads. Declining land quality, chemical impacts, and ecosystem crisis threats force us to seek new solutions that are not only effective but also sustainable. Amidst these challenges, biotechnology emerges as a breakthrough promising comprehensive transformation.\n\nThrough scientific approaches based on natural microbes, biotechnology provides new ways to increase productivity while restoring natural balance. This is not just innovation—it is a visionary step to ensure agriculture, livestock, and fisheries not only survive but thrive in smarter, more efficient ways aligned with Earth\'s future',
    'Penurunan kualitas lahan, dampak bahan kimia sintetis, dan ancaman krisis ekosistem memaksa industri agribisnis mencari solusi berkelanjutan. Bioteknologi hadir sebagai terobosan dengan memanfaatkan kekuatan mikroba alami untuk meningkatkan produktivitas tanpa merusak lingkungan. Pendekatan ini memungkinkan hasil panen optimal, ternak lebih sehat, dan budidaya perikanan yang efisien—semuanya dengan jejak karbon yang lebih rendah.':
        'Declining land quality, synthetic chemical impacts, and ecosystem crisis threats force the agribusiness industry to seek sustainable solutions. Biotechnology emerges as a breakthrough by harnessing the power of natural microbes to increase productivity without harming the environment. This approach enables optimal harvest yields, healthier livestock, and efficient aquaculture—all with a lower carbon footprint.',
    'Mengapa Kami?': 'Why Us?',
    'PT Centra Biotech Indonesia merupakan salah satu perusahaan bioteknologi terkemuka di Indonesia. Banyak inovasi produk bioteknologi yang kami hasilkan dari riset kami yang menjadi pionir dan terbukti dapat membantu industri pertanian, peternakan, dan perikanan untuk meningkatkan hasil produktivitasnya.\n\nKami berkomitmen untuk terus memberdayakan masa depan Indonesia melalui inovasi produk-produk bioteknologi berkualitas tinggi. Dibekali dengan pengalaman selama kurang lebih 14 tahun, produk bersertifikat, dan didukung oleh sumber daya profesional, kami terus berusaha menyediakan produk-produk bioteknologi yang terbaik.':
        'PT Centra Biotech Indonesia is one of the leading biotechnology companies in Indonesia. Many biotechnology product innovations that we produce from our research have become pioneers and proven to help the agriculture, livestock, and fisheries industries increase their productivity.\n\nWe are committed to continue empowering Indonesia\'s future through high-quality biotechnology product innovations. Equipped with approximately 14 years of experience, certified products, and supported by professional resources, we continue to strive to provide the best biotechnology products.',
    
    # Banner CTA
    'Dapatkan solusi Bioteknologi  sesuai kebutuhan Anda':
        'Get Biotechnology Solutions According to Your Needs',
    'Dapatkan  solusi Bioteknologi  sesuai kebutuhan Anda':
        'Get Biotechnology Solutions According to Your Needs',
    'Siap Tingkatkan Produktivitas Anda  dengan Produk Bioteknologi kami?':
        'Ready to Increase Your Productivity with Our Biotechnology Products?',
    'Siap Tingkatkan Hasil Panen Anda dengan Produk Bioteknologi kami?':
        'Ready to Increase Your Harvest with Our Biotechnology Products?',
    'Siap Tingkatkan Hasil Panen Anda  dengan Produk Bioteknologi kami?':
        'Ready to Increase Your Harvest with Our Biotechnology Products?',
    'Siap Tingkatkan Kualitas Anda dengan Produk Bioteknologi Kami?':
        'Ready to Improve Your Quality with Our Biotechnology Products?',
    'Siap Tingkatkan Kualitas Anda dengan Produk Bioteknologi kami?':
        'Ready to Improve Your Quality with Our Biotechnology Products?',
    'Siap Tingkatkan Kualitas Ternak dengan Produk Bioteknologi kami?':
        'Ready to Improve Livestock Quality with Our Biotechnology Products?',
    'Siap Tingkatkan Kualitas Hasil Tambak dengan Produk Bioteknologi ?':
        'Ready to Improve Aquaculture Quality with Biotechnology Products?',
    'Meniti Karir Bersama Kami': 'Build Your Career with Us',
    'PT Centra Biotech Indonesia berkomitmen membangun Indonesia melalui inovasi bioteknologi. Bergabung dengan tim profesional dan andal, bersama memberi dampak positif untuk masa depan.':
        'PT Centra Biotech Indonesia is committed to building Indonesia through biotechnology innovation. Join a professional and reliable team, together making a positive impact for the future.',
}

# Long description translation
LONG_DESCRIPTION_ID = """PT Centra Biotech Indonesia merupakan perusahaan nasional yang memproduksi dan memasarkan produk-produk bioteknologi ramah lingkungan dengan basis mikroba khusus sebagai komposisi utama. Kami menyediakan produk bioteknologi pada bidang pertanian yang mencakup berbagai macam produk spesifik untuk menunjang kesehatan dan produktivitas tanaman.

Perusahaan Centra Biotech Indonesia telah berdiri sejak tanggal 10 Februari 2010 dan mendapatkan pengesahan dari Menteri Kehakiman dan Hak Asasi Manusia Republik Indonesia dengan nomor : AHU-20782.AH.01.01.Tahun 2010

Centra Biotech Indonesia dengan tenaga–tenaga ahli di bidang mikrobiologi selalu berkreasi dan berinovasi untuk menghadirkan produk-produk dengan bahan-bahan alami pilihan agar dan terbaik untuk memberikan produk yang berkualitas, dan bermanfaat bagi petani."""

LONG_DESCRIPTION_EN = """PT Centra Biotech Indonesia is a national company that produces and markets environmentally friendly biotechnology products with special microbes as the main composition. We provide biotechnology products in agriculture that include various specific products to support plant health and productivity.

Centra Biotech Indonesia has been established since February 10, 2010 and received approval from the Minister of Law and Human Rights of the Republic of Indonesia with number: AHU-20782.AH.01.01.Year 2010

Centra Biotech Indonesia with expert personnel in microbiology always creates and innovates to present products with selected natural ingredients that are the best to provide quality products that are beneficial for farmers."""

def translate_text(text: str) -> str:
    """Translate Indonesian text to English"""
    if not text:
        return text
    
    # Check for long description
    if LONG_DESCRIPTION_ID in text:
        return text.replace(LONG_DESCRIPTION_ID, LONG_DESCRIPTION_EN)
    
    # Check translations dictionary
    if text in TRANSLATIONS:
        return TRANSLATIONS[text]
    
    # Return original if no translation found
    return text

def get_indonesian_component_ids(cursor: sqlite3.Cursor, content_type: str) -> List[int]:
    """Get all component IDs used by Indonesian locale entries"""
    query = f"""
    SELECT DISTINCT cmp_id 
    FROM {content_type}_cmps 
    WHERE entity_id IN (
        SELECT id FROM {content_type} WHERE locale='id'
    )
    """
    cursor.execute(query)
    return [row[0] for row in cursor.fetchall()]

def duplicate_and_translate_headlines(conn: sqlite3.Cursor) -> Dict[int, int]:
    """Duplicate dashboard headlines with English translations"""
    cursor = conn.cursor()
    
    print("📋 Processing dashboard headlines...")
    
    # Get Indonesian component IDs
    id_ids = get_indonesian_component_ids(cursor, 'dashboards')
    
    if not id_ids:
        print("  ⚠️ No Indonesian dashboard headlines found")
        return {}
    
    # Get existing components
    placeholders = ','.join('?' * len(id_ids))
    cursor.execute(f"""
        SELECT id, title, description, cta_text 
        FROM components_dashboard_headlines 
        WHERE id IN ({placeholders})
    """, id_ids)
    
    id_mapping = {}
    
    for row in cursor.fetchall():
        old_id, title, description, cta_text = row
        
        # Translate
        new_title = translate_text(title)
        new_description = translate_text(description) if description else None
        new_cta_text = translate_text(cta_text) if cta_text else None
        
        # Check if English version already exists
        cursor.execute("""
            SELECT id FROM components_dashboard_headlines 
            WHERE title = ? AND (description = ? OR (description IS NULL AND ? IS NULL))
        """, (new_title, new_description, new_description))
        
        existing = cursor.fetchone()
        if existing:
            new_id = existing[0]
            print(f"  ✓ Using existing English component {new_id} for Indonesian {old_id}")
        else:
            # Insert new English component
            cursor.execute("""
                INSERT INTO components_dashboard_headlines (title, description, cta_text)
                VALUES (?, ?, ?)
            """, (new_title, new_description, new_cta_text))
            
            new_id = cursor.lastrowid
            print(f"  ✅ Created new English component {new_id} for Indonesian {old_id}")
            print(f"      ID: {title[:50]}... → EN: {new_title[:50]}...")
        
        id_mapping[old_id] = new_id
    
    conn.commit()
    return id_mapping

def duplicate_and_translate_tentang_kami(conn: sqlite3.Connection) -> Dict[int, int]:
    """Duplicate tentang kami (about us) with English translations"""
    cursor = conn.cursor()
    
    print("\n📋 Processing about us (tentang kami)...")
    
    # Get Indonesian component IDs
    cursor.execute("""
        SELECT DISTINCT cmp_id 
        FROM about_uses_cmps 
        WHERE field = 'aboutUs' AND entity_id IN (
            SELECT id FROM about_uses WHERE locale='id'
        )
    """)
    
    id_ids = [row[0] for row in cursor.fetchall()]
    
    if not id_ids:
        print("  ⚠️ No Indonesian tentang kami found")
        return {}
    
    # Get existing components
    placeholders = ','.join('?' * len(id_ids))
    cursor.execute(f"""
        SELECT id, title, description 
        FROM components_about_us_tentang_kamis 
        WHERE id IN ({placeholders})
    """, id_ids)
    
    id_mapping = {}
    
    for row in cursor.fetchall():
        old_id, title, description = row
        
        # Translate
        new_title = translate_text(title)
        new_description = translate_text(description) if description else None
        
        # Check if English version already exists
        cursor.execute("""
            SELECT id FROM components_about_us_tentang_kamis 
            WHERE title = ?
        """, (new_title,))
        
        existing = cursor.fetchone()
        if existing:
            new_id = existing[0]
            print(f"  ✓ Using existing English component {new_id} for Indonesian {old_id}")
        else:
            # Insert new English component
            cursor.execute("""
                INSERT INTO components_about_us_tentang_kamis (title, description)
                VALUES (?, ?)
            """, (new_title, new_description))
            
            new_id = cursor.lastrowid
            print(f"  ✅ Created new English component {new_id} for Indonesian {old_id}")
        
        id_mapping[old_id] = new_id
    
    conn.commit()
    return id_mapping

def duplicate_and_translate_visi_misi(conn: sqlite3.Connection) -> Dict[int, int]:
    """Duplicate vision/mission with English translations"""
    cursor = conn.cursor()
    
    print("\n📋 Processing vision & mission...")
    
    cursor.execute("""
        SELECT DISTINCT cmp_id 
        FROM about_uses_cmps 
        WHERE field = 'visionMission' AND entity_id IN (
            SELECT id FROM about_uses WHERE locale='id'
        )
    """)
    
    id_ids = [row[0] for row in cursor.fetchall()]
    if not id_ids:
        return {}
    
    placeholders = ','.join('?' * len(id_ids))
    cursor.execute(f"""
        SELECT id, title, description 
        FROM components_about_us_visi_misis 
        WHERE id IN ({placeholders})
    """, id_ids)
    
    id_mapping = {}
    for row in cursor.fetchall():
        old_id, title, description = row
        new_title = translate_text(title)
        new_description = translate_text(description) if description else None
        
        cursor.execute("""
            SELECT id FROM components_about_us_visi_misis 
            WHERE title = ?
        """, (new_title,))
        
        existing = cursor.fetchone()
        if existing:
            new_id = existing[0]
            print(f"  ✓ Using existing English component {new_id}")
        else:
            cursor.execute("""
                INSERT INTO components_about_us_visi_misis (title, description)
                VALUES (?, ?)
            """, (new_title, new_description))
            new_id = cursor.lastrowid
            print(f"  ✅ Created new component {new_id}: {title[:40]}...")
        
        id_mapping[old_id] = new_id
    
    conn.commit()
    return id_mapping

def duplicate_and_translate_corporate_values(conn: sqlite3.Connection) -> Dict[int, int]:
    """Duplicate corporate values with English translations"""
    cursor = conn.cursor()
    
    print("\n📋 Processing corporate values...")
    
    cursor.execute("""
        SELECT DISTINCT cmp_id 
        FROM about_uses_cmps 
        WHERE field = 'corporateValue' AND entity_id IN (
            SELECT id FROM about_uses WHERE locale='id'
        )
    """)
    
    id_ids = [row[0] for row in cursor.fetchall()]
    if not id_ids:
        return {}
    
    placeholders = ','.join('?' * len(id_ids))
    cursor.execute(f"""
        SELECT id, title 
        FROM components_about_us_corporate_values 
        WHERE id IN ({placeholders})
    """, id_ids)
    
    id_mapping = {}
    for row in cursor.fetchall():
        old_id, title = row
        new_title = translate_text(title)
        
        cursor.execute("""
            SELECT id FROM components_about_us_corporate_values 
            WHERE title = ?
        """, (new_title,))
        
        existing = cursor.fetchone()
        if existing:
            new_id = existing[0]
            print(f"  ✓ Using existing English component {new_id}")
        else:
            cursor.execute("""
                INSERT INTO components_about_us_corporate_values (title)
                VALUES (?)
            """, (new_title,))
            new_id = cursor.lastrowid
            print(f"  ✅ Created new component {new_id}: {title}")
        
        id_mapping[old_id] = new_id
    
    conn.commit()
    return id_mapping

def duplicate_and_translate_banner_cta(conn: sqlite3.Connection) -> Dict[int, int]:
    """Duplicate banner CTA with English translations"""
    cursor = conn.cursor()
    
    print("\n📋 Processing banner CTA...")
    
    # Get IDs from both dashboards and about_uses
    cursor.execute("""
        SELECT DISTINCT cmp_id FROM dashboards_cmps 
        WHERE field = 'bannerCTA' AND entity_id IN (
            SELECT id FROM dashboards WHERE locale='id'
        )
        UNION
        SELECT DISTINCT cmp_id FROM about_uses_cmps 
        WHERE field = 'bannerCTA' AND entity_id IN (
            SELECT id FROM about_uses WHERE locale='id'
        )
    """)
    
    id_ids = [row[0] for row in cursor.fetchall()]
    if not id_ids:
        return {}
    
    placeholders = ','.join('?' * len(id_ids))
    cursor.execute(f"""
        SELECT id, title, cta_text, description 
        FROM components_dashboard_banner_kontaks 
        WHERE id IN ({placeholders})
    """, id_ids)
    
    id_mapping = {}
    for row in cursor.fetchall():
        old_id, title, cta_text, description = row
        new_title = translate_text(title)
        new_cta = translate_text(cta_text) if cta_text else None
        new_desc = translate_text(description) if description else None
        
        cursor.execute("""
            SELECT id FROM components_dashboard_banner_kontaks 
            WHERE title = ? AND cta_text = ?
        """, (new_title, new_cta))
        
        existing = cursor.fetchone()
        if existing:
            new_id = existing[0]
            print(f"  ✓ Using existing English component {new_id}")
        else:
            cursor.execute("""
                INSERT INTO components_dashboard_banner_kontaks (title, cta_text, description)
                VALUES (?, ?, ?)
            """, (new_title, new_cta, new_desc))
            new_id = cursor.lastrowid
            print(f"  ✅ Created new component {new_id}: {title[:40]}...")
        
        id_mapping[old_id] = new_id
    
    conn.commit()
    return id_mapping

def duplicate_and_translate_our_impact(conn: sqlite3.Connection) -> Dict[int, int]:
    """Duplicate our impact with English translations"""
    cursor = conn.cursor()
    
    print("\n📋 Processing our impact...")
    
    cursor.execute("""
        SELECT DISTINCT cmp_id 
        FROM dashboards_cmps 
        WHERE field = 'ourImpact' AND entity_id IN (
            SELECT id FROM dashboards WHERE locale='id'
        )
    """)
    
    id_ids = [row[0] for row in cursor.fetchall()]
    if not id_ids:
        return {}
    
    placeholders = ','.join('?' * len(id_ids))
    cursor.execute(f"""
        SELECT id, title, description 
        FROM components_dashboard_dampak_kamis 
        WHERE id IN ({placeholders})
    """, id_ids)
    
    id_mapping = {}
    for row in cursor.fetchall():
        old_id, title, description = row
        new_title = translate_text(title)
        new_description = translate_text(description) if description else None
        
        cursor.execute("""
            SELECT id FROM components_dashboard_dampak_kamis 
            WHERE title = ?
        """, (new_title,))
        
        existing = cursor.fetchone()
        if existing:
            new_id = existing[0]
            print(f"  ✓ Using existing English component {new_id}")
        else:
            cursor.execute("""
                INSERT INTO components_dashboard_dampak_kamis (title, description)
                VALUES (?, ?)
            """, (new_title, new_description))
            new_id = cursor.lastrowid
            print(f"  ✅ Created new component {new_id}: {title}")
        
        id_mapping[old_id] = new_id
    
    conn.commit()
    return id_mapping

def duplicate_and_translate_why_sections(conn: sqlite3.Connection) -> Dict[int, int]:
    """Duplicate why sections with English translations"""
    cursor = conn.cursor()
    
    print("\n📋 Processing why sections...")
    
    cursor.execute("""
        SELECT DISTINCT cmp_id 
        FROM dashboards_cmps 
        WHERE field = 'whySection' AND entity_id IN (
            SELECT id FROM dashboards WHERE locale='id'
        )
    """)
    
    id_ids = [row[0] for row in cursor.fetchall()]
    if not id_ids:
        return {}
    
    placeholders = ','.join('?' * len(id_ids))
    cursor.execute(f"""
        SELECT id, title, description 
        FROM components_dashboard_why_sections 
        WHERE id IN ({placeholders})
    """, id_ids)
    
    id_mapping = {}
    for row in cursor.fetchall():
        old_id, title, description = row
        new_title = translate_text(title)
        new_description = translate_text(description) if description else None
        
        cursor.execute("""
            SELECT id FROM components_dashboard_why_sections 
            WHERE title = ?
        """, (new_title,))
        
        existing = cursor.fetchone()
        if existing:
            new_id = existing[0]
            print(f"  ✓ Using existing English component {new_id}")
        else:
            cursor.execute("""
                INSERT INTO components_dashboard_why_sections (title, description)
                VALUES (?, ?)
            """, (new_title, new_description))
            new_id = cursor.lastrowid
            print(f"  ✅ Created new component {new_id}: {title[:40]}...")
        
        id_mapping[old_id] = new_id
    
    conn.commit()
    return id_mapping

def update_component_references(conn: sqlite3.Connection, content_type: str, 
                                field: str, id_mapping: Dict[int, int]):
    """Update _cmps table to use new English component IDs"""
    cursor = conn.cursor()
    
    print(f"\n🔄 Updating {content_type}_cmps references for field '{field}'...")
    
    # Get English locale entity IDs
    cursor.execute(f"SELECT id FROM {content_type} WHERE locale='en'")
    en_entity_ids = [row[0] for row in cursor.fetchall()]
    
    if not en_entity_ids:
        print(f"  ⚠️ No English {content_type} entries found")
        return
    
    updated_count = 0
    for entity_id in en_entity_ids:
        cursor.execute(f"""
            SELECT cmp_id FROM {content_type}_cmps 
            WHERE entity_id = ? AND field = ?
        """, (entity_id, field))
        
        for row in cursor.fetchall():
            old_cmp_id = row[0]
            if old_cmp_id in id_mapping:
                new_cmp_id = id_mapping[old_cmp_id]
                
                cursor.execute(f"""
                    UPDATE {content_type}_cmps 
                    SET cmp_id = ? 
                    WHERE entity_id = ? AND field = ? AND cmp_id = ?
                """, (new_cmp_id, entity_id, field, old_cmp_id))
                
                updated_count += cursor.rowcount
                print(f"  ✅ Updated entity {entity_id}: {old_cmp_id} → {new_cmp_id}")
    
    conn.commit()
    print(f"  📊 Total updates: {updated_count}")

def main():
    db_path = '/opt/cbi-strapi/.tmp/data.db'
    
    print("🚀 Starting Comprehensive Strapi Content Translation")
    print(f"📂 Database: {db_path}\n")
    
    try:
        conn = sqlite3.connect(db_path)
        
        # Process dashboard headlines
        headline_mapping = duplicate_and_translate_headlines(conn)
        if headline_mapping:
            update_component_references(conn, 'dashboards', 'headline', headline_mapping)
        
        # Process about us
        about_mapping = duplicate_and_translate_tentang_kami(conn)
        if about_mapping:
            update_component_references(conn, 'about_uses', 'aboutUs', about_mapping)
        
        # Process vision & mission
        visi_misi_mapping = duplicate_and_translate_visi_misi(conn)
        if visi_misi_mapping:
            update_component_references(conn, 'about_uses', 'visionMission', visi_misi_mapping)
        
        # Process corporate values
        corp_values_mapping = duplicate_and_translate_corporate_values(conn)
        if corp_values_mapping:
            update_component_references(conn, 'about_uses', 'corporateValue', corp_values_mapping)
        
        # Process banner CTA
        banner_mapping = duplicate_and_translate_banner_cta(conn)
        if banner_mapping:
            update_component_references(conn, 'dashboards', 'bannerCTA', banner_mapping)
            update_component_references(conn, 'about_uses', 'bannerCTA', banner_mapping)
        
        # Process our impact
        impact_mapping = duplicate_and_translate_our_impact(conn)
        if impact_mapping:
            update_component_references(conn, 'dashboards', 'ourImpact', impact_mapping)
        
        # Process why sections
        why_mapping = duplicate_and_translate_why_sections(conn)
        if why_mapping:
            update_component_references(conn, 'dashboards', 'whySection', why_mapping)
        
        print("\n" + "="*60)
        print("✨ Complete Translation Finished Successfully!")
        print("="*60)
        print("\n📊 Summary:")
        print(f"  ✅ Dashboard headlines: {len(headline_mapping)} components")
        print(f"  ✅ About Us: {len(about_mapping)} components")
        print(f"  ✅ Vision & Mission: {len(visi_misi_mapping)} components")
        print(f"  ✅ Corporate Values: {len(corp_values_mapping)} components")
        print(f"  ✅ Banner CTA: {len(banner_mapping)} components")
        print(f"  ✅ Our Impact: {len(impact_mapping)} components")
        print(f"  ✅ Why Sections: {len(why_mapping)} components")
        print(f"\n  📈 Total: {len(headline_mapping) + len(about_mapping) + len(visi_misi_mapping) + len(corp_values_mapping) + len(banner_mapping) + len(impact_mapping) + len(why_mapping)} components translated")
        print("\n🔄 Next step: Restart Strapi with 'pm2 restart cbi-strapi-dev'")
        
        conn.close()
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
