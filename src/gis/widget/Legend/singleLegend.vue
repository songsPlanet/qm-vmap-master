<template>
  <div className="mapboxgl-legend-item">
    <img v-if="img" :src="img.dat" alt="" class="mapboxgl-legend-item-img" />
    <div v-else class="mapboxgl-legend-item-geo" :style="styleGeo"></div>
    <div class="mapboxgl-legend-item-text">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

interface TPropsOptions {
  title: string
  styleGeo: any
  img: any
}
const { title, styleGeo, img } = defineProps<TPropsOptions>()
</script>

<style scoped lang="less">
@import './index.less';
</style>
