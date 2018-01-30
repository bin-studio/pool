<template>
  <div class="fixed z2 top-0 bottom-0 left-0 right-0 bg-white p4 overflow-scroll">
    <header>
      <figure class="pt4 pb2 mx-auto center">
        <img class="max-width-1" src="../../assets/art/deploy-contract.svg">
      </figure>
      <p class="h3 mt4">
        <b>We're Preparing Your Pool</b><br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi ex. Phasellus fringilla, felis in euismod consequat. Fringilla, felis in euismod consequat consectetur adipiscing elit. Maecenas in mi ex elit.
      </p>
    </header>
    <section class="border my4">
      <status-row status="passed">Transaction Signed</status-row>
      <status-row class="border-top" status="processing">Transaction Submitted</status-row>
      <status-row class="border-top" status="queued">Confirming the Transaction</status-row>
      <status-row class="border-top" status="queued">Transaction Complete</status-row>
    </section>
    <footer>
      <button class="btn rounded block col-12 bg-blue white">Please Wait</button>
    </footer>
  </div>
</template>

<script>
import StatusRow from '../StatusRow'
export default {
  name: 'Deploy',
  components: {
    StatusRow
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
