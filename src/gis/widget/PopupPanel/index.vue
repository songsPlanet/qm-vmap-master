<script setup lang="ts">
import { VueElement, onMounted, inject, shallowRef } from 'vue'
import PopupWrapper from '@/gis/widget/PopupWrapper/index.vue'
import mapboxgl, { type LngLatLike } from 'mapbox-gl'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'

export type TPouperData = {
  properties: any
  lngLat: LngLatLike
  title: string
  template: VueElement
}

type TPopupPanel = {
  vector: { id: string; title: string; template: VueElement }[]
}

const map = inject<any>('map')
const props = defineProps<TPopupPanel>()
const popupData = shallowRef<TPouperData | null>()

const onCloseHandle = () => {
  map.value?.clearSelect()
  popupData.value = null
}

onMounted(() => {
  // 矢量图层添加交互效果
  props.vector?.forEach((d) => {
    map.value?.on('mouseenter', d.id, () => {
      map.value.getCanvas().style.cursor = 'pointer'
    })
    map.value?.on('mouseleave', d.id, () => {
      map.value.getCanvas().style.cursor = ''
    })
  })

  const vectorLayerClicked = (map: MapWrapper, e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (props.vector) {
      const ids = props.vector
        .filter((d) => {
          const flag = map?.getLayerList().find((f) => f.options.id === d.id && f.options.isAdd)
          return flag
        })
        .map((d) => d.id)
      const features = map.queryRenderedFeatures(e.point, { layers: ids })
      if (features.length) {
        const feature = features[0]
        const title = props.vector.find((d) => feature.layer.id === d.id)!.title
        const template = props.vector.find((d) => feature.layer.id === d.id)!.template
        map.selectFeature(feature)
        popupData.value = {
          properties: feature.properties,
          lngLat: e.lngLat,
          title,
          template
        }
      }
    }
  }

  map.value?.on('click', async (e: any) => {
    vectorLayerClicked(map.value, e)
  })
})
</script>

<template>
  <div>
    <PopupWrapper
      v-if="popupData"
      :closeOnClick="false"
      :popupData="popupData"
      @closeHandle="onCloseHandle"
    >
    </PopupWrapper>
  </div>
</template>

<style scoped></style>
