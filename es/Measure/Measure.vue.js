import { defineComponent, openBlock, createBlock, withCtx, createElementVNode, createVNode, unref, createTextVNode } from 'vue';
import { PolylineMeasure, PolygonMeasure } from 'qm-map-wrapper';
import '../BaseWidget/BaseWidget.vue2.js';
import { useMapStore } from '../store/useMapStore.js';
import { Space, Button } from 'ant-design-vue';
import './Measure.css';
import script$1 from '../BaseWidget/BaseWidget.vue.js';

const _hoisted_1 = { class: "main" };
const MeasureIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWEftlrENAjEMRd+NQMkKdAh6YAHGoKCnBnpaCuZgAGAAJBoYgJYhQI4SKeSCThROUuSak/7l7O+fb8sNmZ8mc34qgaIUOFk/XICNkjck7sTGnsnbV+BtP2yVCaxtHpM7RkCp+FbYcgmclSWYdl1BNg/4ztfsAjG73L/JUdQcUL76eHhfAWeOVESM2YucA9nbUNuYbuT/nISVQKjACHgCL689pGNCr4RYH+gBj6Ct/rqCAXAHjsDcBnLYDlhZ7AAsgCFws9geWAJj4OqR+IuAVCWLilRrFggghskZweWMUyaGyf+VQKcCqUZxaw64pTQVgdZSmirxVx7tqddZVCWQXYEP/oRLIWGFgyoAAAAASUVORK5CYII=';
var script = /*@__PURE__*/ defineComponent({
    __name: 'Measure',
    props: {
        position: { type: null, required: true },
        icon: { type: String, required: false }
    },
    setup(__props) {
        const props = __props;
        const { map } = useMapStore();
        const polylineMeasureHandle = () => {
            if (map !== null) {
                let polylineMeasure = new PolylineMeasure(map);
                polylineMeasure.start();
            }
        };
        const polygonMeasureHandle = () => {
            if (map !== null) {
                let polygonMeasure = new PolygonMeasure(map);
                polygonMeasure.start();
            }
        };
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(script$1, {
                name: "测量工具",
                width: 130,
                height: 110,
                position: props.position,
                icon: props.icon ? props.icon : MeasureIcon
            }, {
                default: withCtx(() => [
                    createElementVNode("div", _hoisted_1, [
                        createVNode(unref(Space), { direction: "vertical" }, {
                            default: withCtx(() => [
                                createVNode(unref(Button), {
                                    block: "",
                                    onClick: polylineMeasureHandle
                                }, {
                                    default: withCtx(() => _cache[0] || (_cache[0] = [
                                        createTextVNode(" 测量距离 ")
                                    ])),
                                    _: 1 /* STABLE */
                                }),
                                createVNode(unref(Button), {
                                    block: "",
                                    onClick: polygonMeasureHandle
                                }, {
                                    default: withCtx(() => _cache[1] || (_cache[1] = [
                                        createTextVNode(" 测量面积 ")
                                    ])),
                                    _: 1 /* STABLE */
                                })
                            ]),
                            _: 1 /* STABLE */
                        })
                    ])
                ]),
                _: 1 /* STABLE */
            }, 8 /* PROPS */, ["position", "icon"]));
        };
    }
});

export { script as default };
