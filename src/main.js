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

// 引入粘性布局   吸附
import { Sticky } from 'vant';
Vue.use(Sticky);

// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
    error: require('./assets/imgs/error.jpg'),
    loading: require('./assets/imgs/loading.gif')
});

// 重新获取用户信息
store.dispatch("getUserInfo");
// 地理位置
store.dispatch('getLocation')

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')