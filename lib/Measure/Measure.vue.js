"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _button = _interopRequireDefault(require("ant-design-vue/lib/button"));
var _space = _interopRequireDefault(require("ant-design-vue/lib/space"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _vue = require("vue");
var _qmMapWrapper = require("qm-map-wrapper");
require("../BaseWidget/BaseWidget.vue2.js");
var _useMapStore2 = require("../store/useMapStore.js");
require("./Measure.less");
var _BaseWidgetVue2 = _interopRequireDefault(require("../BaseWidget/BaseWidget.vue.js"));
var _hoisted_1 = {
  "class": "main"
};
var MeasureIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQZJREFUWEftlrENAjEMRd+NQMkKdAh6YAHGoKCnBnpaCuZgAGAAJBoYgJYhQI4SKeSCThROUuSak/7l7O+fb8sNmZ8mc34qgaIUOFk/XICNkjck7sTGnsnbV+BtP2yVCaxtHpM7RkCp+FbYcgmclSWYdl1BNg/4ztfsAjG73L/JUdQcUL76eHhfAWeOVESM2YucA9nbUNuYbuT/nISVQKjACHgCL689pGNCr4RYH+gBj6Ct/rqCAXAHjsDcBnLYDlhZ7AAsgCFws9geWAJj4OqR+IuAVCWLilRrFggghskZweWMUyaGyf+VQKcCqUZxaw64pTQVgdZSmirxVx7tqddZVCWQXYEP/oRLIWGFgyoAAAAASUVORK5CYII=';
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'Measure',
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
    var _useMapStore = (0, _useMapStore2.useMapStore)(),
      map = (0, _map["default"])(_useMapStore);
    var polylineMeasureHandle = function polylineMeasureHandle() {
      if (map !== null) {
        var polylineMeasure = new _qmMapWrapper.PolylineMeasure(map);
        polylineMeasure.start();
      }
    };
    var polygonMeasureHandle = function polygonMeasureHandle() {
      if (map !== null) {
        var polygonMeasure = new _qmMapWrapper.PolygonMeasure(map);
        polygonMeasure.start();
      }
    };
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createBlock)(_BaseWidgetVue2["default"], {
        name: "测量工具",
        width: 130,
        height: 110,
        position: props.position,
        icon: props.icon ? props.icon : MeasureIcon
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createVNode)((0, _vue.unref)(_space["default"]), {
            direction: "vertical"
          }, {
            "default": (0, _vue.withCtx)(function () {
              return [(0, _vue.createVNode)((0, _vue.unref)(_button["default"]), {
                block: "",
                onClick: polylineMeasureHandle
              }, {
                "default": (0, _vue.withCtx)(function () {
                  return _cache[0] || (_cache[0] = [(0, _vue.createTextVNode)(" 测量距离 ")]);
                }),
                _: 1 /* STABLE */
              }), (0, _vue.createVNode)((0, _vue.unref)(_button["default"]), {
                block: "",
                onClick: polygonMeasureHandle
              }, {
                "default": (0, _vue.withCtx)(function () {
                  return _cache[1] || (_cache[1] = [(0, _vue.createTextVNode)(" 测量面积 ")]);
                }),
                _: 1 /* STABLE */
              })];
            }),
            _: 1 /* STABLE */
          })])];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["position", "icon"]);
    };
  }
});