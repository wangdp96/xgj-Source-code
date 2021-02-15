import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Search from '../components/Search'

import Index from '../views/Index'
import Cart from '../views/Cart'
import Order from '../views/Order'
import Me from '../views/Me'
import Register from '../views/Register'
import Login from '../views/Login'
import PersonInfo from '../views/PersonInfo'
import store from '../store'
import ChangePwd from '../views/ChangePwd'
import Address from '../views/Address'
import AddAddr from '../views/AddAddr'
import EditAddr from '../views/EditAddr'
import Searchs from '../views/Searchs'
import Searchpro from '../views/Searchpro'
import Details from '../views/Details'
import Banner from '../components/Banner'
import IndexEntry from '../components/IndexEntry'
import Goods from '../components/Goods'
import Orderdetails from '../views/Orderdetails'
import OrderDetail from '../views/OrderDetail'

Vue.component('myheader',Header);
Vue.component('myfooter',Footer);
Vue.component('mysearch',Search);
Vue.component('Banner',Banner);
Vue.component('indexentry',IndexEntry);
Vue.component('goods',Goods);

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/cart',
    component: Cart,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/order',
    component: Order,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/me',
    component: Me,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/personinfo',
    component: PersonInfo,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/changepwd',
    component: ChangePwd,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/address',
    component: Address,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/addAddr',
    component: AddAddr,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/editAddr',
    component: EditAddr,
    meta:{
      requiresAuth:true
    }
  },
	{
		path:'/searchs',
		component:Searchs
	},
	{
		path:'/searchpro',
		component:Searchpro
	},
	{
		path:'/details',
		component:Details
	},
	{
		path:'/orderdetails',
		component: Orderdetails
  },
  {
		path:'/orderdetail',
		component: OrderDetail
	},
  {
    path: '/help',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "help" */ '../views/Help.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to,from,next)=>{
  //如果包含requiresAuth的元信息则代表需要进行用户登录状态的检测
  if(to.meta.requiresAuth){
    //检测用户是否登录了?
    if(store.state.userinfo.isLogined == false || sessionStorage.getItem('isLogined') == false){
      //强行跳转到登录路由(附加目标路由信息作为URL地址栏的参数)
      //该参数将在用户登录成功后，再次跳转回该路由
      router.push('/login?redirect=' + to.fullPath);
    }else{
      //访问用户期望访问的信息
      next();
    }
  }else{
    //不需要用户登录即可访问的路由
    next();
  } 
});

export default router
