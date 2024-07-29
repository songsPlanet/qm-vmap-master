<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { ref, h } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { Drawer } from 'ant-design-vue'
import ToolWidget from '@/gis/widget/ToolWidget/index.vue'
import StatisticContent from './StatisticContent.vue'

interface TPanelWidget {
  position: TWidgetPosition
}

const props = defineProps<TPanelWidget>()
const open = ref(false)

const onOpenHandle = () => {
  open.value = !open.value
}

const onCloseHandle = () => {
  open.value = false
}
</script>

<template>
  <ToolWidget
    title="空间统计"
    :isOpenHandle="true"
    :icon="h(UserOutlined)"
    :position="props.position"
    @openHandle="onOpenHandle"
  >
    <Drawer
      title="空间统计"
      :mask="false"
      placement="right"
      closable
      destroyOnClose
      @close="onCloseHandle"
      :open="open"
      width="auto"
    >
      <component v-if="open" :is="StatisticContent"> </component>
    </Drawer>
  </ToolWidget>
</template>
