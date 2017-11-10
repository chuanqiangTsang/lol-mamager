import Vue from 'vue'
import Router from 'vue-router'
import app from '../app.vue'
import banner from '@/components/banner/banner'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: app
    },
    {
      path: '/banner',
      name: 'banner',
      component: banner
    },
    
  ]
})
