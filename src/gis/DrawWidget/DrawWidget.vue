<script setup lang="ts">
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import type { TWidgetPosition } from '../BaseWidget';
import { useMapStore } from '../store/useMapStore';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { GISToolHelper } from 'qm-map-wrapper';
import { ref, onMounted, computed } from 'vue';
import { drawToolList } from './constant';
import { Marker } from 'mapbox-gl';
import './DrawWidget.less';

type TDrawWidget = {
  position: TWidgetPosition;
};

const props = defineProps<TDrawWidget>();
const mapStore = useMapStore();
const map = mapStore.map;
const mode = ref('none');
const markerRef = ref<Marker[]>([]);
const featureRef = ref<any>([{ id: '' }]);

const controlstyle = computed(() => ({
  top: `${props.position.top}px`,
  bottom: `${props.position.bottom}px`,
  left: `${props.position.left}px`,
  right: `${props.position.right}px`,
}));

const selectedModeHandle = (type: any) => {
  mode.value = type;
  if (map?.drawTool) {
    map?.drawTool.changeMode(type);
  }
};

// 添加关闭按钮
const addMarkerHandle = (e: any) => {
  let box = GISToolHelper.getFeatureBoundingBox(e.features[0]);
  let _ele = document.createElement('div');
  _ele.setAttribute('class', 'measureResultClose');
  _ele.setAttribute('id', e.features[0].id);
  _ele.innerHTML = '×';
  let closeMarker = new Marker({
    element: _ele,
    anchor: 'bottom-left',
    offset: [-5, -10],
  })
    .setLngLat(box.getCenter())
    .addTo(map!);
  markerRef.value.push(closeMarker);
  _ele.onclick = (e) => {
    e.stopPropagation();
    map?.drawTool.delete(_ele.getAttribute('id'));
    closeMarker.remove();
  };
};

const clearAllHandle = () => {
  mode.value = 'simple_select';
  if (map?.drawTool) {
    map?.drawTool.deleteAll();
    map?.drawTool.changeMode('simple_select');
    const ele = document.getElementsByClassName('measureResultClose');
    map?.drawTool.delete(ele);
    markerRef.value.forEach((item: Marker) => {
      item.remove();
    });
  }
};

const updatetDraw = (e: any) => {
  markerRef.value
    .filter((item: any) => {
      return item._element.getAttribute('id') === e.features[0].id;
    })
    .map((d: any) => {
      d.remove();
      return null;
    });
  addMarkerHandle(e);
};

const creatDraw = (e: any) => {
  if (featureRef.value[0].id !== e.features[0].id) {
    featureRef.value = e.features;
    addMarkerHandle(e);
  }
};

onMounted(() => {
  if (!map?.drawTool && map) {
    map.drawTool = new MapboxDraw({
      displayControlsDefault: false,
      modes: { ...MapboxDraw.modes, draw_rectangle: DrawRectangle },
      defaultMode: 'simple_select',
    });
    map.addControl(map.drawTool, 'bottom-right');
    map.on('draw.create', creatDraw);
    map.on('draw.update', updatetDraw);
  }
});
</script>

<template>
  <div class="mapboxgl-draw" :style="controlstyle">
    <div class="mapboxgl-draw-bar">
      <div>
        <div
          v-for="item in drawToolList"
          :key="item.mode"
          :title="item.title"
          class="mapboxgl-draw-bar-button"
          :style="{ backgroundImage: `url(${item.icon})` }"
          @click="item.mode === 'simple_select' ? clearAllHandle() : selectedModeHandle(item.mode)"
        ></div>
      </div>
    </div>
  </div>
</template>
