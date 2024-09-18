"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _PopupWrapperVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./PopupWrapper.vue2.js");
var _PopupWrapperVue2 = _interopRequireDefault(require("./PopupWrapper.vue.js"));
_PopupWrapperVue2["default"].install = function (app) {
  app.component(_PopupWrapperVue2["default"].name, _PopupWrapperVue2["default"]);
  return app;
};