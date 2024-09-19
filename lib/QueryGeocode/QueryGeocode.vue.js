"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _parseFloat2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-float"));
var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.function.name.js");
var _input = _interopRequireDefault(require("ant-design-vue/lib/input"));
var _select = _interopRequireDefault(require("ant-design-vue/lib/select"));
var _spin = _interopRequireDefault(require("ant-design-vue/lib/spin"));
var _formItem = _interopRequireDefault(require("ant-design-vue/lib/form-item"));
var _col = _interopRequireDefault(require("ant-design-vue/lib/col"));
var _row = _interopRequireDefault(require("ant-design-vue/lib/row"));
var _form = _interopRequireDefault(require("ant-design-vue/lib/form"));
var _message2 = _interopRequireDefault(require("ant-design-vue/lib/message"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _modal = _interopRequireDefault(require("ant-design-vue/lib/modal"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _vue = require("vue");
require("../MapWidget/MapWidget.vue2.js");
var _qmMapWrapper = require("qm-map-wrapper");
var _basemap = require("./basemap.js");
var _axios = _interopRequireDefault(require("axios"));
var _MapWidgetVue2 = _interopRequireDefault(require("../MapWidget/MapWidget.vue.js"));
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty2(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context7, _context8; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(t), !0)).call(_context7, function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context8 = ownKeys(Object(t))).call(_context8, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var _hoisted_1 = {
  style: {
    height: '400px',
    width: '100%'
  }
};
var script = exports["default"] = /*@__PURE__*/(0, _vue.defineComponent)({
  __name: 'QueryGeocode',
  props: /*@__PURE__*/(0, _vue.mergeModels)({
    open: {
      type: Boolean,
      required: true
    },
    tdtkey: {
      type: String,
      required: true
    },
    mapOptions: {
      type: null,
      required: true
    },
    mapSettingInfo: {
      type: null,
      required: false
    },
    image: {
      type: Object,
      required: false
    },
    region: {
      type: Object,
      required: false
    }
  }, {
    "value": _objectSpread({
      type: Object
    }, {
      required: true,
      "default": {}
    }),
    "valueModifiers": {}
  }),
  emits: /*@__PURE__*/(0, _vue.mergeModels)(["close", "ok"], ["update:value"]),
  setup: function setup(__props, _ref) {
    var __emit = _ref.emit;
    var props = __props;
    var emits = __emit;
    var mapFormState = (0, _vue.useModel)(__props, 'value');
    var mapR = (0, _vue.ref)();
    var loading = (0, _vue.ref)(false);
    var formRef = (0, _vue.ref)();
    var searchResultPois = (0, _vue.ref)([]);
    var mapSetting = (0, _vue.computed)(function () {
      return props.mapSettingInfo ? props.mapSettingInfo : [_basemap.basemap];
    });
    function handleOk() {
      formRef.value.validate().then(function () {
        emits('ok');
      })["catch"](function (error) {
        console.log('error', error);
      });
    }
    function handleCancel() {
      _modal["default"].confirm({
        title: '真的要关闭地图页面吗吗？',
        content: '关闭之后，当前所填入的信息如法恢复',
        onOk: function onOk() {
          emits('close');
        }
      });
    }
    var fetchSearchDataByKeyWord = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _props$region, _props$region2, _context, params, url, searchData, pois;
        return _regenerator["default"].wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              // 先写死后期根据行政区计算
              params = {
                keyWord: mapFormState.value.location,
                // 关键字
                mapBound: ((_props$region = props.region) === null || _props$region === void 0 ? void 0 : _props$region.bounds.join(',')) || '-180,-90,180,90',
                level: 18,
                queryType: 1,
                // 1-普通搜索，7-地名搜索
                start: 0,
                count: 10,
                specify: ((_props$region2 = props.region) === null || _props$region2 === void 0 ? void 0 : _props$region2.code) || undefined
              };
              url = (0, _concat["default"])(_context = "http://api.tianditu.gov.cn/v2/search?type=query&postStr=".concat((0, _stringify["default"])(params), "&tk=")).call(_context, props.tdtkey);
              _context2.next = 5;
              return _axios["default"].get(url);
            case 5:
              searchData = _context2.sent;
              if (searchData.data) loading.value = false;
              pois = searchData.data.pois;
              if (!pois) {
                _message2["default"].warning('当前区域没有查询到结果');
              } else {
                searchResultPois.value = pois;
              }
              _context2.next = 14;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              console.error('请求失败:', _context2.t0);
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee, null, [[0, 11]]);
      }));
      return function fetchSearchDataByKeyWord() {
        return _ref2.apply(this, arguments);
      };
    }();
    var getSearchData = _qmMapWrapper.GISToolHelper.debounce(function () {
      fetchSearchDataByKeyWord();
    }, 500);
    var handleSearch = function handleSearch(newValue) {
      searchResultPois.value = [];
      mapFormState.value.location = newValue;
      if (newValue && mapR.value) {
        loading.value = true;
        getSearchData();
      } else {
        searchResultPois.value = [];
      }
    };
    var handleChange = function handleChange(value) {
      var _context3;
      var selectPois = (0, _filter["default"])(_context3 = searchResultPois.value).call(_context3, function (d) {
        return d.hotPointID === value;
      });
      var _selectPois$ = selectPois[0],
        name = _selectPois$.name,
        lonlat = _selectPois$.lonlat;
      var lonlatStr = lonlat.split(',');
      var lonlatArray = (0, _map["default"])(lonlatStr).call(lonlatStr, _parseFloat2["default"]);
      var resObject = {
        location: name,
        longitude: lonlatStr[0],
        latitude: lonlatStr[1]
      };
      (0, _assign["default"])(mapFormState.value, resObject);
      addLocationLayer(lonlatArray);
    };
    var addLocationLayer = function addLocationLayer(lonlat) {
      var _mapR$value, _mapR$value2;
      (_mapR$value = mapR.value) === null || _mapR$value === void 0 || _mapR$value.setCenter(lonlat);
      (_mapR$value2 = mapR.value) === null || _mapR$value2 === void 0 || _mapR$value2.setZoom(15);
      var geo = _qmMapWrapper.GISToolHelper.createPointFeatureCollection(lonlat, {});
      if (props.image) {
        var _mapR$value3;
        (_mapR$value3 = mapR.value) === null || _mapR$value3 === void 0 || _mapR$value3.selectSymbolIconFeature(geo, 'queryGeoIcon', props.image);
      } else {
        var _mapR$value4;
        (_mapR$value4 = mapR.value) === null || _mapR$value4 === void 0 || _mapR$value4.selectCircleFeature(geo, 'queryGeoIcon');
      }
    };
    var fetchSearchDataByLonLat = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(point) {
        var _context4, params, url, searchData, _searchData$data$resu, longitude, latitude, location, resObject;
        return _regenerator["default"].wrap(function _callee2$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              params = {
                lon: point.lng,
                lat: point.lat,
                ver: 1
              };
              url = (0, _concat["default"])(_context4 = "http://api.tianditu.gov.cn/geocoder?type=geocode&postStr=".concat((0, _stringify["default"])(params), "&tk=")).call(_context4, props.tdtkey);
              _context5.next = 5;
              return _axios["default"].get(url);
            case 5:
              searchData = _context5.sent;
              if (searchData.data) loading.value = false;
              _searchData$data$resu = searchData.data.result.location, longitude = _searchData$data$resu.lon, latitude = _searchData$data$resu.lat;
              location = searchData.data.result['formatted_address'];
              resObject = {
                location: location,
                longitude: longitude,
                latitude: latitude
              };
              mapFormState.value = (0, _assign["default"])(mapFormState.value, resObject);
              addLocationLayer([longitude, latitude]);
              _context5.next = 17;
              break;
            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              console.error('请求失败:', _context5.t0);
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee2, null, [[0, 14]]);
      }));
      return function fetchSearchDataByLonLat(_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    var mapLoadHandle = function mapLoadHandle(map) {
      mapR.value = map;
      map.images.push(props.image);
      map.on('click', function (e) {
        loading.value = true;
        fetchSearchDataByLonLat(e.lngLat);
      });
    };
    (0, _vue.onUpdated)(function () {
      var _mapFormState$value = mapFormState.value,
        latitude = _mapFormState$value.latitude,
        longitude = _mapFormState$value.longitude;
      if (latitude && longitude) {
        addLocationLayer([longitude, latitude]);
      } else {
        var _mapR$value5, _mapR$value6;
        (_mapR$value5 = mapR.value) === null || _mapR$value5 === void 0 || _mapR$value5.zoomHome();
        (_mapR$value6 = mapR.value) === null || _mapR$value6 === void 0 || _mapR$value6.clearSelect("queryGeoIcon");
      }
    });
    return function (_ctx, _cache) {
      return (0, _vue.openBlock)(), (0, _vue.createBlock)((0, _vue.unref)(_modal["default"]), {
        width: 1200,
        okText: "提交",
        title: "地图页面",
        open: props.open,
        "mask-closable": false,
        destroyOnClose: "",
        onOk: handleOk,
        onCancel: handleCancel
      }, {
        "default": (0, _vue.withCtx)(function () {
          return [(0, _vue.createVNode)((0, _vue.unref)(_form["default"]), {
            ref_key: "formRef",
            ref: formRef,
            layout: "horizontal",
            model: mapFormState.value,
            "label-col": {
              span: 8
            },
            "wrapper-col": {
              span: 16
            }
          }, {
            "default": (0, _vue.withCtx)(function () {
              return [_cache[4] || (_cache[4] = (0, _vue.createElementVNode)("div", {
                style: {
                  fontSize: '16px',
                  color: '#584B4B',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }
              }, " 获取经纬度和地址 ： ", -1 /* HOISTED */)), (0, _vue.createVNode)((0, _vue.unref)(_row["default"]), null, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createVNode)((0, _vue.unref)(_col["default"]), {
                    offset: 1,
                    span: 6
                  }, {
                    "default": (0, _vue.withCtx)(function () {
                      return [(0, _vue.createVNode)((0, _vue.unref)(_formItem["default"]), {
                        name: "location",
                        label: "请输入: "
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createVNode)((0, _vue.unref)(_spin["default"]), {
                            spinning: loading.value
                          }, {
                            "default": (0, _vue.withCtx)(function () {
                              var _context6;
                              return [(0, _vue.createVNode)((0, _vue.unref)(_select["default"]), {
                                value: mapFormState.value.location,
                                "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                                  return mapFormState.value.location = $event;
                                }),
                                "allow-clear": "",
                                "show-search": "",
                                "show-arrow": false,
                                "filter-option": false,
                                style: {
                                  width: '400px'
                                },
                                "default-active-first-option": false,
                                placeholder: "请输入地名",
                                options: (0, _map["default"])(_context6 = searchResultPois.value).call(_context6, function (d) {
                                  return {
                                    value: d.hotPointID,
                                    label: d.name
                                  };
                                }),
                                onSearch: handleSearch,
                                onChange: handleChange
                              }, null, 8 /* PROPS */, ["value", "options"])];
                            }),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["spinning"])];
                        }),
                        _: 1 /* STABLE */
                      })];
                    }),
                    _: 1 /* STABLE */
                  })];
                }),
                _: 1 /* STABLE */
              }), (0, _vue.createVNode)((0, _vue.unref)(_row["default"]), null, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createVNode)((0, _vue.unref)(_col["default"]), {
                    offset: 1,
                    span: 6
                  }, {
                    "default": (0, _vue.withCtx)(function () {
                      return [(0, _vue.createVNode)((0, _vue.unref)(_formItem["default"]), {
                        name: "longitude",
                        label: "东经：",
                        rules: [{
                          required: true,
                          message: '请选择地址'
                        }]
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createVNode)((0, _vue.unref)(_input["default"]), {
                            value: mapFormState.value.longitude,
                            "onUpdate:value": _cache[1] || (_cache[1] = function ($event) {
                              return mapFormState.value.longitude = $event;
                            })
                          }, null, 8 /* PROPS */, ["value"])];
                        }),
                        _: 1 /* STABLE */
                      })];
                    }),
                    _: 1 /* STABLE */
                  }), (0, _vue.createVNode)((0, _vue.unref)(_col["default"]), {
                    offset: 1,
                    span: 6
                  }, {
                    "default": (0, _vue.withCtx)(function () {
                      return [(0, _vue.createVNode)((0, _vue.unref)(_formItem["default"]), {
                        name: "latitude",
                        label: "北纬：",
                        rules: [{
                          required: true,
                          message: '请选择地址'
                        }]
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createVNode)((0, _vue.unref)(_input["default"]), {
                            value: mapFormState.value.latitude,
                            "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
                              return mapFormState.value.latitude = $event;
                            })
                          }, null, 8 /* PROPS */, ["value"])];
                        }),
                        _: 1 /* STABLE */
                      })];
                    }),
                    _: 1 /* STABLE */
                  }), (0, _vue.createVNode)((0, _vue.unref)(_col["default"]), {
                    offset: 1,
                    span: 5
                  }, {
                    "default": (0, _vue.withCtx)(function () {
                      return [(0, _vue.createVNode)((0, _vue.unref)(_formItem["default"]), {
                        name: "location",
                        label: "坐标位置：",
                        rules: [{
                          required: true,
                          message: '请选择地址'
                        }]
                      }, {
                        "default": (0, _vue.withCtx)(function () {
                          return [(0, _vue.createVNode)((0, _vue.unref)(_input["default"]), {
                            value: mapFormState.value.location,
                            "onUpdate:value": _cache[3] || (_cache[3] = function ($event) {
                              return mapFormState.value.location = $event;
                            }),
                            style: {
                              width: '350px'
                            }
                          }, null, 8 /* PROPS */, ["value"])];
                        }),
                        _: 1 /* STABLE */
                      })];
                    }),
                    _: 1 /* STABLE */
                  })];
                }),
                _: 1 /* STABLE */
              }), (0, _vue.createVNode)((0, _vue.unref)(_row["default"]), null, {
                "default": (0, _vue.withCtx)(function () {
                  return [(0, _vue.createVNode)((0, _vue.unref)(_col["default"]), {
                    offset: 1,
                    span: 23
                  }, {
                    "default": (0, _vue.withCtx)(function () {
                      return [(0, _vue.createElementVNode)("div", _hoisted_1, [(0, _vue.createVNode)(_MapWidgetVue2["default"], {
                        "map-options": _ctx.mapOptions,
                        "map-layer-setting": mapSetting.value,
                        onOnMapLoad: mapLoadHandle
                      }, null, 8 /* PROPS */, ["map-options", "map-layer-setting"])])];
                    }),
                    _: 1 /* STABLE */
                  })];
                }),
                _: 1 /* STABLE */
              })];
            }),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["model"])];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["open"]);
    };
  }
});