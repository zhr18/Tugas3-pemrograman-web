// Component: order-form
// Form pemesanan/tambah DO baru

Vue.component('order-form', {
  template: '#order-form-template',
  data() {
    return {
      paketList: [],
      pengirimanList: [],
      trackingList: [],
      loading: true,
      error: null,
      form: {
        nomorDO: '',
        nim: '',
        nama: '',
        ekspedisi: '',
        paket: '',
        tanggalKirim: '',
        total: 0
      },
      validationErrors: {},
      showSuccess: false,
      savedDO: null
    };
  },
  
  computed: {
    selectedPaket() {
      if (!this.form.paket) return null;
      return this.paketList.find(p => p.kode === this.form.paket);
    },
    generatedNomorDO() {
      const year = new Date().getFullYear();
      const currentCount = this.trackingList.length + 1;
      const paddedCount = String(currentCount).padStart(4, '0');
      return 'DO' + year + '-' + paddedCount;
    }
  },
  
  watch: {
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
    async loadData() {
      try {
        this.loading = true;
        this.error = null;
        const data = await window.API.fetchBahanAjar();
        this.paketList = data.paket || [];
        this.pengirimanList = data.pengirimanList || [];
        this.trackingList = data.tracking || [];
        this.form.nomorDO = this.generatedNomorDO;
        this.form.tanggalKirim = this.getTodayDate();
        this.loading = false;
      } catch (error) {
        this.error = 'Gagal memuat data';
        this.loading = false;
      }
    },
    
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return year + '-' + month + '-' + day;
    },
    
    validateForm() {
      this.validationErrors = {};
      if (!this.form.nim) {
        this.validationErrors.nim = 'NIM harus diisi';
      } else if (!/^\d{9}$/.test(this.form.nim)) {
        this.validationErrors.nim = 'NIM harus 9 digit angka';
      }
      if (!this.form.nama.trim()) {
        this.validationErrors.nama = 'Nama harus diisi';
      } else if (this.form.nama.trim().length < 3) {
        this.validationErrors.nama = 'Nama minimal 3 karakter';
      }
      if (!this.form.ekspedisi) {
        this.validationErrors.ekspedisi = 'Ekspedisi harus dipilih';
      }
      if (!this.form.paket) {
        this.validationErrors.paket = 'Paket harus dipilih';
      }
      if (!this.form.tanggalKirim) {
        this.validationErrors.tanggalKirim = 'Tanggal kirim harus diisi';
      }
      return Object.keys(this.validationErrors).length === 0;
    },
    
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      try {
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
              keterangan: 'Penerimaan di Loket: ' + this.form.ekspedisi
            }
          ]
        };
        await window.API.addTracking(doData);
        this.savedDO = { ...this.form };
        this.showSuccess = true;
        await this.loadData();
        this.resetForm();
      } catch (error) {
        alert('Gagal menyimpan DO');
      }
    },
    
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
    
    closeSuccess() {
      this.showSuccess = false;
      this.savedDO = null;
    },
    
    formatCurrency(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');
    }
  },
  
  mounted() {
    this.loadData();
  }
});
