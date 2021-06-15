import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 分页查询子导航列表
 * @param data 查询DTO
 */
export const queryCarouselByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/query/page",
    data
  });
};

/**
 * 删除轮播图模板
 * @param data
 */
export const deleteCarousel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/delete",
    data
  });
};

/**
 * 新增轮播图名称
 * @param data 新增DTO
 */
export const createCarousel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/create",
    data
  });
};

/**
 * 修改轮播图名称
 * @param data 新增DTO
 */
export const modifyCarousel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/modify",
    "method": "put",
    data
  });
};

/**
 * 上架轮播图
 * @param data status
 */
export const enableCarousel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/enable",
    data
  });
};

/**
 * 下架轮播图
 * @param data 新增DTO
 */
export const disableCarousel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/disable",
    data
  });
};

/**
 * 新增轮播图
 * @param data 新增DTO
 */
export const saveCarousel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/save",
    data
  });
};

/**
 * 查看广告位模板详情
 * @param data 新增DTO
 */
export const queryCarouselDetail = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/banner/query",
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