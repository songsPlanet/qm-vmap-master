<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue';
import { PolylineMeasure, PolygonMeasure } from 'qm-map-wrapper';
import BaseWidget from '@/gis/BaseWidget/BaseWidget.vue';
import { useMapStore } from '@/gis/store/useMapStore';
import { Space, Button } from 'ant-design-vue';
import './Measure.less';

type TMeasure = {
  position: TWidgetPosition;
  icon?: string;
};

const props = defineProps<TMeasure>();
const { map } = useMapStore();
const MeasureIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWEftlrENAjEMRd+NQMkKdAh6YAHGoKCnBnpaCuZgAGAAJBoYgJYhQI4SKeSCThROUuSak/7l7O+fb8sNmZ8mc34qgaIUOFk/XICNkjck7sTGnsnbV+BtP2yVCaxtHpM7RkCp+FbYcgmclSWYdl1BNg/4ztfsAjG73L/JUdQcUL76eHhfAWeOVESM2YucA9nbUNuYbuT/nISVQKjACHgCL689pGNCr4RYH+gBj6Ct/rqCAXAHjsDcBnLYDlhZ7AAsgCFws9geWAJj4OqR+IuAVCWLilRrFggghskZweWMUyaGyf+VQKcCqUZxaw64pTQVgdZSmirxVx7tqddZVCWQXYEP/oRLIWGFgyoAAAAASUVORK5CYII=';

const polylineMeasureHandle = () => {
  if (map !== null) {
    let polylineMeasure = new PolylineMeasure(map);
    polylineMeasure.start();
  }
};

const polygonMeasureHandle = () => {
  if (map !== null) {
    let polygonMeasure = new PolygonMeasure(map);
    polygonMeasure.start();
  }
};
</script>

<template>
  <BaseWidget
    name="测量工具"
    :width="130"
    :height="110"
    :position="props.position"
    :icon="props.icon ? props.icon : MeasureIcon"
  >
    <div class="main">
      <Space direction="vertical">
        <Button block @click="polylineMeasureHandle"> 测量距离 </Button>
        <Button block @click="polygonMeasureHandle"> 测量面积 </Button>
      </Space>
    </div>
  </BaseWidget>
</template>
