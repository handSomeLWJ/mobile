<template>
  <div>
    <van-nav-bar
      title="修改登录密码"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
      class="t-border"
    />
    <!-- 修改昵称 -->
    <van-form class="nicknameForm" @submit="onSubmit">
      <van-field
        v-model="oldValue"
        name="用户名"
        label="旧密码"
        placeholder="请输入旧密码"
        :rules="[
          {
            validator,
            required: true,
            message: '请正确填写密码',
          },
        ]"
      />
      <van-field
        v-model="newValue"
        name="用户名"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[
          {
            validator,
            required: true,
            message: '请填写4-10位由字母和数字组成的密码',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >修改密码</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { reqUserUpdatePassword } from "../../../network/api";
export default {
  name: "ChangePassword",
  components: {},
  props: {},
  data() {
    return {
      oldValue: "",
      newValue: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(["changeUserInfo"]),
    /* 函数校验用户名 */
    validator(val) {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,10}$/.test(val);
    },
    /* 修改用户登录密码 */
    async onSubmit() {
      if (this.newValue == this.oldValue)
        return this.$toast("新密码不能与旧密码相同");
      const { errcode, errmsg } = await reqUserUpdatePassword(
        this.oldValue,
        this.newValue
      );
      if (errcode !== 0) return this.$toast(errmsg);
      this.$toast("密码修改成功");
      this.oldValue = this.newValue = "";
      //   修改成功后需要清空vuex 清空sessionStorage 返回login页面从新登录
      this.changeUserInfo({});
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.nicknameForm {
  margin-top: 50px;
}
</style>