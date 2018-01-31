<template>
  <article class="flex flex-column justify-between">
    <header class="border-bottom bold">
      <div class="col col-4 py1 px2 uppercase">BUCK</div>
      <div class="col col-4 py1 px2 border-left">Exponential</div>
      <div class="col col-4 py1 px2 border-left">DAI</div>
    </header>
    <figure class="relative flex-item-fill">
      <div class="absolute top-0 left-0 py1 px2 z2">Supply 3459 of 4950</div>
      <div class="absolute-fill z1"></div>
    </figure>
    <footer class="border-top">
      <div class="col col-4 p2">
        <div>Price (USD)</div>
        <div class="bold mt1">$314 <span class="red">-3%</span></div>
      </div>
      <div class="col col-4 p2 border-left">
        <div>Supporters</div>
        <div class="bold mt1">438</div>
      </div>
      <div class="col col-4 p2 border-left">
        <div>Age</div>
        <div class="bold mt1">3 Weeks</div>
      </div>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'Graph',
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
