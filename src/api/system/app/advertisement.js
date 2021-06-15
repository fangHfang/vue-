import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 分页查询广告位列表
 * @param data 查询DTO
 */
export const queryAdvertisementByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/query/page",
    data
  });
};

/**
 * 新增页面模板
 * @param data 新增DTO
 */
export const createAdvertisement = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/create",
    data
  });
};

/**
 * 修改页面模板
 * @param data 新增DTO
 */
export const modifyAdvertisement = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/modify",
    "method": "put",
    data
  });
};

/**
 * 删除广告位模板
 * @param data
 */
export const deleteAdvertisement = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/delete",
    data
  });
};

/**
 * 上架广告位
 * @param data status
 */
export const enableAdvertisement = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/enable",
    data
  });
};

/**
 * 下架广告位
 * @param data 新增DTO
 */
export const disableAdvertisement = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/disable",
    data
  });
};

/**
 * 查看广告位模板详情
 * @param data 新增DTO
 */
export const queryAdvertisementDetail = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/query",
    data
  });
};

/**
 * 新增广告位
 * @param data 新增DTO
 */
export const saveAdvertisement = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/save",
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