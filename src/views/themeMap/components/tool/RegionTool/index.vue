<script setup lang="ts">
import type { TWidgetPosition } from '@/gis/widget/BaseWidget/index.vue'
import { useRegionStore } from '@/store/useRegionStore'
import { getFeatureBoundingBox } from '@/gis/utils'
import { useMapStore } from '@/store/useMapStore'
import { queryRegionFeature } from '@/api/map'
import { Cascader } from 'ant-design-vue'
import { computed, ref } from 'vue'
import './index.less'

interface TRgionWidget {
  position: TWidgetPosition
}

const props = defineProps<TRgionWidget>()
const { map } = useMapStore()
const useRegion = useRegionStore()
const value = ref<string[]>(['34'])

const controlstyle = computed(() => ({
  top: `${props.position.top}px`,
  bottom: `${props.position.bottom}px`,
  left: `${props.position.left}px`,
  right: `${props.position.right}px`
}))

const locationRegionFeature = (code: string) => {
  queryRegionFeature({ code }).then((ctx: any) => {
    map?.selectFeature(ctx?.data)
    const feat = ctx?.data?.features[0] || null
    if (feat) {
      const bds = getFeatureBoundingBox(feat)
      map?.fitBounds(bds)
    }
  })
}

const onChangeHandle = async (_: any, selectedOptions: any) => {
  const node = selectedOptions[selectedOptions.length - 1]
  useRegion.upateCurrent(node)
  const code = node?.value
  if (code) {
    if (code.length === 2 || code.length === 4) {
      map?.clearSelect()
      map?.flyTo({
        center: [115.39047951086354, 33.2714096725866],
        zoom: 9.55
      })
    } else {
      locationRegionFeature(node.value)
    }
  }
}
</script>

<template>
  <div class="region-tool" :style="controlstyle">
    <Cascader
      change-on-select
      v-model:value="value"
      :options="useRegion.region"
      :allow-clear="false"
      :style="{ width: '100%' }"
      @change="onChangeHandle"
    ></Cascader>
  </div>
</template>
