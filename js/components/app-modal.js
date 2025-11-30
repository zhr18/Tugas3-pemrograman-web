// Component: app-modal
// Modal dialog untuk edit stok dan tampilan lainnya

Vue.component('app-modal', {
  template: `
    <transition name="modal-fade">
      <div v-if="show" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container" :class="modalSize">
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <button class="modal-close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="hasFooter">
            <slot name="footer">
              <button class="btn btn-secondary" @click="closeModal">Tutup</button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  `,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal'
    },
    size: {
      type: String,
      default: 'medium', // 'small' | 'medium' | 'large'
      validator: function(value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      }
    },
    hasFooter: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    modalSize() {
      return `modal-${this.size}`;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  },
  watch: {
    show(newVal) {
      // Prevent body scroll saat modal terbuka
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  beforeDestroy() {
    // Pastikan body scroll direset saat component destroyed
    document.body.style.overflow = '';
  }
});
