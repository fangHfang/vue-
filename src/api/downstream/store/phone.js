import { get, put, post } from "@/utils/request";
import { USER_URL } from "@/utils/system-constant";

/**
 * 发送验证码
 * @param data 查询DTO
 */
export const sendPhoneCode = (data) => {
  return put({
    "url": USER_URL + "/admin/user/code",
    data
  });
};