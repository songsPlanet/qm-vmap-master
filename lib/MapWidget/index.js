"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _MapWidgetVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./MapWidget.vue2.js");
var _MapWidgetVue2 = _interopRequireDefault(require("./MapWidget.vue.js"));
_MapWidgetVue2["default"].install = function (app) {
  app.component(_MapWidgetVue2["default"].name, _MapWidgetVue2["default"]);
  return app;
};