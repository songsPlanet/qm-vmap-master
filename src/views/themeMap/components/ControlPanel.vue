<template>
  <div>
    <Swipe :position="position.swipe"></Swipe>
    <LayerList :position="position.layerList"></LayerList>
    <Legend :position="position.legend"></Legend>
    <Measure :position="position.measure"></Measure>
  </div>
</template>

<script setup lang="ts">
import { FullscreenControl, NavigationControl } from 'mapbox-gl'
import { onMounted, onUnmounted, ref, inject } from 'vue'
import LayerList from '@/gis/widget/LayerList/index.vue'
import { MapboxExportControl } from '@/gis/widget/Print'
import Measure from '@/gis/widget/Measure/index.vue'
import Legend from '@/gis/widget/Legend/index.vue'
import Swipe from '@/gis/widget/Swipe/index.vue'

const map = inject<any>('map')
const position = ref({
  swipe: { top: '225px', right: '10px' },
  measure: { top: '185px', right: '10px' },
  layerList: { top: '10px', left: '10px' },
  legend: { bottom: '10px', left: '10px' }
})

const navCtrl = new NavigationControl()
const fullCtrl = new FullscreenControl()
const exportCtrl = new MapboxExportControl()

onMounted(() => {
  map?.value.addControl(navCtrl, 'top-right')
  map?.value.addControl(fullCtrl, 'top-right')
  map?.value.addControl(exportCtrl, 'top-right')
})

onUnmounted(() => {
  map?.value.removeControl(navCtrl, 'top-right')
  map?.value.removeControl(fullCtrl, 'top-right')
  map?.value.removeControl(exportCtrl, 'top-right')
})
</script>
