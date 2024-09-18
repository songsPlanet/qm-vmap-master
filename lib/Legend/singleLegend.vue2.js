"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _vue = require("vue");
require("./Legend.less");
var _hoisted_1 = ["src"];
var _hoisted_2 = {
  "class": "mapboxgl-legend-item-text"
};
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'singleLegend',
  props: {
    propList: {
      type: Array,
      required: true
    }
  },
  setup: function setup(__props) {
    var props = __props;
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(props.propList, function (items) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
          key: items.text,
          className: "mapboxgl-legend-item"
        }, [items.img ? ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("img", {
          key: 0,
          src: items.img.data,
          alt: "",
          "class": "mapboxgl-legend-item-img"
        }, null, 8 /* PROPS */, _hoisted_1)) : ((0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
          key: 1,
          "class": "mapboxgl-legend-item-geo",
          style: (0, _vue.normalizeStyle)(items.style)
        }, null, 4 /* STYLE */)), (0, _vue.createElementVNode)("div", _hoisted_2, (0, _vue.toDisplayString)(items.text), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */);
    };
  }
});