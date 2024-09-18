import type { App } from 'vue'
import ToolWidget from './ToolWidget.vue'

ToolWidget.install = (app: App) => {
  app.component(ToolWidget.name!, ToolWidget)
  return app
}

export { ToolWidget as default }
