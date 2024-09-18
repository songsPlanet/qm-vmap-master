import type { LngLatLike } from 'mapbox-gl';
export interface TPouperData {
    properties: any;
    lngLat: LngLatLike;
    title: string;
    slotComponent: any;
}
interface TPopupPanel {
    vector?: {
        id: string;
        title: string;
        slotComponent: any;
    }[];
    wms?: {
        baseUrl: string;
        layers: {
            id: string;
            title: string;
            slotComponent: any;
            layerName: string;
        }[];
    };
}
declare const _default: import("vue").DefineComponent<TPopupPanel, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TPopupPanel> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
