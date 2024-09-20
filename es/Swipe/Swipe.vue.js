import { defineComponent, ref, watch, resolveComponent, openBlock, createBlock, withCtx, createVNode, createElementVNode, unref } from 'vue';
import '../BaseWidget/BaseWidget.vue2.js';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import { useMapStore } from '../store/useMapStore.js';
import '../LayerList/LayerList.vue2.js';
import '../MapWidget/MapWidget.vue2.js';
import Compare from 'mapbox-gl-compare';
import './Swipe.css';
import script$1 from '../BaseWidget/BaseWidget.vue.js';
import script$2 from '../MapWidget/MapWidget.vue.js';
import script$3 from '../LayerList/LayerList.vue.js';

const _hoisted_1 = {
    id: "swipeContainer",
    class: "mapboxgl-swipe"
};
const SwipeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTk3MzE2MzYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk2NTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzNy4xIDkxMC4yYzAgNy44IDcuOSAwIDAgMHogbS00OS4yIDBjLTcuOSAwIDAgNy44IDAgMHogbTQzOC40LTY1Mi40Yy0yLjctMi41LTYuNC00LTEwLjEtNC0yLjggMC01LjQgMC44LTcuOCAyLjRsLTM3MS4zIDI0M1YxMjMuMWMwLTcuOC0xNi43IDAtMjQuNiAwLTcuOSAwLTI0LjYtNy44LTI0LjYgMHYzNzYuMmwtMzcxLjMtMjQzYy0yLjUtMS42LTUuMS0yLjQtNy45LTIuNC02LjkgMC0xNC40IDUuNC0xNC40IDE0LjJ2NDk3LjRjMCA4LjcgNy41IDE0LjEgMTQuNSAxNC4xIDIuNyAwIDUuNC0wLjggNy44LTIuNGwzNzEuMy0yNDN2Mzc2LjJoNDkuMlY1MzRsMzcxLjMgMjQzYzIuNSAxLjYgNS4xIDIuNCA3LjkgMi40IDMuNyAwIDcuNC0xLjUgMTAuMS00IDItMS44IDQuMy01LjEgNC4zLTEwLjFWMjY4YzAtNS4xLTIuNC04LjMtNC40LTEwLjJ6IiBmaWxsPSIjMTQwQTBBIiBwLWlkPSI5NjUzIj48L3BhdGg+PC9zdmc+';
var script = /*@__PURE__*/ defineComponent({
    __name: 'Swipe',
    props: {
        position: { type: null, required: true },
        icon: { type: String, required: false }
    },
    setup(__props) {
        const props = __props;
        const mapStore = useMapStore();
        const compare = ref(null);
        const open = ref(false);
        const beforeMap = ref(null);
        const afterMap = ref(null);
        const onBeforeMapLoadHandle = (map) => {
            beforeMap.value = map;
        };
        const onAftherMapLoadHandle = (map) => {
            afterMap.value = map;
        };
        watch([beforeMap, afterMap], (value) => {
            const [newBeforeMap, newAfterMap] = value;
            if (newBeforeMap && newAfterMap) {
                const container = document.getElementById('swipeContainer');
                if (container) {
                    if (compare.value) {
                        compare.value.remove();
                    }
                    compare.value = new Compare(newBeforeMap, newAfterMap, container, {
                        mousemove: false,
                        orientation: 'vertical',
                    });
                }
                newBeforeMap.setCenter(mapStore.map.getCenter());
                newBeforeMap.setZoom(mapStore.map.getZoom());
                newBeforeMap.setBearing(mapStore.map.getBearing());
                newAfterMap.setPitch(mapStore.map.getPitch());
            }
        });
        return (_ctx, _cache) => {
            const _component_a_modal = resolveComponent("a-modal");
            return (openBlock(), createBlock(script$1, {
                name: "卷帘工具",
                "is-open-handle": "",
                position: props.position,
                icon: props.icon ? props.icon : SwipeIcon,
                onOpenHandle: _cache[1] || (_cache[1] = ($event) => (open.value = true))
            }, {
                default: withCtx(() => [
                    createVNode(_component_a_modal, {
                        open: open.value,
                        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => ((open).value = $event)),
                        title: "卷帘对比",
                        width: 1250,
                        destroyOnClose: "",
                        footer: null,
                        maskClosable: false
                    }, {
                        default: withCtx(() => [
                            createElementVNode("div", _hoisted_1, [
                                createVNode(script$2, {
                                    "class-name": "swipe-map-container",
                                    "map-options": { ...unref(mapStore).map.options, id: 'swipeBeforeMap' },
                                    "map-layer-setting": unref(mapStore).map.mapLayerSetting,
                                    onOnMapLoad: onBeforeMapLoadHandle
                                }, {
                                    default: withCtx(() => [
                                        createVNode(script$3, { position: { top: 10, left: 10 } })
                                    ]),
                                    _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["map-options", "map-layer-setting"]),
                                createVNode(script$2, {
                                    "class-name": "swipe-map-container",
                                    "map-options": { ...unref(mapStore).map.options, id: 'swipeAfterMap' },
                                    "map-layer-setting": unref(mapStore).map.mapLayerSetting,
                                    onOnMapLoad: onAftherMapLoadHandle
                                }, {
                                    default: withCtx(() => [
                                        createVNode(script$3, { position: { top: 10, right: 10 } })
                                    ]),
                                    _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["map-options", "map-layer-setting"])
                            ])
                        ]),
                        _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["open"])
                ]),
                _: 1 /* STABLE */
            }, 8 /* PROPS */, ["position", "icon"]));
        };
    }
});

export { script as default };
