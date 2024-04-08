<script setup lang="ts">
import { defineProps } from 'vue'

interface TPropsOptions {
  propList: {
    text: string
    style: any
    img: any
  }[]
}

const props = defineProps<TPropsOptions>()
</script>

<template>
  <div className="mapboxgl-legend-item" v-for="items in props.propList" :key="items.text">
    <img v-if="items.img" :src="items.img.data" alt="" class="mapboxgl-legend-item-img" />
    <div v-else class="mapboxgl-legend-item-geo" :style="items.style"></div>
    <div class="mapboxgl-legend-item-text">{{ items.text }}</div>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
