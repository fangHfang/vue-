import { get, post } from "@/utils/request";
import { USER_URL, TRADE_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询现金账户列表
 * @param data 查询DTO
 */
export const pageSearchCashList = (data) => {
  return get({
    "url": USER_URL + "/admin/cash/page?" + data,
    "data": {}
  });
};

/**
 * 账户余额
 * @param data 查询DTO
 */
export const getAvailableAmount = (data) => {
  return post({
    "url": USER_URL + "/admin/cash/availableAmount",
    "data": data
  });
};

/**
 * 查询订单提现管理列表
 */
export const pageOrderWithdrawList = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/withdraw/query/page",
    data
  });
};

/**
 * 冻结明细列表
 */
export const pageOrderWithdForzenrawList = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/withdraw/query/frozen/page",
    data
  });
};

/**
 * 修改
 */
export const toVerify = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/withdraw/modify",
    data
  });
};

/**
 * 查询相关提现金额
 */
export const dealerAmount = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/withdraw/query/dealer/amount",
    data
  });
};

/**
 * 关联订单管理列表查询
 */
export const pageDetail = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/withdraw/query/page/detail",
    data
  });
};