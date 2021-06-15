import { post } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

/**
 * 分页查询店检列表(周期按月显示)
 * @param data 查询DTO
 */
export const queryInspectAuditByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/audit/query/page",
    data
  });
};

/**
 * 分页查询店检模板-店检审核列表(根据周期编号(cycleNo)查询)
 * @param data 查询DTO
 */
export const queryInspectAudit4CycleByPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/audit/query/inspect/page",
    data
  });
};

/**
 * 查询店检审核详情
 * @param data 查询DTO
 */
export const queryInspectAudit = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/audit/query",
    data
  });
};

/**
 * 导出店检审核详情
 * @param data 查询DTO
 */
export const exportInspectAudit = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/audit/export",
    data
  });
};

/**
 * 店检审核
 * @param data 查询DTO
 */
export const auditInspect = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/audit/auditInspect",
    data
  });
};

/**
 * 分页查询店检列表
 * @param data 查询DTO
 */
export const queryInspectAuditByInspectPage = (data) => {
  return post({
    "url": BASIC_URL + "/admin/inspect/audit/query/inspect/page",
    data
  });
};