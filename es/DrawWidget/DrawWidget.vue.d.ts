import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import type { TWidgetPosition } from '../BaseWidget';
import './DrawWidget.less';
type TDrawWidget = {
    position: TWidgetPosition;
};
declare const _default: import("vue").DefineComponent<TDrawWidget, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<TDrawWidget> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
