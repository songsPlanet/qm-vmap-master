<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Spin, Result, Tabs, Empty } from 'ant-design-vue'
import { useRegionStore } from '@/store/useRegionStore'
import { zwfbConfig } from '@/views/mapSetting/zwfb'
import StatisticDetail from './StatisticDetail.vue'
import type { TMapSpaceStatistic } from './typing'
import { MapEvent } from '@/gis/mapboxgl/typings'
import { useMapStore } from '@/store/useMapStore'
import { queryStatisticResult } from '@/api/map'
import { debounce } from '@/utils'

const loading = ref(false)
const layers = ref<any[]>([])
const data = ref<TMapSpaceStatistic[] | null>()
// 存储数组，减少其他图层操作引起不必要的刷新
const prevLayers = ref<String[]>([])

const activeKey = ref('0')
const { map } = useMapStore()
const { currentRegion } = useRegionStore()

const getChartData = () => {
  loading.value = true
  console.log('layers', layers.value)

  Promise.all(
    layers.value.map((d: any) => {
      // if (d === 'field_vt') {
      const query = { type: 1, regionCode: currentRegion!.value }
      return queryStatisticResult(query)
      // }
    })
  ).then((ctx) => {
    const temp = ctx || []
    data.value = temp.map((f: any) => ({
      regionName: f?.data?.regionName || currentRegion!.label,
      area: f?.data?.area || 0,
      chartData: f?.data?.areaList || [],
      name: f?.data?.queryType || ''
    }))
    loading.value = false
  })
}

watch([currentRegion, layers], () => {
  if (currentRegion) {
    getChartData()
  }
})

const getLyrState = () => {
  const zwfbId: any = zwfbConfig.map((d) => {
    return `zwfb_341282_${d.year}_${d.type}`
  })
  const statisticLayerList = ['field_vt', ...zwfbId]

  const lyrs = statisticLayerList.filter((d) => {
    const id = d
    const flag = map?.getLayerList().find((f: any) => f.options.id === id && f.options.isAdd)
    return flag
  })
  let flag = false
  if (prevLayers.value.length !== lyrs.length) {
    flag = true
  } else {
    flag = prevLayers.value.findIndex((d: any) => !lyrs.includes(d)) > -1
  }
  prevLayers.value = lyrs
  if (flag) {
    layers.value = lyrs
  }
}

const mapLayerChangedHandle = debounce(() => {
  getLyrState()
}, 200)

onMounted(() => {
  getLyrState()
  map?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
})

onUnmounted(() => {
  map?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle)
})
</script>

<template>
  <Spin v-if="layers.length" :spinning="loading">
    <Tabs v-if="data" v-model:activeKey="activeKey" :style="{ padding: '10px' }">
      <a-tab-pane v-for="(items, index) in data" :key="index.toString()" :tab="items.name">
        <component :is="StatisticDetail" :data="items"> </component>
      </a-tab-pane>
      <template> </template>
    </Tabs>
    <Empty v-else :style="{ width: '380px', marginTop: '60%' }"></Empty>
  </Spin>
  <Result
    v-else
    :style="{ width: '400px', marginTop: '60%' }"
    status="warning"
    :title="'请您在 [ 图层控制 ] 功能中选中至少一个 [ 地块 ] 图层'"
  >
  </Result>
</template>
