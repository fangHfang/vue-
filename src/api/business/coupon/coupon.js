import { get, post, put } from "@/utils/request";
import { MARKET_URL, ITEM_URL } from "@/utils/system-constant";

/**
 * 分页查询优惠券模板
 * @param data 查询DTO
 */
export const pageSearchCpTemLateList = (data) => {
  return get({
    "url": MARKET_URL + "/admin/cpTemplate/page" + data,
    "data": {}
  });
};

/**
 * 发放优惠券
 * @param data 保存DTO
 */
export const grantCp = (data) => {
  return post({
    "url": MARKET_URL + "/admin/cpGrant/grant",
    data
  });
};

/**
 * 发放优惠券
 * @param data 保存DTO
 */
export const listCouponByPage = (data) => {
  return get({
    "url": MARKET_URL + "/admin/cpRecord/page" + data,
    "data": {}
  });
};

/**
 * 修改状态
 */
export const transferStatus = (data) => {
  return put({
    "url": MARKET_URL + "/admin/cpTemplate/status",
    data
  });
};

/**
 * 获取品牌
 */
export const getBrand = () => {
  return get({
    "url": ITEM_URL + "/admin/itemBrand/list",
    "data": {}
  });
};

/**
 * 获取分类
 */
export const getClassification = () => {
  return get({
    "url": ITEM_URL + "/admin/itemCategory/list/show?categoryType=2",
    "data": {}
  });
};

/**
 * 新增优惠券
 */
export const addCpTemplate = (data) => {
  return post({
    "url": MARKET_URL + "/admin/cpTemplate/create",
    data
  });
};

/**
 * 优惠券详情
 */
export const searchList = (data) => {
  return get({
    "url": MARKET_URL + "/admin/cpTemplate/detail?ruleNo=" + data,
    "data": {}
  });
};

/**
 * 修改
 */
export const editCpTemplate = (data) => {
  return put({
    "url": MARKET_URL + "/admin/cpTemplate/modify",
    data
  });
};

/**
 * 获取商品
 */
export const getProductItemInfo = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemInfo/page" + data,
    "data": {}
  });
};