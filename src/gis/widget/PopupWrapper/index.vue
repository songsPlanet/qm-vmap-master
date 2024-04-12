<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref, watch, computed } from 'vue'
import type { TPouperData } from '../PopupPanel/index.vue'
import { Popup } from 'mapbox-gl'
import Compone from './index'

type PopupEvent = {
  type: 'open' | 'close'
  target: Popup
}

type TPopupWrapper = {
  popupData: TPouperData
  enableDrag?: boolean
  closeOnClick: boolean
}

const popup = ref()
const containerRef = ref()
const map = inject<any>('map')
const props = defineProps<TPopupWrapper>()
const emit = defineEmits<{
  closeHandle: [value: PopupEvent]
  openHandle: [value: PopupEvent]
}>()

const popupComp = computed<Popup>(() => {
  const options = { ...props, maxWidth: 'none', className: 'mapboxgl-popup-wrapper' }
  const pp = new Popup(options).setLngLat(props.popupData.lngLat)
  pp.once('open', (e: any) => {
    emit('openHandle', e as PopupEvent)
  })
  return pp
})
popup.value = popupComp.value

const onCloseHandle = (e: any) => {
  emit('closeHandle', e as PopupEvent)
}

const updataPop = () => {
  if (popup.value.isOpen()) {
    popup.value.setLngLat(props.popupData.lngLat)
  }
  const titleElem = document.getElementById('popup-title-wrap-id')
  titleElem!.innerText = props.popupData.title
}

onMounted(() => {
  popup.value.on('close', onCloseHandle)
  updataPop()
  map.value && popup.value.setDOMContent(containerRef.value).addTo(map.value)
})

watch(
  () => props.popupData,
  () => {
    updataPop()
  }
)

onUnmounted(() => {
  popup.value.off('close', onCloseHandle)
  if (popup.value.isOpen()) {
    popup.value.remove()
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="popup-content-wrap" ref="containerRef">
      <div class="popup-header-wrap">
        <div class="popup-title-wrap" id="popup-title-wrap-id"></div>
      </div>
      <Compone :template="popupData?.template" :data="popupData?.properties" />
    </div>
  </Teleport>
</template>

<style lang="less">
@import './index.less';
</style>
