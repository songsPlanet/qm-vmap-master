# qm-vmap

qm-vmap 是一款基于 React、Mapboxgl 的地图组件

## 安装

使用 npm 或 yarn 安装

```bash
npm install qm-vmap
yarn add qm-vmap

```

## 依赖

qm-vmap 开发依赖于mapbox-gl,turf.js 库

## 初始化使用

```js
import { MapWidget } from 'qm-vmap';
import type {  LngLatLike } from 'mapbox-gl';



const mapOptions = {
  id: 'map',
  center: [115.434038, 33.347523] as LngLatLike,
  container: '',
  zoom: 11,
  maxZoom: 18,
  pitch: 45,
};

const basemap: TLayerGroupOptions = {
  id: 'base_map',
  name: '基础底图',
  type: 'logicGroup',
  layers: [
    {
      id: 'tdt_img',
      name: '天地图-影像',
      type: 'raster',
      isAdd: true,
      source: {
        type: 'raster',
        tileSize: 256,
        tiles: [
          `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
        ],
      },
    }]}

const mapSetting:TMapLayerSettting=[basemap]

 const mapLoadHandle: any = (map: MapWrapper) => {}// mapbox中load事件的回调
  
  <MapWidget :map-options="mapOptions" :map-layer-setting="mapSetting">
      <PopupPanel :vector="vector" />
      <ControlPanel />
      <ToolPanel />
    </MapWidget>

```

## 工具条使用-作为MapWidget-children

```js
 <Legend :position="{ bottom: 10, left: 10 }"></Legend>
  <LayerList :position="{ top: 10, left: 10 }"></LayerList>
  <Swipe :position="{ top: 225, right: 10 }"></Swipe>
  <Measure :position="{ top: 305, right: 10 }"></Measure>
```
