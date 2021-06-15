import { get, post, put, del } from "@/utils/request";
import { MARKET_URL, USER_URL } from "@/utils/system-constant";

/**
 * 分页查询签约规则
 * @param params
 */
export const listScRuleByPage = (params) => {
  return get({
    "url": MARKET_URL + "/admin/scRule/page" + params,
    "data": {}
  });
};

/**
 * 创建签约
 */
export const scRuleCrete = (data) => {
  return post({
    "url": MARKET_URL + "/admin/scRule/create",
    data
  });
};

/**
 * 查询详情
 */
export const scRuleDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/scRule/detail?ruleNo=" + params,
    "data": {}
  });
};

/**
 * 修改
 */
export const scRuleModify = (data) => {
  return put({
    "url": MARKET_URL + "/admin/scRule/modify",
    data
  });
};

/**
 * 创建门店签约
 */
export const scStoreCrete = (data) => {
  return post({
    "url": MARKET_URL + "/admin/scStore/create",
    data
  });
};

/**
 * 修改
 */
export const scRuleStatus = (data) => {
  return put({
    "url": MARKET_URL + "/admin/scRule/status",
    data
  });
};

/**
 * 审批
 */
export const scRuleApproval = (data) => {
  return post({
    "url": MARKET_URL + "/admin/scStore/approval",
    data
  });
};

/**
 * 查询详情
 */
export const scStoreDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/scStore/detail" + params,
    "data": {}
  });
};