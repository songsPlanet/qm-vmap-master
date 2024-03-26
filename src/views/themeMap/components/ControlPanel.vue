<template>
  <!-- <div style="z-index: 1"></div> -->
</template>

<script setup lang="ts">
import { MapContext, useMap } from '@/gis/context/mapContext'
import { FullscreenControl, NavigationControl } from 'mapbox-gl'
import { onMounted } from 'vue'

// const map = MapContext.map
const { map } = useMap()
console.log(map)
const navCtrl = new NavigationControl()
const fullCtrl = new FullscreenControl()

onMounted(() => {
  map?.addControl(navCtrl, 'top-right')
  map?.addControl(fullCtrl, 'top-right')
})
</script>

<style scoped></style>
