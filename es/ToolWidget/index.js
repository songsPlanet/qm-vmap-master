import 'core-js/modules/es.function.name.js';
import './ToolWidget.vue2.js';
import script from './ToolWidget.vue.js';

script.install = function (app) {
  app.component(script.name, script);
  return app;
};

export { script as default };
