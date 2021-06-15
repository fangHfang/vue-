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
export const getWhiteBarPageDealer = (data) => {
  return get({
    "url": USER_URL + "/admin/white/bar/page/dealer" + data,
    "data": {}
  });
};

/**
 * 授信额度
 */
export const saveBarLineDealer = (data) => {
  return put({
    "url": USER_URL + "/admin/white/bar/line/dealer",
    data
  });
};

/**
 * 冻结
 */
export const frozen = (data) => {
  return put({
    "url": USER_URL + "/admin/white/bar/freeze/dealer",
    data
  });
};

/**
 * 解冻
 */
export const enable = (data) => {
  return put({
    "url": USER_URL + "/admin/white/bar/unfreeze/dealer",
    data
  });
};

/**
 * 查询详情
 * @param {*} data
 * @returns
 */
export const searchList = (data) => {
  return get({
    "url": USER_URL + "/admin/white/bar/detail/dealer" + data,
    "data": {}

  });
};

/**
 * 查询明细分页
 * @param {*} data
 */
export const getWhiteBarPageDealerDetail = (data) => {
  return get({
    "url": USER_URL + "/admin/white/bar/page/dealer/detail" + data,
    "data": {}
  });
};
