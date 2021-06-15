
import Scroll from "./scroll/index.vue";

export default {
  "name": "tabbar",
  "components": { Scroll },
  data() {
    return {
      "visible": false,
      "top": 0,
      "left": 0,
      "selectedTag": {},
      "affixTags": []
    };
  },
  "computed": {
    visitedViews() {
      return this.$store.state.tabbar.visitedViews;
    },
    routes() {
      return this.$store.state.container.allRoutes;
    }
  },
  "watch": {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    this.initTags();
  },
  "methods": {
    isActive(route) {
      return route.path === this.$route.path;
    },
    filterAffixTags(routes = [], basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = route.path;
          tags.push({
            "fullPath": tagPath,
            "path": tagPath,
            "name": route.name,
            "meta": { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [ ...tags, ...tempTags ];
          }
        }
      });
      return tags;
    },
    initTags() {
      let affixTags = this.affixTags = this.filterAffixTags(this.routes);
      if (Object.prototype.isPrototypeOf.call(Array, affixTags) && affixTags.length < 1) {
        affixTags = [
          {
            "fullPath": "/home",
            "name": "Home",
            "path": "/home",
            "meta": {
              "affix": true,
              "title": "首页"
            }
          }
        ];
      }
      for (const tag of affixTags) {
        if (tag.name) {
          this.$store.dispatch("tabbar/addVisitedView", tag);
        }
      }
      this.addTags();
    },
    /**
     * 添加选项卡
     */
    addTags() {
      const { name, fullPath } = this.$route;
      const menuRoute = this.findRoute(this.routes, name, fullPath);
      if (menuRoute) {
        this.$route.meta.title = menuRoute.meta.title;
      }
      this.$store.dispatch("tabbar/addView", this.$route);
    },
    /**
     * 查找路由
     * @param {*} routes 所有路由菜单集合
     * @param {*} name 当前路由名称
     */
    findRoute(routes = [], name = "", fullPath = "") {
      let foundRoute = null;
      let full = null;
      // name走不通了只能判断path，当相同的时候取缓存路由中的title值
      if (fullPath) {
        const temp = fullPath.split("/");
        temp.splice(0, 2);
        full = temp.join("/");
      }
      for (let i = 0;i < routes.length;i++) {
        const curRoute = routes[i];
        if ((curRoute.name && curRoute.name.toLowerCase() === name.toLowerCase()) || (full && curRoute.path === full)) {
          foundRoute = curRoute;
          break;
        }
        if (curRoute.children) {
          foundRoute = this.findRoute(curRoute.children, name, fullPath);
          if (foundRoute) {
            break;
          }
        }
      }
      return foundRoute;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tabbar/updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      const { path } = view;
      this.$nextTick(() => {
        this.$router.replace({
          "path": path,
          "query": {
            ...(this.$route.query || {}),
            "r": this.$getRandomValue()
          }
        });
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch("tabbar/delView", view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
      }).catch(() => {});
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch("tabbar/delOthersViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      }).catch(() => {});
    },
    closeAllTags(view) {
      this.$store.dispatch("tabbar/delAllViews").then(({ visitedViews }) => {
        this.toLastView(visitedViews, view);
      }).catch(() => {});
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        this.$router.push("/");
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      const offsetWidth = this.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft;

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY - 54;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    prevRoute() {
      const index = this.visitedViews.findIndex(item => Object.is(item.path, this.$route.path));
      if (index < 1) {
        this.$message.warning("已经是第一页了");
      } else {
        this.$router.push({
          "path": this.visitedViews[index - 1].path
        });
      }
    },
    nextRoute() {
      const index = this.visitedViews.findIndex(item => Object.is(item.path, this.$route.path));
      if (index === this.visitedViews.length - 1) {
        this.$message.warning("已经是最后一页了");
      } else {
        this.$router.push({
          "path": this.visitedViews[index + 1].path
        });
      }
    }
  }
};