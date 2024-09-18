"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _MeasureVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./Measure.vue2.js");
var _MeasureVue2 = _interopRequireDefault(require("./Measure.vue.js"));
_MeasureVue2["default"].install = function (app) {
  app.component(_MeasureVue2["default"].name, _MeasureVue2["default"]);
  return app;
};