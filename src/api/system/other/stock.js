import { get, post, del } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 创建
 * @param data
 */
export const createStockDisplay = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockDisplay/create",
    data
  });
};

/**
 * 修改
 * @param data
 */
export const updateStockDisplay = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockDisplay/update",
    data
  });
};

/**
 * 删除
 * @param params
 */
export const deleteStockDisplay = (params) => {
  return get({
    "url": ITEM_URL + "/admin/stockDisplay/delete?" + params,
    "data": {}
  });
};

/**
 * 查询库存规则详情
 * @param params
 */
export const getStockDisplayDetail = (params) => {
  return get({
    "url": ITEM_URL + "/admin/stockDisplay/detail?" + params,
    "data": {}
  });
};

/**
 * 查询分页列表
 * @param params
 */
export const pageListStockDisplay = (params) => {
  return get({
    "url": ITEM_URL + "/admin/stockDisplay/page?" + params,
    "data": {}
  });
};

/**
 * 规则关联商品--分页
 * @param params
 */
export const pageListStockDisplayItem = (params) => {
  return get({
    "url": ITEM_URL + "/admin/stockDisplay/queryItem?" + params,
    "data": {}
  });
};

/**
 * 规则关联商品
 * @param data
 */
export const relationStockDisplayItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockDisplay/relationItem",
    data
  });
};

/**
 * 商品移除关联规则
 * @param data
 */
export const removeStockDisplayItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockDisplay/removeItem",
    data
  });
};

/**
 * 转换规则状态
 * @param params
 */
export const transferStockDisplayStatus = (params) => {
  return get({
    "url": ITEM_URL + "/admin/stockDisplay/transferStatus?" + params,
    "data": {}
  });
};

/**
 * 查询全部列表
 * @param params
 */
export const listStockDisplayDetail = (params) => {
  return get({
    "url": ITEM_URL + "/admin/stockDisplayDetail/list?" + params,
    "data": {}
  });
};

/* ----------商品和库存显示规则关联表----------*/

/**
 * 查询全部列表
 * @param params
 */
export const pageStockDisplayItemRelation = (params) => {
  return get({
    "url": ITEM_URL + "/admin/stockDisplayItemRelation/page" + params,
    "data": {}
  });
};

/**
 * 库存显示规则关联商品-添加
 * @param data
 */
export const createStockDisplayItemRelation = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockDisplayItemRelation/create",
    data
  });
};

/**
 * 删除
 * @param data
 */
export const removeStockDisplayItemRelation = (data) => {
  return del({
    "url": ITEM_URL + "/admin/stockDisplayItemRelation/remove",
    data
  });
};
