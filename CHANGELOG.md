# CHANGELOG - SITTA Tugas 3

## Struktur Proyek yang Telah Dibuat

### ✅ File Core
- [x] `index.html` - Root HTML dengan Vue app mount point & tab navigation
- [x] `README.md` - Dokumentasi lengkap proyek
- [x] `CHANGELOG.md` - File ini

### ✅ Assets
- [x] `assets/css/style.css` - Stylesheet global lengkap dengan responsive design

### ✅ Data
- [x] `data/dataBahanAjar_tgs3.json` - data dari dosen/mentor untuk Tugas 3

### ✅ JavaScript Core
- [x] `js/app.js` - Vue root instance dengan tab state management
- [x] `js/template-loader.js` - Utility untuk load template HTML secara async

### ✅ Services
- [x] `js/services/api.js` - Service layer dengan fungsi:
  - `fetchBahanAjar()` - Load data JSON dengan caching
  - `getStok()` - Get stok list
  - `getUpbjjList()` - Get UPBJJ list
  - `getKategoriList()` - Get kategori list
  - `getPengirimanList()` - Get pengiriman list
  - `getPaket()` - Get paket list
  - `getTracking()` - Get tracking list
  - `updateStok()` - Update stok (simulasi)
  - `addTracking()` - Add DO baru (simulasi)

### ✅ Vue Components (JavaScript)
- [x] `js/components/status-badge.js` - Badge status stok (Aman/Menipis/Kosong)
- [x] `js/components/app-modal.js` - Modal dialog universal
- [x] `js/components/stock-table.js` - Component stok bahan ajar dengan fitur:
  - Filter by UPBJJ
  - Filter by Kategori (dependent)
  - Filter stok kritis & kosong
  - Sort by judul, qty, harga
  - Edit stok via modal
  - Format currency & qty
  - Status badge dengan tooltip
- [x] `js/components/do-tracking.js` - Component tracking DO dengan:
  - Search DO
  - Detail DO lengkap
  - Progress bar
  - Timeline perjalanan
- [x] `js/components/order-form.js` - Component form pemesanan dengan:
  - Auto-generate nomor DO
  - Validasi form (NIM 9 digit, nama min 3 char, dll)
  - Auto-calculate total
  - Preview paket
  - Success message

### ✅ Vue Templates (HTML)
- [x] `templates/stock-table.html` - Template untuk ba-stock-table
- [x] `templates/do-tracking.html` - Template untuk do-tracking
- [x] `templates/order-form.html` - Template untuk order-form

---

## 🎯 Vue Features yang Diimplementasikan

### Directives (v-*)
- ✅ `v-if` / `v-else-if` / `v-else` - Di semua components
- ✅ `v-show` - Di modal dan conditional displays
- ✅ `v-for` - Di tabel, dropdown, timeline
- ✅ `v-bind` / `:` - Untuk class, style, attributes
- ✅ `v-model` - Di semua form inputs (stock-table, order-form)
- ✅ `v-on` / `@` - Event handlers (click, submit, keyup.enter)
- ✅ `v-html` - Untuk render catatanHTML

### Component Features
- ✅ **Props** - status-badge menerima qty, safety, catatan
- ✅ **Computed Properties** - filteredAndSortedStok, availableKategori, progressPercentage
- ✅ **Methods** - toggleSort, validateForm, searchDO, dll
- ✅ **Watchers** - Watch filterUpbjj untuk reset filterKategori
- ✅ **Filters** - currency (Rp format), qty (buah)
- ✅ **Custom Events** - Modal emit 'close' event
- ✅ **Slots** - Modal footer slot

### Lifecycle Hooks
- ✅ `mounted()` - Load data dari API
- ✅ `beforeDestroy()` - Cleanup (modal scroll reset)

---

## 📊 Data Structure

### `dataBahanAjar_tgs3.json`
```json
{
  "upbjjList": [...],
  "kategoriList": [...],
  "pengirimanList": [...],
  "paket": [...],
  "stok": [
    {
      "kode": "EKMA4116",
      "judul": "...",
      "kategori": "...",
      "upbjj": "...",
      "lokasiRak": "...",
      "harga": 65000,
      "qty": 28,
      "safety": 20,
      "catatanHTML": "..."
    }
  ],
  "tracking": [
    {
      "DO2025-0001": {
        "nim": "...",
        "nama": "...",
        "status": "...",
        "ekspedisi": "...",
        "tanggalKirim": "...",
        "paket": "...",
        "total": 120000,
        "perjalanan": [...]
      }
    }
  ]
}
```

---

## 🎨 Design System

### Color Palette
- **Primary**: #667eea (Ungu)
- **Secondary**: #718096 (Abu-abu)
- **Success**: #10b981 (Hijau)
- **Warning**: #f59e0b (Oranye)
- **Danger**: #e53e3e (Merah)
- **Background**: #f5f7fa (Abu terang)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Base Size**: 14px
- **Line Height**: 1.6

---

## 🔄 Alur Kerja Aplikasi

### 1. Load Sequence
```
index.html
  ↓
template-loader.js → Load semua template HTML
  ↓
api.js → Ready untuk fetch data
  ↓
Components (status-badge, app-modal, stock-table, do-tracking, order-form)
  ↓
app.js → Initialize Vue root instance
  ↓
App Ready! 🎉
```

### 2. Data Flow
```
dataBahanAjar_tgs3.json
  ↓
API.fetchBahanAjar() (dengan cache)
  ↓
Component mounted() → Load data
  ↓
Computed properties → Filter & sort
  ↓
Template → Render UI
```

### 3. User Interaction Flow

#### Stock Table:
```
User pilih filter UPBJJ
  ↓
Computed availableKategori update
  ↓
User pilih filter Kategori
  ↓
Computed filteredAndSortedStok update
  ↓
Table re-render otomatis
```

#### DO Tracking:
```
User input nomor DO
  ↓
searchDO() method
  ↓
Cari di trackingList
  ↓
Jika found: tampil detail + progress + timeline
Jika not found: tampil error message
```

#### Order Form:
```
User pilih paket
  ↓
Watcher 'form.paket' trigger
  ↓
Auto-calculate total
  ↓
User submit
  ↓
validateForm() → Cek semua field
  ↓
Jika valid: save + show success
Jika invalid: tampil error per field
```

---

## ⚙️ Fitur Teknis Detail

### 1. Filter Dependent (Kategori berdasarkan UPBJJ)
```javascript
computed: {
  availableKategori() {
    if (!this.filterUpbjj) return this.kategoriList;
    
    const kategoriSet = new Set();
    this.stokList
      .filter(item => item.upbjj === this.filterUpbjj)
      .forEach(item => kategoriSet.add(item.kategori));
    
    return Array.from(kategoriSet);
  }
}

watch: {
  filterUpbjj(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.filterKategori = ''; // Reset kategori
    }
  }
}
```

### 2. Status Logic
```javascript
computed: {
  status() {
    if (this.qty === 0) return 'kosong';
    if (this.qty < this.safety) return 'menipis';
    return 'aman';
  }
}
```

### 3. Auto-generate Nomor DO
```javascript
computed: {
  generatedNomorDO() {
    const year = new Date().getFullYear();
    const currentCount = this.trackingList.length + 1;
    const paddedCount = String(currentCount).padStart(4, '0');
    return `DO${year}-${paddedCount}`;
  }
}
```

### 4. Progress Bar Mapping
```javascript
statusMap: {
  'Penerimaan': 25,
  'Dalam Perjalanan': 50,
  'Sedang Dikirim': 75,
  'Terkirim': 100
}
```

---

## 🧪 Testing Scenarios

### Stock Table Testing
1. **Filter UPBJJ**: Pilih Jakarta → Hanya tampil stok Jakarta
2. **Filter Kategori Dependent**: Pilih Jakarta → Kategori berubah sesuai stok Jakarta
3. **Filter Stok Menipis**: Check → Hanya EKMA4115 (qty=7 < safety=15)
4. **Filter Stok Kosong**: Check → Tidak ada (karena semua qty > 0)
5. **Sort Harga**: Click kolom Harga → Sort asc/desc
6. **Edit Stok**: Klik Edit EKMA4116 → Modal muncul → Ubah qty → Save

### DO Tracking Testing
1. **Search Valid**: Input "DO2025-0001" → Tampil detail Rina Wulandari
2. **Search Invalid**: Input "DO2025-9999" → Error message
3. **Progress Bar**: DO status "Dalam Perjalanan" → Progress 50%
4. **Timeline**: Tampil semua event dengan waktu & keterangan

### Order Form Testing
1. **Auto DO**: Nomor DO auto-generate (DO2025-0003)
2. **Validasi NIM**: Input "12345" → Error "NIM harus 9 digit"
3. **Validasi Nama**: Input "AB" → Error "Nama minimal 3 karakter"
4. **Auto Total**: Pilih PAKET-UT-001 → Total 120000 otomatis
5. **Preview Paket**: Pilih paket → Tampil isi EKMA4116, EKMA4115
6. **Submit**: Isi semua → Submit → Success message → Form reset

---

## 🚀 Performance Optimization

1. **API Caching**: Data JSON di-cache setelah pertama kali di-fetch
2. **Computed Properties**: Filter & sort menggunakan computed (efficient reactivity)
3. **v-show vs v-if**: Modal menggunakan v-if (destroy saat close)
4. **Debouncing**: Bisa ditambahkan untuk search input (future improvement)

---

## 📌 Catatan Implementasi

### ✅ Yang Sudah Sesuai Requirement
- ✅ Data dari `dataBahanAjar_tgs3.json` (TIDAK ada referensi ke Tugas 2)
- ✅ Struktur folder sesuai spesifikasi
- ✅ Component-based architecture
- ✅ Semua Vue features terpakai (directives, computed, methods, watchers, filters)
- ✅ Filter dependent (kategori by UPBJJ)
- ✅ Status badge dengan tooltip catatanHTML
- ✅ Format currency & satuan
- ✅ Validasi form lengkap
- ✅ Auto-generate nomor DO
- ✅ Progress bar & timeline

### 🎯 Bonus Features
- ✅ Responsive design (mobile & desktop)
- ✅ Modal dengan slot & custom events
- ✅ Loading & error states
- ✅ Success alerts
- ✅ Smooth transitions
- ✅ Comprehensive documentation

---

## 🔮 Future Enhancements (Optional)

1. **LocalStorage Persistence**: Simpan perubahan data di localStorage
2. **Export PDF/Excel**: Export tabel stok
3. **Pagination**: Untuk tabel besar
4. **Search Bar**: Search di tabel stok
5. **Dark Mode**: Toggle dark/light theme
6. **Multi-language**: i18n support
7. **Unit Tests**: Jest + Vue Test Utils
8. **Build Tool**: Vue CLI + Webpack untuk production build

---
