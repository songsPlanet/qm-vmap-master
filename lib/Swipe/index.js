"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
_Object$defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _SwipeVue2["default"];
  }
});
require("core-js/modules/es.function.name.js");
require("./Swipe.vue2.js");
var _SwipeVue2 = _interopRequireDefault(require("./Swipe.vue.js"));
_SwipeVue2["default"].install = function (app) {
  app.component(_SwipeVue2["default"].name, _SwipeVue2["default"]);
  return app;
};