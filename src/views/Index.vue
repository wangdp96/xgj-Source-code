<template>
  <div>
    <myheader></myheader>
		<mysearch></mysearch>
		<Banner></Banner>
		<indexentry></indexentry>
		<goods></goods>
    <myfooter :selected="selected" :icons="icons"></myfooter>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data(){
    return{
      selected:'home',
      icons:[
        require('../assets/images/footer/home_c.png'),
        require('../assets/images/footer/cart.png'),
        require('../assets/images/footer/order.png'),
        require('../assets/images/footer/me.png')
      ]
    }
  }
}
</script>
