// 【商城管理】 一级菜单下的路由
export default [
  {
    "path": "/product",
    "component": () => import("@/views/product/index.vue"),
    "name": "product",
    "meta": {
      "title": "商品基础管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/product/base/class",
        "component": () => import("@/views/product/base/class/index.vue"),
        "name": "shopType",
        "meta": {
          "title": "商城分类",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/base/group/list",
        "component": () => import("@/views/product/base/group/list/index.vue"),
        "name": "goodsShopGroup",
        "meta": {
          "title": "商品商城分组",
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
        "path": "/product/base/brand/list",
        "component": () => import("@/views/product/base/brand/list/index.vue"),
        "name": "productBrandList",
        "meta": {
          "title": "商品品牌",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        },
        "children": [
          {
            "path": "/product/base/brand/add",
            "component": () => import("@/views/product/base/brand/add/index.vue"),
            "name": "commodityBrandForm",
            "hidden": true,
            "meta": {
              "title": "品牌新增",
              "icon": "",
              "keepAlive": "yes",
              "activeMenu": null
            }
          }
        ]
      },
      {
        "path": "/product/base/spec/list",
        "component": () => import("@/views/product/base/specs/list/index.vue"),
        "name": "specsList",
        "meta": {
          "title": "商品规格",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        },
        "children": [
          {
            "path": "/product/base/spec/add",
            "component": () => import("@/views/product/base/specs/add/index.vue"),
            "name": "specsAdd",
            "hidden": true,
            "meta": {
              "title": "规格新增",
              "icon": "",
              "keepAlive": "yes",
              "activeMenu": null
            }
          }
        ]
      },
      {
        "path": "/product/manage/maxxis/list",
        "component": () => import("@/views/product/manage/maxxis/list/index.vue"),
        "name": "productMaxxisList",
        "meta": {
          "title": "玛吉斯商品管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/manage/maxxis/add",
        "component": () => import("@/views/product/manage/maxxis/add/index.vue"),
        "name": "productMaxxisAdd",
        "meta": {
          "title": "玛吉斯新增商品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        },
        "hidden": true
      },
      {
        "path": "/product/manage/maxxis/edit/:id",
        "component": () => import("@/views/product/manage/maxxis/add/index.vue"),
        "name": "productMaxxisEdit",
        "meta": {
          "title": "玛吉斯编辑商品",
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
          "keepAlive": "yes",
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
        "path": "/product/manage/nomaxxis/list",
        "component": () => import("@/views/product/manage/nomaxxis/list/index.vue"),
        "name": "productNoMaxxisList",
        "meta": {
          "title": "非玛吉斯商品管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/manage/nomaxxis/add",
        "component": () => import("@/views/product/manage/nomaxxis/add/index.vue"),
        "name": "productNoMaxxisAdd",
        "meta": {
          "title": "非玛吉斯新增商品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        },
        "hidden": true
      },
      {
        "path": "/product/manage/nomaxxis/edit/:id",
        "component": () => import("@/views/product/manage/nomaxxis/add/index.vue"),
        "name": "productNoMaxxisEdit",
        "meta": {
          "title": "非玛吉斯编辑商品",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/activity/package/list",
        "component": () => import("@/views/product/activity/package/list/index.vue"),
        "name": "activityPackageList",
        "meta": {
          "title": "套餐商品管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/package/add",
        "component": () => import("@/views/product/activity/package/add/index.vue"),
        "name": "activityPackageAdd",
        "hidden": true,
        "meta": {
          "title": "套餐商品新增",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/package/edit/:id",
        "component": () => import("@/views/product/activity/package/add/index.vue"),
        "name": "activityPackageEdit",
        "meta": {
          "title": "编辑套餐商品",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        },
        "hidden": true
      },
      {
        "path": "/product/activity/package/copy/:id",
        "component": () => import("@/views/product/activity/package/add/index.vue"),
        "name": "activityPackageCopy",
        "meta": {
          "title": "复制套餐商品",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/manage/examine/list",
        "component": () => import("@/views/product/manage/examine/list/index.vue"),
        "name": "productExamine",
        "meta": {
          "title": "商品审核",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/manage/order/list",
        "component": () => import("@/views/product/manage/order/list/index.vue"),
        "name": "orderList",
        "meta": {
          "title": "商品订单",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/manage/package/list",
        "component": () => import("@/views/product/manage/package/list/index.vue"),
        "name": "orderPackageList",
        "meta": {
          "title": "套餐商品订单",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/manage/package/detail",
        "component": () => import("@/views/product/manage/package/detail/index.vue"),
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
        "path": "/product/manage/return/list",
        "component": () => import("@/views/product/manage/return/list/index.vue"),
        "name": "return",
        "meta": {
          "title": "退货管理",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/manage/outStock",
        "component": () => import("@/views/product/manage/outStock/index.vue"),
        "name": "outStock",
        "meta": {
          "title": "缺货管理",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/manage/restrictions/list",
        "component": () => import("@/views/product/manage/restrictions/list/index.vue"),
        "name": "restrictionsList",
        "meta": {
          "title": "商品限购",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/activity",
    "component": () => import("@/views/product/index.vue"),
    "name": "activity",
    "meta": {
      "title": "活动管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/product/giftpack/register/list",
        "component": () => import("@/views/product/giftpack/register/list/index.vue"),
        "name": "giftpackRegister",
        "meta": {
          "title": "新店注册礼包",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/giftpack/register/add",
        "component": () => import("@/views/product/giftpack/register/add/index.vue"),
        "name": "giftpackRegisterAdd",
        "hidden": true,
        "meta": {
          "title": "新增注册礼包",
          "icon": "",
          "keepAlive": "no",
          "activeMenu": null
        }
      },
      {
        "path": "/product/giftpack/register/edit/:id",
        "component": () => import("@/views/product/giftpack/register/add/index.vue"),
        "name": "giftpackRegisterEdit",
        "hidden": true,
        "meta": {
          "title": "编辑注册礼包",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/giftpack/record/list",
        "component": () => import("@/views/product/giftpack/record/list/index.vue"),
        "name": "giftpackRegisterRecord",
        "meta": {
          "title": "礼包记录",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/limitedTimeSale/list",
        "component": () => import("@/views/product/activity/limitedTimeSale/list/index.vue"),
        "name": "limitedTimeSaleLater",
        "meta": {
          "title": "限时抢购活动",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/limitedTimeSale/add",
        "component": () => import("@/views/product/activity/limitedTimeSale/add/index.vue"),
        "name": "limitedTimeSaleAdd",
        "hidden": true,
        "meta": {
          "title": "新增限时抢购",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/activity/limitedTimeSale/edit/:id",
        "component": () => import("@/views/product/activity/limitedTimeSale/add/index.vue"),
        "name": "limitedTimeSaleEdit",
        "hidden": true,
        "meta": {
          "title": "编辑限时抢购",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/limitedTimeSale/copy/:id",
        "component": () => import("@/views/product/activity/limitedTimeSale/add/index.vue"),
        "name": "limitedTimeSaleCopy",
        "hidden": true,
        "meta": {
          "title": "复制限时抢购",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/combination/list",
        "component": () => import("@/views/product/activity/combination/list/index.vue"),
        "name": "combinationList",
        "meta": {
          "title": "商品组合活动",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
        "path": "/product/activity/combination/add",
        "component": () => import("@/views/product/activity/combination/add/index.vue"),
        "hidden": true,
        "name": "combinationAdd",
        "meta": {
          "title": "商品组合活动新增",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
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
      }, {
        "path": "/product/activity/combination/edit/:id",
        "component": () => import("@/views/product/activity/combination/add/index.vue"),
        "hidden": true,
        "name": "combinationEdit",
        "meta": {
          "title": "编辑商品组合活动",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }, {
        "path": "/product/activity/combination/copy/:id",
        "component": () => import("@/views/product/activity/combination/add/index.vue"),
        "hidden": true,
        "name": "combinationCopy",
        "meta": {
          "title": "复制商品组合活动",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/class/list",
        "component": () => import("@/views/product/activity/class/list/index.vue"),
        "name": "activityClassList",
        "meta": {
          "title": "活动分类管理",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/activity/seckill/list",
        "component": () => import("@/views/product/activity/seckill/list/index.vue"),
        "name": "activitySeckillList",
        "meta": {
          "title": "秒杀活动管理",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/activity/seckill/add",
        "component": () => import("@/views/product/activity/seckill/add/index.vue"),
        "name": "activitySeckillAdd",
        "hidden": true,
        "meta": {
          "title": "新增秒杀活动",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/activity/seckill/edit/:id",
        "component": () => import("@/views/product/activity/seckill/add/index.vue"),
        "name": "activitySeckillEdit",
        "hidden": true,
        "meta": {
          "title": "编辑秒杀活动",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/seckill/copy/:id",
        "component": () => import("@/views/product/activity/seckill/add/index.vue"),
        "name": "activitySeckillCopy",
        "hidden": true,
        "meta": {
          "title": "复制秒杀活动",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      },
      {
        "path": "/product/activity/seckill/store/set/:id",
        "component": () => import("@/views/product/activity/seckill/store/list/index.vue"),
        "name": "activitySeckillStoreList",
        "hidden": true,
        "meta": {
          "title": "配置门店权限",
          "icon": "",
          "keepAlive": "yes",
          "activeMenu": null
        }
      }
    ]
  },
  {
    "path": "/order",
    "component": () => import("@/views/product/index.vue"),
    "name": "order",
    "meta": {
      "title": "活动订单管理",
      "icon": "",
      "keepAlive": "yes",
      "activeMenu": null
    },
    "children": [
      {
        "path": "/product/order/seckill/list",
        "component": () => import("@/views/product/order/seckill/list/index.vue"),
        "name": "seckillOrderList",
        "meta": {
          "title": "秒杀活动订单",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/order/combination/list",
        "component": () => import("@/views/product/order/combination/list/index.vue"),
        "name": "goodsOrder",
        "meta": {
          "title": "商品组合订单",
          "icon": "",
          "keepAlive": "yes",
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
        "path": "/product/order/limitedTimeSale/list",
        "component": () => import("@/views/product/order/limitedTimeSale/list/index.vue"),
        "name": "limitedTimeOrderList",
        "meta": {
          "title": "限时抢购订单",
          "icon": "",
          "keepAlive": "yes",
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
      }
      // {
      //   "path": "/product/order/package/list",
      //   "component": () => import("@/views/product/order/package/list/index.vue"),
      //   "name": "packageOrderList",
      //   "hidden": true,
      //   "meta": {
      //     "title": "套餐活动订单",
      //     "icon": "",
      //     "keepAlive": "yes",
      //     "activeMenu": null
      //   }
      // },
      // {
      //   "path": "/product/order/package/detail",
      //   "component": () => import("@/views/product/order/package/detail/index.vue"),
      //   "name": "packageOrderDetail",
      //   "hidden": true,
      //   "meta": {
      //     "title": "套餐商品订单详情",
      //     "icon": "",
      //     "keepAlive": "no",
      //     "activeMenu": null
      //   }
      // }
    ]
  }
];
