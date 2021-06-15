import { get, post, put } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 查询礼包分页列表
 * @param params
 */
export const pageSearchRegPkg = (params) => {
  return get({
    "url": MARKET_URL + "/admin/regPkg/page" + params,
    "data": {}
  });
};

/**
 * 查询礼包详情
 * @param params
 */
export const regPkgDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/regPkg/detail" + params,
    "data": {}
  });
};

/**
 * 创建礼包
 * @param data
 */
export const createRegPkg = (data) => {
  return post({
    "url": MARKET_URL + "/admin/regPkg/create",
    data
  });
};

/**
 * 修改礼包
 * @param data
 */
export const updateRegPkg = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/modify",
    data
  });
};

/**
 * 上架
 * @param data
 */
export const upShelfRegPkg = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/enable",
    data
  });
};

/**
 * 下架
 * @param data
 */
export const downShelfRegPkg = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/disable",
    data
  });
};

// ------------------------------配置范围--------------------------------------

/**
 * 经销商列表
 * @param params
 */
export const listRegPkgDealer = (params) => {
  return get({
    "url": MARKET_URL + "/admin/regPkg/white/page/dealer" + params,
    "data": {}
  });
};

/**
 * 经销商列表删除
 * @param data
 */
export const removeRegPkgDealer = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/white/dealer/remove",
    data
  });
};

/**
 * 经销商列表创建
 * @param data
 */
export const createRegPkgDealer = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/white/dealer/create",
    data
  });
};

/**
 * 区域 删除
 * @param data
 */
export const removeRegPkgRegion = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/white/region/remove",
    data
  });
};

/**
 * 区域 添加
 * @param data
 */
export const createRegPkgRegion = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/white/region/create",
    data
  });
};

/**
 * 区域 列表
 * @param data
 */
export const listRegPkgRegion = (data) => {
  return get({
    "url": MARKET_URL + "/admin/regPkg/white/page/region" + data,
    "data": {}
  });
};

/**
 * 查询是否全部可见
 * @param data
 */
export const listRegPkgVisibility = (data) => {
  return get({
    "url": MARKET_URL + "/admin/regPkg/white/detail" + data,
    "data": {}
  });
};

/**
 * 取消全部可见
 * @param data
 */
export const cancelRegPkgVisibility = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/white/invisibility",
    data
  });
};

/**
 * 设置全部可见
 * @param data
 */
export const setRegPkgVisibility = (data) => {
  return put({
    "url": MARKET_URL + "/admin/regPkg/white/visibility",
    data
  });
};

/**
 * 礼包领取记录列表
 * @param data
 */
export const pageRegPkgRecord = (data) => {
  return get({
    "url": MARKET_URL + "/admin/regPkg/records/page" + data,
    "data": {}
  });
};
