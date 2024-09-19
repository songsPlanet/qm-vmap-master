import type { TMapLayerSetting } from 'qm-map-wrapper'
import { basemap } from '@/views/mapSetting/basemap'
import { wh_sy_geo } from '../mapSetting/wh_sy_geo'
import { region } from '@/views/mapSetting/region'
import { zwfb } from '@/views/mapSetting/zwfb'
import { field_vt } from '../mapSetting/field_vt'

const mapSetting: TMapLayerSetting = [basemap, wh_sy_geo, field_vt, zwfb, region]
export default mapSetting
