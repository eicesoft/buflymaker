import { createApp } from 'vue';

// import {
//   create,
//   NButton,
//   NCard,
//   NTab,
//   NTabPane,
//   NForm,
//   NFormItem,
//   NInput,
//   NIcon,
//   NSelect,
//   NCheckbox,
//   NRadio,
//   NInputNumber,
//   NGi,
//   NGrid,
//   NModal,
//   NSpace,
//   NRadioGroup,
//   NCheckboxGroup,
//   NDatePicker,
//   NTimePicker,
//   NRate,
//   NSwitch,
// } from 'naive-ui';

import App from './App.vue';

// const naive = create({
//   components: [
//     NButton,
//     NCard,
//     NTab,
//     NTabPane,
//     NForm,
//     NFormItem,
//     NInput,
//     NIcon,
//     NSelect,
//     NCheckbox,
//     NRadio,
//     NInputNumber,
//     NGi,
//     NGrid,
//     NModal,
//     NSpace,
//     NRadioGroup,
//     NCheckboxGroup,
//     NDatePicker,
//     NTimePicker,
//     NRate,
//     NSwitch,
//   ],
// });
import naive from 'naive-ui';
const app = createApp(App);
app.use(naive);

app.mount('#app');
