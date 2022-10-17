// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';

// createApp(App).use(router).mount('#app');

// axios

import { createApp } from 'vue';
// import * as Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

// Import component
import LoadingStatus from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import App from './App.vue';
import router from './router';
import currency from './methods/filters';

const app = createApp(App);
app.config.globalProperties.$filters = {
  currency,
};

app.use(VueAxios, axios);
app.use(router);
app.component('LoadingStatus', LoadingStatus);
app.mount('#app');
