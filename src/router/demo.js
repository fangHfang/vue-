// 【示例组件】 下的路由  ···注意：该路由不显示在菜单栏
export default [
  {
    "path": "/demo/table",
    "component": () => import("@/views/demo/table/index.vue"),
    "name": "demoTable",
    "meta": {
      "title": "表格",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    }
  }, {
    "path": "/demo/tabs",
    "component": () => import("@/views/demo/tabs/index.vue"),
    "name": "demoTabs",
    "meta": {
      "title": "选项卡",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    }
  }, {
    "path": "/demo/form",
    "component": () => import("@/views/demo/form/index.vue"),
    "name": "demoForm",
    "meta": {
      "title": "表单",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    }
  }, {
    "path": "/demo/treeTable",
    "component": () => import("@/views/demo/tree-table/index.vue"),
    "name": "demoTreeTable",
    "meta": {
      "title": "树表格",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    }
  }
];