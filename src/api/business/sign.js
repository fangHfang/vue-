import { get, post, put, del } from "@/utils/request";
import { MARKET_URL } from "@/utils/system-constant";

/**
 * 分页查询签到规则列表
 * @param params
 */
export const listPageSearchSiRule = (params) => {
  return get({
    "url": MARKET_URL + "/admin/siRule/page" + params,
    "data": {}
  });
};

/**
 * 签到规则查询详情
 * @param params
 */
export const siRuleDetail = (params) => {
  return get({
    "url": MARKET_URL + "/admin/siRule/detail" + params,
    "data": {}
  });
};

/**
 * 创建签到规则
 * @param data
 */
export const createSiRule = (data) => {
  return post({
    "url": MARKET_URL + "/admin/siRule/create",
    data
  });
};

/**
 * 修改签到规则
 * @param data
 */
export const modifySiRule = (data) => {
  return put({
    "url": MARKET_URL + "/admin/siRule/modify",
    data
  });
};

/**
 * 删除签到规则
 * @param data
 */
export const deleteSiRule = (data) => {
  return del({
    "url": MARKET_URL + "/admin/siRule/delete",
    data
  });
};

/**
 * 修改状态
 * @param data 规则DTO
 */
export const updateSiRuleStatus = (data) => {
  return put({
    "url": MARKET_URL + "/admin/siRule/status",
    data
  });
};

/**
 * 分页查询规则关联门店全部列表
 * @param params
 */
export const listPageSearchSiStoreRelation = (params) => {
  return get({
    "url": MARKET_URL + "/admin/siStoreRelation/page" + params,
    "data": {}
  });
};

/**
 * 查询规则关联门店全部列表
 * @param params
 */
export const listSearchSiStoreRelation = (params) => {
  return get({
    "url": MARKET_URL + "/admin/siStoreRelation/list" + params,
    "data": {}
  });
};

/**
 * 规则关联门店
 * @param data 规则关联DTO
 */
export const relateStoreSiRule = (data) => {
  return post({
    "url": MARKET_URL + "/admin/siStoreRelation/relate",
    data
  });
};
/* ---------签到记录--------*/

/**
 * 签到记录列表
 * @param data 规则关联DTO
 */
export const pageSiStoreRecordList = (data) => {
  return get({
    "url": MARKET_URL + "/admin/siStoreDetail/summary" + data,
    "data": {}
  });
};
/**
 * 签到人记录（详情）
 * @param data 规则关联DTO
 */
export const pageSiStoreRecordPersonList = (data) => {
  return get({
    "url": MARKET_URL + "/admin/siStoreDetail/page" + data,
    "data": {}
  });
};

/* ---------签到记录--------*/

/* ---------签到规则门店关联--------*/
/**
 * 查询是否全部可见
 */
export const hasVisibility = (ruleNo) => {
  return get({
    "url": MARKET_URL + "/admin/siStoreRelation/hasVisibility/" + ruleNo,
    "data": {}
  });
};

/**
 * 配置门店可见性
 */
export const setVisibility = (data) => {
  return put({
    "url": MARKET_URL + "/admin/siStoreRelation/visibility",
    data
  });
};

/**
 * 关联
 */
export const linkSiStoreRelation = (data) => {
  return post({
    "url": MARKET_URL + "/admin/siStoreRelation/relate",
    data
  });
};

/**
 * 删除关联
 */
export const delLinkSiStoreRelation = (data) => {
  return post({
    "url": MARKET_URL + "/admin/siStoreRelation/deleteRelate",
    data
  });
};

/**
 * 查询全部列表
 */
export const listSiStoreRelationAll = (data) => {
  return get({
    "url": MARKET_URL + "/admin/siStoreRelation/list" + data,
    "data": {}
  });
};

/**
 * 查询是否全部可见
 */
export const listSiStoreRelationByPage = (ruleNo) => {
  return get({
    "url": MARKET_URL + "/admin/siStoreRelation/page" + ruleNo,
    "data": {}
  });
};
