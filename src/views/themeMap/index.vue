<template>
  <div class="mapContainer">
    <MapWidget :mapOptions="mapOptions" :mapLayerSetting="mapSetting">
      <ControlPanel />
    </MapWidget>
  </div>
</template>

<script lang="ts" setup>
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import ControlPanel from './components/ControlPanel.vue'
import { type LngLatLike } from 'mapbox-gl'
import mapSetting from './mapSetting'

const mapOptions = {
  id: 'themeMap',
  container: '',
  // center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
  center: [115.39047951086354, 33.2714096725866] as LngLatLike, // 界首市
  zoom: 9.5,
  maxZoom: 20
}
</script>

<style lang="less">
@import './index.less';
</style>
