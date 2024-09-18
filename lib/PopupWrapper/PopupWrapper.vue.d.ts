import type { LngLatLike } from 'mapbox-gl';
import './PopupWrapper.less';
interface TPopupWrapper {
    lngLat: LngLatLike;
    enableDrag?: boolean;
    title: string;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<TPopupWrapper, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    closeHandle: (...args: any[]) => void;
    openHandle: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<TPopupWrapper> & Readonly<{
    onCloseHandle?: ((...args: any[]) => any) | undefined;
    onOpenHandle?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
