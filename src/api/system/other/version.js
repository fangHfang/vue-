import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 模糊搜索分页列表/所有版本列表
 * @param data 条件
 */
export const pageSearchVersion = (data) => {
  return post({
    "url": BASIC_URL + "/admin/version/pageSearchVersion",
    data
  });
};

/**
 * 新增版本信息
 * @param data 条件
 */
export const newVersion = (data) => {
  return post({
    "url": BASIC_URL + "/admin/version/newVersion",
    data
  });
};

/**
 * 修改版本信息状态
 * @param data 条件
 */
export const updateVersionStatusById = (data) => {
  return post({
    "url": BASIC_URL + "/admin/version/updateVersionStatusById",
    data
  });
};

/**
 * 根据id查询版本详情
 * @param data 条件
 */
export const queryVersionDetailById = (data) => {
  return post({
    "url": BASIC_URL + "/admin/version/queryVersionDetailById",
    data
  });
};