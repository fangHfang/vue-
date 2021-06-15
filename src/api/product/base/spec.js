import { post, get } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 获取规格分页数据
 * @param params
 */
export const listItemSpecTemplatePage = (data) => {
  return post({
    "url": ITEM_URL + "/admin/specTemplate/page",
    data
  });
};

/**
 * 获取规格创建人数据
 */
export const listCreateBy = () => {
  return get({
    "url": ITEM_URL + "/admin/specTemplate/listCreateBy"
  });
};

/**
 * 创建商品规格
 * @param params
 */
export const createItemSpecTemplate = (data) => {
  return post({
    "url": ITEM_URL + "/admin/specTemplate/create",
    data
  });
};

/**
 * 创建商品规格
 * @param params
 */
export const updateItemSpecTemplate = (data) => {
  return post({
    "url": ITEM_URL + "/admin/specTemplate/update",
    data
  });
};

/**
 * 删除商品规格
 */
export const deleteItemSpecTemplate = (params) => {
  return get({
    "url": ITEM_URL + "/admin/specTemplate/delete" + params,
    "data": {}
  });
};

/**
 * 转换商品规格状态
 */
export const transferStatus = (params) => {
  return get({
    "url": ITEM_URL + "/admin/specTemplate/transferStatus" + params,
    "data": {}
  });
};
