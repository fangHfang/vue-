
import Item from "./item/index.vue";

export default {
  "name": "sidebar",
  "components": { Item },
  data() {
    return {
      // 当前打开的菜单数组
      "openeds": [],
      "sidebar": this.$store.state.container.sidebar
    };
  },
  "computed": {
    // 菜单可用总路由
    validAllRoutes() {
      return this.$store.getters["container/validRoutes"];
    },
    // 选中的nav tab索引
    activeNavTabIndex() {
      return this.$store.state.navbar.activeNavTabIndex;
    },
    // 实际路由菜单
    realRoutes() {
      if (this.validAllRoutes.length > 0) {
        return this.validAllRoutes[this.activeNavTabIndex].children;
      }
      return [];
    },
    // 活跃菜单
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // 是否闭合
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};