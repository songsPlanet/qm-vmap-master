<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue';
import { UserOutlined } from '@ant-design/icons-vue';
import ToolWidget from '@/gis/ToolWidget/ToolWidget.vue';
import SearchContent from './SearchContent.vue';
import { ref, h } from 'vue';
import './index.less';

interface TPanelWidget {
  position: TWidgetPosition;
}

const props = defineProps<TPanelWidget>();
const open = ref(false);

const onOpenHandle = () => {
  open.value = !open.value;
};
</script>

<template>
  <ToolWidget
    title="人员搜索"
    isOpenHandle
    :icon="h(UserOutlined)"
    :position="props.position"
    @openHandle="onOpenHandle"
  >
    <component :is="SearchContent" v-if="open"> </component>
  </ToolWidget>
</template>
