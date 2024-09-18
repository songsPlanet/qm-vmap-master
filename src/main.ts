import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import * as Icons from '@ant-design/icons-vue'
import { createPinia } from 'pinia'
import './mock/index'
// new Vue()创建实例=》变成 createApp（）
// 将创建实例进行的封装
const app = createApp(App as any)

const pinia = createPinia()

const icons: any = Icons

// eslint-disable-next-line guard-for-in
for (const i in icons) {
  app.component(i, icons[i] as any)
}

app.use(Antd)
// 使用路由器
app.use(router)
// 使用pinia
app.use(pinia)
// 设置挂载点#app
app.mount('#app')
