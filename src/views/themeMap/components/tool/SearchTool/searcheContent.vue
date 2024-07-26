<script setup lang="ts">
import { getXXNYZTUserListApi, getXxjyztListDetailApi, getSearchLayerListApi } from '@/api/map'
import { Space, Select, Spin, Descriptions, List, Empty } from 'ant-design-vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMapStore } from '@/store/useMapStore'
import { getFeatureBoundingBox } from '@/gis/utils'
import GeoMap from './GeoMap.vue'
import { debounce } from '@/utils'
import { SearchOutlined } from '@ant-design/icons-vue'

interface TField {
  fzr: string
  zjhm: string
  dkNum: number
  dkArea: number
  tgmj: number
  dkList: {
    dkmc: string
    dkmj: number
    zzzw: string
    mj: number
    geo: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string
  }[]
}

interface TUser {
  id: number
  fzr: string
  zjhm: string
}

const userSearching = ref(false)
const fieldSearching = ref(false)
const objectID = ref<string>('')
const type = ref<string>('')
const layerList = ref<any>()
const userList = ref<TUser[]>([])
const optionValue = ref<any>()
const field = ref<TField>()
const { map } = useMapStore()

const onSelectChange = (value: any) => {
  type.value = value
}

const getXXNYZTUserList: any = debounce((keyWord: string) => {
  getXXNYZTUserListApi(keyWord || '').then((ctx: any) => {
    userList.value = ctx?.data || []
    userSearching.value = false
  })
}, 500)

const getFieldList = (objectID: string, type: string) => {
  fieldSearching.value = true
  getXxjyztListDetailApi(objectID, type).then((ctx: any) => {
    const flag: any = type.split('_')[0]
    const data = ctx?.data || undefined
    const dkList = (data?.dkSpatials.features || []).map((d: any) => {
      return {
        dkmc: d?.properties.dkmc,
        dkmj: d?.properties.dkmj,
        zzzw:
          flag === 'zzjgbh'
            ? d?.properties.zzjgName
            : flag === 'lzxg'
              ? d?.properties.lzxglx
              : flag === 'clyc'
                ? d?.properties.ygcl
                : flag === 'zwzs'
                  ? d?.properties.zwzs
                  : d?.properties.zzzw,
        mj: d?.properties.mj,
        geo: {
          type: 'Feature',
          id: d?.id,
          properties: {},
          geometry: d?.geometry
        }
      }
    })
    if (data) {
      data.dkList = dkList || []
    }
    field.value = data
    fieldSearching.value = false
  })
}

const handleSearch = (newValue: string) => {
  if (newValue) {
    getXXNYZTUserList(newValue)
  } else {
    userList.value = []
  }
}

const handleChange = (id: any) => {
  objectID.value = id
}

const itemClickHandle = (data: any) => {
  map?.selectFeature(data)
  const bounds = getFeatureBoundingBox(data)
  map?.fitBounds(bounds)
}

onMounted(() => {
  getSearchLayerListApi('table_name').then((ctx: any) => {
    const list = (ctx?.data || []).map((d: any) => {
      return {
        value: d.value,
        label: d.dictName
      }
    })
    layerList.value = list
  })
})
watch([objectID, type], () => {
  if (objectID.value && type.value) {
    getFieldList(objectID.value, type.value)
  } else {
    field.value = undefined
  }
})

watch(userList, () => {
  if (userList.value) {
    optionValue.value = userList.value.map((d: any) => ({
      value: d.id,
      label: `${d.fzr}-${d.zjhm}`
    }))
  }
})

onUnmounted(() => {
  map.clearSelect()
})
</script>

<template>
  <Space
    direction="vertical"
    size="large"
    class="panel"
    :style="{
      zIndex: 1,
      width: '400px',
      maxHeight: '700px',
      overflowY: 'auto',
      padding: '20px',
      position: 'absolute',
      right: '10px',
      top: '45px'
    }"
  >
    <Select
      placeholder="请选择分类"
      :style="{ width: '100%' }"
      @change="onSelectChange"
      :options="layerList"
    ></Select>
    <Spin :spinning="userSearching">
      <Select
        class="antd_select"
        allow-clear
        show-search
        :show-arrow="false"
        :filter-option="false"
        v-model:value="objectID"
        @search="handleSearch"
        @change="handleChange"
        :style="{ width: '100%' }"
        :default-active-first-option="false"
        placeholder="请输入人员姓名或者证件号码"
        :options="
          userList.map((d: any) => ({
            value: d.id,
            label: `${d.fzr}-${d.zjhm}`
          }))
        "
      ></Select>
    </Spin>
    <Spin :spinning="fieldSearching">
      <div v-if="field">
        <Descriptions :column="1" bordered title="用户基本信息" size="small">
          <Descriptions.Item label="姓名">{{ field?.fzr }}</Descriptions.Item>
          <Descriptions.Item label="证件号">{{ field?.zjhm }}</Descriptions.Item>
          <Descriptions.Item label="地块数量">{{ field?.dkNum }}</Descriptions.Item>
          <Descriptions.Item label="流转面积">{{ field?.dkArea?.toFixed(2) }}亩</Descriptions.Item>
          <Descriptions.Item label="托管面积">{{ field?.tgmj?.toFixed(2) }}亩</Descriptions.Item>
        </Descriptions>
        <List
          itemLayout="vertical"
          size="small"
          :pagination="{
            simple: true,
            pageSize: 5
          }"
          :data-source="field?.dkList"
        >
          <template #renderItem="{ item }">
            <List.Item style="cursor: pointer" @click="itemClickHandle(item.geo)">
              <Space>
                <GeoMap
                  :data="item.geo"
                  :style="{
                    width: '100px',
                    height: '100px',
                    border: '1px solid #fff'
                  }"
                />
                <div>
                  <p>田块名称：{{ item?.dkmc }}</p>
                  <p>确权面积：{{ item?.dkmj?.toFixed(2) }} 亩</p>
                  <p>种植作物：{{ item?.zzzw }}</p>
                  <p>作物面积：{{ item?.mj?.toFixed(2) }} 亩</p>
                </div>
              </Space>
            </List.Item>
          </template>
        </List>
        />
      </div>
      <Empty v-else style="margin-top: '80px'" />
    </Spin>
  </Space>
</template>
