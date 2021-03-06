<template>
  <div>
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell
      :title="selectNameTel"
      is-link
      to="/addressList"
      :label="selectAddress"
      size="large"
      class="select-address"
    />

    <!-- 内容区 -->
    <main class="orderContent">
      <van-cell
        v-for="item in orderList"
        :key="item.id"
        :title="item.name.split(' ')[0]"
        :icon="item.cover"
        :label="'￥' + item.price"
        size="large"
        :value="item.count + '件'"
      />
    </main>
    <!-- 付款栏@submit="onSubmit" -->
    <van-submit-bar
      :price="totalPrice"
      button-text="付款"
      class="b-border"
      @submit="paySubmit"
    >
      <slot default>共计：{{ totalCount }} 件</slot>
    </van-submit-bar>
    <!-- 支付键盘跳出 ref=ejectKeyboard-->
    <keyboard :orderId="order_id" ref="ejectKeyboard"></keyboard>
  </div>
</template>

<script>
/* 引入storage */
import storage from "../../utils/storage/index";
// 引入键盘组件
import Keyboard from "../../components/keyboard/Keyboard";
/* 引入下单接口 */
import { reqOrderCreate } from "../../network/api";
export default {
  name: "OrderConfirm",
  components: { Keyboard },
  props: {},
  data() {
    return {
      orderList: [],
      selectAddressMsg: {},
      order_id: "", //订单id
    };
  },
  watch: {},
  computed: {
    /* 计算总件数 */
    totalCount() {
      return this.orderList.reduce((p, c) => p + c.count, 0);
    },
    /* 计算总价格 */
    totalPrice() {
      return this.orderList.reduce((p, c) => p + c.count * c.price, 0) * 100;
    },
    /* 首先判断在session中有没有get到数据 hasSelectAddressMsg */
    hasSelectAddressMsg() {
      return !!(this.selectAddressMsg.id || this.selectAddressMsg.name);
    },
    /* 取出收获姓名和电话  selectNameTel */
    selectNameTel() {
      return this.hasSelectAddressMsg
        ? this.selectAddressMsg.name + this.selectAddressMsg.tel
        : "请选择地址";
    },
    /* 取出地址   selectAddress */
    selectAddress() {
      return this.hasSelectAddressMsg
        ? this.selectAddressMsg.address
        : "地址信息";
    },
  },
  methods: {
    /* 点击付款   向后台提交数据 */
    async paySubmit() {
      // 先判断是否有收货地址
      if (!this.hasSelectAddressMsg) return this.$toast("请选择收获地址");
      // 取出用户的收货地址id
      const { id: user_address_id } = this.selectAddressMsg;
      // 取出商品数据，需要传给后台
      const { orderList: orderProductList } = this;
      const { errcode, data } = await reqOrderCreate(
        orderProductList,
        user_address_id
      );
      if (errcode !== 0) return this.$toast("下单失败");
      // 付款需要订单id
      this.order_id = data.id;
      // 下单成功后弹出支付键盘
      this.$refs.ejectKeyboard.show = true;
    },
  },
  created() {
    /* 一上来就开始获取订单数据渲染页面，订单数据从session存储中获取 */
    this.orderList = storage.session.get("orderList");
    /* 上来先获取地址数据 */
    this.selectAddressMsg = storage.session.get("selectAddressMsg") || {};
  },
  mounted() {},
};
</script>
<style scoped lang="less">
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