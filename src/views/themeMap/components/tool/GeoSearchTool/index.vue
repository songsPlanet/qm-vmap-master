<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue';
import QueryGeocode from '@/gis/QueryGeocode/QueryGeocode.vue';
import ToolWidget from '@/gis/ToolWidget/ToolWidget.vue';
import { UserOutlined } from '@ant-design/icons-vue';
import type { LngLatLike } from 'mapbox-gl';
import { ref, h } from 'vue';

interface TPanelWidget {
  position: TWidgetPosition;
}
type MapLocation = {
  location: string;
  longitude: string;
  latitude: string;
};

const props = defineProps<TPanelWidget>();
const open = ref(false);
const mapLocation = ref<MapLocation>({ location: '', longitude: '', latitude: '' });

const tianditukey = '7271c460eedd19a02b7b7bb1b19ba7ac';
const regionData = {
  bounds: [113.96022440625006, 29.87937173587207, 120.59596659374938, 33.88468752718174], // 界首
  code: 156341282, // 界首市行政区编码9位国际码
};

const mapOptions = {
  id: 'jsmap',
  container: '',
  center: [115.345459, 33.260307] as LngLatLike, // 界首市
  zoom: 9.6,
  maxZoom: 20,
};

const onOpenHandle = () => {
  open.value = !open.value;
  mapLocation.value = { location: '', longitude: '', latitude: '' };
};

function handleCloseMap() {
  open.value = false;
}

function handleOkMap() {
  open.value = false;
  console.log(' mapLocation.value', mapLocation.value);
}
</script>

<template>
  <ToolWidget
    title="地理编码"
    isOpenHandle
    :icon="h(UserOutlined)"
    :position="props.position"
    @openHandle="onOpenHandle"
  >
    <component
      :is="QueryGeocode"
      v-model:value="mapLocation"
      :open="open"
      :tdtkey="tianditukey"
      :region="regionData"
      :mapOptions="mapOptions"
      @close="handleCloseMap"
      @ok="handleOkMap"
    >
    </component>
  </ToolWidget>
</template>
