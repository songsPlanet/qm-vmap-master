<template>
  <div ref="mapDom" class="map-wrapper" id="map-wrapper">
    <!-- {mapInit && MapContext &&
    <div>{children}</div>
    } -->
    <slot v-if="mapInit && MapContext"></slot>
  </div>
</template>

<script lang="ts" setup>
import { type TMapLayerSettting } from '@/gis/mapboxgl/typings/TLayerOptions'
import { MapContext } from '@/gis/context/mapContext'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import { type MapboxOptions } from 'mapbox-gl'
import { debounce } from '@/gis/utils'
import 'mapbox-gl/dist/mapbox-gl.css'
import { onMounted, onUnmounted, ref } from 'vue'
import { cloneDeep } from 'lodash'

interface TMapProps {
  mapOptions: MapboxOptions & {
    id: string
  }
  mapLayerSettting: TMapLayerSettting
  // children?: React.ReactNode;
  onMapLoad?: (map: MapWrapper) => void
  className?: string
}
const props = defineProps<TMapProps>()
const mapDom = ref<HTMLDivElement | null>(null)
const mapInit = ref<boolean>(false)
const map = ref<MapWrapper | null>(null)

onMounted(() => {
  const map = new MapWrapper({
    //  map.value = new MapWrapper({
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

  const loadLayers = () => {
    map.load(cloneDeep(props.mapLayerSettting))
    mapInit.value = true
    props.onMapLoad?.(map)
    if (MapContext) {
      MapContext.map = map
    }
  }

  map.on('load', loadLayers)
  map.on('click', (e) => {
    console.log(e.lngLat)
    console.log(map.getCenter(), map.getZoom(), map.getBounds())
  })
  const resizeMap = debounce(() => {
    map.resize()
  }, 10)
  const ro = new ResizeObserver(resizeMap)
  ro.observe(mapDom.value as Element)

  // return () => {
  //   map.off('load', loadLayers)
  // }
})
</script>

<style scoped>
@import './index.css';
</style>
