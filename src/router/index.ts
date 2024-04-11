import { createRouter, createWebHistory } from 'vue-router'
import routeMap from './routerMap'

// 引入createRouter
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),//路由器的工作模式
  routes: [//一个个路由规则
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
