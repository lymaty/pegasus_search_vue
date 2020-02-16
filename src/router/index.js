import Vue from 'vue'
import Router from 'vue-router'
import PegasusDemo from '@/components/PegasusDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PegasusDemo',
      component: PegasusDemo
    },

  ]
})
