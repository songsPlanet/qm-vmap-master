<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue'
import BaseWidget from '@/gis/BaseWidget/BaseWidget.vue'
import { ControlIcons } from '@/components/Map/constant'
import { useMapStore } from '@/gis/store/useMapStore'

const props = defineProps<TWidgetPosition>()
const { map } = useMapStore()
const onOpenHandle = () => {
  map?.zoomHome()
  map?.clearSelect()
  map?.clearSelectById('red-dot')
}
</script>

<template>
  <BaseWidget
    name="初始位置"
    isOpenHandle
    :position="props"
    :icon="ControlIcons.Initial"
    @openHandle="onOpenHandle"
  >
    <div></div>
  </BaseWidget>
</template>
