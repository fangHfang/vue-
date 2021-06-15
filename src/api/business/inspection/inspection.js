import { post, del, get } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 创建店检设置
 * @param data 新增DTO
 */
export const createInspect = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/create",
    data
  });
};

/**
 * 修改店检设置
 * @param data 新增DTO
 */
export const modifyInspect = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/modify",
    data
  });
};

/**
 * 启用店检设置
 * @param data 查询DTO
 */
export const enableInspect = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/enable",
    data
  });
};

/**
 * 禁用店检设置
 * @param data 查询DTO
 */
export const disableInspect = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/disable",
    data
  });
};

/**
 * 查询分页店检设置列表
 * @param data 查询DTO
 */
export const queryInspectByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/query/page",
    data
  });
};

/**
 * 查询店检设置详情
 * @param data 查询DTO
 */
export const queryInspect = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/query",
    data
  });
};

/* ---------------白名单----------------------*/
/**
 * 知识库白名单列表
 * @param params
 */
export const inspectQueryWhiteList = (params) => {
  return get({
    "url": BASIC_URL + "/admin/inspect/whiteList/page" + params,
    "data": {}
  });
};
/**
 * 知识库白名单添加
 * @param data
 */
export const inspectCreateWhiteList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/whiteList",
    data
  });
};
/**
 * 知识库白名单删除
 * @param data
 */
export const inspectDeleteWhiteList = (data) => {
  return del({
    "url": BASIC_URL + "/admin/inspect/whiteList",
    data
  });
};

/* ---------------可见性----------------------*/
/**
 * 知识库可见性列表
 * @param data
 */
export const inspectQueryVisibility = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/visibility/query",
    data
  });
};
/**
 * 知识库可见性添加
 * @param data
 */
export const inspectCreateVisibility = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/visibility/create",
    data
  });
};
/**
 * 知识库可见性删除
 * @param data
 */
export const inspectDeleteVisibility = (data) => {
  return del({
    "url": BASIC_URL + "/admin/inspect/visibility/remove",
    data
  });
};
