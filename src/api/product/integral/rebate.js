import { get, put } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 阶梯规则-查询详情
 */
export const ladderRuleDetail = () => {
  return get({
    "url": MARKET_URL + "/admin/ladderRule/detail",
    "data": {}
  });
};

/**
 * 阶梯规则-修改
 * @param data
 */
export const modifyLadderRule = (data) => {
  return put({
    "url": MARKET_URL + "/admin/ladderRule/modify",
    data
  });
};