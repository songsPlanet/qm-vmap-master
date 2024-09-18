"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _LayerListVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./LayerList.vue2.js");
var _LayerListVue2 = _interopRequireDefault(require("./LayerList.vue.js"));
_LayerListVue2["default"].install = function (app) {
  app.component(_LayerListVue2["default"].name, _LayerListVue2["default"]);
  return app;
};