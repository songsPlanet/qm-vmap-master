<script lang="ts" setup>
import { type TMapLayerSetting } from '@/gis/mapboxgl/typings/TLayerOptions'
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { MapContext } from '@/gis/context/mapContext'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import { type MapboxOptions } from 'mapbox-gl'
import { debounce } from '@/gis/utils'
import 'mapbox-gl/dist/mapbox-gl.css'
import { cloneDeep } from 'lodash'

interface TMapProps {
  mapOptions: MapboxOptions & {
    id: string
  }
  mapLayerSetting: TMapLayerSetting
  onMapLoad?: (map: MapWrapper) => void
  className?: string
}
const { mapOptions, mapLayerSetting, onMapLoad, className } = defineProps<TMapProps>()
const mapDom = ref<HTMLDivElement | null>(null)
const mapInit = ref<boolean>(false)
let map: any

const loadLayers = () => {
  map.load(cloneDeep(mapLayerSetting))
  mapInit.value = true
  onMapLoad?.(map)
  if (MapContext) {
    MapContext.map = map
  }
}

onMounted(() => {
  map = new MapWrapper({
    pitch: 0,
    bearing: 0,
    attributionControl: false,
    renderWorldCopies: false,
    trackResize: true,
    preserveDrawingBuffer: true,
    ...mapOptions,
    container: mapDom.value as HTMLElement,
    style: {
      version: 8,
      glyphs: `/font/{fontstack}/{range}.pbf`,
      sources: {},
      layers: []
    }
  })

  map.on('load', loadLayers)
  map.on('load', loadLayers)
  map.on('click', (e: any) => {
    console.log(e.lngLat)
    console.log(map.getCenter(), map.getZoom(), map.getBounds())
  })
  const resizeMap = debounce(() => {
    map.resize()
  }, 10)

  const ro = new ResizeObserver(resizeMap)
  ro.observe(mapDom.value as Element)
})

onUnmounted(() => {
  map.off('load', loadLayers)
})
</script>

<template>
  <div ref="mapDom" class="map-wrapper" id="map-wrapper">
    <slot v-if="mapInit && MapContext"></slot>
  </div>
</template>


<style scoped lang="less">
@import './index.less';
</style>
