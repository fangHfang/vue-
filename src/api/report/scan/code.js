import { get, post, put, del } from "@/utils/request";
import { TRADE_URL, ITEM_URL } from "@/utils/system-constant";
/**
 * 分页查询扫码记录
 * @param params
 */

export const listScanCodeByPage = (data) => {
  return post({
    "url": TRADE_URL + "/admin/scan/code/query/page",
    data
  });
};

/**
 * 扫码周期、扫码异常表--查询分页列表
 * @param data
 */

export const pageBarcodeInfoPeriod = (data) => {
  return get({
    "url": ITEM_URL + "/admin/barcodeInfo/period" + data
  });
};

/**
 * 扫码周期明细分页列表
 * @param data
 */

export const pageBarcodeRecord = (data) => {
  return get({
    "url": ITEM_URL + "/admin/barcodeRecord/page" + data
  });
};
