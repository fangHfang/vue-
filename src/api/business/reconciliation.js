import { get, post } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 分页查询返利计算/核算对账
 * @param params
 */
export const listPageRebateCalc = (params) => {
  return post({
    "url": MARKET_URL + "/admin/rebateCalc/page" + params,
    "data": {}
  });
};

/**
 * 对账明细/返利计算明细
 * @param params
 */
export const getPageRebateCalcDetail = (params) => {
  return post({
    "url": MARKET_URL + "/admin/rebateCalcDetail/page" + params,
    "data": {}
  });
};

/**
 * 对账审批
 * @param params
 */
export const rebateCalcApproval = (params) => {
  return post({
    "url": MARKET_URL + "/admin/rebateCalc/approval",
    "data": params
  });
};
