<template>
  <article>
    <section class="border" :class="{'rounded-bottom': !join, 'pool--collapsed': join}">
      <header class="flex justify-between items-stretch border-bottom">
        <div class="col col-9 px2 flex items-center"><span>Jump in the Pool</span></div>
        <div class="col col-3 flex items-stretch bg-dots border-left" @click="graph = !graph">
          <popout :pop="graph" class="col-12 flex items-center justify-center">
            <span>Graph</span>
          </popout>
        </div>
      </header>
      <figure class="bg-dots relative">
        <div class="absolute bg-img bg-img-cover" :style="'background-image:' + thumb" @click="join = false"></div>
          <popout v-show="graph" :pop="graph" class="absolute-fill bg-white">
            <!-- Graph -->
          </popout>
      </figure>
      <!-- text -->
      <footer class="center border-top">
        <div class="p3">
          <router-link :to="{name: 'Pool', params: {address: address}}">
            <h1 class="bold">{{name}}</h1>
          </router-link>
          <div class="mt1" v-html="about"></div>
        </div>
        <button v-show="!join" class="btn block col-12 bg-blue white" @click="join = true">Join {{holders}} Supporters</button>
      </footer>
    </section>
    <section v-show="join" class="pool__join">
      <div class="border">
        <!-- Subscribe -->
      </div>
    </section>
  </article>
</template>

<script>
import Popout from './Popout'
export default {
  name: 'PoolThumb',
  props: ['address', 'name', 'symbol', 'type', 'base', 'thumb', 'about', 'holders'],
  components: {
    Popout
  },
  data () {
    return {
      graph: false,
      join: false
    }
  },
  watch: {
    join () {
      if (this.join) this.graph = false
    },
    graph () {
      if (this.graph) this.join = false
    }
  }
}
</script>

<style lang="css" scoped>
header{
  height:3rem;
}
figure{
  min-height:14.5rem;
  .bg-img{
    height:110%;
    width:110%;
    top:-5%;
    left:-5%;
  }
  .pool--collapsed &{
    min-height:0px;
    height:5.75rem;
    & .bg-img{
      filter:blur(10px);
    }
  }
}
.pool__join{
  &:before{
    content:'';
    display:block;
    width:50%;
    height:3rem;
    border-right-style:solid;
    border-width:1px;
  }
}
</style>
