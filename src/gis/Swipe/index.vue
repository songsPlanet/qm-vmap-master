<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/index.vue'
import BaseWidget from '@/gis/BaseWidget/index.vue'
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css'
import { useMapStore } from '@/gis/store/useMapStore'
import LayerList from '@/gis/LayerList/index.vue'
import MapWidget from '@/gis/MapWidget/index.vue'
import { MapWrapper } from 'qm-map-wrapper'
import Compare from 'mapbox-gl-compare'
import { ref, watch } from 'vue'
import './index.less'

type TSwipe = {
  position: TWidgetPosition
  icon?: string
}

const props = defineProps<TSwipe>()
const mapStore = useMapStore()

const compare = ref<any>(null)
const open = ref<boolean>(false)
const beforeMap = ref<MapWrapper | null>(null)
const afterMap = ref<MapWrapper | null>(null)

const SwipeIcon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTk3MzE2MzYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk2NTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzNy4xIDkxMC4yYzAgNy44IDcuOSAwIDAgMHogbS00OS4yIDBjLTcuOSAwIDAgNy44IDAgMHogbTQzOC40LTY1Mi40Yy0yLjctMi41LTYuNC00LTEwLjEtNC0yLjggMC01LjQgMC44LTcuOCAyLjRsLTM3MS4zIDI0M1YxMjMuMWMwLTcuOC0xNi43IDAtMjQuNiAwLTcuOSAwLTI0LjYtNy44LTI0LjYgMHYzNzYuMmwtMzcxLjMtMjQzYy0yLjUtMS42LTUuMS0yLjQtNy45LTIuNC02LjkgMC0xNC40IDUuNC0xNC40IDE0LjJ2NDk3LjRjMCA4LjcgNy41IDE0LjEgMTQuNSAxNC4xIDIuNyAwIDUuNC0wLjggNy44LTIuNGwzNzEuMy0yNDN2Mzc2LjJoNDkuMlY1MzRsMzcxLjMgMjQzYzIuNSAxLjYgNS4xIDIuNCA3LjkgMi40IDMuNyAwIDcuNC0xLjUgMTAuMS00IDItMS44IDQuMy01LjEgNC4zLTEwLjFWMjY4YzAtNS4xLTIuNC04LjMtNC40LTEwLjJ6IiBmaWxsPSIjMTQwQTBBIiBwLWlkPSI5NjUzIj48L3BhdGg+PC9zdmc+'

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
    newBeforeMap.setCenter(mapStore.map!.getCenter())
    newBeforeMap.setZoom(mapStore.map!.getZoom())
    newBeforeMap.setBearing(mapStore.map!.getBearing())
    newAfterMap.setPitch(mapStore.map!.getPitch())
  }
})
</script>

<template>
  <BaseWidget
    :name="'卷帘工具'"
    :position="props.position"
    :is-open-handle="true"
    :icon="props.icon ? props.icon : SwipeIcon"
    @open-handle="open = true"
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
          :map-options="{ ...mapStore.map!.options, id: 'swipeBeforeMap' }"
          :map-layer-setting="mapStore.map!.mapLayerSetting"
          @on-map-load="onBeforeMapLoadHandle"
          class-name="swipe-map-container"
        >
          <LayerList :position="{ top: 10, left: 10 }"></LayerList>
        </MapWidget>
        <MapWidget
          :map-options="{ ...mapStore.map!.options, id: 'swipeAfterMap' }"
          :map-layer-setting="mapStore.map!.mapLayerSetting"
          @on-map-load="onAftherMapLoadHandle"
          class-name="swipe-map-container"
        >
          <LayerList :position="{ top: 10, right: 10 }"></LayerList>
        </MapWidget>
      </div>
    </a-modal>
  </BaseWidget>
</template>
