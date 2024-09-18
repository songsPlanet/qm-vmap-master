<script lang="ts" setup>
import { MapWrapper, GISToolHelper, getPulsingDot } from 'qm-map-wrapper'
import type {  TMapLayerSetting } from 'qm-map-wrapper'
import { useMapStore } from '@/gis/store/useMapStore'
import { onMounted, onUnmounted, ref } from 'vue'
import type {  MapboxOptions } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { cloneDeep } from 'lodash'
import './MapWidget.less';

interface TMapProps {
  mapOptions: MapboxOptions & {
    id: string
  }
  mapLayerSetting: TMapLayerSetting
  className?: string
}

const props = defineProps<TMapProps>()
const emit = defineEmits<{
  onMapLoad: [map: any]
}>()

const mapDom = ref<HTMLDivElement | null>(null)
const mapInit = ref<boolean>(false)
const mapStore = useMapStore()

const loadLayers = (mapload: any) => {
  mapload.load(cloneDeep(props.mapLayerSetting))
  mapInit.value = true
  // 添加动态点图标
  const redAnimationImg = getPulsingDot(mapload)
  mapload.addImage('redAnimationImg', redAnimationImg, { pixelRatio: 2 })
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
  const resizeMap = GISToolHelper.debounce(() => {
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
  <div id="map-wrapper" ref="mapDom"   :class="[props.className ? props.className : 'map-wrapper']" >
    <slot v-if="mapInit && mapStore.map"></slot>
  </div>
</template>

