// 【业务管理】 一级菜单下的路由
export default [
  {
    "path": "/business/reconciliation",
    "component": () => import("@/views/business/index.vue"),
    "name": "reconciliation",
    "meta": {
      "title": "核算对账",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/reconciliation/list",
        "component": () => import("@/views/business/reconciliation/list/index.vue"),
        "name": "reconciliationList",
        "meta": {
          "title": "核算对账",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reconciliation/detail",
        "component": () => import("@/views/business/reconciliation/detail/index.vue"),
        "name": "reconciliationDetail",
        "hidden": true,
        "meta": {
          "title": "对账明细",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/reassure",
    "component": () => import("@/views/business/index.vue"),
    "name": "reassure",
    "meta": {
      "title": "安心跑管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/reassure/range/list",
        "component": () => import("@/views/business/reassure/range/list/index.vue"),
        "name": "reassureRangeList",
        "meta": {
          "title": "安心跑范围设置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reassure/range/add",
        "component": () => import("@/views/business/reassure/range/add/index.vue"),
        "name": "reassureRangeAdd",
        "hidden": true,
        "meta": {
          "title": "添加安心跑",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reassure/range/rule",
        "component": () => import("@/views/business/reassure/range/rule/index.vue"),
        "name": "reassureRangeRule",
        "hidden": true,
        "meta": {
          "title": "选择规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reassure/order/list",
        "component": () => import("@/views/business/reassure/order/list/index.vue"),
        "name": "reassureOrderList",
        "meta": {
          "title": "安心跑订单管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reassure/rebate/list",
        "component": () => import("@/views/business/reassure/rebate/list/index.vue"),
        "name": "reassureRebateList",
        "meta": {
          "title": "安心跑返利管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reassure/noModel/list",
        "component": () => import("@/views/business/reassure/noModel/list/index.vue"),
        "name": "reassureNoModelList",
        "meta": {
          "title": "无车型安心跑审核",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reassure/tyre/list",
        "component": () => import("@/views/business/reassure/tyre/list/index.vue"),
        "name": "reassureTyreList",
        "meta": {
          "title": "轮胎换新订单表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/reassure/tyre/detail/:id",
        "component": () => import("@/views/business/reassure/tyre/detail/index.vue"),
        "name": "reassureTyreDetail",
        "hidden": true,
        "meta": {
          "title": "轮胎换新订单详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/message",
    "component": () => import("@/views/business/index.vue"),
    "name": "messageManagement",
    "meta": {
      "title": "消息管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/news/note/list",
        "component": () => import("@/views/business/news/note/list/index.vue"),
        "name": "shortMessage",
        "meta": {
          "title": "短信管理列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/news/note/add",
        "component": () => import("@/views/business/news/note/add/index.vue"),
        "name": "shortAddMessage",
        "hidden": true,
        "meta": {
          "title": "短信管理新增",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/news/APP/list",
        "component": () => import("@/views/business/news/APP/list/index.vue"),
        "name": "shortAppMessage",
        "meta": {
          "title": "APP消息管理列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/news/APP/add",
        "component": () => import("@/views/business/news/APP/add/index.vue"),
        "name": "shortAppAddMessage",
        "hidden": true,
        "meta": {
          "title": "APP消息管理新增",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/news/notice/list",
        "component": () => import("@/views/business/news/notice/list/index.vue"),
        "name": "noticeMessage",
        "meta": {
          "title": "门户公告管理列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/news/notice/add",
        "component": () => import("@/views/business/news/notice/add/index.vue"),
        "name": "noticeAddMessage",
        "hidden": true,
        "meta": {
          "title": "门户公告管理新增",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/business/distributor",
    "component": () => import("@/views/business/index.vue"),
    "name": "businessDistributor",
    "meta": {
      "title": "经销商库存管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/distributor/stock/list",
        "component": () => import("@/views/business/distributor/stock/list/index.vue"),
        "name": "businessDistributorStock",
        "meta": {
          "title": "经销商商品库存",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/stock/detail/:id",
        "component": () => import("@/views/business/distributor/stock/detail/index.vue"),
        "name": "businessDistributorStockDetail",
        "hidden": true,
        "meta": {
          "title": "经销商商品库存详情",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/inbound/list",
        "component": () => import("@/views/business/distributor/inbound/list/index.vue"),
        "name": "businessDistributorInbound",
        "meta": {
          "title": "经销商商品入库",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/inbound/add",
        "component": () => import("@/views/business/distributor/inbound/add/index.vue"),
        "name": "businessDistributorInboundAdd",
        "hidden": true,
        "meta": {
          "title": "手动入库",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/inbound/addTwo",
        "component": () => import("@/views/business/distributor/inbound/addTwo/index.vue"),
        "name": "businessDistributorInboundAddTwo",
        "hidden": true,
        "meta": {
          "title": "选择产品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/inbound/detail",
        "component": () => import("@/views/business/distributor/inbound/detail/index.vue"),
        "name": "businessDistributorInboundDetail",
        "hidden": true,
        "meta": {
          "title": "经销商商品入库详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/outbound/list",
        "component": () => import("@/views/business/distributor/outbound/list/index.vue"),
        "name": "businessDistributorOutbound",
        "meta": {
          "title": "经销商商品出库",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/outbound/add",
        "component": () => import("@/views/business/distributor/outbound/add/index.vue"),
        "name": "businessDistributorOutboundAdd",
        "hidden": true,
        "meta": {
          "title": "手动出库",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/outbound/addTwo",
        "component": () => import("@/views/business/distributor/outbound/addTwo/index.vue"),
        "name": "businessDistributorOutboundAddTwo",
        "hidden": true,
        "meta": {
          "title": "选择产品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/distributor/outbound/detail",
        "component": () => import("@/views/business/distributor/outbound/detail/index.vue"),
        "name": "businessDistributorOutboundDetail",
        "hidden": true,
        "meta": {
          "title": "经销商商品出库详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/repository",
    "component": () => import("@/views/business/index.vue"),
    "name": "repository",
    "meta": {
      "title": "知识库管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/repository/info/list",
        "component": () => import("@/views/business/repository/info/list/index.vue"),
        "name": "repositoryInfoList",
        "meta": {
          "title": "资讯管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/info/add",
        "component": () => import("@/views/business/repository/info/add/index.vue"),
        "name": "repositoryInfoAdd",
        "hidden": true,
        "meta": {
          "title": "新增资讯",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/info/edit/:id",
        "component": () => import("@/views/business/repository/info/add/index.vue"),
        "name": "repositoryInfoEdit",
        "hidden": true,
        "meta": {
          "title": "编辑资讯",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/info/detail/:id",
        "component": () => import("@/views/business/repository/info/detail/index.vue"),
        "name": "repositoryInfoDetail",
        "hidden": true,
        "meta": {
          "title": "资讯详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/store/:id",
        "component": () => import("@/views/business/repository/store/index.vue"),
        "name": "repositoryStore",
        "hidden": true,
        "meta": {
          "title": "配置门店权限",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/comment/list",
        "component": () => import("@/views/business/repository/comment/list/index.vue"),
        "name": "commentManageList",
        "meta": {
          "title": "评论管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/comment/detail/:id",
        "component": () => import("@/views/business/repository/comment/detail/index.vue"),
        "hidden": true,
        "name": "commentManageDetail",
        "meta": {
          "title": "评论管理详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/forum/list",
        "component": () => import("@/views/business/repository/forum/list/index.vue"),
        "name": "forumManageList",
        "meta": {
          "title": "论坛管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/forum/add",
        "component": () => import("@/views/business/repository/forum/add/index.vue"),
        "name": "forumManageAdd",
        "hidden": true,
        "meta": {
          "title": "新增帖子",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/forum/edit/:id",
        "component": () => import("@/views/business/repository/forum/add/index.vue"),
        "name": "forumManageEdit",
        "hidden": true,
        "meta": {
          "title": "编辑帖子",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/forum/detail/:id",
        "component": () => import("@/views/business/repository/forum/detail/index.vue"),
        "name": "forumManageDetail",
        "hidden": true,
        "meta": {
          "title": "发帖详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/forum/approval/list",
        "component": () => import("@/views/business/repository/forum/approval/list/index.vue"),
        "name": "forumApprovalList",
        "meta": {
          "title": "审批论坛帖",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/repository/forum/approval/detail/:id",
        "component": () => import("@/views/business/repository/forum/approval/detail/index.vue"),
        "name": "forumApprovalDetail",
        "hidden": true,
        "meta": {
          "title": "审批",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/sign",
    "component": () => import("@/views/business/index.vue"),
    "name": "sign",
    "meta": {
      "title": "签到管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/sign/rule/list",
        "component": () => import("@/views/business/sign/rule/list/index.vue"),
        "name": "signRuleList",
        "meta": {
          "title": "签到规则",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/sign/rule/add",
        "component": () => import("@/views/business/sign/rule/add/index.vue"),
        "name": "signRuleAdd",
        "hidden": true,
        "meta": {
          "title": "新增签到规则",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/sign/rule/store/:ruleNo",
        "component": () => import("@/views/business/sign/rule/store/index.vue"),
        "name": "signRuleStore",
        "hidden": true,
        "meta": {
          "title": "配置门店权限",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/sign/rule/detail/:ruleNo",
        "component": () => import("@/views/business/sign/rule/detail/index.vue"),
        "name": "businessSignRuleDetail",
        "hidden": true,
        "meta": {
          "title": "签到规则详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/sign/list",
        "component": () => import("@/views/business/sign/list/index.vue"),
        "name": "signList",
        "meta": {
          "title": "签到记录列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/sign/detail",
        "component": () => import("@/views/business/sign/detail/index.vue"),
        "name": "signListDetail",
        "hidden": true,
        "meta": {
          "title": "签到记录列表详情",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/inspection",
    "component": () => import("@/views/business/index.vue"),
    "name": "inspection",
    "meta": {
      "title": "店检管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/inspection/setUp/list",
        "component": () => import("@/views/business/inspection/setUp/list/index.vue"),
        "name": "inspectionSetUpList",
        "meta": {
          "title": "店检设置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/inspection/setUp/add",
        "component": () => import("@/views/business/inspection/setUp/add/index.vue"),
        "name": "inspectionSetUpAdd",
        "hidden": true,
        "meta": {
          "title": "新增店检规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/inspection/setUp/edit",
        "component": () => import("@/views/business/inspection/setUp/add/index.vue"),
        "name": "inspectionSetUpEdit",
        "hidden": true,
        "meta": {
          "title": "编辑店检规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/inspection/setUp/store/:id",
        "component": () => import("@/views/business/inspection/setUp/store/index.vue"),
        "name": "inspectionSetUpStore",
        "hidden": true,
        "meta": {
          "title": "店检-配置门店",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/inspection/audit/list",
        "component": () => import("@/views/business/inspection/audit/list/index.vue"),
        "name": "inspectionAuditList",
        "meta": {
          "title": "店检审核",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/inspection/store/audit",
        "component": () => import("@/views/business/inspection/store/audit/index.vue"),
        "name": "inspectionStoreAudit",
        "hidden": true,
        "meta": {
          "title": "审核列表",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/inspection/store/detail",
        "component": () => import("@/views/business/inspection/store/detail/index.vue"),
        "name": "inspectionStoreDetail",
        "hidden": true,
        "meta": {
          "title": "店检审核详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/convert",
    "component": () => import("@/views/business/index.vue"),
    "name": "convert",
    "meta": {
      "title": "兑换点规则",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/convert/rule/list",
        "component": () => import("@/views/business/convert/rule/list/index.vue"),
        "name": "convertRuleList",
        "meta": {
          "title": "兑换点规则",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/convert/rule/add",
        "component": () => import("@/views/business/convert/rule/add/index.vue"),
        "name": "convertRuleAdd",
        "hidden": true,
        "meta": {
          "title": "编辑兑换点规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/convert/rule/commodity",
        "component": () => import("@/views/business/convert/rule/commodity/index.vue"),
        "name": "convertRuleCommodity",
        "hidden": true,
        "meta": {
          "title": "设置商品返利",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/convert/store/list",
        "component": () => import("@/views/business/convert/store/list/index.vue"),
        "name": "convertStoreRuleList",
        "meta": {
          "title": "门店兑换点规则",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/convert/store/detail",
        "component": () => import("@/views/business/convert/store/detail/index.vue"),
        "name": "convertStoreRuleDetail",
        "hidden": true,
        "meta": {
          "title": "门店兑换点详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/exchange",
        "component": () => import("@/views/business/coupon/exchange/index.vue"),
        "name": "businessCouponExchange",
        "meta": {
          "title": "兑换订单管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/detail",
        "component": () => import("@/views/business/coupon/detail/index.vue"),
        "name": "businessCouponDetail",
        "hidden": true,
        "meta": {
          "title": "兑换订单详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/rebate",
    "component": () => import("@/views/business/index.vue"),
    "name": "rebate",
    "meta": {
      "title": "返利管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/rebate/rule/list",
        "component": () => import("@/views/business/rebate/rule/list/index.vue"),
        "name": "rebateRuleList",
        "meta": {
          "title": "返利规则列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/rebate/rule/add",
        "component": () => import("@/views/business/rebate/rule/add/index.vue"),
        "name": "rebateRuleAdd",
        "hidden": true,
        "meta": {
          "title": "新增返利规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/rebate/rule/edit",
        "component": () => import("@/views/business/rebate/rule/add/index.vue"),
        "name": "rebateRuleEdit",
        "hidden": true,
        "meta": {
          "title": "编辑返利规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/rebate/store/list",
        "component": () => import("@/views/business/rebate/store/list/index.vue"),
        "name": "rebateStoreList",
        "meta": {
          "title": "门店返利管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/rebate/detail/:customerNo/:debitNo",
        "component": () => import("@/views/business/rebate/detail/index.vue"),
        "name": "rebateDetail",
        "hidden": true,
        "meta": {
          "title": "门店返利列表详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/coupon",
    "component": () => import("@/views/business/index.vue"),
    "name": "businessCoupon",
    "meta": {
      "title": "卡券管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/coupon/list",
        "component": () => import("@/views/business/coupon/list/index.vue"),
        "name": "businessCouponList",
        "meta": {
          "title": "卡券列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/add",
        "component": () => import("@/views/business/coupon/add/index.vue"),
        "name": "businessCouponAdd",
        "hidden": true,
        "meta": {
          "title": "卡券新增",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/receive",
        "component": () => import("@/views/business/coupon/receive/index.vue"),
        "name": "businessCouponReceive",
        "meta": {
          "title": "卡券领取记录",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/verify/list",
        "component": () => import("@/views/business/coupon/verify/list/index.vue"),
        "name": "businessCouponVerifyList",
        "meta": {
          "title": "卡券核销记录",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/store/list",
        "component": () => import("@/views/business/coupon/store/list/index.vue"),
        "name": "businessCouponStoreList",
        "meta": {
          "title": "卡券发放",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/select/list",
        "component": () => import("@/views/business/coupon/select/list/index.vue"),
        "name": "businessCouponSelectList",
        "hidden": true,
        "meta": {
          "title": "卡券发放优惠劵",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/grant/add",
        "component": () => import("@/views/business/coupon/grant/add/index.vue"),
        "name": "businessCouponGrantAdd",
        "hidden": true,
        "meta": {
          "title": "卡券发放领取规则",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/coupon/grant/list",
        "component": () => import("@/views/business/coupon/grant/list/index.vue"),
        "name": "businessCouponGrantList",
        "meta": {
          "title": "卡券发放记录",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/product/integral",
    "component": () => import("@/views/product/index.vue"),
    "name": "productIntegral",
    "meta": {
      "title": "积分系统管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/product/integral/store/list",
        "component": () => import("@/views/product/integral/store/list/index.vue"),
        "name": "productIntegralStoreList",
        "meta": {
          "title": "门店积分管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/integral/order/list",
        "component": () => import("@/views/product/integral/order/list/index.vue"),
        "name": "productIntegralOrderList",
        "meta": {
          "title": "积分订单",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/integral/order/detail",
        "component": () => import("@/views/product/integral/order/detail/index.vue"),
        "name": "productIntegralOrderDetail",
        "hidden": true,
        "meta": {
          "title": "积分商品订单详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }, {
        "path": "/product/integral/goods/list",
        "component": () => import("@/views/product/integral/goods/list/index.vue"),
        "name": "productIntegralGoodsList",
        "meta": {
          "title": "积分商品管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
        "path": "/product/rule/list",
        "component": () => import("@/views/product/rule/list/index.vue"),
        "name": "productRuleList",
        "meta": {
          "title": "积分规则",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
        "path": "/product/rule/add",
        "component": () => import("@/views/product/rule/add/index.vue"),
        "name": "productRuleAdd",
        "hidden": true,
        "meta": {
          "title": "积分规则修改",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }, {
        "path": "/product/expire/list",
        "component": () => import("@/views/product/expire/list/index.vue"),
        "name": "productExpireList",
        "meta": {
          "title": "门店到期积分表",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/product/expire/detail",
        "component": () => import("@/views/product/expire/detail/index.vue"),
        "name": "productExpireListDetail",
        "hidden": true,
        "meta": {
          "title": "通知记录详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }, {
        "path": "/product/integral/goods/add",
        "component": () => import("@/views/product/integral/goods/add/index.vue"),
        "name": "productIntegralGoodsAdd",
        "hidden": true,
        "meta": {
          "title": "添加商品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
        "path": "/product/integral/goods/edit/:id",
        "component": () => import("@/views/product/integral/goods/add/index.vue"),
        "name": "productIntegralGoodsEdit",
        "hidden": true,
        "meta": {
          "title": "编辑商品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
        "path": "/product/integral/goods/detail/:id",
        "component": () => import("@/views/product/integral/goods/add/index.vue"),
        "name": "productIntegralGoodsDetail",
        "hidden": true,
        "meta": {
          "title": "商品详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }, {
        "path": "/product/integral/goods/upShelf",
        "component": () => import("@/views/product/integral/goods/upShelf/index.vue"),
        "name": "productIntegralUpShelf",
        "hidden": true,
        "meta": {
          "title": "添加商品",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }, {
        "path": "/product/integral/goods/upShelfTwo",
        "component": () => import("@/views/product/integral/goods/upShelfTwo/index.vue"),
        "name": "productIntegralUpShelfTwo",
        "hidden": true,
        "meta": {
          "title": "添加商品",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/product/integral/store/detail",
        "component": () => import("@/views/product/integral/store/detail/index.vue"),
        "name": "productIntegralStoreDetail",
        "hidden": true,
        "meta": {
          "title": "门店积分详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/product/integral/rebate/detail",
        "component": () => import("@/views/product/integral/rebate/detail/index.vue"),
        "name": "productIntegralRebateDetail",
        "hidden": true,
        "meta": {
          "title": "积分阶梯规则详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/product/integral/rebate/add",
        "component": () => import("@/views/product/integral/rebate/add/index.vue"),
        "name": "productIntegralRebateAdd",
        "hidden": true,
        "meta": {
          "title": "新增积分阶梯规则",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/product/startpoint/list",
        "component": () => import("@/views/product/startpoint/list/index.vue"),
        "name": "productStartPointList",
        "meta": {
          "title": "起订分规则",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/startpoint/detail",
        "component": () => import("@/views/product/startpoint/detail/index.vue"),
        "name": "productStartPointDetail",
        "hidden": true,
        "meta": {
          "title": "起订分规则详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/business/signed/step/list",
    "component": () => import("@/views/business/index.vue"),
    "name": "businessSignedStepManage",
    "meta": {
      "title": "签约量管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/signed/step/list",
        "component": () => import("@/views/business/signed/step/list/index.vue"),
        "name": "businessSignedStepList",
        "meta": {
          "title": "签约量设置",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/signed/step/add",
        "component": () => import("@/views/business/signed/step/add/index.vue"),
        "name": "businessSignedStepAdd",
        "hidden": true,
        "meta": {
          "title": "编辑签约量设置",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/signed/approve/list",
        "component": () => import("@/views/business/signed/approve/list/index.vue"),
        "name": "businessSignedApproveList",
        "meta": {
          "title": "签约门店审批",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/signed/approve/detail",
        "component": () => import("@/views/business/signed/approve/detail/index.vue"),
        "name": "businessSignedApproveDetail",
        "hidden": true,
        "meta": {
          "title": "审批详情",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/business/signed/store/list",
        "component": () => import("@/views/business/signed/store/list/index.vue"),
        "name": "businessSignedStoreList",
        "meta": {
          "title": "门店签约列表",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/signed/store/detail",
        "component": () => import("@/views/business/signed/store/detail/index.vue"),
        "name": "businessSignedStoreDetail",
        "hidden": true,
        "meta": {
          "title": "门店签约列表详情",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/credit",
    "component": () => import("@/views/business/index.vue"),
    "name": "credit",
    "meta": {
      "title": "授信管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/business/credit/distributor/list",
        "component": () => import("@/views/business/credit/distributor/list/index.vue"),
        "name": "businessCreditDistributorList",
        "meta": {
          "title": "经销商额度",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/credit/distributor/record",
        "component": () => import("@/views/business/credit/distributor/record/index.vue"),
        "name": "businessCreditDistributorRecord",
        "hidden": true,
        "meta": {
          "title": "变更记录",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/credit/store/list",
        "component": () => import("@/views/business/credit/store/list/index.vue"),
        "name": "businessCreditStoreList",
        "meta": {
          "title": "门店额度",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/credit/store/list/bill",
        "component": () => import("@/views/business/credit/store/list/bill/index.vue"),
        "name": "businessCreditStoreBill",
        "hidden": true,
        "meta": {
          "title": "额度应收账单",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/business/credit/store/list/record",
        "component": () => import("@/views/business/credit/store/list/record/index.vue"),
        "name": "businessCreditStoreRecord",
        "hidden": true,
        "meta": {
          "title": "变更记录",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }

      }
    ]
  }
];
