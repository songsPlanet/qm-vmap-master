<script setup lang="ts">
import { Descriptions } from 'ant-design-vue'
import { ref } from 'vue'
interface TWidgetOptions {
  data: any
}
const props = defineProps<TWidgetOptions>()
const fieldMap = ref([
    {
        name: 'dkbm',
        text: '地块编码',
      },
      {
        name: 'dkmc',
        text: '地块名称',
      },
      {
        name: 'zjrxm',
        text: '确权人名称',
      },
      {
        name: 'scmjm',
        text: '实测面积',
        func: () => `${props.data['scmjm']}亩`,
      },
      {
        name: 'XZQH',
        text: '行政区划',
        func: () => `${props.data['sjxzqh']}-${props.data['xjxzqh']}-${props.data['xzxzqh']}-${props.data['cjxzqh']}`,
      },
])
</script>

<template>
  <Descriptions :column="1" layout="horizontal" bordered size="small">
    <Descriptions.Item v-for="items in fieldMap" :key="items.name" :label="items.text">
      {{ items.func ? items.func() : props.data[items.name] }}
    </Descriptions.Item>
  </Descriptions>
</template>

