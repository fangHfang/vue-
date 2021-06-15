import { post, get } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询商品品牌集合
 * @param data 查询DTO
 */
export const pageSearchBrandList = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemBrand/page" + data,
    "data": {}
  });
};
/**
 * 删除单条数据
 * @param data 查询DTO
 */
export const deleteByBrandNo = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemBrand/delete" + data,
    "data": {}
  });
};
/**
 * 保存类别数据
 * @param data 查询DTO
 */
export const saveBrandFrom = (data) => {
  if (data.id) {
    // 修改
    return post({
      "url": ITEM_URL + "/admin/itemBrand/update",
      data
    });
  }
  // 新增
  return post({
    "url": ITEM_URL + "/admin/itemBrand/create",
    data
  });
};

/**
 * 删除单条数据
 * @param data 查询DTO
 */
export const changeBrandStatus = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemBrand/transferStatus" + data,
    "data": {}
  });
};