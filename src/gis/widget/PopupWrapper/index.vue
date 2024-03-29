<script setup lang="ts">
import type { LngLatLike, PopupOptions } from 'mapbox-gl'
import { useMap } from '@/gis/context/mapContext'
import { Popup } from 'mapbox-gl'
import { onMounted, onUnmounted, onUpdated } from 'vue'

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
export type TPopupWrapper = PopupOptions & {
  lngLat: LngLatLike
  enableDrag?: boolean
  title: string
  onOpen?: (e: PopupEvent) => void
  onClose?: (e: PopupEvent) => void
}

const { lngLat, onOpen, onClose, enableDrag, title } = defineProps<TPopupWrapper>()
const props = defineProps<TPopupWrapper>()
const { map } = useMap()

onUpdated(() => {
  if (popup.isOpen()) {
    popup.setLngLat(lngLat)
  }
})

onUpdated(() => {
  const titleElem = document.getElementById('popup-title-wrap-id')
  titleElem!.innerText = title
})

const container = () => {
  const content = document.createElement('div')
  content.className = 'popup-content-wrap'
  const header = document.createElement('div')
  header.className = 'popup-header-wrap'
  const titleDiv = document.createElement('div')
  titleDiv.className = 'popup-title-wrap'
  titleDiv.id = 'popup-title-wrap-id'
  titleDiv.innerText = title ?? ''
  header.appendChild(titleDiv)
  content.appendChild(header)
  return content
}

const popup: any = () => {
  const options = { ...props, maxWidth: 'none', className: 'mapboxgl-popup-wrapper' }
  const pp = new Popup(options).setLngLat(lngLat)

  pp.once('open', (e: any) => {
    onOpen?.(e as PopupEvent)
  })
  return pp
}
const ppHeader = document.getElementsByClassName('popup-header-wrap')[0]
const ppContainer = (popup as any)?._container as HTMLElement

const onCloseHandle = (e: any) => {
  onClose?.(e as PopupEvent)
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
const mouseup = () => {
  ppHeader.removeEventListener('mousemove', mousemove)
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
onMounted(() => {
  map && popup.setDOMContent(container).addTo(map)
  if (enableDrag) {
    ppHeader.addEventListener('mousedown', mousedown)
    ppHeader.addEventListener('mouseup', mouseup)
  }
  if (popup.isOpen()) {
    popup.setLngLat(lngLat)
  }
})

onUnmounted(() => {
  popup.off('close', onCloseHandle)
  ppHeader.removeEventListener('mousedown', mousedown)
  ppHeader.removeEventListener('mouseup', mouseup)
  if (popup.isOpen()) {
    popup.remove()
  }
  const titleElem = document.getElementById('popup-title-wrap-id')
  titleElem!.innerText = title
})
</script>

<template>
  <container >
    <slot></slot>
  </container>
</template>

<style scoped lang="less">
@import './index.less';
</style>
