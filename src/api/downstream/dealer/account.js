import { get, post, put } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询总部帐号列表
 * @param data 查询DTO
 */
export const pageSearchUserList = (data) => {
  return get({
    "url": USER_URL + "/admin/user/dealer/page?" + data,
    "data": {}
  });
};

/**
 * 启用总部帐号
 * @param data 新增DTO
 */
export const enableUserAccount = (data) => {
  return put({
    "url": USER_URL + "/admin/user/dealer/enable",
    data
  });
};

/**
 * 禁用总部帐号
 * @param data 新增DTO
 */
export const disableUserAccount = (data) => {
  return put({
    "url": USER_URL + "/admin/user/dealer/disable",
    data
  });
};

/**
 * 修改总部帐号
 * @param data 新增DTO
 */
export const modifyUserAccount = (data) => {
  return put({
    "url": USER_URL + "/admin/user/dealer/modify",
    data
  });
};

/**
 * 创建总部帐号
 * @param data 新增DTO
 */
export const createUserAccount = (data) => {
  return post({
    "url": USER_URL + "/admin/user/dealer/create",
    data
  });
};

/**
 * 总部帐号详情
 * @param data 新增DTO
 */
export const detailUserAccount = (data) => {
  return get({
    "url": USER_URL + "/admin/user/dealer/detail?" + data,
    "data": {}
  });
};

/**
 * 查询经销商分页列表
 * @param data 分页DTO
 */
export const listDealerPage = (data) => {
  return get({
    "url": USER_URL + "/admin/dealer/page" + data
  });
};
