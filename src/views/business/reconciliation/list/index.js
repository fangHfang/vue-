import mainList from "./main/index.vue";
export default {
  "name": "reconciliationListMix",
  "components": {
    mainList
  },
  data() {
    return {
      "activeName": "accepted",
      // 状态(0:已受理,1:未入账,2:已入账)
      "typeFlag": 0
    };
  },
  "methods": {
    handleClick(tab, event) {
    }
  }
};