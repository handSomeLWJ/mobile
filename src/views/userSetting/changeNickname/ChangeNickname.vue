<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
      class="t-border"
    />
    <!-- 修改昵称 -->
    <van-form class="nicknameForm" @submit="nicknameSubmit">
      <van-field
        v-model="value"
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >修改昵称</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { reqChangeNickname } from "../../../network/api";
export default {
  name: "ChangeNickname",
  components: {},
  props: {},
  data() {
    return {
      value: "",
    };
  },
  watch: {},
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["changeNicknameMu"]),
    /* 函数校验用户名 */
    validator(val) {
      return /^\w{4,16}$|^(?!(?:\d+)$)\w{4,9}$/.test(val);
    },
    /* 点击修改昵称 */
    async nicknameSubmit() {
      const { errcode, data } = await reqChangeNickname(this.value);
      if (errcode !== 0) return this.$toast("修改昵称失败");
      this.changeNicknameMu(data.nickname);
      this.value = data.nickname;
      this.$router.push("/my");
    },
  },
  created() {
    this.value = this.userInfo.nickname;
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.nicknameForm {
  margin-top: 50px;
}
</style>