<script setup lang="ts">
import { useMap } from '@/gis/context/mapContext'
import MapWrapper from '@/gis/mapboxgl/MapWrapper'
import PopupWrapper from '@/gis/widget/PopupWrapper/index.vue'
import mapboxgl, { type LngLatLike } from 'mapbox-gl'
import { VueElement, onMounted, ref } from 'vue'

interface TPouperData {
  properties: any
  lngLat: LngLatLike
  title: string
  template: VueElement
}

interface TPopupPanel {
  vector?: { id: string; title: string; template: VueElement }[]
  wms?: {
    baseUrl: string
    layers: { id: string; title: string; template: VueElement; layerName: string }[]
  }
}

const { vector, wms } = defineProps<TPopupPanel>()

const popupData = ref<TPouperData | undefined>()
const { map } = useMap()
const onCloseHandle = () => {
  map?.clearSelect()
  popupData.value = undefined
}

onMounted(() => {
  // 矢量图层添加交互效果
  vector?.forEach((d) => {
    map?.on('mouseenter', d.id, () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map?.on('mouseleave', d.id, () => {
      map.getCanvas().style.cursor = ''
    })
  })
  const vectorLayerClicked = (map: MapWrapper, e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
    if (vector) {
      const ids = vector
        .filter((d) => {
          const flag = map?.getLayerList().find((f) => f.options.id === d.id && f.options.isAdd)
          return flag
        })
        .map((d) => d.id)
      const features = map.queryRenderedFeatures(e.point, { layers: ids })
      if (features.length) {
        const feature = features[0]
        const title = vector.find((d) => feature.layer.id === d.id)!.title
        const template = vector.find((d) => feature.layer.id === d.id)!.template
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
  const restLayerClicked = async (
    map: MapWrapper,
    e: mapboxgl.MapMouseEvent & mapboxgl.EventData
  ) => {
    // if (wms) {
    //   const url = wms.baseUrl;
    //   const params = {
    //     service: 'WFS',
    //     version: '1.0.0',
    //     request: 'GetFeature',
    //     maxFeatures: 50,
    //     outputFormat: 'application/json',
    //     CQL_FILTER: `INTERSECTS(smgeometry,Point(${e.lngLat.lng} ${e.lngLat.lat}))`,
    //   };
    //   const lyrIds = map
    //     .getLayerList()
    //     .filter((d) => d.options.isAdd)
    //     .map((l) => l.options.id);
    //   const openLys = wms!.layers.filter((d) => lyrIds.findIndex((f) => f === d.id) > -1);
    //   for (let i = 0; i < openLys.length; i++) {
    //     const rData = await axios.get(url, { ...params, typeName: openLys[i].layerName }).then((ctx: any) => {
    //       const temp = ctx || {};
    //       const flag = temp?.features?.length > 0;
    //       if (flag) {
    //         return { layerId: openLys[i].id, data: temp.features[0], lngLat: e.lngLat };
    //       } else {
    //         return undefined;
    //       }
    //     });
    //     if (rData) {
    //       return rData;
    //     }
    //   }
    // }
    return undefined
  }

  map?.on('click', async (e: any) => {
    // 获取添加到地图上的rest服务图层
    const rData = await restLayerClicked(map, e)
    if (!rData) {
      vectorLayerClicked(map, e)
      // } else {
      //   const feature = rData.data;
      //   const layerId = rData.layerId;
      //   const title = wms!.layers.find((d) => layerId === d.id)!.title;
      //   const template = wms!.layers.find((d) => layerId === d.id)!.template;
      //   map.selectFeature(feature);
      //   setPopupData({
      //     properties: feature.properties,
      //     lngLat: rData.lngLat,
      //     title,
      //     template,
      //   });
    }
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
      @Close="onCloseHandle"
    >
      <slot v-if="popupData.template"></slot>
    </PopupWrapper>
  </div>
</template>


<style scoped></style>
