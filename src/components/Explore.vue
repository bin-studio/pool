<template>
  <section class="page">
    <!-- <upload :contract="contract" image-type="heroImage"></upload> -->
  </section>
</template>

<script>
import store from '@/store'
// import Upload from '@/components/Upload'

export default {
  name: 'Explore',
  data () {
    return {}
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getPools').then(() => {
      next()
    })
  }
  // components: { Upload }
}
</script>
