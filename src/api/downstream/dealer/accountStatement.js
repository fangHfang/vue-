import { post } from "@/utils/request";
import { TRADE_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询对账单列表
 */
export const pageCheckccountList = (data) => {
  return post({
    "url": TRADE_URL + "/dealer/admin/checkccount/page",
    data
  });
};

/**
 * 分页模糊查询对账单列表
 */
export const checkAccount = (data) => {
  return post({
    "url": TRADE_URL + "/admin/checkAccount/query/page",
    data
  });
};
