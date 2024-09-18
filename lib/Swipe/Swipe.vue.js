"use strict";

require("core-js/modules/es.array.push.js");
var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _vue = require("vue");
require("../BaseWidget/BaseWidget.vue2.js");
require("mapbox-gl-compare/dist/mapbox-gl-compare.css");
var _useMapStore = require("../store/useMapStore.js");
require("../LayerList/LayerList.vue2.js");
require("../MapWidget/MapWidget.vue2.js");
var _mapboxGlCompare2 = _interopRequireDefault(require("mapbox-gl-compare"));
require("./Swipe.less");
var _BaseWidgetVue2 = _interopRequireDefault(require("../BaseWidget/BaseWidget.vue.js"));
var _MapWidgetVue2 = _interopRequireDefault(require("../MapWidget/MapWidget.vue.js"));
var _LayerListVue2 = _interopRequireDefault(require("../LayerList/LayerList.vue.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  id: "swipeContainer",
  "class": "mapboxgl-swipe"
};
var SwipeIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTk3MzE2MzYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk2NTIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUzNy4xIDkxMC4yYzAgNy44IDcuOSAwIDAgMHogbS00OS4yIDBjLTcuOSAwIDAgNy44IDAgMHogbTQzOC40LTY1Mi40Yy0yLjctMi41LTYuNC00LTEwLjEtNC0yLjggMC01LjQgMC44LTcuOCAyLjRsLTM3MS4zIDI0M1YxMjMuMWMwLTcuOC0xNi43IDAtMjQuNiAwLTcuOSAwLTI0LjYtNy44LTI0LjYgMHYzNzYuMmwtMzcxLjMtMjQzYy0yLjUtMS42LTUuMS0yLjQtNy45LTIuNC02LjkgMC0xNC40IDUuNC0xNC40IDE0LjJ2NDk3LjRjMCA4LjcgNy41IDE0LjEgMTQuNSAxNC4xIDIuNyAwIDUuNC0wLjggNy44LTIuNGwzNzEuMy0yNDN2Mzc2LjJoNDkuMlY1MzRsMzcxLjMgMjQzYzIuNSAxLjYgNS4xIDIuNCA3LjkgMi40IDMuNyAwIDcuNC0xLjUgMTAuMS00IDItMS44IDQuMy01LjEgNC4zLTEwLjFWMjY4YzAtNS4xLTIuNC04LjMtNC40LTEwLjJ6IiBmaWxsPSIjMTQwQTBBIiBwLWlkPSI5NjUzIj48L3BhdGg+PC9zdmc+';
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'Swipe',
  props: {
    position: {
      type: null,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var mapStore = (0, _useMapStore.useMapStore)();
    var compare = (0, _vue.ref)(null);
    var open = (0, _vue.ref)(false);
    var beforeMap = (0, _vue.ref)(null);
    var afterMap = (0, _vue.ref)(null);
    var onBeforeMapLoadHandle = function onBeforeMapLoadHandle(map) {
      beforeMap.value = map;
    };
    var onAftherMapLoadHandle = function onAftherMapLoadHandle(map) {
      afterMap.value = map;
    };
    (0, _vue.watch)([beforeMap, afterMap], function (value) {
      var _value = (0, _slicedToArray2["default"])(value, 2),
        newBeforeMap = _value[0],
        newAfterMap = _value[1];
      if (newBeforeMap && newAfterMap) {
        var container = document.getElementById('swipeContainer');
        if (container) {
          if (compare.value) {
            compare.value.remove();
          }
          compare.value = new _mapboxGlCompare2["default"](newBeforeMap, newAfterMap, container, {
            mousemove: false,
            orientation: 'vertical'
          });
        }
        newBeforeMap.setCenter((0, _map["default"])(mapStore).getCenter());
        newBeforeMap.setZoom((0, _map["default"])(mapStore).getZoom());
        newBeforeMap.setBearing((0, _map["default"])(mapStore).getBearing());
        newAfterMap.setPitch((0, _map["default"])(mapStore).getPitch());
      }
    });
    return function (_ctx, _cache) {
      var _component_a_modal = (0, _vue.resolveComponent)("a-modal");
      return (0, _vue.openBlock)(), (0, _vue.createBlock)(_BaseWidgetVue2["default"], {
        name: "卷帘工具",
        "is-open-handle": "",
        position: props.position,
        icon: props.icon ? props.icon : SwipeIcon,
        onOpenHandle: _cache[1] || (_cache[1] = function ($event) {
          return open.value = true;
        })
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)(_component_a_modal, {
            open: open.value,
            "onUpdate:open": _cache[0] || (_cache[0] = function ($event) {
              return open.value = $event;
            }),
            title: "卷帘对比",
            width: 1250,
            destroyOnClose: "",
            footer: null,
            maskClosable: false
          }, {
            "default": (0, _vue.withCtx)(function () {
              return [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createVNode)(_MapWidgetVue2["default"], {
                "class-name": "swipe-map-container",
                "map-options": _objectSpread(_objectSpread({}, (0, _map["default"])((0, _vue.unref)(mapStore)).options), {}, {
                  id: 'swipeBeforeMap'
                }),
                "map-layer-setting": (0, _map["default"])((0, _vue.unref)(mapStore)).mapLayerSetting,
                onOnMapLoad: onBeforeMapLoadHandle
              }, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createVNode)(_LayerListVue2["default"], {
                    position: {
                      top: 10,
                      left: 10
                    }
                  })];
                }),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["map-options", "map-layer-setting"]), (0, _vue.createVNode)(_MapWidgetVue2["default"], {
                "class-name": "swipe-map-container",
                "map-options": _objectSpread(_objectSpread({}, (0, _map["default"])((0, _vue.unref)(mapStore)).options), {}, {
                  id: 'swipeAfterMap'
                }),
                "map-layer-setting": (0, _map["default"])((0, _vue.unref)(mapStore)).mapLayerSetting,
                onOnMapLoad: onAftherMapLoadHandle
              }, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createVNode)(_LayerListVue2["default"], {
                    position: {
                      top: 10,
                      right: 10
                    }
                  })];
                }),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["map-options", "map-layer-setting"])])];
            }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["open"])];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["position", "icon"]);
    };
  }
});