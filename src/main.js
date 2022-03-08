
import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store';
import VueResource from 'vue-resource'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { MdCard,MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdField)
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.http.options.root = "https://auth-user-cea52-default-rtdb.firebaseio.com"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
