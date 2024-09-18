<script setup lang="ts">
import type { LayerGroupWrapper, LayerWrapper } from 'qm-map-wrapper'
import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue'
import { MapEvent, GISToolHelper } from 'qm-map-wrapper'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { useMapStore } from '@/gis/store/useMapStore'
import BaseWidget from '@/gis/BaseWidget/BaseWidget.vue'
import type { TreeProps } from 'ant-design-vue'

type TLayerList = {
  position: TWidgetPosition
  icon?: string
}

const props = defineProps<TLayerList>()
const mapStore = useMapStore()
const map = mapStore.map

const keys = ref<string[]>([])
const data = ref<TreeProps[]>([])
const baseHeight = ref<number>(280)

const LayerListIcon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTMyNjkyNzI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg5OTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg1Mi42IDQ2Mi45bDEyLjEgNy42YzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDc2NC4xYy0xNy4zIDEwLjgtMzkuMiAxMC44LTU2LjQgMEwxNTkuMyA1NjBjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDEyLjEtNy42TDQ4My45IDY1OWMxNy4zIDEwLjggMzkuMiAxMC44IDU2LjQgMGwzMTIuMi0xOTYgMC4xLTAuMXogbTAgMTU2LjFsMTIuMSA3LjZjMjQuOCAxNS42IDMyLjMgNDguMyAxNi43IDczLjItNC4yIDYuNy05LjkgMTIuNC0xNi43IDE2LjdMNTQwLjQgOTIwLjJjLTE3LjMgMTAuOC0zOS4yIDEwLjgtNTYuNCAwTDE1OS4zIDcxNi4xYy0yNC44LTE1LjYtMzIuMy00OC4zLTE2LjctNzMuMiA0LjItNi43IDkuOS0xMi40IDE2LjctMTYuN2wxMi4xLTcuNkw0ODMuOSA4MTVjMTcuMyAxMC44IDM5LjIgMTAuOCA1Ni40IDBsMzEyLjItMTk2aDAuMXpNNTQwIDEwNi40bDMyNC42IDIwNC4xYzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDYwNGMtMTcuMyAxMC44LTM5LjIgMTAuOC01Ni40IDBMMTU5LjMgMzk5LjhjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDMyNC40LTIwMy43YzE3LjMtMTAuOCAzOS4yLTEwLjggNTYuNCAwbC0wLjEgMC4yeiIgcC1pZD0iODk5MSI+PC9wYXRoPjwvc3ZnPg=='

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
  // eslint-disable-next-line array-callback-return
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
    const lyr = map?.getLayerWrapper(map.layers, key)
    if (lyr && 'layers' in lyr) {
      lyr.layers.forEach((d: any) => {
        d.options.isAdd = true
      })
      map?.addLayerWrapper(lyr)
    } else if (lyr) {
      lyr.options.isAdd = true
      map?.addLayerWrapper(lyr)
    }
  })

  delKeys.forEach((key: any) => {
    const lyr = map?.getLayerWrapper(map.layers, key)
    if (lyr && 'layers' in lyr) {
      lyr.layers.forEach((d: any) => {
        d.options.isAdd = false
      })
      map?.removeLayerWrapper(lyr)
    } else if (lyr) {
      lyr.options.isAdd = false
      map?.removeLayerWrapper(lyr)
    }
  })

  // 修正logicGroup isAdd属性
  map!.layers.forEach((layer: any) => {
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
  const treeData = map ? loop(map.layers, loadkeys) : []
  data.value = treeData
  keys.value = loadkeys
}
const mapLayerChangedHandle = GISToolHelper.debounce(() => {
  init()
}, 300)

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
    name="图层控制"
    :width="220"
    :position="props.position"
    :height="baseHeight"
    :icon="props.icon ? props.icon : LayerListIcon"
  >
    <a-tree v-model:checkedKeys="keys" checkable :tree-data="data">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </a-tree>
  </BaseWidget>
</template>
