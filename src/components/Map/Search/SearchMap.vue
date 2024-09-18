<script setup lang="ts">
import { Modal, Form, Row, Col, Input, FormItem, message, Select, Spin } from 'ant-design-vue';
import {  onMounted, onUpdated, ref } from 'vue';
import MapContanier from './MapContanier.vue';
import type MapWrapper from './mapWrapper';
import { debounce } from '@/utils';
import axios from 'axios';

type TMapModalOptions = {
  open: boolean;
};

type TMapInfoModalEmits = {
  close: [];
  ok: [];
};

type TVillagePointType = {
  location: string;
  longitude: string;
  latitude: string;
};

type TsearchResultPois = {
  hotPointID: string;
  lonlat: string;
  name: string;
};

type TCrrentRegion = {
  bounds: number[];
  code: number;
};

const props = defineProps<TMapModalOptions>();
const emits = defineEmits<TMapInfoModalEmits>();
const mapFormState = defineModel<TVillagePointType>('value', { required: true, default: {} });

const mapR = ref();
const loading = ref(false);
const formRef = ref();
const currentRegion = ref<TCrrentRegion>();
const searchResultPois = ref<TsearchResultPois[]>([]);
const tianditukey = '6cb0c9f207a359a171b3d033b23249d9';

function handleOk() {
  formRef.value
    .validate()
    .then(() => {
      emits('ok');
    })
    .catch((error: any) => {
      console.log('error', error);
    });
}

function handleCancel() {
  Modal.confirm({
    title: '真的要关闭地图页面吗吗？',
    content: '关闭之后，当前所填入的信息如法恢复',
    onOk() {
      emits('close');
    },
  });
}

const fetchSearchDataByKeyWord = async () => {
  try {
    // 先写死后期根据行政区计算
    const params = {
      keyWord: mapFormState.value.location,
      mapBound: currentRegion.value?.bounds.join(','),
      level: 18,
      queryType: 1, // 1-普通搜索，7-地名搜索
      start: 0,
      count: 10,
      specify: currentRegion.value?.code,
    };
    const url = `http://api.tianditu.gov.cn/v2/search?type=query&postStr=${JSON.stringify(params)}&tk=${tianditukey}`;
    const searchData = await axios.get(url);
    if (searchData.data) loading.value = false;
    const { pois } = searchData.data;
    if (!pois) {
      message.warning('当前区域没有查询到结果');
    } else {
      searchResultPois.value = pois;
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
};

const getSearchData = debounce(() => {
  fetchSearchDataByKeyWord();
}, 500);

const handleSearch = (newValue: string) => {
  searchResultPois.value = [];
  mapFormState.value.location = newValue;
  if (newValue && mapR.value) {
    loading.value = true;
    getSearchData();
  } else {
    searchResultPois.value = [];
  }
};

const handleChange = (value: any) => {
  const selectPois = searchResultPois.value.filter((d) => d.hotPointID === value);
  const { name, lonlat } = selectPois[0];
  const lonlatStr = lonlat.split(',');
  const lonlatArray = lonlatStr.map(parseFloat);
  const resObject: TVillagePointType = {
    location: name,
    longitude: lonlatStr[0],
    latitude: lonlatStr[1],
  };
  Object.assign(mapFormState.value, resObject);
  mapR.value?.locationHanlde(lonlatArray);
  mapR.value?.addLocationIcon(lonlatArray);
};

const fetchSearchDataByLonLat = async (point: { lng: number; lat: number }) => {
  try {
    const params = {
      lon: point.lng,
      lat: point.lat,
      ver: 1,
    };
    const url = `http://api.tianditu.gov.cn/geocoder?type=geocode&postStr=${JSON.stringify(params)}&tk=${tianditukey}`;
    const searchData = await axios.get(url);
    if (searchData.data) loading.value = false;

    const { lon, lat } = searchData.data.result.location;
    const resObject: TVillagePointType = {
      location: searchData.data.result['formatted_address'],
      longitude: lon,
      latitude: lat,
    };
    mapFormState.value = Object.assign(mapFormState.value, resObject);
    mapR.value?.addLocationIcon([lon, lat]);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

const mapLoadHandle = (map: MapWrapper) => {
  mapR.value = map;
  map.on('click', (e: any) => {
    loading.value = true;
    fetchSearchDataByLonLat(e.lngLat);
  });
};

onMounted(() => {
  // 获取行政区bounds,目前写死
  // const bounds = map.getFeatureBoundingBox(data)
  // const boundsList=map.getBoundsExtent(bounds)
  currentRegion.value = {
    bounds: [113.96022440625006, 29.87937173587207, 120.59596659374938, 33.88468752718174],
    code: 156341282, // 界首市行政区编码9位国际码
  };
});

onUpdated(() => {
  const { latitude, longitude } = mapFormState.value;
  if (latitude && longitude) {
    mapR.value?.addLocationIcon([longitude, latitude]);
    mapR.value?.locationHanlde([longitude, latitude]);
  } else {
    mapR.value?.zoomHome();
    mapR.value?.clearSelect();
  }
});
</script>
<template>
  <Modal
    :width="1200"
    okText="提交"
    title="地图页面"
    :open="props.open"
    :mask-closable="false"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Form ref="formRef" layout="horizontal" :model="mapFormState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <div :style="{ fontSize: '16px', color: '#584B4B', fontWeight: 'bold', marginBottom: '20px' }">
        获取经纬度和地址 ：
      </div>
      <Row>
        <Col :offset="1" :span="6">
          <FormItem name="location" label="请输入: ">
            <Spin :spinning="loading">
              <Select
                v-model:value="mapFormState.location"
                allow-clear
                show-search
                :show-arrow="false"
                :filter-option="false"
                :style="{ width: '400px' }"
                :default-active-first-option="false"
                placeholder="请输入地名"
                :options="
                  searchResultPois.map((d: any) => ({
                    value: d.hotPointID,
                    label: d.name,
                  }))
                "
                @search="handleSearch"
                @change="handleChange"
              >
              </Select>
            </Spin>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :offset="1" :span="6">
          <FormItem name="longitude" label="东经：" :rules="[{ required: true, message: '请选择地址' }]">
            <Input v-model:value="mapFormState.longitude" />
          </FormItem>
        </Col>
        <Col :offset="1" :span="6">
          <FormItem name="latitude" label="北纬：" :rules="[{ required: true, message: '请选择地址' }]">
            <Input v-model:value="mapFormState.latitude" />
          </FormItem>
        </Col>
        <Col :offset="1" :span="5">
          <FormItem name="location" label="坐标位置：" :rules="[{ required: true, message: '请选择地址' }]">
            <Input v-model:value="mapFormState.location" :style="{ width: '350px' }" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :offset="1" :span="23">
          <MapContanier @onMapLoad="mapLoadHandle"></MapContanier>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
