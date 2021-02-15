<template>
  <!-- relative -->
  <div id="scrollDiv" class="rela">
    <!-- 购物车标题-->
    <div class="cart">
      <div class="cart_title">
        <div>购物车</div>
        <div @click="manage">{{ismanage == true ? manage_font ="完成":manage_font="管理"}}</div>
      </div>
      <!-- 购物车标题 end-->
      <!-- 购物车总数 -->
      <div class="details overflow">
        <span>共{{shoppingList.length}}件宝贝</span>
        <span>收货地址：{{this.receiver_info.totaladdress}}</span>
      </div>
    </div>
    <div class="cart_title_replace" v-show="isShow">
      <img src="../assets/cart_img/cart_title_logo.png" alt />
      <span class="cart_title_replace_font">购物车({{shoppingList.length}})</span>
      <span @click="manage">{{ismanage == true ? manage_font ="完成":manage_font="管理"}}</span>
    </div>
    <!-- 购物车主体-->
    <div class="shoppingMain">
      <div class="shoppingItem" v-for="(item,index) in shoppingList" :key="index">
        <div
          class="selectCircle"
          :class="{checked:item.isSelect}"
          @click="selectGoods(item,index)"
        ></div>
        <div class="shoppingImg">
          <img :src="item.pic" alt />
        </div>
        <div class="itemRight">
          <p class="title">{{item.title}}</p>
          <div class="numAndMoney">
						<p>￥{{item.pre_price}}</p>
            <div class="numberControl">
              <a class="btn1" @click="numDel(item,index)">-</a>
              <input type="text" v-model="item.count" readonly="readonly" />
              <a class="btn2" @click="numAdd(item,index)">+</a>
            </div>
          </div>
          <p class="goodSeries">{{item.series}}</p>
        </div>
      </div>
    </div>
    <div class="bottomMain">
      <!--底部固定栏-->
      <div class="little_flex_left">
        <div class="selectCircle" :class="{checked:allSelect}" @click="allGoodsSelect"></div>
        <span style="padding: 10px">全选</span>
      </div>
      <button v-if="ismanage" class="bottombtn2" @click="delGoods">删除</button>
      <div v-else class="little_flex_right">
        <div class="total_sum">
          <span>合计:&nbsp;&nbsp;</span>
          <span>￥{{sum}}</span>
        </div>
        <button class="bottombtn1" @click="buyGoods">提交订单({{manageNum}})</button>
      </div>
    </div>
    <myfooter :selected="selected" :icons="icons"></myfooter>
  </div>
  <!-- relative end-->
</template>
<script>
export default {
  data() {
    return {
      selected: "cart",
      icons: [
        require("../assets/images/footer/home.png"),
        require("../assets/images/footer/cart_c.png"),
        require("../assets/images/footer/order.png"),
        require("../assets/images/footer/me.png")
      ],
      shoppingList: [],
      allSelect: false,
      sum: 0,
      ismanage: false,
      // 结算商品数量
      manageNum: 0,
      // 管理&完成
      manage_font: "",
      // toast_cancelDelay
      toast_limit: 1,
      // 滚轮下滑实现购物车顶部消失出现固定购物车
      isShow: 0,
      receiver_info: [],
      // 存选中商品的data-select数组
      dataSelect: [],
      // 用户地址id
      address_id: "",
      // 判断是否跳转到address
      isPushaddress:[]
    };
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f5f5f5");
  },
  // beforeDestroy() {
  //   document.querySelector("body").removeAttribute("style");
  // },
  methods: {
    handleScroll() {
      var top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top >= 66) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    //   管理
    manage() {
      this.ismanage = !this.ismanage;
    },
    selectGoods(item, index) {
      //商品选择方法
      // console.log(e.target.dataset.select);
      item.isSelect = !item.isSelect; //改变选择状态
      // item.isnotSelect = !item.isnotSelect;
      if (item.isSelect == true) {
        this.dataSelect[index] = 1;
      } else {
        this.dataSelect[index] = 0;
      }
      this.allSelect = false;
      if (item.isSelect == true) {
        this.sum = this.sum + item.pre_price * item.count;
        this.sum = Math.round(this.sum * 100) / 100;
        this.manageNum = this.manageNum + 1;
      } else {
        this.sum = this.sum - item.pre_price * item.count;
        this.sum = Math.round(this.sum * 100) / 100;
        this.manageNum = this.manageNum - 1;
      } 
			// 实现选择所有商品，全选按钮也置为选中
			if (this.Arrsum(this.dataSelect) == this.shoppingList.length) {
			  this.allSelect = true;
			}
    },

    allGoodsSelect() {
      //全选商品方法
      this.allSelect = !this.allSelect; //改变选择状态
      if (this.allSelect == true) {
        this.sum = 0;
        for (var i = 0; i < this.shoppingList.length; i++) {
          this.shoppingList[i].isSelect = true;
          this.sum =
            this.sum + this.shoppingList[i].pre_price * this.shoppingList[i].count;
          // 结算商品的数量
          this.manageNum = this.manageNum + 1;
          // selectgoods数组全设为1
          this.dataSelect = new Array(this.shoppingList.length).fill(1);
        }
        this.sum = Math.round(this.sum * 100) / 100;
      } else {
        for (var i = 0; i < this.shoppingList.length; i++) {
          this.shoppingList[i].isSelect = false;
          this.sum =
            this.sum - this.shoppingList[i].pre_price * this.shoppingList[i].count;
        }
        this.sum = Math.round(this.sum * 100) / 100;
        // 结算商品的数量
        this.manageNum = 0;
        // selectgoods数组全设为0
        this.dataSelect = new Array(this.shoppingList.length).fill(0);
      }
    },
    numAdd(item) {
      //商品数量增加
      item.count++;
      var obj = {
        count: item.count,
        iid: item.iid
      };
      this.axios.post("/count", this.qs.stringify(obj));
      if (item.isSelect == true) {
        this.sum = Math.round((this.sum + item.pre_price) * 100) / 100;
      }
    },
    numDel(item) {
      //商品数量减少
      if (item.count > 1) {
        item.count--;
        var obj = {
          count: item.count,
          iid: item.iid
        };

        this.axios.post("/count", this.qs.stringify(obj));

        if (item.isSelect == true) {
          //已选择商品减少数量，需要减少总额
          this.sum = Math.round((this.sum - item.pre_price) * 100) / 100;
        }
      }
    },
    buyGoods() {
      // 判断哪几个商品被选中
      var shoppingList = this.shoppingList;
      this.$store.commit("dropiid");
      var count = 1;
      // 生成订单编号
      var order_number = Date.parse(new Date()) + '' + Math.ceil(Math.random() * 1000000);
      var order_time = Date.parse(new Date());
      var order_obj = {
        address_id: this.address_id,
        uid: this.$store.state.userinfo.uid,
        order_id:order_number,
        order_time:order_time,
        status:1
      };
      // 传order数据表
      this.axios.post("/postOrder", this.qs.stringify(order_obj));
			
      shoppingList.forEach((item, index) => {
        if (item.isSelect == true) {
          count++;
          this.$store.commit("addCart", item);
                   //post订单信息
          // 根据order数据表传order_detail表数据
          var order_detail_obj = {
            order_id:order_number,
            count:item.count,
            lid:item.lid
          };
          this.axios.post("/postOrderdetail",this.qs.stringify(order_detail_obj));
        }
        if (index == shoppingList.length - 1) {
          if (count == 1) {
            if (this.toast_limit == 1) {
              this.toast_limit += 1;
              this.$toast({
                message: "亲亲先选择哦",
                position: "middle",
                duration: 3000
              });
              setTimeout(() => {
                this.toast_limit = 1;
              }, 3000);
            }
          } else if (count > 1) {
            this.$router.push("/orderdetails");
          }
        }
      });
      if(this.isPushaddres == undefined){
        this.$router.push('/address')
      }
    },
    // delGoods() {
    //   //全选商品后进行全部删除
    //   if (this.allSelect) {
    //     this.$messagebox
    //       .confirm("是否要删除该商品", "删除")
    //       .then(action => {
    //         if (action == "confirm") {
    //           var delallgoods = this.shoppingList.splice(
    //             0,
    //             this.shoppingList.length
    //           );
    //           var delall_uid = delallgoods[0].user_id;
    //           var obj = { delall_uid: delall_uid };
    //           this.axios
    //             .post("/delcartallgoods", this.qs.stringify(obj))
    //             .then(res => {
    //               if (this.toast_limit == 1) {
    //                 this.toast_limit += 1;
    //                 this.$toast({
    //                   message: "删除成功",
    //                   position: "middle"
    //                 });
    //                 setTimeout(() => {
    //                   this.toast_limit = 1;
    //                 }, 3000);
    //               }
    //             });
    //           this.allSelect = false;
    //           this.sum = 0;
    //           this.manageNum = 0;
    //         }
    //       })
    //       .catch(() => {
    //         this.$toast("操作取消");
    //       });
    //   }else {
    //     for (var i = 0; i < this.shoppingList.length; i++) {
    //       if (this.shoppingList[i].isnotSelect == true) {
    //         for (var j = i + 1; j < this.shoppingList.length; j++) {
    //           if (this.shoppingList[j].isnotSelect == false) {
    //             this.$messagebox
    //               .confirm("是否要删除该商品", "删除")
    //               .then(action => {
    //                 if (action == "confirm") {
    //                   this.sum = 0; //所选商品被删除，总额置0

    //                   for (var k = j; k < this.shoppingList.length; k++) {
    //                     if (this.shoppingList[k].isSelect) {
    //                       var delgoods = this.shoppingList.splice(k, 1);
    //                       var del_uid = delgoods[0].user_id;
    //                       var del_iid = delgoods[0].iid;
    //                       var obj = {
    //                         del_uid: del_uid,
    //                         del_iid: del_iid
    //                       };
    //                       this.manageNum -= 1;
    //                       this.axios
    //                         .post("/delcartgoods", this.qs.stringify(obj))
    //                         .then(res => {
    //                           if (this.toast_limit == 1) {
    //                             this.toast_limit += 1;
    //                             this.$toast({
    //                               message: "删除成功",
    //                               position: "middle",
    //                               duration: 3000
    //                             });
    //                             setTimeout(() => {
    //                               this.toast_limit = 1;
    //                             }, 3000);
    //                           }
    //                         });
    //                       k--;
    //                     }
    //                   }
    //                 }
    //               })
    //               .catch(() => {
    //                 this.$toast("操作取消");
    //               });

    //             break;
    //           } else if (j == this.shoppingList.length - 1) {
    //             if (this.toast_limit == 1) {
    //               this.toast_limit += 1;
    //               this.$toast({
    //                 message: "请选择要删除的商品",
    //                 position: "middle"
    //               });
    //               setTimeout(() => {
    //                 this.toast_limit = 1;
    //               }, 3000);
    //             }
    //             break;
    //           }
    //         }
    //         // 解决只有一个商品时点删除但未选中的状态
    //         if (this.shoppingList.length == 1) {
    //           if (this.toast_limit == 1) {
    //             this.toast_limit += 1;
    //             this.$toast({
    //               message: "请选择要删除的商品",
    //               position: "middle"
    //             });
    //             setTimeout(() => {
    //               this.toast_limit = 1;
    //             }, 3000);
    //           }
    //         }
    //         break;
    //       } else {
    //         this.$messagebox
    //           .confirm("是否要删除该商品", "删除")
    //           .then(action => {
    //             if (action == "confirm") {
    //               this.sum = 0; //所选商品被删除，总额置0

    //               for (var i = 0; i < this.shoppingList.length; i++) {
    //                 if (this.shoppingList[i].isSelect) {
    //                   var delgoods = this.shoppingList.splice(i, 1);
    //                   var del_uid = delgoods[0].user_id;
    //                   var del_iid = delgoods[0].iid;
    //                   var obj = {
    //                     del_uid: del_uid,
    //                     del_iid: del_iid
    //                   };
    //                   this.manageNum -= 1;
    //                   this.axios
    //                     .post("/delcartgoods", this.qs.stringify(obj))
    //                     .then(res => {
    //                       if (this.toast_limit == 1) {
    //                         this.toast_limit += 1;
    //                         this.$toast({
    //                           message: "删除成功",
    //                           position: "middle"
    //                         });
    //                         setTimeout(() => {
    //                           this.toast_limit = 1;
    //                         }, 3000);
    //                       }
    //                     });
    //                   i--;
    //                 }
    //               }
    //             }
    //           })
    //           .catch(() => {
    //             this.$toast("操作取消");
    //           });
    //         break;
    //       }
    //     }
    //   }
    // },
    // 数组求和
    Arrsum(arr) {
      return eval(arr.join("+"));
    },
    delGoods() {
      var dataSelect = this.dataSelect;
      if (!this.Arrsum(dataSelect)) {
        if (this.toast_limit == 1) {
          this.toast_limit += 1;
          this.$toast({
            message: "请选择要删除的商品",
            position: "middle"
          });
          setTimeout(() => {
            this.toast_limit = 1;
          }, 3000);
        }
      } else if (this.allSelect) {
        this.$messagebox
          .confirm("是否要删除该商品", "删除")
          .then(action => {
            if (action == "confirm") {
              var delallgoods = this.shoppingList.splice(
                0,
                this.shoppingList.length
              );
              var delall_uid = delallgoods[0].user_id;
              var obj = { delall_uid: delall_uid };
              this.axios
                .post("/delcartallgoods", this.qs.stringify(obj))
                .then(res => {
                  if (this.toast_limit == 1) {
                    this.toast_limit += 1;
                    this.$toast({
                      message: "删除成功",
                      position: "middle"
                    });
                    setTimeout(() => {
                      this.toast_limit = 1;
                    }, 3000);
                  }
                });
              this.allSelect = false;
              this.sum = 0;
              this.manageNum = 0;
            }
          })
          .catch(() => {
            this.$toast("操作取消");
          });
      } else {
        this.$messagebox
          .confirm("是否要删除该商品", "删除")
          .then(action => {
            if (action == "confirm") {
              this.sum = 0; //所选商品被删除，总额置0

              for (var i = 0; i < this.shoppingList.length; i++) {
                if (this.shoppingList[i].isSelect) {
                  var delgoods = this.shoppingList.splice(i, 1);
                  var del_uid = delgoods[0].user_id;
                  var del_iid = delgoods[0].iid;
                  var obj = {
                    del_uid: del_uid,
                    del_iid: del_iid
                  };
                  this.manageNum -= 1;
                  this.axios
                    .post("/delcartgoods", this.qs.stringify(obj))
                    .then(res => {
                      if (this.toast_limit == 1) {
                        this.toast_limit += 1;
                        this.$toast({
                          message: "删除成功",
                          position: "middle"
                        });
                        setTimeout(() => {
                          this.toast_limit = 1;
                        }, 3000);
                      }
                    });
                  i--;
                }
              }
            }
          })
          .catch(() => {
            this.$toast("操作取消");
          });
      }
    }
  },
 mounted() {
     // 获取用户购物车商品信息列表
     var userid = JSON.parse(sessionStorage.getItem("uid"));
     var obj = { userid: userid };
     this.axios.post("/listbyuserid", this.qs.stringify(obj)).then(res => {
       var data = res.data.info;
       if (data != null) {
         data.forEach(item => {
           if (item.pic != null) {
             item.pic = require(`../assets/images/laptop_top_pic/${item.pic}`);
           }
           // 将dataSelect数组中的所有商品的select值置为false
           this.dataSelect = new Array(data.length).fill(0);
           item.isSelect = false;
           // item.isnotSelect = true;
           this.shoppingList.push(item);
         });
       }
     });
     // 获取用户默认收件地址
     var uid = this.$store.state.userinfo.uid;
 
     this.axios.get("/getReceiver?uid=" + uid).then(res => {
       this.isPushaddres = res.data[0];
       
       if(res.data[0] != undefined){
         this.receiver_info = res.data[0];
         this.receiver_info.totaladdress = `${this.receiver_info.province}${this.receiver_info.city}${this.receiver_info.county}${this.receiver_info.address}`;
         //获取用户地址id
         this.address_id = this.receiver_info.aid;
       }
     });
     window.addEventListener("scroll", this.handleScroll);
 
   }
 };
</script>
<style scoped>
.overflow {
  text-overflow: ellipsis; /*省略号 */
  white-space: nowrap; /*溢出时不换行 */
  overflow: hidden; /*溢出时隐藏 */
}
.cart {

		padding: 15px;
		margin-bottom: 15px;
		background: #f9f9f9;
	}
.cart_title_replace {
  /* 宽高 */
  width: 100%;
  height: 45px;
  /* 位置 */
  position: fixed;
  left: 0;
  top: 0;

  /* 布局 */
  padding: 12px 0 8px;
  z-index: 5;

  /* 背景 */
  background: #f5f5f5;

  line-height: 45px;
  text-align: center;
}
/* 固定购物车logo */
.cart_title_replace img {
  float: left;
  /* 微调 */
  margin: -3px -24px 0 0;
}
/* fixed购物车第一个div */
.cart_title_replace_font {
  /* 字体 */
  font: 20px "微软雅黑";
  /* 微调 */
  margin: 0 0 5px 24px;
}
/* fixed购物车第二个div */
.cart_title_replace span:last-child {
  float: right;
  /* 字体 */
  font: 16px "微软雅黑";
  /* 微调 */
  margin: 8px 10px 0 0;
}
.cart_title {
  display: flex;
  justify-content: space-between;
  margin: 5px 10px 0 15px;
  color: #222222;
}
/* 购物车样式 */
.cart_title div:first-child {
  font-size: 28px;
  font-weight: 800;
}
/* 管理样式 */
.cart_title div:last-child {
  margin: 8px 5px 0 0;
}
/* 购物车详情 */
.details {
  color: #222222;
  margin: 8px 0 12px 15px;
}
/* details 外边距 */
.details > span + span {
  margin-left: 8px;
}
/* 样式设置 */
body {
  margin: 0;
  padding: 0;
}
button {
  outline: none;
  border-color: transparent;
  box-shadow: none;
}
#app {
  margin: 0;
  padding: 0;
  width: 100%;
}
/* 购物车主体 */
.shoppingMain {
  width: 100%;
  margin-bottom: 120px;
}
.shoppingItem {
  margin: 0 10px 10px 10px;
  background: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 0 3px #9d9d9d;
  /* border: 1px solid red; */
}
.selectCircle {
  width: 16px;
  height: 16px;
  border: 1px solid gray;
  border-radius: 50%;
  margin: auto 0px auto 10px;
}
.shoppingImg {
  width: 100px;
  height: 100px;
  margin: 18px;
}
.shoppingImg img {
  height: 100%;
  width: 100%;
}
.itemRight {
  font-size: 15px;
  width: 200px;
  margin: 5px 15px 10px 0;
}
.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font: 600 18px "微软雅黑";
  color: #000;
}
.numAndMoney {
  display: flex;
  justify-content: space-between;
  color: red;
  /* 微调 */
  margin-top: 5px;
}
.numAndMoney p {
  font: 800 18px "微软雅黑";
  display: inline-block;
}
.goodSeries {
  margin-top: 5px;
}
input {
  width: 40px;
  height: 20px;
  margin: 10px;
  text-align: center;
}
.numberControl {
  display: inline-block;
  border: 1px solid #a8a8a8;
  border-radius: 10%;
}
/* + && - btns */
.numberControl a {
  display: inline-block;
  color: #a8a8a8;
}
.numberControl .btn1 {
  padding: 0 7px;
}
.numberControl .btn2 {
  padding: 0 5px;
}

/* 去掉input的基本样式 */
.numberControl input {
  border: none;
  border-left: 1px solid #a8a8a8;
  border-right: 1px solid #a8a8a8;
  outline: 0;
  padding: 0 0;
  margin: 0;
  color: #707070;
}
.bottomMain {
  position: fixed;
  width: 100%;
  height: auto;
  /* border-top: 1px #a7a5a5 solid; */
  /* border-bottom: 1px #a7a5a5 solid; */
  bottom: 55px;
  left: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}
.bottombtn1 {
  width: auto;
  height: 43px;
  border: none;
  color: #fff;
  background: linear-gradient(to right, #e26411, #ff4500);
  border-radius: 25px;
  padding: 5px 18px;
  font: 500 16px "微软雅黑";
  margin-right: 15px;
  margin-bottom: 2px;
}
.bottombtn2 {
  width: 90px;
  height: 43px;
  border: none;
  color: #fff;
  padding: 5px 18px;
  background: linear-gradient(to right, #e26411, #ff4500);
  border-radius: 25px;
  margin-right: 20px;
  margin-bottom: 2px;
}
/* 结算合计布局 */
.little_flex_left {
  display: flex;
}
.little_flex_right {
  display: flex;
}
/* 合计 */
.total_sum {
  margin: 10px 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.total_sum span:last-child {
  color: red;
}
.checked {
  background: url("../assets/cart_img/tick4.png");

  border: 1px solid rgba(0, 0, 0, 0);
}
/* 上外边距 mt1 */
.mt1 {
  margin-top: 5px;
}
</style>