<script lang="ts" setup>
import locationIcon from '@/assets/map/location.png';
import { onMounted, onUnmounted, ref } from 'vue';
import type { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapWrapper from './mapWrapper';
import { debounce } from '@/utils';

const emit = defineEmits<{
  onMapLoad: [map: MapWrapper];
}>();
const mapDom = ref<HTMLDivElement | null>(null);
const mapRef = ref();

const mapOptions = {
  id: 'map',
  center: [115.434038, 33.347523] as LngLatLike, // 筛子里村
  container: '',
  zoom: 13,
  maxZoom: 20,
};

const loadLayers = (mapload: any) => {
  mapRef.value = mapload;
  mapRef.value.addBaseMap(mapload);
  mapload.loadImage(locationIcon, (error: any, image: any) => {
    if (!error) {
      if (!mapload.hasImage('locationIcon')) mapload.addImage('locationIcon', image);
    }
  });
  emit('onMapLoad', mapload);
};

onMounted(() => {
  const map = new MapWrapper({
    pitch: 0,
    bearing: 0,
    attributionControl: false,
    renderWorldCopies: false,
    trackResize: true,
    preserveDrawingBuffer: true,
    ...mapOptions,
    container: mapDom.value as HTMLElement,
    style: {
      version: 8,
      glyphs: `/font/{fontstack}/{range}.pbf`,
      sources: {},
      layers: [],
    },
  });

  map.on('load', () => loadLayers(map));

  map.on('click', (e: any) => {
    console.log(e.lngLat);
    console.log(map.getCenter(), map.getZoom(), map.getBounds());
  });
  //  map.on('mouseenter','tdt_vec', () => {
  //     map.getCanvas().style.cursor = 'pointer';
  //   });
  //   map.on('mouseleave', 'tdt_vec', () => {
  //     map.getCanvas().style.cursor = '';
  //   });
  const resizeMap = debounce(() => {
    map.resize();
  }, 500);

  const ro = new ResizeObserver(resizeMap);
  ro.observe(mapDom?.value as Element);
});

onUnmounted(() => {
  mapRef.value.off('load', () => loadLayers(mapRef.value));
});
</script>

<template>
  <div ref="mapDom" class="map-wrapper"></div>
</template>

<style lang="less">
.map-wrapper {
  height: 450px;
  width: 100%;
  position: relative;
}
</style>
