<template>
  <div class="bg">
    <mt-header class="header" title="Hello Master">
    </mt-header>
    <div class="container">
      <mt-cell title="设置昵称及头像" class="user" is-link to="/personinfo" v-if="$store.state.userinfo.nickname==''">
        <img src="../assets/images/avatar/me_default.png" slot="icon">
      </mt-cell>
      <mt-cell :title="$store.state.userinfo.nickname" class="user" is-link to="/personinfo" v-else>
        <img src="../assets/images/avatar/me_default.png" slot="icon">
        <span>编辑</span>
      </mt-cell>
      <mt-cell title="修改账户密码" is-link class="desc" to="/changepwd"></mt-cell>
      <mt-cell title="我的收货地址" is-link class="desc" to="/address"></mt-cell>
      <mt-cell title="我的购物车" is-link class="desc" to="/cart"></mt-cell>
      <mt-cell title="我的订单" is-link class="desc" to="/order"></mt-cell>
      <mt-cell title="获取帮助" is-link class="desc" to="/help"></mt-cell>
      <mt-button size="large" class="btn" @click="logout">退出登录</mt-button>
    </div>
    <myfooter :selected="selected" :icons="icons"></myfooter>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selected:'me',
      icons:[
        require('../assets/images/footer/home.png'),
        require('../assets/images/footer/cart.png'),
        require('../assets/images/footer/order.png'),
        require('../assets/images/footer/me_c.png')
      ]
    }
  },
  methods:{
    logout(){
      sessionStorage.clear();
      this.$store.state.userinfo.uid = '';
      this.$store.state.userinfo.uname = '';
      this.$store.state.userinfo.nickname = '';
      this.$store.state.userinfo.email = '';
      this.$store.state.userinfo.phone = '';
      this.$store.state.userinfo.avatar = '';
      this.$store.state.userinfo.gender = '';
      this.$store.state.userinfo.user_name = '';
      this.$store.state.userinfo.isLogined = false;
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.header{
  background: #f8f8f8;
  color: #fb7299;
  font-size: 16px;
}
.user{
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  color: #fb7299;
}
.desc{
  color: #777;
  border-bottom: 1px solid #f5f5f5;
}
.desc+.desc{
  margin-top: 12px;
}
.container span{
  font-size: 14px;
}
.bg{
  background: #f5f5f5;
  height: 100vh;
}
.btn{
  margin-top: 15px;
  background: #fff;
  color: #777;
  font-size: 16px;
}
</style>