"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.useMapStore = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/esnext.async-iterator.map.js");
require("core-js/modules/esnext.iterator.map.js");
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _pinia = require("pinia");
var useMapStore = exports.useMapStore = (0, _pinia.defineStore)('mapStore', {
  state: function state() {
    return {
      map: null // 明确指定map的类型为MapWrapper或null
    };
  },
  actions: {
    updata: function updata(newMap) {
      this.$state.map = newMap;
    }
  },
  // 如果需要，可以添加getters来从map中提取信息
  getters: {
    // 示例getter
    getMapLayers: function getMapLayers(state) {
      var _state$map;
      return (_state$map = (0, _map["default"])(state)) === null || _state$map === void 0 ? void 0 : _state$map.layers; // 使用可选链来安全地访问layers
    }
  }
});