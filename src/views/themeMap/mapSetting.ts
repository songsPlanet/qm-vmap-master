import { type TMapLayerSetting } from '@/gis/mapboxgl/typings'
import { basemap } from '@/views/mapSetting/basemap'
import { wh_sy_geo } from '../mapSetting/wh_sy_geo'
import { region } from '@/views/mapSetting/region'

const mapSetting: TMapLayerSetting = [basemap, region, wh_sy_geo]
export default mapSetting
