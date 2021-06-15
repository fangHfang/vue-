// 固定路由
export default [
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
  }, {
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
  },
  {
    "path": "/business/rebate/detail/:customerNo/:debitNo",
    "component": () => import("@/views/business/rebate/detail/index.vue"),
    "name": "rebateDetail",
    "hidden": true,
    "meta": {
      "title": "门店返利列表详情",
      "icon": "",
      "keepAlive": "yes",
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
    "path": "/business/convert/store/detail",
    "component": () => import("@/views/business/convert/store/detail/index.vue"),
    "name": "convertStoreRuleDetail",
    "hidden": true,
    "meta": {
      "title": "门店兑换点详情",
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
      "keepAlive": "yes",
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    "path": "/product/base/group/relation/:id",
    "component": () => import("@/views/product/base/group/relation/index.vue"),
    "name": "goodsShopGroupRelation",
    "meta": {
      "title": "关联产品",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/manage/maxxis/detail/:id",
    "component": () => import("@/views/product/manage/maxxis/add/index.vue"),
    "name": "productMaxxisDetail",
    "meta": {
      "title": "玛吉斯商品详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/manage/maxxis/upShelf",
    "component": () => import("@/views/product/manage/maxxis/upShelf/index.vue"),
    "name": "productMaxxisUpShelf",
    "meta": {
      "title": "玛吉斯申请上架",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/manage/maxxis/upShelfTwo",
    "component": () => import("@/views/product/manage/maxxis/upShelfTwo/index.vue"),
    "name": "productMaxxisUpShelfTwo",
    "meta": {
      "title": "申请上架第二步",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/manage/nomaxxis/detail/:id",
    "component": () => import("@/views/product/manage/nomaxxis/add/index.vue"),
    "name": "productNoMaxxisDetail",
    "meta": {
      "title": "非玛吉斯商品详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/manage/nomaxxis/upShelf",
    "component": () => import("@/views/product/manage/nomaxxis/upShelf/index.vue"),
    "name": "productNoMaxxisUpShelf",
    "meta": {
      "title": "非玛吉斯申请上架",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/manage/nomaxxis/upShelfTwo",
    "component": () => import("@/views/product/manage/nomaxxis/upShelfTwo/index.vue"),
    "name": "productNoMaxxisUpShelfTwo",
    "meta": {
      "title": "申请上架第二步",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/activity/package/detail/:id",
    "component": () => import("@/views/product/activity/package/add/index.vue"),
    "name": "activityPackageDetail",
    "meta": {
      "title": "套餐商品详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    },
    "hidden": true
  },
  {
    "path": "/product/activity/package/upShelf",
    "component": () => import("@/views/product/activity/package/upShelf/index.vue"),
    "name": "activityPackageupShelf",
    "hidden": true,
    "meta": {
      "title": "套餐商品申请上架",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/manage/examine/detail/:id",
    "component": () => import("@/views/product/manage/examine/detail/index.vue"),
    "name": "reviewDetails",
    "hidden": true,
    "meta": {
      "title": "审核详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/manage/order/detail",
    "component": () => import("@/views/product/manage/order/detail/index.vue"),
    "name": "orderDetails",
    "hidden": true,
    "meta": {
      "title": "订单详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/manage/return/detail",
    "component": () => import("@/views/product/manage/return/detail/index.vue"),
    "name": "returnDetails",
    "hidden": true,
    "meta": {
      "title": "退货详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/giftpack/register/detail/:id",
    "component": () => import("@/views/product/giftpack/register/add/index.vue"),
    "name": "giftpackRegisterDetail",
    "hidden": true,
    "meta": {
      "title": "注册礼包详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/giftpack/register/range/:id",
    "component": () => import("@/views/product/giftpack/register/range/index.vue"),
    "name": "giftpackRegisterRange",
    "hidden": true,
    "meta": {
      "title": "配置领取范围",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/activity/class/detail",
    "component": () => import("@/views/product/activity/class/detail/index.vue"),
    "name": "activityClassDetail",
    "hidden": true,
    "meta": {
      "title": "活动分类详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/activity/seckill/detail",
    "component": () => import("@/views/product/activity/seckill/detail/index.vue"),
    "name": "activitySeckillDetail",
    "hidden": true,
    "meta": {
      "title": "秒杀订单详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/activity/seckill/detail/:id",
    "component": () => import("@/views/product/activity/seckill/add/index.vue"),
    "name": "activitySeckillDetailId",
    "hidden": true,
    "meta": {
      "title": "秒杀活动详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/order/seckill/detail",
    "component": () => import("@/views/product/order/seckill/detail/index.vue"),
    "name": "seckillOrderDetail",
    "hidden": true,
    "meta": {
      "title": "秒杀活动订单详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/activity/limitedTimeSale/detail",
    "component": () => import("@/views/product/activity/limitedTimeSale/detail/index.vue"),
    "name": "limitedTimeSnapUpDetail",
    "hidden": true,
    "meta": {
      "title": "限时抢购活动订单详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/activity/limitedTimeSale/detail/:id",
    "component": () => import("@/views/product/activity/limitedTimeSale/add/index.vue"),
    "name": "limitedTimeSaleDetailId",
    "hidden": true,
    "meta": {
      "title": "限时抢购详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/activity/combination/detail",
    "component": () => import("@/views/product/activity/combination/detail/index.vue"),
    "name": "combinationDetail",
    "hidden": true,
    "meta": {
      "title": "商品组合活动订单详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  }, {
    "path": "/product/activity/combination/detail/:id",
    "component": () => import("@/views/product/activity/combination/add/index.vue"),
    "hidden": true,
    "name": "combinationDetailId",
    "meta": {
      "title": "商品组合活动详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/order/combination/detail",
    "component": () => import("@/views/product/order/combination/detail/index.vue"),
    "name": "combinationOrder",
    "hidden": true,
    "meta": {
      "title": "商品组合订单详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/order/limitedTimeSale/detail",
    "component": () => import("@/views/product/order/limitedTimeSale/detail/index.vue"),
    "name": "limitedTimeOrderDetail",
    "hidden": true,
    "meta": {
      "title": "限时抢购订单详情",
      "icon": "",
      "keepAlive": "no",
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
  },
  {
    "path": "/product/manage/package/detail",
    "component": () => import("@/views/product/manage/order/detail/index.vue"),
    "name": "orderPackageDetails",
    "hidden": true,
    "meta": {
      "title": "套餐商品订单详情",
      "icon": "",
      "keepAlive": "no",
      "activeMenu": null
    }
  },
  {
    "path": "/product/giftpack/register/detail/:id",
    "component": () => import("@/views/product/giftpack/register/add/index.vue"),
    "name": "giftpackRegisterDetail",
    "hidden": true,
    "meta": {
      "title": "注册礼包详情",
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
  },
  {
    "path": "/report/summary/rebate/detail",
    "component": () => import("@/views/report/summary/rebate/detail/index.vue"),
    "name": "businessSummaryRebateDetail",
    "hidden": true,
    "meta": {
      "title": "获利明细",
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
    "path": "/business/reconciliation/detail",
    "component": () => import("@/views/business/reconciliation/detail/index.vue"),
    "name": "reconciliationDetail",
    "meta": {
      "title": "对账明细",
      "icon": "",
      "keepAlive": "no",
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
  }
];
