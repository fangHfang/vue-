import { post, get, put } from "@/utils/request";
import { BBS_URL } from "@/utils/system-constant";
/**
 * 查询帮助中心分页列表
 * @param data
 */
export const listHelpByPage = (data) => {
  return post({
    "url": BBS_URL + "/admin/help/query/page",
    data
  });
};

/**
 * 查看帮助信息
 * @param data
 */
export const helpDetail = (data) => {
  return post({
    "url": BBS_URL + "/store/app/feedback/query/detail",
    data
  });
};

/**
 * 修改状态
 */
export const enable = (data) => {
  return get({
    "url": BBS_URL + "/admin/help/enable?helpNo=" + data,
    "data": {}
  });
};

export const disable = (data) => {
  return get({
    "url": BBS_URL + "/admin/help/disable?helpNo=" + data,
    "data": {}
  });
};

/**
 * 查询详情
 */
export const searchList = (data) => {
  return get({
    "url": BBS_URL + "/admin/help/query?helpNo=" + data,
    "data": {}
  });
};

/**
 *新增
 */
export const helpCreate = (data) => {
  return post({
    "url": BBS_URL + "/admin/help/create",
    data
  });
};

/**
 * 修改状态
 */
export const modify = (data) => {
  return put({
    "url": BBS_URL + "/admin/help/modify",
    data
  });
};