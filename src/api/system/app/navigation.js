import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 分页查询子导航列表
 * @param data 查询DTO
 */
export const queryNavigationByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/query/page",
    data
  });
};

/**
 * 下架子导航
 * @param data 新增DTO
 */
export const disableStateNavigation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/disable",
    data
  });
};
/**
 * 上架子导航
 * @param data 新增DTO
 */
export const enableStateNavigation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/enable",
    data
  });
};

/**
 * 查看子导航模板详情
 * @param data 新增DTO
 */
export const queryNavigationDetail = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/query",
    data
  });
};

/**
 * 修改子导航模板
 * @param data 新增DTO
 */
export const modifyNavigation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/modify",
    "method": "put",
    data
  });
};

/**
 * 新增子导航
 * @param data 新增DTO
 */
export const saveNavigation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/save",
    data
  });
};

/**
 * 删除子导航模板
 * @param data
 */
export const deleteNavigation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/delete",
    data
  });
};

/**
 * 新增子导航模板
 * @param data 新增DTO
 */
export const createNavigation = (data) => {
  return post({
    "url": BASIC_URL + "/admin/picture/navigation/create",
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
