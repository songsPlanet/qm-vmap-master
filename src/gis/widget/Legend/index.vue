

<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import type LayerGroupWrapper from '@/gis/mapboxgl/layer/LayerGroupWrapper'
import type LayerWrapper from '@/gis/mapboxgl/layer/LayerWrapper'
import { onMounted, ref, h, onUnmounted, type VNode } from 'vue'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import { useMap } from '@/gis/context/mapContext'
import { MapEvent } from '@/gis/mapboxgl/typings'
import { debounce } from '@/gis/utils'
import singleLegend from './singleLegend.vue'
import groupLegend from './groupLegend.vue'

const baseHeight = ref(200)
const { map } = useMap()
const listDom = ref<VNode>()
const itemListDom = ref<VNode>()
const props = defineProps<TWidgetPosition>()

const loop = (
  layers: Array<LayerWrapper | LayerGroupWrapper>,
  hArr: number[],
  list: any[],
  itemList: any[]
) => {
  let nodeData: any
  let itemPropsData: any
  layers.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
    nodeData = undefined
    itemPropsData = undefined
    if ('layers' in layer && !layer.options.legend) {
      loop(layer.layers, hArr, list, itemList)
    } else if (
      layer.options.legend &&
      (layer.options.isAdd ||
        ('layers' in layer && layer.layers.filter((d) => d.options.isAdd).length))
    ) {
      const { title, items } = layer.options.legend
      if (items) {
        const titleName = title ? title : layer.options.name
        nodeData = { title: titleName, items }
        items?.map((d) => {
          hArr.push(26)
        })
        hArr.push(50)
      } else {
        const { style, imageId, text } = layer.options.legend
        const img = map?.images.find((f: any) => f.id === imageId)
        const titleName = text ? text : layer.options.name
        itemPropsData = { text: titleName, style, img }
        hArr.push(26)
      }
    } else {
      nodeData = undefined
      itemPropsData = undefined
    }
    if (nodeData) {
      list.push(nodeData)
    }
    if (itemPropsData) {
      itemList.push(itemPropsData)
    }
  })
}

const init = () => {
  // 计算高度
  const hArr: number[] = []
  // dom
  const list: any[] = []
  const itemList: any[] = []
  loop(map!.layers, hArr, list, itemList)

  itemListDom.value = h(singleLegend, { propList: itemList })
  listDom.value = h(groupLegend, { groupList: list })
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

<template>
  <BaseWidget
    :name="'图例'"
    :width="200"
    :position="props"
    :icon="ControlIcons.Legend"
    :height="baseHeight"
  >
    <div class="mapboxgl-legend">
      <itemListDom />
      <listDom />
    </div>
  </BaseWidget>
</template>


<style scoped lang="less">
@import './index.less';
</style>
