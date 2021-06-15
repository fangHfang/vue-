import activityOrderMixins from "@/views/product/order/activityOrderMixins";
import statusOptionsMixins from "../../../manage/order/statusOptionsMixins";
export default {
  "name": "Product0rderCombinationList",
  "components": {
  },
  "mixins": [ activityOrderMixins, statusOptionsMixins ],
  data() {
    return {
      "searchData": {
        "categoryType": 2,
        "payStatus": ""
      }
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {

  },
  "methods": {

    /**
     * 打开订单详情
     */
    toDetail(orderNo) {
      this.$router.push({ "path": "/product/order/combination/detail", "query": { "orderNo": orderNo } });
    }
  }
};