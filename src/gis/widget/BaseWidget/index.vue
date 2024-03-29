<script setup lang="ts">
import { computed, ref, watch } from 'vue'

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
  openHandle?: (value: boolean) => void
}

const { position, name, icon, width, height, openHandle } = defineProps<TWidgetOptions>()
const open = ref(false)
const btnStyle = ref({
  backgroundImage: `url(${icon})`
})
const controlstyle = computed(() => ({
  width: `${open.value ? width ?? 30 : 30}px`,
  height: `${open.value ? height ?? 30 : 30}px`,
  ...position
}))

const onClickHandle = () => {
  if (openHandle) {
    openHandle(true)
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

<style lang="less">
@import './index.less';
</style>
