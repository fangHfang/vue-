import { post } from "@/utils/request";
import { TRADE_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询积分订单
 * @param data 查询DTO
 */
export const listIntegralByPage = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/query/integral/page",
    data
  });
};

export const searchList = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/query/integral/detail",
    data
  });
};

export const modifyIntegral = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/modify/integral",
    data
  });
};

export const modifyAddress = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/modify/address",
    data
  });
};