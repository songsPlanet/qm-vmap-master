"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _BaseWidgetVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./BaseWidget.vue2.js");
var _BaseWidgetVue2 = _interopRequireDefault(require("./BaseWidget.vue.js"));
_BaseWidgetVue2["default"].install = function (app) {
  app.component(_BaseWidgetVue2["default"].name, _BaseWidgetVue2["default"]);
  return app;
};