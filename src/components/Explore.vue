<template>
  <section class="page"></section>
</template>

<script>
import store from '@/store'

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
}
</script>
