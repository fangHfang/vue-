import router from "@/router";
export default {
  "namespaced": true,
  "name": "container",
  "state": {
    "sidebar": {
      "opened": true,
      "withoutAnimation": false
    },
    "device": "desktop",
    "allRoutes": router.options.routes,
    "permission": []
  },
  "getters": {
    // 菜单可用的路由
    validRoutes(state) {
      return state.allRoutes.filter(x => !x.hidden);
    }
  },
  "mutations": {
    containerSet(state, payload) {
      state = Object.assign(state, payload);
    },
    permissionSet(state, payload) {
      state.permission = payload.permission.map(item => {
        return item.resourceNo;
      });
    }
  }
};
