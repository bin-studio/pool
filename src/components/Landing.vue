<template>
  <section class="page p3 flex flex-column justify-between">
    <div class="relative flex-item-fill">
      <div class="absolute top-0 left-0 right-0 bottom-0 icon icon-pool"></div>
    </div>
    <footer>
      <router-link :to="{name: 'Start'}">
        <div class="mt3 border-top border-bottom">
          <div class="btn block center"><span class="h3">Start a Pool</span></div>
        </div>
      </router-link>
      <router-link :to="{name: 'Explore'}">
        <div class="mt2">
          <div class="btn block center bg-blue white"><span class="h3">Explore</span></div>
        </div>
      </router-link>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'Landing',
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>