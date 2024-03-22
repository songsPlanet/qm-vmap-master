import { createRouter, createWebHistory } from 'vue-router'
import routeMap from './routerMap'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      meta: {
        title: '首页',
        keepalive: true
      },
      children: routeMap
    }
  ]
})

export default router
