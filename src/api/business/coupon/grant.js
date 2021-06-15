import { get } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 查询兑换点规则列表
 * @param params
 */
export const listcpGrantPage = (params) => {
  return get({
    "url": MARKET_URL + "/admin/cpGrant/page" + params,
    "data": {}
  });
};
