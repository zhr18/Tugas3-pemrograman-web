// Component: status-badge
// Menampilkan badge status stok (Aman/Menipis/Kosong)

Vue.component('status-badge', {
  template: `
    <span class="status-badge" :class="statusClass" :title="tooltip">
      {{ statusText }}
    </span>
  `,
  props: {
    qty: {
      type: Number,
      required: true
    },
    safety: {
      type: Number,
      required: true
    },
    catatan: {
      type: String,
      default: ''
    }
  },
  computed: {
    /**
     * Menentukan status berdasarkan qty dan safety
     * @returns {string} 'aman' | 'menipis' | 'kosong'
     */
    status() {
      if (this.qty === 0) return 'kosong';
      if (this.qty < this.safety) return 'menipis';
      return 'aman';
    },

    /**
     * Text yang ditampilkan pada badge
     * @returns {string}
     */
    statusText() {
      switch (this.status) {
        case 'aman': return 'Aman';
        case 'menipis': return 'Menipis';
        case 'kosong': return 'Kosong';
        default: return '';
      }
    },

    /**
     * Class CSS untuk styling badge
     * @returns {string}
     */
    statusClass() {
      return `status-${this.status}`;
    },

    /**
     * Tooltip yang muncul saat hover (menampilkan catatan HTML)
     * @returns {string}
     */
    tooltip() {
      if (this.catatan) {
        // Strip HTML tags untuk tooltip text
        const div = document.createElement('div');
        div.innerHTML = this.catatan;
        return div.textContent || div.innerText || '';
      }
      return this.statusText;
    }
  }
});
