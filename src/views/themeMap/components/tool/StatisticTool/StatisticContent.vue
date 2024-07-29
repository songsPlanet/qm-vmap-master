<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Spin, Result, Tabs, Empty } from 'ant-design-vue'
import StatisticDetail from './StatisticDetail.vue'
import type { TMapSpaceStatistic } from './typing'

const loading = ref(false)
const layer = ref<any[]>([])
const data = ref<TMapSpaceStatistic[] | null>()
const activeKey = ref('1')

onMounted(() => {})
</script>

<template>
  <Spin v-if="layer.length" :spinning="loading">
    <Tabs
      v-if="data"
      :default-active-key="1"
      :style="{ padding: '10px' }"
      v-model:activeKey="activeKey"
    >
      <a-tab-pane v-for="(items, index) in data" :key="index" :tab="items.name + '面积分布'">
        <component :is="StatisticDetail" :data="items"> </component>
      </a-tab-pane>
      <template> </template>
    </Tabs>
    <Empty v-eles :style="{ width: 380, marginTop: '60%' }"></Empty>
  </Spin>
  <Result
    v-else
    :style="{ width: 400, marginTop: '60%' }"
    status="warning"
    :title="'请您在 [ 图层控制 ] 功能中选中至少一个 [ 地块 ] 图层'"
  >
  </Result>
</template>
