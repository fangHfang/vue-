import { post, get } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 获取商城分类分页数据
 * @param params
 */
export const listItemCategoryPage = (params) => {
  return get({
    "url": ITEM_URL + "/admin/itemCategory/page" + params,
    "data": {}
  });
};
/**
 * 获取商城分类分页数据
 * @param params
 */
export const listCategoryNextLevel = (params) => {
  return get({
    "url": ITEM_URL + "/admin/itemCategory/nextLevel" + params,
    "data": {}
  });
};

/**
 * 删除分类
 */
export const delCategoryItem = (params) => {
  return get({
    "url": ITEM_URL + "/admin/itemCategory/delete" + params,
    "data": {}
  });
};

/**
 * 修改状态
 */
export const transferStatus = (params) => {
  return get({
    "url": ITEM_URL + "/admin/itemCategory/transferStatus" + params,
    "data": {}
  });
};

/**
 * 修改产品品类
 * @param params
 */
export const update = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemCategory/update",
    data
  });
};

/**
 * 创建商品品类
 * @param  data
 */
export const createCategoryItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemCategory/create",
    data
  });
};
