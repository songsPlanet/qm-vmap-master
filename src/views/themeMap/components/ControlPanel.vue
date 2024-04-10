<script setup lang="ts">
import { FullscreenControl, NavigationControl } from 'mapbox-gl'
import LayerList from '@/gis/widget/LayerList/index.vue'
import { MapboxExportControl } from '@/gis/widget/Print'
import Measure from '@/gis/widget/Measure/index.vue'
import { onMounted, onUnmounted, inject } from 'vue'
import Legend from '@/gis/widget/Legend/index.vue'
import Swipe from '@/gis/widget/Swipe/index.vue'

const map = inject<any>('map')

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

<template>
  <Swipe :position="{ top: '225px', right: '10px' }"></Swipe>
  <LayerList :position="{ top: '10px', left: '10px' }"></LayerList>
  <Legend :position="{ bottom: '10px', left: '10px' }"></Legend>
  <Measure :position="{ top: '185px', right: '10px' }"></Measure>
</template>
