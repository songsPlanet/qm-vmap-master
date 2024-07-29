<script lang="ts" setup>
import { type TMapLayerSetting } from '@/gis/mapboxgl/typings/TLayerOptions'
import { onMounted, onUnmounted, ref } from 'vue'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import { type MapboxOptions } from 'mapbox-gl'
import { debounce } from '@/gis/utils'
import 'mapbox-gl/dist/mapbox-gl.css'
import { cloneDeep } from 'lodash'
import { useMapStore } from '@/store/useMapStore'

interface TMapProps {
  mapOptions: MapboxOptions & {
    id: string
  }
  mapLayerSetting: TMapLayerSetting
  className?: string
}

const props = defineProps<TMapProps>()
const emit = defineEmits<{
  onMapLoad: [map: MapWrapper]
}>()

const mapDom = ref<HTMLDivElement | null>(null)
const mapInit = ref<boolean>(false)
const mapStore = useMapStore()

const loadLayers = (mapload: any) => {
  mapload.load(cloneDeep(props.mapLayerSetting))
  mapInit.value = true
  emit('onMapLoad', mapload)
  mapStore.updata(mapload)
}

onMounted(() => {
  const map = new MapWrapper({
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
  map.on('load', () => loadLayers(map))
  map.on('click', (e: any) => {
    console.log(e.lngLat)
    console.log(map.getCenter(), map.getZoom(), map.getBounds())
  })
  const resizeMap = debounce(() => {
    map.resize()
  }, 500)

  const ro = new ResizeObserver(resizeMap)
  ro.observe(mapDom?.value as Element)
})

onUnmounted(() => {
  mapStore.map?.off('load', () => loadLayers(mapStore.map))
})
</script>

<template>
  <div ref="mapDom" :class="[props.className ? props.className : 'map-wrapper']" id="map-wrapper">
    <slot v-if="mapInit && mapStore.map"></slot>
  </div>
</template>

<style lang="less">
@import './index.less';
</style>
