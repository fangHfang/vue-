// 【数据报表】 一级菜单下的路由
export default [
  {
    "path": "/report/map",
    "component": () => import("@/views/report/index.vue"),
    "name": "reportMap",
    "meta": {
      "title": "门店地图",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/report/map/list",
        "component": () => import("@/views/report/map/list/index.vue"),
        "name": "reportMapList",
        "meta": {
          "title": "门店地图",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/report/map/detail/:id",
        "component": () => import("@/views/report/map/detail/index.vue"),
        "name": "reportMapDetail",
        "hidden": true,
        "meta": {
          "title": "分布销量详情",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/report/scan/code",
    "component": () => import("@/views/report/index.vue"),
    "name": "scan",
    "meta": {
      "title": "扫码记录",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/report/scan/code/list",
        "component": () => import("@/views/report/scan/code/list/index.vue"),
        "name": "scanCodeList",
        "meta": {
          "title": "扫码记录列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/report/scan/cycle/list",
        "component": () => import("@/views/report/scan/cycle/list/index.vue"),
        "name": "scanCycleList",
        "meta": {
          "title": "扫码异常记录表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/report/scan/cycle/product",
        "component": () => import("@/views/report/scan/cycle/product/index.vue"),
        "name": "scanCycleProduct",
        "hidden": true,
        "meta": {
          "title": "扫码周期查看商品列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/report/inch",
    "component": () => import("@/views/report/index.vue"),
    "name": "inch",
    "meta": {
      "title": "英寸别报表",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/report/inch/list",
        "component": () => import("@/views/report/inch/list/index.vue"),
        "name": "reportInchList",
        "meta": {
          "title": "英寸别报表列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/report/summary",
    "component": () => import("@/views/report/index.vue"),
    "name": "inch",
    "meta": {
      "title": "获利汇总",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/report/summary/rebate/list",
        "component": () => import("@/views/report/summary/rebate/list/index.vue"),
        "name": "businessSummaryRebateList",
        "meta": {
          "title": "获利汇总",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/report/summary/rebate/detail",
        "component": () => import("@/views/report/summary/rebate/detail/index.vue"),
        "name": "businessSummaryRebateDetail",
        "hidden": true,
        "meta": {
          "title": "获利明细",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  }
];
