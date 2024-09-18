"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _button = _interopRequireDefault(require("ant-design-vue/lib/button"));
var _vue = require("vue");
require("./ToolWidget.less");
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'ToolWidget',
  props: {
    position: {
      type: null,
      required: true
    },
    isOpenHandle: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: null,
      required: true
    }
  },
  emits: ["openHandle"],
  setup: function setup(__props, _ref) {
    var __emit = _ref.emit;
    var props = __props;
    var emit = __emit;
    var open = (0, _vue.ref)(false);
    var controlstyle = (0, _vue.computed)(function () {
      return {
        top: "".concat(props.position.top, "px"),
        bottom: "".concat(props.position.bottom, "px"),
        left: "".concat(props.position.left, "px"),
        right: "".concat(props.position.right, "px")
      };
    });
    var onClickHandle = function onClickHandle() {
      if (props.isOpenHandle) {
        emit('openHandle', true);
        open.value = true;
      } else {
        open.value = !open.value;
      }
    };
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", null, [(0, _vue.createVNode)((0, _vue.unref)(_button["default"]), {
        style: (0, _vue.normalizeStyle)(controlstyle.value),
        "class": "btn",
        icon: props.icon,
        onClick: onClickHandle
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(props.title), 1 /* TEXT */)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["style", "icon"]), open.value ? (0, _vue.renderSlot)(_ctx.$slots, "default", {
        key: 0
      }) : (0, _vue.createCommentVNode)("v-if", true)]);
    };
  }
});