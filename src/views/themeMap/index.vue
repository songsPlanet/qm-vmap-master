<template>
  <div class="mapContainer">
    <MapWidget :mapOptions="mapOptions" :mapLayerSettting="mapSetting">
      <ControlPanel></ControlPanel>
    </MapWidget>
  </div>
</template>

<script lang="ts" setup>
import { type LngLatLike } from 'mapbox-gl'
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import mapSetting from './mapSetting'
import ControlPanel from './components/ControlPanel.vue'

const mapOptions = {
  id: 'themeMap',
  container: '',
  center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
  zoom: 8.7,
  maxZoom: 20
}
</script>

<style lang="less">
@import './index.less';
</style>
