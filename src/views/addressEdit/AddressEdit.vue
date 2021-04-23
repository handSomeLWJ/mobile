<template>
  <div>
    <van-nav-bar
      :title="isAdd ? '新增地址' : '修改地址'"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="t-border"
      fixed
    />
    <van-address-edit
      :area-list="areaList"
      :show-delete="!isAdd"
      show-set-default
      :address-info="addressInfo"
      @save="saveAddress"
      @delete="deleteAddress"
    />
  </div>
</template>

<script>
/* 获取vuex里面存储的userInfo数据 先渲染到页面 */
import { mapState, mapMutations } from "vuex";
import { areaList } from "@vant/area-data";
import {
  reqUpdateAddress,
  reqDeleteAddress,
  reqAddAddress,
} from "../../network/api";
export default {
  name: "AddressEdit",
  components: {},
  props: {},
  data() {
    return {
      areaList,
    };
  },
  watch: {},
  computed: {
    ...mapState(["userInfo"]),
    /* 获取编辑数据时的信息 默认初始值*/
    addressInfo() {
      const { addressList } = this.userInfo;
      if (!addressList) return;
      let partAddressList = addressList.find((item) => {
        return item.id == this.$route.query.id;
      });
      if (!partAddressList) return;
      let {
        id,
        name,
        mobile: tel,
        province,
        city,
        country: county,
        detail: addressDetail,
      } = partAddressList;
      return { id, name, tel, province, city, county, addressDetail };
    },
    /* 判断是  @add 还是  @edit  如果是，则新增地址  如果不是，则修改地址 */
    isAdd() {
      return this.$route.query.id == 0;
    },
  },
  methods: {
    ...mapMutations(["updateAddress", "deleteAddressMu", "addAddressMu"]),
    /* 点击保存按钮时 @save会返回一个content，content里面包含了表单的内容 */
    //  1、首先获取content表单中所需信息
    async saveAddress(content) {
      let {
        name,
        province,
        city,
        county: country,
        addressDetail: detail,
        tel: mobile,
        areaCode: code,
      } = content;
      let addressMsg = {
        name,
        province,
        city,
        country,
        detail,
        mobile,
        code,
        default: 0,
      };
      console.log(this.isAdd, this.$route.query.id);
      if (this.isAdd) {
        // 2、从my中进来，新增用户地址
        const { errcode, data } = await reqAddAddress(addressMsg);
        if (errcode !== 0) return this.$toast("新增用户失败");
        this.addAddressMu(data);
      } else {
        // 3、从确认订单中进来，修改数据 请求后台修改    this.$route.query.id,
        const { errcode } = await reqUpdateAddress(
          this.$route.query.id,
          addressMsg
        );
        if (errcode !== 0) return this.$toast("修改失败");
        addressMsg.id = this.$route.query.id;
        this.updateAddress(addressMsg);
      }
      this.$router.back();
    },
    /*  点击删除按钮 从my中我的收货地址中过来，点击删除收货地址 @delete的content有数据 */
    async deleteAddress(content) {
      const { errcode } = await reqDeleteAddress(content.id);
      if (errcode !== 0) return this.$toast("删除失败");
      this.$router.back();
      // 此时后台数据已经修改，  但是页面还没有修改，即是vuex里面的数据还没有修改，所以需用通过mutations修改页面的实时显示数据
      this.deleteAddressMu(content.id);
      this.$toast("删除成功");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.van-address-edit {
  margin-top: 46px;
}
</style>