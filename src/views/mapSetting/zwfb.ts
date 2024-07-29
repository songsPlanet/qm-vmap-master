import type { TLayerGroupOptions, TLayerOptions } from '@/gis/mapboxgl/typings'
import type { Expression } from 'mapbox-gl'

const zwfbCondition: any[] = []

const zwfbType = [
  { text: '小麦', backgroundColor: '0, 153, 2558', opacity: 0.6, key: '小麦' },
  { text: '玉米', backgroundColor: '0, 179, 89', opacity: 0.6, key: '玉米' }
]

zwfbType.forEach((d) => {
  if (d.key) {
    zwfbCondition.push(['==', ['get', 'sbzw'], d.key])
    zwfbCondition.push(`rgb(${d.backgroundColor})`)
  }
})
const zwfbExp: Expression = ['case', ...zwfbCondition, 'rgb(106, 168, 79)']
export interface TZWFB {
  year: number
  type: string
  typeName: string
  name: string
  cate?: string
  fillColor: string
  outlineColor: string
  fillOpacity: number
}

export const zwfbConfig: TZWFB[] = [
  {
    year: 2023,
    type: 'summer',
    name: '夏收',
    typeName: '小麦',
    cate: '作物分布',
    fillColor: '#0099ff',
    outlineColor: '#0099ff',
    fillOpacity: 0.6
  },
  {
    year: 2022,
    type: 'summer',
    name: '夏收',
    typeName: '小麦',
    cate: '作物分布',
    fillColor: '#0099ff',
    outlineColor: '#0099ff',
    fillOpacity: 0.6
  },
  {
    year: 2022,
    type: 'autumn',
    name: '秋收',
    typeName: '玉米',
    cate: '作物分布',
    fillColor: '#00b359',
    outlineColor: '#00b359',
    fillOpacity: 0.6
  }
]

const zwfbLyrs: TLayerOptions[] = zwfbConfig.map((d) => ({
  id: `zwfb_341282_${d.year}_${d.type}`,
  name: d.year.toString() + '年' + d.typeName,
  type: 'fill',
  isAdd: false,
  paint: {
    'fill-color': zwfbExp,
    'fill-opacity': 0.6
  },
  source: {
    type: 'vector',
    maxzoom: 14,
    bounds: [115.241901, 33.006651, 115.532445, 33.524751],
    // tiles: [`http://${window.location.host}/tileserver/data/jieshou_zwfb_341282/{z}/{x}/{y}.pbf`]
    tiles: [`http://120.26.225.92:8090/data/jieshou_zwfb_341282/{z}/{x}/{y}.pbf`]
  },
  // legend: {
  //   style: { backgroundColor: d.fillColor, opacity: d.fillOpacity },
  //   text: '作物分布 - ' + d.year + '年' + d.typeName,
  // },
  filter: ['!=', 'sbmj', 0],
  'source-layer': `zwfb_341282_${d.year}_${d.type}`
}))

export const zwfb: TLayerGroupOptions = {
  id: 'zwfb',
  name: '作物分布',
  isAdd: false,
  type: 'logicGroup',
  legend: {
    title: '作物分布',
    items: zwfbType.map((d) => ({
      style: { backgroundColor: `rgb(${d.backgroundColor})`, opacity: d.opacity },
      text: d.text
    }))
  },
  layers: zwfbLyrs
}
