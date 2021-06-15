import { get, put } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 查询分页列表
 * @param params
 */
export const pageSearchRebateStoreList = (params) => {
  return get({
    "url": USER_URL + "/admin/rebate/page?" + params,
    "data": {}
  });
};

/**
 * 返利账户查询详情
 * @param params
 */
export const rebateDetail = (params) => {
  return get({
    "url": USER_URL + "/admin/rebate/detail?" + params,
    "data": {}
  });
};

/**
 * 解冻账户
 * @param data
 */
export const unfreezeRebate = (data) => {
  return put({
    "url": USER_URL + "/admin/rebate/unfreeze",
    data
  });
};

/**
 * 冻结账户
 * @param data
 */
export const freezeRebate = (data) => {
  return put({
    "url": USER_URL + "/admin/rebate/freeze",
    data
  });
};

/**
 * 查询明细分页列表
 * @param params
 */
export const pageSearchDetailList = (params) => {
  return get({
    "url": USER_URL + "/admin/rebate/page/detail?" + params,
    "data": {}
  });
};

/**
 *查询返利明细业务类型
 * @param params
 */
export const detailType = (params) => {
  return get({
    "url": USER_URL + "/admin/rebate/detail/type?" + params,
    "data": {}
  });
};

/**
 * 调增
 * @param data
 */
export const add = (data) => {
  return put({
    "url": USER_URL + "/admin/rebate/add",
    data
  });
};

/**
 * 调减
 * @param data
 */
export const reduce = (data) => {
  return put({
    "url": USER_URL + "/admin/rebate/reduce",
    data
  });
};

/**
 * 门店返利查询详情
 * @param params
 */
export const rebateDetailStore = (params) => {
  return get({
    "url": USER_URL + "/admin/rebate/detail/store?" + params,
    "data": {}
  });
};