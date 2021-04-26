<template>
  <div id="updata_avatar">
    <van-nav-bar
      title="设置头像"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="t-border"
    />
    <!-- 图片 -->
    <div class="photo">
      <img ref="img" :src="isSrc" alt="" />
    </div>
    <footer>
      <input
        type="file"
        ref="avatar"
        value="图片"
        @change="clickAvatar"
        style="display: none"
      />
      <van-button type="info" size="large" @click="selectAvatar"
        >选择图片</van-button
      >
      <van-button type="primary" size="large" @click="clickUpdateAvatar"
        >上传图片</van-button
      >
    </footer>
  </div>
</template>

<script>
// 引入图片公共路径
import { reqUpdateUserAvatar, IMGBASEURL } from "../../../network/api";
import { mapMutations, mapState } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {
      imgURL: IMGBASEURL, //图片公共路劲
    };
  },
  watch: {},
  computed: {
    ...mapState(["userInfo"]),
    /* img显示 */
    isSrc() {
      const { avatar } = this.userInfo;
      return avatar
        ? this.imgURL + avatar
        : "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1716611239,1113008250&fm=224&gp=0.jpg";
    },
  },
  methods: {
    ...mapMutations(["changeAvatarMu"]),
    /* 获取图片信息 */
    clickAvatar() {
      let file = this.$refs.avatar.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.$refs.img.src = reader.result;
      };
    },
    /* 选择图片 */
    selectAvatar() {
      this.$refs.avatar.click();
    },
    /* 点击上传图片 */
    async clickUpdateAvatar() {
      // 如果选择的图片是空的  则return
      if (this.$refs.avatar.files.length <= 0) return this.$toast("请选择图片");
      // 将文件转成FromData格式
      let formData = new FormData();
      formData.append("avatar", this.$refs.avatar.files[0]);
      const { errcode, data } = await reqUpdateUserAvatar(formData);
      if (errcode !== 0) return this.$toast("图片上传失败");
      this.changeAvatarMu(data.avatar);
      this.$router.push("/my");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
#updata_avatar {
  position: relative;
  width: 100vw;
}
.photo {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -75px;
  width: 150px;
  height: 150px;
  border: 3px solid #eee;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
footer {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>