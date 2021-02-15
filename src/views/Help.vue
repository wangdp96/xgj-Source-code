<template>
  <div>
    <!-- 顶部区域 -->
    <mt-header title="登录帮助" class="header">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" icon="more" @click="popup"></mt-button>
    </mt-header>
    <!-- 帮助内容区域 -->
    <div class="help">
      <p v-for="(item,k) in helpContent" :key="k">
        <span>{{item.id}}</span>
        <span>{{item.content}}</span>
      </p>
    </div>
    <p class="service">
      <span>没找到相关问题? 点此</span>
      <label @click="actionSheet">
        <router-link to="">联系客服</router-link>
      </label>
    </p>
    <!-- 隐藏的操作表 -->
    <mt-popup
      v-model="popupVisible"
      :modal=false
      class="popup"
      position="top">
      <div>
        <mt-cell title="消息">
          <img slot="icon" src="../assets/images/help/message.png">
        </mt-cell>
        <mt-cell title="首页">
          <img slot="icon" src="../assets/images/help/home.png">
        </mt-cell>
        <mt-cell title="搜索">
          <img slot="icon" src="../assets/images/help/search.png">
        </mt-cell>
        <mt-cell title="购物车">
          <img slot="icon" src="../assets/images/help/cart.png">
        </mt-cell>
        <mt-cell title="功能反馈">
          <img slot="icon" src="../assets/images/help/feedback.png">
        </mt-cell>
      </div>
    </mt-popup>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
export default {
  data(){
    return{
      actions:[
        {name:'呼叫 112256',method:this.getPhone}
      ],
      sheetVisible:false,
      popupVisible:false,
      helpContent:[
        {id:"Q:",content:"我的账户登录密码忘记了怎么办?"},
        {id:"A:",content:"您可以点击找回密码，验证身份后即可重新设置新的登录密码；您也可以通过短信验证码登录零食铺账户。"},
        {id:"Q:",content:"已绑定的手机号不能正常使用，如何修改手机号?"},
        {id:"A:",content:"您也可以点击更换账户绑定手机号，身份认证后您可以按照页面提示来更换账户绑定的手机号码。"},
        {id:"Q:",content:"为什么需要身份验证?"},
        {id:"A:",content:"系统监测到您的账户存在风险，为了保障您的账户安全，请您根据提示内容完成验证。"},
      ]
    }
  },
  methods:{
    actionSheet(){
      this.sheetVisible=true;
    },
    getPhone(){
      console.log("打开电话");
    },
    popup(){
      this.popupVisible=!this.popupVisible;
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
.help>p{
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  margin: 0 20px;
}
.help>p>span:first-child{
  color: #ddd;
  font-size: 16px;
  font-weight: bold;
}
.help>p>span:last-child{
  color: #555;
  font-size: 12px;
}
.service{
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
  color: #999;
}
.service a{
  color: #000;
  font-weight: bold;
  text-decoration: underline;
  margin-left: 5px;
}
.popup{
  top: 35px;
  left: 235px;
  border: 1px solid #eee;
  width: 130px;
  height: 240px;
  transform: none;
  opacity: 0.95;
}
</style>
<style>
.popup span{
  margin-left: 10px;
  font-size: 14px;
}
</style>