"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
require("core-js/modules/es.array.push.js");
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _vue = require("vue");
var _mapboxGlDrawRectangleMode = _interopRequireDefault(require("mapbox-gl-draw-rectangle-mode"));
require("@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css");
var _useMapStore = require("../store/useMapStore.js");
var _mapboxGlDraw2 = _interopRequireDefault(require("@mapbox/mapbox-gl-draw"));
var _qmMapWrapper = require("qm-map-wrapper");
var _constant = require("./constant.js");
var _mapboxGl = require("mapbox-gl");
require("./DrawWidget.css");
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty2(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context4, _context5; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty2(_context4 = ownKeys(Object(t), !0)).call(_context4, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty2(_context5 = ownKeys(Object(t))).call(_context5, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  "class": "mapboxgl-draw-bar"
};
var _hoisted_2 = ["title", "onClick"];
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'DrawWidget',
  props: {
    position: {
      type: null,
      required: true
    }
  },
  setup: function setup(__props) {
    var props = __props;
    var mapStore = (0, _useMapStore.useMapStore)();
    var map = (0, _map["default"])(mapStore);
    var mode = (0, _vue.ref)('none');
    var markerRef = (0, _vue.ref)([]);
    var featureRef = (0, _vue.ref)([{
      id: ''
    }]);
    var controlstyle = (0, _vue.computed)(function () {
      return {
        top: "".concat(props.position.top, "px"),
        bottom: "".concat(props.position.bottom, "px"),
        left: "".concat(props.position.left, "px"),
        right: "".concat(props.position.right, "px")
      };
    });
    var selectedModeHandle = function selectedModeHandle(type) {
      mode.value = type;
      if (map !== null && map !== void 0 && map.drawTool) {
        map === null || map === void 0 || map.drawTool.changeMode(type);
      }
    };
    // 添加关闭按钮
    var addMarkerHandle = function addMarkerHandle(e) {
      var box = _qmMapWrapper.GISToolHelper.getFeatureBoundingBox(e.features[0]);
      var _ele = document.createElement('div');
      _ele.setAttribute('class', 'measureResultClose');
      _ele.setAttribute('id', e.features[0].id);
      _ele.innerHTML = '×';
      var closeMarker = new _mapboxGl.Marker({
        element: _ele,
        anchor: 'bottom-left',
        offset: [-5, -10]
      }).setLngLat(box.getCenter()).addTo(map);
      markerRef.value.push(closeMarker);
      _ele.onclick = function (e) {
        e.stopPropagation();
        map === null || map === void 0 || map.drawTool["delete"](_ele.getAttribute('id'));
        closeMarker.remove();
      };
    };
    var clearAllHandle = function clearAllHandle() {
      mode.value = 'simple_select';
      if (map !== null && map !== void 0 && map.drawTool) {
        var _context;
        map === null || map === void 0 || map.drawTool.deleteAll();
        map === null || map === void 0 || map.drawTool.changeMode('simple_select');
        var ele = document.getElementsByClassName('measureResultClose');
        map === null || map === void 0 || map.drawTool["delete"](ele);
        (0, _forEach["default"])(_context = markerRef.value).call(_context, function (item) {
          item.remove();
        });
      }
    };
    var updatetDraw = function updatetDraw(e) {
      var _context2, _context3;
      (0, _map["default"])(_context2 = (0, _filter["default"])(_context3 = markerRef.value).call(_context3, function (item) {
        return item._element.getAttribute('id') === e.features[0].id;
      })).call(_context2, function (d) {
        d.remove();
        return null;
      });
      addMarkerHandle(e);
    };
    var creatDraw = function creatDraw(e) {
      if (featureRef.value[0].id !== e.features[0].id) {
        featureRef.value = e.features;
        addMarkerHandle(e);
      }
    };
    (0, _vue.onMounted)(function () {
      if (!(map !== null && map !== void 0 && map.drawTool) && map) {
        map.drawTool = new _mapboxGlDraw2["default"]({
          displayControlsDefault: false,
          modes: _objectSpread(_objectSpread({}, _mapboxGlDraw2["default"].modes), {}, {
            draw_rectangle: _mapboxGlDrawRectangleMode["default"]
          }),
          defaultMode: 'simple_select'
        });
        map.addControl(map.drawTool, 'bottom-right');
        map.on('draw.create', creatDraw);
        map.on('draw.update', updatetDraw);
      }
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
        "class": "mapboxgl-draw",
        style: (0, _vue.normalizeStyle)(controlstyle.value)
      }, [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createElementVNode)("div", null, [((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)((0, _vue.unref)(_constant.drawToolList), function (item) {
        return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
          key: item.mode,
          title: item.title,
          "class": "mapboxgl-draw-bar-button",
          style: (0, _vue.normalizeStyle)({
            backgroundImage: "url(".concat(item.icon, ")")
          }),
          onClick: function onClick($event) {
            return item.mode === 'simple_select' ? clearAllHandle() : selectedModeHandle(item.mode);
          }
        }, null, 12 /* STYLE, PROPS */, _hoisted_2);
      }), 128 /* KEYED_FRAGMENT */))])])], 4 /* STYLE */);
    };
  }
});