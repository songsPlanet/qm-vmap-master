<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/index.vue'
import { UserOutlined } from '@ant-design/icons-vue'
import ToolWidget from '@/gis/ToolWidget/index.vue'
import SearchContent from './SearchContent.vue'
import { ref, h } from 'vue'
import './index.less'

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
    title="人员搜索"
    :isOpenHandle="true"
    :icon="h(UserOutlined)"
    :position="props.position"
    @openHandle="onOpenHandle"
  >
    <component v-if="open" :is="SearchContent"> </component>
  </ToolWidget>
</template>
