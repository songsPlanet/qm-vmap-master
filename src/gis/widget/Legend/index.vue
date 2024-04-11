<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import type LayerGroupWrapper from '@/gis/mapboxgl/layer/LayerGroupWrapper'
import type LayerWrapper from '@/gis/mapboxgl/layer/LayerWrapper'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import { onMounted, ref, onUnmounted, inject } from 'vue'
import { MapEvent } from '@/gis/mapboxgl/typings'
import { debounce } from '@/gis/utils'
import singleLegend from './singleLegend.vue'

const baseHeight = ref(200)
const map = inject<any>('map')
const groupLegendList = ref<any[]>([])
const singleLegendList = ref<any[]>([])
const props = defineProps<TWidgetPosition>()

const loop = (layers: Array<LayerWrapper | LayerGroupWrapper>, hArr: number[]) => {
  groupLegendList.value = []
  singleLegendList.value = []
  let groupNodeData: any
  let itemNodeData: any
  layers.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
    groupNodeData = undefined
    itemNodeData = undefined
    if ('layers' in layer && !layer.options.legend) {
      loop(layer.layers, hArr)
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
      groupLegendList.value.push(groupNodeData)
    }
    if (itemNodeData) {
      singleLegendList.value.push(itemNodeData)
    }
  })
}

const init = () => {
  // 计算高度
  const hArr: number[] = []
  // dom
  loop(map!.value.layers, hArr)
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
      <singleLegend :prop-list="singleLegendList" />
      <div className="mapboxgl-legend-group" v-for="list in groupLegendList" :key="list.title">
        <div className="mapboxgl-legend-tilte">{{ list.title }}</div>
        <singleLegend :prop-list="list.items" />
      </div>
    </div>
  </BaseWidget>
</template>

<style scoped lang="less">
@import './index.less';
</style>
