import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 分页模糊查询区域列表/分页查询所有区域列表
 * @param data 查询DTO
 */
export const pageSearchRegionList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/pageSearchRegion",
    data
  });
};

/**
 * 新增/修改区域
 * @param data 新增DTO
 */
export const createOrUpdateRegionDict = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/createOrUpdateRegionDict",
    data
  });
};

/**
 * 查询区域已配置省市区
 * @param data 查询DTO
 */
export const queryCityDictByRegion = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/queryCityDictByRegion",
    data
  });
};

/**
 * 新增区域
 * @param data 新增DTO
 */
export const createRegionDict = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/createRegionDict",
    data
  });
};

/**
 * 修改区域
 * @param data 新增DTO
 */
export const updateRegionDict = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/updateRegionDict",
    data
  });
};

/**
 * 状态修改
 * @param data 新增DTO
 */
export const updateRegionDictStatus = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/updateRegionDictStatus",
    data
  });
};

/**
 * 查询区域详情
 * @param data 查询DTO
 */
export const getRegionDictByRegionNo = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/queryRegionDictDetail",
    // "url": BASIC_URL + "/admin/regionDict/queryRegionDictByRegionNo",
    data
  });
};