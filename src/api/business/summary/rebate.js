import { get, post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 查询
 * @param data 保存DTO
 */
export const getDealerPageList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/accountCount/dealerPage",
    data
  });
};

/**
 * 查询明细分页列表
 */
export const getDealerPageListDetail = (data) => {
  return post({
    "url": BASIC_URL + "/admin/accountCount/dealerDetail",
    data
  });
};
