import { defineComponent, ref, computed, openBlock, createElementBlock, createVNode, unref, normalizeStyle, withCtx, createTextVNode, toDisplayString, renderSlot, createCommentVNode } from 'vue';
import { Button } from 'ant-design-vue';
import './ToolWidget.css';

var script = /*@__PURE__*/ defineComponent({
    __name: 'ToolWidget',
    props: {
        position: { type: null, required: true },
        isOpenHandle: { type: Boolean, required: false },
        title: { type: String, required: true },
        icon: { type: null, required: true }
    },
    emits: ["openHandle"],
    setup(__props, { emit: __emit }) {
        const props = __props;
        const emit = __emit;
        const open = ref(false);
        const controlstyle = computed(() => ({
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
            return (openBlock(), createElementBlock("div", null, [
                createVNode(unref(Button), {
                    style: normalizeStyle(controlstyle.value),
                    class: "btn",
                    icon: props.icon,
                    onClick: onClickHandle
                }, {
                    default: withCtx(() => [
                        createTextVNode(toDisplayString(props.title), 1 /* TEXT */)
                    ]),
                    _: 1 /* STABLE */
                }, 8 /* PROPS */, ["style", "icon"]),
                (open.value)
                    ? renderSlot(_ctx.$slots, "default", { key: 0 })
                    : createCommentVNode("v-if", true)
            ]));
        };
    }
});

export { script as default };
