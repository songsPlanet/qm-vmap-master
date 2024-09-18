<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue';
import type { LayerGroupWrapper, LayerWrapper } from 'qm-map-wrapper';
import { MapEvent, GISToolHelper } from 'qm-map-wrapper';
import BaseWidget from '@/gis/BaseWidget/BaseWidget.vue';
import { useMapStore } from '@/gis/store/useMapStore';
import { onMounted, ref, onUnmounted } from 'vue';
import singleLegend from './singleLegend.vue';
import './Legend.less';

type TLegendList = {
  position: TWidgetPosition;
  icon?: string;
};

const props = defineProps<TLegendList>();
const mapStore = useMapStore();
const map = mapStore.map;
const baseHeight = ref(200);
const groupLegendList = ref<any[]>([]);
const singleLegendList = ref<any[]>([]);

const LegendIcon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTEwNzAzMTU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTExMiAxMTJtMzIgMGw3MzYgMHEzMiAwIDMyIDMybDAgNzM2cTAgMzItMzIgMzJsLTczNiAwcS0zMiAwLTMyLTMybDAtNzM2cTAtMzIgMzItMzJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI0OTczIj48L3BhdGg+PHBhdGggZD0iTTEyOCA5Nmg3NjhhMzIgMzIgMCAwIDEgMzIgMzJ2NzY4YTMyIDMyIDAgMCAxLTMyIDMySDEyOGEzMiAzMiAwIDAgMS0zMi0zMlYxMjhhMzIgMzIgMCAwIDEgMzItMzJ6IG0wIDMydjc2OGg3NjhWMTI4SDEyOHoiIGZpbGw9IiM1RDZEN0UiIHAtaWQ9IjQ5NzQiPjwvcGF0aD48cGF0aCBkPSJNMjI0IDM4NGg2NHY2NEgyMjRWMzg0eiBtMCAxMjhoNjR2NjRIMjI0di02NHogbTAgMTI4aDY0djY0SDIyNHYtNjR6IG0wIDEyOGg2NHY2NEgyMjR2LTY0ek01NDQgMzg0aDY0djY0aC02NFYzODR6IG0wIDEyOGg2NHY2NGgtNjR2LTY0eiBtMCAxMjhoNjR2NjRoLTY0di02NHogbTAgMTI4aDY0djY0aC02NHYtNjR6IiBmaWxsPSIjODA4RkExIiBwLWlkPSI0OTc1Ij48L3BhdGg+PHBhdGggZD0iTTMyMCAzODRoMTYwdjY0SDMyMFYzODR6IG0wIDEyOGgxNjB2NjRIMzIwdi02NHogbTAgMTI4aDE2MHY2NEgzMjB2LTY0eiBtMCAxMjhoMTYwdjY0SDMyMHYtNjR6TTY0MCAzODRoMTYwdjY0aC0xNjBWMzg0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiIgZmlsbD0iI0FDQjRDMCIgcC1pZD0iNDk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjQgMjI0aDU3NnY5NkgyMjR6IiBmaWxsPSIjMzBBRDk4IiBwLWlkPSI0OTc3Ij48L3BhdGg+PC9zdmc+';

const loop = (layers: Array<LayerWrapper | LayerGroupWrapper>, hArr: number[]) => {
  groupLegendList.value = [];
  singleLegendList.value = [];
  let groupNodeData: any;
  let itemNodeData: any;
  layers.forEach((layer: LayerWrapper | LayerGroupWrapper) => {
    groupNodeData = undefined;
    itemNodeData = undefined;
    if ('layers' in layer && !layer.options.legend) {
      loop(layer.layers, hArr);
    } else if (
      layer.options.legend &&
      (layer.options.isAdd || ('layers' in layer && layer.layers.filter((d) => d.options.isAdd).length))
    ) {
      const { title, items } = layer.options.legend;
      if (items) {
        // 图例组
        const titleName = title ? title : layer.options.name;
        groupNodeData = { title: titleName, items };
        // eslint-disable-next-line array-callback-return
        items?.map(() => {
          hArr.push(26);
        });
        hArr.push(50);
      } else {
        // 单个图例
        const { style, imageId, text } = layer.options.legend;
        const img = map?.images.find((f: any) => f.id === imageId);
        const titleName = text ? text : layer.options.name;
        itemNodeData = { text: titleName, style, img };
        hArr.push(26);
      }
    } else {
      groupNodeData = undefined;
      itemNodeData = undefined;
    }
    if (groupNodeData) {
      groupLegendList.value.push(groupNodeData);
    }
    if (itemNodeData) {
      singleLegendList.value.push(itemNodeData);
    }
  });
};

const init = () => {
  // 计算高度
  const hArr: number[] = [];
  // dom
  loop(map!.layers, hArr);
  const hei = hArr.reduce((sum, cur) => {
    return sum + cur;
  }, 0);
  baseHeight.value = hei + 50;
};

const mapLayerChangedHandle = GISToolHelper.debounce(() => {
  init();
}, 200);

onMounted(() => {
  map?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
  init();
});

onUnmounted(() => {
  map?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
});
</script>

<template>
  <BaseWidget
    name="图例"
    :width="200"
    :height="baseHeight"
    :position="props.position"
    :icon="props.icon ? props.icon : LegendIcon"
  >
    <div class="mapboxgl-legend">
      <singleLegend :prop-list="singleLegendList" />
      <div v-for="list in groupLegendList" :key="list.title" className="mapboxgl-legend-group">
        <div className="mapboxgl-legend-tilte">{{ list.title }}</div>
        <singleLegend :prop-list="list.items" />
      </div>
    </div>
  </BaseWidget>
</template>
