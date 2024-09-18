import 'core-js/modules/es.function.name.js';
import './Swipe.vue2.js';
import script from './Swipe.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
