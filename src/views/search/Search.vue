<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="$router.back()" fixed>
      <template #title>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @input="debounce(getchangeValue)"
        />
      </template>
    </van-nav-bar>
    <!-- 内容main -->
    <main class="mainContent1 p_content" @scroll="mainScroll" ref="main">
      <div
        class="p_item"
        v-for="item in searchResultList"
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
  </div>
</template>

<script>
import { searchContent } from "../../network/api";
import "../../utils/filter/index";
export default {
  name: "Search",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      searchResultList: [],
      page: 1, //当前页数
      totalPage: 0, //总页数
      flag: false, //是否加载下一页
      btnBackTop: false, //回到顶部
      debounceTimeId: "", // 定时器id,
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 获取数据 */
    async getchangeValue() {
      const { errcode, data } = await searchContent(this.page, this.value);
      if (errcode !== 0) return this.$toast("搜索数据获取失败");
      this.searchResultList = data.data;
    },
    /* 防抖函数 debounce */
    debounce(fn) {
      clearTimeout(this.debounceTimeId);
      this.debounceTimeId = setTimeout(() => {
        fn();
      }, 300);
    },
    /* 滚动事件 */
    mainScroll() {
      let { scrollHeight, scrollTop, offsetHeight } = this.$refs.main;
      this.btnBackTop = scrollTop > 1500;
      if (this.flag) return;
      if (scrollHeight - offsetHeight <= scrollTop + 3) {
        this.page++;
        if (this.page > this.totalPage) return this.$toast("到底了！！！！");
        this.getchangeValue(this.page);
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
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.mainContent1 {
  margin-top: 46px;
  height: calc(100vh - 46px);
  overflow-y: scroll;
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