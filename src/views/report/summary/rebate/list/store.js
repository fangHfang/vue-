export default {
  "namespaced": true,
  "name": "businessSummaryRebateList",
  "state": {
    "currentRow": {}
  },
  "mutations": {
    // 命名规范：文件夹名称 + Set，拷贝页面时注意修改此方法名称
    summarySet(state, payload) {
      state = Object.assign(state, payload);
    }
  }
};
