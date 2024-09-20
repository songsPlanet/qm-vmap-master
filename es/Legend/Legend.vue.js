import { defineComponent, ref, onMounted, onUnmounted, openBlock, createBlock, withCtx, createElementVNode, createVNode, createElementBlock, Fragment, renderList, toDisplayString } from 'vue';
import { GISToolHelper, MapEvent } from 'qm-map-wrapper';
import '../BaseWidget/BaseWidget.vue2.js';
import { useMapStore } from '../store/useMapStore.js';
import './singleLegend.vue.js';
import './Legend.css';
import script$1 from '../BaseWidget/BaseWidget.vue.js';
import script$2 from './singleLegend.vue2.js';

const _hoisted_1 = { class: "mapboxgl-legend" };
const _hoisted_2 = { className: "mapboxgl-legend-tilte" };
const LegendIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTEwNzAzMTU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTExMiAxMTJtMzIgMGw3MzYgMHEzMiAwIDMyIDMybDAgNzM2cTAgMzItMzIgMzJsLTczNiAwcS0zMiAwLTMyLTMybDAtNzM2cTAtMzIgMzItMzJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI0OTczIj48L3BhdGg+PHBhdGggZD0iTTEyOCA5Nmg3NjhhMzIgMzIgMCAwIDEgMzIgMzJ2NzY4YTMyIDMyIDAgMCAxLTMyIDMySDEyOGEzMiAzMiAwIDAgMS0zMi0zMlYxMjhhMzIgMzIgMCAwIDEgMzItMzJ6IG0wIDMydjc2OGg3NjhWMTI4SDEyOHoiIGZpbGw9IiM1RDZEN0UiIHAtaWQ9IjQ5NzQiPjwvcGF0aD48cGF0aCBkPSJNMjI0IDM4NGg2NHY2NEgyMjRWMzg0eiBtMCAxMjhoNjR2NjRIMjI0di02NHogbTAgMTI4aDY0djY0SDIyNHYtNjR6IG0wIDEyOGg2NHY2NEgyMjR2LTY0ek01NDQgMzg0aDY0djY0aC02NFYzODR6IG0wIDEyOGg2NHY2NGgtNjR2LTY0eiBtMCAxMjhoNjR2NjRoLTY0di02NHogbTAgMTI4aDY0djY0aC02NHYtNjR6IiBmaWxsPSIjODA4RkExIiBwLWlkPSI0OTc1Ij48L3BhdGg+PHBhdGggZD0iTTMyMCAzODRoMTYwdjY0SDMyMFYzODR6IG0wIDEyOGgxNjB2NjRIMzIwdi02NHogbTAgMTI4aDE2MHY2NEgzMjB2LTY0eiBtMCAxMjhoMTYwdjY0SDMyMHYtNjR6TTY0MCAzODRoMTYwdjY0aC0xNjBWMzg0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiIgZmlsbD0iI0FDQjRDMCIgcC1pZD0iNDk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjQgMjI0aDU3NnY5NkgyMjR6IiBmaWxsPSIjMzBBRDk4IiBwLWlkPSI0OTc3Ij48L3BhdGg+PC9zdmc+';
var script = /*@__PURE__*/ defineComponent({
    __name: 'Legend',
    props: {
        position: { type: null, required: true },
        icon: { type: String, required: false }
    },
    setup(__props) {
        const props = __props;
        const mapStore = useMapStore();
        const map = mapStore.map;
        const baseHeight = ref(200);
        const groupLegendList = ref([]);
        const singleLegendList = ref([]);
        const loop = (layers, hArr) => {
            groupLegendList.value = [];
            singleLegendList.value = [];
            let groupNodeData;
            let itemNodeData;
            layers.forEach((layer) => {
                groupNodeData = undefined;
                itemNodeData = undefined;
                if ('layers' in layer && !layer.options.legend) {
                    loop(layer.layers, hArr);
                }
                else if (layer.options.legend &&
                    (layer.options.isAdd || ('layers' in layer && layer.layers.filter((d) => d.options.isAdd).length))) {
                    const { title, items } = layer.options.legend;
                    if (items) {
                        // 图例组
                        const titleName = title ? title : layer.options.name;
                        groupNodeData = { title: titleName, items };
                        // eslint-disable-next-line array-callback-return
                        items?.map(() => {
                            hArr.push(26);
                        });
                        hArr.push(50);
                    }
                    else {
                        // 单个图例
                        const { style, imageId, text } = layer.options.legend;
                        const img = map?.images.find((f) => f.id === imageId);
                        const titleName = text ? text : layer.options.name;
                        itemNodeData = { text: titleName, style, img };
                        hArr.push(26);
                    }
                }
                else {
                    groupNodeData = undefined;
                    itemNodeData = undefined;
                }
                if (groupNodeData) {
                    groupLegendList.value.push(groupNodeData);
                }
                if (itemNodeData) {
                    singleLegendList.value.push(itemNodeData);
                }
            });
        };
        const init = () => {
            // 计算高度
            const hArr = [];
            // dom
            loop(map.layers, hArr);
            const hei = hArr.reduce((sum, cur) => {
                return sum + cur;
            }, 0);
            baseHeight.value = hei + 50;
        };
        const mapLayerChangedHandle = GISToolHelper.debounce(() => {
            init();
        }, 200);
        onMounted(() => {
            map?.on(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
            init();
        });
        onUnmounted(() => {
            map?.off(MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
        });
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(script$1, {
                name: "图例",
                width: 200,
                height: baseHeight.value,
                position: props.position,
                icon: props.icon ? props.icon : LegendIcon
            }, {
                default: withCtx(() => [
                    createElementVNode("div", _hoisted_1, [
                        createVNode(script$2, { "prop-list": singleLegendList.value }, null, 8 /* PROPS */, ["prop-list"]),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(groupLegendList.value, (list) => {
                            return (openBlock(), createElementBlock("div", {
                                key: list.title,
                                className: "mapboxgl-legend-group"
                            }, [
                                createElementVNode("div", _hoisted_2, toDisplayString(list.title), 1 /* TEXT */),
                                createVNode(script$2, {
                                    "prop-list": list.items
                                }, null, 8 /* PROPS */, ["prop-list"])
                            ]));
                        }), 128 /* KEYED_FRAGMENT */))
                    ])
                ]),
                _: 1 /* STABLE */
            }, 8 /* PROPS */, ["height", "position", "icon"]));
        };
    }
});

export { script as default };
