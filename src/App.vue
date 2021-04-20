<template>
  <div id="app">
    <van-tabbar v-model="active" v-if="isshowTabbar" class="b-border">
      <van-tabbar-item icon="star-o" to="/home">精选</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>
    <script>
export default {
  components: {},
  props: {},
  data() {
    return {
      active: 0,
    };
  },
  watch: {},
  computed: {
    isshowTabbar() {
      return !!this.$route.meta.showTabbar;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
    
<style lang="less">
</style>
