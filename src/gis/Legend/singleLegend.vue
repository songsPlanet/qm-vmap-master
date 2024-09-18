<script setup lang="ts">
import './Legend.less'

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
  <div v-for="items in props.propList" :key="items.text"  className="mapboxgl-legend-item">
    <img v-if="items.img" :src="items.img.data" alt="" class="mapboxgl-legend-item-img" />
    <div v-else class="mapboxgl-legend-item-geo" :style="items.style"></div>
    <div class="mapboxgl-legend-item-text">{{ items.text }}</div>
  </div>
</template>
