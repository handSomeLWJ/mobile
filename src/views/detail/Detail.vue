<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <main class="mainContent">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="1000" indicator-color="skyblue">
        <van-swipe-item v-for="item in detailList.imgList" :key="item.id">
          <img :src="item.path" />
          <span>{{ item.name }}</span>
        </van-swipe-item>
      </van-swipe>
      <!-- 标题+价格cell -->
      <van-cell
        :title="detailList.name"
        size="large"
        :label="detailList.price | filterPrice"
      />
      <!-- 剩余销量价格 -->
      <van-cell-group>
        <van-row>
          <van-col span="10" offset="1">免运费</van-col>
          <van-col span="13">剩余：{{ detailList.stock || 0 }}</van-col>
        </van-row>
      </van-cell-group>
      <van-cell-group>
        <van-row>
          <van-col span="10" offset="1"
            >销量：{{ detailList.sales || 0 }}</van-col
          >
          <van-col span="13">收藏：{{ detailList.likes || 0 }}</van-col>
        </van-row>
      </van-cell-group>
      <!-- 图片  参数 -->
      <!-- <van-tabs sticky :offset-top="50"> -->
      <van-tabs sticky :offset-top="46">
        <van-tab title="图片">
          <img
            v-for="item in detailList.detailImgList"
            :key="item.id"
            :src="item.path"
            alt=""
          />
        </van-tab>
        <van-tab title="参数">
          <van-cell-group v-for="item in detailList.properties" :key="item.id">
            <van-row>
              <van-col span="10" offset="1">{{ item.name }}</van-col>
              <van-col span="13">{{ item.detail }}</van-col>
            </van-row>
          </van-cell-group>
        </van-tab>
      </van-tabs>
      <!-- 加入购物车 -->
      <van-goods-action class="b-border">
        <van-goods-action-icon icon="like-o" color="red" text="收藏" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </main>
  </div>
</template>

<script>
import { detailContent } from "../../network/api";
import "../../utils/filter/index";
export default {
  name: "Detail",
  components: {},
  props: {},
  data() {
    return {
      detailList: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getDetailContent() {
      const { data } = await detailContent(this.$route.query.id);
      this.detailList = data;
    },
  },
  created() {
    this.getDetailContent();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
/* 轮播图 */
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
  height: 320px;
  img {
    width: 100%;
    height: 100%;
  }
}
/* 标题+价格 */
.van-cell--large .van-cell__title {
  font-size: 14px;
}
.van-cell__label {
  color: rgb(240, 34, 34);
}
/* 销量收藏数 */
.van-cell-group {
  line-height: 40px;
  .van-row {
    font-size: 13px;
  }
}
/* 图片  参数 */
.van-tabs img {
  width: 100%;
}
</style>