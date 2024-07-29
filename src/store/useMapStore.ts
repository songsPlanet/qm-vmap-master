import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import { defineStore } from 'pinia'

export const useMapStore :any= defineStore('mapStore', {
  state: () => ({
    map: null as MapWrapper | null // 明确指定map的类型为MapWrapper或null
  }),
  actions: {
    updata(newMap: MapWrapper) {
      this.$state.map = newMap
    }
  },
  // 如果需要，可以添加getters来从map中提取信息
  getters: {
    // 示例getter
    getMapLayers: (state) => {
      return state.map?.layers // 使用可选链来安全地访问layers
    }
  }
})
