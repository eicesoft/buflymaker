import { App } from 'vue';
import FormDesign from './components/FormDesign.vue';
import GenerateForm from './components/GenerateForm.vue';

GenerateForm.install = (Vue: App) => {
  Vue.component(GenerateForm.name, GenerateForm);
};

FormDesign.install = (Vue: App) => {
  Vue.component(FormDesign.name, FormDesign);
};

const components = [FormDesign, GenerateForm];

const install = (Vue: App) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export { install, FormDesign, GenerateForm };

export default {
  install,
  FormDesign,
  GenerateForm,
};
