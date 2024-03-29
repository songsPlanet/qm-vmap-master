import { type TLayerGroupOptions, type TLayerOptions } from '@/gis/mapboxgl/typings'

export interface TZWFB {
  year: number
  type: string
  name: string
  fillColor: string
  outlineColor: string
  fillOpacity: number
  sbyf?: string
}
export const zwfbConfig: TZWFB[] = [
  {
    year: 2022,
    type: 'wandao',
    name: '晚稻',
    fillColor: '#9267ee',
    outlineColor: '#9267ee',
    fillOpacity: 0.6,
    sbyf: '10月'
  },
  {
    year: 2023,
    type: 'zaodao',
    name: '早稻',
    fillColor: '#9fc5e8',
    outlineColor: '#9fc5e8',
    fillOpacity: 0.6,
    sbyf: '7月'
  }
]

const zwfbLyrs: TLayerOptions[] = zwfbConfig.map((d) => ({
  id: `zwfb_${d.type}_${d.year}`,
  name: d.year.toString() + '年' + d.name + '-' + d.sbyf,
  type: 'fill',
  isAdd: true,
  paint: {
    'fill-color': d.fillColor,
    'fill-opacity': d.fillOpacity,
    'fill-outline-color': d.outlineColor
  },
  source: {
    type: 'vector',
    minzoom: 12,
    maxzoom: 14,
    bounds: [112.003254, 27.486334, 112.649781, 28.056282],
    tiles: [
      `http://${window.location.host}/tileserver/data/zwfb_${d.type}_${d.year}/{z}/{x}/{y}.pbf`
    ]
  },
  'source-layer': `zwfb_${d.type}_${d.year}`
}))

export const zwfb: TLayerGroupOptions = {
  id: 'zwfb',
  name: '作物识别',
  type: 'logicGroup',
  legend: {
    title: '作物识别',
    items: zwfbConfig.map((d) => ({
      style: { backgroundColor: d.fillColor, opacity: d.fillOpacity },
      text: `${d.year}_${d.name}`
    }))
  },
  layers: zwfbLyrs
}
