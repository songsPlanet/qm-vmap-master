import { defineComponent, openBlock, createElementBlock, Fragment, renderList, normalizeStyle, createElementVNode, toDisplayString } from 'vue';
import './Legend.css';

const _hoisted_1 = ["src"];
const _hoisted_2 = { class: "mapboxgl-legend-item-text" };
var script = /*@__PURE__*/ defineComponent({
    __name: 'singleLegend',
    props: {
        propList: { type: Array, required: true }
    },
    setup(__props) {
        const props = __props;
        return (_ctx, _cache) => {
            return (openBlock(true), createElementBlock(Fragment, null, renderList(props.propList, (items) => {
                return (openBlock(), createElementBlock("div", {
                    key: items.text,
                    className: "mapboxgl-legend-item"
                }, [
                    (items.img)
                        ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: items.img.data,
                            alt: "",
                            class: "mapboxgl-legend-item-img"
                        }, null, 8 /* PROPS */, _hoisted_1))
                        : (openBlock(), createElementBlock("div", {
                            key: 1,
                            class: "mapboxgl-legend-item-geo",
                            style: normalizeStyle(items.style)
                        }, null, 4 /* STYLE */)),
                    createElementVNode("div", _hoisted_2, toDisplayString(items.text), 1 /* TEXT */)
                ]));
            }), 128 /* KEYED_FRAGMENT */));
        };
    }
});

export { script as default };
