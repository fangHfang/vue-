// /admin/store/page/apply

import { get, put, post } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 审批分页列表
 * @param data 查询DTO
 */
export const pageStoreList = (data) => {
  return get({
    "url": USER_URL + "/admin/store/page/apply" + data,
    "data": {}
  });
};

/**
 * 门店审批通过
 * @param data 通过DTO
 */
export const storePassed = (data = {}) => {
  return put({
    "url": USER_URL + "/admin/store/passed",
    "data": data
  });
};

/**
 * 门店审批驳回
 * @param data 通过DTO
 */
export const storeRejected = (data = {}) => {
  return put({
    "url": USER_URL + "/admin/store/rejected",
    "data": data
  });
};

/**
 * 门店详情
 * @param data 查询DTO
 */
export const detailStore = (data) => {
  return get({
    "url": USER_URL + "/admin/store/detail" + data,
    "data": {}
  });
};

/**
 * 门店审批设置
 * @param data 通过DTO
 */
export const approvalSetting = (data = {}) => {
  return put({
    "url": USER_URL + "/admin/store/ApprovalSetting",
    "data": data
  });
};