<script setup lang="ts">
import { onMounted, ref, type CSSProperties } from 'vue'
import { GISToolHelper } from 'qm-map-wrapper'
import { Map } from 'mapbox-gl'

interface TGeoMap {
  style: CSSProperties
  data: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string
}
const props = defineProps<TGeoMap>()

const mapDom = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const map = new Map({
    pitch: 0,
    bearing: 0,
    attributionControl: false,
    renderWorldCopies: false,
    trackResize: true,
    preserveDrawingBuffer: true,
    container: mapDom.value as HTMLElement,
    interactive: false,
    dragPan: false,
    dragRotate: false,
    doubleClickZoom: false,
    style: {
      version: 8,
      glyphs: '/font/{fontstack}/{range}.pbf',
      sources: {},
      layers: []
    }
  })
  const loadLayers = () => {
    map.addSource('geoMap-ds', {
      type: 'geojson',
      data: props.data
    })
    map.addLayer({
      id: 'geoMap-lyr',
      type: 'fill',
      paint: {
        'fill-color': '#f29327',
        'fill-opacity': 0.6,
        'fill-outline-color': '#e94c08'
      },
      source: 'geoMap-ds'
    })

    const bounds = GISToolHelper.getFeatureBoundingBox(props.data)
    const center = bounds.getCenter()
    map.setCenter(center)
    map.setZoom(16.5)
  }
  map.on('load', loadLayers)
})
</script>

.
<template>
  <div :style="style" ref="mapDom"></div>
</template>
