<script setup lang="ts">
import { Form, Radio, Button, Space, Input } from 'ant-design-vue'
import { ControlIcons, mapOptions } from '@/gis/widget/constant'
import type { TWidgetPosition } from '../BaseWidget/index.vue'
import BaseWidget from '@/gis/widget/BaseWidget/index.vue'
import { decimalToDms, dmsToDecimal } from '@/gis/utils'
import { onMounted, ref, toRaw, reactive } from 'vue'
import { useMapStore } from '@/store/useMapStore'
import type { LngLatLike } from 'mapbox-gl'
import './index.less'

const initialPosition = {
  bearing: 0,
  pitch: 0,
  zoom: 8.7,
  // center: [115.39047951086354, 33.2714096725866] as LngLatLike
  center: mapOptions.center
}

interface TPosition {
  data: {
    longitude: any
    latitude: any
    dmsLonDegrees: any
    dmsLonMinutes: any
    dmsLonSeconds: any
    dmsLatDegrees: any
    dmsLatMinutes: any
    dmsLatSeconds: any
  }
}

const props = defineProps<TWidgetPosition>()
const { map } = useMapStore()
const ifDecimal = ref(true)
const radioValue = ref<string>('1')
const formModelRef = reactive<TPosition>({
  data: {
    longitude: null,
    latitude: null,
    dmsLonDegrees: null,
    dmsLonMinutes: null,
    dmsLonSeconds: null,
    dmsLatDegrees: null,
    dmsLatMinutes: null,
    dmsLatSeconds: null
  }
})

const { resetFields, validate, validateInfos } = Form.useForm(formModelRef)

const conversionDecimalDms = (values: any) => {
  const {
    longitude,
    latitude,
    dmsLonDegrees,
    dmsLonMinutes,
    dmsLonSeconds,
    dmsLatDegrees,
    dmsLatMinutes,
    dmsLatSeconds
  } = values
  if (
    dmsLonDegrees &&
    dmsLonMinutes &&
    dmsLonSeconds &&
    dmsLatDegrees &&
    dmsLatMinutes &&
    dmsLatSeconds
  ) {
    const lon: any = dmsToDecimal(dmsLonDegrees, dmsLonMinutes, dmsLonSeconds)
    const lat: any = dmsToDecimal(dmsLatDegrees, dmsLatMinutes, dmsLatSeconds)
    validate().then(() => {
      console.log(toRaw(formModelRef))
    })
    formModelRef.data.longitude = lon
    formModelRef.data.latitude = lat
    // form.resetFields({
    //   longitude: lon,
    //   latitude: lat
    // })
    return [lon, lat]
  }
  if (longitude && latitude) {
    const lon = decimalToDms(longitude)
    const lat = decimalToDms(latitude)
    formModelRef.data.dmsLonDegrees = lon?.degrees
    formModelRef.data.dmsLonMinutes = lon?.minutes
    formModelRef.data.dmsLonSeconds = lon?.seconds
    formModelRef.data.dmsLatDegrees = lat?.degrees
    formModelRef.data.dmsLatMinutes = lat?.minutes
    formModelRef.data.dmsLatSeconds = lat?.seconds
    return [longitude, latitude]
  }
  return [longitude, latitude]
}

const onFinish = (values: any) => {
  console.log('提交')

  formModelRef.data = values
  const location: any = conversionDecimalDms(values)
  locationHandle(location)
}

const locationHandle = (lonlat: LngLatLike) => {
  map?.flyTo({
    duration: 5000,
    bearing: 0,
    center: lonlat,
    zoom: 15.5,
    pitch: 20
  })
  addLocationIcon(lonlat as number[])
}
const clearIcon = () => {
  const dsId = 'dot-ds'
  const lyrId = 'dot'
  const flag = map?.getLayer(lyrId)
  if (flag) {
    map?.removeLayer(lyrId)
    map?.removeSource(dsId)
  }
}

const addLocationIcon = (point: number[]) => {
  clearIcon()
  if (map) {
    map?.addSource('dot-ds', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            properties: {},
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: point // icon position [lng, lat]
            }
          }
        ]
      }
    })
    map?.addLayer({
      id: 'dot',
      type: 'symbol',
      source: 'dot-ds',
      layout: {
        'icon-image': 'redAnimationImg',
        'icon-size': 1,
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-offset': [0, 0]
      }
    })
  }
}

const resetForm = () => {
  clearIcon()
  // form.resetFields();
  resetFields()
}

const initialLocation = () => {
  resetForm()
  map?.flyTo(initialPosition)
}
const onOpenHandle = (value: boolean) => {
  resetForm()
  ifDecimal.value = true
}

const onRadioChange = (e: any) => {
  ifDecimal.value = e.target.value === '1' ? true : false
  // conversionDecimalDms(form.getFieldsValue());
  conversionDecimalDms(validateInfos)
}

onMounted(() => {
  resetForm()
  ifDecimal.value = true
})
</script>

<template>
  <BaseWidget
    name="坐标定位"
    :position="props"
    :icon="ControlIcons.Location"
    :width="300"
    :height="200"
    @openHandle="onOpenHandle"
  >
    <div className="locationMain">
      <Form
        :model="formModelRef.data"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        layout="horizontal"
        :style="{ maxWidth: '600px' }"
        @finish="onFinish"
      >
        <Form.Item label="类型">
          <Radio.Group v-model:value="radioValue" @change="onRadioChange">
            <Radio value="1"> 十进制 </Radio>
            <Radio value="2"> 度分秒 </Radio>
          </Radio.Group>
        </Form.Item>

        <div v-if="ifDecimal">
          <Form.Item label="经度" name="longitude">
            <Input placeholder="请输入经度" v-model:value="formModelRef.data.longitude" />
          </Form.Item>
          <Form.Item label="纬度" name="latitude">
            <Input placeholder="请输入纬度" v-model:value="formModelRef.data.latitude" />
          </Form.Item>
        </div>

        <div v-else>
          <Form.Item
            label="经度"
            :style="{ marginBottom: 0, display: 'flex', alignItems: 'center' }"
          >
            <Form.Item :style="{ display: 'flex', alignItems: 'center' }">
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <Input
                  placeholder="度"
                  suffix="°"
                  v-model:value="formModelRef.data.dmsLonDegrees"
                  :style="{ width: 'calc(34% - 10px)', marginRight: '6px' }"
                />
                <Input
                  placeholder="分"
                  suffix="′"
                  v-model:value="formModelRef.data.dmsLonMinutes"
                  :style="{ width: 'calc(34% - 10px)', marginRight: '6px' }"
                />
                <Input
                  placeholder="秒"
                  suffix="″"
                  v-model:value="formModelRef.data.dmsLonSeconds"
                  :style="{ width: 'calc(34% - 10px)', marginRight: '6px' }"
                />
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="纬度"
            :style="{ marginBottom: 0, display: 'flex', alignItems: 'center' }"
          >
            <Form.Item :style="{ display: 'flex', alignItems: 'center' }">
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <Input
                  placeholder="度"
                  suffix="°"
                  v-model:value="formModelRef.data.dmsLatDegrees"
                  :style="{ width: 'calc(34% - 10px)', marginRight: '6px' }"
                />
                <Input
                  placeholder="分"
                  suffix="′"
                  v-model:value="formModelRef.data.dmsLatMinutes"
                  :style="{ width: 'calc(34% - 10px)', marginRight: '6px' }"
                />
                <Input
                  placeholder="秒"
                  suffix="″"
                  v-model:value="formModelRef.data.dmsLatSeconds"
                  :style="{ width: 'calc(34% - 10px)', marginRight: '6px' }"
                />
              </div>
            </Form.Item>
          </Form.Item>
        </div>

        <Form.Item :wrapper-col="{ offset: 6 }">
          <Space>
            <Button type="primary" size="small" @click="initialLocation"> 初始位置 </Button>
            <Button type="primary" size="small" html-type="submit"> 坐标定位 </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  </BaseWidget>
</template>

<style scoped></style>
