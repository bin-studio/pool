<template>
  <section>
    <div class="line-height-3">
      <h1 class="h3">Step 2 of 2</h1>
      <p class="h3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi ex. Phasellus fringilla, felis in euismod consequat, ex augue sollicitudin ante, in venenatis nunc. Sollicitudin ante, in venenatis nunc sollicitudin ante, in venenatis nunc.</p>
    </div>
    <div class="border mt3">
      <div class="tbl-row pt1 px2 pb2">
        <div class="h3">Name</div>
        <div class="h2 bold mt1">{{pool.name}}</div>
      </div>
      <div class="tbl-row border-top flex justify-between items-stretch left-align">
        <div class="flex-item-fill border-right pt1 px2 pb2">
          <div class="h3">Symbol</div>
          <div class="h2 mt1 bold">{{pool.symbol}}</div>
        </div>
        <div class="flex-item-fill border-right pt1 px2 pb2">
          <div class="h3">Type</div>
          <div class="h2 mt1 bold capitalize">{{pool.graph}}</div>
        </div>
        <div class="flex-item-fill pt1 px2 pb2">
          <div class="h3">Type</div>
          <div class="h2 mt1 bold">{{pool.baseToken}}</div>
        </div>
      </div>
      <div class="tbl-row border-top pt1 px2 pb2">
        <div class="h3">Estimated Cost (USD)</div>
        <div class="est-price h00 right-align line-height-1">$20</div>
      </div>
      <status-row class="border-top" :status="ready ? 'passed' : 'queued'" @check-click="ready = !ready">
        <span class="h3">Everything looks good {{punc}}</span>
      </status-row>
    </div>
    <footer class="mt4">
      <button @click="submit" class="btn col-12 block center rounded bg-blue white" :class="{'opacity-qrtr': !ready}">
        <span class="h3">Open the Pool</span>
      </button>
    </footer>
  </section>
</template>

<script>
import StatusRow from '../StatusRow'
export default {
  name: 'ConfirmPool',
  props: ['pool'],
  components: {
    StatusRow
  },
  data () {
    return {
      ready: false
    }
  },
  computed: {
    punc () {
      return this.ready ? '!' : '?'
    }
  },
  methods: {
    submit () {
      if (this.ready) this.$emit('submit')
    }
  }
}
</script>

<style lang="css" scoped>
.est-price{
  margin-top: calc(72/55*1em);
}
</style>
