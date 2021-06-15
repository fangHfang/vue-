import router, { constantRoutes, mainRoutes, otherRoutes, resetRouter } from "@/router";
// 默认显示路由
import fixRouter from "@/router/fixRouter";
import { listMenuAll, listUserMenuTree } from "@/api/login/login";

/**
 * 使用 meta.role 来确定是否有权限
 */
function hasPermission(roles, route) {
  if (route.path) {
    return roles.some(role => {
      return route.path === role.path;
    });
  }
  return true;
}

/**
 * 动态过滤路由
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}
export default {
  "namespaced": true,
  "name": "login",
  "state": {
    "routers": []
  },
  "mutations": {
    // homeSet，命名规范：文件夹名称 + Set，拷贝页面时注意修改此方法名称
    loginSet(state, payload) {
      state = Object.assign(state, payload);
    }
  },
  "actions": {
    /**
     * 获取菜单列表
     * @param {*} param0
     * @param {*} view
     */
    getMenuList({ commit }) {
      return new Promise((resolve, reject) => {
        listMenuAll().then(async (res) => {
          const { data } = res;
          const list = data.concat(fixRouter);
          // 清空路由
          resetRouter();
          // 过滤菜单
          const accessedRoutes = await filterAsyncRoutes(mainRoutes, list).concat(otherRoutes);
          router.options.routes = accessedRoutes;
          // 加入路由
          await router.addRoutes(accessedRoutes);
          commit("container/containerSet", { "allRoutes": router.options.routes }, { "root": true });
          commit("container/permissionSet", { "permission": res.data }, { "root": true });
          resolve(accessedRoutes);
        });
      });
    }
  }
};
