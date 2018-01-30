<template>
  <section class="page page-feed p4">
    <nav class="h3 border-bottom mb4 flex justify-between items-center px2">
      <div>Top</div>
      <div>Newest</div>
      <div>Tradeview</div>
      <div>Search</div>
    </nav>
    <section>
      <pool v-for="pool in pools" :key="pool.symbol" :name="pool.name" :symbol="pool.symbol" :type="pool.type" :base="pool.base" :about="pool.about" :holders="pool.holders"></pool>
    </section>
  </section>
</template>

<script>
import Pool from './Pool'
export default {
  name: 'Explore',
  components: {
    Pool
  },
  data () {
    return {
      pools: [
        {
          name: "Billy's Ukelele Covers Klub",
          symbol: 'BUCK',
          type: 'linear',
          base: 'DAI',
          about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi ex. Phasellus fringilla, felis in euismod consequat.',
          holders: 444
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
  section > nav{
    height:3.33em;
  }
</style>
