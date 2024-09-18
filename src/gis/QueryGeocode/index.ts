import type { App } from 'vue'
import QueryGeocode from './QueryGeocode.vue'

QueryGeocode.install = (app: App) => {
  app.component(QueryGeocode.name!, QueryGeocode)
  return app
}

export { QueryGeocode as default }
