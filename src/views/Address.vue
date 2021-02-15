<template>
  <div class="bg">
    <mt-header title="我的收货地址" class="header">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/addAddr" slot="right">
        添加新地址
      </router-link>
    </mt-header>
    <!-- 收货地址区域 -->
    <div class="addr" v-for="(item,index) in addressDesc" :key="index">
      <div class="addr_fname">
        <div>
          {{item.receiver.charAt(0)}}
        </div>
      </div>
      <div class="addr_details">
        <p>
          <span class="receiver">{{item.receiver}}</span>
          <span class="cellphone">{{item.cellphone}}</span>
        </p>
        <p class="fullAddress">
          <span v-if="item.is_default">
            <span class="tag default">默认</span>
          </span>
          <span v-if="item.tag!=''">
            <span class="tag addrTag">{{item.tag}}</span>
          </span>
          {{item.province+' '+item.city+' '+item.county+' '+item.address}}
        </p>
      </div>
      <div class="addr_edit">
          <span>|</span>
          <span>
            <span @click="edit(item)">编辑</span>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../assets/js/bus'
export default {
  data() {
    return {
      uid: sessionStorage.uid,
      addressDesc: [],
      desc: '',
    }
  },
  methods:{
    edit(data){
      this.desc = data;
      this.$router.push('/editAddr');
    }
  },
  mounted(){
    this.axios.get("/address?uid="+this.uid).then(res=>{
      this.addressDesc=res.data.result;
    });
  },
  beforeDestroy(){
    bus.$emit("myaid",this.desc);
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
  font-size: 14px;
}
.bg{
  background: #f5f5f5;
  height: 100vh;
}
.addr{
  display: flex;
  background: #fff;
  padding: 20px 0;
  align-items: center;
}
.addr_fname>div{
  width: 35px;
  height: 35px;
  background: #aaa;
  border-radius: 50%;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin: 0 10px;
}
.addr_details{
  width: 250px;
}
.addr_details>p:nth-child(1){
  margin-bottom: 4px;
}
.addr_details>p>.cellphone{
  font-size: 12px;
  margin-left: 12px;
  color: #bbb;
}
.addr_details>.fullAddress{
  font-size: 14px;
}
.addr_edit{
  padding: 0 10px;
  width: 80px;
  height: 30px;
  font-size: 22px;
  color: #eee;
  line-height: 30px;
  margin-right: -30px;
}
.addr_edit>span+span>span{
  margin-left: 10px;
  font-size: 14px;
  color: #bbb;
}
.tag{
  display: inline-block;
  width: 40px;
  margin-right: 4px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 4px;
}
.default{
  background: #fb7299;
  color: #fff;
}
.addrTag{
  background: #80b3f5;
  color: #fff;
}
</style>