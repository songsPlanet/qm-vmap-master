import { defineComponent, ref, computed, openBlock, createElementBlock, normalizeStyle, createElementVNode, toDisplayString, createCommentVNode, renderSlot } from 'vue';
import './BaseWidget.less';

const _hoisted_1 = { class: "mapboxgl-bar" };
const _hoisted_2 = ["title"];
const _hoisted_3 = {
    key: 0,
    class: "mapboxgl-bar-title"
};
var script = /*@__PURE__*/ defineComponent({
    __name: 'BaseWidget',
    props: {
        position: { type: Object, required: true },
        name: { type: String, required: false },
        icon: { type: String, required: true },
        width: { type: Number, required: false },
        height: { type: Number, required: false },
        isOpenHandle: { type: Boolean, required: false }
    },
    emits: ["openHandle"],
    setup(__props, { emit: __emit }) {
        const props = __props;
        const emit = __emit;
        const open = ref(false);
        // eslint-disable-next-line vue/no-setup-props-destructure
        const btnStyle = ref({
            backgroundImage: `url(${props.icon})`
        });
        const controlstyle = computed(() => ({
            width: `${open.value ? props.width ?? 30 : 30}px`,
            height: `${open.value ? props.height ?? 30 : 30}px`,
            top: `${props.position.top}px`,
            bottom: `${props.position.bottom}px`,
            left: `${props.position.left}px`,
            right: `${props.position.right}px`
        }));
        const onClickHandle = () => {
            if (props.isOpenHandle) {
                emit('openHandle', true);
                open.value = true;
            }
            else {
                open.value = !open.value;
            }
        };
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                class: "mapboxgl-control",
                style: normalizeStyle(controlstyle.value)
            }, [
                createElementVNode("div", _hoisted_1, [
                    createElementVNode("div", {
                        class: "mapboxgl-bar-button",
                        title: _ctx.name ?? '',
                        style: normalizeStyle(btnStyle.value),
                        onClick: onClickHandle
                    }, null, 12 /* STYLE, PROPS */, _hoisted_2),
                    (_ctx.name)
                        ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(_ctx.name), 1 /* TEXT */))
                        : createCommentVNode("v-if", true)
                ]),
                (open.value)
                    ? renderSlot(_ctx.$slots, "default", { key: 0 })
                    : createCommentVNode("v-if", true)
            ], 4 /* STYLE */));
        };
    }
});

export { script as default };
