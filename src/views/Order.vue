<template>
  <div>
    <mt-header title="我的订单" class="header"></mt-header>
    <mt-navbar v-model="selectTab">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
      <mt-tab-item id="3">待发货</mt-tab-item>
      <mt-tab-item id="4">待收货</mt-tab-item>
      <mt-tab-item id="5">已完成</mt-tab-item>
    </mt-navbar>
    <div v-if="orderList==[]">
      <div class="empty-order">
        <img src="../assets/images/empty_order.png">
        <p>您还没有相关订单</p>
      </div>
    </div>
    <mt-tab-container v-model="selectTab" class="orderList" v-else>
      <mt-tab-container-item id="1">
        <div v-for="(item,index) in orderList" :key="index" class="orderItem">
          <div @click="toDetail(item.orderId)" class="order-to">  
            <div class="order-pic">
              <img :src="item.pic">
            </div>
            <div class="order-detail">
              <div class="order-title">{{item.title}}</div>
              <div class="order-price">
                <p> 
                  <span class="symbol">￥</span>
                  <span>{{item.pre_price.toFixed(2)}}</span>
                </p>
                <p>
                  <span>×</span>
                  <span>{{item.count}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="order-pay">
            <span class="order-total">
              总价<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
            <span class="order-realPay" v-if="item.status==1">
              待付款<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
            <span class="order-realPay" v-else>
              实付款<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
          </div>
          <div class="order-btn-box">
            <button class="order-btn pay-btn" v-if="item.status==1" @click="pay(item.orderId)">付款</button>
            <button class="order-btn reminder-btn" v-else-if="item.status==2">催单</button>
            <button class="order-btn receive-btn" v-else-if="item.status==3">确认收货</button>
            <button class="order-btn" v-else>再次购买</button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div v-for="(item,index) in waitPay" :key="index" class="orderItem">
          <div @click="toDetail(item.aid)" class="order-to">  
            <div class="order-pic">
              <img :src="item.pic">
            </div>
            <div class="order-detail">
              <div class="order-title">{{item.title}}</div>
              <div class="order-price">
                <p> 
                  <span class="symbol">￥</span>
                  <span>{{item.pre_price.toFixed(2)}}</span>
                </p>
                <p>
                  <span>×</span>
                  <span>{{item.count}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="order-pay">
            <span class="order-total">
              总价<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
            <span class="order-realPay">
              待付款<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
          </div>
          <div class="order-btn-box">
            <button class="order-btn pay-btn" @click="pay">付款</button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div v-for="(item,index) in waitDeliver" :key="index" class="orderItem">
          <div @click="toDetail(item.aid)" class="order-to"> 
            <div class="order-pic">
              <img :src="item.pic">
            </div>
            <div class="order-detail">
              <div class="order-title">{{item.title}}</div>
              <div class="order-price">
                <p> 
                  <span class="symbol">￥</span>
                  <span>{{item.pre_price.toFixed(2)}}</span>
                </p>
                <p>
                  <span>×</span>
                  <span>{{item.count}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="order-pay">
            <span class="order-total">
              总价<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
            <span class="order-realPay">
              实付款<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
          </div>
          <div class="order-btn-box">
            <button class="order-btn reminder-btn">催单</button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div v-for="(item,index) in waitReceive" :key="index" class="orderItem">
          <div @click="toDetail(item.aid)" class="order-to"> 
            <div class="order-pic">
              <img :src="item.pic">
            </div>
            <div class="order-detail">
              <div class="order-title">{{item.title}}</div>
              <div class="order-price">
                <p> 
                  <span class="symbol">￥</span>
                  <span>{{item.pre_price.toFixed(2)}}</span>
                </p>
                <p>
                  <span>×</span>
                  <span>{{item.count}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="order-pay">
            <span class="order-total">
              总价<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
            <span class="order-realPay">
              实付款<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
          </div>
          <div class="order-btn-box">
            <button class="order-btn receive-btn">确认收货</button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <div v-for="(item,index) in received" :key="index" class="orderItem">
          <div @click="toDetail(item.aid)" class="order-to"> 
            <div class="order-pic">
              <img :src="item.pic">
            </div>
            <div class="order-detail">
              <div class="order-title">{{item.title}}</div>
              <div class="order-price">
                <p> 
                  <span class="symbol">￥</span>
                  <span>{{item.pre_price.toFixed(2)}}</span>
                </p>
                <p>
                  <span>×</span>
                  <span>{{item.count}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="order-pay">
            <span class="order-total">
              总价<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
            <span class="order-realPay">
              实付款<span class="symbol">￥</span>{{(item.pre_price*item.count).toFixed(2)}}
            </span>
          </div>
          <div class="order-btn-box">
            <button class="order-btn">再次购买</button>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <myfooter :selected="selected" :icons="icons"></myfooter>
  </div>
</template>

<script>
export default {
  data(){
    return{
      selected:'order',
      icons:[
        require('../assets/images/footer/home.png'),
        require('../assets/images/footer/cart.png'),
        require('../assets/images/footer/order_c.png'),
        require('../assets/images/footer/me.png')
      ],
      selectTab:'1',
      orderList:[],
      waitPay:[],
      waitDeliver:[],
      waitReceive:[],
      received:[]
    }
  },
  mounted(){
    this.axios.get('/allOrder?user_id='+this.$store.state.userinfo.uid).then(res=>{
      let data = res.data.info;
      console.log(res.data.info);
      data.forEach( e => {
        e.pic = require('../assets/images/laptop_top_pic/' + e.pic);
        this.orderList.push(e);
        switch(e.status){
          case 1: 
            this.waitPay.push(e);
            break
          case 2:
            this.waitDeliver.push(e);
            break
          case 3:
            this.waitReceive.push(e);
            break
          case 4:
            this.received.push(e);
            break
        }
      });
    });
  },
  methods:{
    toDetail(data){
      this.$router.push('/orderdetail?orderId='+data)
    },
    pay(id){
      this.$router.push('/orderdetails?orderId='+id)
    }
  }
}
</script>

<style scoped>
.header{
  background: #f5f5f5;
  color: #fb7299;
  font-size: 16px;
}
.mint-navbar .mint-tab-item{
  margin: 0 10px;
}
.mint-navbar .mint-tab-item.is-selected{
  border-bottom: 2px solid #fb7299;
  color: #fb7299;
}
.mint-navbar{
  background-color: #f5f5f5;
  margin-top: -8px;
}
.orderList{
  margin: 15px 10px;
  margin-bottom: 55px;
}
.empty-order{
  width: 40%;
  margin: 50px auto;
  text-align: center;
}
.empty-order>p{
  margin-top: 20px;
}
.orderItem{
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 10px;
}
.order-to{
  display: flex;
}
.order-pic{
  flex: 2;
  margin-right: 15px;
}
.order-pic img{
  display: block;
  width: 100%;
  height: 100%;
}
.order-detail{
  flex: 5;
}
.order-title{
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.order-price{
  text-align: right;
}
.order-price>p{
  margin: 5px 0;
}
.symbol{
  font-size: 12px;
}
.order-price p:nth-child(1){
  font-size: 16px;
}
.order-price p:nth-child(2){
  font-size: 12px;
  color: #ccc;
}
.order-pay{
  flex: 100%;
  text-align: right;
  font-size: 14px;
  margin: 5px 0;
}
.order-pay .order-total{
  color: #ccc;
  margin-right: 10px;
}
.order-btn-box{
  flex: 1;
  text-align: right;
}
.order-btn{
  background: transparent;
  border: 1px solid #ccc;
  outline: none;
  width: 90px;
  border-radius: 15px;
  color: #777;
  font-size: 14px;
  padding: 4px;
}
.pay-btn,.receive-btn,.reminder-btn{
  color: #fb7299;
  border: 1px solid #fb7299;
}
</style>