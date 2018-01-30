import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Start from '@/components/StartPool'
import Explore from '@/components/Explore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/start',
      name: 'Start',
      component: Start,
      meta: {
        type: 'page',
        title: 'Start a Pool'
      }
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore,
      meta: {
        type: 'page',
        title: 'Explore'
      }
    }
  ]
})
