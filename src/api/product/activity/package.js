import { get, post, del } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 分页查询套装商品关联信息
 * @param data 查询DTO
 */
export const listPackageItemRelation = (data) => {
  return get({
    "url": ITEM_URL + "/admin/packageItemRelation/page" + data
  });
};

/**
 * 根据商品编号查询商品信息详情
 * @param data 商品编号
 */
export const detailPackageItemRelation = (data) => {
  return get({
    "url": ITEM_URL + "/admin/packageItemRelation" + data
  });
};

/**
 * 删除
 * @param data 商品编号
 */
export const delPackageItemRelation = (data) => {
  return del({
    "url": ITEM_URL + "/admin/packageItemRelation" + data
  });
};
/**
 * 创建
 * @param data 商品编号
 */
export const createPackageItemRelation = (data) => {
  return post({
    "url": ITEM_URL + "/admin/packageItemRelation",
    data
  });
};

/**
 * 修改
 * @param data 商品编号
 */
export const modifyPackageItemRelation = (data) => {
  return put({
    "url": ITEM_URL + "/admin/packageItemRelation",
    data
  });
};
