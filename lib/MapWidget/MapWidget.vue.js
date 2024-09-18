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
var _vue = require("vue");
var _qmMapWrapper = require("qm-map-wrapper");
var _useMapStore = require("../store/useMapStore.js");
require("mapbox-gl/dist/mapbox-gl.css");
var _lodash = require("lodash");
require("./MapWidget.less");
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'MapWidget',
  props: {
    mapOptions: {
      type: Object,
      required: true
    },
    mapLayerSetting: {
      type: null,
      required: true
    },
    className: {
      type: String,
      required: false
    }
  },
  emits: ["onMapLoad"],
  setup: function setup(__props, _ref) {
    var __emit = _ref.emit;
    var props = __props;
    var emit = __emit;
    var mapDom = (0, _vue.ref)(null);
    var mapInit = (0, _vue.ref)(false);
    var mapStore = (0, _useMapStore.useMapStore)();
    var loadLayers = function loadLayers(mapload) {
      mapload.load((0, _lodash.cloneDeep)(props.mapLayerSetting));
      mapInit.value = true;
      // 添加动态点图标
      var redAnimationImg = (0, _qmMapWrapper.getPulsingDot)(mapload);
      mapload.addImage('redAnimationImg', redAnimationImg, {
        pixelRatio: 2
      });
      emit('onMapLoad', mapload);
      mapStore.updata(mapload);
    };
    (0, _vue.onMounted)(function () {
      var map = new _qmMapWrapper.MapWrapper(_objectSpread(_objectSpread({
        pitch: 0,
        bearing: 0,
        attributionControl: false,
        renderWorldCopies: false,
        trackResize: true,
        preserveDrawingBuffer: true
      }, props.mapOptions), {}, {
        container: mapDom.value,
        style: {
          version: 8,
          glyphs: "/font/{fontstack}/{range}.pbf",
          sources: {},
          layers: []
        }
      }));
      map.on('load', function () {
        return loadLayers(map);
      });
      map.on('click', function (e) {
        console.log(e.lngLat);
        console.log(map.getCenter(), map.getZoom(), map.getBounds());
      });
      var resizeMap = _qmMapWrapper.GISToolHelper.debounce(function () {
        map.resize();
      }, 500);
      var ro = new ResizeObserver(resizeMap);
      ro.observe(mapDom === null || mapDom === void 0 ? void 0 : mapDom.value);
    });
    (0, _vue.onUnmounted)(function () {
      var _mapStore$map;
      (_mapStore$map = (0, _map["default"])(mapStore)) === null || _mapStore$map === void 0 || _mapStore$map.off('load', function () {
        return loadLayers((0, _map["default"])(mapStore));
      });
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
        id: "map-wrapper",
        ref_key: "mapDom",
        ref: mapDom,
        "class": (0, _vue.normalizeClass)([props.className ? props.className : 'map-wrapper'])
      }, [mapInit.value && (0, _map["default"])((0, _vue.unref)(mapStore)) ? (0, _vue.renderSlot)(_ctx.$slots, "default", {
        key: 0
      }) : (0, _vue.createCommentVNode)("v-if", true)], 2 /* CLASS */);
    };
  }
});