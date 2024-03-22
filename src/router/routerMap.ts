const routeMap = [
  {
    path: '/themeMap',
    name: 'themeMap',
    title: '农业一张图',
    component: () => import('../views/themeMap/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/',
    redirect: '/themeMap' //重定向
  }
]
export default routeMap
