<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import type LayerGroupWrapper from '@/gis/mapboxgl/layer/LayerGroupWrapper'
import { onMounted, ref, h, onUnmounted, type VNode, inject } from 'vue'
import type LayerWrapper from '@/gis/mapboxgl/layer/LayerWrapper'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import { MapEvent } from '@/gis/mapboxgl/typings'
import { debounce } from '@/gis/utils'
import singleLegend from './singleLegend.vue'
import groupLegend from './groupLegend.vue'

const baseHeight = ref(200)
const map = inject<any>('map')
const itemListDom = ref<VNode>()
const grouplistDom = ref<VNode>()
const groupLegendList = ref<any[]>([])
const singleLegendList = ref<any[]>([])
const props = defineProps<TWidgetPosition>()

const loop = (
  layers: Array<LayerWrapper | LayerGroupWrapper>,
  hArr: number[],
  list: any[],
  itemList: any[]
) => {
  let groupNodeData: any
  let itemNodeData: any
  layers.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
    groupNodeData = undefined
    itemNodeData = undefined
    if ('layers' in layer && !layer.options.legend) {
      loop(layer.layers, hArr, list, itemList)
    } else if (
      layer.options.legend &&
      (layer.options.isAdd ||
        ('layers' in layer && layer.layers.filter((d) => d.options.isAdd).length))
    ) {
      const { title, items } = layer.options.legend
      if (items) {
        // 图例组
        const titleName = title ? title : layer.options.name
        groupNodeData = { title: titleName, items }
        items?.map(() => {
          hArr.push(26)
        })
        hArr.push(50)
      } else {
        // 单个图例
        const { style, imageId, text } = layer.options.legend
        const img = map?.value.images.find((f: any) => f.id === imageId)
        const titleName = text ? text : layer.options.name
        itemNodeData = { text: titleName, style, img }
        hArr.push(26)
      }
    } else {
      groupNodeData = undefined
      itemNodeData = undefined
    }
    if (groupNodeData) {
      list.push(groupNodeData)
    }
    if (itemNodeData) {
      itemList.push(itemNodeData)
    }
  })
}

const init = () => {
  // 计算高度
  const hArr: number[] = []
  // dom
  const list: any[] = []
  const itemList: any[] = []
  loop(map!.value.layers, hArr, list, itemList)
  itemListDom.value = h(singleLegend, { propList: itemList })
  grouplistDom.value = h(groupLegend, { groupList: list })
  groupLegendList.value = list
  singleLegendList.value = itemList
  const hei = hArr.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  baseHeight.value = hei + 50
}

const mapLayerChangedHandle = debounce(() => {
  init()
}, 200)

onMounted(() => {
  map?.value?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
  init()
})

onUnmounted(() => {
  map?.value?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
})
</script>

<template>
  <BaseWidget
    name="图例"
    :width="200"
    :position="props"
    :height="baseHeight"
    :icon="ControlIcons.Legend"
  >
    <div class="mapboxgl-legend">
      <itemListDom v-if="singleLegendList.length > 0" />
      <grouplistDom v-if="groupLegendList.length > 0" />
    </div>
  </BaseWidget>
</template>

<style scoped lang="less">
@import './index.less';
</style>
