<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref, watch, computed } from 'vue'
import type { TPouperData } from '../PopupPanel/index.vue'
import { Popup } from 'mapbox-gl'
import Compone from './index'

// let defaultXY = {
//   x: 0,
//   y: 0
// }
// let divOffset = {
//   l: 0,
//   t: 0
// }

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
// const ppHeader = document.getElementsByClassName('popup-header-wrap')[0]
// const ppContainer = ref((popup.value as any)._container as HTMLElement)

const onCloseHandle = (e: any) => {
  emit('closeHandle', e as PopupEvent)
}

// const mousedown = (e: any) => {
//   e.preventDefault() // 阻止事件默认行为
//   defaultXY = {
//     x: e.clientX,
//     y: e.clientY
//   }
//   divOffset = {
//     l: ppContainer.value.offsetLeft,
//     t: ppContainer.value.offsetTop
//   }
//   ppHeader.addEventListener('mousemove', mousemove)
// }

// const mousemove = (e: any) => {
//   if (ppContainer) {
//     // 获取x和y
//     let nx = e.clientX
//     let ny = e.clientY
//     let nl = nx - (defaultXY.x - divOffset.l)
//     let nt = ny - (defaultXY.y - divOffset.t)
//     ppContainer.value.style.left = nl + 'px'
//     ppContainer.value.style.top = nt + 'px'
//   }
// }

// const mouseup = () => {
//   ppHeader.removeEventListener('mousemove', mousemove)
// }

onMounted(() => {
  popup.value.on('close', onCloseHandle)
  map.value && popup.value.setDOMContent(containerRef.value).addTo(map.value)
  if (props.enableDrag) {
    // ppHeader.addEventListener('mousedown', mousedown)
    // ppHeader.addEventListener('mouseup', mouseup)
  }
})

watch(
  () => props.popupData,
  () => {
    popup.value.on('close', onCloseHandle)
    if (popup.value.isOpen()) {
      popup.value.setLngLat(props.popupData.lngLat)
    }

    const titleElem = document.getElementById('popup-title-wrap-id')
    titleElem!.innerText = props.popupData.title
  },
  { deep: true }
)

onUnmounted(() => {
  popup.value.off('close', onCloseHandle)
  // ppHeader?.removeEventListener('mousedown', mousedown)
  // ppHeader?.removeEventListener('mouseup', mouseup)
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
