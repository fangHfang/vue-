import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";
/**
 * 模糊搜索分页列表/所有省市区列表
 * @param data
 */
export const pageSearchCityList = (data) => {
  return post({
    "url": BASIC_URL + "/admin/cityDict/pageSearchCity",
    data
  });
};

/**
 * 查询区域详情
 * @param data 查询DTO
 */
export const queryCityDictTree = (data) => {
  return post({
    "url": BASIC_URL + "/admin/regionDict/queryRegionDictDetail",
    data
  });
};

/**
 * 查询区域详情
 * @param data 查询DTO
 */
export const queryRegionDictDetail = (data) => {
  return post({
    "url": BASIC_URL + "/admin/cityDict/queryCityDictTree",
    data
  });
};