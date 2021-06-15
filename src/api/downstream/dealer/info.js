import { get, put, post } from "@/utils/request";
import { USER_URL, ITEM_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询经销商列表
 * @param data 查询DTO
 */
export const pageSearchDealerList = (data) => {
  return get({
    "url": USER_URL + "/admin/dealer/page?" + data,
    "data": {}
  });
};

/**
 * 经销商名称和code字段列表
 */
export const searchDealerNameList = () => {
  return get({
    "url": USER_URL + "/admin/dealer/nameList",
    "data": {}
  });
};

/**
 * 启用经销商
 * @param data 新增DTO
 */
export const enableDealer = (data) => {
  return put({
    "url": USER_URL + "/admin/dealer/enable",
    data
  });
};

/**
 * 禁用经销商
 * @param data 新增DTO
 */
export const disableDealer = (data) => {
  return put({
    "url": USER_URL + "/admin/dealer/disable",
    data
  });
};

/**
 * 修改经销商
 * @param data 新增DTO
 */
export const modifyDealer = (data) => {
  return put({
    "url": USER_URL + "/admin/dealer/modify",
    data
  });
};

/**
 * 创建经销商
 * @param data 新增DTO
 */
export const createDealer = (data) => {
  return post({
    "url": USER_URL + "/admin/dealer/create",
    data
  });
};

/**
 * 经销商详情
 * @param data 新增DTO
 */
export const detailDealer = (data) => {
  return get({
    "url": USER_URL + "/admin/dealer/detail?" + data,
    "data": {}
  });
};

/**
 *
 组织结构分页
 * @param data 查询DTO
 */
export const pageSearchDealerOrgList = (data) => {
  return get({
    "url": USER_URL + "/admin/dealer/page/org?" + data,
    "data": {}
  });
};

/**
 * 启用经销商组织
 * @param data 新增DTO
 */
export const enableDealerOrg = (data) => {
  return put({
    "url": USER_URL + "/admin/dealer/enableOrg",
    data
  });
};

/**
 * 禁用经销商组织
 * @param data 新增DTO
 */
export const disableDealerOrg = (data) => {
  return put({
    "url": USER_URL + "/admin/dealer/disableOrg",
    data
  });
};

/**
 * 变更组织
 * @param data 新增DTO
 */
export const changeDealerOrg = (data) => {
  return put({
    "url": USER_URL + "/admin/dealer/change",
    data
  });
};

/**
 * 回显经销商设置的商品价格
 * @param data 查询DTO
 */
export const listCustomerSetPriceByPage = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemInfo/showCustomerSetPrice" + data,
    "data": {}
  });
};

/**
 * 查询经销商数据 用于下拉框
 */
export const getDealerSelectList = (data) => {
  return get({
    "url": USER_URL + "/admin/dealer/list" + data,
    "data": {}
  });
};

/**
 * 经销商详情
 * @param data 新增DTO
 */
export const nameList = (data) => {
  return get({
    "url": USER_URL + "/admin/pay/nameList",
    data
  });
};