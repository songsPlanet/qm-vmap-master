"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
var _vue = require("vue");
require("./BaseWidget.css");
var _hoisted_1 = {
  "class": "mapboxgl-bar"
};
var _hoisted_2 = ["title"];
var _hoisted_3 = {
  key: 0,
  "class": "mapboxgl-bar-title"
};
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'BaseWidget',
  props: {
    position: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    isOpenHandle: {
      type: Boolean,
      required: false
    }
  },
  emits: ["openHandle"],
  setup: function setup(__props, _ref) {
    var __emit = _ref.emit;
    var props = __props;
    var emit = __emit;
    var open = (0, _vue.ref)(false);
    // eslint-disable-next-line vue/no-setup-props-destructure
    var btnStyle = (0, _vue.ref)({
      backgroundImage: "url(".concat(props.icon, ")")
    });
    var controlstyle = (0, _vue.computed)(function () {
      var _props$width, _props$height;
      return {
        width: "".concat(open.value ? (_props$width = props.width) !== null && _props$width !== void 0 ? _props$width : 30 : 30, "px"),
        height: "".concat(open.value ? (_props$height = props.height) !== null && _props$height !== void 0 ? _props$height : 30 : 30, "px"),
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
      var _ctx$name;
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
        "class": "mapboxgl-control",
        style: (0, _vue.normalizeStyle)(controlstyle.value)
      }, [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createElementVNode)("div", {
        "class": "mapboxgl-bar-button",
        title: (_ctx$name = _ctx.name) !== null && _ctx$name !== void 0 ? _ctx$name : '',
        style: (0, _vue.normalizeStyle)(btnStyle.value),
        onClick: onClickHandle
      }, null, 12 /* STYLE, PROPS */, _hoisted_2), _ctx.name ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", _hoisted_3, (0, _vue.toDisplayString)(_ctx.name), 1 /* TEXT */)) : (0, _vue.createCommentVNode)("v-if", true)]), open.value ? (0, _vue.renderSlot)(_ctx.$slots, "default", {
        key: 0
      }) : (0, _vue.createCommentVNode)("v-if", true)], 4 /* STYLE */);
    };
  }
});