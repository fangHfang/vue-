import { get, put, post } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 查询分页列表
 * @param params
 */
export const pageSearchIntegral = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/page?" + params,
    "data": {}
  });
};

/**
 * 积分帐户查询详情
 * @param params
 */
export const integralDetail = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/detail?" + params,
    "data": {}
  });
};

/**
 * 积分帐户查询详情
 * @param params
 */
export const integralPageDetail = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/page/detail?" + params,
    "data": {}
  });
};

/**
 * 查询积分明细业务类型
 * @param params
 */
export const integralPageDetailType = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/detail/type?" + params,
    "data": {}
  });
};

/**
 * 调增
 * @param data
 */
export const addIntegral = (data) => {
  return put({
    "url": USER_URL + "/admin/integral/add",
    data
  });
};

/**
 * 调减
 * @param data
 */
export const reduceIntegral = (data) => {
  return put({
    "url": USER_URL + "/admin/integral/reduce",
    data
  });
};

/**
 * 冻结账户
 * @param data
 */
export const freezeIntegral = (data) => {
  return put({
    "url": USER_URL + "/admin/integral/freeze",
    data
  });
};

/**
 * 解冻账户
 * @param data
 */
export const unfreezeIntegral = (data) => {
  return put({
    "url": USER_URL + "/admin/integral/unfreeze",
    data
  });
};

/**
 * 积分清零记录分页列表
 * @param params
 */
export const integralPageClean = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/page/clean?" + params,
    "data": {}
  });
};

/**
 * 积分失效记录分页列表
 * @param params
 */
export const integralPageInvalid = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/page/expire?" + params,
    "data": {}
  });
};

/**
 * 积分通知分页列表
 * @param params
 */
export const integralPageNotify = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/page/notify?" + params,
    "data": {}
  });
};

/**
 * 积分通知详情分页列表
 * @param params
 */
export const integralPageNotifyDetail = (params) => {
  return get({
    "url": USER_URL + "/admin/integral/page/notify/detail?" + params,
    "data": {}
  });
};

/**
 * 通知，通知部分门店或全部门店
 * @param data
 */
export const integralNotify = (data) => {
  return post({
    "url": USER_URL + "/admin/integral/notify",
    data
  });
};

/**
 * 通知，通知部分门店或全部门店
 * @param data
 */
export const integralNotifyAgain = (data) => {
  return post({
    "url": USER_URL + "/admin/integral/notifyAgain",
    data
  });
};