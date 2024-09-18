import type { App } from 'vue'
import MapWidget from './MapWidget.vue'

MapWidget.install = (app: App) => {
  app.component(MapWidget.name!, MapWidget)
  return app
}

export { MapWidget as default }
