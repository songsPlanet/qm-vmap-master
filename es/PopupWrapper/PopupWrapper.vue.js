import { defineComponent, ref, watch, onMounted, onUnmounted, openBlock, createElementBlock, createElementVNode, toDisplayString, renderSlot } from 'vue';
import { useMapStore } from '../store/useMapStore.js';
import { Popup } from 'mapbox-gl';
import './PopupWrapper.css';

const _hoisted_1 = { class: "popup-header-wrap" };
const _hoisted_2 = {
    id: "popup-title-wrap-id",
    class: "popup-title-wrap"
};
var script = /*@__PURE__*/ defineComponent({
    __name: 'PopupWrapper',
    props: {
        lngLat: { type: null, required: true },
        enableDrag: { type: Boolean, required: false },
        title: { type: String, required: true }
    },
    emits: ['closeHandle', 'openHandle'],
    setup(__props, { emit: __emit }) {
        const props = __props;
        const emit = __emit;
        const { map } = useMapStore();
        const popup = ref(null);
        const containerRef = ref(null);
        const createPopup = () => {
            const options = {
                ...props,
                closeOnClick: false,
                maxWidth: 'none',
                className: 'mapboxgl-popup-wrapper'
            };
            const pp = new Popup(options).setLngLat(props.lngLat);
            pp.once('open', (e) => {
                emit('openHandle', e);
            });
            pp.on('close', (e) => {
                emit('closeHandle', e);
            });
            return pp;
        };
        watch(() => props.lngLat, () => {
            popup.value?.setLngLat(props.lngLat);
        });
        watch(() => props.title, () => {
            const titleElem = document.getElementById('popup-title-wrap-id');
            titleElem.innerText = props.title;
        });
        onMounted(() => {
            popup.value = createPopup();
            map && containerRef.value && popup.value?.setDOMContent(containerRef.value).addTo(map);
        });
        onUnmounted(() => {
            popup.value?.off('close', () => {
                emit('closeHandle');
            });
            if (popup.value?.isOpen()) {
                popup.value?.remove();
            }
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                ref_key: "containerRef",
                ref: containerRef,
                class: "popup-content-wrap"
            }, [
                createElementVNode("div", _hoisted_1, [
                    createElementVNode("div", _hoisted_2, toDisplayString(_ctx.title), 1 /* TEXT */)
                ]),
                renderSlot(_ctx.$slots, "default")
            ], 512 /* NEED_PATCH */));
        };
    }
});

export { script as default };
