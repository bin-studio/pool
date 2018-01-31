export default {
  name: 'app-image',
  data () {
    return {
      sizes: {
        icon: '',
        hero: ''
      },
      refreshing: false,
      currentSrc: null
    }
  },
  props: {
    src: String,
    size: String,
    bg: {
      type: Boolean,
      default: true
    },
    changes: Boolean
  },
  render (createElement) {
    if (!this.src) return
    let query = this.src && this.sizes[this.size]
    if (this.bg) {
      return createElement('div', {
        attrs: {
          style: `background-image: url(${this.src});height: 100%;`
        },
        'class': 'bg-img-cover'
      })
    }

    return createElement('img', {
      attrs: {
        src: this.src + (query || '')
      },
      'class': { refreshing: this.refreshing },
      ref: 'imgEl'
    })
  },
  mounted () {
    this.currentSrc = this.src
  },
  methods: {
    refresh () {
      if (this.currentSrc === this.src) return
      this.refreshing = true
      this.$refs.imgEl.addEventListener('load', (e) => {
        this.refreshing = false
        this.currentSrc = this.src
      }, { once: true })
    }
  },
  watch: {
    src (val) {
      if (this.changes) {
        this.refresh()
      }
    }
  }
}
