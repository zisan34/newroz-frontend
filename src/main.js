import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { backend_base_url } from '../config/app';
import mixins from './utils/mixins';
Vue.config.productionTip = false;
import ValidationError from './components/shared/ValidationError';

axios.defaults.baseURL = backend_base_url;
Vue.prototype.$axios = axios;
Vue.mixin(mixins);

Vue.component('ValidationError', ValidationError);

new Vue({
  router,
  store,
  created() {
    const userInfo = localStorage.getItem('auth_data')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('auth/setAuthUserData', userData)
    }
    this.$axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401 && error.response.config.url !== '/logout') {
          this.$store.dispatch('auth/logout')
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app');
