<template>
  <div>
    <van-nav-bar
      :title="fromMy ? '我的收货地址' : '请选择收获地址'"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="t-border"
      fixed
    />
    <main class="mainContent">
      <!-- @add="onAdd"
        v-model="chosenAddressId"  默认选择   number类型
        switchable  是否允许切换地址-->
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        :switchable="!fromMy"
        @select="selectClick"
        @edit="editAddress"
        @add="editAddress({ id: 0 })"
      />
      <!-- 此处设置  @add="editAddress({id:0})"  为了在AddressEdit页面分辨是新增地址还是编辑地址-->
    </main>
  </div>
</template>

<script>
/* 地址信息存在vuex的userInfo中，所以引入vuex的数据 */
import { mapState } from "vuex";
/* 存储选中地址的信息，存储在session中 */
import storage from "../../utils/storage/index";
export default {
  name: "AddressList",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: 1,
    };
  },
  watch: {},
  computed: {
    ...mapState(["userInfo"]),
    fromMy() {
      return this.$route.query.from === "my";
    },
    /* 获取用户收获列表信息 */
    addressList() {
      const { addressList } = this.userInfo;
      if (!addressList) return;
      let partAddressList = [];
      addressList.forEach((item) => {
        let {
          city,
          country,
          default: isDefault,
          detail,
          id,
          mobile: tel,
          province,
          name,
        } = item;
        let address = `${province} ${city} ${country} ${detail}`;
        partAddressList.push({ isDefault, id, tel, address, name });
      });
      return partAddressList;
    },
  },
  methods: {
    /* 点击地址  vant的select携带item地址对象   可以保存信息到session   到确认订单页面显示  */
    selectClick(item) {
      storage.session.set("selectAddressMsg", item);
      this.$router.back();
    },
    /* 点击编辑地址  跳转到编辑地址页面  携带参数 */
    editAddress(item) {
      this.$router.push({ path: "/addressEdit", query: { id: item.id } });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
</style>