<template>
  <div>
    <!-- nav导航栏 -->
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="t-border c-item"
      fixed
    />
    <!-- 内容区 -->
    <main class="mainContent">
      <div class="c-item" v-for="item in cartList" :key="item.product_id">
        <van-checkbox v-model="item.checked" @click="changeChecked(item)">
          <van-card
            :price="item.price.toFixed(2)"
            :title="item.name"
            :thumb="item.cover"
            @click.stop
          >
            <!-- 加减count -->
            <template #tags>
              <van-stepper
                v-model="item.count"
                disable-input
                theme="round"
                class="steepper"
                @change="changeCount(item.product_id)"
              />
            </template>
            <template #num>
              <van-button
                type="danger"
                size="mini"
                @click="delClick(item.product_id)"
                >删除</van-button
              >
            </template>
          </van-card>
        </van-checkbox>
      </div>
    </main>
    <!-- 提交订单栏@submit="onSubmit" -->
    <van-submit-bar :price="totalPrice" button-text="提交订单" class="b-border">
      <slot default>共计：{{ totalCount }} 件</slot>
    </van-submit-bar>
  </div>
</template>

<script>
import { reqCartAll, reqUpdateCart, delCartItem } from "../../network/api";
export default {
  name: "Cart",
  components: {},
  props: {},
  data() {
    return {
      cartList: [], //购物车数据数组
    };
  },
  watch: {},
  computed: {
    /* 共计多少件 */
    totalCount() {
      return this.cartList.reduce(
        (pre, current) => (current.checked ? pre + current.count : pre),
        0
      );
    },
    /* 总价格 */
    totalPrice() {
      return (
        this.cartList.reduce(
          (pre, current) =>
            current.checked ? pre + current.count * current.price : pre,
          0
        ) * 100
      );
    },
  },
  methods: {
    /* 获取购物车的数据 */
    async getCartAll() {
      const { data } = await reqCartAll();
      this.cartList = data;
      console.log(data);
    },
    /* 复选框状态变化  changeChecked */
    async changeChecked(item) {
      let { product_id, checked } = item;
      checked = checked ? 1 : 0;
      await reqUpdateCart({ product_id, checked });
    },
    /* 加减count */
    async changeCount(id) {
      // let { product_id, count } = item;
      // await reqUpdateCart({ product_id, count });
      const data = await reqUpdateCart(id);
      console.log(data);
    },
    /* 删除商品 */
    async delClick(id) {
      const { errcode } = await delCartItem(id);
      if (errcode != 0) return this.$toast("删除失败");
      this.cartList = this.cartList.filter((item) => item.product_id != id);
      this.$toast("删除成功");
    },
  },
  created() {
    /* 加载即开始渲染 */
    this.getCartAll();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
main {
  .c-item {
    background: #fbfbfb;
    padding: 5px 0 5px 5px;
    margin-bottom: 6px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .van-card__price {
    color: rgb(212, 37, 6);
  }
  .steepper {
    padding: 8px 0 5px 35px;
  }
}
</style>