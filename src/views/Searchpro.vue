<template>
	<div id="app">
		<div class="searchs">
			<router-link to="/searchs">
				<mt-button icon="back"></mt-button>
			</router-link>
			<div class="search">
				<div>
					<img src="../assets/images/search.png">
					<input type="text" placeholder="小主 请搜一搜" autofocus="autofocus" v-model="content">
				</div>
				<button class="sea-btn" @click="searchsBtn">搜索</button>
			</div>
		</div>
		<div id="content"></div>
		<div v-if="seaContent.length != 0">
			<div class="searchPag" v-for="(item,index) in seaContent" :key="index" v-if="iscontent == true">
				<div class="toDetails" @click="goDetails(item.lid)">
					<div class="searchPagImg">
						<img :src="item.pic">
					</div>
					<div class="searchPagcontent">
						<div>
							<p>
								{{item.title}}
							</p>
							<p>
								<span>¥{{item.pre_price}}</span>
								<span>{{item.sales}}人付款</span>
								<span>{{item.freight ==null ? item.freight = '包邮' : item.freight}}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div id="searchContent" v-else>
				<p @click="searbtn($event)" v-for="(item,index) in seaContent" :key="index" v-text="item.series"></p>
			</div>
		</div>
		<div class="noSeaContent" v-else>
			<img src="../assets/images/noSearch.png">
			<p>没有找到商品</p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				content:sessionStorage.getItem("key"),
				seaContent:[],
				autofocus:true,
				iscontent:true
			}
		},
		watch:{
			content(){
				var seriespro = this.content;
				if(this.conent != sessionStorage.getItem("key")){
					this.iscontent = false
				} else if(this.content !=''){
					this.iscontent = false
				} else {
					this.iscontent = true
				}
				if(seriespro != ''){
					this.axios.get('/searchpro?seriespro=' + seriespro).then((res)=>{
						this.seaContent=[];
						if(res.data.series){
							res.data.series.forEach((item)=>{
								if(item.pic != null){
										item.pic = require('../assets/images/laptop_top_pic/' + item.pic);
								}
								this.seaContent.push(item);
								// console.log(this.seaContent);
							});
						}
					});
				} else if(seriespro == ''){
					this.$router.push('/searchs');
				}
			}
		},
		methods:{
			searbtn(event){
				var e = event.currentTarget;
				this.content = e.innerHTML;
				var seriespro = this.content;
				this.axios.get('/searchpro?seriespro=' + seriespro).then((res)=>{
					this.seaContent=[];
					if(res.data.series){
						res.data.series.forEach((item)=>{
						  if(item.pic != null){
						      item.pic = require('../assets/images/laptop_top_pic/' + item.pic);
						  }
						  this.seaContent.push(item);
						});
					}
					this.iscontent = false;
				});
			},
			goDetails(e){
				sessionStorage.setItem("lid",e);
				this.$router.push('/details');
			},
			searchsBtn(){
				this.iscontent = true;
			}
		},
		mounted(){
			this.axios.get('/searchpro?seriespro=' + this.content).then((res)=>{
				if(res.data.series){
					res.data.series.forEach((item)=>{
						if(item.pic != null){
								item.pic = require('../assets/images/laptop_top_pic/' + item.pic);
						};
						this.seaContent.push(item);
					});
				}
			});
			if(!sessionStorage.getItem("key")){
				var data = sessionStorage.getItem("seakey");
				if(JSON.parse(data)){
					JSON.parse(data).forEach((item)=>{
						if(item.pic != null){
								item.pic = require('../assets/images/laptop_top_pic/' + item.pic);
						};
						this.seaContent.push(item);
					});
				}
			}
			sessionStorage.removeItem("seakey");
			sessionStorage.removeItem("key");
			var fid=this.$route.query.id;
			this.axios.get('/searchpros?family_id=' + fid).then((res)=>{
				if(res.data.series){
					res.data.series.forEach((item)=>{
						if(item.pic != null){
								item.pic = require('../assets/images/laptop_top_pic/' + item.pic);
						};
						this.seaContent.push(item);
					});
				}
			});
		}
		
	}
</script>

<style>
	a,button {
		-webkit-tap-highlight-color:transparent;
	}
</style>

<style scoped>
	.noSeaContent {
		width: 100%;
		text-align: center;
		position: fixed;
		top: 40%;
	}
	.noSeaContent>p {
		font-size: 14px;
		color: #797979;
		margin-top: 15px;
	}
	
	#content {
		height: 50px;
		width: 100%;
		background: transparent;
	}
	
	.toDetails {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		/* border: 1px solid blue; */
		background: transparent;
	}
	
	.searchPag {
		width: 92%;
		border-radius: 10px;
		margin: 10px auto;
		background-color: #fff;
		position: relative;
		clear: both;
	}
	.searchPagImg {
		width: 40%;
	}
	.searchPagImg img {
		width: 100%;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}
	.searchPagcontent {
		position: absolute;
		top: 0;
		right: 0;
		width: 60%;
		height: 100%;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		display: inline-block;
	}
	.searchPagcontent div {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.searchPagcontent div p {
		padding: 15px 10px;
	}
	.searchPagcontent div p:last-child span+span {
		margin-left: 10px;
	}
	.searchPagcontent div p:last-child span:nth-child(1) {
		color: red;
		font-size: 16px;
	}
	.searchPagcontent div p:last-child span:nth-child(2),
	.searchPagcontent div p:last-child span:nth-child(3){
		color: #aaaaaa;
		font-size: 12px;
	}
	
	
	.search {
		display: inline-block;
		width: 80%;
		height: 1.5rem;
		border: 1.5px solid #FB7299;
		margin: 8px 5px 8px 0;
		border-radius: 1rem;
	}
	.search div {
		width: 95%;
		display: inline;
	}
	.search input {
		border: 0;
		font-size: 13px;
	}
	.search img {
		margin: 3px;
	}
	.sea-btn {
		width: 4rem;
		height: 1.5rem;
		font-size: 14px;
		font-weight: 500;
		background-color: #FB7299;
		color: #fff;
		border: 0;
		border-radius: 1rem;
		float: right;
	}
	
	
	#searchContent {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 55px;
		left: 0;
		clear: both;
		background-color: #fff;
		z-index: 100;
	}
	#searchContent p {
		width: 90%;
		padding: 8px 5px;
		margin: 5px auto;
		border-bottom: 1px solid #c5c5c5;
		background-color: #fff;
	}
	
	.searchs {
		width: 100%;
		padding: 4px 0;
		position: fixed;
		top: 0;
		background: #f5f5f5;
		clear: both;
		z-index: 999;
		/* position: relative; */
	}
	.searchs>a>button {
		background: transparent;
		box-shadow: 0 0 0 0;
	}
	
</style>


