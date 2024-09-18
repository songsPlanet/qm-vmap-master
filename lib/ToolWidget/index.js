"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ToolWidgetVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./ToolWidget.vue2.js");
var _ToolWidgetVue2 = _interopRequireDefault(require("./ToolWidget.vue.js"));
_ToolWidgetVue2["default"].install = function (app) {
  app.component(_ToolWidgetVue2["default"].name, _ToolWidgetVue2["default"]);
  return app;
};