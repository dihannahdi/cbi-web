# Baseline sebelum P0 dan P1

**Dicatat** 6 September 2026 · **Sumber** GSC API, properti `sc-domain:centrabiotechindonesia.com`
**Tujuan** Titik banding untuk mengukur apakah P0 (tautan internal ke pillar) dan P1 (perbaikan kontrak judul) berhasil.

Jendela pengukuran yang dipakai di seluruh dokumen ini: **2026-06-08 sampai 2026-09-03** (88 hari), kecuali disebut lain. Ulangi dengan jendela 88 hari yang sama setelah perubahan supaya perbandingannya jujur.

---

## 1. Target utama P0: klaster asam humat

Query `asam humat`, total 28.009 impresi di jendela ini.

| Halaman | Klik | Impresi | CTR | Posisi |
|---|---|---|---|---|
| `/id/blog/dosis-dan-cara-aplikasi-asam-humat` | 76 | 27.836 | 0,27% | 7,5 |
| `/id/blog/panduan-lengkap-asam-humat` (pillar) | 0 | 17 | 0,00% | **39,8** |
| `/id/blog/apa-itu-asam-humat-dan-manfaatnya-untuk-tanaman` | 0 | 76 | 0,00% | 12,1 |
| sisa (~67 halaman) | 0 | ~80 | 0,00% | bervariasi |

**Yang diharapkan berubah setelah P0:** posisi pillar naik dari 39,8. Kalau setelah 4 minggu masih di atas 20, P0 tidak cukup dan asumsi otoritas-lewat-tautan-internal salah.

Pillar sudah peringkat wajar untuk ekor panjang definisi, ini yang jangan sampai turun:

| Query | Klik | Impresi | CTR | Posisi |
|---|---|---|---|---|
| asam humat terbuat dari apa | 5 | 3.076 | 0,16% | 8,9 |
| asam humat adalah | 1 | 126 | 0,79% | 10,4 |
| apa itu asam humat | 1 | 34 | 2,94% | 7,8 |
| bahan baku asam humat | 1 | 65 | 1,54% | 9,2 |
| pupuk asam humat terbuat dari apa | 1 | 64 | 1,56% | 9,2 |

Tautan internal ke pillar sebelum P0: **0** dari 1.071 artikel.

---

## 2. Target utama P1: CTR halaman berimpresi tinggi

Lima belas halaman blog teratas: **~436.000 impresi, 5.797 klik, CTR gabungan 1,33%.**

| Halaman | Klik | Impresi | CTR | Posisi |
|---|---|---|---|---|
| dosis-dan-cara-aplikasi-asam-humat | 1.391 | 125.141 | 1,11% | 5,3 |
| asam-humat-cair-untuk-sawit-dosis-per-pokok | 653 | 22.529 | 2,90% | 3,4 |
| kombinasi-asam-humat-dengan-pupuk-npk | 503 | 42.466 | 1,18% | 3,8 |
| subsidi-pupuk-indonesia-panduan-lengkap-2026 | 481 | 13.270 | 3,62% | 5,0 |
| pupuk-kompos-dari-daun-langkah-demi-langkah | 392 | 34.132 | 1,15% | 6,0 |
| fermentasi-ampas-tahu-untuk-pakan-ternak | 371 | 32.799 | 1,13% | 5,4 |
| dolomit-sebagai-pembenah-tanah | 332 | 62.433 | 0,53% | 6,0 |
| pupuk-organik-cair-dari-air-cucian-beras | 306 | 29.403 | 1,04% | 6,3 |
| pupuk-kandang-ayam-cara-fermentasi-yang-benar | 234 | 20.951 | 1,12% | 4,9 |
| pupuk-organik-cair-untuk-sawit-dosis-per-pokok | 225 | 12.598 | 1,79% | 5,8 |
| pupuk-organik-cair-dari-fermentasi-bonggol-pisang | 213 | 17.130 | 1,24% | 6,0 |
| jenis-jenis-pembenah-tanah-untuk-pertanian-indonesia | 211 | 7.222 | 2,92% | 4,3 |
| standar-sni-pupuk-organik-cair | 173 | 2.588 | 6,68% | 4,3 |
| kredit-pertanian-kur-cara-pengajuan-untuk-petani | 166 | 6.224 | 2,67% | 5,8 |
| komposting-aerobik-vs-anaerobik | 146 | 7.009 | 2,08% | 4,1 |

**Yang diharapkan berubah setelah P1:** CTR naik pada halaman-halaman ini, posisi tidak berubah. Kalau posisi ikut bergerak, penyebabnya bukan P1 dan perbandingannya tercemar.

### Catatan penting: rewrite Juli belum pernah diuji adil

SQL rewrite judul dijalankan `2026-07-11 00:17:36`, 94 baris, dan judulnya memang terbit. Tapi setiap judul yang dihasilkannya dirusak lagi oleh template. Perbandingan dua jendela 33 hari yang sama:

| Halaman | CTR sebelum (8 Jun - 10 Jul) | CTR sesudah (14 Jul - 15 Ags) | Posisi |
|---|---|---|---|
| kombinasi-asam-humat-dengan-npk * | 1,11% | 1,14% | 3,8 -> 4,0 |
| fermentasi-ampas-tahu * | 1,21% | 1,07% | 5,3 -> 5,5 |
| dolomit-sebagai-pembenah-tanah * | 0,63% | 0,48% | 5,8 -> 6,1 |
| pupuk-kompos-dari-daun * | 1,29% | 1,23% | 5,7 -> 6,1 |
| dosis-dan-cara-aplikasi-asam-humat | 1,11% | 1,05% | 5,0 -> 5,5 |

`*` = judul diganti SQL Juli

Hasil nol ini **bukan bukti judul tidak berpengaruh**. Ini tes yang rusak. P1 memperbaiki alat ukurnya, lalu rewrite Juli baru mendapat tes pertamanya yang sah.

---

## 3. Query merek, belum digarap

| Query | Klik | Impresi | CTR | Posisi |
|---|---|---|---|---|
| pt centra biotech indonesia | 87 | 399 | 21,80% | 13,7 |
| centra biotech indonesia | 78 | 345 | 22,61% | 21,5 |
| floraone | 31 | 513 | 6,04% | 10,0 |

CTR sudah tinggi meski posisi buruk. Ini bukan peluang CTR, ini cacat posisi.

---

## 4. Yang sengaja tidak diukur

- **Google Discover**: nol klik dan nol impresi setiap hari sepanjang 1 Juni sampai 3 September. Tidak ada yang bisa dibandingkan.
- **AI Overview**: belum diperiksa. `maklon pupuk` di posisi 1,4 kehilangan 89% klik antara Juli dan Agustus tanpa perubahan posisi. Kalau AI Overview memang mengambil klik di atas hasil organik untuk klaster ini, sebagian selisih CTR di bagian 2 tidak bisa direbut dengan cara apa pun. **Satu pemeriksaan SERP langsung menyelesaikannya, dan itu harus dilakukan sebelum menilai kegagalan P1.**

---

## 5. Cara mengulang pengukuran ini

Gunakan MCP `gsc` terhadap `sc-domain:centrabiotechindonesia.com`, bukan laporan harian di server. Laporan harian `gsc_sheets_monitor.py` menghitung `Total Clicks` hanya dari 74 artikel `articles`, sehingga 1.071 artikel `blogs` tidak masuk. Satu halaman blog saja menghasilkan 1.391 klik, jauh melampaui angka 624 yang dilaporkannya. Selama KPI itu dipakai, perbaikan apa pun tidak akan terlihat.

Jendela pembanding yang disarankan: **2026-10-01 sampai 2026-12-27** (88 hari), memberi jarak sekitar empat minggu setelah perubahan supaya Google sempat merangkak ulang.
