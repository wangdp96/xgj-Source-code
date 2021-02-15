<template>
  <div class="goods" infinite-scroll-distance="10" infinite-scroll-disabled="busy" infinite-scroll-immediate-check="true">
		<div class="d1">
			<h4 class="h">{{category[0]}}</h4>
			<div class="d3">
				<div class="d2" v-for="(item,index) in products[0]" :key="index+'a'">
					<div class="toDetails" @click="goDetails(item.laptop_id)">
						<div >
							<img :src="item.pic" class="item_img">
						</div>
						<div class="name">{{item.title}}</div>
						<div class="d2_price">
							<span class="price">￥{{item.price}}</span>
							<img src="../assets/images/index/buyNow.svg" class="shop_img">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="d1">
			<h4 class="h">{{category[1]}}</h4>
			<div class="d3">
				<div class="d2" v-for="(item,index) in products[1]" :key="index+'b'">
					<div class="toDetails" @click="goDetails(item.laptop_id)">
						<div >
							<img :src="item.pic" class="item_img">
						</div>
						<div class="name">{{item.title}}</div>
						<div class="d2_price">
							<span class="price">￥{{item.price}}</span>
							<img src="../assets/images/index/buyNow.svg" class="shop_img">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="d1">
			<h4 class="h">{{category[2]}}</h4>
			<div class="d3">
				<div class="d2" v-for="(item,index) in products[2]" :key="index+'c'">
					<div class="toDetails" @click="goDetails(item.laptop_id)">
						<div>
							<img :src="item.pic" class="item_img">
						</div>
						<div class="name">{{item.title}}</div>
						<div class="d2_price">
							<span class="price">￥{{item.price}}</span>
							<img src="../assets/images/index/buyNow.svg" class="shop_img">
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
export default {
	data () {
		return {
			category:[],
			products:[],
			category:[
				'热门推荐',
				'新品上架',
				'人气排行'
			],
			busy:false,
		}
	},
	methods: {
		goDetails(e){
			sessionStorage.setItem("lid",e);
			this.$router.push('/details');
		}
	},
	mounted(){
		for(var i=1;i<this.category.length+1;i++)
			this.axios.get('/getProducts?category=' + i).then(res=>{
				var data = res.data.products;
				data.forEach(item=>{
							item.pic = require('../assets/images/index/' + item.pic);
				});
				this.products.push(data);
			});
		}
	} 
</script>

<style scoped>
	
	.d3 {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: auto;
		padding-bottom: 5px;
	}

	.goods>.d1+.d1 {
		margin-top: 20px;
	}
	
	.goods>.d1:last-child {
		margin-bottom: 55px;
	}

	.clearfix{
		clear:both
	}
	.goods{
		background-color:#f6f6f6;
		margin-bottom: 30px;
	}
			
	h4:before{
		content:"";
		display:inline-block;
		margin-right:6px;
		width:4px;
		height:12px;
		background-color:#e8380d;
	}
			
	.item_img{
		margin:5px 0;
		width:100%;
	}
	.shop_img{
		flex: 2;
		height: 20px;
	}
	.d2_price{
		 margin: 3px 0;
		 display: flex;
		 justify-content: space-around;
		 align-items: center;
		 width: 100%;
	 }

	.price{
		/* padding-left:10px; */
		font-size:18px;
		color:#e8380d;
		flex: 1.5;
		text-align: center;
	}
	.name{
		font-size: 14px;
		margin: 3px 0;
	}
	.d1{
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.h{
		width: 100%;
		padding: 5px 0;
	}
	.d2{
		width: 46%;
		margin-top: 9px;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 0 5px #9d9d9d;
	}

	.toDetails {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
</style>

