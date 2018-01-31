<template>
  <article class="mb4">
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
        <div class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden" @click="join = false">
          <pool-image v-show="!graph" :bg="true" :src="pool.heroImage" class="absolute top-0 left-0 col-12"></pool-image>
        </div>
        <popout v-show="graph" :pop="graph" class="absolute-fill bg-white">
          <graph class="absolute-fill"></graph>
        </popout>
      </figure>
      <!-- text -->
      <footer class="center border-top">
        <div class="p3">
          <router-link :to="{name: 'Pool', params: {address: pool.address}}">
            <h1 class="bold">{{ pool.name }}</h1>
          </router-link>
          <div class="mt1" v-html="pool.description"></div>
        </div>
        <button v-show="!join" class="btn block col-12 bg-blue white" @click="join = true">Join {{ pool.holders }} Supporters</button>
      </footer>
    </section>
    <section v-show="join" class="pool__join">
      <div class="border rounded-bottom">
        <join></join>
      </div>
    </section>
  </article>
</template>

<script>
import Popout from '@/components/Popout'
import Graph from './PoolGraph'
import Join from './PoolJoin'
import PoolImage from '@/components/Image'

export default {
  name: 'PoolThumb',
  props: {
    pool: { type: Object, required: true }
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
  },
  components: { Popout, Graph, Join, PoolImage }
}
</script>

<style lang="css" scoped>
header{
  height:3rem;
}
figure{
  padding-bottom:16em;
  .bg-img-cover{
    height:100%;
  }
  .pool--collapsed &{
    padding-bottom:5.75rem;
    & .bg-img-cover{
      filter:blur(4px);
      height:120%;
      width:104%;
      transform:translateX(-2%) translateY(-10%);
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
