import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userinfo: {
            uid: sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : '',
            uname: sessionStorage.getItem('uname') ? sessionStorage.getItem('uname') : '',
            nickname: sessionStorage.getItem('nickname') ? sessionStorage.getItem('nickname') : '',
            email: sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '',
            phone: sessionStorage.getItem('phone') ? sessionStorage.getItem('phone') : '',
            avatar: sessionStorage.getItem('avatar') ? sessionStorage.getItem('phone') : '',
            gender: sessionStorage.getItem('gender') ? sessionStorage.getItem('gender') : '',
            user_name: sessionStorage.getItem('user_name') ? sessionStorage.getItem('user_name') : '',
            //标识是否登录
            isLogined: sessionStorage.getItem('isLogined') ? sessionStorage.getItem('isLogined') : false
        },
        iid: []
    },
    mutations: {
        userLogined(state, payload) {
            state.userinfo.uid = payload.uid;
            state.userinfo.uname = payload.uname;
            state.userinfo.nickname = payload.nickname;
            state.userinfo.email = payload.email;
            state.userinfo.phone = payload.phone;
            state.userinfo.avatar = payload.avatar;
            state.userinfo.gender = payload.gender;
            state.userinfo.user_name = payload.user_name;
            state.userinfo.isLogined = true;
        },
        updateInfo(state, payload) {
            state.userinfo.nickname = payload.nickname;
            state.userinfo.email = payload.email;
            state.userinfo.phone = payload.phone;
            state.userinfo.avatar = payload.avatar;
            state.userinfo.gender = payload.gender;
            state.userinfo.user_name = payload.user_name;
        },
        addCart(state, payload) {
            state.iid.push(payload.iid);
        },
        dropiid(state) {
            state.iid = [];
        }
    },
    actions: {},
    modules: {}
})
