import { get } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 查询优惠券规则列表
 * @param params
 */
export const listSearchCpTemplate = (params) => {
  return get({
    "url": MARKET_URL + "/admin/cpTemplate/list?" + params,
    "data": {}
  });
};