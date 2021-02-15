<template>
  <div>
    <div class="myheader" fixed id="myheader" >
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-navbar v-model="active">
        <mt-tab-item id="1">商品</mt-tab-item>
        <mt-tab-item id="2">详情</mt-tab-item>
        <!-- <mt-tab-item id="3">详情</mt-tab-item> -->
      </mt-navbar>
      <router-link to="/cart" slot="right">
        <mt-button>
          <img src="../assets/images/details/cart1.png" />
        </mt-button>
      </router-link>
    </div>
    <div class="main" id="main">
      <div>
        <img :src="tpic" alt="">
      </div>
      <div class="my_bg pdd">
        <p class="my_price">
          <span class="pre_price"  v-text="`￥${mainText.pre_price}`"></span>
          <!-- <mt-badge type="error" size="small">淘抢购</mt-badge> -->
        </p>
        <div class="text_muted price">
          价格:
          <s>￥{{mainText.price}}</s>
        </div>
        <div  class="title">{{mainText.title}}</div>
        <div class="my_flex text_muted">
          <span>快递：免运费</span>
          <span>月销量{{mainText.sales}}件</span>
          <span>{{mainText.ship_address}}</span>
        </div>
      </div>
      <div class="my_area">
        <!-- 选择口味 -->
        <div class="my_bg my_flex" @click="show_cart('shop_cart')">
          <div >
            <span class="text_muted" style="margin-right:8px;">选择</span>
            <!-- <span>配送至：</span>
            <span>上城区,</span> -->
            <span>请选择口味</span>
          </div>
          <gt></gt>
        </div>
        <!-- 参数信息 -->
        <div class="my_bg my_flex" @click="show_cart('product_basic')" id="please">
          <div class="my_icon">
            <span class="text_muted">参数</span>
            <span>品牌</span>
            <span>系列...</span>
          </div>
          <gt></gt>
        </div>
      </div>
      <p style="text-align:center;" class="text_muted">————详情————</p>
      <div class="intro">
        新鲜日期，多口味混合装
      </div>
      <!-- 图片介绍 -->
      <div class="my-area img_p">
        <img v-for="(ele,i) of bpics" :key="i" :src="ele" alt="">
      </div>
    </div>
    <!-- 底部导航栏 -->
    <div class="footer" fixed>
      <div id="goIndex" class="footer_icon">
        <div v-for="(item,i) of doors" :key="i">
          <div>
            <img :src="item.img" alt="">
          </div>
          <span>{{item.message}}</span>
        </div>
      </div>
      <!--  -->
      <div class="footer_buy" @click="show_cart('shop_cart')">
        <div>加入购物车</div>
        <div @click="goSkip()">立即购买</div>
      </div>
    </div>
    <!-- 底部的购物车选项 -->
    <div id="shop_cart" @click="close_all($event,'shop_cart')">
      <div class="content">
          <div class="cart_header">
            <div>
              <img :src="tpic" alt="">
            </div>
            <div>
              <div>
                <span style="font-size:15px;color:red;">￥{{prices}}</span>
              </div>
              <div>
                <span>库存 {{mainText.stock}}件</span>
              </div>
              <div>
                <span>已选择</span>
                <span>{{taste}}</span>
              </div>
            </div>
            <!-- 关闭按钮 -->
            <div id="close" @click="close_cart('shop_cart')">
              <img src="../assets/images/details/close.png" alt="">
            </div>
          </div>
          <!-- 选择地区 -->
          <!-- <div>
            <div>配送区域：<span>(配送地可能会影响库存)</span></div>
            <div class="my_flex" >
               <div class="my_icon">
                 <img src="../assets/images/details/map.png" alt="">
                 <span>杭州市</span>
                 <span>西湖区</span>
               </div>
               <gt></gt>
            </div>
          </div> -->
          <!-- 口味 -->
          <div>
            <div>口味</div>
            <div class="specs" id="spe" @click="select($event)">
                <a  href="javascript:;" v-text="`【${mainText.spec}】`"></a>
            </div>  
          </div>
          <!-- 购买数量 -->
          <div  class="my_flex">
            <span>购买数量</span>
            <div class="cart_btn" @click="changeCounts($event)">
              <mt-button size="small" type="default">-</mt-button>
              <mt-button size="small" >{{counts}}</mt-button>
              <mt-button size="small"  type="default">+</mt-button>
            </div>
          </div>
          <!--  确定按钮-->
          <div class="cart_confirm" @click="submit()">
              确定
          </div>
      </div>
    </div>
    <!-- 商品的基本信息,包含配料 -->
    <div id="product_basic" @click="close_all($event,'product_basic')">
      <div class="content">
        <div id="close" @click="close_cart('product_basic')">
              <img src="../assets/images/details/close.png" alt="">
        </div>
        <div class="basic">基本信息</div>
        <div class="product">
            <div >
              <p v-for="(item,i) of introduces" :key="i">{{item}}</p>
            </div>
            <div>
              <p v-for="(item,i) of messages" :key="i">{{item}}</p>
            </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<style scoped>
.text_muted {
  color: #999;
}
/* 头部购物车固定 */
.myheader {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.mint-navbar {
  width: 75%;
}
/* 购物车和返回的样式 */
.myheader button,
.myheader button::after {
  box-shadow: 0 0 0 0;
  background-color: #fff;
}
/* 主要内容区域 */
.main {
  margin: 50px 0;
  font-size: 12px;
  font-family: Helvetica, sans-serif;
  /* background-color: #f5f5f5; */
}
/* 每个小模块的样式 */
.my_bg {
  background-color: #ffffff;
  padding: 5px 0;
}
.title{
  font-size:14px;
  line-height: 20px;
}
.pdd{
  padding:0 8px;
}
/* 每张图片占满宽度 */
div img {
  width: 100%;
}
/* 让同一行的文本居中 */
.my_price > span {
  vertical-align: middle;
  margin-right: 8px;
  
  color:red;
  font-size:24px;
  font-weight:bold
}
.my_price {
  font-size: 14px;
  margin: 8px 0 0 0;
}
.price{
  margin:8px 0;
}
/* 每个小模块里面的行与行之间的间距 */
.my_bg > div {
  margin-bottom: 5px;
}
/* 弹性布局，两端没有空隙，中间的等量分开 */
.my_flex {
  display: flex;
  justify-content: space-between;
  padding:5px 8px;
}
/* 优惠信息 */
.my_icon > * {
  margin-right: 8px;
  vertical-align: middle;
}
.my_icon img {
  width: auto;
  max-height: 12px;
}
.my_area {
  margin-bottom: 16px;
}
.intro{
  font-size:15px;
  text-align:center;
  padding:10px 0 20px 0;
}
.img_p:not(:first-child) img{
  margin-top:-3px;
} 
/* 尾部导航栏 */
.footer{
  height:50px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size:13px;
  position:fixed;
  z-index: 100;
  bottom:0;
  width:100%;
  background-color: #fff;
}
.footer img{
  width:22px;
  height:22px;
}
.footer>div{
  display: flex;
  justify-content: space-around;
}
.footer_icon{
  width:40%;
}
.footer_buy{
  width:60%;
}
.footer_buy>div{
  text-align:center;
  color:#fff;
  line-height: 50px;
  height: 50px;
  width:50%;
  font-size:15px;
  background-color:#FF9500;
}
.footer_buy>div:nth-child(2){
  background-color:#FF0036;
}
/* 购物车的样式 */

#shop_cart,#product_basic{
  position:fixed;
  width:100%;
  background-color:rgba(0,0,0,0.5);
  z-index: 999;
  bottom:0;
  height:0px;
  overflow: hidden;
  transition:all .13s linear;
}
.show_cart{
  height:670px !important;
}
.content{
  width:100%;
  height:500px;
  background-color:#fff;
  position: absolute;
  bottom:0;
  padding:10px 25px 10px 10px;
  font-size:12px;
  box-sizing: border-box;
}
/* 这是为了控制购物车每行之间的样式 */
.content>div{
  margin-bottom:10px;
}
.content>div{
  padding:10px 0;
  border-bottom:1px solid rgba(0,0,0,0.1);
  
}
.cart_header>div:first-child{
  width:100px;
  height:100px;
  margin-top:-40px;
}
.cart_header>div{
  float: left;
  margin-right: 8px;
}
.cart_header>div:nth-child(2) span{
  margin-right:8px;
}
.cart_header::after{
  content: "";
  display: block;
  clear: both;
}
/* 购物车关闭按钮的样式 */
#close{
  width:20px;
  height:20px;
  position:absolute;
  top:8px;
  right:15px;
  clear: both;
}
/* 口味 */
.specs{
  display: flex;
  padding:10px 20px;
  flex-wrap: wrap;
}
.specs>a{
  display: block;
  text-decoration: none;
  padding:5px 8px;
  border-radius: 8px;
  border:1px solid transparent;
  background-color: #f5f5f5;
  color:#000;
  margin-bottom:10px;
}
.specs .selected{
  border-color:red;
  color:red;
}
.specs>a:nth-child(even){
  margin-left:8px;
}
.cart_btn button{
  margin:0 2px;
}
.cart_btn button::after{
  background-color: #f5f5f5;
}
.content>.cart_confirm{
  position: absolute;
  bottom:0;
  width:100%;
  text-align:center;
  vertical-align: middle;
  border:0;
  background-color: #FF0036;
  font-size:14px;
  color:#fff;
  margin-left:-10px;
}
/* 商品的基本信息 */
.content .basic{
  font-weight:bold;
  font-size:14px;
  border:0 !important;
  margin:0;
  padding-bottom:0;
}
.product{
  display:flex;
  font-size:13px;
  box-sizing: border-box;
  justify-content: space-between;
}
.product p{
  height:36px;
  margin:0;
  line-height: 36px;
 border-bottom:1px solid rgba(0,0,0,0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product>div:first-child{
  flex-basis: 30%;
}
.product>div:last-child p{
 text-indent:2em;
}
</style>
<script>
// 使用全局小组件
 import gt from "../components/xgj_gt.vue"

export default {
  data() {
    return {
      active: "1",
      scrollTop:"",
      counts:1,//用户购买的商品数量
      taste:"",//用户购买商品的口味，
      lid:3,//本页面商品数据的id
      mainText:{},//存储本页面数据的变量
      introduces:[
        "系列","品牌","食品添加剂","保质期","储藏方法","配料表"
        ,"厂家联系方式","厂址","厂名","产品标准号","生产许可证编号"
        ,"生产日期"
      ],
      messages:[],
      doors:[//底部的分类结构
        {
          message:"首页",
          img:require("../assets/images/details/home.png")
        },
        {
          message:"客服",
          img:require("../assets/images/details/customer.png")
        },
        {
          message:"收藏",
          img:require("../assets/images/details/collect.png")
        }
      ],
      tpic:"",//顶部的一张图片
      bpics:[],//尾部的图片
			user_id:null,
			isCan:false//立即购买的判断条件
    };
  },
 mounted(){
	 this.lid = sessionStorage.getItem("lid");
   this.user_id = sessionStorage.getItem("uid");
  //  console.log(this.user_id);
  //  axios向服务器发送请求，接受响应数据
  this.axios.get("/details?lid="+this.lid).then(res=>{
    this.mainText = res.data.results;
    this.tpic=require("../assets/images/laptop_top_pic/"+res.data.results.tpic);
  });

// 向服务器请求底部的图片
  this.axios.get("/detail?laptop_id="+this.lid).then(res=>{
    var data=res.data.results;
    // console.log(data);
    var j=0;
    // 将服务器中的图片进行排序，放入数组中
    for(var i=0;i<data.length;i++){
      data.forEach(ele=>{
        if(ele.porder==j+1){
          this.bpics.push(require("../assets/images/laptop_pic/"+ele.pic));
        }
      });
      j++;
    }
    // console.log(this.bpics);
  })
   document.documentElement.scrollTop=0;
  // 滚轮事件，控制页面的滚轮，跳转位置
    document.addEventListener("scroll",()=>{
    let target = document.documentElement.scrollTop ;
		// console.log(target);
    if(target>500)this.active="2";
    else this.active="1";
   });
   document.getElementsByClassName("mint-navbar")[0].addEventListener("click",this.jumpDown);
  
//  为参数页面添加点击的事件处理函数
  document.getElementById("please").addEventListener("click",()=>{
    this.axios.get("products_basic?lid="+this.lid).then(res=>{
      var data=res.data;
      data.ldate=this.moment.unix(data.ldate).format("YYYY-MM-DD");
     for(var key in data){
       if(data[key]==null)data[key]="无";
       this.messages.push(data[key]);
     }
     
    });
  });
	// 跳转到首页
	document.getElementById("goIndex").children[0].addEventListener("click",()=>{
		this.$router.push('/');
	});
 },
 methods:{
  //  滚动条的跳转效果
   jumpDown(){
          if(this.active=="2")document.documentElement.scrollTop=600;
          if(this.active=="1")document.documentElement.scrollTop=0;
    },
    // 商品购物车的点击显示效果
   show_cart(ele){
     var cartEle = document.getElementById(ele);
     cartEle.className+=" show_cart";
     document.documentElement.style.overflow="hidden";
   },
  //  商品购物车点击隐藏的效果
   close_cart(ele){
     var cartEle = document.getElementById(ele);
     cartEle.className="";
     document.documentElement.style.overflow="visible";
		 this.isCan=false;
   },
   close_all(event,ele){
     var cartEle = document.getElementById(ele);
     if(event.target===cartEle){
       this.close_cart(ele);
     }
   },
  //  增加或减少用户购买的个数
   changeCounts(event){
     var $this=event.target.innerText;
     if($this=="+"){
       this.counts++;
     }else if($this=="-"){
       if(this.counts>1)this.counts--;
     }
   },
  //  用户选择的口味，规格
   select(event){
     var speEles = document.getElementById("spe").children;
     var $this=event.target;
     if($this.nodeName=="A"&&this.className!="selected")
     {
       for(var i=0;i<speEles.length;i++){
         speEles[i].className="";
       }
      $this.className="selected";
      this.taste=$this.innerText.slice(1,-1);
     }
   },
  // 用户将商品提交到购物车
  submit(){
		if(this.taste==""){
			this.$toast("未选中口味");
    }else if(this.user_id!=null){
        var obj={
        product_id:this.lid,
        counts:this.counts,
        user_id:this.user_id
      }
      this.axios.post("/cart",this.qs.stringify(obj)).then(res=>{
        if(res.data.code==200){
          this.$toast("加入购物车成功");
          if(this.isCan)this.$router.push("/cart");
          this.close_cart("shop_cart");
        }else{
          this.$toast("加入购物车失败");
        }
      });
    }else{
      this.$router.push("/login");
    }
  },
	goSkip(){
		this.isCan=true;
	}
 },

 computed:{
   prices(){
     return (this.mainText.pre_price*this.counts).toFixed(2);
   }
 }
};
</script>
