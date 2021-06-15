import { get, post, del } from "@/utils/request";
import { TRADE_URL, MARKET_URL } from "@/utils/system-constant";

/**
 * 安心跑订单详情列表
 * @param data
 */
export const detailOrderWarehouseOut = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/warehouse/out/query/detail",
    data
  });
};

/**
 * 安心跑订单列表
 * @param data
 */
export const pageOrderWarehouseOut = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/warehouse/out/query/page",
    data
  });
};

/**
 * 查询待审核订单（分页）
 * @param data
 */
export const approvalOrderWarehouseOut = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/warehouse/out/query/page/approval",
    data
  });
};

/**
 * 查询返利管理（分页））
 * @param data
 */
export const rebateOrderWarehouseOut = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/warehouse/out/query/page/detail",
    data
  });
};

/**
 * 修改待审核订单
 * @param data
 */
export const updateApprovalOrderWarehouseOut = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/warehouse/out/update/approval",
    data
  });
};

/**
 * 补录车型
 * @param data
 */
export const updateModelOrderWarehouseOut = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/warehouse/out/update/model",
    data
  });
};

/* ------安心跑范围----*/

/**
 * 安心跑规则创建
 * @param data
 */
export const createAxpRule = (data) => {
  return post({
    "url": MARKET_URL + "/admin/axpRule/create",
    data
  });
};

/**
 * 安心跑规则详情
 * @param data
 */
export const detailAxpRule = (data) => {
  return get({
    "url": MARKET_URL + "/admin/axpRule/detail" + data
  });
};

/**
 * 安心跑规则列表
 * @param data
 */
export const listAxpRule = (data) => {
  return get({
    "url": MARKET_URL + "/admin/axpRule/list"
  });
};

/**
 * 添加安心跑
 * @param data
 */
export const createAxpProductRelation = (data) => {
  return post({
    "url": MARKET_URL + "/admin/axpProductRelation/create",
    data
  });
};

/**
 * 安心跑规则列表
 * @param data
 */
export const pageAxpProductRelation = (data) => {
  return get({
    "url": MARKET_URL + "/admin/axpProductRelation/page" + data
  });
};

/**
 * 安心跑列表
 * @param data
 */
export const removeAxpProductRelation = (data) => {
  return del({
    "url": MARKET_URL + "/admin/axpProductRelation/remove",
    data
  });
};

/**
 * 轮胎换新列表
 * @param data
 */
export const pageRenewQuery = (data) => {
  return post({
    "url": TRADE_URL + "/admin/renew/query/page",
    data
  });
};

/**
 * 轮胎换新详情
 * @param data
 */
export const detailRenewQuery = (data) => {
  return post({
    "url": TRADE_URL + "/admin/renew/query/detail",
    data
  });
};

/**
 * 轮胎换新审核
 * @param data
 */
export const examineRenewQuery = (data) => {
  return post({
    "url": TRADE_URL + "/admin/renew/approval/image",
    data
  });
};
