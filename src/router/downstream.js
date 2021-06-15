// 【下游管理】 一级菜单下的路由
export default [
  {
    "path": "/store",
    "component": () => import("@/views/downstream/index.vue"),
    "name": "store",
    "meta": {
      "title": "门店管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/downstream/store/account/list",
        "component": () => import("@/views/downstream/store/account/list/index.vue"),
        "name": "storeAccountList",
        "meta": {
          "title": "门店账号管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/account/add",
        "component": () => import("@/views/downstream/store/account/add/index.vue"),
        "name": "storeAccountAdd",
        "hidden": true,
        "meta": {
          "title": "门店账号新增",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/account/role/config",
        "component": () => import("@/views/downstream/store/account/role/index.vue"),
        "name": "storeRoleConfig",
        "hidden": true,
        "meta": {
          "title": "配置角色",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/account/detail",
        "component": () => import("@/views/downstream/store/account/detail/index.vue"),
        "name": "storeAccountDetail",
        "hidden": true,
        "meta": {
          "title": "门店账号详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/accountApproval/list",
        "component": () => import("@/views/downstream/store/accountApproval/list/index.vue"),
        "name": "storeaccountApprovalList",
        "meta": {
          "title": "门店信息审批",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/accountApproval/detail",
        "component": () => import("@/views/downstream/store/accountApproval/detail/index.vue"),
        "name": "storeaccountApprovalDetail",
        "hidden": true,
        "meta": {
          "title": "门店账号审批详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/info/list",
        "component": () => import("@/views/downstream/store/info/list/index.vue"),
        "name": "storeInfoList",
        "meta": {
          "title": "门店信息管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/info/add",
        "component": () => import("@/views/downstream/store/info/add/index.vue"),
        "name": "storeInfoAdd",
        "hidden": true,
        "meta": {
          "title": "新增门店信息",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/info/change",
        "component": () => import("@/views/downstream/store/info/change/index.vue"),
        "name": "storeInfoChange",
        "hidden": true,
        "meta": {
          "title": "门店性质变更记录",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/location/list",
        "component": () => import("@/views/downstream/store/location/list/index.vue"),
        "name": "storeLocationList",
        "meta": {
          "title": "门店定位管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/approval/list",
        "component": () => import("@/views/downstream/store/approval/list/index.vue"),
        "name": "storeApprovalList",
        "meta": {
          "title": "门店定位审批",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/approval/detail",
        "component": () => import("@/views/downstream/store/approval/detail/index.vue"),
        "name": "storeApprovalDetail",
        "hidden": true,
        "meta": {
          "title": "定位审批详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/store/phone/code",
        "component": () => import("@/views/downstream/store/phone/index.vue"),
        "name": "storePhone",
        "meta": {
          "title": "手机验证码维护",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/dealer",
    "component": () => import("@/views/downstream/index.vue"),
    "name": "dealer",
    "meta": {
      "title": "经销商管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/downstream/dealer/account/list",
        "component": () => import("@/views/downstream/dealer/account/list/index.vue"),
        "name": "dealerAccountList",
        "meta": {
          "title": "经销商账号管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/account/add",
        "component": () => import("@/views/downstream/dealer/account/add/index.vue"),
        "name": "dealerAccountAdd",
        "hidden": true,
        "meta": {
          "title": "经销商账号新增",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/account/role/config",
        "component": () => import("@/views/downstream/dealer/account/role/index.vue"),
        "name": "dealerRoleConfig",
        "hidden": true,
        "meta": {
          "title": "配置角色",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/account/detail",
        "component": () => import("@/views/downstream/dealer/account/detail/index.vue"),
        "name": "dealerAccountDetail",
        "hidden": true,
        "meta": {
          "title": "经销商账号详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/info/list",
        "component": () => import("@/views/downstream/dealer/info/list/index.vue"),
        "name": "dealerInfoList",
        "meta": {
          "title": "经销商信息管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/info/add",
        "component": () => import("@/views/downstream/dealer/info/add/index.vue"),
        "name": "dealerInfoAdd",
        "hidden": true,
        "meta": {
          "title": "新增经销商信息",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/accountInfo/list",
        "component": () => import("@/views/downstream/dealer/accountInfo/list/index.vue"),
        "name": "dealerAccountInfoList",
        "meta": {
          "title": "账户信息",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/accountInfo/withdrawalAudit",
        "component": () => import("@/views/downstream/dealer/accountInfo/withdrawalAudit/index.vue"),
        "name": "dealerWithdrawalAudit",
        "hidden": true,
        "meta": {
          "title": "提现审核",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/accountInfo/withdrawalRecord",
        "component": () => import("@/views/downstream/dealer/accountInfo/withdrawalRecord/index.vue"),
        "name": "dealerWithdrawalRecord",
        "hidden": true,
        "meta": {
          "title": "提现记录",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/accountInfo/frozenDetails",
        "component": () => import("@/views/downstream/dealer/accountInfo/frozenDetails/index.vue"),
        "name": "dealerFrozenDetails",
        "hidden": true,
        "meta": {
          "title": "冻结明细",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/accountInfo/accountStatement",
        "component": () => import("@/views/downstream/dealer/accountInfo/accountStatement/index.vue"),
        "name": "dealerAccountStatement",
        "hidden": true,
        "meta": {
          "title": "对账单",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/dealer/accountInfo/associatedOrder",
        "component": () => import("@/views/downstream/dealer/accountInfo/associatedOrder/index.vue"),
        "name": "dealerAssociatedOrder",
        "hidden": true,
        "meta": {
          "title": "关联订单管理",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/customer",
    "component": () => import("@/views/downstream/index.vue"),
    "name": "customer",
    "meta": {
      "title": "客户管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/downstream/customer/customer/list",
        "component": () => import("@/views/downstream/customer/customer/list/index.vue"),
        "name": "customerList",
        "meta": {
          "title": "客户管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/customer/customer/add",
        "component": () => import("@/views/downstream/customer/customer/add/index.vue"),
        "name": "customerrAdd",
        "hidden": true,
        "meta": {
          "title": "新增客户",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/customer/customer/detail",
        "component": () => import("@/views/downstream/customer/customer/detail/index.vue"),
        "name": "customerDetail",
        "hidden": true,
        "meta": {
          "title": "客户详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/customer/customer/ownerDetail",
        "component": () => import("@/views/downstream/customer/customer/ownerDetail/index.vue"),
        "name": "customerOwnerDetail",
        "hidden": true,
        "meta": {
          "title": "车主详情",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/customer/vehicle/list",
        "component": () => import("@/views/downstream/customer/vehicle/list/index.vue"),
        "name": "customerVehicleList",
        "hidden": true,
        "meta": {
          "title": "车辆管理",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/customer/vehicle/add",
        "component": () => import("@/views/downstream/customer/vehicle/add/index.vue"),
        "name": "customerVehicleAdd",
        "hidden": true,
        "meta": {
          "title": "新增车辆",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/downstream/customer/vehicle/add",
        "component": () => import("@/views/downstream/customer/vehicle/add/index.vue"),
        "name": "customerVehicleDetail",
        "hidden": true,
        "meta": {
          "title": "车辆详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  }
];
