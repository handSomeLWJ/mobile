<template>
  <div>
    <!-- 底部弹出框 
      :closeable="true" -->
    <van-popup
      v-model="show"
      :round="true"
      position="bottom"
      :close-on-click-overlay="false"
      :style="{ height: '70%' }"
    >
      <!-- nav @click-left="$router.back()"  -->
      <van-nav-bar title="付款" @click-left="clear">
        <template #left>
          <van-icon name="cross" size="18" />
        </template>
      </van-nav-bar>
      <!-- 密码输入框 -->
      <van-password-input
        :value="payPassword"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 v-model：绑定当前键盘输入值 -->
      <van-number-keyboard
        v-model="payPassword"
        :show="showKeyboard"
        @input="onInput"
      />
    </van-popup>
  </div>
</template>

<script>
import { reqOrderPay } from "../../network/api";
export default {
  components: {},
  props: ["orderId"], //父组件中下单成功后传过来的订单号
  data() {
    return {
      showKeyboard: true,
      show: false,
      payPassword: "", //支付密码
    };
  },
  watch: {},
  computed: {},
  methods: {
    /*  当数字键盘发生变化时 */
    onInput() {
      // 获取父组件传来的参数orderId赋值给order_id  当密码输入长度达到6位时，发送支付请求
      const order_id = this.orderId;
      // $nextTick是将回调函数延迟在下一次dom更新数据后调用
      this.$nextTick(async () => {
        if (this.payPassword.length >= 6) {
          const { errcode, data } = await reqOrderPay(
            order_id,
            this.payPassword
          );
          if (errcode !== 0) {
            this.payPassword = "";
            return this.$toast("付款失败");
          }
          this.$toast(data);
          this.payPassword = "";
          console.log(this);
          this.$router.push("/paySuccess");
        }
      });
    },
    /* 点击付款左边的x时  跳转到订单详情页面，并携带订单参数 */
    clear() {
      this.$router.push({ path: "/orderDetail", query: { id: this.orderId } });
      this.show = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
</style>