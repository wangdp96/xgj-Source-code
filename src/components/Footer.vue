<template>
  <mt-tabbar v-model="selectedTab" fixed id="tabbar">
    <mt-tab-item id="home">
      <img :src="this.fIcons[0]" slot="icon">
      首页
    </mt-tab-item>
    <mt-tab-item id="cart">
      <img :src="this.fIcons[1]" slot="icon">
      购物车
    </mt-tab-item>
    <mt-tab-item id="order">
      <img :src="this.fIcons[2]" slot="icon">
      订单
    </mt-tab-item>
    <mt-tab-item id="me">
      <img :src="this.fIcons[3]" slot="icon">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data(){
    return{
      selectedTab: this.selected,
      fIcons: this.icons
    }
  },
  props:{
    selected: String,
    icons: Array
  },
  watch: {
    //监听底部选项卡的变化
    selectedTab: function (val,oldVal) {
      // 这里就可以通过 val 的值变更来确定去向
      switch(val){
        case 'home':
          this.$router.push('/');
        break;
        case 'cart':
          this.$router.push('/cart');
        break;
        case 'order':
          this.$router.push('/order');
        break;
        case 'me':
          this.$router.push('/me');
        break;
      }
    }
  }
}
</script>

<style scoped>
#tabbar .is-selected{
  color:#fb7299;
}
</style>