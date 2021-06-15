import { get, post, put, del } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";
/* ---------------------积分商品表---------------------------*/
/**
 * 分页模糊查询积分商城的列表
 * @param data 查询DTO
 */
export const pageSearchIntegralGoodList = (data) => {
  return get({
    "url": ITEM_URL + "/admin/integralItemInfo/page" + data,
    "data": {}
  });
};

/**
 * 上下架
 * @param data 查询DTO
 */
export const updateSaleStatus = (data) => {
  return post({
    "url": ITEM_URL + "/admin/integralItemInfo/updateSaleStatus",
    data
  });
};

/**
 * 保存积分商品
 * @param data 查询DTO
 */
export const saveIntegralItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/integralItemInfo/saveIntegralItem",
    data
  });
};

/**
 * 积分商品申请上架
 * @param data 查询DTO
 */
export const applyOnSale = (data) => {
  return post({
    "url": ITEM_URL + "/admin/integralItemInfo/applyOnSale",
    data
  });
};

/**
 * 详情
 * @param data 查询DTO
 */
export const getIntegralItemInfo = (data) => {
  return get({
    "url": ITEM_URL + "/admin/integralItemInfo/detail" + data,
    "data": {}
  });
};

/**
 * 修改
 * @param data 查询DTO
 */
export const editIntegralItemInfo = (data) => {
  return post({
    "url": ITEM_URL + "/admin/integralItemInfo/update",
    data
  });
};

/**
 * 删除
 * @param data 查询DTO
 */
export const delIntegralItemInfo = (data) => {
  return del({
    "url": ITEM_URL + "/admin/integralItemInfo/delete" + data
  });
};
