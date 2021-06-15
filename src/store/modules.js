// 布局
import container from "@/container/store";
// 页签
import tabbar from "@/container/components/tabbar/store";
// 导航
import navbar from "@/container/components/navbar/store";
// 首页
import home from "@/views/home/store";
// 登录 用户信息
import login from "@/views/login/store";
// 实例
import demoTable from "@/views/demo/table/store";
import demoTabs from "@/views/demo/tabs/store";
// 店检设置
import inspectionSetUp from "@/views/business/inspection/setUp/list/store";
// 店检审核
import inspectionAudit from "@/views/business/inspection/audit/list/store";
// 店检审核
import inspectionStoreAudit from "@/views/business/inspection/store/audit/store";
// 总部帐号
import systemAccount from "@/views/system/account/list/store";
// 门店
import storeInfo from "@/views/downstream/store/info/list/store";
// 门店帐号
import storeAccount from "@/views/downstream/store/account/list/store";
// 经销商
import dealerInfo from "@/views/downstream/dealer/info/list/store";
// 经销商帐号
import dealerAccount from "@/views/downstream/dealer/account/list/store";
// 门店积分管理
import productIntegralStore from "@/views/product/integral/store/list/store";
// 活动管理
import activityClass from "@/views/product/activity/class/list/store";
// 版本管理
import systemOtherVersion from "@/views/system/other/version/list/store";
// 门店返利
import businessRebateRuleListMain from "@/views/business/rebate/rule/list/main/store";
// 门店积分规则
import marketRebateRuleListMain from "@/views/product/rule/list/main/store";
// 兑换点规则
import convertRuleListProductOrder from "@/views/business/convert/rule/list/productOrder/store";
// 通知信息管理
import productExpireListDetail from "@/views/product/expire/detail/store";
// 门店兑换点
import convertStoreRuleList from "@/views/business/convert/store/list/store";
// 区域管理
import systemAreaRegion from "@/views/system/area/region/list/store";
// 库存显示规则
import systemOtherStock from "@/views/system/other/stock/list/store";
// 门店定位审批
import storeLocationApproval from "@/views/downstream/store/approval/list/store";
// 门店定位审批
import productStartPoint from "@/views/product/startpoint/list/store";
// 核算对账
import reconciliationSetList from "@/views/business/reconciliation/list/main/store.js";
import businessSummaryRebateList from "@/views/report/summary/rebate/list/store.js";
// 门店性质变更记录
import storeInfoChange from "@/views/downstream/store/info/change/store.js";

/**
 * 模块状态集合
 */
export default {
  login,
  container,
  tabbar,
  navbar,
  home,
  demoTable,
  demoTabs,
  inspectionSetUp,
  inspectionAudit,
  inspectionStoreAudit,
  storeInfo,
  systemAccount,
  dealerInfo,
  storeAccount,
  dealerAccount,
  productIntegralStore,
  activityClass,
  systemOtherVersion,
  businessRebateRuleListMain,
  marketRebateRuleListMain,
  convertRuleListProductOrder,
  productExpireListDetail,
  convertStoreRuleList,
  systemAreaRegion,
  systemOtherStock,
  storeLocationApproval,
  productStartPoint,
  reconciliationSetList,
  businessSummaryRebateList,
  storeInfoChange
};
