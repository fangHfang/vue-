import { get, post, put, del } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 查询分页列表
 * @param params
 */
export const pageSearchPromotionCategory = (params) => {
  return get({
    "url": ITEM_URL + "/admin/promotionCategory/page?" + params,
    "data": {}
  });
};

/**
 * 活动分类查询详情
 * @param params
 */
export const promotionCategoryDetail = (params) => {
  return get({
    "url": ITEM_URL + "/admin/promotionCategory/detail?" + params,
    "data": {}
  });
};

/**
 * 创建活动分类
 * @param data
 */
export const createPromotionCategory = (data) => {
  return post({
    "url": ITEM_URL + "/admin/promotionCategory/create",
    data
  });
};

/**
 * 修改活动分类
 * @param data
 */
export const updatePromotionCategory = (data) => {
  return put({
    "url": ITEM_URL + "/admin/promotionCategory/modify",
    data
  });
};

/**
 * 删除活动分类
 * @param data
 */
export const deletePromotionCategory = (data) => {
  return del({
    "url": ITEM_URL + "/admin/promotionCategory/delete",
    data
  });
};

/**
 * 修改状态
 * @param data 规则DTO
 */
export const updatePromotionCategoryStatus = (data) => {
  return put({
    "url": ITEM_URL + "/admin/promotionCategory/status",
    data
  });
};

/**
 * 查询列表
 * @param params
 */
export const listSearchPromotionCategory = (params) => {
  return get({
    "url": ITEM_URL + "/admin/promotionCategory/list?" + params,
    "data": {}
  });
};