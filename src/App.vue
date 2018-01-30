<template>
  <div id="app" class="blue">
    <header class="fixed z1 top-0 left-0 right-0 pt4 px4 pb0 bg-white border-box">
      <div class="flex flex-wrap items-center border-top border-bottom">
        <div class="col-12 flex justify-between items-center">
          <template v-if="$route.name == 'Landing'">
            <h1 class="h1">Pool</h1>
          </template>
          <template v-else>
            <div class="col col-2">
              <a class="icon icon-back block pointer" @click="$router.go(-1)"></a>
            </div>
            <div class="col col-8 center h1">{{$route.meta.title}}</div>
          </template>
          <div class="col col-2 flex justify-end">
            <menu-icon @click="menu = !menu"></menu-icon>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuIcon from '@/components/MenuIcon'
export default {
  name: 'App',
  components: {
    MenuIcon
  },
  data () {
    return {
      menu: false
    }
  }
}
</script>

<style>
  @import 'style/imports';
  @import 'style/global';

  #app > header > div{
    height:6rem;
  }

  #app .page{
    box-sizing:border-box;
    min-height:100vh;
    padding-top:10rem;
  }
</style>
