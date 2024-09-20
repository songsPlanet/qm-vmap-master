import type { App } from 'vue'
import DrawWidget from './DrawWidget.vue'

DrawWidget.install = (app: App) => {
  app.component(DrawWidget.name!, DrawWidget)
  return app
}

export { DrawWidget as default }
