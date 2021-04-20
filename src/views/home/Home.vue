<template>
  <div>
    <!-- 顶部nav -->
    <van-nav-bar title="精选" fixed>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
      <template #left>
        <van-icon name="location-o" size="18" />
        <span>深圳市</span>
      </template>
    </van-nav-bar>
    <!-- 内容main -->
    <main class="mainContent p_content" @scroll="mainScroll" ref="main">
      <div
        class="p_item"
        v-for="item in itemList"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <img :src="item.cover" alt="" />
        <div class="bottom">
          <h2>
            {{ item.name }}
          </h2>
          <p>{{ item.price | filterPrice }}</p>
        </div>
      </div>
    </main>
    <!-- 回到顶部 
      
      v-show="showBakcTop"-->
    <van-icon
      name="upgrade"
      class="backTop"
      @click="backTopClick"
      v-show="btnBackTop"
    />
    <!-- 加载中 -->
    <van-loading
      type="spinner"
      size="50px"
      vertical
      color="#1989fa"
      v-show="load"
    />
  </div>
</template>

<script>
import { homeContent } from "../../network/api";
import "../../utils/filter/index";
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      itemList: [], // 放请求过来的数据
      page: 1, //当前页数
      totalPage: 0, //总页数
      flag: false, //是否加载下一页
      btnBackTop: false, //回到顶部
      load: false, //加载中
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 请求p_item数据 */
    async getHomeContent(page) {
      this.flag = true;
      let { data } = await homeContent(page);
      this.itemList = [...this.itemList, ...data.data];
      this.totalPage = data.totalPages;
      this.flag = false;
    },
    /* 滚动事件 */
    mainScroll() {
      let { scrollHeight, scrollTop, offsetHeight } = this.$refs.main;
      this.btnBackTop = scrollTop > 1500;
      if (this.flag) return;
      if (scrollHeight - offsetHeight <= scrollTop + 3) {
        this.page++;
        if (this.page > this.totalPage) return this.$toast("到底了！！！！");
        this.getHomeContent(this.page);
      }
    },
    /* 回到顶部 */
    backTopClick() {
      let scrollTop = this.$refs.main.scrollTop;
      let timeId = setInterval(() => {
        this.$refs.main.scrollTop -= scrollTop / 20;
        if (this.$refs.main.scrollTop <= 0) {
          clearInterval(timeId);
        }
      }, 20);
    },
    /* 跳到详情页 */
    toDetail(id) {
      this.$router.push({
        path: "/detail",
        query: { id },
      });
    },
  },
  created() {
    this.getHomeContent(this.page);
  },
  mounted() {},
};
</script>
<style scoped lang="less">
/* 顶部nav */
.van-nav-bar {
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
/* 回到顶部 */
.backTop {
  position: fixed;
  bottom: 80px;
  right: 20px;
  color: #666;
  font-size: 60px;
}

/* 加载中 */
.van-loading {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  margin: 100px auto;
}
</style>