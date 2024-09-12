import type { MapboxOptions } from 'mapbox-gl';
import { Map, LngLatBounds } from 'mapbox-gl';

const tianditukey = '6cb0c9f207a359a171b3d033b23249d9';

type TMapOptions = MapboxOptions & {
  id: string;
};

class MapWrapper extends Map {
  private _id: string;

  public get id(): string {
    return this._id;
  }

  private _options: TMapOptions;

  public get options() {
    return this._options;
  }
  constructor(options: TMapOptions) {
    super(options);
    this._options = options;
    this._id = options.id;
    // 地图初始化
    this.fire('MAPINITED', { map: this });
  }

  zoomHome() {
    const center = this._options.center;
    if (center) {
      this.setCenter(center);
    }
  }

  locationHanlde = (lonlat: any) => {
    this.setCenter(lonlat);
  };

  addBaseMap = () => {
    this.addSource('tdt_vec-ds', {
      type: 'raster',
      tileSize: 256,
      tiles: [
        `http://t2.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
      ],
    });
    this.addLayer({
      id: 'tdt_vec',
      type: 'raster',
      source: 'tdt_vec-ds',
    });

    this.addSource('tdt_cva-ds', {
      type: 'raster',
      tileSize: 256,
      tiles: [
        `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tianditukey}`,
      ],
    });
    this.addLayer({
      id: 'tdt_cva',
      type: 'raster',
      source: 'tdt_cva-ds',
    });
  };

  addLocationIcon = (lonlat: any) => {
    this.clearSelect();
    const dsId = 'location-ds';
    const lyrId = 'location-lyr';
    this.addSource(dsId, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            properties: {},
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: lonlat,
            },
          },
        ],
      },
    });
    this.addLayer({
      id: lyrId,
      type: 'symbol',
      source: dsId,
      layout: {
        'icon-size': 1,
        'icon-image': 'locationIcon',
        'icon-anchor': 'bottom', // 图标底部接近锚点
      },
    });
  };

  clearSelect = (id?: string) => {
    const dsId = id ? `${id}-location-ds` : 'location-ds';
    const lyrId = id ? `${id}-location-lyr` : 'location-lyr';
    const flag = this.getLayer(lyrId);
    if (flag) {
      this.removeLayer(lyrId);
      this.removeSource(dsId);
    }
  };

  getFeatureBoundingBox = (feature: any) => {
    const bounds = new LngLatBounds();
    this.loopBounds(bounds, feature.geometry.coordinates);
    return bounds;
  };
  /**
   * 获取边界：
   * return：LngLatBounds
   */
  loopBounds = (bound: LngLatBounds, coordinates: any) => {
    if (coordinates[0] instanceof Array) {
      coordinates.forEach((item: any) => {
        if (item[0] instanceof Array) {
          this.loopBounds(bound, item);
        } else {
          bound.extend(item);
        }
      });
    } else {
      bound.extend(coordinates);
    }
  };

  /**
   * 获取lnglatBounds四至：
   * @returns {[[*, *], [*, *], [*, *], [*, *]]}
   */
  getBoundsExtent = (bounds: LngLatBounds) => {
    const xmin = bounds.getWest();
    const xmax = bounds.getEast();
    const ymin = bounds.getSouth();
    const ymax = bounds.getNorth();
    return [xmin, ymin, xmax, ymax];
  };

  /**
   * 地图销毁
   */
  destory() {
    this.fire('MAPDESTRORY', { map: this });
    this.remove();
  }
}

export default MapWrapper;
