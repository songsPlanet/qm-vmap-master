<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import LayerList from '@/gis/widget/LayerList/index.vue'
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import { inject, ref, watch } from 'vue'
import Compare from 'mapbox-gl-compare'

const props = defineProps<TWidgetPosition>()
const map = inject<any>('map')
const compare = ref<any>(null)
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

const onBeforeMapLoadHandle = (map: any) => {
  beforeMap.value = map
}
const onAftherMapLoadHandle = (map: any) => {
  afterMap.value = map
}

watch([beforeMap, afterMap], (value) => {
  const [newBeforeMap, newAfterMap] = value
  if (newBeforeMap && newAfterMap) {
    const container = document.getElementById('swipeContainer')
    if (container) {
      if (compare.value) {
        compare.value.remove()
      }
      compare.value = new Compare(newBeforeMap, newAfterMap, container, {
        mousemove: false,
        orientation: 'vertical'
      })
    }
    newBeforeMap.setCenter(map!.value.getCenter())
    newBeforeMap.setZoom(map!.value.getZoom())
    newBeforeMap.setBearing(map!.value.getBearing())
    newAfterMap.setPitch(map!.value.getPitch())
  }
})
</script>

<template>
  <BaseWidget
    :name="'卷帘工具'"
    :position="props"
    :isOpenHandle="true"
    :icon="ControlIcons.Swipe"
    @openHandle="onOpenHandle"
  >
    <a-modal
      title="卷帘对比"
      :width="1250"
      :footer="null"
      v-model:open="open"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <div id="swipeContainer" class="mapboxgl-swipe">
        <MapWidget
          :map-options="{ ...map!.options, id: 'swipeBeforeMap' }"
          :map-layer-setting="map!.mapLayerSetting"
          @on-map-load="onBeforeMapLoadHandle"
          class-name="swipe-map-container"
        >
          <LayerList :position="position.left"></LayerList>
        </MapWidget>
        <MapWidget
          :map-options="{ ...map!.options, id: 'swipeAfterMap' }"
          :map-layer-setting="map!.mapLayerSetting"
          @on-map-load="onAftherMapLoadHandle"
          class-name="swipe-map-container"
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

<style scoped lang="css">
@import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.4.0/mapbox-gl-compare.css';
</style>
