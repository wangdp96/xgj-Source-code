<template>
  <div class="bg">
    <mt-header title="编辑收货地址" class="header">
      <router-link to="/address" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <span slot="right" @click="saveAddr">
        保存
      </span>
    </mt-header>
    <!-- 收货地址区域 -->
    <div class="container">
      <mt-field label="收件人" type="text" v-model="receiver" class="field"></mt-field>
      <mt-field label="手机号码"  type="text" v-model="cellphone" class="field"></mt-field>
      <mt-field label="所在省份" type="text" v-model="province" class="field"></mt-field>
      <mt-field label="所在城市" type="text" v-model="city" class="field"></mt-field>
      <mt-field label="所在地区" type="text" v-model="county" class="field"></mt-field>
      <mt-field label="详细地址" type="text" v-model="fullAddress" class="field"></mt-field>
      <mt-field label="标签" class="tagBox field">
        <div class="tag">
          <input v-for="(item,index) in tagBox" :key="index" type="button" class="tagBtn" :selected="tag==item" :value="item"  @click="selectedTag(index)">
        </div>
      </mt-field>
      <mt-field label="设为默认地址" readonly class="field">
        <mt-switch v-model="isdefault">
        </mt-switch>
      </mt-field>
      <mt-button size="large" class="deleteAddr" @click="deleteAddr">删除</mt-button>
    </div>
  </div>
</template>

<script>
import bus from '../assets/js/bus'
export default {
  data() {
    return {
      receiver:'',
      cellphone:'',
      province:'',
      city:'',
      county:'',
      fullAddress:'',
      tag:'',
      aid:'',
      isdefault:false,
      tagBox:[
        '家',
        '公司',
        '学校'
      ]
    }
  },
  created(){
    bus.$on("myaid",data=>{
      if(data){
        this.receiver = data.receiver;
        this.cellphone = data.cellphone;
        this.province = data.province
        this.city = data.city
        this.county = data.county;
        this.fullAddress = data.address;
        this.isdefault = data.is_default == 0 ? false : true;
        this.tag = data.tag;
        this.aid = data.aid;
      }
    });
  },
  beforeDestroy(){
    bus.$off("myaid")
  },
  methods:{
    selectedTag(index){
      this.tag = this.tagBox[index];
    },
    checkReceiver(){
      var RegExp=/^[\u4e00-\u9fa5]{2,6}$/;
      if(RegExp.test(this.receiver)==true){
        return true;
      }else{
        return false;
      }
    },
    checkPhone(){
      var RegExp=/^1[3-9]\d{9}$/;
      if(RegExp.test(this.cellphone)==true){
        return true;
      }else{
        return false;
      }
    },
    check(addr){
      var RegExp=/^[\u4e00-\u9fa5]+$/;
      if(RegExp.test(addr)==true){
        return true;
      }else{
        return false;
      }
    },
    checkFullAddr(){
      var RegExp=/^[\u4e00-\u9fa5\w\-]+$/;
      if(RegExp.test(this.fullAddress)==true){
        return true;
      }else{
        return false;
      }
    },
    saveAddr(){
      var is_default = this.isdefault == false ? 0 : 1 ;
      var data = this.qs.stringify({"receiver":this.receiver,"cellphone":this.cellphone,"province":this.province,"city":this.city,"county":this.county,"address":this.fullAddress,"is_default":is_default,"tag":this.tag,"aid":this.aid});
      !this.checkReceiver() ? this.$messagebox.alert('收件人姓名长度需要在2~6位中文字符') : !this.checkPhone() ? this.$messagebox.alert('请填写正确的手机号码') : !this.check(this.province) ? this.$messagebox.alert('请填写所在省份') :  !this.check(this.city) ? this.$messagebox.alert('请填写所在城市') : !this.check(this.county) ? this.$messagebox.alert('请填写所在地区') : !this.checkFullAddr() ? this.$messagebox.alert('请填写详细地址') :
      this.axios.post('/updateAddr',data).then(res=>{
        this.$toast({
          message: res.data.message,
          duration: 1000,
          iconClass:"iconfont icon-success"
        });
        this.$router.push('/address');
      });
    },
    deleteAddr(){
      this.axios.get('/deleteAddr?aid=' + this.aid).then(res=>{
        this.$toast({
          message: res.data.message,
          duration: 1000
        });
        this.$router.push('/address');
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
.header span{
  color: #fb7299;
  font-size: 14px;
}
.bg{
  background: #f5f5f5;
  height: 100vh;
}
.tag{
  display: inline-block;
  width: 200px;
  margin-right: 50px;
}
.tagBtn{
  width: 50px;
  height: 25px;
  font-size: 12px;
  margin-right: 10px;
  border-radius: 15px;
  border: 1px solid #ddd;
  background: #fff;
  color: #000;
}
.tagBtn[selected]{
  background: #fb7299;
  color: #fff;
}
.field{
  border-bottom: 1px solid #eee;
}
.tagBox{
  margin-top: 20px;
}
.deleteAddr{
  background: #fb7299;
  color: #fff;
  margin: 20px 3vw;
  width: 94vw;
  border-radius: 8px;
}
</style>