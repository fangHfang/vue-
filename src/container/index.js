
import Hamburger from "./components/hamburger/index.vue";
import Navbar from "./components/navbar/index.vue";
import sidebar from "./components/sidebar/index.vue";
import Layout from "./components/layout/index.vue";
import Tabbar from "./components/tabbar/index.vue";
export default {
  "name": "container",
  "components": {
    Navbar,
    sidebar,
    Layout,
    Tabbar,
    Hamburger
  },
  "computed": {
    sidebar() {
      return this.$store.state.container.sidebar;
    },
    device() {
      return this.$store.state.container.device;
    },
    classObj() {
      return {
        "hideSidebar": !this.sidebar.opened,
        "openSidebar": this.sidebar.opened,
        "withoutAnimation": this.sidebar.withoutAnimation,
        "mobile": this.device === "mobile"
      };
    }
  },
  mounted() {
  },
  "methods": {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { "withoutAnimation": false });
    }
  }
};