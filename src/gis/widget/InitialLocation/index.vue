<script setup lang="ts">
import type { TWidgetPosition } from '../BaseWidget/index.vue'
import BaseWidget from '@/gis/widget/BaseWidget/index.vue'
import { useMapStore } from '@/store/useMapStore'
import { ControlIcons } from '@/gis/widget/constant'

const props = defineProps<TWidgetPosition>()
const { map } = useMapStore()
const onOpenHandle = () => {
  map?.zoomHome()
}
</script>

<template>
  <BaseWidget
    name="初始位置"
    :position="props"
    :isOpenHandle="true"
    :icon="ControlIcons.Initial"
    @openHandle="onOpenHandle"
  >
    <div></div>
  </BaseWidget>
</template>
