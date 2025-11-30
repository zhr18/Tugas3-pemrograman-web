// Component: do-tracking
// Menampilkan tracking DO dengan search dan timeline

Vue.component('do-tracking', {
  template: '#do-tracking-template',
  data() {
    return {
      trackingList: [],
      loading: true,
      error: null,
      searchQuery: '',
      selectedDO: null,
      searchError: ''
    };
  },
  
  computed: {
    progressPercentage() {
      if (!this.selectedDO) return 0;
      const statusMap = {
        'Penerimaan': 25,
        'Dalam Perjalanan': 50,
        'Sedang Dikirim': 75,
        'Terkirim': 100
      };
      return statusMap[this.selectedDO.status] || 0;
    }
  },
  
  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.error = null;
        this.trackingList = await window.API.getTracking();
        this.loading = false;
      } catch (error) {
        this.error = 'Gagal memuat data tracking';
        this.loading = false;
      }
    },
    
    searchDO() {
      this.searchError = '';
      this.selectedDO = null;
      
      if (!this.searchQuery.trim()) {
        this.searchError = 'Masukkan nomor DO untuk dicari';
        return;
      }
      
      let found = null;
      for (let item of this.trackingList) {
        const doNumber = Object.keys(item)[0];
        if (doNumber.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          found = {
            nomorDO: doNumber,
            ...item[doNumber]
          };
          break;
        }
      }
      
      if (found) {
        this.selectedDO = found;
      } else {
        this.searchError = 'DO dengan nomor "' + this.searchQuery + '" tidak ditemukan';
      }
    },
    
    resetSearch() {
      this.searchQuery = '';
      this.selectedDO = null;
      this.searchError = '';
    },
    
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
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
