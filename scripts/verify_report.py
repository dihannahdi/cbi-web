from docx import Document

# Load the generated report
doc = Document('D:/cbi-web/GSC_Report_January_2026_CBI.docx')

# Document statistics
print("="*70)
print("DOCUMENT VERIFICATION REPORT")
print("="*70)
print(f"\nFile: GSC_Report_January_2026_CBI.docx")
print(f"Total Paragraphs: {len(doc.paragraphs)}")
print(f"Total Tables: {len(doc.tables)}")
print(f"Total Sections: {len(doc.sections)}")

# Extract headings
print("\n" + "="*70)
print("DOCUMENT STRUCTURE (Main Headings)")
print("="*70)

heading_count = 0
for para in doc.paragraphs:
    if para.style.name.startswith('Heading'):
        heading_count += 1
        level = para.style.name.replace('Heading ', '')
        indent = "  " * (int(level) - 1) if level.isdigit() else ""
        print(f"{indent}{level}. {para.text[:80]}")
        
print(f"\nTotal Headings: {heading_count}")

# Table statistics
print("\n" + "="*70)
print("TABLE STATISTICS")
print("="*70)

total_rows = 0
total_cols = 0

for idx, table in enumerate(doc.tables, 1):
    rows = len(table.rows)
    cols = len(table.columns)
    total_rows += rows
    total_cols += cols
    print(f"Table {idx}: {rows} rows x {cols} columns")
    
print(f"\nTotal Table Cells: {total_rows * total_cols // len(doc.tables) * len(doc.tables)}")

# Word count estimate
print("\n" + "="*70)
print("CONTENT METRICS")
print("="*70)

word_count = 0
for para in doc.paragraphs:
    word_count += len(para.text.split())
    
print(f"Estimated Word Count: {word_count:,}")
print(f"Estimated Pages (500 words/page): {word_count // 500}")

print("\n" + "="*70)
print("VERIFICATION COMPLETE ✓")
print("="*70)
