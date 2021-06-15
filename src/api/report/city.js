
/** 注意：不要在当前页面写api，当前页面只是临时获取高德数据，后期可能会删除**/
import axios from "axios";
/**
 * 获取所有省市区数据
 * @param params
 */

export const getAllCityData = (params) => {
  return axios({
    "url": "https://restapi.amap.com/v3/config/district?" + params,
    "method": "get"
  });
};