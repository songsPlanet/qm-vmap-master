import type { App } from 'vue'
import PopupPanel from './PopupPanel.vue'

PopupPanel.install = (app: App) => {
  app.component(PopupPanel.name!, PopupPanel)
  return app
}

export { PopupPanel as default }
