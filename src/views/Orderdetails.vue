<template>
  <div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask" v-show="isPay">
      <!-- 二维码 -->
      <div class="erweima">
        <img v-show="alipay_erweima" src="../assets/cart_img/zhifubao.png" alt />
        <img v-show="wechat_erweima" src="../assets/cart_img/weixin.png" alt />
      </div>
      <!-- 支付页面 -->
      <div class="pay_shell">
        <img @click="cha" class="cha" src="../assets/cart_img/cha.png" alt />
        <div v-if="isPayview" class="pay">
          <!-- 选择支付方式 -->
          <div>
            <div class="select_method">选择支付方式:</div>
          </div>
          <!-- 支付宝 -->
          <div class="flex">
            <img src="../assets/cart_img/alipay.png" alt />
            <div class="pay_context_right border_bottom">
              <div class="alipay">支付宝</div>
              <div class="selectCircle" :class="{checked:isalipaySelect}" @click="selectaliMethod"></div>
            </div>
          </div>
          <!-- 微信 -->
          <div class="flex">
            <img src="../assets/cart_img/wechat.png" alt />
            <div class="pay_context_right border_bottom">
              <div class="wechat">微信</div>
              <div
                class="selectCircle"
                :class="{checked:iswechatSelect}"
                @click="selectwechatMethod"
              ></div>
            </div>
          </div>
          <button @click="pay_button" class="pay_button">支&nbsp;付</button>
        </div>
        <div v-else class="pay_view">
          <div class="pay_detail border_bottom">付款详情</div>
          <div class="font_orange pay_view">￥{{amount}}</div>
          <div class="pay_router" @click="pay_router">支付完成</div>
        </div>
      </div>
      <!-- 支付页面 -->
    </div>
    <div class="all">
      <div class="title">
        <router-link to="/cart">
          <img src="../assets/cart_img/order_back.png" alt />
        </router-link>
        <span>确认订单</span>
      </div>
      <div class="details_top">
        <img src="../assets/cart_img/order_logo.png" alt />
        <div class="userinfo">
          <div class="userinfo_first">
            <span>{{receiver_info.receiver}}</span>
            <span>{{receiver_info.phone}}</span>
          </div>
          <div class="userinfo_second">{{this.receiver_info.totaladdress}}</div>
          <div class="userinfo_third">收货不便时，可选择暂存服务</div>
        </div>
      </div>
      <!-- <div class="xgj_title">小公举零食店</div> -->
      <div v-for="(item,index) in goods" :key="index" class="details_main">
        <!-- table -->
        <table></table>

        <div class="details_main_content">
          <img :src="item.pic" alt />
          <div>
            <div class="main_content_first">
              <div>{{item.title}}</div>
              <div class="main_content_first_pre_price">
                <div class="float_right">￥{{item.pre_price}}</div>
                <div class="float_right">x{{item.count}}</div>
              </div>
            </div>
            <div class="welfare">
              <!-- <span>信用购</span> -->
              <span>七天无理由退换</span>
            </div>
          </div>
        </div>
        <div class="goods_selection">
          <!-- <div>
            <span class="goods_selection_title">公益零食</span>
            <span class="font_gray subtitle_part_margin">成交后卖家将捐赠0.02元给公益零食计划</span>
          </div> -->
          <div>
            <span class="goods_selection_title">配送方式</span>
            <span class="font_gray subtitle_part_margin">普通配送</span>
            <span class="float_right">
              <span>快递</span>
              <span>免邮</span>
            </span>
          </div>
          <!-- <div>
            <span>
              <img src="../assets/cart_img/query.png" alt />
              <span class="goods_selection_title">运费险</span>
            </span>
            <span class="font_gray subtitle_part_margin">退换货可赔付11元</span>
            <span>
              <span class="float_right">￥0.35</span>
              <span class="tick"></span>
            </span>
          </div> -->
          <!-- <div>
          <span class="goods_selection_title">开具发票</span>
          <span class="font_gray subtitle_part_margin">本次不开具发票</span>
          </div>-->
          <div>
            <span class="goods_selection_title">订单备注</span>
            <input class="subtitle_part_margin" type="text" placeholder="选填,请先和商家协商一致" />
          </div>
          <div>
            <div class="float_right subtotal">
              <span class="font_gray mr-1">共{{item.count}}件</span>
              <span class="mr-1">小计:</span>
              <span class="font_orange">￥{{Math.round(item.pre_price * item.count * 100) / 100}}</span>
            </div>
            <!-- 解决高度坍塌 -->
            <div class="solve_float_problem"></div>
          </div>
        </div>
      </div>
      <div class="total">
        <div class="float_right">
          <span class="font_gray mr-1">共{{goods_amount}}件,</span>
          <span class="mr-1">合计:</span>
          <span class="font_orange mr-1">￥{{amount}}</span>
          <button @click="submit_btn" class="submit_btn">支付</button>
        </div>
        <!-- 解决高度坍塌 -->
        <div class="solve_float_problem"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 去掉input默认样式 */
input {
  border: 0;
  outline: none;
}
/* 总体字体 */
.all {
  font: 13px "微软雅黑";
}
/* 小公举标题 */
/* .xgj_title {
  margin: 8px 0 0 15px;
  font: 1000 16px "幼圆";
  color:purple;
} */
/* 确认订单 */
.title {
  width: 100%;
  height: 37px;
  background: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
}
.title span {
  font: 21px "微软雅黑";
  margin-left: 111px;
}
/* 用户信息 */
.details_top {
  width: 95%;
  height: 120px;
  display: flex;
  background: #fff;
  /* 微调 */
  margin: 49px auto 0;
  /* 微调结束 */
  /* 边框圆角 */
  border-radius: 10px;
}
/* logo */
.details_top img {
  width: 48px;
  height: 41px;
  /* 微调距离 */
  margin: 28px 12px 0 10px;
}
/* 第一行字体 */
.userinfo_first {
  margin-top: 5px;
}
.userinfo_first span:first-child {
  font: 600 18px "微软雅黑";
}
.userinfo_first span:last-child {
  font: 15px "微软雅黑";
  color: #888;
  margin-left: 8px;
}
/* 第二行字体 */
.userinfo_second {
  font: 13px "微软雅黑";
  margin-top: 6px;
}
/* 第三行字体 */
.userinfo_third {
  margin-top: 5px;
  color: #ff3300;
  font: 13px "微软雅黑";
}

/* 订单主体 */
.details_main {
  width: 95%;

  background: #fff;
  /* 距离微调 */
  margin: 12px auto 35px;
}
/* 订单主体内容上部 */
.details_main_content {
  margin-top: 15px;
  display: flex;
}

/* 订单主体字体浮动 */
.float_right {
  float: right;
}
/* 订单主体图片 */
.details_main_content img {
  width: 75px;
  height: 75px;
  padding: 0 10px;
}

/* 订单主体第一行 */
.main_content_first {
  display: flex;
  /* 距离微调 */
  margin: 5px 15px 0 0;
}

/* 订单主体第二行 */
.welfare {
  font: 11px "微软雅黑";
  color: #ff3300;
  margin-top: 15px;
}

.welfare span:first-child {
  margin-right: 10px;
}
/* 订单主体选项卡 */
.goods_selection {
  margin: 15px 3px 0 14px;
}

.goods_selection > div {
  margin: 0 auto;
}
.goods_selection > div + div {
  margin-top: 18px;
}
.subtitle_part_margin {
  margin-left: 15px;
}

/* 订单选项卡小标签 */
.goods_selection_title {
  font: 16px "微软雅黑";
}
/* 订单选项卡小标签灰色字符 */
.font_gray {
  color: #7d7d7d;
}
/* 小计 */
.subtotal {
  padding-bottom: 20px;
}
/* 合计 */
.total {
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 95%;
  margin: 0 auto !important;
  z-index: 1;
	padding: 10px 0;
}
/* 提交订单按钮 */
.submit_btn {
  border: 0;
  outline: none;
  border-radius: 25px;

  background: linear-gradient(to right, #e26411, #ff4500);
  /* 字体 */
  color: #fff;
  /* 微调按钮 */
  padding: 8px 15px;
  margin-left: 5px;
}
/* 橙色字符 */
.font_orange {
  color: #ff3300;
}
/* 小右边距 */
.mr-1 {
  margin-right: 3px;
}

/* 解决高度坍塌 */
.solve_float_problem {
  clear: both;
}

/* 支付 */
/* 支付外壳 */

.pay_shell {
  background: #fff;
  width: 100%;
  position: absolute;
  z-index: 999;
  left: 0;
  bottom: 0;
  padding: 20px 0 12px 0;
}
.pay {
  width: 80%;
  margin: 0 auto;
}
/* cha */
.cha {
  position: absolute;
  width: 28px;
  height: 28px;
  top: 12px;
  right: 8px;
}
/* 选择支付方式 */
.select_method {
  /* 字体 */
  font: 20px "微软雅黑";
  /* 字体布局 */
  text-align: left;
  /* 微调 */
  margin-bottom: 15px;
}

.pay > div + div {
  margin-top: 10px;
}

/* 支付选择 */
.selectCircle {
  width: 16px;
  height: 16px;
  border: 1px solid gray;
  border-radius: 50%;
  margin: auto 0px auto 10px;
}
/* 选择哪种支付方式 */
.checked {
  background: url("../assets/cart_img/tick4.png");

  border: 1px solid rgba(0, 0, 0, 0);
}
/* 遮罩层 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
}
/* 下划线 */
.border_bottom {
  border-bottom: 1px solid #ccc;
}
/* 支付按钮 */
.pay_button {
  border: 0;
  outline: 0;
  border-radius: 25px;
  background: linear-gradient(to right, #ff9900, #ffcc00);
  color: #fff;
  padding: 10px 80px;
  margin: 8px 0 0 58px;
}
/* 二维码 */
.erweima > img {
  position: absolute;
  top: 20%;
  left: 16%;
  width: 250px;
  height: 250px;
}
/* 付款详情 */
.pay_detail {
  text-align: center;
  /* 字体 */
  font: 20px "微软雅黑";
  /* 微调 */
  padding-bottom: 8px;
}
/* 支付金额 */
.pay_view {
  text-align: center;
  font: 25px "微软雅黑";
  /* 微调 */
  padding: 10px 0 0;
}
/* 支付跳转文字 */
.pay_router{
  padding:8px 8px 20px;
  font:18px "微软雅黑";
}
/* flex */
.flex {
  display: flex;
  justify-content: space-between;
}
.pay_context_right {
  display: flex;
  align-items: center;
  /* 字体 */
  font: 20px "微软雅黑";
}
.alipay {
  margin-right: 148px;
}
.wechat {
  margin-right: 168px;
}
.flex_1 {
  flex: 1;
}
.flex_3 {
  flex: 3;
}
.flex_2 {
  flex: 2;
}
</style>

<script>
export default {
  methods: {
    // 控制wechat是否选中
    selectwechatMethod() {
      this.iswechatSelect = !this.iswechatSelect;
      this.isalipaySelect = false;
    },
    // 控制alipay是否选中
    selectaliMethod() {
      this.isalipaySelect = !this.isalipaySelect;
      this.iswechatSelect = false;
    },
    // 提交订单，点提交时使支付页面显示
    submit_btn() {
      this.isPay = true;
    },
    // 关闭支付页面，初始化控制变量
    cha() {
      // 支付界面消失
      this.isPay = false;
      // 选中状态全置为未选中
      this.isalipaySelect = false;
      this.iswechatSelect = false;
      // 二维码全置为未选中
      this.wechat_erweima = false;
      this.alipay_erweima = false;
      // 支付详情界面消失
      this.isPayview = true;
    },
    //支付
    pay_button() {
      // 支付宝
      if (this.isalipaySelect) {
        // 点支付，显示支付宝二维码，关闭微信二维码
        this.alipay_erweima = true;
        this.wechat_erweima = false;
              // 支付详情界面出现
      this.isPayview = false;
        setTimeout(() => {
          this.pay_router()
        }, 10000);
        // 微信
      } else if (this.iswechatSelect) {
        // 点支付，显示微信二维码，关闭支付宝二维码
        this.alipay_erweima = false;
        this.wechat_erweima = true;
              // 支付详情界面出现
      this.isPayview = false;
        setTimeout(() => {
          this.pay_router()
        }, 10000);
      }

    },
    // 支付跳转
    pay_router(){
        // 删除购物车表中已购买的商品
        this.goods.forEach(item => {
          var del_obj = {
            del_uid: this.$store.state.userinfo.uid,
            del_iid:item.iid
          };
          this.axios.post("/delcartgoods",this.qs.stringify(del_obj));
        });
        // 将确认订单页商品清空
        this.goods=[];
        var status = {
          status: 2
        };
        this.axios.post("/setOrderStatus",this.qs.stringify(status));
        this.$router.push('/cart');
        window.location.reload();
    }
  },
  computed: {
    // 计算所选商品总价
    amount() {
      var total = 0;
      this.goods.forEach(item => {
        total += item.pre_price * item.count;
        total = Math.round(total * 100) / 100;
      });
      return total;
    },
    // 计算商品总数量
    goods_amount() {
      var counts = 0;
      this.goods.forEach(item => {
        counts += item.count;
        counts = Math.round(counts * 100) / 100;
      });
      return counts;
    }
  },
  data() {
    return {
      // 商品列表
      goods: [],
      // 收件人信息
      receiver_info: [],
      // 是否显示支付页面
      isPay: false,
      // 是否选中
      iswechatSelect: false,
      isalipaySelect: false,
      // 是否显示二维码
      alipay_erweima: false,
      wechat_erweima: false,
      // 是否显示选择支付界面
      isPayview: true
    };
  },
  // beforeCreate() {
  //   document
  //     .querySelector("body")
  //     .setAttribute("style", "background-color:#f5f5f5");
  // },
  Destroyed() {
    document.querySelector("body").removeAttribute("style");
  },
  mounted() {
    // 在vuex里取该用户的uid
    var uid = this.$store.state.userinfo.uid;
    // 从数据库里拿该用户的收件人信息
    this.axios.get("/getReceiver?uid=" + uid).then(res => {
      this.receiver_info = res.data[0];
      this.receiver_info.totaladdress = `${this.receiver_info.province}${this.receiver_info.city}${this.receiver_info.county}${this.receiver_info.address}`;
    });
    if(this.$route.query.orderId){
      var orderId = this.$route.query.orderId;
      this.axios.get("/getOrderGoods?orderId=" + orderId).then(res => {
        console.log(res)
      })
    }
    // 在vuex里取购物车中的用户选中的商品iid列表
    var shoppingList = this.$store.state.iid;
    // 遍历列表,从数据库中拿shoppingList中的商品信息
    shoppingList.forEach(item => {
      this.axios.get("/getGoodsinfo?iid=" + item).then(res => {
        res.data[0].pic = require(`../assets/images/laptop_top_pic/${res.data[0].pic}`);
        this.goods.push(res.data[0]);
      });
    });
  }
};
</script>