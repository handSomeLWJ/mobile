import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入reset.css公共样式文件
import './assets/css/reset.css'

// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

/* import { request } from './network/request'

request({
    url: '/product/pagination',
    params: { page: 1, size: 10 }
}).then(data => {
    console.log(data.data);
}) */

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')