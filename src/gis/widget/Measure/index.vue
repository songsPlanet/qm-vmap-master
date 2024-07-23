<script setup lang="ts">
import BaseWidget, { type TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { PolylineMeasure } from '@/gis/mapboxgl/graphic/PolylineMeasure'
import { PolygonMeasure } from '@/gis/mapboxgl/graphic/PolygonMeasure'
import { ControlIcons } from '@/gis/widget/BaseWidget/icon'
import { useMapStore } from '@/store/useMapStore'
import { Space, Button } from 'ant-design-vue'
import './index.less'

const { map } = useMapStore()
const props = defineProps<TWidgetPosition>()

const polylineMeasureHandle = () => {
  if (map !== null) {
    let polylineMeasure = new PolylineMeasure(map)
    polylineMeasure.start()
  }
}

const polygonMeasureHandle = () => {
  if (map !== null) {
    let polygonMeasure = new PolygonMeasure(map)
    polygonMeasure.start()
  }
}
</script>

<template>
  <BaseWidget
    :name="'测量工具'"
    :width="130"
    :height="110"
    :position="props"
    :icon="ControlIcons.Measure"
  >
    <div class="main">
      <Space direction="vertical">
        <Button @click="polylineMeasureHandle" block> 测量距离 </Button>
        <Button @click="polygonMeasureHandle" block> 测量面积 </Button>
      </Space>
    </div>
  </BaseWidget>
</template>
