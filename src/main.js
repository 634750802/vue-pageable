import Vue from 'vue'
import App from './Entry'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
