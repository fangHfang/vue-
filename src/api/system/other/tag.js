import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 查询标签分页列表
 * @param data
 */
export const pageSearchLabelList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/label/pageSearchLabel",
    data
  });
};

/**
 * 修改标签状态
 * @param data 标签DTO
 */
export const updateLabelStatus = (data) => {
  return post({
    "url": BASIC_URL + "/admin/label/updateLabelStatus",
    data
  });
};

/**
 * 编辑/通过labelNo查询标签
 * @param data 标签DTO
 */
export const queryLabelByNo = (data) => {
  return post({
    "url": BASIC_URL + "/admin/label/queryLabelByNo",
    data
  });
};

/**
 * 修改标签信息
 * @param data 标签DTO
 */
export const updateLabel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/label/updateLabel",
    data
  });
};

/**
 * 新增标签信息
 * @param data 标签DTO
 */
export const createLabel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/label/createLabel",
    data
  });
};

/**
 * 查询标签下拉
 * @param data
 */
export const pageSearchcategoriesLabel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/label/categoriesLabel",
    data
  });
};