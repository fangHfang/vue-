import { get, put } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询门店定位列表
 * @param data 查询DTO
 */
export const pageSearchStoreLocationList = (data) => {
  return get({
    "url": USER_URL + "/admin/store/location/page?" + data,
    "data": {}
  });
};

/**
 *
 * 门店定位详情
 * @param data 新增DTO
 */
export const detailStoreLocation = (data) => {
  return get({
    "url": USER_URL + "/admin/store/location/detail?" + data,
    "data": {}
  });
};

/**
 * 启用门店定位
 * @param data 新增DTO
 */
export const enableStoreLocation = (data) => {
  return put({
    "url": USER_URL + "/admin/store/location/enable",
    data
  });
};

/**
 * 禁用门店定位
 * @param data 新增DTO
 */
export const disableStoreLocation = (data) => {
  return put({
    "url": USER_URL + "/admin/store/location/disable",
    data
  });
};

/**
 * 门店定位审批
 * @param data 新增DTO
 */
export const approveStoreLocation = (data) => {
  return put({
    "url": USER_URL + "/admin/store/location/approval",
    data
  });
};

/**
 * 门店定位审批
 * @param data 新增DTO
 */
export const approval = (data) => {
  return put({
    "url": USER_URL + "/admin/store/Approval",
    data
  });
};

/**
 * 门店定位审批通过
 * @param data 新增DTO
 */
export const passeStoreLocation = (data) => {
  return put({
    "url": USER_URL + "/admin/store/location/passed",
    data
  });
};

/**
 * 门店定位审批拒绝
 * @param data 新增DTO
 */
export const rejectStoreLocation = (data) => {
  return put({
    "url": USER_URL + "/admin/store/location/rejected",
    data
  });
};
