import { defineComponent, ref, computed, onMounted, openBlock, createElementBlock, normalizeStyle, createElementVNode, Fragment, renderList, unref } from 'vue';
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useMapStore } from '../store/useMapStore.js';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { GISToolHelper } from 'qm-map-wrapper';
import { drawToolList } from './constant.js';
import { Marker } from 'mapbox-gl';
import './DrawWidget.css';

const _hoisted_1 = { class: "mapboxgl-draw-bar" };
const _hoisted_2 = ["title", "onClick"];
var script = /*@__PURE__*/ defineComponent({
    __name: 'DrawWidget',
    props: {
        position: { type: null, required: true }
    },
    setup(__props) {
        const props = __props;
        const mapStore = useMapStore();
        const map = mapStore.map;
        const mode = ref('none');
        const markerRef = ref([]);
        const featureRef = ref([{ id: '' }]);
        const controlstyle = computed(() => ({
            top: `${props.position.top}px`,
            bottom: `${props.position.bottom}px`,
            left: `${props.position.left}px`,
            right: `${props.position.right}px`,
        }));
        const selectedModeHandle = (type) => {
            mode.value = type;
            if (map?.drawTool) {
                map?.drawTool.changeMode(type);
            }
        };
        // 添加关闭按钮
        const addMarkerHandle = (e) => {
            let box = GISToolHelper.getFeatureBoundingBox(e.features[0]);
            let _ele = document.createElement('div');
            _ele.setAttribute('class', 'measureResultClose');
            _ele.setAttribute('id', e.features[0].id);
            _ele.innerHTML = '×';
            let closeMarker = new Marker({
                element: _ele,
                anchor: 'bottom-left',
                offset: [-5, -10],
            })
                .setLngLat(box.getCenter())
                .addTo(map);
            markerRef.value.push(closeMarker);
            _ele.onclick = (e) => {
                e.stopPropagation();
                map?.drawTool.delete(_ele.getAttribute('id'));
                closeMarker.remove();
            };
        };
        const clearAllHandle = () => {
            mode.value = 'simple_select';
            if (map?.drawTool) {
                map?.drawTool.deleteAll();
                map?.drawTool.changeMode('simple_select');
                const ele = document.getElementsByClassName('measureResultClose');
                map?.drawTool.delete(ele);
                markerRef.value.forEach((item) => {
                    item.remove();
                });
            }
        };
        const updatetDraw = (e) => {
            markerRef.value
                .filter((item) => {
                return item._element.getAttribute('id') === e.features[0].id;
            })
                .map((d) => {
                d.remove();
                return null;
            });
            addMarkerHandle(e);
        };
        const creatDraw = (e) => {
            if (featureRef.value[0].id !== e.features[0].id) {
                featureRef.value = e.features;
                addMarkerHandle(e);
            }
        };
        onMounted(() => {
            if (!map?.drawTool && map) {
                map.drawTool = new MapboxDraw({
                    displayControlsDefault: false,
                    modes: { ...MapboxDraw.modes, draw_rectangle: DrawRectangle },
                    defaultMode: 'simple_select',
                });
                map.addControl(map.drawTool, 'bottom-right');
                map.on('draw.create', creatDraw);
                map.on('draw.update', updatetDraw);
            }
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                class: "mapboxgl-draw",
                style: normalizeStyle(controlstyle.value)
            }, [
                createElementVNode("div", _hoisted_1, [
                    createElementVNode("div", null, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(drawToolList), (item) => {
                            return (openBlock(), createElementBlock("div", {
                                key: item.mode,
                                title: item.title,
                                class: "mapboxgl-draw-bar-button",
                                style: normalizeStyle({ backgroundImage: `url(${item.icon})` }),
                                onClick: ($event) => (item.mode === 'simple_select' ? clearAllHandle() : selectedModeHandle(item.mode))
                            }, null, 12 /* STYLE, PROPS */, _hoisted_2));
                        }), 128 /* KEYED_FRAGMENT */))
                    ])
                ])
            ], 4 /* STYLE */));
        };
    }
});

export { script as default };
