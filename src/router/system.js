// 【基础数据】 一级菜单下的路由
export default [
  {
    "path": "/area",
    "component": () => import("@/views/system/index.vue"),
    "name": "area",
    "meta": {
      "title": "地区管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/system/area/provinces",
        "component": () => import("@/views/system/area/provinces/index.vue"),
        "name": "regionCounty",
        "meta": {
          "title": "省市区管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/area/region/list",
        "component": () => import("@/views/system/area/region/list/index.vue"),
        "name": "areaRegionList",
        "meta": {
          "title": "区域管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/area/region/add",
        "component": () => import("@/views/system/area/region/plus/index.vue"),
        "name": "areaRegionAdd",
        "hidden": true,
        "meta": {
          "title": "新增区域",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/area/region/edit",
        "component": () => import("@/views/system/area/region/add/index.vue"),
        "name": "areaRegionEdit",
        "hidden": true,
        "meta": {
          "title": "编辑区域",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/area/region/detail",
        "component": () => import("@/views/system/area/region/add/index.vue"),
        "name": "areaRegionDetail",
        "hidden": true,
        "meta": {
          "title": "区域详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/account",
    "component": () => import("@/views/system/index.vue"),
    "name": "account",
    "meta": {
      "title": "账号管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/system/account/list",
        "component": () => import("@/views/system/account/list/index.vue"),
        "name": "accountList",
        "meta": {
          "title": "账号管理",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/account/add",
        "component": () => import("@/views/system/account/add/index.vue"),
        "name": "accountAdd",
        "hidden": true,
        "meta": {
          "title": "账号新增",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/account/role/config",
        "component": () => import("@/views/system/account/role/index.vue"),
        "name": "roleConfig",
        "hidden": true,
        "meta": {
          "title": "配置角色",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/account/detail",
        "component": () => import("@/views/system/account/detail/index.vue"),
        "name": "accountDetail",
        "hidden": true,
        "meta": {
          "title": "账号详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/structure",
    "component": () => import("@/views/system/index.vue"),
    "name": "structure",
    "meta": {
      "title": "组织权限",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/system/structure/role/list",
        "component": () => import("@/views/system/structure/role/list/index.vue"),
        "name": "structureRole",
        "meta": {
          "title": "角色管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
        "path": "/system/structure/list",
        "component": () => import("@/views/system/structure/list/index.vue"),
        "name": "structureList",
        "meta": {
          "title": "组织架构",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/app",
    "component": () => import("@/views/system/index.vue"),
    "name": "app",
    "meta": {
      "title": "APP页面管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/system/app/window/list",
        "component": () => import("@/views/system/app/window/list/index.vue"),
        "name": "windowList",
        "meta": {
          "title": "商品橱窗",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/window/add",
        "component": () => import("@/views/system/app/window/add/index.vue"),
        "name": "windowAdd",
        "hidden": true,
        "meta": {
          "title": "编辑商品橱窗",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/navigation/list",
        "component": () => import("@/views/system/app/navigation/list/index.vue"),
        "name": "navigationList",
        "meta": {
          "title": "子导航设置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/navigation/add/:pictureNo",
        "component": () => import("@/views/system/app/navigation/add/index.vue"),
        "name": "navigationAdd",
        "hidden": true,
        "meta": {
          "title": "编辑子导航设置",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/banner/list",
        "component": () => import("@/views/system/app/banner/list/index.vue"),
        "name": "bannerSetting",
        "meta": {
          "title": "横幅设置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/banner/add",
        "component": () => import("@/views/system/app/banner/add/index.vue"),
        "name": "systemAppBanner",
        "hidden": true,
        "meta": {
          "title": "编辑横幅设置",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/advertisement/list",
        "component": () => import("@/views/system/app/advertisement/list/index.vue"),
        "name": "advertisementList",
        "meta": {
          "title": "广告位配置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/advertisement/add/:pictureNo",
        "component": () => import("@/views/system/app/advertisement/add/index.vue"),
        "name": "advertisementSetting",
        "hidden": true,
        "meta": {
          "title": "编辑广告位配置",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/carousel/list",
        "component": () => import("@/views/system/app/carousel/list/index.vue"),
        "name": "carouselList",
        "meta": {
          "title": "轮播图设置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/carousel/add/:pictureNo",
        "component": () => import("@/views/system/app/carousel/add/index.vue"),
        "name": "carouselSetting",
        "hidden": true,
        "meta": {
          "title": "编辑轮播图设置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/app/store/list/:id",
        "component": () => import("@/views/system/app/store/list/index.vue"),
        "name": "storeSetList",
        "hidden": true,
        "meta": {
          "title": "配置门店权限",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/base",
    "component": () => import("@/views/system/index.vue"),
    "name": "baseProducts",
    "meta": {
      "title": "基础产品",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/system/base/barCode",
        "component": () => import("@/views/system/base/barCode/index.vue"),
        "name": "barCodeList",
        "meta": {
          "title": "产品条码",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/base/product",
        "component": () => import("@/views/system/base/product/index.vue"),
        "name": "basicProductsList",
        "meta": {
          "title": "基础产品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/other",
    "component": () => import("@/views/system/index.vue"),
    "name": "other",
    "meta": {
      "title": "其他设置",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/system/other/version/list",
        "component": () => import("@/views/system/other/version/list/index.vue"),
        "name": "versionManagementList",
        "meta": {
          "title": "版本管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/version/add",
        "component": () => import("@/views/system/other/version/add/index.vue"),
        "name": "versionManagementAdd",
        "hidden": true,
        "meta": {
          "title": "版本新增",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/pay",
        "component": () => import("@/views/system/other/pay/index.vue"),
        "name": "thirdPartyPay",
        "meta": {
          "title": "第三方支付",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/stock/list",
        "component": () => import("@/views/system/other/stock/list/index.vue"),
        "name": "stockList",
        "meta": {
          "title": "库存显示",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/stock/product/setup",
        "component": () => import("@/views/system/other/stock/product/setup/index.vue"),
        "name": "productSetUp",
        "hidden": true,
        "meta": {
          "title": "设置商品",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/stock/add",
        "component": () => import("@/views/system/other/stock/add/index.vue"),
        "name": "systemOtherStockAdd",
        "hidden": true,
        "meta": {
          "title": "新增库存显示规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/tag/list",
        "component": () => import("@/views/system/other/tag/list/index.vue"),
        "name": "tagList",
        "meta": {
          "title": "标签管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/tag/add",
        "component": () => import("@/views/system/other/tag/add/index.vue"),
        "name": "tagAdd",
        "hidden": true,
        "meta": {
          "title": "新增标签",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/tag/edit:id",
        "component": () => import("@/views/system/other/tag/add/index.vue"),
        "name": "editAdd",
        "hidden": true,
        "meta": {
          "title": "编辑标签",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/feedback",
        "component": () => import("@/views/system/other/feedback/index.vue"),
        "name": "feedbackList",
        "meta": {
          "title": "用户反馈",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/help/list",
        "component": () => import("@/views/system/other/help/list/index.vue"),
        "name": "helplist",
        "meta": {
          "title": "帮助中心",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/help/add",
        "component": () => import("@/views/system/other/help/add/index.vue"),
        "name": "helpadd",
        "hidden": true,
        "meta": {
          "title": "帮助中心新增",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/system/other/log",
        "component": () => import("@/views/system/other/log/index.vue"),
        "name": "logList",
        "meta": {
          "title": "账号操作日志",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  }
];
