import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'

import vuetify from '@/plugins/vuetify'

Vue.use(Vuesax)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
}).$mount('#app')
