import { defineComponent, ref, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createCommentVNode } from 'vue';
import { MapWrapper, GISToolHelper, getPulsingDot } from 'qm-map-wrapper';
import { useMapStore } from '../store/useMapStore.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cloneDeep } from 'lodash';
import './MapWidget.less';

var script = /*@__PURE__*/ defineComponent({
    __name: 'MapWidget',
    props: {
        mapOptions: { type: Object, required: true },
        mapLayerSetting: { type: null, required: true },
        className: { type: String, required: false }
    },
    emits: ["onMapLoad"],
    setup(__props, { emit: __emit }) {
        const props = __props;
        const emit = __emit;
        const mapDom = ref(null);
        const mapInit = ref(false);
        const mapStore = useMapStore();
        const loadLayers = (mapload) => {
            mapload.load(cloneDeep(props.mapLayerSetting));
            mapInit.value = true;
            // 添加动态点图标
            const redAnimationImg = getPulsingDot(mapload);
            mapload.addImage('redAnimationImg', redAnimationImg, { pixelRatio: 2 });
            emit('onMapLoad', mapload);
            mapStore.updata(mapload);
        };
        onMounted(() => {
            const map = new MapWrapper({
                pitch: 0,
                bearing: 0,
                attributionControl: false,
                renderWorldCopies: false,
                trackResize: true,
                preserveDrawingBuffer: true,
                ...props.mapOptions,
                container: mapDom.value,
                style: {
                    version: 8,
                    glyphs: `/font/{fontstack}/{range}.pbf`,
                    sources: {},
                    layers: []
                }
            });
            map.on('load', () => loadLayers(map));
            map.on('click', (e) => {
                console.log(e.lngLat);
                console.log(map.getCenter(), map.getZoom(), map.getBounds());
            });
            const resizeMap = GISToolHelper.debounce(() => {
                map.resize();
            }, 500);
            const ro = new ResizeObserver(resizeMap);
            ro.observe(mapDom?.value);
        });
        onUnmounted(() => {
            mapStore.map?.off('load', () => loadLayers(mapStore.map));
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                id: "map-wrapper",
                ref_key: "mapDom",
                ref: mapDom,
                class: normalizeClass([props.className ? props.className : 'map-wrapper'])
            }, [
                (mapInit.value && unref(mapStore).map)
                    ? renderSlot(_ctx.$slots, "default", { key: 0 })
                    : createCommentVNode("v-if", true)
            ], 2 /* CLASS */));
        };
    }
});

export { script as default };
