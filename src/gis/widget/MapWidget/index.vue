<script lang="ts" setup>
import { type TMapLayerSetting } from '@/gis/mapboxgl/typings/TLayerOptions'
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { MapContext } from '@/gis/context/mapContext'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import { type MapboxOptions } from 'mapbox-gl'
import { debounce } from '@/gis/utils'
import { cloneDeep } from 'lodash'
import 'mapbox-gl/dist/mapbox-gl.css'

interface TMapProps {
  mapOptions: MapboxOptions & {
    id: string
  }
  mapLayerSetting: TMapLayerSetting
  className?: string
}

const props = defineProps<TMapProps>()
const emit = defineEmits<{
  (e: 'onMapLoad', map: MapWrapper): void
}>()

const mapDom = ref<HTMLDivElement | null>(null)
const mapInit = ref<boolean>(false)
const map = ref<MapWrapper | null>()

const loadLayers = (map: any) => {
  map.load(cloneDeep(props.mapLayerSetting))
  mapInit.value = true
  emit('onMapLoad', map)
  if (MapContext) {
    MapContext.map = map
  }
}

onMounted(() => {
  // const map = new MapWrapper({
  map.value = new MapWrapper({
    pitch: 0,
    bearing: 0,
    attributionControl: false,
    renderWorldCopies: false,
    trackResize: true,
    preserveDrawingBuffer: true,
    ...props.mapOptions,
    container: mapDom.value as HTMLElement,
    style: {
      version: 8,
      glyphs: `/font/{fontstack}/{range}.pbf`,
      sources: {},
      layers: []
    }
  })
  map.value.on('load', () => loadLayers(map.value))
  map.value.on('click', (e: any) => {
    console.log(e.lngLat)
    console.log(map.value?.getCenter(), map.value?.getZoom(), map.value?.getBounds())
  })
  const resizeMap = debounce(() => {
    map.value?.resize()
  }, 10)

  const ro = new ResizeObserver(resizeMap)
  ro.observe(mapDom.value as Element)
})

onUpdated(() => {})

onUnmounted(() => {
  map.value?.off('load', () => loadLayers(map.value))
})
</script>

<template>
  <div ref="mapDom" :class="[props.className ? props.className : 'map-wrapper']" id="map-wrapper">
    <slot v-if="mapInit && MapContext"></slot>
  </div>
</template>

<style lang="less">
@import './index.less';
</style>
