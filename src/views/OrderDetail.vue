<template>
  <div>
    <!-- 订单详情头部 -->
    <mt-header title="订单详情" class="header">
      <router-link to="/order" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 订单交易状态 -->
    <div class="order-statu">
      <div>交易成功</div>
      <div>
        <img src="../assets/images/order/ordercomplete-420-300.png_400x400q85s150.jpg_.webp" alt="">
      </div>
    </div>
    <!-- 订单收货地址信息 -->
    <div class="addr">
      <div class="addr_fname">
        <img src="../assets/images/order/address.png">
      </div>
      <div class="addr_details">
        <p>
          <span class="receiver">111</span>
          <span class="cellphone">112</span>
        </p>
        <p class="fullAddress">
          11111111111111111111111111
        </p>
      </div>
    </div>
    <!-- 订单商品的信息 -->
    <div class="productItem">
      <div class="product-pic">
        <img src="">
      </div>
      <div class="product-detail">
        <div class="product-title">123</div>
        <div class="product-price">
          <p> 
            <span class="symbol">￥</span>
            <span>123</span>
          </p>
          <p>
            <span>×</span>
            <span>123</span>
          </p>
        </div>
      </div>
      <div class="order-totalprice">
        <div class="left">商品总价</div>
        <div class="right">￥310.70</div>
      </div>
      <div class="order-payment">
        <div class="left">实付款</div>
        <div class="right">￥150.20</div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo">
      <div class="loadMore">
        <span class="left">订单信息</span>
        <span class="right">查看更多</span> 
      </div>
      <div>
        <span class="left">订单编号</span>
        <span class="right">548545456415</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  mounted(){
    console.log(this.$route.query.productId)
  }
}
</script>

<style scoped>
.header{
  background: #f5f5f5;
  color: #fb7299;
  font-size: 16px;
}
.order-statu{
  display: flex;
  align-items: center;
  color: #fb7299;
  justify-content: space-around;
  font-size: 14px;
}
.order-statu img{
  width: 110px;
}
.addr{
  display: flex;
  background: #fff;
  padding: 15px 0;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 8px;
}
.addr_fname{
  width: 35px;
  height: 35px;
  background: #fb7299;
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
.productItem{
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 10px;
}
.product-to{
  display: flex;
}
.product-pic{
  flex: 2;
  margin-right: 15px;
}
.product-pic img{
  display: block;
  width: 100%;
  height: 100%;
}
.product-detail{
  flex: 5;
}
.product-title{
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-price{
  text-align: right;
}
.product-price>p{
  margin: 5px 0;
}
.symbol{
  font-size: 12px;
}
.product-price p:nth-child(1){
  font-size: 16px;
}
.product-price p:nth-child(2){
  font-size: 12px;
  color: #ccc;
}
.order-payment,.order-totalprice{
  flex: 100%;
  display: flex;
  margin-top: 8px;
}
.left{
  flex: 1;
}
.right{
  text-align: right;
}
.order-totalprice{
  font-size: 12px;
  color: #aaa;
}
.order-payment{
  font-size: 14px;
  color: #000;
}
.order-payment .right{
  color: #fb7299;
}
.orderInfo{
  background: #fff;
  padding: 15px;
  border-radius: 10px;
}
.orderInfo>div{
  display: flex;
}
.loadMore .right{
  font-size: 12px;
  color: #aaa;
}
.orderInfo>div:not(.loadMore){
  font-size: 12px;
  margin-top: 10px;
}
</style>