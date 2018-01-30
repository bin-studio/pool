<template>
  <section>
    <div class="line-height-3">
      <h1 class="h3">Step 1 of 2</h1>
      <p class="h3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi ex. Phasellus fringilla, felis in euismod consequat, ex augue sollicitudin ante, in venenatis nunc. Sollicitudin ante, in venenatis nunc sollicitudin ante, in venenatis nunc.</p>
    </div>
    <div class="border mt3">
      <!-- name -->
      <div class="tbl-row pt1 px2 pb2">
        <label class="h3 block" for="name">Name</label>
        <input id="nameInput" class="h2 bold block col-12 mt1" name="name" type="text" v-model="pool.name">
      </div>
      <!-- symbol -->
      <div class="tbl-row pt1 px2 pb2 border-top">
        <label class="h3 block" for="symbolInput">Symbol <span class="red" v-show="pool.symbol.length > 7">too long!</span></label>
        <input id="symbolInput" class="h2 uppercase bold block col-12 mt1" name="symbol" type="text" v-model="pool.symbol" min="1" max="7">
      </div>
      <!-- graph types -->
      <div class="tbl-row h3 pt1 px2 pb2 border-top">
        <label class="block" for="graph">Price Rate</label>
        <div class="clearfix center mt4">
          <div class="col col-4 px1" @click="$emit('graph', 'flat')">
            <img src="./graph--flat.svg" alt="Graph: None">
            <label class="block mt1 mb2" for="graphChoice1">None</label>
            <input class="radio-btn" type="radio" value="flat" v-model="pool.graph" id="graphChoice1">
          </div>
          <div class="col col-4 px1" @click="$emit('graph', 'slow')">
            <img src="./graph--linear.svg" alt="Graph: Slow">
            <label class="block mt1 mb2" for="graphChoice1">Slow</label>
            <input class="radio-btn" type="radio" value="slow" v-model="pool.graph" id="graphChoice2">
          </div>
          <div class="col col-4 px1" @click="$emit('graph', 'fast')">
            <img src="./graph--exponential.svg" alt="Graph: Fast">
            <label class="block mt1 mb2" for="graphChoice1">Fast</label>
            <input class="radio-btn" type="radio" value="fast" v-model="pool.graph" id="graphChoice3">
          </div>
        </div>
      </div>
      <!-- select -->
      <div class="tbl-row pt1 px2 pb2 border-top" @click="baseOptionsOpen = !baseOptionsOpen">
        <label class="block h3" for="baseTokenSelect">Select Base Token</label>
        <div class="h2 mt1 bold">{{pool.baseToken}}</div>
      </div>
      <div v-show="baseOptionsOpen">
        <div v-for="option in baseOptions" :key="option" class="tbl-row border-top px2 flex items-center" :class="{'bg-blue white': pool.baseToken === option}" @click="pool.baseToken = option; baseOptionsOpen = false">
          <div class="h2 bold">{{option}}</div>
        </div>
      </div>
      <!-- select: custom addr -->
      <div v-show="showCustomAddr" class="tbl-row pt1 px2 pb2 border-top">
        <label class="h3 block" for="customAddressInput">Base Token Address</label>
        <input class="h2 bold mt1" type="text" id="customAddressInput" v-model="pool.customBaseTokenAddress" placeholder="0x0">
      </div>
    </div>
    <footer>
      <router-link to="/start/confirm">
        <div class="border-top border-bottom center mt4" :class="{'opacity-qrtr': !canProceed}">
          <div class="btn block h3">Next</div>
        </div>
      </router-link>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'NewPool',
  props: ['pool'],
  data () {
    return {
      baseOptionsOpen: false,
      baseOptions: ['DAI', 'Custom']
    }
  },
  computed: {
    showCustomAddr () {
      return this.pool.baseToken === 'Custom' && !this.baseOptionsOpen
    },
    canProceed () {
      const hasName = this.pool.name.length > 0
      const hasSymbol = this.pool.symbol.length > 0 && this.pool.symbol.length < 8
      const basePasses = this.pool.baseToken !== 'Custom' || (this.pool.baseToken === 'Custom' && this.pool.customBaseTokenAddress.length === 40)
      return hasName && hasSymbol && basePasses
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'ConfirmPool') return next()
    if (this.canProceed) return next()
  }
}
</script>
