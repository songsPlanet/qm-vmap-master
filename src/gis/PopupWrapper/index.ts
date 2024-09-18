import type { App } from 'vue'
import PopupWrapper from './PopupWrapper.vue'

PopupWrapper.install = (app: App) => {
  app.component(PopupWrapper.name!, PopupWrapper)
  return app
}

export { PopupWrapper as default }
