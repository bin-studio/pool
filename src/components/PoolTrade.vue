<template>
  <article class="flex flex-column justify-between">
    <header class="border-bottom bold">
      <div class="col col-4 py1 px2 uppercase">{{pool.symbol}}</div>
      <div class="col col-4 py1 px2 border-left">{{pool.type}}</div>
      <div class="col col-4 py1 px2 border-left">{{pool.base}}</div>
    </header>
    <figure class="trade__figure relative flex-item-fill">
      <div class="absolute top-0 left-0 py1 px2 z2">Supply {{totalSupply}} of {{totalEverMinted}}</div>
      <div class="absolute-fill z1 bg-dots">
        <div class="absolute-fill bg-img bg-graph"></div>
      </div>
    </figure>
    <footer class="border-top">
      <div class="clearfix">
        <div class="trade__row flex flex-column justify-between col col-4 p2">
          <div>Price (USD)</div>
          <div class="bold mt1">${{price}} <span class="red">-3%</span></div>
        </div>
        <div class="trade__row flex flex-column justify-between col col-4 p2 border-left">
          <div>Supporters</div>
          <div class="bold mt1">{{supporters}}</div>
        </div>
        <div class="trade__row flex flex-column justify-between col col-4 p2 border-left">
          <div>Launched</div>
          <div class="bold mt1">{{age}}</div>
        </div>
      </div>
      <div class="bg-yellow border-top clearfix">
        <div class="trade__row flex flex-column justify-between col col-4 p2">
          <div>Buy Price Avg</div>
          <div class="bold mt1">$299 <span class="red">-12%</span></div>
        </div>
        <div class="trade__row flex flex-column justify-between col col-4 p2 border-left">
          <div>Holding</div>
          <div class="bold mt1">{{yourBalance}} {{pool.symbol}}</div>
        </div>
        <div class="trade__row flex flex-column justify-between col col-4 p2 border-left">
          <div>Value</div>
          <div class="bold mt1">${{poolBalance}}</div>
        </div>
      </div>
      <nav class="flex justify-between border-top">
        <div class="flex-item-fill trade__row flex items-center justify-center pointer" @click="tab('buy')" :class="{'bg-blue white': mode === 'buy'}"><span>Buy</span></div>
        <div class="flex-item-fill trade__row flex items-center justify-center border-left pointer" @click="tab('sell')" :class="{'bg-blue white': mode === 'sell'}"><span>Sell</span></div>
      </nav>
      <div v-show="mode !== null" class="flex justify-between border-top">
        <div class="trade__row p2 flex-item-fill col col-4 flex flex-column justify-between">
          <div class="bold flex justify-between items-center"><span>{{pool.symbol}}</span><span>⇄</span></div>
          <div class="bold"><input type="number" class="input-number" v-model="amount"></div>
        </div>
        <div class="trade__row p2 flex-item-fill col col-4 flex flex-column justify-between">
          <div>DAI</div>
          <div class="mt1 overflow-hidden">{{DAIvalue}}</div>
        </div>
      </div>
      <button v-show="mode === 'buy'" class="btn block trade__row bg-blue white col-12">Confirm</button>
      <button v-show="mode === 'sell'" class="btn block trade__row bg-blue white col-12">Confirm</button>
    </footer>
  </article>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
export default {
  name: 'Trade',
  data () {
    return {
      mode: null,
      amount: 1,
      totalSupply: 0,
      totalEverMinted: 0,
      supporters: 0,
      price: 0,
      yourBalance: 0,
      poolBalance: 0
    }
  },
  computed: {
    ...mapState(['pool']),
    age () {
      return moment(this.pool.createdAt).fromNow()
    },
    DAIvalue () {
      return this.amount
    },
    symbol () {
      return this.pool.symbol
    }
  },
  watch: {
    amount () {
      this.amount = this.amount < 0 ? 0 : this.amount
    }
  },
  methods: {
    tab (tab) {
      this.mode = this.mode === tab ? null : tab
    }
  }
}
</script>

<style lang="css" scoped>
.trade__figure{
  padding-bottom:36.6%;
}
.trade__row{
  height:4.66rem;
}
.bg-graph{
  background-image:url(../assets/graph-mask.svg);
  background-size:100% auto;
  background-position:bottom center;
}
</style>
