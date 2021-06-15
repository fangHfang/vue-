import Hamburger from "../hamburger/index.vue";
export default {
  "components": {
    Hamburger
  },
  data() {
    return {
      "showColor": false,
      "sidebar": this.$store.state.container.sidebar,
      // 选中索引
      "activeTabIndex": 0
    };
  },
  "computed": {
    // 菜单可用路由
    validRoutes() {
      return this.$store.getters["container/validRoutes"];
    },
    // 菜单可用路由
    userName() {
      return this.$store.state.login.name;
    }
  },
  created() {
  },
  "methods": {
    /**
     * 切换tab
     * @param index 索引
     */
    handleNavTabSwitch(index) {
      this.activeTabIndex = index;
      this.$store.commit("navbar/navbarSet", { "activeNavTabIndex": this.activeTabIndex });
    },
    /**
     * 切换展开收缩菜单
     */
    toggleSideBar() {
    },
    /**
     * 登出
     */
    logout() {
      // 清空sessionStorage
      sessionStorage.clear();
      // 重新加载页面
      location.reload();
    }
  }
};