import { get, post, put, del } from "@/utils/request";
import { MARKET_URL, TRADE_URL } from "@/utils/system-constant";

/**
 * 查询兑换点规则列表
 * @param params
 */
export const listSearchEpRule = (params) => {
  return get({
    "url": MARKET_URL + "/admin/epRule/list?" + params,
    "data": {}
  });
};

/**
 * 分页查询兑换点规则列表
 * @param params
 */
export const listPageSearchEpRule = (params) => {
  return get({
    "url": MARKET_URL + "/admin/epRule/page?" + params,
    "data": {}
  });
};

/**
 * 兑换点规则查询详情
 * @param params
 */
export const epRuleDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/epRule/detail?" + params,
    "data": {}
  });
};

/**
 * 创建兑换点规则
 * @param data
 */
export const createEpRule = (data) => {
  return post({
    "url": MARKET_URL + "/admin/epRule/create",
    data
  });
};

/**
 * 修改兑换点规则
 * @param data
 */
export const updateEpRule = (data) => {
  return put({
    "url": MARKET_URL + "/admin/epRule/modify",
    data
  });
};

/**
 * 删除兑换点规则
 * @param data
 */
export const deleteEpRule = (data) => {
  return del({
    "url": MARKET_URL + "/admin/epRule/delete",
    data
  });
};

/**
 * 修改状态
 * @param data 规则DTO
 */
export const updateEpRuleStatus = (data) => {
  return put({
    "url": MARKET_URL + "/admin/epRule/status",
    data
  });
};

/**
 * 分页查询门店兑换点列表
 * @param params
 */
export const listPageSearchEpStore = (params) => {
  return get({
    "url": MARKET_URL + "/admin/epStore/page?" + params,
    "data": {}
  });
};

/**
 * 调整兑换点
 * @param data
 */
export const epStoreChangeAmount = (data) => {
  return post({
    "url": MARKET_URL + "/admin/epStore/changeAmount",
    data
  });
};

/**
 * 冻结/解冻
 * @param data
 */
export const epStoreChangeStatus = (data) => {
  return post({
    "url": MARKET_URL + "/admin/epStore/changeStatus",
    data
  });
};

/**
 * 查询分页门店兑换点明细列表
 * @param params
 */
export const listPageSearchEpStoreDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/epStoreDetail/page?" + params,
    "data": {}
  });
};

/**
 * 查询兑换点订单分页列表
 */
export const listExchangePage = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/query/exchange/page",
    data
  });
};

/**
 * 修改积分订单快递单号
 */
export const editIntegral = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/modify/integral",
    data
  });
};

/**
 * 查看兑换点订单详情
 */
export const exchangeDetail = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/query/exchange/detail",
    data
  });
};
