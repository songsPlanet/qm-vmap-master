import type { TLayerGroupOptions, TLayerOptions } from '@/gis/mapboxgl/typings';

const regionConfig = [
  { name: '界首—镇级', lyr: 'xzqh_zhen', lbField: 'XZQMC', minzoom: 0, maxzoom: 12 },
  { name: '界首—村级', lyr: 'xzqh_cun', lbField: 'CJXZQH', minzoom: 12, maxzoom: 18 },
];
const regionLyrs: Array<TLayerGroupOptions | TLayerOptions> = [];
regionConfig.forEach((d) => {
  // 图层
  regionLyrs.push({
    id: d.lyr,
    name: d.name,
    type: 'line',
    minzoom: d.minzoom,
    maxzoom: d.maxzoom,
    paint: {
      'line-color': 'blue',
      'line-width': 2,
    },
    source: {
      type: 'vector',
      maxzoom: 14,
      bounds: [115.241236, 33.006001, 115.528891, 33.524924],
      // tiles: [`http://192.168.5.2:20000/tileserver/data/jieshou_region/{z}/{x}/{y}.pbf`],
      tiles: [`http://120.26.225.92:8090/data/jieshou_region/{z}/{x}/{y}.pbf`],
    },
    'source-layer': d.lyr,
  });
  // 图层标注
  regionLyrs.push({
    id: `${d.lyr}-label`,
    name: `${d.name}-标注`,
    type: 'symbol',
    minzoom: d.minzoom,
    maxzoom: d.maxzoom,
    source: `${d.lyr}-ds`,
    'source-layer': d.lyr,
    layout: {
      'text-field': ['get', d.lbField],
      'text-font': ['Open Sans Regular'],
      'text-size': 14,
      'symbol-placement': 'point',
    },
    paint: {
      'text-color': 'blue',
      'text-halo-width': 2,
      'text-halo-color': 'white',
    },
  });
});

export const region: TLayerGroupOptions = {
  id: 'region',
  name: '行政区划',
  type: 'layerGroup',
  legend: {
    style: { border: '1px solid blue' },
    text: '行政区划',
  },
  layers: regionLyrs,
};
