<template>
  <div>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
      class="t-border"
    />
    <main class="content" @scroll="mainScroll" ref="main">
      <van-cell-group v-for="item in myOrderList" :key="item.id">
        <van-cell
          :title="'订单号：' + item.id"
          is-link
          :to="{ path: '/orderDetail', query: { id: item.id } }"
        />
        <template v-for="i in item.orderProducts">
          <van-cell
            :key="i.id"
            :title="i.name.split(' ')[0]"
            :icon="i.cover"
            :label="'￥' + i.price"
            size="large"
            :value="i.count + '件'"
          />
        </template>
      </van-cell-group>
    </main>
    <!-- 回到顶部图标 -->
    <van-icon
      name="upgrade"
      class="backTop"
      @click="backTopClick"
      v-show="btnBackTop"
    />
  </div>
</template>

<script>
import { reqProductPaginnation } from "../../network/api";
export default {
  name: "MyOrder",
  components: {},
  props: {},
  data() {
    return {
      page: 1,
      myOrderList: [],
      totalPage: 0,
      flag: false,
      btnBackTop: false, //回到顶部
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 获取订单列表 */
    async getMyOrderList() {
      this.flag = true;
      const { errcode, data } = await reqProductPaginnation(this.page);
      if (errcode !== 0) return this.$toast("获取订单信息失败");
      //   因为数据是一页一页传递过来的，所以需要没更新一页就赋值给this.myOrderList
      this.myOrderList = [...this.myOrderList, ...data.data];
      console.log(data);
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
        this.getMyOrderList(this.page);
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
  created() {
    this.getMyOrderList(this.page);
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
.van-cell-group {
  border-top: 5px solid #eee;
  border-bottom: 5px solid #eee;
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
/* 回到顶部 */
.backTop {
  position: fixed;
  bottom: 20px;
  right: 10px;
  color: #999;
  font-size: 50px;
}
</style>