import { get, post, put } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 查询
 * @param data 保存DTO
 */
export const listInboundByPage = (data) => {
  return post({
    "url": USER_URL + "/admin/stockOperating/page",
    data
  });
};
/**
 * 查询分页
 * @param {*} data
 */
export const getWhiteBarPageStore = (data) => {
  return get({
    "url": USER_URL + "/admin/white/bar/page/store" + data,
    "data": {}
  });
};

/**
 * 冻结
 */
export const frozen = (data) => {
  return put({
    "url": USER_URL + "/admin/white/bar/freeze/store",
    data
  });
};

/**
 * 解冻
 */
export const enable = (data) => {
  return put({
    "url": USER_URL + "/admin/white/bar/unfreeze/store",
    data
  });
};

/**
 * 授信额度
 */
export const saveBarLineStore = (data) => {
  return put({
    "url": USER_URL + "/admin/white/bar/line/store",
    data
  });
};

/**
 * 还款
 */
export const repayment = (data) => {
  return put({
    "url": USER_URL + "/admin/white/bar/repayment",
    data
  });
};

/**
 * 查询明细分页列表
 */
export const getWhiteBarPageStoreDetail = (data) => {
  return get({
    "url": USER_URL + "/admin/white/bar/page/store/detail" + data,
    "data": {}
  });
};
