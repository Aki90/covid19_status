import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { formatDate, makeComma } from '@/utils/filters';

// Multiselect Library CSS File
import 'vue-multiselect/dist/vue-multiselect.min.css';

// Filter
Vue.filter('formatDate', formatDate);
Vue.filter('makeComma', makeComma);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
