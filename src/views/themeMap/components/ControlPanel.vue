<script setup lang="ts">
import InitialLocation from '@/components/Map/InitialLocation/index.vue'
import { FullscreenControl, NavigationControl } from 'mapbox-gl'
import { useMapStore } from '@/gis/store/useMapStore'
import LayerList from '@/gis/LayerList/index.vue'
import Measure from '@/gis/Measure/index.vue'
import Legend from '@/gis/Legend/index.vue'
import Swipe from '@/gis/Swipe/index.vue'

import { onMounted, onUnmounted } from 'vue'

const { map } = useMapStore()

const navCtrl = new NavigationControl()
const fullCtrl = new FullscreenControl()

onMounted(() => {
  map?.addControl(navCtrl, 'top-right')
  map?.addControl(fullCtrl, 'top-right')
})

onUnmounted(() => {
  map?.removeControl(navCtrl, 'top-right')
  map?.removeControl(fullCtrl, 'top-right')
})
</script>

<template>
  <Legend :position="{ bottom: 10, left: 10 }"></Legend>
  <LayerList :position="{ top: 10, left: 10 }"></LayerList>
  <Measure :position="{ top: 305, right: 10 }"></Measure>
  <Swipe :position="{ top: 225, right: 10 }"></Swipe>
  <InitialLocation :position="{ top: 185, right: 10 }"></InitialLocation>
</template>
