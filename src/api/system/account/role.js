import { get, post, put } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 角色查询分页列表
 * @param params
 */
export const pageSearchRole = (params) => {
  return get({
    "url": USER_URL + "/admin/role/page?" + params,
    "data": {}
  });
};

/**
 * 角色查询详情
 * @param params
 */
export const roleDetail = (params) => {
  return get({
    "url": USER_URL + "/admin/role/detail?" + params,
    "data": {}
  });
};

/**
 * 创建角色
 * @param data 角色DTO
 */
export const createRole = (data) => {
  return post({
    "url": USER_URL + "/admin/role/create",
    data
  });
};

/**
 * @param data 角色DTO
 */
export const updateRole = (data) => {
  return put({
    "url": USER_URL + "/admin/role/modify",
    data
  });
};

/**
 * 角色禁用
 * @param data 角色DTO
 */
export const roleDisable = (data) => {
  return put({
    "url": USER_URL + "/admin/role/disable",
    data
  });
};

/**
 * 角色启用
 * @param data 角色DTO
 */
export const roleEnable = (data) => {
  return put({
    "url": USER_URL + "/admin/role/enable",
    data
  });
};

/**
 * 加载资源树
 * @param params
 */
export const getResourceTree = (params) => {
  return get({
    "url": USER_URL + "/admin/resource/tree?" + params,
    "data": {}
  });
};
