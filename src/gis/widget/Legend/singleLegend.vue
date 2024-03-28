<template>
  <div className="mapboxgl-legend-item" v-for="items in propList" :key="items.title">
    <img v-if="items.img" :src="items.img.data" alt="" class="mapboxgl-legend-item-img" />
    <div v-else class="mapboxgl-legend-item-geo" :style="items.styleGeo"></div>
    <div class="mapboxgl-legend-item-text">{{ items.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface TPropsOptions {
  propList: {
    title: string
    styleGeo: any
    img: any
  }[]
}

const { propList } = defineProps<TPropsOptions>()
console.log('`11', propList)
</script>

<style scoped lang="less">
@import './index.less';
</style>
