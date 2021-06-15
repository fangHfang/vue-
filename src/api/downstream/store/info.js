import { get, put, post } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询门店列表
 * @param data 查询DTO
 */
export const pageSearchStoreList = (data) => {
  return get({
    "url": USER_URL + "/admin/store/page?" + data,
    "data": {}
  });
};

/**
 * 启用门店
 * @param data 新增DTO
 */
export const enableStore = (data) => {
  return put({
    "url": USER_URL + "/admin/store/enable",
    data
  });
};

/**
 * 禁用门店
 * @param data 新增DTO
 */
export const disableStore = (data) => {
  return put({
    "url": USER_URL + "/admin/store/disable",
    data
  });
};

/**
 * 修改门店
 * @param data 新增DTO
 */
export const modifyStore = (data) => {
  return put({
    "url": USER_URL + "/admin/store/modify",
    data
  });
};

/**
 * 创建门店
 * @param data 新增DTO
 */
export const createStore = (data) => {
  return post({
    "url": USER_URL + "/admin/store/create",
    data
  });
};

/**
 * 门店详情
 * @param data 新增DTO
 */
export const detailStore = (data) => {
  return get({
    "url": USER_URL + "/admin/store/detail?" + data,
    "data": {}
  });
};

/**
 * 查询门店等级列表
 * @param data 查询DTO
 */
export const searchStoreLevelList = (data) => {
  return get({
    "url": USER_URL + "/admin/store/levelList?" + data,
    "data": {}
  });
};

/**
 * 启用门店组织
 * @param data 新增DTO
 */
export const enableStoreOrg = (data) => {
  return put({
    "url": USER_URL + "/admin/store/enableOrg",
    data
  });
};

/**
 * 禁用门店组织
 * @param data 新增DTO
 */
export const disableStoreOrg = (data) => {
  return put({
    "url": USER_URL + "/admin/store/disableOrg",
    data
  });
};

/**
 * 查询经销商数据 用于下拉框
 */
export const getStoreSelectList = (data) => {
  return get({
    "url": USER_URL + "/admin/store/list" + data,
    "data": {}
  });
};

/**
 * 查询经销商区域
 */
export const dealerRegion = (data) => {
  return get({
    "url": USER_URL + "/admin/dealerRegion/list" + data,
    "data": {}
  });
};

/**
 * 分页查询门店变更记录
 */
export const listStoreChangeRecordByPage = (data) => {
  return post({
    "url": USER_URL + "/admin/store/record/page" + data,
    "data": {}
  });
};
