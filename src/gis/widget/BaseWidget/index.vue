<script setup lang="ts">
import { TableSummaryRow } from 'ant-design-vue'
import { EmitFlags } from 'typescript'
import { computed, onMounted, ref, watch } from 'vue'

export interface TWidgetPosition {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface TWidgetOptions {
  position: TWidgetPosition
  name?: string
  icon: string
  width?: number
  height?: number
  isOpenHandle?: boolean
}

const props = defineProps<TWidgetOptions>()
const emit = defineEmits<{
  (e: 'openHandle', value: boolean): void
}>()

const open = ref(false)
const btnStyle = ref({
  backgroundImage: `url(${props.icon})`
})
const controlstyle2 = ref({ width: '30px', height: '30px', ...props.position })
const controlstyle = computed(() => ({
  width: `${open.value ? props.width ?? 30 : 30}px`,
  height: `${open.value ? props.height ?? 30 : 30}px`,
  ...props.position
}))

const onClickHandle = () => {
  if (props.isOpenHandle) {
    emit('openHandle', true)
    open.value = true
  } else {
    open.value = !open.value
  }
}

onMounted(() => {})
watch([props, open], () => {
  console.log('props', props, open)

  if (open.value && props.width && props.height) {
    controlstyle2.value = {
      width: `${props.width}px`,
      height: `${props.height}px`,
      ...props.position
    }
  }
  console.log('controlstyle', controlstyle2)
})
</script>

<template>
  <div class="mapboxgl-control" :style="controlstyle">
    <div class="mapboxgl-bar">
      <div
        class="mapboxgl-bar-button"
        @click="onClickHandle"
        :title="name ?? ''"
        :style="btnStyle"
      ></div>
      <div v-if="name" class="mapboxgl-bar-title">{{ name }}</div>
    </div>
    <slot v-if="open"></slot>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
