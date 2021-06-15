import { post } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 创建总部帐号
 * @param data 新增DTO
 */
export const listDealerByPage = (data) => {
  return post({
    "url": USER_URL + "/admin/cust/user/pageUser",
    data
  });
};

/**
 * 修改用户手机
 * @param data 新增DTO
 */
export const modUserPhone = (data) => {
  return post({
    "url": USER_URL + "/admin/cust/user/modUserPhone",
    data
  });
};