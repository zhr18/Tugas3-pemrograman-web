# 🚀 QUICK START GUIDE

## Cara Cepat Menjalankan Proyek

### Option 1: VS Code Live Server (RECOMMENDED) ⭐

1. **Buka folder `tugas3-vue-ut` di VS Code**
   ```bash
   code .
   ```

2. **Install Extension "Live Server"**
   - Buka Extensions (Ctrl+Shift+X)
   - Cari "Live Server" by Ritwick Dey
   - Install

3. **Run Server**
   - Klik kanan pada `index.html`
   - Pilih "Open with Live Server"
   - Browser otomatis terbuka di `http://127.0.0.1:5500`

---

### Option 2: Python HTTP Server 🐍

```bash
cd tugas3-vue-ut
python3 -m http.server 8000
```

Buka browser: **http://localhost:8000**

---

### Option 3: Node.js HTTP Server 📦

```bash
cd tugas3-vue-ut
npx http-server -p 8000 -o
```

Browser otomatis terbuka di **http://localhost:8000**

---

## 🧪 Testing Cepat

### 1. Test Stock Table (Tab: Stok Bahan Ajar)

**Filter & Sort:**
```
✓ Pilih UPBJJ: Jakarta
✓ Pilih Kategori: MK Wajib
✓ Check "Stok Menipis" → Lihat EKMA4115 (qty 7 < safety 15)
✓ Sort by Harga (click kolom Harga)
✓ Klik Reset Filter
```

**Edit Stok:**
```
✓ Klik Edit pada EKMA4116
✓ Ubah qty menjadi 15 (akan jadi status "Menipis")
✓ Simpan
✓ Cek status badge berubah jadi orange
```

---

### 2. Test DO Tracking (Tab: Tracking DO)

**Search DO:**
```
✓ Input: DO2025-0001
✓ Klik Cari
✓ Lihat detail: Rina Wulandari, status "Dalam Perjalanan"
✓ Cek progress bar 50%
✓ Lihat timeline penerimaan
```

**Search Invalid:**
```
✓ Input: DO2025-9999
✓ Klik Cari
✓ Lihat error message: "DO tidak ditemukan"
```

---

### 3. Test Order Form (Tab: Form Pemesanan)

**Buat Pesanan Baru:**
```
✓ Cek Nomor DO auto-generate: DO2025-0003
✓ Input NIM: 987654321 (9 digit)
✓ Input Nama: Budi Santoso
✓ Pilih Ekspedisi: REG - Reguler
✓ Pilih Paket: PAKET-UT-001 (IPS Dasar)
✓ Lihat preview paket & total Rp 120.000
✓ Tanggal Kirim: (default hari ini)
✓ Klik "Simpan Pesanan"
✓ Lihat success message
✓ Form ter-reset otomatis
```

**Test Validasi:**
```
✗ NIM kosong → Error: "NIM harus diisi"
✗ NIM: 12345 → Error: "NIM harus 9 digit angka"
✗ Nama: "AB" → Error: "Nama minimal 3 karakter"
✗ Ekspedisi kosong → Error: "Ekspedisi harus dipilih"
✗ Paket kosong → Error: "Paket harus dipilih"
```

---

## 🐛 Troubleshooting

### ❌ Error: "Failed to fetch"
**Problem**: Membuka file langsung dengan `file://`  
**Solution**: Gunakan server lokal (Live Server, Python, atau Node.js)

### ❌ Template tidak muncul
**Problem**: Template gagal di-load  
**Solution**: 
1. Buka Console Browser (F12)
2. Cek error di console
3. Pastikan file template ada di folder `templates/`
4. Refresh browser (Ctrl+R atau Cmd+R)

### ❌ Data tidak tampil
**Problem**: JSON gagal di-load  
**Solution**: 
1. Cek file `data/dataBahanAjar_tgs3.json` ada
2. Cek format JSON valid (bisa test di jsonlint.com)
3. Buka Console Browser → lihat error di Network tab

### ❌ Component tidak registered
**Problem**: Urutan load script salah  
**Solution**: Pastikan urutan di `index.html`:
```html
1. template-loader.js
2. api.js
3. status-badge.js
4. app-modal.js
5. stock-table.js
6. do-tracking.js
7. order-form.js
8. app.js (terakhir!)
```

---

## 📊 Expected Results

### Stok Bahan Ajar
- Total data: **4 items**
- Jakarta: 2 items (EKMA4116, EKMA4115)
- Surabaya: 1 item (BIOL4201)
- Makassar: 1 item (FISIP4001)
- Stok Menipis: 2 items (EKMA4115 qty=7, FISIP4001 qty=2)
- Stok Kosong: 0 items

### Tracking DO
- Total DO: **2 items**
- DO2025-0001: Rina Wulandari (Dalam Perjalanan, 1 event)
- DO2025-0002: Budi Santoso (Terkirim, 3 events)

### Form Pemesanan
- Auto-generate: DO2025-0003 (increment from last DO)
- Paket available: 2 (IPS Dasar Rp 120.000, IPA Dasar Rp 140.000)
- Ekspedisi: 2 (Reguler, Ekspres)

---

## 🎯 Features Checklist

### Vue Features
- [x] v-if / v-else-if / v-else
- [x] v-show
- [x] v-for (dengan :key)
- [x] v-bind / :
- [x] v-model
- [x] v-on / @
- [x] v-html
- [x] Props
- [x] Computed properties
- [x] Methods
- [x] Watchers
- [x] Filters (currency, qty)
- [x] Custom events ($emit)
- [x] Slots
- [x] Lifecycle hooks (mounted, beforeDestroy)

### Functional Features
- [x] Filter by UPBJJ
- [x] Filter by Kategori (dependent)
- [x] Filter stok kritis
- [x] Filter stok kosong
- [x] Sort (judul, qty, harga)
- [x] Edit stok dengan modal
- [x] Validasi form edit
- [x] Status badge (Aman/Menipis/Kosong)
- [x] Tooltip catatan HTML
- [x] Format currency (Rp)
- [x] Format satuan (buah)
- [x] Search DO
- [x] Progress bar pengiriman
- [x] Timeline perjalanan
- [x] Auto-generate nomor DO
- [x] Validasi form order (NIM 9 digit, nama min 3 char)
- [x] Auto-calculate total
- [x] Preview paket
- [x] Success message

---

## 📝 Notes

- **Data bersifat simulasi**: Edit/tambah data hanya tersimpan di memory
- **Refresh page**: Data kembali ke state awal dari JSON
- **Production ready**: Untuk production, integrate dengan backend API

---

## 🎓 Learning Points

1. **Component-based Architecture**: Setiap fitur adalah component terpisah
2. **Reactive Data**: Data berubah → UI update otomatis
3. **Computed Properties**: Efficient untuk filter & sort
4. **Watchers**: React to specific data changes
5. **Service Layer**: Separation of concerns (API logic terpisah)
6. **External Templates**: HTML templates di file terpisah
7. **Props & Events**: Parent-child communication

---

**Happy Testing! 🚀**

Jika ada bug atau error, cek console browser (F12) untuk detail error message.
