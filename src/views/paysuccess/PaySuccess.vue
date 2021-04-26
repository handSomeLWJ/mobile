<template>
  <div>
    <van-nav-bar
      title="支付成功"
      left-text="返回"
      @click-left="$router.back()"
    />
    <van-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      @click="
        $router.push({
          path: '/orderDetail',
          query: { id: $route.query.id },
        })
      "
    >
      支付成功
    </van-button>
  </div>
</template>

<script>
export default {
  name: "PaySuccess",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.van-button {
  margin: 200px auto;
  display: block;
  width: 50%;
}
</style>