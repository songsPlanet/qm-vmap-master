<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { Descriptions, List } from 'ant-design-vue'

const props = defineProps({ data: {} as any })
const list = ref([])

const getInsuranceList = (value: string) => {
  // getInsuranceListApi(value).then((ctx: any) => {
  //   const temp = ctx?.data || [];
  //   setList(temp);
  // });
}

const fieldMap: any = () => {
  return [
    {
      name: 'dkbm',
      text: '地块编码'
    },
    {
      name: 'policyNo',
      text: '保单号'
    },
    {
      name: 'holder',
      text: '投保人'
    },
    {
      name: 'subjectName',
      text: '承保险种'
    },
    {
      name: 'signTime',
      text: '签单日期'
    },
    {
      name: 'policyStartTime',
      text: '保险起止日期',
      func: (data: any) => `${data['policyStartTime']}-${data['policyEndTime']}`
    },
    {
      name: 'cbfmc',
      text: '地块承包方'
    },
    {
      name: 'scmjm',
      text: '确权面积',
      func: (data: any) => `${data['scmjm']}亩`
    },
    {
      name: 'subjectAddress',
      text: '地址'
    }
  ]
}

onMounted(() => {
  if (props.data.dkbm) {
    getInsuranceList(props.data?.dkbm)
  }
})
</script>

<template>
  <List
    item-layout="vertical"
    size="small"
    :pagination="{ pageSize: 1 }"
    :loading="list.length === 0"
    :data-source="list"
  >
    <template #renderItem="{ item }">
      <a-list-item :key="item.insuranceNo">
        <Descriptions :column="1" layout="horizontal" bordered size="small">
          <Descriptions.Item v-for="items in fieldMap" :key="items.name" :label="items.text">
            {{ items.func ? items.func() : props.data[items.name] }}
          </Descriptions.Item>
        </Descriptions>
      </a-list-item>
    </template>
  </List>
</template>
