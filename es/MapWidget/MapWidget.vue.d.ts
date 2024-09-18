import type { TMapLayerSetting } from 'qm-map-wrapper';
import type { MapboxOptions } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapWidget.less';
interface TMapProps {
    mapOptions: MapboxOptions & {
        id: string;
    };
    mapLayerSetting: TMapLayerSetting;
    className?: string;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<TMapProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    onMapLoad: (map: any) => any;
}, string, import("vue").PublicProps, Readonly<TMapProps> & Readonly<{
    onOnMapLoad?: ((map: any) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
