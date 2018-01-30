<template>
  <section class="page p4">
    <pool v-if="pool.address === address" :address="pool.address" :name="pool.name" :symbol="pool.symbol" :type="pool.type" :base="pool.base" :about="pool.about" :holders="pool.holders"></pool>
  </section>
</template>

<script>
import Pool from './PoolThumb'
export default {
  name: 'Pool',
  props: ['address'],
  components: {
    Pool
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
