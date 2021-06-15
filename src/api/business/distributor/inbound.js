import { get, post, put, del } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
 * 查询
 * @param data 保存DTO
 */
export const listInboundByPage = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockOperating/page",
    data
  });
};
/**
 * 保存第一步
 * @param {*} data
 */
export const operateStockByDealerStepOne = (data) => {
  return get({
    "url": ITEM_URL + "/admin/stockOperating/operateStockByDealerStepOne" + data,
    "data": {}
  });
};
/**
 * 保存第二步
 * @param {*} data
 */
export const operateStockByDealerStepTwo = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockOperating/operateStockByDealerStepTwo",
    data
  });
};

/**
 * 明细
 * @param {*} data
 */
export const stockOperatingByDealerDetail = (data) => {
  return post({
    "url": ITEM_URL + "/admin/stockOperating/stockOperatingByDealerDetail",
    data
  });
};
