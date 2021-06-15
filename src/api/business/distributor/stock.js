import { get, post, put, del } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 查询
 * @param data 保存DTO
 */
export const listStockInfoByPage = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockInfo/page",
    data
  });
};

/**
 * 经销商库存明细
 * @param {*} data
 */
export const customerStockDetail = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockInfo/customerStockDetail",
    data
  });
};

/**
 * 修改库存预警
 * @param {*} data
 */
export const modeStockWarning = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockInfo/modStockWarning",
    data
  });
};

/**
 * 查询平均值
 * @param {*} data
 */
export const getAverage = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockInfo/getAverage",
    data
  });
};