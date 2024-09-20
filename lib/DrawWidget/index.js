"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _DrawWidgetVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./DrawWidget.vue2.js");
var _DrawWidgetVue2 = _interopRequireDefault(require("./DrawWidget.vue.js"));
_DrawWidgetVue2["default"].install = function (app) {
  app.component(_DrawWidgetVue2["default"].name, _DrawWidgetVue2["default"]);
  return app;
};