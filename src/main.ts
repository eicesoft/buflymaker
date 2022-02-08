import { createApp } from 'vue';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';

import 'virtual:svg-icons-register';

import App from './App.vue';

createApp(App).use(VueClipboard).mount('#app');
