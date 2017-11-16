import Vue from 'vue'
import Router from 'vue-router'
import app from '../app.vue'
import banner from '@/components/banner/banner'
import news from '@/components/news/news'
import editNews from '@/components/news/edit'
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
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/editNews',
      name: 'editNews',
      component: editNews
    },
  ]
})
