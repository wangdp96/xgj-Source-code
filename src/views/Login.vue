<template>
  <div>
    <!-- 顶部区域 -->
    <mt-header class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/help" slot="right">帮助</router-link>
    </mt-header>
    <!-- 标语区域 -->
    <div class="mall">
      <img src="../assets/images/avatar/00da335a266f21a80120ba3858f56a.jpg">
      <p>小公举零食铺</p>
    </div>
    <!-- 表单区域 -->
    <mt-field 
      placeholder="请输入用户名" 
      type="text" 
      class="inp" 
      v-model="username"
      :isNullUname="isNullUname"
      @blur.native.capture="checkUname">
    </mt-field>
    <mt-field 
      placeholder="请输入密码" 
      :type="isShow" 
      class="inp" 
      v-model="password"
      :isNullUpwd="isNullUpwd"
      @blur.native.capture="checkUpwd">
        <span @click="show">
          <img src="../assets/images/show.png" v-if="isShow=='text'">
          <img src="../assets/images/hide.png" v-else>
        </span>
        <span>|</span>
        <span>
          <router-link to="">忘记密码</router-link>
        </span>
    </mt-field>
    <mt-button size="large" type="danger" class="btn" :disabled="disabled" @click="login">登录</mt-button>
    <p class="toReg">
      <router-link to="/register">新用户注册</router-link> 
    </p>
  </div>
</template>

<script>
import '../assets/styles/iconfont.css'
export default {
  data(){
    return{
      username:'',
      password:'',
      isShow:'password',
      isNullUname:true,
      isNullUpwd:true,
      disabled:true
    }
  },
  watch:{
    username(){
      this.checkUname();
    },
    password(){
      this.checkUpwd();
    }
  },
  methods:{
    show(){
      this.isShow=='text'?this.isShow='password':this.isShow='text';
      this.checkAll();
    },
    checkUname(){
      this.username!='' ? this.isNullUname=false : this.isNullUname=true;
      this.checkAll();
    },
    checkUpwd(){
      this.password!='' ? this.isNullUpwd=false : this.isNullUpwd=true;
      this.checkAll();
    },
    checkAll:function(){
      this.isNullUname||this.isNullUpwd ? this.disabled=true : this.disabled=false;
    },
    login(){
      var data=this.qs.stringify({"username":this.username,"password":this.password});
      this.axios.post('/login',data).then(res=>{
        if(res.data.code=='200'){
          //登录成功，将相关信息存储到sessionStorage中
          sessionStorage.setItem('uid',res.data.info.uid);
          sessionStorage.setItem('uname',res.data.info.uname);
          sessionStorage.setItem('nickname',res.data.info.nickname);
          sessionStorage.setItem('email',res.data.info.email);
          sessionStorage.setItem('phone',res.data.info.phone);
          sessionStorage.setItem('avatar',res.data.info.avatar);
          sessionStorage.setItem('gender',res.data.info.gender);
          sessionStorage.setItem('user_name',res.data.info.user_name);
          sessionStorage.setItem('isLogined',true);
          this.$store.commit('userLogined',res.data.info);
          this.$toast({
            message:res.data.message,
            duration:1000,
            iconClass:"iconfont icon-success"
          });
          this.$route.query.redirect ? this.$router.push(this.$route.query.redirect) : this.$router.push('/')
        }else{
          this.$toast({
            message:res.data.message,
            duration:1500,
            iconClass:"iconfont icon-fail"
          });
        }
      })
    }
  }
}
</script>

<style scoped>
.header{
  background: #fff;
  color: #515151;
  font-size: 16px;
}
.header a{
  font-size: 14px;
}
.mall{
  text-align: center;
  margin-top: 10px;
}
.mall>img{
  margin-top: 5px;
}
.mall>P{
  color: #777;
  font-size: 14px;
  margin-top: 5px;
}
.inp{
  width: 90%;
  margin:auto;
  margin-top: 5px;
  border-bottom: 1px solid #ddd; 
}
.inp+.inp{
  margin-top: 20px;
}
.inp span{
  margin-left:10px;
  font-size: 14px;
}
.inp a{
  color: #515151;
}
.btn{
  width: 90%;
  border-radius: 20px;
  margin: auto;
  margin-top: 50px;
  font-size: 14px;
}
.toReg{
  text-align: right;
  margin: 20px;
  font-size: 14px;
}
.toReg a{
  color: #555;
}
</style>