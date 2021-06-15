import { post, get } from "@/utils/request";
import { BBS_URL } from "@/utils/system-constant";
/**
 * 查询用户反馈分页
 * @param data
 */
export const listFeedbackByPage = (data) => {
  return post({
    "url": BBS_URL + "/admin/help/feedback/query/page",
    data
  });
};

/**
 * 标记处理
 */
export const enable = (data) => {
  return get({
    "url": BBS_URL + "/admin/help/feedback/enable?id=" + data,
    "data": {}
  });
};

/**
 * 标记未处理
 */
export const disable = (data) => {
  return get({
    "url": BBS_URL + "/admin/help/feedback/disable?id=" + data,
    "data": {}
  });
};