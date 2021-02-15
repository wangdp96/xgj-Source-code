import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Gt from "./components/xgj_gt"
Vue.component("gt",Gt);

axios.defaults.baseURL='https://testxgj.applinzi.com';
Vue.prototype.axios=axios;
Vue.config.productionTip = false

import qs from 'qs'
Vue.prototype.qs=qs;

//引入moment模块
import moment from "moment";
Vue.prototype.moment=moment;

import MintUI from 'mint-ui'

import "mint-ui/lib/style.min.css"


Vue.use(MintUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
