<script setup lang="ts">
import { Space, Descriptions } from 'ant-design-vue'
import { colorLib, pieLegendText } from '@/utils/chart.config'
import { defineProps, onMounted, onUnmounted, ref, watch } from 'vue'
import type { TStatisticDetail } from './typing'
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'
import { isEmpty } from '@/utils'

const props = defineProps<TStatisticDetail>()
const pieChart = ref<ECharts | undefined>()
const chartType = ref<HTMLDivElement | null>(null)

const handleResize = () => {
  if (pieChart?.value) {
    pieChart.value.resize()
  }
}

// onMounted(() => {
//       if (chartType.value && !pieChart.value) {
//       pieChart.value = echarts.init(chartType.value);
//     }
//       const statistics = props.data.chartData || [];
//     const amount =
//       statistics.reduce((sum:any, cur:any) => {
//         return sum + cur.area;
//       }, 0) || 0;
//     const option: any = {
//       color: colorLib,
//       title: [
//         {
//           text: props.title,
//           left: 'center',
//           textStyle: {
//             fontSize: 14,
//             fontWeight: 'bolder',
//             color: '#000',
//           },
//         },
//         {
//           text: '面积',
//           top: '20%',
//           left: 'center',
//           textStyle: {
//             fontSize: 15,
//             fontWeight: 'bolder',
//             color: '#000',
//           },
//         },
//         {
//           text: amount ? amount.toFixed(2) : 0,
//           top: '25%',
//           left: 'center',
//           textStyle: {
//             fontSize: 18,
//             color: '#000000',
//           },
//         },
//       ],
//       legend: {
//         ...pieLegendText,
//         type: 'scroll',
//         orient: 'vertical',
//         left: '10%',
//         top: '50%',
//         align: 'left',
//         formatter: (name: any) => {
//           const value = props.data.chartData.find((d) => d.regionName === name)?.area || 0;
//           const r = Number(value / amount) * 100 || 0;
//           return [`{title|${name}} {pecent|${r.toFixed(2) || 0}%}     {value|${value.toFixed(2)}}`];
//         },
//       },
//       tooltip: {
//         trigger: 'item',
//       },
//       series: [
//         {
//           data: props.data.chartData.map((d) => ({ name: d.regionName, value: d.area.toFixed(2) })),
//           type: 'pie',
//           radius: ['50%', '60%'],
//           center: ['50%', '25%'], // 图形位置
//           label: {
//             // 鼠标悬浮具体数据显示
//             show: false,
//           },
//         },
//       ],
//     };
//     if (isEmpty(props.data.chartData)) {
//       // 镇级统计不显示饼状图
//       pieChart.value = undefined;
//     } else {
//       pieChart.value?.setOption(option);
//     }
// })

watch(props.data.chartData, () => {
  if (chartType.value && !pieChart.value) {
    pieChart.value = echarts.init(chartType.value)
  }
  const statistics = props.data.chartData || []
  const amount =
    statistics.reduce((sum: any, cur: any) => {
      return sum + cur.area
    }, 0) || 0
  const option: any = {
    color: colorLib,
    title: [
      {
        text: props.title,
        left: 'center',
        textStyle: {
          fontSize: 14,
          fontWeight: 'bolder',
          color: '#000'
        }
      },
      {
        text: '面积',
        top: '20%',
        left: 'center',
        textStyle: {
          fontSize: 15,
          fontWeight: 'bolder',
          color: '#000'
        }
      },
      {
        text: amount ? amount.toFixed(2) : 0,
        top: '25%',
        left: 'center',
        textStyle: {
          fontSize: 18,
          color: '#000000'
        }
      }
    ],
    legend: {
      ...pieLegendText,
      type: 'scroll',
      orient: 'vertical',
      left: '10%',
      top: '50%',
      align: 'left',
      formatter: (name: any) => {
        const value = props.data.chartData.find((d) => d.regionName === name)?.area || 0
        const r = Number(value / amount) * 100 || 0
        return [`{title|${name}} {pecent|${r.toFixed(2) || 0}%}     {value|${value.toFixed(2)}}`]
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        data: props.data.chartData.map((d) => ({ name: d.regionName, value: d.area.toFixed(2) })),
        type: 'pie',
        radius: ['50%', '60%'],
        center: ['50%', '25%'], // 图形位置
        label: {
          // 鼠标悬浮具体数据显示
          show: false
        }
      }
    ]
  }
  if (isEmpty(props.data.chartData)) {
    // 镇级统计不显示饼状图
    pieChart.value = undefined
  } else {
    pieChart.value?.setOption(option)
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <Space :style="{ width: 380 }" direction="vertical">
    <Descriptions :column="2" layout="vertical" bordered :style="{ textAlign: 'center' }">
      <Descriptions.Item label="区划" :style="{ textAlign: 'center' }">
        {{ props.data.regionName }}
      </Descriptions.Item>
      <Descriptions.Item label="面积" :style="{ textAlign: 'center' }">
        {{ props.data.area ? props.data.area.toFixed(2) : 0 }} 亩
      </Descriptions.Item>
    </Descriptions>
    <div ref="chartType" :style="{ width: 'auto', height: 640, marginTop: 10 }" />
  </Space>
</template>
