import 'core-js/modules/es.function.name.js';
import './PopupPanel.vue2.js';
import script from './PopupPanel.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
