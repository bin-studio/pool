<template>
  <div class="fixed z2 top-0 bottom-0 left-0 right-0 bg-white p4 overflow-scroll">
    <header>
      <figure class="pt4 pb2 mx-auto center">
        <img class="max-width-1" src="../../assets/art/deploy-contract.svg">
      </figure>
      <p class="h3 mt4 center">
        <b>We're Preparing Your Pool</b><br>
        Please be patient while we set up your pool. This may take some time as we deploy and confirm everything with the blockchain!
      </p>
    </header>
    <section class="border my4">
      <status-row status="processing">Sign Transaction</status-row>
      <status-row class="border-top" status="queued">Transaction Submitted</status-row>
      <status-row class="border-top" status="queued">Confirming the Transaction</status-row>
      <status-row class="border-top" status="queued">Transaction Complete</status-row>
    </section>
    <footer>
      <button class="btn rounded block col-12 bg-blue white">Please Wait</button>
    </footer>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import StatusRow from '../StatusRow'
export default {
  name: 'Deploy',
  props: ['pool'],
  components: {
    StatusRow
  },
  data () {
    return {

    }
  },
  mounted () {
    this.deploy(this.pool)
  },
  methods: {
    ...mapActions(['deploy'])
  }
}
</script>

<style lang="css" scoped>
</style>
