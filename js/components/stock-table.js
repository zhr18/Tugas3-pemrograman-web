// Component: ba-stock-table
// Menampilkan tabel stok bahan ajar dengan filter, sort, dan edit

Vue.component('ba-stock-table', {
  template: '#tpl-stock',
  data() {
    return {
      stokList: [],
      upbjjList: [],
      kategoriList: [],
      loading: true,
      error: null,
      filterUpbjj: '',
      filterKategori: '',
      filterStokKritis: false,
      filterStokKosong: false,
      sortBy: 'kode',
      sortOrder: 'asc',
      showModal: false,
      isCreate: false,
      editForm: {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      },
      validationErrors: {}
    };
  },
  
  computed: {
    uniqueKodeCount() {
      const uniqueCodes = new Set(this.stokList.map(item => item.kode));
      return uniqueCodes.size;
    },
    
    totalQty() {
      return this.stokList.reduce((sum, item) => sum + (item.qty || 0), 0);
    },
    
    availableKategori() {
      if (!this.filterUpbjj) {
        return this.kategoriList;
      }
      const kategoriSet = new Set();
      this.stokList
        .filter(item => item.upbjj === this.filterUpbjj)
        .forEach(item => kategoriSet.add(item.kategori));
      return Array.from(kategoriSet);
    },
    
    filteredAndSortedStok() {
      let result = [...this.stokList];
      
      if (this.filterUpbjj) {
        result = result.filter(item => item.upbjj === this.filterUpbjj);
      }
      
      if (this.filterKategori) {
        result = result.filter(item => item.kategori === this.filterKategori);
      }
      
      if (this.filterStokKritis) {
        result = result.filter(item => item.qty < item.safety && item.qty > 0);
      }
      
      if (this.filterStokKosong) {
        result = result.filter(item => item.qty === 0);
      }
      
      result.sort((a, b) => {
        let aVal = a[this.sortBy];
        let bVal = b[this.sortBy];
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        if (aVal < bVal) return this.sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      
      return result;
    },
    
    hasActiveFilters() {
      return this.filterUpbjj || this.filterKategori || 
             this.filterStokKritis || this.filterStokKosong;
    }
  },
  
  filters: {
    currency(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');
    },
    qty(value) {
      return value + ' buah';
    }
  },
  
  methods: {
    plainCatatan(html) {
      const tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      return tmp.textContent || tmp.innerText || '';
    },
    
    async loadData() {
      try {
        this.loading = true;
        this.error = null;
        const data = await window.API.fetchBahanAjar();
        this.stokList = data.stok || [];
        this.upbjjList = data.upbjjList || [];
        this.kategoriList = data.kategoriList || [];
        this.loading = false;
      } catch (error) {
        this.error = 'Gagal memuat data stok';
        this.loading = false;
      }
    },
    
    toggleSort(column) {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = column;
        this.sortOrder = 'asc';
      }
    },
    
    resetFilters() {
      this.filterUpbjj = '';
      this.filterKategori = '';
      this.filterStokKritis = false;
      this.filterStokKosong = false;
      this.sortBy = 'kode';
      this.sortOrder = 'asc';
    },
    
    openEditModal(item) {
      this.isCreate = false;
      this.editForm = { ...item };
      this.validationErrors = {};
      this.showModal = true;
    },
    
    openCreateModal() {
      this.isCreate = true;
      this.editForm = {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      };
      this.validationErrors = {};
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
      this.validationErrors = {};
    },
    
    validateForm() {
      this.validationErrors = {};
      
      if (this.isCreate && !this.editForm.kode.trim()) {
        this.validationErrors.kode = 'Kode harus diisi saat menambah item';
      }
      
      if (!this.editForm.judul.trim()) {
        this.validationErrors.judul = 'Judul tidak boleh kosong';
      }
      
      if (!this.editForm.kategori) {
        this.validationErrors.kategori = 'Kategori harus dipilih';
      }
      
      if (!this.editForm.upbjj) {
        this.validationErrors.upbjj = 'UT-Daerah harus dipilih';
      }
      
      if (!this.editForm.lokasiRak.trim()) {
        this.validationErrors.lokasiRak = 'Lokasi Rak harus diisi';
      }
      
      if (this.editForm.harga < 0) {
        this.validationErrors.harga = 'Harga tidak boleh negatif';
      }
      
      if (this.editForm.qty < 0) {
        this.validationErrors.qty = 'Qty tidak boleh negatif';
      }
      
      if (this.editForm.safety < 0) {
        this.validationErrors.safety = 'Safety tidak boleh negatif';
      }
      
      return Object.keys(this.validationErrors).length === 0;
    },
    
    async saveEdit() {
      if (!this.validateForm()) {
        return;
      }
      
      try {
        if (this.isCreate) {
          const exists = this.stokList.some(s => s.kode === this.editForm.kode);
          if (exists) {
            alert('Kode sudah ada. Gunakan kode unik.');
            return;
          }
          this.stokList.push({ ...this.editForm });
          await window.API.updateStok(this.editForm.kode, this.editForm);
        } else {
          const index = this.stokList.findIndex(item => item.kode === this.editForm.kode);
          if (index !== -1) {
            this.$set(this.stokList, index, { ...this.editForm });
          }
          await window.API.updateStok(this.editForm.kode, this.editForm);
        }
        this.closeModal();
      } catch (error) {
        alert('Gagal menyimpan stok');
      }
    },
    
    async deleteStok(item) {
      if (!confirm(`Hapus item ${item.kode} - ${item.judul}?`)) return;
      try {
        this.stokList = this.stokList.filter(s => s.kode !== item.kode);
      } catch (e) {
        alert('Gagal menghapus item.');
      }
    }
  },
  
  watch: {
    filterUpbjj(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterKategori = '';
      }
    }
  },
  
  mounted() {
    this.loadData();
  }
});
