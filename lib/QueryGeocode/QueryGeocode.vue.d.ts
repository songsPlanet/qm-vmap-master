import type { TMapLayerSetting, TMapOptions } from 'qm-map-wrapper';
type TMapModalOptions = {
    open: boolean;
    tdtkey: string;
    mapOptions: TMapOptions;
    mapSettingInfo?: TMapLayerSetting;
    image?: {
        url: string;
        id: string;
    };
    region?: {
        bounds: number[];
        code: number;
    };
};
export type MapLocation = {
    location: string;
    longitude: string;
    latitude: string;
};
declare let __VLS_typeProps: TMapModalOptions;
type __VLS_PublicProps = {
    'value': MapLocation;
} & typeof __VLS_typeProps;
declare const _default: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
    ok: () => any;
    "update:value": (value: MapLocation) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onClose?: (() => any) | undefined;
    onOk?: (() => any) | undefined;
    "onUpdate:value"?: ((value: MapLocation) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
