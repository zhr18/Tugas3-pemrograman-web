// app.js - Vue Root Instance
// Inisialisasi aplikasi Vue dengan tab state

new Vue({
  el: '#app',
  data: {
    tab: 'stok' // 'stok' | 'tracking' | 'order'
  },
  mounted() {
    console.log('SITTA berhasil dimuat');
  }
});

