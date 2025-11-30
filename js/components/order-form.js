// Component: order-form
// Form pemesanan/tambah DO baru dengan validasi

Vue.component('order-form', {
  template: '#tpl-order',
  data() {
    return {
      // Data dari API
      paketList: [],
      pengirimanList: [],
      trackingList: [],
      
      // Loading state
      loading: true,
      error: null,
      
      // Form data
      form: {
        nomorDO: '',
        nim: '',
        nama: '',
        ekspedisi: '',
        paket: '',
        tanggalKirim: '',
        total: 0
      },
      
      // Validation errors
      validationErrors: {},
      
      // Success state
      showSuccess: false,
      savedDO: null
    };
  },
  
  computed: {
    /**
     * Paket yang dipilih
     * @returns {Object|null}
     */
    selectedPaket() {
      if (!this.form.paket) return null;
      return this.paketList.find(p => p.kode === this.form.paket);
    },
    
    /**
     * Generate nomor DO otomatis
     * @returns {string}
     */
    generatedNomorDO() {
      const year = new Date().getFullYear();
      const currentCount = this.trackingList.length + 1;
      const paddedCount = String(currentCount).padStart(4, '0');
      return `DO${year}-${paddedCount}`;
    }
  },
  
  watch: {
    /**
     * Update total harga saat paket berubah
     */
    'form.paket'(newVal) {
      if (newVal) {
        const paket = this.paketList.find(p => p.kode === newVal);
        this.form.total = paket ? paket.harga : 0;
      } else {
        this.form.total = 0;
      }
    }
  },
  
  methods: {
    /**
     * Load data dari API
     */
    async loadData() {
      try {
        this.loading = true;
        this.error = null;
        
        const data = await window.API.fetchBahanAjar();
        
        this.paketList = data.paket || [];
        this.pengirimanList = data.pengirimanList || [];
        this.trackingList = data.tracking || [];
        
        // Set nomor DO otomatis
        this.form.nomorDO = this.generatedNomorDO;
        
        // Set tanggal hari ini sebagai default
        this.form.tanggalKirim = this.getTodayDate();
        
        this.loading = false;
      } catch (error) {
        this.error = 'Gagal memuat data: ' + error.message;
        this.loading = false;
        console.error(error);
      }
    },
    
    /**
     * Get tanggal hari ini dalam format YYYY-MM-DD
     * @returns {string}
     */
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    
    /**
     * Validate form
     * @returns {boolean}
     */
    validateForm() {
      this.validationErrors = {};
      
      // Validasi NIM (9 digit)
      if (!this.form.nim) {
        this.validationErrors.nim = 'NIM harus diisi';
      } else if (!/^\d{9}$/.test(this.form.nim)) {
        this.validationErrors.nim = 'NIM harus 9 digit angka';
      }
      
      // Validasi Nama
      if (!this.form.nama.trim()) {
        this.validationErrors.nama = 'Nama harus diisi';
      } else if (this.form.nama.trim().length < 3) {
        this.validationErrors.nama = 'Nama minimal 3 karakter';
      }
      
      // Validasi Ekspedisi
      if (!this.form.ekspedisi) {
        this.validationErrors.ekspedisi = 'Ekspedisi harus dipilih';
      }
      
      // Validasi Paket
      if (!this.form.paket) {
        this.validationErrors.paket = 'Paket harus dipilih';
      }
      
      // Validasi Tanggal Kirim
      if (!this.form.tanggalKirim) {
        this.validationErrors.tanggalKirim = 'Tanggal kirim harus diisi';
      }
      
      return Object.keys(this.validationErrors).length === 0;
    },
    
    /**
     * Submit form
     */
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      try {
        // Prepare DO data
        const doData = {};
        doData[this.form.nomorDO] = {
          nim: this.form.nim,
          nama: this.form.nama,
          status: 'Penerimaan',
          ekspedisi: this.form.ekspedisi,
          tanggalKirim: this.form.tanggalKirim,
          paket: this.form.paket,
          total: this.form.total,
          perjalanan: [
            {
              waktu: new Date().toISOString().slice(0, 19).replace('T', ' '),
              keterangan: `Penerimaan di Loket: ${this.form.ekspedisi}`
            }
          ]
        };
        
        // Save via API
        await window.API.addTracking(doData);
        
        // Show success
        this.savedDO = { ...this.form };
        this.showSuccess = true;
        
        // Reload data untuk generate nomor DO baru
        await this.loadData();
        
        // Reset form
        this.resetForm();
        
      } catch (error) {
        alert('Gagal menyimpan DO: ' + error.message);
        console.error(error);
      }
    },
    
    /**
     * Reset form
     */
    resetForm() {
      this.form = {
        nomorDO: this.generatedNomorDO,
        nim: '',
        nama: '',
        ekspedisi: '',
        paket: '',
        tanggalKirim: this.getTodayDate(),
        total: 0
      };
      this.validationErrors = {};
    },
    
    /**
     * Close success message
     */
    closeSuccess() {
      this.showSuccess = false;
      this.savedDO = null;
    },
    
    /**
     * Format currency
     * @param {number} value
     * @returns {string}
     */
    formatCurrency(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');
    },
    
    /**
     * Format tanggal ke bahasa Indonesia (untuk display)
     * @param {string} dateString - format YYYY-MM-DD
     * @returns {string} - format "25 Agustus 2025"
     */
    formatDateDisplay(dateString) {
      if (!dateString) return '-';
      
      const date = new Date(dateString);
      const bulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      
      const tanggal = date.getDate();
      const bulanNama = bulan[date.getMonth()];
      const tahun = date.getFullYear();
      
      return `${tanggal} ${bulanNama} ${tahun}`;
    }
  },
  
  mounted() {
    this.loadData();
  }
});
