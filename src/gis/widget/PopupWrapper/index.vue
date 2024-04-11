<script setup lang="ts">
import { onMounted, onUnmounted, inject, render, h, computed } from 'vue'
import { type LngLatLike, Popup, type PopupOptions } from 'mapbox-gl'
let defaultXY = {
  x: 0,
  y: 0
}
let divOffset = {
  l: 0,
  t: 0
}

export type PopupEvent = {
  type: 'open' | 'close'
  target: Popup
}

// type TPopupWrapper =  PopupOptions& {
type TPopupWrapper = {
  popupOption?: PopupOptions
  title: string
  popupData: any
  lngLat: LngLatLike
  enableDrag?: boolean
}

const map = inject<any>('map')
const props = defineProps<TPopupWrapper>()
const emit = defineEmits<{
  closeHandle: [value: PopupEvent]
  openHandle: [value: PopupEvent]
}>()

const container = computed(() => {
  const content = document.createElement('div')
  content.className = 'popup-content-wrap'
  const header = document.createElement('div')
  header.className = 'popup-header-wrap'
  const titleDiv = document.createElement('div')
  titleDiv.className = 'popup-title-wrap'
  titleDiv.id = 'popup-title-wrap-id'
  titleDiv.innerText = props.title ?? ''
  header.appendChild(titleDiv)
  content.appendChild(header)
  const p = h(props.popupData.template, { data: props.popupData.properties })
  render(p, content)
  return content
})

const popup = computed<Popup>(() => {
  const options = { ...props, maxWidth: 'none', className: 'mapboxgl-popup-wrapper' }
  const pp = new Popup(options).setLngLat(props.lngLat)
  pp.once('open', (e: any) => {
    emit('openHandle', e as PopupEvent)
  })
  return pp
})

const ppHeader = document.getElementsByClassName('popup-header-wrap')[0]
const ppContainer = (popup.value as any)._container as HTMLElement

const onCloseHandle = (e: any) => {
  emit('closeHandle', e as PopupEvent)
}

const mousedown = (e: any) => {
  e.preventDefault() // 阻止事件默认行为
  defaultXY = {
    x: e.clientX,
    y: e.clientY
  }
  divOffset = {
    l: ppContainer.offsetLeft,
    t: ppContainer.offsetTop
  }
  ppHeader.addEventListener('mousemove', mousemove)
}

const mousemove = (e: any) => {
  if (ppContainer) {
    // 获取x和y
    let nx = e.clientX
    let ny = e.clientY
    let nl = nx - (defaultXY.x - divOffset.l)
    let nt = ny - (defaultXY.y - divOffset.t)
    ppContainer.style.left = nl + 'px'
    ppContainer.style.top = nt + 'px'
  }
}

const mouseup = () => {
  ppHeader.removeEventListener('mousemove', mousemove)
}

onMounted(() => {
  popup.value.on('close', onCloseHandle)
  map.value && popup.value.setDOMContent(container.value).addTo(map.value)

  if (props.enableDrag) {
    ppHeader.addEventListener('mousedown', mousedown)
    ppHeader.addEventListener('mouseup', mouseup)
  }
})

onMounted(() => {
  if (popup.value.isOpen()) {
    popup.value.setLngLat(props.lngLat)
  }
})

onMounted(() => {
  const titleElem = document.getElementById('popup-title-wrap-id')
  titleElem!.innerText = props.title
})

onUnmounted(() => {
  popup.value.off('close', onCloseHandle)
  ppHeader?.removeEventListener('mousedown', mousedown)
  ppHeader?.removeEventListener('mouseup', mouseup)
  if (popup.value.isOpen()) {
    popup.value.remove()
  }
})
</script>

<template></template>

<style lang="less">
@import './index.less';
</style>
