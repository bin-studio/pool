import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Start from '@/components/Start'
import NewPool from '@/components/Start/NewPool'
import ConfirmPool from '@/components/Start/ConfirmPool'
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
      component: Start,
      children: [
        {
          path: '/',
          name: 'NewPool',
          component: NewPool,
          meta: {
            type: 'page',
            title: 'Start a Pool'
          }
        },
        {
          path: 'confirm',
          name: 'ConfirmPool',
          component: ConfirmPool,
          meta: {
            type: 'page',
            title: 'Start a Pool'
          }
        }
      ]
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
