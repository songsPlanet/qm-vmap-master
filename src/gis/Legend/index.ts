import type { App } from 'vue'
import Legend from './Legend.vue'

Legend.install = (app: App) => {
  app.component(Legend.name!, Legend)
  return app
}

export { Legend as default }
