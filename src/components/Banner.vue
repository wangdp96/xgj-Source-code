<template>
	<mt-swipe :auto="4000" class="swipe">
		<mt-swipe-item v-for="(item,index) in imglist" :key="index">
			<div class="toDetails" @click="goDetails(item.laptop_id)">
				<img :src="item.img">
			</div>
		</mt-swipe-item>
	</mt-swipe>
</template>


<script>
export default {
  data(){
    return{
      imglist:[]
    }
    
  },
  methods: {
    goDetails(e){
				sessionStorage.setItem("lid",e);
				this.$router.push('/details');
			}
  },
  mounted() {
    this.axios.get('/getCarousel').then((res)=>{
        var data = res.data.imglist;
        // console.log(res.data.imglist);
        data.forEach((item)=>{
              if(item.img != null){
                  item.img = require('../assets/images/index/carousel/' + item.img);
              }
              this.imglist.push(item);
            });
      })
  },
}
</script>
<style  scoped>
	.swipe{
		padding-top: 90px;
	}
  .toDetails {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		/* border: 1px solid blue; */
		background: transparent;
	}
  .mint-swipe{
    height:200px;
  }
    .mint-swipe img{
      width:100%;
      height:200px;
    }
    .mint-swipe-indicator{
      opacity:.6;
    }
  
</style>

