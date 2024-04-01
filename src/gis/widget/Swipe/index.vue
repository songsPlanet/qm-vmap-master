<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import LayerList from '@/gis/widget/LayerList/index.vue'
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'
import { useMap } from '@/gis/context/mapContext'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import Compare from 'mapbox-gl-compare'
import { ref, watch } from 'vue'

const props = defineProps<TWidgetPosition>()
const { map } = useMap()
const open = ref<boolean>(false)
const beforeMap = ref<MapWrapper | null>(null)
const afterMap = ref<MapWrapper | null>(null)
const position = ref({
  left: { top: '10px', left: '10px' },
  right: { top: '10px', right: '10px' }
})

const onOpenHandle = () => {
  open.value = true
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

watch([beforeMap, afterMap], ([newBeforeMap, newAfterMap]) => {
  if (beforeMap.value && afterMap.value) {
    const container = document.getElementById('swipeContainer')
    if (container) {
      const compare = new Compare(beforeMap.value, afterMap.value, container, {
        mousemove: false,
        orientation: 'vertical'
      })
      beforeMap?.value?.setCenter(map!.getCenter())
      beforeMap?.value?.setZoom(map!.getZoom())
      beforeMap?.value?.setBearing(map!.getBearing())
      afterMap?.value?.setPitch(map!.getPitch())
    }
  }
})
</script>

<template>
  <BaseWidget
    :name="'卷帘工具'"
    :position="props"
    :icon="ControlIcons.Swipe"
    :openHandle="onOpenHandle"
  >
    <a-modal
      title="卷帘对比"
      width="1250px"
      :footer="null"
      v-model:open="open"
      :destroyOnClose="true"
      :maskClosable="false"
      @cancel="onCancelHandle"
    >
      <div id="swipeContainer" class="mapboxgl-swipe">
        <MapWidget
          class="swipe-map-container"
          :mapOptions="{ ...map!.options, id: 'swipeBeforeMap' }"
          :mapLayerSetting="map!.mapLayerSetting"
          :onMapLoad="onBeforeMapLoadHandle(map)"
        >
          <LayerList :position="position.left"></LayerList>
        </MapWidget>
        <MapWidget
          class="swipe-map-container"
          :mapOptions="{ ...map!.options, id: 'swipeAfterMap' }"
          :mapLayerSetting="map!.mapLayerSetting"
          :onMapLoad="onAftherMapLoadHandle(map)"
        >
          <LayerList :position="position.right"></LayerList>
        </MapWidget>
      </div>
    </a-modal>
  </BaseWidget>
</template>

<style scoped lang="less">
@import './index.less';
</style>
