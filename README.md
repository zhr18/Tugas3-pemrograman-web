# SITTA - Sistem Informasi Tiras & Transaksi Bahan Ajar UT

Tugas Praktik 3 - STSI4209 (Pemrograman Berbasis Web)  
**Universitas Terbuka**

---

## 📋 Deskripsi Proyek

SITTA adalah aplikasi web berbasis Vue.js untuk mengelola stok bahan ajar dan tracking pengiriman Delivery Order (DO) di Universitas Terbuka. Aplikasi ini menggunakan arsitektur component-based dengan data JSON sebagai sumber data.

---

## 🗂️ Struktur Proyek

```
tugas3-vue-ut/
├─ index.html                # Root HTML dengan Vue app mount point
├─ /assets/
│   ├─ css/
│   │   └─ style.css         # Stylesheet global
│   └─ img/                  # Logo/ikon (opsional)
├─ /data/
│   └─ dataBahanAjar_tgs3.json   # Data JSON (SUMBER DATA RESMI)
├─ /js/
│   ├─ app.js                # Vue root instance & tab state
│   ├─ template-loader.js    # Utility untuk load template HTML
│   ├─ components/
│   │   ├─ stock-table.js    # Component stok bahan ajar
│   │   ├─ do-tracking.js    # Component tracking DO
│   │   ├─ order-form.js     # Component form pemesanan
│   │   ├─ status-badge.js   # Component badge status stok
│   │   └─ app-modal.js      # Component modal dialog
│   ├─ services/
│   │   └─ api.js            # Service layer untuk fetch data JSON
└─ /templates/
    ├─ stock-table.html      # Template HTML untuk stock-table
    ├─ do-tracking.html      # Template HTML untuk do-tracking
    └─ order-form.html       # Template HTML untuk order-form
```

---

## 🎯 Fitur Utama

### 1. 📦 Stok Bahan Ajar (`ba-stock-table`)
- **Tampilan tabel** dengan kolom: kode, judul, kategori, upbjj, lokasi rak, harga, qty, safety, status
- **Filter**:
  - By UT-Daerah (UPBJJ)
  - By Kategori (dependent - muncul setelah pilih UPBJJ)
  - Stok Menipis (qty < safety)
  - Stok Kosong (qty = 0)
- **Sort** by judul, qty, harga (asc/desc)
- **Edit stok** via modal dialog
- **Status badge**:
  - 🟢 Aman (qty ≥ safety)
  - 🟠 Menipis (0 < qty < safety)
  - 🔴 Kosong (qty = 0)
- **Tooltip catatan** saat hover status (menampilkan catatanHTML)
- **Format currency**: Rp 120.000
- **Format satuan**: 28 buah
- **Tombol Reset** untuk clear semua filter

### 2. 🚚 Tracking DO (`do-tracking`)
- **Search DO** berdasarkan nomor
- **Detail DO**: NIM, Nama, Status, Ekspedisi, Tanggal Kirim, Paket, Total
- **Progress bar** pengiriman berdasarkan status
- **Timeline perjalanan** dengan marker visual
- **Error handling** jika DO tidak ditemukan

### 3. ➕ Form Pemesanan (`order-form`)
- **Auto-generate** nomor DO (format: DOYYYY-XXXX)
- **Input fields**: NIM, Nama, Ekspedisi, Paket, Tanggal Kirim
- **Auto-calculate** total harga dari paket
- **Validasi**:
  - NIM: 9 digit angka
  - Nama: minimal 3 karakter
  - Semua field required
- **Preview paket** yang dipilih dengan isi & harga
- **Success message** setelah submit

---

## 🔧 Teknologi yang Digunakan

- **Vue.js 2.7.14** (CDN)
- **Vanilla JavaScript** (ES6+)
- **HTML5 & CSS3**
- **Fetch API** untuk load data JSON
- **Component-based Architecture**

---

## 📚 Vue Features yang Diimplementasikan

### Directives
- ✅ `v-if` / `v-else-if` / `v-else` - Conditional rendering
- ✅ `v-show` - Toggle visibility
- ✅ `v-for` - List rendering dengan `:key`
- ✅ `v-bind` / `:` - Attribute binding
- ✅ `v-model` - Two-way data binding
- ✅ `v-on` / `@` - Event handling
- ✅ `v-html` - Render HTML content

### Component Features
- ✅ **Props** - Data passing dari parent ke child
- ✅ **Computed Properties** - Reactive calculated values
- ✅ **Methods** - Event handlers & logic
- ✅ **Watchers** - React to data changes
- ✅ **Filters** - Format data (currency, qty)
- ✅ **Custom Events** - `$emit` untuk child-to-parent communication
- ✅ **Slots** - Flexible content distribution

### Advanced Features
- ✅ **Component Registration** - Global components
- ✅ **Template References** - External HTML templates
- ✅ **Lifecycle Hooks** - `mounted()`, `beforeDestroy()`
- ✅ **Transitions** - Modal fade animations

---

## 🚀 Cara Menjalankan

### Metode 1: Live Server (Recommended)

1. **Buka dengan VS Code**
2. **Install Extension**: Live Server
3. **Klik kanan** pada `index.html`
4. **Pilih**: "Open with Live Server"
5. **Browser akan terbuka** di `http://127.0.0.1:5500`

### Metode 2: Python HTTP Server

```bash
cd tugas3-vue-ut
python3 -m http.server 8000
```

Buka browser: `http://localhost:8000`

### Metode 3: Node.js HTTP Server

```bash
cd tugas3-vue-ut
npx http-server -p 8000
```

Buka browser: `http://localhost:8000`

---

## 📝 Catatan Penting

### ⚠️ WAJIB Menggunakan Server Lokal

Proyek ini **TIDAK BISA dibuka langsung** dengan `file://` karena:
- Menggunakan **Fetch API** untuk load JSON
- Browser memblokir CORS untuk file lokal
- Template HTML di-load secara async

### 🔒 Data Source

- **Sumber data RESMI**: `data/dataBahanAjar_tgs3.json`
- **JANGAN** import data dari Tugas 2 atau file lain
- Semua komponen hanya menggunakan `api.js` untuk akses data

### 🎨 Styling

- CSS menggunakan **modern layout**: Flexbox & Grid
- **Responsive design** untuk mobile & desktop
- **Color scheme**: Ungu (#667eea) sebagai primary color
- **Typography**: Segoe UI untuk readability

---

## 🧪 Testing Checklist

### Stock Table
- [ ] Data stok tampil dengan benar
- [ ] Filter UT-Daerah bekerja
- [ ] Filter Kategori (dependent) muncul setelah pilih UPBJJ
- [ ] Filter Stok Menipis & Kosong bekerja
- [ ] Sort by judul, qty, harga bekerja
- [ ] Status badge tampil sesuai kondisi stok
- [ ] Modal edit muncul saat klik Edit
- [ ] Validasi form edit bekerja
- [ ] Update stok berhasil disimpan
- [ ] Format currency & qty tampil dengan benar

### DO Tracking
- [ ] Search DO bekerja (case-insensitive)
- [ ] Detail DO tampil lengkap
- [ ] Progress bar sesuai status
- [ ] Timeline perjalanan tampil berurutan
- [ ] Error message muncul jika DO tidak ada
- [ ] Reset search bekerja

### Order Form
- [ ] Nomor DO auto-generate benar
- [ ] Validasi NIM (9 digit) bekerja
- [ ] Validasi Nama (min 3 char) bekerja
- [ ] Total auto-calculate saat pilih paket
- [ ] Preview paket tampil dengan benar
- [ ] Success message muncul setelah submit
- [ ] Form ter-reset setelah submit
- [ ] Data baru masuk ke tracking list

---

## 📖 Dokumentasi API Service

### `API.fetchBahanAjar()`
Load seluruh data dari JSON file dengan caching.

```javascript
const data = await API.fetchBahanAjar();
// Returns: { stok, upbjjList, kategoriList, ... }
```

### `API.getStok()`
Get array stok bahan ajar.

```javascript
const stokList = await API.getStok();
```

### `API.updateStok(kode, updateData)`
Update data stok (simulasi).

```javascript
await API.updateStok('EKMA4116', { qty: 30, safety: 20 });
```

### `API.addTracking(doData)`
Tambah DO baru (simulasi).

```javascript
await API.addTracking({ 'DO2025-0003': { ... } });
```

---

## 🐛 Troubleshooting

### Error: "Failed to fetch data"
**Solusi**: Pastikan menggunakan server lokal, bukan file://

### Template tidak muncul
**Solusi**: Cek console browser, pastikan template-loader.js berhasil load

### Component tidak registered
**Solusi**: Pastikan urutan load script di index.html benar

### Data tidak update setelah edit
**Solusi**: Ini simulasi client-side, refresh page akan reset data

---

## 👨‍💻 Pengembangan Lebih Lanjut

### Improvement Ideas:
- [ ] Integrasi dengan REST API backend (Laravel/Node.js)
- [ ] Authentication & Authorization
- [ ] Export data ke Excel/PDF
- [ ] Pagination untuk tabel besar
- [ ] Real-time updates dengan WebSocket
- [ ] Unit testing dengan Jest
- [ ] Build dengan Vue CLI + Webpack

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan **akademis** (Tugas Praktik STSI4209).

---

## 📞 Kontak

Jika ada pertanyaan atau kendala, hubungi dosen pembimbing atau forum diskusi Tugas 3.

**Selamat mengerjakan! 🎓**
