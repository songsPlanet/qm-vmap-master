"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.function.name.js");
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _reduce = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reduce"));
var _vue = require("vue");
var _qmMapWrapper = require("qm-map-wrapper");
require("../BaseWidget/BaseWidget.vue2.js");
var _useMapStore = require("../store/useMapStore.js");
require("./singleLegend.vue.js");
require("./Legend.css");
var _BaseWidgetVue2 = _interopRequireDefault(require("../BaseWidget/BaseWidget.vue.js"));
var _singleLegendVue2 = _interopRequireDefault(require("./singleLegend.vue2.js"));
var _hoisted_1 = {
  "class": "mapboxgl-legend"
};
var _hoisted_2 = {
  className: "mapboxgl-legend-tilte"
};
var LegendIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcyMTEwNzAzMTU0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5NzIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTExMiAxMTJtMzIgMGw3MzYgMHEzMiAwIDMyIDMybDAgNzM2cTAgMzItMzIgMzJsLTczNiAwcS0zMiAwLTMyLTMybDAtNzM2cTAtMzIgMzItMzJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI0OTczIj48L3BhdGg+PHBhdGggZD0iTTEyOCA5Nmg3NjhhMzIgMzIgMCAwIDEgMzIgMzJ2NzY4YTMyIDMyIDAgMCAxLTMyIDMySDEyOGEzMiAzMiAwIDAgMS0zMi0zMlYxMjhhMzIgMzIgMCAwIDEgMzItMzJ6IG0wIDMydjc2OGg3NjhWMTI4SDEyOHoiIGZpbGw9IiM1RDZEN0UiIHAtaWQ9IjQ5NzQiPjwvcGF0aD48cGF0aCBkPSJNMjI0IDM4NGg2NHY2NEgyMjRWMzg0eiBtMCAxMjhoNjR2NjRIMjI0di02NHogbTAgMTI4aDY0djY0SDIyNHYtNjR6IG0wIDEyOGg2NHY2NEgyMjR2LTY0ek01NDQgMzg0aDY0djY0aC02NFYzODR6IG0wIDEyOGg2NHY2NGgtNjR2LTY0eiBtMCAxMjhoNjR2NjRoLTY0di02NHogbTAgMTI4aDY0djY0aC02NHYtNjR6IiBmaWxsPSIjODA4RkExIiBwLWlkPSI0OTc1Ij48L3BhdGg+PHBhdGggZD0iTTMyMCAzODRoMTYwdjY0SDMyMFYzODR6IG0wIDEyOGgxNjB2NjRIMzIwdi02NHogbTAgMTI4aDE2MHY2NEgzMjB2LTY0eiBtMCAxMjhoMTYwdjY0SDMyMHYtNjR6TTY0MCAzODRoMTYwdjY0aC0xNjBWMzg0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiBtMCAxMjhoMTYwdjY0aC0xNjB2LTY0eiIgZmlsbD0iI0FDQjRDMCIgcC1pZD0iNDk3NiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMjQgMjI0aDU3NnY5NkgyMjR6IiBmaWxsPSIjMzBBRDk4IiBwLWlkPSI0OTc3Ij48L3BhdGg+PC9zdmc+';
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'Legend',
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
    var baseHeight = (0, _vue.ref)(200);
    var groupLegendList = (0, _vue.ref)([]);
    var singleLegendList = (0, _vue.ref)([]);
    var _loop = function loop(layers, hArr) {
      groupLegendList.value = [];
      singleLegendList.value = [];
      var groupNodeData;
      var itemNodeData;
      (0, _forEach["default"])(layers).call(layers, function (layer) {
        var _context;
        groupNodeData = undefined;
        itemNodeData = undefined;
        if ('layers' in layer && !layer.options.legend) {
          _loop(layer.layers, hArr);
        } else if (layer.options.legend && (layer.options.isAdd || 'layers' in layer && (0, _filter["default"])(_context = layer.layers).call(_context, function (d) {
          return d.options.isAdd;
        }).length)) {
          var _layer$options$legend = layer.options.legend,
            title = _layer$options$legend.title,
            items = _layer$options$legend.items;
          if (items) {
            // 图例组
            var titleName = title ? title : layer.options.name;
            groupNodeData = {
              title: titleName,
              items: items
            };
            // eslint-disable-next-line array-callback-return
            items === null || items === void 0 || (0, _map["default"])(items).call(items, function () {
              hArr.push(26);
            });
            hArr.push(50);
          } else {
            var _context2;
            // 单个图例
            var _layer$options$legend2 = layer.options.legend,
              style = _layer$options$legend2.style,
              imageId = _layer$options$legend2.imageId,
              text = _layer$options$legend2.text;
            var img = map === null || map === void 0 ? void 0 : (0, _find["default"])(_context2 = map.images).call(_context2, function (f) {
              return f.id === imageId;
            });
            var _titleName = text ? text : layer.options.name;
            itemNodeData = {
              text: _titleName,
              style: style,
              img: img
            };
            hArr.push(26);
          }
        } else {
          groupNodeData = undefined;
          itemNodeData = undefined;
        }
        if (groupNodeData) {
          groupLegendList.value.push(groupNodeData);
        }
        if (itemNodeData) {
          singleLegendList.value.push(itemNodeData);
        }
      });
    };
    var init = function init() {
      // 计算高度
      var hArr = [];
      // dom
      _loop(map.layers, hArr);
      var hei = (0, _reduce["default"])(hArr).call(hArr, function (sum, cur) {
        return sum + cur;
      }, 0);
      baseHeight.value = hei + 50;
    };
    var mapLayerChangedHandle = _qmMapWrapper.GISToolHelper.debounce(function () {
      init();
    }, 200);
    (0, _vue.onMounted)(function () {
      map === null || map === void 0 || map.on(_qmMapWrapper.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
      init();
    });
    (0, _vue.onUnmounted)(function () {
      map === null || map === void 0 || map.off(_qmMapWrapper.MapEvent.MAPLAYERCHANGED, mapLayerChangedHandle);
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createBlock)(_BaseWidgetVue2["default"], {
        name: "图例",
        width: 200,
        height: baseHeight.value,
        position: props.position,
        icon: props.icon ? props.icon : LegendIcon
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createVNode)(_singleLegendVue2["default"], {
            "prop-list": singleLegendList.value
          }, null, 8 /* PROPS */, ["prop-list"]), ((0, _vue.openBlock)(true), (0, _vue.createElementBlock)(_vue.Fragment, null, (0, _vue.renderList)(groupLegendList.value, function (list) {
            return (0, _vue.openBlock)(), (0, _vue.createElementBlock)("div", {
              key: list.title,
              className: "mapboxgl-legend-group"
            }, [(0, _vue.createElementVNode)("div", _hoisted_2, (0, _vue.toDisplayString)(list.title), 1 /* TEXT */), (0, _vue.createVNode)(_singleLegendVue2["default"], {
              "prop-list": list.items
            }, null, 8 /* PROPS */, ["prop-list"])]);
          }), 128 /* KEYED_FRAGMENT */))])];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["height", "position", "icon"]);
    };
  }
});