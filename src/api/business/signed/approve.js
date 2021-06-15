import { get, post, put, del } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 创建门店签约
 */
export const scStoreCrete = (data) => {
  return post({
    "url": MARKET_URL + "/admin/scStore/create",
    data
  });
};

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
