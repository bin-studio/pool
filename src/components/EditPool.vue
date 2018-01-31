<template>
  <article class="page p4">
    <div class="max-width-4 mx-auto border">
      <header class="border-bottom bold clearfix">
        <div class="col col-4 px2 py1">{{pool.symbol}}&nbsp;</div>
        <div class="col col-4 px2 py1 border-left">{{pool.type}}&nbsp;</div>
        <div class="col col-4 px2 py1 border-left">{{pool.base}}&nbsp;</div>
      </header>
      <section class="px2 py3">
        <div><input type="text" v-model="newPool.name"></div>
        <textarea class="block mt2" rows="4" v-model="newPool.description"></textarea>
      </section>
    </div>
  </article>
</template>

<script>
import store from '@/store'
import Upload from '@/components/Upload'

export default {
  name: 'EditPool',
  data () {
    return {
      newPool: {}
    }
  },
  computed: {
    pool () {
      return this.$store.state.pool
    }
  },
  watch: {
    pool (val) {
      this.newPool = JSON.parse(JSON.stringify(val))
    }
  },
  beforeRouteEnter (to, from, next) {
    const { address } = to.params
    store.dispatch('getPoolDb', address).then(() => {
      next()
    })
  },
  components: { Upload }
}
</script>

<style lang="css" scoped>
</style>
