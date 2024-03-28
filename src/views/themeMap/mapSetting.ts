import { type TMapLayerSetting } from '@/gis/mapboxgl/typings'
import { basemap } from '@/views/mapSetting/basemap'
import { field_vt } from '../mapSetting/field_vt'
import { region } from '@/views/mapSetting/region'

const mapSetting: TMapLayerSetting = [basemap, region, field_vt]
export default mapSetting
