<template>
  <BaseWidget
    :name="'图例'"
    :width="200"
    :position="props"
    :icon="ControlIcons.Legend"
    :height="baseHeight"
  >
    <div class="mapboxgl-legend">
      <listDom />
      <!-- <div v-for="item in listDom"><item /></div> -->
    </div>
  </BaseWidget>
</template>

<script setup lang="ts">
import type LayerGroupWrapper from '@/gis/mapboxgl/layer/LayerGroupWrapper'
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import type LayerWrapper from '@/gis/mapboxgl/layer/LayerWrapper'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import { onMounted, ref, h, onUnmounted, type VNode } from 'vue'
import { useMap } from '@/gis/context/mapContext'
import { MapEvent } from '@/gis/mapboxgl/typings'
import { debounce } from '@/gis/utils'
import singleLegend from './singleLegend.vue'
import groupLegend from './groupLegend.vue'

const baseHeight = ref(100)
const { map } = useMap()
const listDom = ref<VNode[]>([])
const props = defineProps<TWidgetPosition>()

const loop = (layers: Array<LayerWrapper | LayerGroupWrapper>, hArr: number[], list: any[]) => {
  let nodeData: any
  let itemData: any
  layers.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
    nodeData = undefined
    itemData = undefined
    if ('layers' in layer && !layer.options.legend) {
      loop(layer.layers, hArr, list)
    } else if (
      layer.options.legend &&
      (layer.options.isAdd ||
        ('layers' in layer && layer.layers.filter((d) => d.options.isAdd).length))
    ) {
      const { title, items } = layer.options.legend
      if (items) {
        const titleName = title ? title : layer.options.name
        nodeData = h(groupLegend, { title: titleName })
        // nodeData = `<div class="mapboxgl-legend-group" ></div>`
        // <div className="mapboxgl-legend-group" key={layer.options.id}>
        //       <div className="mapboxgl-legend-tilte">{title ? title : layer.options.name}</div>
        //       {items?.map((d) => {
        //         hArr.push(26);
        //         const img = map?.images.find((f) => f.id === d.imageId);
        //         return (
        //           <div className="mapboxgl-legend-item" key={d.text}>
        //             {img ? (
        //               <img src={img.data} alt="" className="mapboxgl-legend-item-img" />
        //             ) : (
        //               <div className="mapboxgl-legend-item-geo" style={d.style} />
        //             )}
        //             <div className="mapboxgl-legend-item-text">{d.text}</div>
        //           </div>
        //         );
        //       })}
        //     </div>

        hArr.push(50)
      } else {
        const { style, imageId, text } = layer.options.legend
        const img = map?.images.find((f: any) => f.id === imageId)
        const titleName = text ? text : layer.options.name

        nodeData = h(singleLegend, { title: titleName, styleGeo: style, img })
        hArr.push(26)
      }
    } else {
      nodeData = undefined
    }
    if (nodeData) {
      list.push(nodeData)
    }
    if (itemData) {
      list.push(nodeData)
    }
  })
}

const init = () => {
  // 计算高度
  const hArr: number[] = []
  // dom
  const list: any[] = []
  loop(map!.layers, hArr, list)

  listDom.value = list[0]
  const hei = hArr.reduce((sum, cur) => {
    return sum + cur
  }, 0)

  baseHeight.value = hei + 50
}
const mapLayerChangedHandle = debounce(() => {
  init()
}, 200)

onMounted(() => {
  map?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
  init()
})

onUnmounted(() => {
  map?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
})
</script>

<style scoped lang="less">
@import './index.less';
</style>
