<template>
  <section class="page page-feed p4">
    <nav class="border-bottom mb4 flex justify-between items-center px2">
      <div>Top</div>
      <div>Newest</div>
      <div>Tradeview</div>
      <div>Search</div>
    </nav>
    <section>
      <pool v-for="pool in pools" :key="pool.symbol" :pool="pool"></pool>
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
          address: '0x000000000000000000000000000000000000dEaD',
          ownerAddress: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
          name: "Billy's Ukelele Covers Klub",
          symbol: 'BUCK',
          type: 'linear',
          base: 'DAI',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi ex. Phasellus fringilla, felis in euismod consequat.',
          holders: 444,
          heroImage: 'https://res.cloudinary.com/pool/image/upload/v1517382075/sqppkdjifatjy6kssldw.jpg',
          coinImage: undefined
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getPools').then(() => {
      next()
    })
  }
  // components: { Upload }
}
</script>

<style lang="css" scoped>
  section > nav{
    height:3.33em;
  }
</style>
