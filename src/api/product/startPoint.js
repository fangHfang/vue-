import { get, post } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
* 分页模糊查询起订分规则的列表
* @param data 查询DTO
*/
export const pageSearchStartPointList = (data) => {
  return get({
    "url": ITEM_URL + "/admin/startPoint/page?" + data,
    "data": {}
  });
};

/**
 * 模糊查询起订分规则的列表
 * @param data 查询DTO
 */
export const searchStartPointList = (data) => {
  return get({
    "url": ITEM_URL + "/admin/startPoint/list",
    "data": {}
  });
};

/**
 * 创建起订分规则
 * @param data 新增DTO
 */
export const createStartPoint = (data) => {
  return post({
    "url": ITEM_URL + "/admin/startPoint/create",
    data
  });
};

/**
 * 创建起订分规则
 * @param data 新增DTO
 */
export const updateStartPoint = (data) => {
  return post({
    "url": ITEM_URL + "/admin/startPoint/update",
    data
  });
};

/**
 * 转换起订分状态
 * @param data 查询DTO
 */
export const transferStartPointStatus = (data) => {
  return get({
    "url": ITEM_URL + "/admin/startPoint/transferStatus?" + data,
    "data": {}
  });
};

/**
 * 查询起订分关联商品--分页
 * @param data 查询DTO
 */
export const queryStartPointDetail = (data) => {
  return get({
    "url": ITEM_URL + "/admin/startPoint/detail?" + data,
    "data": {}
  });
};

/**
 * 查询起订分关联商品--分页
 * @param data 查询DTO
 */
export const searchStartPointItemList = (data) => {
  return get({
    "url": ITEM_URL + "/admin/startPoint/queryItem?" + data,
    "data": {}
  });
};

/**
 * 删除
 * @param data 删除DTO
 */
export const deleteStartPoint = (data) => {
  return get({
    "url": ITEM_URL + "/admin/startPoint/delete?" + data,
    "data": {}
  });
};
