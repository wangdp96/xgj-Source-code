<template >
  <div id="entry-box">
    <div v-for="(item,index) in entryImageUrls" :key="index" class="entry-item">
      <div class="toSearchpro" @click="goSearchpro(item.family_id)">
        <img :src="item.url" alt="" />
      </div>
      <p>
        {{ item.text }}
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        entryImageUrls: [
          { url: require("../assets/images/entry/cookie.png"),text: "饼干薯片",family_id:1},
          { url: require("../assets/images/entry/latiao.svg"),text: "辣条豆干",family_id:2},
          { url: require("../assets/images/entry/lurou.svg"),text: "肉类卤味",family_id:3},
          { url: require("../assets/images/entry/bread.svg"),text: "面包糕点",family_id:4},
          { url: require( "../assets/images/entry/haitai.svg"),text: "鱼仔海苔",family_id:5},
          { url: require("../assets/images/entry/guogan.svg"),text: "枣类果干",family_id:6},
          { url: require("../assets/images/entry/jianguo.svg"),text: "坚果炒货",family_id:7},
          { url: require("../assets/images/entry/huoguo.svg"),text: "火锅小面",family_id:8},
          { url: require("../assets/images/entry/tang.svg"),text: "糖果果冻",family_id:9},
          { url: require("../assets/images/entry/yinliao.svg"),text: "饮料",family_id:10}
        ]
      }
    },
    methods: {
        goSearchpro(e){
          this.$router.push('/searchpro?id='+e);
        }
        }
    }
  
</script>

<style scoped>
  #entry-box{
    margin: 0 .1875rem;
    font-size: 0;
    margin-bottom: 15px;
  }
  .toSearchpro {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		/* border: 1px solid blue; */
		background: transparent;
	}
    .entry-item{
      overflow: hidden;
      width: 20%;
      margin: .1rem 0 0;
      display: inline-block;
      text-align: center;
    }
     .entry-item div{
        height: 2.45rem;
      }
     .entry-item div img{
        max-width: 100%;
        max-height: 100%;

      }
     .entry-item p{
        font-size: .12rem;
        line-height: 2;
        color: #666;
      }
    
  
</style>
