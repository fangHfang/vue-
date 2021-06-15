
import activityOrderMixins from "@/views/product/order/activityOrderMixins";
import statusOptionsMixins from "../../../manage/order/statusOptionsMixins";

export default {
  "name": "order",
  "components": {
  },
  "mixins": [ activityOrderMixins, statusOptionsMixins ],
  data() {
    return {
      "searchData": {
        "dealerName": "",
        "categoryType": 1,
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
      this.$router.push({ "name": "limitedTimeOrderDetail", "query": { "orderNo": orderNo } });
    }
  }
};