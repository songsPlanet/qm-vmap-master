<template>
  <div class="mapboxgl-legend-group">
    <div className="mapboxgl-legend-group">
      <div className="mapboxgl-legend-tilte">
        {{ title }}
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

interface TWidgetOptions {
  title: string 

}
const { title } = defineProps<TWidgetOptions>()
</script>

<style scoped lang="less">
@import './index.less';
</style>
