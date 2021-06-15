import { get } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
* 分页模糊查询产品列表
* @param data 查询DTO
*/
export const pageSearchProductList = (data) => {
  return get({
    "url": ITEM_URL + "/admin/product/page" + data,
    "data": {}
  });
};

/**
* 查询最新产品分页列表
* @param data 查询DTO
*/
export const listQueryNewestProductByPage = (data) => {
  return get({
    "url": ITEM_URL + "/admin/product/queryNewestProduct" + data,
    "data": {}
  });
};

/**
* 通过productNo查询产品信息
* @param data 查询DTO
*/
export const listQueryProductByProductNo = (data) => {
  return get({
    "url": ITEM_URL + "/admin/product/queryProductByProductNo" + data,
    "data": {}
  });
};

/**
* 通过productNo 通过产品编号查询产品详情
* @param data 查询DTO
*/
export const queryProductDetailByProductNo = (data) => {
  return get({
    "url": ITEM_URL + "/admin/product/queryProductDetailByProductNo" + data,
    "data": {}
  });
};
