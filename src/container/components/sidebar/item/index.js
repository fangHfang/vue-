
export default {
  "name": "item",
  "props": {
    "item": {
      "type": Object,
      "required": true
    },
    "isNest": {
      "type": Boolean,
      "default": false
    },
    "basePath": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "onlyOneChild": null
    };
  },
  "computed": {
    // 已打开页签
    visitedViews() {
      return this.$store.state.tabbar.visitedViews;
    }
  },
  mounted() {
  },
  "methods": {
    /**
     * 只有一个子菜单
     * @param parent
     * @param children
     * @returns {boolean}
     */
    hasOneShowingChild(parent, children = []) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        }
        this.onlyOneChild = item;
        return true;
      });
      /*
       * 当某菜单下只有一个child时，直接显示该child （禁止）
       * if (showingChildren.length === 1) {
       *   return true
       * }
       */
      // 没有子菜单也显示父级
      if (showingChildren.length === 0 && parent.depth !== 1) {
        this.onlyOneChild = { ...parent, "noShowingChildren": true };
        return true;
      }

      return false;
    },
    routerToPath(route) {
      const realPath = route.redirect || route.path;
      // 查找元素 这里是想实现点击菜单（visitedViews里存在的）不刷新页面，但是涉及删除后重新打开是要刷新数据的
      const foundViewIndex = this.visitedViews.findIndex((v) => v.path === realPath);
      if (foundViewIndex !== -1) {
        this.$router.push(this.visitedViews[foundViewIndex]);
      } else {
        this.$router.push({ "path": realPath, "query": { "r": this.$getRandomValue() } });
      }
    }
  }
};