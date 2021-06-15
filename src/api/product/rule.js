import { get, post, put, del } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 查询分页列表
 * @param params
 */
export const pageSearchItRule = (params) => {
  return get({
    "url": MARKET_URL + "/admin/itRule/page?" + params,
    "data": {}
  });
};

/**
 * 返利规则查询详情
 * @param params
 */
export const itRuleDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/itRule/detail?" + params,
    "data": {}
  });
};

/**
 * 查询规则详情列表
 * @param params
 */
export const itRuleSettingDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/itRule/settingDetail?" + params,
    "data": {}
  });
};
/**
 * 删除规则详情
 * @param data
 */
export const deleteRuleDetail = (data) => {
  return post({
    "url": MARKET_URL + "/admin/itRule/deleteRuleDetail",
    data
  });
};

/**
 * 创建返利规则
 * @param data
 */
export const createItRule = (data) => {
  return post({
    "url": MARKET_URL + "/admin/itRule/create",
    data
  });
};

/**
 * 修改返利规则
 * @param data
 */
export const updateItRule = (data) => {
  return put({
    "url": MARKET_URL + "/admin/itRule/modify",
    data
  });
};
/**
 * 设置积分数值
 * @param data
 */
export const setItRuleAmount = (data) => {
  return post({
    "url": MARKET_URL + "/admin/itRule/setItRuleAmount",
    data
  });
};

/**
 * 删除返利规则
 * @param data
 */
export const deleteItRule = (data) => {
  return del({
    "url": MARKET_URL + "/admin/itRule/delete",
    data
  });
};

/**
 * 修改状态
 * @param data 规则DTO
 */
export const updateItRuleStatus = (data) => {
  return put({
    "url": MARKET_URL + "/admin/itRule/status",
    data
  });
};

/**
 * 查询列表
 * @param params
 */
export const listSearchItRule = (params) => {
  return get({
    "url": MARKET_URL + "/admin/itRule/list?" + params,
    "data": {}
  });
};