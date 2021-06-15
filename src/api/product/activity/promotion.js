import { get, post, put, del } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 查询分页列表
 * @param params
 */
export const pageSearchPromotion = (params) => {
  return get({
    "url": ITEM_URL + "/admin/promotion/page" + params,
    "data": {}
  });
};

/**
 * 活动查询详情
 * @param params
 */
export const promotionDetail = (params) => {
  return get({
    "url": ITEM_URL + "/admin/promotion/detail" + params,
    "data": {}
  });
};

/**
 * 创建活动
 * @param data
 */
export const createPromotion = (data) => {
  return post({
    "url": ITEM_URL + "/admin/promotion/create",
    data
  });
};

/**
 * 修改活动
 * @param data
 */
export const updatePromotion = (data) => {
  return put({
    "url": ITEM_URL + "/admin/promotion/modify",
    data
  });
};

/**
 * 删除活动
 * @param data
 */
export const deletePromotion = (data) => {
  return del({
    "url": ITEM_URL + "/admin/promotion/delete",
    data
  });
};

/**
 * 修改活动状态
 * @param data 规则DTO
 */
export const updatePromotionStatus = (data) => {
  return put({
    "url": ITEM_URL + "/admin/promotion/status",
    data
  });
};
/**
 * 修改销售状态
 * @param data 规则DTO
 */
export const updateSaleStatus = (data) => {
  return put({
    "url": ITEM_URL + "/admin/promotion/saleStatus",
    data
  });
};

/**
 * 查询列表
 * @param params
 */
export const listSearchPromotion = (params) => {
  return get({
    "url": ITEM_URL + "/admin/promotion/list?" + params,
    "data": {}
  });
};

// -----------------------------活动-配置门店权限--------------------------------------

/**
 * 活动经销商列表
 * @param params
 */
export const listPromotionDealerRelation = (params) => {
  return get({
    "url": ITEM_URL + "/admin/promotionDealerRelation/page" + params,
    "data": {}
  });
};

/**
 * 活动经销商列表删除
 * @param data
 */
export const delPromotionDealerRelation = (data) => {
  return del({
    "url": ITEM_URL + "/admin/promotionDealerRelation/delete",
    data
  });
};

/**
 * 活动经销商列表创建
 * @param data
 */
export const createPromotionDealerRelation = (data) => {
  return post({
    "url": ITEM_URL + "/admin/promotionDealerRelation/create",
    data
  });
};

/**
 * 商品门店白名单列表
 * @param params
 */
export const listItemWhiteList = (params) => {
  return get({
    "url": ITEM_URL + "/admin/itemWhiteList/page" + params,
    "data": {}
  });
};
/**
 * 门店白名单添加
 * @param data
 */
export const addItemWhiteList = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemWhiteList/itemWhiteListAdd" + data,
    "data": {}
  });
};
/**
 * 门店白名单设置（删除原有的设置，重新添加本次出入的白名单数据）
 * @param data
 */
export const setItemWhiteList = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemWhiteList/itemWhiteList" + data,
    "data": {}
  });
};
/**
 *门店白名单删除
 * @param data
 */
export const delItemWhiteList = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemWhiteList/itemWhiteListDel" + data,
    "data": {}
  });
};

// --------------------------------

/**
 *门店可见性 删除
 * @param data
 */
export const delItemVisibility = (data) => {
  return del({
    "url": ITEM_URL + "/admin/itemVisibility",
    data
  });
};

/**
 *门店可见性 设置
 * @param data
 */
export const setItemVisibility = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemVisibility/itemVisibility",
    data
  });
};

/**
 *门店可见性 列表
 * @param data
 */
export const listItemVisibility = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemVisibility/query",
    data
  });
};
