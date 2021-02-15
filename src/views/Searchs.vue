<template>
	<div id="app">
		<div class="searchs">
			<div class="search">
				<div>
					<img src="../assets/images/search.png">
					<input type="text" placeholder="小主 请搜一搜" autofocus="autofocus" v-model="content">
				</div>
				<button class="sea-btn" @click="searchsBtn">搜索</button>
			</div>
			<button @click="prev">取消</button>
		</div>
		<div class="searchPag">
			<p class="hot">热门推荐</p>
			<div class="pagborder">
				<button @click="searbtn($event)" class="sea-pag" v-for="(item,index) in pag" :key="index" v-text="item"></button>
			</div>
		</div>
		<div id="searchContent" v-show="content != ''">
			<p @click="searbtn($event)" v-for="(item,index) in seaContent" :key="index" v-text="item.series"></p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				pag:[
					'辣条',
					'大刀肉',
					'薯片',
					'小面包',
					'饼干',
					'儿时零食',
					'肉枣',
					'炒货',
					'糕点'
				],
				content:'',
				seaContent:[],
				autofocus:true
			}
		},
		watch:{
			content(){
				var series = this.content;
				// console.log(series);
				if(series != ''){
					this.axios.get('/searchs?series=' + series).then((res)=>{
					    //将WEB服务器返回的文章分类信息存储到Vue的变量中
					    this.seaContent = res.data.series;
							// console.log(this.seaContent);
					});
				}
			}
		},
		methods:{
			searbtn(event){
				var e = event.currentTarget;
				this.content = e.innerHTML;
				sessionStorage.setItem("key",this.content);
				// console.log(this.content);
				this.$router.push('/searchpro');
			},
			prev(){
				this.$router.push('/');
			},
			searchsBtn(){
				sessionStorage.setItem("seakey",JSON.stringify(this.seaContent));
				this.$router.push('/searchpro');
			}
		}
	}
</script>

<style>
	a,button {
		-webkit-tap-highlight-color:transparent;
	}
	input {
		background: transparent;
	}
</style>

<style scoped>
	.search {
		width: 90%;
		height: 1.6rem;
		border: 1.6px solid #FB7299;
		margin: 8px auto;
		border-radius: 0.8rem;
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
		height: 1.6rem;
		font-size: 14px;
		font-weight: 500;
		background-color: #FB7299;
		color: #fff;
		border: 0;
		border-radius: 0.8rem;
		float: right;
	}
	
	
	#searchContent {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 55px;
		left: 0;
		background-color: #f5f5f5;
		z-index: 999;
	}
	#searchContent p {
		width: 90%;
		padding: 8px 5px;
		margin: 5px auto;
		border-bottom: 1px solid #c5c5c5;
		background-color: #f5f5f5;
	}
	.hot {
		font-size: 16px;
		font-weight: 500;
		padding: 25px 0 0 20px;
	}
	.searchPag {
		width: 92%;
		height: 8rem;
		border-radius: 20px;
		margin: 20px auto;
		background-color: #fff;
		position: relative;
		box-shadow: 0 0 3px #9d9d9d;
	}
	.searchs {
		width: 86%;
		padding-top: 5px;
		position: relative;
	}
	.searchs>button {
		background-color: transparent;
		border: 0;
		position: absolute;
		right: -40px;
		top: 15px;
		color:#ff5500;
	}
	.pagborder {
		padding: 10px 15px;
	}
	.sea-pag {
		font-size: 14px;
		background-color: #dcdcdc;
		color: #000;
		border: 0;
		border-radius: 1rem;
		padding: 3px 10px;
		margin: 3px 3px;
	}
</style>
