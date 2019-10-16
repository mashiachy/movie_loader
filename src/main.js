import Vue from 'vue';
import store from './store';
import router from './router';
import '../stylus/main.styl'
import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
