import type { App } from 'vue'
import LayerList from './LayerList.vue'

LayerList.install = (app: App) => {
  app.component(LayerList.name!, LayerList)
  return app
}

export { LayerList as default }
