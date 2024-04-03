<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import LayerList from '@/gis/widget/LayerList/index.vue'
import MapWidget from '@/gis/widget/MapWidget/index.vue'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'
import { useMap } from '@/gis/context/mapContext'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import Compare from 'mapbox-gl-compare'
import { inject, onMounted, ref, watch } from 'vue'

const props = defineProps<TWidgetPosition>()
// const { map } = useMap()
const map = inject<any>('map')
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
  if (newBeforeMap && newAfterMap) {
    const container = document.getElementById('swipeContainer')

    if (container) {
      const compare = new Compare(newBeforeMap, newAfterMap, container, {
        mousemove: false,
        orientation: 'vertical'
      })
      newBeforeMap.setCenter(map!.value.getCenter())
      newBeforeMap.setZoom(map!.value.getZoom())
      newBeforeMap.setBearing(map!.value.getBearing())
      newAfterMap.setPitch(map!.value.getPitch())
    }
  }
})

onMounted(() => {
  console.log('mounted')
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
      @onCancel="onCancelHandle"
    >
      <div id="swipeContainer" class="mapboxgl-swipe">
        <MapWidget
          :map-layer-setting="map!.mapLayerSetting"
          :map-options="{ ...map!.options, id: 'swipeBeforeMap' }"
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

<style lang="less" scoped>
@import './index.less';
</style>
