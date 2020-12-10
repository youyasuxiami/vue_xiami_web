import Vue from 'vue'
import Router from 'vue-router'

// 写路由导入的页面
import HomeIndex from '@/views/home'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeIndex,
      children: [
        { path: '/', component: () => import('@/views/index') },
        { path: '/info', component: () => import('@/views/info') },
        { path: '/about', component: () => import('@/views/about') },
        { path: '/sort', component: () => import('@/views/sort') },
        { path: '/classify', component: () => import('@/views/classify') },
        { path: '/tag', component: () => import('@/views/tag') },
        { path: '/messageBoard', component: () => import('@/views/messageBoard') }
      ]
    },
    { path: '/404', component: () => import('@/views/404') },
    { path: '/500', component: () => import('@/views/500') },
    { path: '/502', component: () => import('@/views/502') },
    { path: '/*', component: () => import('@/views/404') }
  ]
});
