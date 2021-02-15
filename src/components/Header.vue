<template>
  <div>
    <mt-header class="header">
      <div slot="left">
        <img class="logo-img" src="../assets/images/logo2.png">
      </div>
      <div slot="right">
        <router-link to="/cart">
          <mt-button>
            <img src="../assets/images/cart.png">
            <p>购物车</p> 
          </mt-button>
        </router-link>
        <router-link to="/message">
          <mt-button>
            <img src="../assets/images/message.png">
            <p>消息</p> 
          </mt-button>
        </router-link>
        <router-link to="/self">
          <mt-button>
            <img src="../assets/images/avatar/default.png" class="avatar"> 
          </mt-button>
        </router-link>
      </div>
    </mt-header>
  </div>
</template>

<style scoped>
.logo-img {
	margin-left: 10px;
	height: 40px;
}
.header{
	width: 100%;
	height: 55px;
	position: fixed;
	display: flex;
	justify-content: space-between;
  background-color: #f9f9f9;
	z-index: 999;
}
.header a{
  margin-right: 10px;
}
.header p{
  color: #000;
  font-size: 12px;
  transform: scale(0.8);
}
.avatar{
  border-radius: 50%;
  width:35px;
  height:35px;
  margin-top: 5px;
}
</style>

<script>
export default {
  data(){
    return{
      value:''
    }
  }
}
</script>