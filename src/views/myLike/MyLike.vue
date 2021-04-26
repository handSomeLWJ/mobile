<template>
  <div>
    <van-nav-bar
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
      class="t-border"
    />
    <!-- 收藏列表区 -->
    <main class="content">
      <van-cell-group v-for="item in likeList" :key="item.id">
        <van-cell
          :title="item.name.split(' ')[0]"
          :icon="item.cover"
          :label="'￥' + item.price"
          size="large"
          is-link
          :to="{ path: '/detail', query: { id: item.id } }"
        />
      </van-cell-group>
    </main>
  </div>
</template>

<script>
import { reqProductLikeAll } from "../../network/api";
export default {
  name: "MyLike",
  components: {},
  props: {},
  data() {
    return {
      likeList: [], //收藏列表
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 获取收藏列表 */
    async getProductLikeAll() {
      const { errcode, data } = await reqProductLikeAll();
      if (errcode !== 0) return this.$toast("获取收藏列表失败");
      this.likeList = data;
    },
  },
  created() {
    this.getProductLikeAll();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.content {
  height: calc(100vh - 46px);
  overflow-y: scroll;
  margin-top: 46px;
}

// 图片大小
.van-cell__left-icon {
  font-size: 50px;
}
/* 内容main区 */
.p_content {
  padding: 0 2px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .p_item {
    position: relative;
    width: 46vw;
    height: 220px;
    margin: 6px 0;
    padding: 3px 2px;
    border: 1px solid #eee;
    // background-color: pink;
    border-radius: 3px;
    img {
      width: 100%;
    }
    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      h2 {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        padding-bottom: 5px;
        font-size: 16px;
      }
      p {
        padding-bottom: 5px;
        font-size: 14px;
        color: #ff8f57;
      }
    }
  }
}
</style>