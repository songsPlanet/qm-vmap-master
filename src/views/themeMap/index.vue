<script lang="ts" setup>
import PopupPanel from '@/gis/widget/PopupPanel/index.vue'
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import ControlPanel from './components/ControlPanel.vue'
import GeoPopup from './components/Popup/GeoPopup.vue'
import { wh_sy_geo } from '../mapSetting/wh_sy_geo'
import { type LngLatLike } from 'mapbox-gl'
import mapSetting from './mapSetting'

const vector = [{ id: wh_sy_geo.id, title: wh_sy_geo.name, template: GeoPopup }]

const mapOptions = {
  id: 'themeMap',
  container: '',
  // center: [118.16333303406572, 31.108394692222518] as LngLatLike, // 芜湖
  center: [115.39047951086354, 33.2714096725866] as LngLatLike, // 界首市
  zoom: 9.5,
  maxZoom: 20
}
</script>

<template>
  <div class="mapContainer">
    <MapWidget :map-options="mapOptions" :map-layer-setting="mapSetting">
      <PopupPanel :vector="vector" />
      <ControlPanel />
    </MapWidget>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
