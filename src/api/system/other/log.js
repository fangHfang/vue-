import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";
/**
 * 查询操作日志分页列表
 * @param data
 */
export const pageSearchOperationLog = (data) => {
  return post({
    "url": BASIC_URL + "/admin/operationLog/pageSearchOperationLog",
    data
  });
};
