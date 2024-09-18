"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _QueryGeocodeVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./QueryGeocode.vue2.js");
var _QueryGeocodeVue2 = _interopRequireDefault(require("./QueryGeocode.vue.js"));
_QueryGeocodeVue2["default"].install = function (app) {
  app.component(_QueryGeocodeVue2["default"].name, _QueryGeocodeVue2["default"]);
  return app;
};