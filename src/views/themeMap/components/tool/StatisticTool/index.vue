<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue';
import StatisticContent from './StatisticContent.vue';
import { UserOutlined } from '@ant-design/icons-vue';
import ToolWidget from '@/gis/ToolWidget/ToolWidget.vue';
import { Drawer } from 'ant-design-vue';
import { ref, h } from 'vue';

interface TPanelWidget {
  position: TWidgetPosition;
}

const props = defineProps<TPanelWidget>();
const open = ref(false);

const onOpenHandle = () => {
  open.value = !open.value;
};

const onCloseHandle = () => {
  open.value = false;
};
</script>

<template>
  <ToolWidget
    title="空间统计"
    isOpenHandle
    :icon="h(UserOutlined)"
    :position="props.position"
    @openHandle="onOpenHandle"
  >
    <Drawer
      closable
      width="auto"
      :open="open"
      :mask="false"
      destroyOnClose
      title="空间统计"
      placement="right"
      @close="onCloseHandle"
    >
      <component :is="StatisticContent" v-if="open"> </component>
    </Drawer>
  </ToolWidget>
</template>
