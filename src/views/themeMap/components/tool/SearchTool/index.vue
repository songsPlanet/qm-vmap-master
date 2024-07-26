<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { ref, h } from 'vue'
import './index.less'
import searcheContent from './searcheContent.vue'
import { UserOutlined } from '@ant-design/icons-vue'

import ToolWidget from '@/gis/widget/ToolWidget/index.vue'

interface TPanelWidget {
  position: TWidgetPosition
}

const props = defineProps<TPanelWidget>()
const open = ref(false)

const onOpenHandle = () => {
  open.value = !open.value
}
</script>

<template>
  <ToolWidget
    :isOpenHandle="true"
    :icon="h(UserOutlined)"
    :position="props.position"
    @openHandle="onOpenHandle"
  >
    <component v-if="open" :is="searcheContent"> </component>
  </ToolWidget>
</template>
