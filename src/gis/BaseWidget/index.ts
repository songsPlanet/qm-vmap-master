import type { App } from 'vue'
import BaseWidget from './BaseWidget.vue'
export type { TWidgetPosition } from './BaseWidget.vue'

BaseWidget.install = (app: App) => {
  app.component(BaseWidget.name!, BaseWidget)
  return app
}

export { BaseWidget as default }
