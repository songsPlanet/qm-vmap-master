import 'core-js/modules/es.function.name.js';
import './Measure.vue2.js';
import script from './Measure.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
