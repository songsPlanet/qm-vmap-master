<script setup lang="ts">
import { Form, Radio, Button, Space, Input } from 'ant-design-vue'
import { ControlIcons, mapOptions } from '@/components/Map/constant'
import type { TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import BaseWidget from '@/gis/widget/BaseWidget/index.vue'
import { decimalToDms, dmsToDecimal } from '@/components/Map/utils'
import { onMounted, ref, toRaw, reactive } from 'vue'
import { useMapStore } from '@/gis/store/useMapStore'
import type { LngLatLike } from 'mapbox-gl'
import './index.less'

const initialPosition = {
  bearing: 0,
  pitch: 0,
  zoom: 8.7,
  center: mapOptions.center
}

interface TPosition {
  longitude: number | null
  latitude: number | null
}

const props = defineProps<TWidgetPosition>()
const { map } = useMapStore()
const ifDecimal = ref(true)
const radioValue = ref<string>('1')

const useForm = Form.useForm

const formModelRef = reactive({
  longitude: undefined,
  latitude: undefined
})

const formRulesRef = reactive({
  longitude: [
    {
      required: true,
      message: '请输入经度',
      trigger: 'blur'
    }
  ],
  latitude: [
    {
      required: true,
      message: '请输入纬度',
      trigger: 'blur'
    }
  ]
})

const { resetFields, validate, validateInfos } = useForm(formModelRef, formRulesRef, {
  onValidate: (...args) => console.log('提交', ...args)
})

const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(formModelRef))
      const { longitude, latitude } = toRaw(formModelRef)
      if (longitude && latitude) {
        locationHandle([longitude, latitude])
      }
    })
    .catch((err) => {
      console.log('error', err)
    })
}

const locationHandle = (lonlat: LngLatLike) => {
  map?.flyTo({
    duration: 5000,
    bearing: 0,
    center: lonlat,
    zoom: 15.5,
    pitch: 20
  })
  map?.addDotIcon(lonlat as number[])
}

const resetForm = () => {
  map?.clearSelectById('red-dot')

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
  resetFields()
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
        layout="horizontal"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
        :style="{ maxWidth: '600px' }"
      >
        <Form.Item label="类型">
          <Radio.Group v-model:value="radioValue" @change="onRadioChange">
            <Radio value="1"> 十进制 </Radio>
            <Radio value="2"> 度分秒 </Radio>
          </Radio.Group>
        </Form.Item>

        <div v-if="ifDecimal">
          <Form.Item label="经度" v-bind="validateInfos.longitude">
            <Input placeholder="请输入经度" v-model:value="formModelRef.longitude" />
          </Form.Item>
          <Form.Item label="纬度" v-bind="validateInfos.latitude">
            <Input placeholder="请输入纬度" v-model:value="formModelRef.latitude" />
          </Form.Item>
        </div>
        <Form.Item :wrapper-col="{ offset: 6 }">
          <Space>
            <Button type="primary" size="small" @click="initialLocation"> 初始位置 </Button>
            <Button type="primary" size="small" @click.prevent="onSubmit"> 坐标定位 </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  </BaseWidget>
</template>

<style scoped></style>
