<template>
  <div class="bg">
    <mt-header title="修改密码" class="header">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <p class="field">
      <span>请输入当前登录密码</span>
      <input type="password" placeholder="请输入当前登录密码" :oldPwdR="oldPwdR" v-model="oldPwd" @blur="checkOldPwd">
    </p>
    <p class="field">
      <span>确认新密码</span>
      <input type="password" placeholder="确认新密码" v-model="newPwd" :newPwdR="newPwdR" @blur="checkNewPwd">
    </p>
    <p class="remind">
      必须是6-15个英文字母、数字或符号(如_，其他特殊符号不支持)，且首位字符需为英文字母
    </p>
    <button class="next" :disabled="disabled" @click="changePwd">下一步</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      oldPwd: '',
      newPwd: '',
      oldPwdR: false,
      newPwdR: false,
      disabled: true,
      uname: sessionStorage.getItem('uname')
    }
  },
  watch:{
    oldPwd(){
      this.checkOldPwd();
    },
    newPwd(){
      this.checkNewPwd();
    }
  },
  methods:{
    checkAll(){
      if(this.oldPwdR == false || this.newPwdR == false){
        this.disabled = true;
      }else{
        this.disabled = false;
      }
    },
    checkOldPwd(){
      var upwdRegExp=/^[a-zA-Z][a-zA-Z\d]{5,14}$/;
      upwdRegExp.test(this.oldPwd) ? this.oldPwdR=true : this.oldPwdR=false;
      this.checkAll();
    },
    checkNewPwd(){
      var upwdRegExp=/^[a-zA-Z][a-zA-Z\d]{5,14}$/;
      upwdRegExp.test(this.newPwd) && this.newPwd != this.oldPwd ? this.newPwdR=true : this.newPwdR=false;
      this.checkAll();
    },
    changePwd(){
      this.axios.post('/oldPwd',this.qs.stringify({"uname":this.uname,"oldPwd":this.oldPwd})).then(res=>{
        if(res.data.code=='202'){
          this.$messagebox.alert(res.data.message);
        }else{
          this.axios.post('/changePwd',this.qs.stringify({"uname":this.uname,"newPwd":this.newPwd})).then(res=>{
            if(res.data.code=='200') this.$messagebox.alert(res.data.message);
            this.$router.push('/login');
          });
        }
      });
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
.header a{
  color: #fb7299;
}
.field{
  background: #fff;
  padding: 8px 10px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 14px;
}
.field>input{
  outline: 0;
  border: none;
  margin-left: 20px;
}
.bg{
  background: #f5f5f5;
  height: 100vh;
}
.remind{
  margin: 10px;
  color: #999;
  font-size: 12px;
}
.next{
  background: #fb7299;
  color: #fff;
  margin: 10px 3vw;
  width: 94vw;
  padding: 10px 0;
  border: none;
  font-size: 14px;
  border-radius: 5px;
}
.next:disabled{
  color: #ddd;
}
</style>