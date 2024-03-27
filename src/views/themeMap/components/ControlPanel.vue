<template>
  <Measure :position="position.measure"></Measure>
  <Swipe :position="position.swipe"></Swipe>
</template>

<script setup lang="ts">
import { MapContext, useMap } from '@/gis/context/mapContext'
import { FullscreenControl, NavigationControl } from 'mapbox-gl'
import { onMounted, onUnmounted, ref } from 'vue'
import Measure from '@/gis/widget/Measure/index.vue'
import Swipe from '@/gis/widget/Swipe/index.vue'
// const map = MapContext.map
const { map } = useMap()
const position = ref({
  measure: {
    top: '145px',
    right: '10px'
  },
  swipe: {
    top: '185px',
    right: '10px'
  }
})
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

<style scoped></style>
