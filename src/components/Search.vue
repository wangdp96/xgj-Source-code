<template>
	<div>
		<div id="d1">
			<div class="search">
				<div>
					<img src="../assets/images/search.png">
					<input @focus="search" type="text" placeholder="小主 请搜一搜">
				</div>
				<button class="sea-btn" @click="clickSearch">搜索</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				autofocus:false
			}
		},
		methods:{
			search(){
				this.$router.push('/searchs');
			},
			clickSearch(){
				this.$router.push('/searchs');
			}
		}
	}
</script>

<style scoped>
	#d1{
		position: fixed;
		top: 55px;
		z-index: 999;
		width: 100%;
		background-color: #f9f9f9;
		display: flex;
		justify-content: center;
		padding-bottom: 5px;
	}
	.search {
		width: 90%;
		height: 1.6rem;
		border: 1.5px solid #FB7299;
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
</style>
