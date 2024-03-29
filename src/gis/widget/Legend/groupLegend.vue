<script setup lang="ts">
import singleLegend from './singleLegend.vue'
import { defineProps } from 'vue'
interface TWidgetOptions {
  groupList: any[]
}
const { groupList } = defineProps<TWidgetOptions>()
</script>

<template>
  <div className="mapboxgl-legend-group" v-for="list in groupList" :key="list.title">
    <div className="mapboxgl-legend-tilte">{{ list.title }}</div>
    <singleLegend :propList="list.items" />
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
