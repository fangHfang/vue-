export default {
  "name": "Layout",
  "computed": {
    cachedViews() {
      /**
       * 这里的cachedViews对应layout一层级的路由，而我们页面普遍为三级路由，在每个文件夹下都有index.vue，
       * 想要该缓存生效需要在该页面设置keep-alive，并且给每个页面组件加上name，这样做的意义不大，不如采取
       * 路由的meta属性，默认缓存，不需要缓存的页面设置keepAlive:'no' ，例：编辑页面组件
       */
      return this.$store.state.tabsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};