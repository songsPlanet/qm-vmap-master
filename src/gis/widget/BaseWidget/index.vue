<script setup lang="ts">
import { computed, ref } from 'vue'

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
