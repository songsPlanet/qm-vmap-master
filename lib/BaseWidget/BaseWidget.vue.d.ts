import './BaseWidget.less';
export interface TWidgetPosition {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}
export interface TWidgetOptions {
    position: TWidgetPosition;
    name?: string;
    icon: string;
    width?: number;
    height?: number;
    isOpenHandle?: boolean;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<TWidgetOptions, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    openHandle: (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<TWidgetOptions> & Readonly<{
    onOpenHandle?: ((value: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
