import MapWrapper from '../mapboxgl/MapWrapper'

import { reactive } from 'vue'

export interface TMapContext {
  map: MapWrapper | null
}

// export const MapContext: TMapContext = reactive({ map: null })
export const MapContext: TMapContext = { map: null }

export const useMap: any = () => {
  const context = reactive(MapContext)
  if (!context) {
    throw Error('context不存在')
  }
  return context
}



