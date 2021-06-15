import { post, get } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
* 登录
* @param data 登录信息
*/
export const login = (data) => {
  return post({
    "url": USER_URL + "/admin/login" + data,
    "data": {}
  });
};

/**
* 查询登录用户信息
*/
export const getLoginInfo = () => {
  return get({
    "url": USER_URL + "/admin/user/loginUser",
    "data": {}
  });
};

/**
 * 查询路由权限
 */
export const listMenuAll = () => {
  return get({
    "url": USER_URL + "/admin/resource/user/list",
    "data": {}
  });
};
