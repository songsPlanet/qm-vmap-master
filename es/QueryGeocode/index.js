import 'core-js/modules/es.function.name.js';
import './QueryGeocode.vue2.js';
import script from './QueryGeocode.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
