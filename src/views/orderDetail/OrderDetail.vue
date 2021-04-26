<template>
  <div>
    <van-nav-bar
      title="订单详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 商品进度 -->
    <van-steps :active="order_status" active-color="success">
      <van-step>未付款</van-step>
      <van-step>已付款</van-step>
      <van-step>未发货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <!-- 收货人详情 -->
    <van-cell
      :title="`${userAddress.name},${userAddress.mobile}`"
      :label="`${userAddress.province} ${userAddress.city} ${userAddress.country} ${userAddress.detail}`"
      size="large"
      class="select-address"
    />
    <!-- 内容区 -->
    <main class="orderContent">
      <van-cell
        v-for="item in orderProducts"
        :key="item.id"
        :title="item.name.split(' ')[0]"
        :icon="item.cover"
        :label="'￥' + item.price"
        size="large"
        :value="item.count + '件'"
      />
    </main>
    <!-- 付款栏@submit="onSubmit" -->
    <footer class="b-border">
      <van-submit-bar
        v-if="order_status === 0"
        text-align="left"
        :price="totalPrice"
        button-text="请付款"
        button-color="#1433df"
        @submit="paySubmit"
      />
      <van-submit-bar
        v-else-if="order_status === 1"
        text-align="left"
        :price="totalPrice"
        button-text="请等待发货"
        button-color="#999"
      />
    </footer>
    <keyboard :orderId="$route.query.id" ref="ejectKeyboard"></keyboard>
  </div>
</template>

<script>
/* 获取订单详情 */
import { reqOrder } from "../../network/api";
/* 引入键盘 */
import Keyboard from "../../components/keyboard/Keyboard";
export default {
  name: "OrderDetail",
  components: { Keyboard },
  props: {},
  data() {
    return {
      order_status: 0,
      id: "",
      userAddress: {}, //订单收货人详情
      orderProducts: [], //订单商品信息
    };
  },
  watch: {},
  computed: {
    /* 计算总价格 */
    totalPrice() {
      if (!this.orderProducts) return;
      return (
        this.orderProducts.reduce((p, c) => p + c.count * c.price, 0) * 100
      );
    },
  },
  methods: {
    /* 获取订单详情内容 */
    async getOrder() {
      const { errcode, data } = await reqOrder(this.$route.query.id);
      console.log(errcode, this.id);
      if (errcode !== 0) return this.$toast("获取订单失败");
      let { orderProducts, userAddress } = data;
      this.order_status = data.order_status;
      console.log(this.order_status);
      this.orderProducts = orderProducts;
      this.userAddress = userAddress;
    },
    /* 点击付款按钮 */
    paySubmit() {
      this.$refs.ejectKeyboard.show = true;
    },
  },
  created() {
    /* 上来先拿到订单id(从keyboard传过来的)  获取单个订单需要发送id请求订单数据 */
    this.id = this.$route.query.id;
    console.log(this.id);
    /* 上来先调用获取的数据 */
    this.getOrder();
    console.log(this.orderProducts);
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.van-steps {
  margin-top: 48px;
}
/* 选择收货地址 */
.select-address {
  border-top: 10px solid #eee;
  border-bottom: 10px solid #eee;
}
/* 订单内容区域 */
.orderContent {
  height: calc(100vh - 186px);
  overflow-y: scroll;
}
// 图片大小
.van-cell__left-icon {
  font-size: 50px;
}
</style>