import convertRuleListProductOrder from "./productOrder/index.vue";
export default {
  "name": "convertRuleList",
  "components": {
    convertRuleListProductOrder
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
      if (this.activeName === "stockIn") {
        this.typeFlag = 1;
      } else if (this.activeName === "stockOut") {
        this.typeFlag = 2;
      } else {
        this.typeFlag = 0;
      }
    }
  }
};