import { get, post } from "@/utils/request";
import { BASIC_URL, USER_URL } from "@/utils/system-constant";

/**
 * 查询公告分页
 * @param data 保存DTO
 */
export const listAppByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/msg/query/page",
    data
  });
};

/**
 * 开启
 */
export const enable = (data) => {
  return get({
    "url": BASIC_URL + "/admin/msg/enable?noticeNo=" + data,
    "data": {}
  });
};

/**
 * 关闭
 */
export const disable = (data) => {
  return get({
    "url": BASIC_URL + "/admin/msg/disable?noticeNo=" + data,
    "data": {}
  });
};

/**
 * 查询关联
 * @param {} data
 */
export const relation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/msg/relation/query/page",
    data
  });
};

/**
 * 创建公告关联
 */
export const relationCreate = (data) => {
  return post({
    "url": BASIC_URL + "/admin/msg/relation/create",
    data
  });
};

/**
 * 删除公告关联
 */
export const relationDelete = (data) => {
  return post({
    "url": BASIC_URL + "/admin/msg/relation/delete",
    data
  });
};

/**
 * 新增
 * @param {} data
 */
export const save = (data) => {
  return post({
    "url": BASIC_URL + "/admin/msg/create",
    data
  });
};

/**
 * 修改
 */
export const modify = (data) => {
  return post({
    "url": BASIC_URL + "/admin/msg/modify",
    data
  });
};

/**
 * 查询详情
 */
export const searchList = (data) => {
  return get({
    "url": BASIC_URL + "/admin/msg/query?noticeNo=" + data,
    "data": {}
  });
};

/**
 * 查询门店性质
 */
export const searchStoreLevelList = (data) => {
  return get({
    "url": USER_URL + "/admin/store/levelList?" + data,
    "data": {}
  });
};