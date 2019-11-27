import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-material-design-icons/styles.css';

import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';

Vue.component('delete-icon', DeleteIcon);
Vue.component('pencil-icon', PencilIcon);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
