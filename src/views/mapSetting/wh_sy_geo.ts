import { type TLayerOptions } from '@/gis/mapboxgl/typings'

export const wh_sy_geo: TLayerOptions = {
  id: 'wh_sy_geo',
  name: 'geojson-芜湖水域分布',
  type: 'fill',
  isAdd: true,
  maxzoom: 18,
  legend: {
    style: { backgroundColor: '#0000ff', opacity: 0.6 }, // 蓝色
    text: 'geojson-芜湖水域分布'
  },
  paint: {
    'fill-color': '#0000ff',
    'fill-opacity': 0.6,
    'fill-outline-color': '#0000ff'
  },
  source: {
    type: 'geojson',
    data: './src/views/mapSetting/assets/wh_sqal_sy_2022_04.geojson'
  }
}
