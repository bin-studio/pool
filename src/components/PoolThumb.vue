<template>
  <article class="mb4">
    <section class="border" :class="{'rounded-bottom': !join, 'pool--collapsed': join}">
      <header class="flex justify-between items-stretch border-bottom">
        <div class="col col-6 px2 flex items-center"><span>Jump in the Pool</span></div>
        <!-- edit button -->
        <router-link :to="{name: 'Edit Pool', params: {address: pool.address}}" class="block col col-3 flex items-center border-left justify-center">
          <span>Edit</span>
        </router-link>
        <!-- trade button -->
        <div class="col col-3 flex items-stretch bg-dots border-left" @click="trade = !trade">
          <popout :pop="trade" class="col-12 flex items-center justify-center pointer">
            <span>Trade</span>
          </popout>
        </div>
      </header>
      <!-- image / trade view -->
      <figure class="bg-dots relative">
        <div class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden" @click="join = false">
          <pool-image v-show="!trade" :bg="true" :src="pool.heroImage" class="absolute top-0 left-0 col-12"></pool-image>
        </div>
        <popout v-show="trade" :pop="trade" class="bg-white">
          <trade></trade>
        </popout>
      </figure>
      <!-- text -->
      <footer class="center border-top">
        <div class="p3">
          <router-link :to="{name: 'Pool', params: {address: pool.address}}">
            <h1 class="h4 bold">{{ pool.name }}</h1>
          </router-link>
          <div class="mt1" v-html="pool.description"></div>
        </div>
        <button v-show="!join" class="btn block col-12 bg-blue white" @click="join = true">Join {{ pool.holders }} Supporters</button>
      </footer>
    </section>
    <!-- join -->
    <section v-show="join" class="pool__join">
      <div class="border rounded-bottom">
        <join :pool="pool"></join>
      </div>
    </section>
  </article>
</template>

<script>
import Popout from '@/components/Popout'
import Trade from './PoolTrade'
import Join from './PoolJoin'
import PoolImage from '@/components/Image'

export default {
  name: 'PoolThumb',
  props: {
    pool: { type: Object, required: true }
  },
  data () {
    return {
      trade: false,
      join: false
    }
  },
  watch: {
    join () {
      if (this.join) this.trade = false
    },
    trade () {
      if (this.trade) this.join = false
    }
  },
  components: { Popout, Trade, Join, PoolImage }
}
</script>

<style lang="css" scoped>
header{
  height:3rem;
}
figure{
  min-height:16em;
  .bg-img-cover{
    height:100%;
  }
  .pool--collapsed &{
    min-height:0;
    height:5.75rem;
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
