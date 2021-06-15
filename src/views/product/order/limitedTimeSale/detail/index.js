import activityOrderItemMixins from "@/views/product/order/activityOrderItemMixins";
import statusOptionsMixins from "../../../manage/order/statusOptionsMixins";
export default {
  "name": "LimitedTimeSaleActiveDetail",
  "mixins": [ activityOrderItemMixins, statusOptionsMixins ],
  "components": {
  },
  data() {
    return {
      "open": true,
      "openTwo": true,
      "form": {
        "name": "",
        "ruleName": "",
        "activeDate": "",
        // 优惠券Table数据
        "couponTableData": [
        ]
      }
    };
  },
  "computed": {

  },
  created() {

  },
  mounted() {

  },
  "methods": {
    isShow() {
      this.open = !this.open;
    },
    isShowTwo() {
      this.openTwo = !this.openTwo;
    }
  }
};