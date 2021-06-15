import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 分页查询横图列表
 * @param data 查询DTO
 */
export const pageSearchBannerList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/horizontal/query/page",
    data
  });
};
/**
 * 新增横图列表
 * @param {*} data
 */
export const create = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/horizontal/create",
    data
  });
};
/**
 * 编辑横幅名称
 * @param {*} data
 */
export const modify = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/horizontal/modify",
    data
  });
};
/**
 * 新增横幅详情
 * @param {*} data
 */
export const createItem = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/horizontal/save",
    data
  });
};

/**
 * 查询
 * @param {*} data
 */
export const searchList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/horizontal/query",
    data
  });
};

/**
 * 文件上传接口
 */
export const toUpload = (file, target) => {
  return post({
    "url": BASIC_URL + "/admin/oss/upload?target=" + target,
    "data": file
  });
};

/**
 * 下架
 */
export const disable = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/horizontal/disable",
    data
  });
};

/**
 * 上架
 */
export const enable = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/horizontal/enable",
    data
  });
};