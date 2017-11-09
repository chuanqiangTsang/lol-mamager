import Vue from 'vue'
import Router from 'vue-router'
import app from '../app.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: app
    },
    
  ]
})
