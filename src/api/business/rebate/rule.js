import { get, post, put, del } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 查询列表
 * @param params
 */
export const listSearchRbRule = (params) => {
  return get({
    "url": MARKET_URL + "/admin/rbRule/list?" + params,
    "data": {}
  });
};

/**
 * 查询分页列表
 * @param params
 */
export const pageSearchRbRule = (params) => {
  return get({
    "url": MARKET_URL + "/admin/rbRule/page?" + params,
    "data": {}
  });
};

/**
 * 返利规则查询详情
 * @param params
 */
export const rbRuleDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/rbRule/detail?" + params,
    "data": {}
  });
};

/**
 * 查询规则详情列表
 * @param params
 */
export const rbRuleSettingDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/rbRule/settingDetail?" + params,
    "data": {}
  });
};

/**
 * 创建返利规则
 * @param data
 */
export const createRbRule = (data) => {
  return post({
    "url": MARKET_URL + "/admin/rbRule/create",
    data
  });
};
/**
 * 删除规则详情
 * @param params
 */
export const deleteRuleDetail = (data) => {
  return post({
    "url": MARKET_URL + "/admin/rbRule/deleteRuleDetail",
    data
  });
};
/**
 * 设置商品下单使用返利上限
 * @param data
 */
export const setOrderUseRebateLimit = (data) => {
  return post({
    "url": MARKET_URL + "/admin/rbRule/setOrderUseRebateLimit",
    data
  });
};

/**
 * 修改返利规则
 * @param data
 */
export const updateRbRule = (data) => {
  return put({
    "url": MARKET_URL + "/admin/rbRule/modify",
    data
  });
};
/**
 * 设置返利数值
 * @param data
 */
export const setRbRuleAmount = (data) => {
  return post({
    "url": MARKET_URL + "/admin/rbRule/setRbRuleAmount",
    data
  });
};

/**
 * 删除返利规则
 * @param data
 */
export const deleteRbRule = (data) => {
  return del({
    "url": MARKET_URL + "/admin/rbRule/delete",
    data
  });
};

/**
 * 修改状态
 * @param data 规则DTO
 */
export const updateRbRuleStatus = (data) => {
  return put({
    "url": MARKET_URL + "/admin/rbRule/status",
    data
  });
};

/**
 * 创建兑换点规则明细
 * @param data 规则DTO
 */
export const createEpStoreRelation = (data) => {
  return put({
    "url": MARKET_URL + "/admin/epStoreRelation/create",
    data
  });
};

/**
 * 删除兑换点规则明细
 * @param data 规则DTO
 */
export const deleteEpStoreRelation = (data) => {
  return put({
    "url": MARKET_URL + "/admin/epStoreRelation/delete",
    data
  });
};

/**
 * 查询兑换点规则明细
 * @param data 规则DTO
 */
export const listEpStoreRelationByPage = (data) => {
  return get({
    "url": MARKET_URL + "/admin/epStoreRelation/page?" + data,
    "data": {}
  });
};

/**
 * 获取app设置返利值
 * @param data 规则DTO
 */
export const getAPPSetRb = () => {
  return get({
    "url": MARKET_URL + "/admin/rbRule/queryOrderUseRebateLimit",
    "data": {}
  });
};
