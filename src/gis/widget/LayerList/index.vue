<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import type LayerGroupWrapper from '@/gis/mapboxgl/layer/LayerGroupWrapper'
import type LayerWrapper from '@/gis/mapboxgl/layer/LayerWrapper'
import { onMounted, ref, watch, onUnmounted, inject } from 'vue'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import { MapEvent } from '@/gis/mapboxgl/typings'
import type { TreeProps } from 'ant-design-vue'
import { debounce } from '@/gis/utils'

const props = defineProps<TWidgetPosition>()
const map = inject<any>('map')
const keys = ref<string[]>([])
const data = ref<TreeProps[]>([])
const baseHeight = ref<number>(280)

watch(keys, (newKeys, oldKeys) => {
  baseHeight.value = newKeys.length * 28 < 280 ? 280 : keys.value.length * 28
  checkedHandle(newKeys, oldKeys)
})

const loop = (data: Array<LayerWrapper | LayerGroupWrapper>, keys: string[]) => {
  let nodeData: any
  const treeData: any[] = []
  data.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
    nodeData = undefined
    if ('layers' in layer && layer.options.type === 'logicGroup') {
      nodeData = {
        title: layer.options.name,
        key: layer.options.id,
        selectable: false,
        children: loop(layer.layers, keys)
      }
    } else {
      nodeData = {
        title: layer.options.name,
        key: layer.options.id,
        selectable: false
      }
    }
    if (nodeData) {
      treeData.push(nodeData)
    }
    if (layer.options.isAdd && layer.options.type !== 'logicGroup') {
      keys.push(layer.options.id)
    }
  })
  return treeData
}

const getOldHalfKeys = (oldKeys: string[]) => {
  const list: string[] = []
  data.value.map((d: any) => {
    if (d.children) {
      list.push(d.key)
    }
  })
  return oldKeys.filter((x: any) => !list.includes(x))
}

const checkedHandle = (checkedKeys: any, oldKeys: any) => {
  // 去除根节点影响
  const keys = getOldHalfKeys(oldKeys)

  // 并集
  const union = new Set([...keys, ...checkedKeys])
  // 差集 增加的
  const addKeys = new Set([...union].filter((x) => !keys.includes(x)))
  // 差集 减少的
  const delKeys = new Set([...union].filter((x) => !checkedKeys.includes(x)))

  addKeys.forEach((key: string) => {
    const lyr = map.value?.getLayerWrapper(map.value.layers, key)
    if (lyr && 'layers' in lyr) {
      lyr.layers.forEach((d: any) => {
        d.options.isAdd = true
      })
      map.value?.addLayerWrapper(lyr)
    } else if (lyr) {
      lyr.options.isAdd = true
      map.value?.addLayerWrapper(lyr)
    }
  })

  delKeys.forEach((key: any) => {
    const lyr = map.value?.getLayerWrapper(map.value.layers, key)
    if (lyr && 'layers' in lyr) {
      lyr.layers.forEach((d: any) => {
        d.options.isAdd = false
      })
      map.value?.removeLayerWrapper(lyr)
    } else if (lyr) {
      lyr.options.isAdd = false
      map.value?.removeLayerWrapper(lyr)
    }
  })

  // 修正logicGroup isAdd属性
  map.value!.layers.forEach((layer: any) => {
    modifyMapLayers(layer)
  })
}
const modifyMapLayers = (layer: LayerWrapper | LayerGroupWrapper) => {
  if ('layers' in layer && layer.layers.findIndex((d) => d.options.type === 'logicGroup') > -1) {
    layer!.layers.forEach((f) => {
      modifyMapLayers(f)
    })
  } else if ('layers' in layer && layer.options.type === 'logicGroup') {
    const isAllFalse = layer.layers.findIndex((d) => d.options.isAdd) === -1
    if (isAllFalse) {
      layer.options.isAdd = false
    } else {
      layer.options.isAdd = true
    }
  }
}
const init = () => {
  const loadkeys: string[] = []
  const treeData = map.value ? loop(map.value.layers, loadkeys) : []
  data.value = treeData
  keys.value = loadkeys
}
const mapLayerChangedHandle = debounce(() => {
  init()
}, 300)

onMounted(() => {
  map.value?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
  init()
})

onUnmounted(() => {
  map.value?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
})
</script>

<template>
  <BaseWidget
    name="图层控制"
    :width="220"
    :position="props"
    :height="baseHeight"
    :icon="ControlIcons.LayerList"
  >
    <a-tree v-model:checkedKeys="keys" checkable :tree-data="data">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </a-tree>
  </BaseWidget>
</template>

<style lang="less" scoped></style>
