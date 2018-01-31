<template>
  <article class="page p4">
    <div class="max-width-4 mx-auto border">
      <header class="bold clearfix">
        <div class="col col-4 px2 py1 line-height-3">{{pool.symbol}}&nbsp;</div>
        <div class="col col-4 px2 py1 border-left line-height-3">{{pool.type}}&nbsp;</div>
        <div class="col col-4 px2 py1 border-left line-height-3">{{pool.base}}&nbsp;</div>
      </header>
      <section class="px2 py3 border-top">
        <div>
          <input type="text" v-model="newPool.name">
        </div>
        <div>
          <textarea class="block mt2" rows="3" v-model="newPool.description"></textarea>
        </div>
      </section>
      <section class="px2 py3 border-top">
        <upload :contract="newPool" image-type="heroImage"></upload>
        <pool-image :src="newPool.heroImage" :bg="false" size="hero" class="block mx-auto"></pool-image>
      </section>
      <footer>
        <div class="clearfix border-top">
          <button class="btn block col col-6" @click="$router.go(-1)">Cancel</button>
          <button class="btn block col col-6 bg-blue white" @click="submit">{{ saveText }}</button>
        </div>
      </footer>
    </div>
  </article>
</template>

<script>
import store from '@/store'
import Upload from '@/components/Upload'
import PoolImage from '@/components/Image'

export default {
  name: 'EditPool',
  data () {
    return {
      newPool: {},
      saveText: 'Save'
    }
  },
  computed: {
    pool () {
      return this.$store.state.pool
    }
  },
  beforeRouteEnter (to, from, next) {
    const { address } = to.params
    store.dispatch('getPoolDb', address).then(() => {
      next()
    })
  },
  watch: {
    pool () {
      this.clonePool()
    }
  },
  methods: {
    clonePool () {
      this.newPool = JSON.parse(JSON.stringify(this.pool))
    },
    submit () {
      this.saveText = 'Saving...'
      this.$store.dispatch('updateContract', this.newPool).then(() => {
        this.saveText = 'Done!'
        setTimeout(() => {
          this.saveText = 'Save'
        }, 2000)
      })
    }
  },
  created () {
    this.clonePool()
  },
  components: { Upload, PoolImage }
}
</script>

<style lang="css" scoped>
</style>
