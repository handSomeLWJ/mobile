<template>
  <div>
    <van-nav-bar
      title="用户设置"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
      class="t-border"
    />
    <main class="content">
      <van-cell-group title="基本信息">
        <van-cell
          icon="setting-o"
          title="修改昵称"
          is-link
          to="/changeNickname"
        />
        <van-cell
          icon="setting-o"
          title="修改头像"
          is-link
          to="/updateAvatar"
        />
      </van-cell-group>
      <van-cell-group title="安全">
        <van-cell
          icon="setting-o"
          title="修改登录密码"
          is-link
          to="/changePassword"
        />
        <van-cell
          icon="setting-o"
          title="修改支付密码"
          is-link
          to="/changePayPassword"
        />
      </van-cell-group>
    </main>
  </div>
</template>

<script>
export default {
  name: "UserSetting",
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
.content {
  height: calc(100vh - 46px);
  overflow-y: scroll;
  margin-top: 46px;
}
</style>