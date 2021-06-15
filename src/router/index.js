import Vue from "vue";
import Router from "vue-router";
import store from "../store";
// 布局组件
import Container from "@/container/index.vue";
// 基础数据
import system from "./system";
// 业务管理
import business from "./business";
// 下游管理
import downstream from "./downstream";
// 商城管理
import product from "./product";
// 数据报表
import report from "./report";
// 示例组件
import demo from "./demo";

Vue.use(Router);

/**
 * 获取随机路径
 * @returns {string}
 */
function getRandomPath() {
  const random = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return "/abcd" + random.toString(36).replace(/[^a-zA-Z]/g, "");
}
/**
 * 路由集合
 * @type {*[]}
 */
export const constantRoutes = [
  // 登录
  {
    "path": "/login",
    "name": "login",
    "hidden": true,
    "component": () => import("@/views/login/index.vue")
  },
  // 首页
  {
    "path": "/",
    "component": Container,
    "redirect": "/home",
    "hidden": true,
    "children": [
      {
        "path": "/home",
        "component": () => import("@/views/home/index.vue"),
        "name": "Home",
        "hidden": true,
        "meta": {
          "title": "首页",
          "affix": true,
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  // 示例组件 ---不显示在菜单栏
  {
    "path": "/demo",
    "component": Container,
    "redirect": "/demo/table",
    "hidden": true,
    "children": demo
  }
];

// 其他路由，排在所有路由最后
export const otherRoutes = [
  // 其它
  {
    "path": "*",
    "redirect": "/home",
    "hidden": true
  }
];

export const mainRoutes = [
  // 基础数据
  {
    "path": "/systemOpt",
    "component": Container,
    "depth": 1,
    "meta": {
      "title": "基础数据",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": system
  },
  // 业务管理
  {
    "path": "/businessOpt",
    "component": Container,
    "depth": 1,
    "meta": {
      "title": "业务管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": business
  },
  // 下游管理
  {
    "path": "/downstreamOpt",
    "component": Container,
    "depth": 1,
    "meta": {
      "title": "下游管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": downstream
  },
  // 商城管理
  {
    "path": "/productOpt",
    "component": Container,
    "depth": 1,
    "meta": {
      "title": "商城管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": product
  },
  // 数据报表
  {
    "path": "/reportOpt",
    "component": Container,
    "depth": 1,
    "meta": {
      "title": "数据报表",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": report
  }
];

const createRouter = () => new Router({
  "mode": "hash",
  "base": process.env.BASE_URL,
  "scrollBehavior": () => ({ "y": 0 }),
  "routes": constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
/**
 * 路由跳转之前拦截
 * @param to
 * @param from
 * @param next
 */
const whiteList = [ "/login", "/401", "/404" ];
let flag = 0; // 刷新判断
router.beforeEach(async (to, from, next) => {
  // determine if there has token
  if (store.state.token) {
    /* has token */
    if (to.path === "/login") {
      next({ "path": "/" });
    } else {
      if (flag === 0) {
        flag++;
        if (from.path === "/login") {
          next();
        } else {
          await store.dispatch("login/getMenuList");
          setTimeout(() => {
            next({ ...to, "replace": true });
          }, 200);
        }
      } else {
        next();
      }
    }
  } else {
    /* has no token */
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
