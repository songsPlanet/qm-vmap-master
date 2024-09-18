import { defineComponent, mergeModels, useModel, ref, onUpdated, openBlock, createBlock, unref, withCtx, createVNode, createElementVNode } from 'vue';
import { Modal, Form, Row, Col, FormItem, Spin, Select, Input, message } from 'ant-design-vue';
import '../MapWidget/MapWidget.vue2.js';
import { GISToolHelper } from 'qm-map-wrapper';
import axios from 'axios';
import script$1 from '../MapWidget/MapWidget.vue.js';

var script = /*@__PURE__*/ defineComponent({
    __name: 'QueryGeocode',
    props: /*@__PURE__*/ mergeModels({
        open: { type: Boolean, required: true },
        tdtkey: { type: String, required: true },
        mapOptions: { type: null, required: true },
        mapSetting: { type: null, required: true },
        image: { type: Object, required: false },
        region: { type: Object, required: false }
    }, {
        "value": { type: Object, ...{ required: true, default: {} } },
        "valueModifiers": {},
    }),
    emits: /*@__PURE__*/ mergeModels(["close", "ok"], ["update:value"]),
    setup(__props, { emit: __emit }) {
        const props = __props;
        const emits = __emit;
        const mapFormState = useModel(__props, 'value');
        const mapR = ref();
        const loading = ref(false);
        const formRef = ref();
        const searchResultPois = ref([]);
        function handleOk() {
            formRef.value
                .validate()
                .then(() => {
                emits('ok');
            })
                .catch((error) => {
                console.log('error', error);
            });
        }
        function handleCancel() {
            Modal.confirm({
                title: '真的要关闭地图页面吗吗？',
                content: '关闭之后，当前所填入的信息如法恢复',
                onOk() {
                    emits('close');
                },
            });
        }
        const fetchSearchDataByKeyWord = async () => {
            try {
                // 先写死后期根据行政区计算
                const params = {
                    keyWord: mapFormState.value.location,
                    mapBound: props.region?.bounds.join(','),
                    level: 18,
                    queryType: 1, // 1-普通搜索，7-地名搜索
                    start: 0,
                    count: 10,
                    specify: props.region?.code,
                };
                const url = `http://api.tianditu.gov.cn/v2/search?type=query&postStr=${JSON.stringify(params)}&tk=${props.tdtkey}`;
                const searchData = await axios.get(url);
                if (searchData.data)
                    loading.value = false;
                const { pois } = searchData.data;
                if (!pois) {
                    message.warning('当前区域没有查询到结果');
                }
                else {
                    searchResultPois.value = pois;
                }
            }
            catch (error) {
                console.error('请求失败:', error);
            }
        };
        const getSearchData = GISToolHelper.debounce(() => {
            fetchSearchDataByKeyWord();
        }, 500);
        const handleSearch = (newValue) => {
            searchResultPois.value = [];
            mapFormState.value.location = newValue;
            if (newValue && mapR.value) {
                loading.value = true;
                getSearchData();
            }
            else {
                searchResultPois.value = [];
            }
        };
        const handleChange = (value) => {
            const selectPois = searchResultPois.value.filter((d) => d.hotPointID === value);
            const { name, lonlat } = selectPois[0];
            const lonlatStr = lonlat.split(',');
            const lonlatArray = lonlatStr.map(parseFloat);
            const resObject = {
                location: name,
                longitude: lonlatStr[0],
                latitude: lonlatStr[1],
            };
            Object.assign(mapFormState.value, resObject);
            mapR.value?.locationHanlde(lonlatArray);
            mapR.value?.addLocationIcon(lonlatArray);
        };
        const fetchSearchDataByLonLat = async (point) => {
            try {
                const params = {
                    lon: point.lng,
                    lat: point.lat,
                    ver: 1,
                };
                const url = `http://api.tianditu.gov.cn/geocoder?type=geocode&postStr=${JSON.stringify(params)}&tk=${props.tdtkey}`;
                const searchData = await axios.get(url);
                if (searchData.data)
                    loading.value = false;
                const { lon, lat } = searchData.data.result.location;
                const resObject = {
                    location: searchData.data.result['formatted_address'],
                    longitude: lon,
                    latitude: lat,
                };
                mapFormState.value = Object.assign(mapFormState.value, resObject);
                mapR.value?.addLocationIcon([lon, lat]);
            }
            catch (error) {
                console.error('请求失败:', error);
            }
        };
        const mapLoadHandle = (map) => {
            mapR.value = map;
            map.on('click', (e) => {
                loading.value = true;
                fetchSearchDataByLonLat(e.lngLat);
            });
        };
        onUpdated(() => {
            const { latitude, longitude } = mapFormState.value;
            if (latitude && longitude) {
                mapR.value?.addLocationIcon([longitude, latitude]);
                mapR.value?.locationHanlde([longitude, latitude]);
            }
            else {
                mapR.value?.zoomHome();
                mapR.value?.clearSelect();
            }
        });
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(Modal), {
                width: 1200,
                okText: "提交",
                title: "地图页面",
                open: props.open,
                "mask-closable": false,
                destroyOnClose: "",
                onOk: handleOk,
                onCancel: handleCancel
            }, {
                default: withCtx(() => [
                    createVNode(unref(Form), {
                        ref_key: "formRef",
                        ref: formRef,
                        layout: "horizontal",
                        model: mapFormState.value,
                        "label-col": { span: 8 },
                        "wrapper-col": { span: 16 }
                    }, {
                        default: withCtx(() => [
                            _cache[4] || (_cache[4] = createElementVNode("div", { style: { fontSize: '16px', color: '#584B4B', fontWeight: 'bold', marginBottom: '20px' } }, " 获取经纬度和地址 ： ", -1 /* HOISTED */)),
                            createVNode(unref(Row), null, {
                                default: withCtx(() => [
                                    createVNode(unref(Col), {
                                        offset: 1,
                                        span: 6
                                    }, {
                                        default: withCtx(() => [
                                            createVNode(unref(FormItem), {
                                                name: "location",
                                                label: "请输入: "
                                            }, {
                                                default: withCtx(() => [
                                                    createVNode(unref(Spin), { spinning: loading.value }, {
                                                        default: withCtx(() => [
                                                            createVNode(unref(Select), {
                                                                value: mapFormState.value.location,
                                                                "onUpdate:value": _cache[0] || (_cache[0] = ($event) => ((mapFormState.value.location) = $event)),
                                                                "allow-clear": "",
                                                                "show-search": "",
                                                                "show-arrow": false,
                                                                "filter-option": false,
                                                                style: { width: '400px' },
                                                                "default-active-first-option": false,
                                                                placeholder: "请输入地名",
                                                                options: searchResultPois.value.map((d) => ({
                                                                    value: d.hotPointID,
                                                                    label: d.name,
                                                                })),
                                                                onSearch: handleSearch,
                                                                onChange: handleChange
                                                            }, null, 8 /* PROPS */, ["value", "options"])
                                                        ]),
                                                        _: 1 /* STABLE */
                                                    }, 8 /* PROPS */, ["spinning"])
                                                ]),
                                                _: 1 /* STABLE */
                                            })
                                        ]),
                                        _: 1 /* STABLE */
                                    })
                                ]),
                                _: 1 /* STABLE */
                            }),
                            createVNode(unref(Row), null, {
                                default: withCtx(() => [
                                    createVNode(unref(Col), {
                                        offset: 1,
                                        span: 6
                                    }, {
                                        default: withCtx(() => [
                                            createVNode(unref(FormItem), {
                                                name: "longitude",
                                                label: "东经：",
                                                rules: [{ required: true, message: '请选择地址' }]
                                            }, {
                                                default: withCtx(() => [
                                                    createVNode(unref(Input), {
                                                        value: mapFormState.value.longitude,
                                                        "onUpdate:value": _cache[1] || (_cache[1] = ($event) => ((mapFormState.value.longitude) = $event))
                                                    }, null, 8 /* PROPS */, ["value"])
                                                ]),
                                                _: 1 /* STABLE */
                                            })
                                        ]),
                                        _: 1 /* STABLE */
                                    }),
                                    createVNode(unref(Col), {
                                        offset: 1,
                                        span: 6
                                    }, {
                                        default: withCtx(() => [
                                            createVNode(unref(FormItem), {
                                                name: "latitude",
                                                label: "北纬：",
                                                rules: [{ required: true, message: '请选择地址' }]
                                            }, {
                                                default: withCtx(() => [
                                                    createVNode(unref(Input), {
                                                        value: mapFormState.value.latitude,
                                                        "onUpdate:value": _cache[2] || (_cache[2] = ($event) => ((mapFormState.value.latitude) = $event))
                                                    }, null, 8 /* PROPS */, ["value"])
                                                ]),
                                                _: 1 /* STABLE */
                                            })
                                        ]),
                                        _: 1 /* STABLE */
                                    }),
                                    createVNode(unref(Col), {
                                        offset: 1,
                                        span: 5
                                    }, {
                                        default: withCtx(() => [
                                            createVNode(unref(FormItem), {
                                                name: "location",
                                                label: "坐标位置：",
                                                rules: [{ required: true, message: '请选择地址' }]
                                            }, {
                                                default: withCtx(() => [
                                                    createVNode(unref(Input), {
                                                        value: mapFormState.value.location,
                                                        "onUpdate:value": _cache[3] || (_cache[3] = ($event) => ((mapFormState.value.location) = $event)),
                                                        style: { width: '350px' }
                                                    }, null, 8 /* PROPS */, ["value"])
                                                ]),
                                                _: 1 /* STABLE */
                                            })
                                        ]),
                                        _: 1 /* STABLE */
                                    })
                                ]),
                                _: 1 /* STABLE */
                            }),
                            createVNode(unref(Row), null, {
                                default: withCtx(() => [
                                    createVNode(unref(Col), {
                                        offset: 1,
                                        span: 23
                                    }, {
                                        default: withCtx(() => [
                                            createVNode(script$1, {
                                                "map-options": _ctx.mapOptions,
                                                "map-layer-setting": _ctx.mapSetting,
                                                onOnMapLoad: mapLoadHandle
                                            }, null, 8 /* PROPS */, ["map-options", "map-layer-setting"])
                                        ]),
                                        _: 1 /* STABLE */
                                    })
                                ]),
                                _: 1 /* STABLE */
                            })
                        ]),
                        _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["model"])
                ]),
                _: 1 /* STABLE */
            }, 8 /* PROPS */, ["open"]));
        };
    }
});

export { script as default };
