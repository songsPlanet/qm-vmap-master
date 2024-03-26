import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import * as Icons from '@ant-design/icons-vue'

const app = createApp(App as any)

const icons: any = Icons

for (const i in icons) {
  app.component(i, icons[i] as any)
}

app.use(Antd)
app.use(router)

app.mount('#app')
