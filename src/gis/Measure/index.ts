import type { App } from 'vue'
import Measure from './Measure.vue'

Measure.install = (app: App) => {
  app.component(Measure.name!, Measure)
  return app
}

export { Measure as default }
