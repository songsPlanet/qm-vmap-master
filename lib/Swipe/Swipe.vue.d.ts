import type { TWidgetPosition } from '@/gis/BaseWidget/BaseWidget.vue';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import './Swipe.less';
type TSwipe = {
    position: TWidgetPosition;
    icon?: string;
};
declare const _default: import("vue").DefineComponent<TSwipe, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TSwipe> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
