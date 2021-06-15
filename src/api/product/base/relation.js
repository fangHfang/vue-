import { post, get } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 获取商城分类分页数据
 * @param params
 */
export const queryItem = (params) => {
  return get({
    "url": ITEM_URL + "/admin/itemCategory/queryItem" + params,
    "data": {}
  });
};
/**
 * 关联产品之添加
 * @param params
 */
export const relationItem = (params) => {
  return post({
    "url": ITEM_URL + "/admin/itemCategory/relationItem",
    "data": params
  });
};
/**
 * 关联产品之移除
 * @param params
 */
export const removeItem = (params) => {
  return post({
    "url": ITEM_URL + "/admin/itemCategory/removeItem",
    "data": params
  });
};
