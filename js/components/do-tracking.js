// Component: do-tracking
// Menampilkan tracking DO dengan search dan timeline

Vue.component('do-tracking', {
  template: '#tpl-tracking',
  data() {
    return {
      // Data dari API
      trackingList: [],
      
      // Loading state
        // Handler keyboard dapat diikat di template: enter & esc
      loading: true,
      error: null,
      
      // Search state
      searchQuery: '',
      searchType: 'nomor', // 'nomor' atau 'nim'
      selectedDO: null,
      searchError: '',
      
      // Status mapping untuk progress bar
      statusMap: {
        'Penerimaan': 25,
        'Dalam Perjalanan': 50,
        'Sedang Dikirim': 75,
        'Terkirim': 100
      }
    };
  },
  
  computed: {
    /**
     * Progress percentage berdasarkan status
     * @returns {number}
     */
    progressPercentage() {
      if (!this.selectedDO) return 0;
      return this.statusMap[this.selectedDO.status] || 0;
    },
    
    /**
     * Class CSS untuk progress bar berdasarkan status
     * @returns {string}
     */
    progressClass() {
      if (!this.selectedDO) return '';
      
      switch (this.selectedDO.status) {
        case 'Terkirim':
          return 'progress-success';
        case 'Dalam Perjalanan':
        case 'Sedang Dikirim':
          return 'progress-warning';
        default:
          return 'progress-info';
      }
    }
  },
  
  watch: {
    /**
     * Watcher 1: Auto-search saat searchQuery berubah (debounce bisa ditambahkan)
     */
    searchQuery(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        // Optional: bisa tambahkan debounce di sini
        console.log('[Watch] searchQuery changed:', oldVal, '→', newVal);
      }
    },
    
    /**
     * Watcher 2: Monitor perubahan searchType
     */
    searchType(newVal) {
      console.log('[Watch] searchType changed to:', newVal);
      // Reset search saat ganti tipe
      this.searchError = '';
    }
  },
  
  methods: {
    /**
     * Load data tracking dari API
     */
    async loadData() {
      try {
        this.loading = true;
        this.error = null;
        
        this.trackingList = await window.API.getTracking();
        
        this.loading = false;
      } catch (error) {
        this.error = 'Gagal memuat data tracking: ' + error.message;
        this.loading = false;
        console.error(error);
      }
    },
    
    /**
     * Search DO berdasarkan nomor
     */
    searchDO() {
      this.searchError = '';
      this.selectedDO = null;
      
      if (!this.searchQuery.trim()) {
        this.searchError = 'Masukkan nomor DO untuk dicari';
        return;
      }
      
      // Cari DO di tracking list
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
        this.searchError = `DO dengan nomor "${this.searchQuery}" tidak ditemukan`;
      }
    },
    
    /**
     * Reset search
     */
    resetSearch() {
      this.searchQuery = '';
      this.selectedDO = null;
      this.searchError = '';
    },
    
    /**
     * Format tanggal ke format Indonesia
     * @param {string} dateString
     * @returns {string}
     */
    formatDate(dateString) {
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
    },
    
    /**
     * Format currency
     * @param {number} value
     * @returns {string}
     */
    formatCurrency(value) {
      if (!value) return 'Rp 0';
      return 'Rp ' + value.toLocaleString('id-ID');
    }
  },
  
  mounted() {
    this.loadData();
  }
});
