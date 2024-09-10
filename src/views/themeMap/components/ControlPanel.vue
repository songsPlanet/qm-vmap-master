<script setup lang="ts">
import InitialLocation from '@/gis/widget/InitialLocation/index.vue'
import { FullscreenControl, NavigationControl } from 'mapbox-gl'
import LayerList from '@/gis/widget/LayerList/index.vue'
import Measure from '@/gis/widget/Measure/index.vue'
import Legend from '@/gis/widget/Legend/index.vue'
import { useMapStore } from '@/store/useMapStore'
import Swipe from '@/gis/widget/Swipe/index.vue'
import Location from '@/gis/widget/Location/index.vue'
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
  <Location :position="{ top: 265, right: 10 }"></Location>
  <Swipe :position="{ top: 225, right: 10 }"></Swipe>
  <Measure :position="{ top: 305, right: 10 }"></Measure>
  <InitialLocation :position="{ top: 185, right: 10 }"></InitialLocation>
</template>
