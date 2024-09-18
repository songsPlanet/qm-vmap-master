"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.function.name.js");
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _findIndex = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find-index"));
var _vue = require("vue");
var _qmMapWrapper = require("qm-map-wrapper");
var _useMapStore = require("../store/useMapStore.js");
require("../BaseWidget/BaseWidget.vue2.js");
var _BaseWidgetVue2 = _interopRequireDefault(require("../BaseWidget/BaseWidget.vue.js"));
var LayerListIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTMyNjkyNzI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg5OTAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTg1Mi42IDQ2Mi45bDEyLjEgNy42YzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDc2NC4xYy0xNy4zIDEwLjgtMzkuMiAxMC44LTU2LjQgMEwxNTkuMyA1NjBjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDEyLjEtNy42TDQ4My45IDY1OWMxNy4zIDEwLjggMzkuMiAxMC44IDU2LjQgMGwzMTIuMi0xOTYgMC4xLTAuMXogbTAgMTU2LjFsMTIuMSA3LjZjMjQuOCAxNS42IDMyLjMgNDguMyAxNi43IDczLjItNC4yIDYuNy05LjkgMTIuNC0xNi43IDE2LjdMNTQwLjQgOTIwLjJjLTE3LjMgMTAuOC0zOS4yIDEwLjgtNTYuNCAwTDE1OS4zIDcxNi4xYy0yNC44LTE1LjYtMzIuMy00OC4zLTE2LjctNzMuMiA0LjItNi43IDkuOS0xMi40IDE2LjctMTYuN2wxMi4xLTcuNkw0ODMuOSA4MTVjMTcuMyAxMC44IDM5LjIgMTAuOCA1Ni40IDBsMzEyLjItMTk2aDAuMXpNNTQwIDEwNi40bDMyNC42IDIwNC4xYzI0LjggMTUuNiAzMi4zIDQ4LjMgMTYuNyA3My4yLTQuMiA2LjctOS45IDEyLjQtMTYuNyAxNi43TDU0MC40IDYwNGMtMTcuMyAxMC44LTM5LjIgMTAuOC01Ni40IDBMMTU5LjMgMzk5LjhjLTI0LjgtMTUuNi0zMi4zLTQ4LjMtMTYuNy03My4yIDQuMi02LjcgOS45LTEyLjQgMTYuNy0xNi43bDMyNC40LTIwMy43YzE3LjMtMTAuOCAzOS4yLTEwLjggNTYuNCAwbC0wLjEgMC4yeiIgcC1pZD0iODk5MSI+PC9wYXRoPjwvc3ZnPg==';
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'LayerList',
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
    var map = (0, _map["default"])(mapStore);
    var keys = (0, _vue.ref)([]);
    var data = (0, _vue.ref)([]);
    var baseHeight = (0, _vue.ref)(280);
    (0, _vue.watch)(keys, function (newKeys, oldKeys) {
      baseHeight.value = newKeys.length * 28 < 280 ? 280 : keys.value.length * 28;
      checkedHandle(newKeys, oldKeys);
    });
    var _loop = function loop(data, keys) {
      var nodeData;
      var treeData = [];
      (0, _forEach["default"])(data).call(data, function (layer) {
        nodeData = undefined;
        if ('layers' in layer && layer.options.type === 'logicGroup') {
          nodeData = {
            title: layer.options.name,
            key: layer.options.id,
            selectable: false,
            children: _loop(layer.layers, keys)
          };
        } else {
          nodeData = {
            title: layer.options.name,
            key: layer.options.id,
            selectable: false
          };
        }
        if (nodeData) {
          treeData.push(nodeData);
        }
        if (layer.options.isAdd && layer.options.type !== 'logicGroup') {
          keys.push(layer.options.id);
        }
      });
      return treeData;
    };
    var getOldHalfKeys = function getOldHalfKeys(oldKeys) {
      var _context;
      var list = [];
      // eslint-disable-next-line array-callback-return
      (0, _map["default"])(_context = data.value).call(_context, function (d) {
        if (d.children) {
          list.push(d.key);
        }
      });
      return (0, _filter["default"])(oldKeys).call(oldKeys, function (x) {
        return !(0, _includes["default"])(list).call(list, x);
      });
    };
    var checkedHandle = function checkedHandle(checkedKeys, oldKeys) {
      var _context2, _context3, _context4, _context7;
      // 去除根节点影响
      var keys = getOldHalfKeys(oldKeys);
      // 并集
      var union = new _set["default"]((0, _concat["default"])(_context2 = []).call(_context2, (0, _toConsumableArray2["default"])(keys), (0, _toConsumableArray2["default"])(checkedKeys)));
      // 差集 增加的
      var addKeys = new _set["default"]((0, _filter["default"])(_context3 = (0, _toConsumableArray2["default"])(union)).call(_context3, function (x) {
        return !(0, _includes["default"])(keys).call(keys, x);
      }));
      // 差集 减少的
      var delKeys = new _set["default"]((0, _filter["default"])(_context4 = (0, _toConsumableArray2["default"])(union)).call(_context4, function (x) {
        return !(0, _includes["default"])(checkedKeys).call(checkedKeys, x);
      }));
      (0, _forEach["default"])(addKeys).call(addKeys, function (key) {
        var lyr = map === null || map === void 0 ? void 0 : map.getLayerWrapper(map.layers, key);
        if (lyr && 'layers' in lyr) {
          var _context5;
          (0, _forEach["default"])(_context5 = lyr.layers).call(_context5, function (d) {
            d.options.isAdd = true;
          });
          map === null || map === void 0 || map.addLayerWrapper(lyr);
        } else if (lyr) {
          lyr.options.isAdd = true;
          map === null || map === void 0 || map.addLayerWrapper(lyr);
        }
      });
      (0, _forEach["default"])(delKeys).call(delKeys, function (key) {
        var lyr = map === null || map === void 0 ? void 0 : map.getLayerWrapper(map.layers, key);
        if (lyr && 'layers' in lyr) {
          var _context6;
          (0, _forEach["default"])(_context6 = lyr.layers).call(_context6, function (d) {
            d.options.isAdd = false;
          });
          map === null || map === void 0 || map.removeLayerWrapper(lyr);
        } else if (lyr) {
          lyr.options.isAdd = false;
          map === null || map === void 0 || map.removeLayerWrapper(lyr);
        }
      });
      // 修正logicGroup isAdd属性
      (0, _forEach["default"])(_context7 = map.layers).call(_context7, function (layer) {
        _modifyMapLayers(layer);
      });
    };
    var _modifyMapLayers = function modifyMapLayers(layer) {
      var _context8;
      if ('layers' in layer && (0, _findIndex["default"])(_context8 = layer.layers).call(_context8, function (d) {
        return d.options.type === 'logicGroup';
      }) > -1) {
        var _context9;
        (0, _forEach["default"])(_context9 = layer.layers).call(_context9, function (f) {
          _modifyMapLayers(f);
        });
      } else if ('layers' in layer && layer.options.type === 'logicGroup') {
        var _context10;
        var isAllFalse = (0, _findIndex["default"])(_context10 = layer.layers).call(_context10, function (d) {
          return d.options.isAdd;
        }) === -1;
        if (isAllFalse) {
          layer.options.isAdd = false;
        } else {
          layer.options.isAdd = true;
        }
      }
    };
    var init = function init() {
      var loadkeys = [];
      var treeData = map ? _loop(map.layers, loadkeys) : [];
      data.value = treeData;
      keys.value = loadkeys;
    };
    var mapLayerChangedHandle = _qmMapWrapper.GISToolHelper.debounce(function () {
      init();
    }, 300);
    (0, _vue.onMounted)(function () {
      map === null || map === void 0 || map.on(_qmMapWrapper.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
      init();
    });
    (0, _vue.onUnmounted)(function () {
      map === null || map === void 0 || map.off(_qmMapWrapper.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    });
    return function (_ctx, _cache) {
      var _component_a_tree = (0, _vue.resolveComponent)("a-tree");
      return (0, _vue.openBlock)(), (0, _vue.createBlock)(_BaseWidgetVue2["default"], {
        name: "图层控制",
        width: 220,
        position: props.position,
        height: baseHeight.value,
        icon: props.icon ? props.icon : LayerListIcon
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)(_component_a_tree, {
            checkedKeys: keys.value,
            "onUpdate:checkedKeys": _cache[0] || (_cache[0] = function ($event) {
              return keys.value = $event;
            }),
            checkable: "",
            "tree-data": data.value
          }, {
            title: (0, _vue.withCtx)(function (_ref) {
              var title = _ref.title;
              return [(0, _vue.createElementVNode)("span", null, (0, _vue.toDisplayString)(title), 1 /* TEXT */)];
            }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["checkedKeys", "tree-data"])];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["position", "height", "icon"]);
    };
  }
});