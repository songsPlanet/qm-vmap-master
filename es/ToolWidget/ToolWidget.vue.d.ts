import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue';
import './ToolWidget.less';
interface TPanelWidget {
    position: TWidgetPosition;
    isOpenHandle?: boolean;
    title: string;
    icon: any;
}
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<TPanelWidget, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    openHandle: (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<TPanelWidget> & Readonly<{
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
