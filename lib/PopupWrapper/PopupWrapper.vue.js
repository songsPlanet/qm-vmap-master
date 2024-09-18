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
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _vue = require("vue");
var _useMapStore2 = require("../store/useMapStore.js");
var _mapboxGl = require("mapbox-gl");
require("./PopupWrapper.less");
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  "class": "popup-header-wrap"
};
var _hoisted_2 = {
  id: "popup-title-wrap-id",
  "class": "popup-title-wrap"
};
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'PopupWrapper',
  props: {
    lngLat: {
      type: null,
      required: true
    },
    enableDrag: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['closeHandle', 'openHandle'],
  setup: function setup(__props, _ref) {
    var __emit = _ref.emit;
    var props = __props;
    var emit = __emit;
    var _useMapStore = (0, _useMapStore2.useMapStore)(),
      map = (0, _map["default"])(_useMapStore);
    var popup = (0, _vue.ref)(null);
    var containerRef = (0, _vue.ref)(null);
    var createPopup = function createPopup() {
      var options = _objectSpread(_objectSpread({}, props), {}, {
        closeOnClick: false,
        maxWidth: 'none',
        className: 'mapboxgl-popup-wrapper'
      });
      var pp = new _mapboxGl.Popup(options).setLngLat(props.lngLat);
      pp.once('open', function (e) {
        emit('openHandle', e);
      });
      pp.on('close', function (e) {
        emit('closeHandle', e);
      });
      return pp;
    };
    (0, _vue.watch)(function () {
      return props.lngLat;
    }, function () {
      var _popup$value;
      (_popup$value = popup.value) === null || _popup$value === void 0 || _popup$value.setLngLat(props.lngLat);
    });
    (0, _vue.watch)(function () {
      return props.title;
    }, function () {
      var titleElem = document.getElementById('popup-title-wrap-id');
      titleElem.innerText = props.title;
    });
    (0, _vue.onMounted)(function () {
      var _popup$value2;
      popup.value = createPopup();
      map && containerRef.value && ((_popup$value2 = popup.value) === null || _popup$value2 === void 0 ? void 0 : _popup$value2.setDOMContent(containerRef.value).addTo(map));
    });
    (0, _vue.onUnmounted)(function () {
      var _popup$value3, _popup$value4;
      (_popup$value3 = popup.value) === null || _popup$value3 === void 0 || _popup$value3.off('close', function () {
        emit('closeHandle');
      });
      if ((_popup$value4 = popup.value) !== null && _popup$value4 !== void 0 && _popup$value4.isOpen()) {
        var _popup$value5;
        (_popup$value5 = popup.value) === null || _popup$value5 === void 0 || _popup$value5.remove();
      }
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
        ref_key: "containerRef",
        ref: containerRef,
        "class": "popup-content-wrap"
      }, [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createElementVNode)("div", _hoisted_2, (0, _vue.toDisplayString)(_ctx.title), 1 /* TEXT */)]), (0, _vue.renderSlot)(_ctx.$slots, "default")], 512 /* NEED_PATCH */);
    };
  }
});