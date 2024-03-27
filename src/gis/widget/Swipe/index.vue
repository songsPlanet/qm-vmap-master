<template>
  <BaseWidget
    :name="'卷帘工具'"
    :position="props"
    :icon="ControlIcons.Swipe"
    :openHandle="onOpenHandle"
  >
    <Modal
      title="卷帘对比"
      :open="open"
      :width="1250"
      :footer="null"
      destroyOnClose
      :maskClosable="false"
      @cancel="onCancelHandle"
    >
      <div id="wrapper" class="mapboxgl-swipe">
        <MapWidget
          class="swipe-map-container"
          :mapOptions="{ ...map!.options, id: 'swipeBeforeMap' }"
          :mapLayerSetting="map!.mapLayerSetting"
          :onMapLoad="onBeforeMapLoadHandle(map)"
        >
          <!-- <LayerList position={{ top: 10, left: 10 }} /> -->
        </MapWidget>
        <MapWidget
          class="swipe-map-container"
          :mapOptions="{ ...map!.options, id: 'swipeAfterMap' }"
          :mapLayerSetting="map!.mapLayerSetting"
          :onMapLoad="onAftherMapLoadHandle(map)"
        >
          <!-- <LayerList position={{ top: 10, left: 10 }} /> -->
        </MapWidget>
      </div>
    </Modal>
  </BaseWidget>
</template>

<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'
import { useMap } from '@/gis/context/mapContext'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import Compare from 'mapbox-gl-compare'
import { Modal } from 'ant-design-vue'
import { ref, watch } from 'vue'

const props = defineProps<TWidgetPosition>()
const { map } = useMap()
const open = ref(false)
const beforeMap = ref<MapWrapper | null>(null)
const afterMap = ref<MapWrapper | null>(null)

const onOpenHandle = () => {
  open.value = !open.value
}
const onCancelHandle = () => {
  open.value = false
}
const onBeforeMapLoadHandle = (map: any) => {
  beforeMap.value = map
}
const onAftherMapLoadHandle = (map: any) => {
  afterMap.value = map
}

watch([beforeMap, afterMap, open], ([newBeforeMap, newAfterMap]) => {
  if (newBeforeMap && newAfterMap) {
    const container = document.getElementById('wrapper')
    if (container) {
      const compare = new Compare(beforeMap.value, afterMap.value, container, {
        mousemove: false,
        orientation: 'vertical'
      })
      newBeforeMap.setCenter(map!.getCenter())
      newBeforeMap.setZoom(map!.getZoom())
      newBeforeMap.setBearing(map!.getBearing())
      newAfterMap.setPitch(map!.getPitch())
    }
  }
})
</script>

<style scoped lang="less">
@import './index.less';
</style>
