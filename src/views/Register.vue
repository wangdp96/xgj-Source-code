<template>
  <div>
    <!-- 顶部区域 -->
    <mt-header class="header" title="快速注册">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/login" slot="right">登录</router-link>
    </mt-header>
    <!-- 标语区域 -->
    <div class="mall">
      <img src="../assets/images/avatar/00da335a266f21a80120ba3858f56a.jpg">
      <p>小公举零食铺</p>
    </div>
    <!-- 表单区域 -->
    <mt-field label="用户名：" 
      placeholder="请输入用户名" 
      type="text" 
      class="inp" 
      v-model="username"
      :isUnameR="isUnameR"
      @blur.native.capture="checkUname">
    </mt-field>
    <mt-field label="密码：" 
      placeholder="密码6~15位,首位为字母" 
      type="password" 
      class="inp" 
      v-model="password"
      :isUpwdR="isUpwdR"
      @blur.native.capture="checkUpwd">
    </mt-field>
    <mt-field label="确认密码：" 
      placeholder="请再次输入密码" 
      type="password" 
      class="inp" 
      v-model="cpwd"
      :isCpwdR="isCpwdR"
      @blur.native.capture="checkCpwd">
    </mt-field>
    <mt-button size="large" type="danger" class="btn" :disabled="disabled" @click="handler">注册</mt-button>
    <!-- 联系区域 -->
    <p class="contact">
      遇到问题? 您可以
      <router-link to="">联系客服</router-link>
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
      cpwd:'',
      disabled:true,
      isUnameR:false,
      isUpwdR:false,
      isCpwdR:false
    }
  },
  watch:{
    username(){
      this.checkUname();
    },
    password(){
      this.checkUpwd();
    },
    cpwd(){
      this.checkCpwd();
    }
  },
  methods:{
    checkUname(){
      var unameRegExp=/^[a-zA-Z][a-zA-Z\d]{4,11}$/;
      unameRegExp.test(this.username) ? this.isUnameR=true : this.isUnameR=false;
      this.checkAll();
    },
    checkUpwd(){
      var upwdRegExp=/^[a-zA-Z][a-zA-Z\d]{5,14}$/;
      upwdRegExp.test(this.password) ? this.isUpwdR=true : this.isUpwdR=false;
      this.checkAll();
    },
    checkCpwd(){
      this.cpwd==this.password ? this.isCpwdR=true : this.isCpwdR=false;
      this.checkAll();
    },
    checkAll(){
      this.isUnameR&&this.isUpwdR&&this.isCpwdR ? this.disabled=false : this.disabled=true;
    },
    handler(){
      this.axios.post('/checkuname',this.qs.stringify({"username":this.username})).then(res=>{
        if(res.data.code=='201'){
          this.$messagebox.alert(res.data.message,'注册提示');
        }else{
          var data=this.qs.stringify({"username":this.username,"password":this.password});
          this.axios.post('/register',data).then(res=>{
            if(res.data.code=='200'){
              this.$toast({
                message:res.data.message,
                duration:2000,
                iconClass:"iconfont icon-success"
              });
              this.$router.push('/login');
            }
            if(res.data.code=='202') this.$messagebox.alert(res.data.message,'注册提示');
          });
        }
      });
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
.btn{
  width: 90%;
  border-radius: 20px;
  margin: auto;
  margin-top: 50px;
  font-size: 14px;
}
.contact{
  font-size: 12px;
  margin: 20px;
  color: #bbb;
}
.contact a{
  color: cornflowerblue;
}
</style>