<template>
  <section class="page page-feed p4">
    <nav class="border-bottom mb4 flex justify-between items-center px2">
      <div>Top</div>
      <div>Newest</div>
      <div>Tradeview</div>
      <div>Search</div>
    </nav>
    <section>
      <pool v-for="pool in pools" :key="pool.symbol" :address="pool.address" :name="pool.name" :symbol="pool.symbol" :type="pool.type" :base="pool.base" :about="pool.about" :holders="pool.holders"></pool>
    </section>
  </section>
</template>

<script>
import PoolThumb from './PoolThumb'
import store from '@/store'
export default {
  name: 'Explore',
  components: {
    Pool: PoolThumb
  },
  data () {
    return {
      pools: [
        {
          address: '0x0',
          name: "Billy's Ukelele Covers Klub",
          symbol: 'BUCK',
          type: 'linear',
          base: 'DAI',
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi ex. Phasellus fringilla, felis in euismod consequat.',
          holders: 444
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getPools').then(() => {
      next()
    })
  }
}
</script>

<style lang="css" scoped>
  section > nav{
    height:3.33em;
  }
</style>
