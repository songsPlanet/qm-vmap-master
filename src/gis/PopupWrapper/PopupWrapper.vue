<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMapStore } from '../store/useMapStore'
import type { LngLatLike } from 'mapbox-gl'
import { Popup } from 'mapbox-gl'
import './PopupWrapper.less'

interface PopupEvent {
  type: 'open' | 'close'
  target: Popup
}

interface TPopupWrapper {
  lngLat: LngLatLike
  enableDrag?: boolean
  title: string
}

const props = defineProps<TPopupWrapper>()
const emit = defineEmits(['closeHandle', 'openHandle'])
const { map } = useMapStore()

const popup = ref<Popup | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const createPopup = () => {
  const options = {
    ...props,
    closeOnClick: false,
    maxWidth: 'none',
    className: 'mapboxgl-popup-wrapper'
  }
  const pp: Popup = new Popup(options).setLngLat(props.lngLat)
  pp.once('open', (e) => {
    emit('openHandle', e as PopupEvent)
  })
  pp.on('close', (e) => {
    emit('closeHandle', e as PopupEvent)
  })
  return pp
}

watch(
  () => props.lngLat,
  () => {
    popup.value?.setLngLat(props.lngLat)
  }
)

watch(
  () => props.title,
  () => {
    const titleElem = document.getElementById('popup-title-wrap-id')
    titleElem!.innerText = props.title
  }
)

onMounted(() => {
  popup.value = createPopup()
  map && containerRef.value && popup.value?.setDOMContent(containerRef.value).addTo(map)
})

onUnmounted(() => {
  popup.value?.off('close', () => {
    emit('closeHandle')
  })
  if (popup.value?.isOpen()) {
    popup.value?.remove()
  }
})
</script>

<template>
  <div ref="containerRef" class="popup-content-wrap" >
    <div class="popup-header-wrap">
      <div id="popup-title-wrap-id" class="popup-title-wrap" >{{ title }}</div>
    </div>
    <slot></slot>
  </div>
</template>
