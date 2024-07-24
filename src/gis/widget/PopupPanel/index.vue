<script setup lang="ts">
import PopupWrapper from '@/gis/widget/PopupWrapper/index.vue'
import mapboxgl, { type LngLatLike } from 'mapbox-gl'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import { useMapStore } from '@/store/useMapStore'
import { onMounted, shallowRef } from 'vue'

export interface TPouperData {
  properties: any
  lngLat: LngLatLike
  title: string
  slotComponent: any
}

interface TPopupPanel {
  vector?: { id: string; title: string; slotComponent: any }[]
  wms?: {
    baseUrl: string
    layers: { id: string; title: string; slotComponent: any; layerName: string }[]
  }
}

const { map } = useMapStore()
const props = defineProps<TPopupPanel>()
const popupData = shallowRef<TPouperData | null>(null)

const onCloseHandle = () => {
  map.clearSelect()
  popupData.value = null
}

onMounted(() => {
 
  // 矢量图层添加交互效果
  props.vector?.forEach((d) => {
    map?.on('mouseenter', d.id, () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map?.on('mouseleave', d.id, () => {
      map.getCanvas().style.cursor = ''
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
        const slotComponent = props.vector.find((d) => feature.layer.id === d.id)!.slotComponent
        map.selectFeature(feature)
        popupData.value = {
          properties: feature.properties,
          lngLat: e.lngLat,
          title,
          slotComponent
        }
      }
    }
  }

  map?.on('click', async (e: any) => {
    vectorLayerClicked(map, e)
  })
})
</script>

<template>
  <div>
    <PopupWrapper
      v-if="popupData"
      :title="popupData.title"
      :lngLat="popupData.lngLat"
      :closeOnClick="false"
      @closeHandle="onCloseHandle"
    >
      <component
        :is="popupData.slotComponent"
        :data="popupData.properties"
        :key="popupData.properties"
      >
      </component>
    </PopupWrapper>
  </div>
</template>
