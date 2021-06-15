import { get, post, put, del } from "@/utils/request";
import { MARKET_URL, USER_URL } from "@/utils/system-constant";

/**
 * 分页查询门店签约
 * @param params
 */
export const listScStoreByPage = (params) => {
  return get({
    "url": MARKET_URL + "/admin/scStore/page" + params,
    "data": {}
  });
};

/**
 * 分页查询门店
 * @param params
 */
export const listStoreByPage = (params) => {
  return get({
    "url": USER_URL + "/admin/store/page?" + params,
    "data": {}
  });
};

/**
 * 查询门店详情
 * @param params
 */
export const searchList = (params) => {
  return get({
    "url": USER_URL + "/admin/store/detail?customerNo=" + params,
    "data": {}
  });
};
