<template>
  <div class="bg">
    <mt-header class="header" title="编辑资料">
      <div slot="left">
        <router-link to="/me">
          <mt-button icon="back"></mt-button>
        </router-link>
      </div>
      <div slot="right">
        <div @click="submitinfo">
          <router-link to="">完成</router-link>
        </div>
      </div>
    </mt-header>
    <div class="container">
			<router-link to="/self" class="mya">
			  <mt-button class="mybtn">
			    <img src="../assets/images/avatar/default.png" class="avatar"> 
			  </mt-button>
			</router-link>
      <mt-field label="昵称" placeholder="请设置昵称" v-model="nickname"></mt-field>
      <mt-field label="用户名"  type="text" v-model="uname" readonly disableClear class="field"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" class="field"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone" class="field"></mt-field>
      <mt-field label="真实姓名" placeholder="请输入真实姓名" type="text" v-model="user_name" class="field"></mt-field>
      <mt-cell
        title="性别"
        is-link
        @click.native.capture="actionSheet"
        v-model="gender"
        class="field">
      </mt-cell>
      <p class="remind">
        注意: 昵称是用户在互动场景中的称语，需和殿下登录注册时使用的用户名不同，能更有效保护购买记录等隐私信息，设置昵称还能让公举殿下提高声望值。
      </p>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      nickname:this.$store.state.userinfo.nickname,
      actions:[
        {name:'男',method:this.getMan},
        {name:'女',method:this.getWomen}
      ],
      sheetVisible:false,
      uname:this.$store.state.userinfo.uname,
      email:this.$store.state.userinfo.email,
      phone:this.$store.state.userinfo.phone,
      user_name:this.$store.state.userinfo.user_name,
      gender:this.$store.state.userinfo.gender == 0 ? '女' : '男',
      sex:''
    }
  },
  methods:{
    actionSheet(){
      this.sheetVisible = true;
    },
    getMan(){
      this.gender = '男';
    },
    getWomen(){
      this.gender = '女';
    },
    checkNickN(){
      var RegExp=/^[\u4e00-\u9fa5\w]{2,}$/;
      if(RegExp.test(this.nickname)==true){
        return true;
      }else{
        return false;
      }
    },
    checkEmail(){
      var RegExp=/^\w+@\w+\.\w+(\.cn)?$/;
      if(RegExp.test(this.email)==true){
        return true;
      }else{
        return false;
      }
    },
    checkPhone(){
      var RegExp=/^1[3-9]\d{9}$/;
      if(RegExp.test(this.phone)==true){
        return true;
      }else{
        return false;
      }
    },
    checkUserN(){
      var RegExp=/^[\u4e00-\u9fa5]{2,6}$/;
      if(RegExp.test(this.user_name)==true){
        return true;
      }else{
        return false;
      }
    },
    submitinfo(){
      var sex = this.gender;
      var sex = sex=='男' ? 1 : 0;
      var data=this.qs.stringify({"uname":this.uname,"nickname":this.nickname,"email":this.email,"phone":this.phone,"gender":sex,"user_name":this.user_name});
      !this.checkNickN() ? this.$messagebox.alert('最少需输入2个字符') : !this.checkEmail() ? this.$messagebox.alert('邮箱格式有误') : !this.checkPhone() ? this.$messagebox.alert('手机号输入有误') : !this.checkUserN() ? this.$messagebox.alert('真实姓名请输入2~6个汉字') : 
      this.axios.post('/updateInfo',data).then(res=>{
        if(res.data.code=='200'){
          this.axios.post('/allInfo',this.qs.stringify({"uname":this.uname})).then(res=>{
            //将相关信息存储到sessionStorage中
            sessionStorage.setItem('nickname',res.data.info.nickname);
            sessionStorage.setItem('email',res.data.info.email);
            sessionStorage.setItem('phone',res.data.info.phone);
            sessionStorage.setItem('avatar',res.data.info.avatar);
            sessionStorage.setItem('gender',res.data.info.gender);
            sessionStorage.setItem('user_name',res.data.info.user_name);
            this.$store.commit('updateInfo',res.data.info);
            this.$messagebox.alert('更新成功');
            this.$router.push('/me');
          });
        }
      });
    }
  }
}
</script>

<style scoped>
	
.container .mya {
	text-align: center;
}

.mybtn {
	background: transparent;
	box-shadow: 0 0 0 0;
	height: 100%;
}
	
.mya {
	display: block;
	margin: 10px auto;
	width: 120px;
}
	
.avatar{
	display: block;
  border-radius: 50%;
	width: 80px;
}

.header{
  background: #f8f8f8;
  font-size: 16px;
  color: #fb7299;
}
.header a{
  font-size: 14px;
  color: #fb7299;
}
.bg{
  background: #f5f5f5;
  height: 100vh;
}
.gender{
  background: #fff;
  height: 48px;
  line-height: 48px;
}
.gender>span{
  margin-left: 10px;
}
.right{
  float: right;
  margin-right: 10px;
}
.field{
  margin-top: 15px;
}
.remind{
  font-size: 12px;
  color: #999;
  margin: 15px 15px 0 15px;
}
</style>