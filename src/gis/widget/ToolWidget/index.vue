<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { Button } from 'ant-design-vue'
import { ref, computed } from 'vue'
import './index.less'

interface TPanelWidget {
  position: TWidgetPosition
  isOpenHandle?: boolean
  title:string
  icon: any
}

const props = defineProps<TPanelWidget>()
const emit = defineEmits<{
  openHandle: [value: boolean]
}>()
const open = ref(false)

const controlstyle = computed(() => ({
  top: `${props.position.top}px`,
  bottom: `${props.position.bottom}px`,
  left: `${props.position.left}px`,
  right: `${props.position.right}px`
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
  <div>
    <Button :style="controlstyle" class="btn" :icon="props.icon" @click="onClickHandle">
     {{ props.title }}
    </Button>
    <slot v-if="open"></slot>
  </div>
</template>
