<script setup lang="ts">
import SearchTool from './tool/SearchTool/index.vue'
import StatisticTool from './tool/StatisticTool/index.vue'
import RegionTool from './tool/RegionTool/index.vue'
import GeoSearch from './tool/GeoSearchTool/index.vue'
</script>

<template>
  <StatisticTool :position="{ top: 10, right: 170 }" />
  <RegionTool :position="{ top: 10, right:420 }" />
  <SearchTool :position="{ top: 10, right: 50 }" />
  <GeoSearch :position="{ top: 10, right: 290 }" />
</template>
