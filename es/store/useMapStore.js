import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import 'core-js/modules/es.array.map.js';
import 'core-js/modules/esnext.async-iterator.map.js';
import 'core-js/modules/esnext.iterator.map.js';
import { defineStore } from 'pinia';

var useMapStore = defineStore('mapStore', {
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
      return (_state$map = _mapInstanceProperty(state)) === null || _state$map === void 0 ? void 0 : _state$map.layers; // 使用可选链来安全地访问layers
    }
  }
});

export { useMapStore };
