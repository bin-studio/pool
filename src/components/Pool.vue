<template>
  <section class="page p4">
    <thumb :pool="pool"></thumb>
  </section>
</template>

<script>
import Thumb from './PoolThumb'
export default {
  name: 'Pool',
  props: ['address'],
  components: {
    Thumb
  },
  computed: {
    pool () {
      return this.$store.state.pool
    }
  },
  created () {
    this.$store.dispatch('getPoolDb', this.address)
  }
}
</script>

<style lang="css" scoped>
</style>
