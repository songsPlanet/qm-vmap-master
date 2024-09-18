import type { App } from 'vue'
import Swipe from './Swipe.vue'

Swipe.install = (app: App) => {
  app.component(Swipe.name!, Swipe)
  return app
}

export { Swipe as default }
