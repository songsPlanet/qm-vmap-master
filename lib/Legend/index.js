"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _LegendVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./Legend.vue2.js");
var _LegendVue2 = _interopRequireDefault(require("./Legend.vue.js"));
_LegendVue2["default"].install = function (app) {
  app.component(_LegendVue2["default"].name, _LegendVue2["default"]);
  return app;
};