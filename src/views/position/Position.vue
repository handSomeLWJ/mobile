<template>
  <div>
    <van-nav-bar
      title="选择城市"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      fixed
      class="t-border"
    />
    <main class="city_list">
      <van-index-bar>
        <template v-for="(value, key) in cityList">
          <van-index-anchor :index="key" :key="key"></van-index-anchor>
          <van-cell
            v-for="item in value"
            :key="item.id"
            :title="item.name"
            @click="selectCity(item.name)"
          />
        </template>
      </van-index-bar>
    </main>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { reqDataCity } from "../../network/api";
export default {
  name: "Position",
  components: {},
  props: {},
  data() {
    return {
      cityList: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(["reqLocationCity"]),
    /* 获取城市 */
    async getDataCity() {
      const { errcode, data } = await reqDataCity();
      if (errcode !== 0) return this.$toast("获取城市失败");
      this.cityList = data.cities;
      console.log(data);
    },
    /* 修改城市 */
    selectCity(city) {
      this.reqLocationCity(city);
      this.$router.back();
    },
  },
  created() {
    this.getDataCity();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.city_list {
  height: calc(100vh - 46px);
  overflow-y: scroll;
  margin-top: 46px;
}
</style>