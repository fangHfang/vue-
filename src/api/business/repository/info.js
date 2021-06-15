import { post, get, del } from "@/utils/request";
import { BBS_URL } from "@/utils/system-constant";

/**
 * 分页查询帖子列表
 * @param data 查询DTO
 */
export const articleQueryList = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/query/page",
    data
  });
};
/**
 * 审核帖子分页列表
 * @param data 查询DTO
 */
export const articleAuditList = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/audit/page",
    data
  });
};

/**
 * 查看帖子详情
 */
export const articleQueryDetail = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/query",
    data
  });
};
/**
 *
 根据id审核帖子
 * @param data 查询DTO
 */
export const auditAticleById = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/auditAticleById",
    data
  });
};

/**
 * 修改帖子状态
 */
export const articleModifyState = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/modifyState",
    data
  });
};

/**
 * 修改帖子
 */
export const articleModify = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/modify",
    data
  });
};

/**
 * 创建新增帖子
 */
export const articleCreate = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/create",
    data
  });
};

/**
 * 获取发帖规则
 */
export const getArticleRule = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/getArticleRule",
    data
  });
};

/**
 * 保存发帖规则
 */
export const saveArticleRule = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/saveArticleRule",
    data
  });
};

/* ---------------白名单----------------------*/
/**
 * 知识库白名单列表
 * @param params
 */
export const infoQueryWhiteList = (params) => {
  return get({
    "url": BBS_URL + "/admin/article/whiteList/page" + params,
    "data": {}
  });
};
/**
 * 知识库白名单添加
 * @param data
 */
export const infoCreateWhiteList = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/whiteList",
    data
  });
};
/**
 * 知识库白名单删除
 * @param data
 */
export const infoDeleteWhiteList = (data) => {
  return del({
    "url": BBS_URL + "/admin/article/whiteList",
    data
  });
};

/* ---------------可见性----------------------*/
/**
 * 知识库可见性列表
 * @param data
 */
export const infoQueryVisibility = (data) => {
  return post({
    "url": BBS_URL + "/admin/visibility/query",
    data
  });
};
/**
 * 知识库可见性添加
 * @param data
 */
export const infoCreateVisibility = (data) => {
  return post({
    "url": BBS_URL + "/admin/visibility/create",
    data
  });
};
/**
 * 知识库可见性删除
 * @param data
 */
export const infoDeleteVisibility = (data) => {
  return del({
    "url": BBS_URL + "/admin/visibility/remove",
    data
  });
};

/* -------评论------*/

/**
 * 知识库评论列表
 * @param data
 */
export const pageQueryArticleCommentList = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/comment/pageQueryArticleCommentList",
    data
  });
};

/**
 * 知识库评论详情
 * @param data
 */
export const queryCommentDetail = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/comment/queryCommentDetail",
    data
  });
};

/**
 * 知识库修改评论状态
 * @param data
 */
export const updateArticleCommentStatus = (data) => {
  return post({
    "url": BBS_URL + "/admin/article/comment/updateArticleCommentStatus",
    data
  });
};