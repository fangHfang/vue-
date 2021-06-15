export default {
  "name": "navbar",
  "namespaced": true,
  "state": {
    // 选中的菜单tab
    "activeNavTabIndex": 0
  },
  "mutations": {
    navbarSet(state, payload) {
      state = Object.assign(state, payload);
    }
  }
};
