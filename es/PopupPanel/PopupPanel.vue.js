import { defineComponent, shallowRef, onMounted, openBlock, createElementBlock, createBlock, withCtx, resolveDynamicComponent, createCommentVNode } from 'vue';
import '../PopupWrapper/PopupWrapper.vue2.js';
import { useMapStore } from '../store/useMapStore.js';
import script$1 from '../PopupWrapper/PopupWrapper.vue.js';

var script = /*@__PURE__*/ defineComponent({
    __name: 'PopupPanel',
    props: {
        vector: { type: Array, required: false },
        wms: { type: Object, required: false }
    },
    setup(__props) {
        const props = __props;
        const { map } = useMapStore();
        const popupData = shallowRef(null);
        const onCloseHandle = () => {
            map.clearSelect();
            popupData.value = null;
        };
        onMounted(() => {
            // 矢量图层添加交互效果
            props.vector?.forEach((d) => {
                map?.on('mouseenter', d.id, () => {
                    map.getCanvas().style.cursor = 'pointer';
                });
                map?.on('mouseleave', d.id, () => {
                    map.getCanvas().style.cursor = '';
                });
            });
            const vectorLayerClicked = (map, e) => {
                if (props.vector) {
                    const ids = props.vector
                        .filter((d) => {
                        const flag = map?.getLayerList().find((f) => f.options.id === d.id && f.options.isAdd);
                        return flag;
                    })
                        .map((d) => d.id);
                    const features = map.queryRenderedFeatures(e.point, { layers: ids });
                    if (features.length) {
                        const feature = features[0];
                        const title = props.vector.find((d) => feature.layer.id === d.id).title;
                        const slotComponent = props.vector.find((d) => feature.layer.id === d.id).slotComponent;
                        map.selectFeature(feature);
                        popupData.value = {
                            properties: feature.properties,
                            lngLat: e.lngLat,
                            title,
                            slotComponent
                        };
                    }
                }
            };
            map?.on('click', async (e) => {
                vectorLayerClicked(map, e);
            });
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", null, [
                (popupData.value)
                    ? (openBlock(), createBlock(script$1, {
                        key: 0,
                        title: popupData.value.title,
                        lngLat: popupData.value.lngLat,
                        closeOnClick: false,
                        onCloseHandle: onCloseHandle
                    }, {
                        default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(popupData.value.slotComponent), {
                                key: popupData.value.properties,
                                data: popupData.value.properties
                            }, null, 8 /* PROPS */, ["data"]))
                        ]),
                        _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["title", "lngLat"]))
                    : createCommentVNode("v-if", true)
            ]));
        };
    }
});

export { script as default };
