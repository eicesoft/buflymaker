import { App } from 'vue';
import FormDesign from './components/FormDesign.vue';
import GenerateForm from './components/GenerateForm.vue';

GenerateForm.install = (Vue: App) => {
  Vue.component('GenerateForm', GenerateForm);
};

FormDesign.install = (Vue: App) => {
  Vue.component('FormDesign', FormDesign);
};

const components = [FormDesign, GenerateForm];

const installPlugin = (Vue: App) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export { installPlugin, FormDesign, GenerateForm };

export default {
  installPlugin,
  FormDesign,
  GenerateForm,
};
