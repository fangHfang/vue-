import { get } from "@/utils/request";
import { ITEM_URL } from "@/utils/system-constant";

/**
* 分页模糊查询产品条码列表
* @param data 查询DTO
*/
export const pageSearchBarCodeList = (data) => {
  return get({
    "url": ITEM_URL + "/admin/barcodeInfo/page?" + data,
    "data": {}
  });
};
