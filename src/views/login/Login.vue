<template>
  <div>
    <van-nav-bar
      title="登录/注册"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 表单用户密码 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="loginInfo.name"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[
          {
            validator,
            required: true,
            message: '请填写4-10位由字母和数字组成的用户名',
          },
        ]"
      />
      <van-field
        v-model="loginInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ validator, required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// import { reqLogin } from "../../network/api";
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      loginInfo: {
        name: "",
        password: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 函数校验 */
    // 用户名
    validator(val) {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,10}$/.test(val);
    },
    /* 提交onSubmit */
    ...mapActions(["userLogin"]),
    onSubmit() {
      //   const data = await reqLogin(this.loginInfo);
      this.userLogin(this.loginInfo);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
</style>