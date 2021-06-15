import marketRebateRuleListMain from "./main/index.vue";
export default {
  "name": "marketRebateRuleList",
  "components": {
    marketRebateRuleListMain
  },
  data() {
    return {
      "activeName": "stockIn",
      // 返利节点(0-商品下单，1-商品入库，2-商品出库)
      "typeFlag": 1
    };
  },
  "methods": {
    handleClick(tab, event) {
    }
  }
};