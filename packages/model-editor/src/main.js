import Vue from 'vue'
import App from './model-editor.vue'

Vue.config.productionTip = false

new Vue({
    render: _ => _(App),
}).$mount('#app')
