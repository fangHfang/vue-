import { post, upload } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 分页查询橱窗列表
 * @param data 查询DTO
 */
export const pageSearchWindowList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/query/page",
    data
  });
};

/**
 * 启用橱窗
 * @param data
 */
export const enableWindowPicture = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/enable",
    data
  });
};

/**
 * 禁用橱窗
 * @param data
 */
export const disableWindowPicture = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/disable",
    data
  });
};

/**
 * 新增橱窗更多产品
 * @param data
 */
export const createPictureItem = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/item/create",
    data
  });
};

/**
 * 删除橱窗更多产品
 * @param data
 */
export const delPictureItem = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/item/delete",
    data
  });
};

/**
 * 分页查询橱窗更多产品
 * @param data 查询DTO
 */
export const listPictureItem = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/item/query/page",
    data
  });
};

/**
 * 新增橱窗列表
 * @param data
 */
export const pictureDisplaySaveBasic = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/save/basic",
    data
  });
};

/**
 * 新增橱窗详情
 * @param data
 */
export const pictureDisplaySave = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/save/detail",
    data
  });
};

/**
 * 新增橱窗规则
 * @param data
 */
export const pictureDisplayCreate = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/create",
    data
  });
};
/**
 * 编辑橱窗规则
 * @param data
 */
export const pictureDisplayModify = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/modify",
    data
  });
};

/**
 * 查询橱窗列表
 * @param data
 */
export const queryDisplay = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/query",
    data
  });
};

/**
 * 查询橱窗详情
 * @param data
 */
export const displayByNo = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/query/detail",
    data
  });
};

/**
 * 删除橱窗列表
 * @param data
 */
export const delDisplay = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/display/display/delete",
    data
  });
};

/**
/**
 * 文件上传接口
 * @param data
 */
export const toUpload = ({ file, target }) => {
  return upload({
    "url": BASIC_URL + "/admin/oss/upload?target=" + target,
    "data": file
  });
};