<script lang="ts" setup>
import PopupPanel from '@/gis/widget/PopupPanel/index.vue'
import FieldPopup from './components/Popup/FieldPopup.vue'
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import ControlPanel from './components/ControlPanel.vue'
import GeoPopup from './components/Popup/GeoPopup.vue'
import { useRegionStore } from '@/store/useRegionStore'
import { wh_sy_geo } from '../mapSetting/wh_sy_geo'
import { mapOptions } from '@/gis/widget/constant'
import ToolPanel from './components/ToolPanel.vue'
import { field_vt } from '../mapSetting/field_vt'
import { queryRegionList } from '@/api/map'
import mapSetting from './mapSetting'
import { onMounted } from 'vue'
import './index.less'

const vector = [
  { id: wh_sy_geo.id, title: wh_sy_geo.name, slotComponent: GeoPopup },
  { id: field_vt.id, title: field_vt.name, slotComponent: FieldPopup }
]

const useRegin = useRegionStore()

onMounted(() => {
  queryRegionList({ level: 5 }).then((res: any) => {
    useRegin.loadRgion(res.data)
    useRegin.upateCurrent({ label: '安徽省', value: '34' })
  })
})
</script>

<template>
  <div class="mapContainer">
    <MapWidget :map-options="mapOptions" :map-layer-setting="mapSetting">
      <PopupPanel :vector="vector" />
      <ControlPanel />
      <ToolPanel />
    </MapWidget>
  </div>
</template>
