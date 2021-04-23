<template>
  <div>
    <!-- header头部 -->
    <header>
      <template v-if="isLogin">
        <img :src="imgSrc" alt="" />
        <span>{{ userInfo.nickname }}</span>
      </template>
      <template v-else>
        <img
          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1716611239,1113008250&fm=224&gp=0.jpg"
          alt=""
        />
        <span @click="$router.push('/login')">登录/注册</span>
      </template>
    </header>
    <van-grid>
      <van-grid-item icon="balance-list-o" text="待付款" />
      <van-grid-item icon="todo-list-o" text="待发货" />
      <van-grid-item icon="logistics" text="已发货" />
      <van-grid-item icon="thumb-circle-o" text="已完成" />
    </van-grid>
    <van-cell title="我的订单" icon="records" is-link />
    <van-cell title="我的收藏" icon="star-o" is-link />
    <van-cell
      title="收货地址"
      icon="location-o"
      is-link
      :to="{ path: '/addressList', query: { from: 'my' } }"
    />
    <van-cell title="用户设置" icon="setting-o" is-link />
  </div>
</template>

<script>
/* 获取用户信息   信息已经存储在vuex中 */
import { mapState } from "vuex";
/* 引入图片的公共地址 */
import { IMGBASEURL } from "../../network/api";
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      imgUrl: IMGBASEURL,
    };
  },
  watch: {},
  computed: {
    ...mapState(["userInfo"]),
    /* 判断是否登录 */
    isLogin() {
      const { name, id } = this.userInfo;
      return !!name || !!id;
    },
    /* 获取头像地址 */
    imgSrc() {
      return this.userInfo.avatar
        ? this.imgUrl + this.userInfo.avatar
        : "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1716611239,1113008250&fm=224&gp=0.jpg";
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
/* header  */
header {
  width: 100%;
  height: 25vw;
  background: #f37d0f;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 15px;
  img {
    width: 17vw;
    height: 17vw;
    border: 1px solid #fff;
    border-radius: 50%;
    box-shadow: 0px 1px 20px #fff;
    margin: 0 10px 0 20px;
  }
}
</style>