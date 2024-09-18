import 'core-js/modules/es.function.name.js';
import './BaseWidget.vue2.js';
import script from './BaseWidget.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
