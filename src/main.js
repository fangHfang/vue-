/**
 * 引入公共组件
 */
import Vue from "vue";
import Element from "element-ui";
import clipboard from "clipboard";

/**
 * 引入公共CSS以及全局Scss
 */
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/iconfont/iconfont.css";
import "@/assets/css/index.scss";

/**
 * 引入项目配置
 */
import directive from "./directive";
import utils from "./utils";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/**
 * 日期处理
 */
import moment from "moment";

/**
 * lodash 工具类库
 */
import _ from "lodash";

/**
 * 引入项目所有静态文案，并注入VUE对象
 */
import text from "@/assets/text";

/**
 * 前端工程自动化-优化组件的引用
 */
const context = require.context("@/components", true, /index.vue$/);
// context.keys()返回所有匹配的文件路径
context.keys().forEach(key => {
  const component = context(key).default;
  Vue.component(component.name, component);
});

Vue.prototype.$text = text;
Vue.prototype._ = _;
Vue.prototype.$moment = moment;
Vue.prototype.$clipboard = clipboard;

/**
 * 注册公共组件
 */
Vue.use(Element);

/**
 * 将所有util添加至Vue对象内，供页面直接调用
 */
Object.keys(utils).forEach(key => {
  Vue.prototype["$" + key] = utils[key];
});

/**
 * 注册所有自定义指令
 */
Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key]);
});

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

new Vue({
  "el": "#app",
  router,
  store,
  "render": h => h(App)
});
