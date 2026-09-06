# Runbook: tautan internal untuk artikel yatim

**Status: DITAHAN.** Jangan jalankan sampai gerbang keputusan di bawah terlewati.
**Dibuat** 6 September 2026 · **Gerbang** sekitar 1 Oktober 2026

---

## Kenapa ini ada

Diukur 6 September 2026 di produksi:

```
total artikel blog      : 1.071
yatim (0 tautan masuk)  : 1.053   (98%)
punya 1 tautan masuk    :    17
punya 2 atau lebih      :     1
```

Halaman paling banyak ditautkan adalah `panduan-lengkap-asam-humat` dengan 44 tautan, dan itu pun baru dipasang tangan pagi ini. Nomor dua punya satu.

Kasus yang memicunya: pillar `panduan-lengkap-asam-humat` terbit 11 Juli 2026, 18.316 karakter, ditulis khusus untuk menguasai istilah `asam humat`. Tanpa satu pun tautan masuk, Google menaruhnya di **posisi 39,8**, sementara halaman dosis yang menjawab niat berbeda memegang 27.836 dari 28.009 impresi di posisi 7,5 dengan CTR 0,27%.

## Kenapa ditahan

**Kita belum tahu tautan internal berhasil.** Hasil 44 tautan pillar baru terlihat sekitar 1 Oktober. Melepas 429 tautan sekarang berarti bertaruh sebelum buktinya keluar.

### Gerbang keputusan

Ukur posisi `panduan-lengkap-asam-humat` untuk query `asam humat`, jendela 88 hari, bandingkan dengan `docs/seo/BASELINE_2026-09-06_PRE_P0_P1.md`.

| Hasil | Tindakan |
|---|---|
| Posisi bergerak naik dari 39,8, katakanlah di bawah 20 | Lepas. Jalankan prosedur di bawah |
| Posisi diam atau memburuk | **Jangan lepas.** Asumsi otoritas-lewat-tautan-internal salah. Kita hemat kesalahan berskala 429 halaman |
| Bergerak sedikit, 30 sampai 39 | Lepas bertahap, mulai dari 50 target berimpresi tertinggi, ukur lagi 4 minggu |

## Apa yang akan diterapkan

```
usulan tautan                     : 429
sumber berbeda yang disentuh      : 228
target diselamatkan               : 429  (dari 1.053 yatim, 41%)
target dibuang, anchor tak cocok  : 184
frasa anchor berbeda              : 270
konsentrasi anchor tertinggi      : 4,7%
outbound maksimum per sumber      : 3
inbound per target                : 1
```

184 target sengaja dibuang karena tidak ada anchor yang cocok apa adanya di prosa sumber. Mesin ini menolak mengarang kalimat demi menyisipkan tautan, dan itu disengaja.

Satu tautan masuk per target itu konservatif. Kalau gerbangnya lolos, pertimbangkan lintasan kedua untuk target yang paling bernilai.

## Sudah diverifikasi (dry run 6 September, di atas salinan)

```
apply                    : OK
JSON RUSAK               : 0 dari 1.071 baris
yatim sebelum            : 1.054
yatim sesudah            :   624
tabel backup terisi      :   228 baris
rollback                 : OK, yatim kembali ke 1.054
produksi                 : tidak tersentuh
```

Catatan: baseline salinan terbaca 1.054, produksi 1.053. Selisihnya karena WAL, lihat bawah. Tidak memengaruhi keabsahan hasil.

## Prosedur melepas

```bash
# 1. Backup WAL-aware. JANGAN pakai cp, lihat catatan WAL di bawah.
ssh cbi-vps 'sqlite3 /opt/cbi-strapi/.tmp/data.db \
  ".backup /opt/cbi-strapi/.tmp/data.db.walsafe-$(date -u +%Y%m%d_%H%M%S)"'

# 2. Terapkan
ssh cbi-vps 'sqlite3 /opt/cbi-strapi/.tmp/data.db < /path/orphan-uplinks-2026-09-apply.sql'

# 3. Segarkan lastmod supaya Google merangkak ulang. published_at TIDAK disentuh.
ssh cbi-vps 'sqlite3 /opt/cbi-strapi/.tmp/data.db < /path/orphan-uplinks-2026-09-bump-updatedat.sql'

# 4. Verifikasi. Angka yatim harus turun dari 1.053 ke sekitar 624.
```

Perubahan terbit sendiri lewat ISR, tapi cache proxy nginx menahan halaman sampai **satu jam**. Lihat `.claude/DEPLOY.md`. Untuk memastikan tanpa menunggu, tambahkan query string unik pada URL, itu kunci cache berbeda sehingga menembus ke origin.

## Rollback

```bash
ssh cbi-vps 'sqlite3 /opt/cbi-strapi/.tmp/data.db < /path/orphan-uplinks-2026-09-ROLLBACK.sql'
```

Memulihkan `content` per baris dari `orphan_uplinks_backup_202609`. Tidak menimpa data lain.

## Catatan WAL, penting

Database ini `journal_mode = wal`. **`cp data.db` bukan salinan utuh** karena transaksi terbaru masih duduk di `data.db-wal` yang terpisah. Itu sebabnya baseline dry run meleset satu halaman.

Backup file penuh yang dibuat 6 September pagi (`data.db.bak-pillar-20260906_071357`) dibuat dengan `cp`, jadi tidak utuh. Rollback sebenarnya bertumpu pada tabel backup per baris, jadi ini bukan masalah, tapi jangan memperlakukan file itu sebagai salinan lengkap.

Yang benar: `sqlite3 data.db ".backup <tujuan>"`. Salinan sehat tersedia di `data.db.walsafe-20260906_121755` (`integrity_check: ok`, yatim 1053 sesuai produksi).

## Yang belum terjawab

Mesin ini menautkan berdasarkan kecocokan anchor dan otoritas sumber. Dia **tidak** menilai apakah target memang layak diselamatkan dari sisi isi. Sebagian dari 1.053 yatim itu kemungkinan permutasi tipis dari run Maret, dan menautkan halaman tipis tidak membuatnya bernilai. Kalau gerbang Oktober lolos, sisir 50 target teratas dengan mata manusia sebelum melepas seluruhnya.
