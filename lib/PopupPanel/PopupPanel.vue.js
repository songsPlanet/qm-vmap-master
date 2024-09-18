"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _vue = require("vue");
require("../PopupWrapper/PopupWrapper.vue2.js");
var _useMapStore2 = require("../store/useMapStore.js");
var _PopupWrapperVue2 = _interopRequireDefault(require("../PopupWrapper/PopupWrapper.vue.js"));
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'PopupPanel',
  props: {
    vector: {
      type: Array,
      required: false
    },
    wms: {
      type: Object,
      required: false
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var _useMapStore = (0, _useMapStore2.useMapStore)(),
      map = (0, _map["default"])(_useMapStore);
    var popupData = (0, _vue.shallowRef)(null);
    var onCloseHandle = function onCloseHandle() {
      map.clearSelect();
      popupData.value = null;
    };
    (0, _vue.onMounted)(function () {
      var _props$vector;
      // 矢量图层添加交互效果
      (_props$vector = props.vector) === null || _props$vector === void 0 || (0, _forEach["default"])(_props$vector).call(_props$vector, function (d) {
        map === null || map === void 0 || map.on('mouseenter', d.id, function () {
          map.getCanvas().style.cursor = 'pointer';
        });
        map === null || map === void 0 || map.on('mouseleave', d.id, function () {
          map.getCanvas().style.cursor = '';
        });
      });
      var vectorLayerClicked = function vectorLayerClicked(map, e) {
        if (props.vector) {
          var _context, _context2;
          var ids = (0, _map["default"])(_context = (0, _filter["default"])(_context2 = props.vector).call(_context2, function (d) {
            var _context3;
            var flag = map === null || map === void 0 ? void 0 : (0, _find["default"])(_context3 = map.getLayerList()).call(_context3, function (f) {
              return f.options.id === d.id && f.options.isAdd;
            });
            return flag;
          })).call(_context, function (d) {
            return d.id;
          });
          var features = map.queryRenderedFeatures(e.point, {
            layers: ids
          });
          if (features.length) {
            var _context4, _context5;
            var feature = features[0];
            var title = (0, _find["default"])(_context4 = props.vector).call(_context4, function (d) {
              return feature.layer.id === d.id;
            }).title;
            var slotComponent = (0, _find["default"])(_context5 = props.vector).call(_context5, function (d) {
              return feature.layer.id === d.id;
            }).slotComponent;
            map.selectFeature(feature);
            popupData.value = {
              properties: feature.properties,
              lngLat: e.lngLat,
              title: title,
              slotComponent: slotComponent
            };
          }
        }
      };
      map === null || map === void 0 || map.on('click', /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
          return _regenerator["default"].wrap(function _callee$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                vectorLayerClicked(map, e);
              case 1:
              case "end":
                return _context6.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", null, [popupData.value ? ((0, _vue.openBlock)(), (0, _vue.createBlock)(_PopupWrapperVue2["default"], {
        key: 0,
        title: popupData.value.title,
        lngLat: popupData.value.lngLat,
        closeOnClick: false,
        onCloseHandle: onCloseHandle
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [((0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.resolveDynamicComponent)(popupData.value.slotComponent), {
            key: popupData.value.properties,
            data: popupData.value.properties
          }, null, 8 /* PROPS */, ["data"]))];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["title", "lngLat"])) : (0, _vue.createCommentVNode)("v-if", true)]);
    };
  }
});