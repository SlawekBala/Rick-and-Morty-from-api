import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'

import vuetify from './plugins/vuetify';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(vueResource);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
