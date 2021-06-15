import { get, post } from "@/utils/request";
import { TRADE_URL } from "@/utils/system-constant";

/**
* 分页模糊查询积分商城的列表
* @param data 查询DTO
*/
export const pageSearchOrderPresellList = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/presell/query/page",
    data
  });
};

/**
* 分页模糊查询商品订单
* @param data 查询DTO
*/
export const pageOrderInfoList = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/query/page",
    data
  });
};

/**
* 查询商品订单详情
* @param data 查询DTO
*/
export const getOrderDetailInfo = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/query/all/detail",
    data
  });
};

/**
 * 查询活动订单-分页
 * @param {} data
 */
export const listActivityOrderList = (data) => {
  return get({
    "url": `${TRADE_URL}/admin/promotion/order/page${data}`
  });
};

/**
 * 查询活动订单-详情
 * @param {} data
 */
export const getActivityOrderDetail = (data) => {
  return get({
    "url": `${TRADE_URL}/admin/promotion/order/detail${data}`
  });
};
