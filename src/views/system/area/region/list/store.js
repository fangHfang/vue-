export default {
  "namespaced": true,
  "name": "areaRegionList",
  "state": {
    "regionNo": "",
    // true: 新增后跳转到编辑时为true
    "isNewAdd": false
  },
  "mutations": {
    // demoSet，命名规范：文件夹名称 + Set，拷贝页面时注意修改此方法名称
    areaRegionListSet(state, payload) {
      state = Object.assign(state, payload);
    }
  }
};
