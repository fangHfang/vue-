import { get, post, put, del } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 查询公告分页
 * @param data 保存DTO
 */
export const listNoticeByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/notice/query/page",
    data
  });
};

/**
 * 保存
 */
export const save = (data) => {
  return post({
    "url": BASIC_URL + "/admin/notice/create",
    data
  });
};

/**
 * 修改
 */
export const modify = (data) => {
  return post({
    "url": BASIC_URL + "/admin/notice/modify",
    data
  });
};

/**
 * 开启
 */
export const enable = (data) => {
  return get({
    "url": BASIC_URL + "/admin/notice/enable?noticeNo=" + data,
    "data": {}
  });
};

/**
 * 关闭
 */
export const disable = (data) => {
  return get({
    "url": BASIC_URL + "/admin/notice/disable?noticeNo=" + data,
    "data": {}
  });
};

/**
 * 查询详情
 */
export const searchList = (data) => {
  return get({
    "url": BASIC_URL + "/admin/notice/query?noticeNo=" + data,
    "data": {}
  });
};

/**
 * 查询关联
 * @param {} data
 */
export const relation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/notice/relation/query/page",
    data
  });
};

/**
 * 创建公告关联
 */
export const relationCreate = (data) => {
  return post({
    "url": BASIC_URL + "/admin/notice/relation/create",
    data
  });
};