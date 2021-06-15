import { post, del, get } from "@/utils/request";
import { BASIC_URL } from "@/utils/system-constant";

export default {

  /* ---------------商品橱窗------------------*/
  /**
   * 可见性新增
   * @param data 查询DTO
   */
  "windowCreateVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/display/create/visibility",
      data
    });
  },

  /**
   * 可见性删除
   * @param data 查询DTO
   */
  "windowDeleteVisibility": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/display/remove",
      data
    });
  },

  /**
   * 可见性查询
   * @param data 查询DTO
   */
  "windowQueryVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/display/query/visibility",
      data
    });
  },

  /**
   * 白名单查询
   * @param data 查询DTO
   */
  "windowQueryWhiteList": (data) => {
    return get({
      "url": BASIC_URL + "/admin/picture/display/whiteList/page" + data
    });
  },

  /**
   * 白名单删除
   * @param data 查询DTO
   */
  "windowDeleteWhiteList": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/display/whiteList",
      data
    });
  },

  /**
   * 白名单添加
   * @param data 查询DTO
   */
  "windowCreateWhiteList": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/display/whiteList",
      data
    });
  },

  /* ---------------子导航------------------*/
  /**
   * 可见性新增
   * @param data 查询DTO
   */
  "navigationCreateVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/navigation/create/visibility",
      data
    });
  },

  /**
   * 可见性删除
   * @param data 查询DTO
   */
  "navigationDeleteVisibility": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/navigation/remove",
      data
    });
  },

  /**
   * 可见性查询
   * @param data 查询DTO
   */
  "navigationQueryVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/navigation/query/visibility",
      data
    });
  },

  /**
   * 白名单查询
   * @param data 查询DTO
   */
  "navigationQueryWhiteList": (data) => {
    return get({
      "url": BASIC_URL + "/admin/picture/navigation/whiteList/page" + data
    });
  },

  /**
   * 白名单删除
   * @param data 查询DTO
   */
  "navigationDeleteWhiteList": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/navigation/whiteList",
      data
    });
  },

  /**
   * 白名单添加
   * @param data 查询DTO
   */
  "navigationCreateWhiteList": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/navigation/whiteList",
      data
    });
  },

  /* ---------------广告位设置------------------*/
  /**
   * 可见性新增
   * @param data 查询DTO
   */
  "advertisementCreateVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/create/visibility",
      data
    });
  },

  /**
   * 可见性删除
   * @param data 查询DTO
   */
  "advertisementDeleteVisibility": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/remove",
      data
    });
  },

  /**
   * 可见性查询
   * @param data 查询DTO
   */
  "advertisementQueryVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/query/visibility",
      data
    });
  },

  /**
   * 白名单查询
   * @param data 查询DTO
   */
  "advertisementQueryWhiteList": (data) => {
    return get({
      "url": BASIC_URL + "/admin/picture/whiteList/page" + data
    });
  },

  /**
   * 白名单删除
   * @param data 查询DTO
   */
  "advertisementDeleteWhiteList": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/whiteList",
      data
    });
  },

  /**
   * 白名单添加
   * @param data 查询DTO
   */
  "advertisementCreateWhiteList": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/whiteList",
      data
    });
  },

  /* ---------------横幅设置------------------*/
  /**
   * 可见性新增
   * @param data 查询DTO
   */
  "bannerCreateVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/horizontal/create/visibility",
      data
    });
  },

  /**
   * 可见性删除
   * @param data 查询DTO
   */
  "bannerDeleteVisibility": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/horizontal/remove",
      data
    });
  },

  /**
   * 可见性查询
   * @param data 查询DTO
   */
  "bannerQueryVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/horizontal/query/visibility",
      data
    });
  },

  /**
   * 白名单查询
   * @param data 查询DTO
   */
  "bannerQueryWhiteList": (data) => {
    return get({
      "url": BASIC_URL + "/admin/picture/horizontal/whiteList/page" + data
    });
  },

  /**
   * 白名单删除
   * @param data 查询DTO
   */
  "bannerDeleteWhiteList": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/horizontal/whiteList",
      data
    });
  },

  /**
   * 白名单添加
   * @param data 查询DTO
   */
  "bannerCreateWhiteList": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/horizontal/whiteList",
      data
    });
  },

  /* ---------------轮播图------------------*/
  /**
   * 可见性新增
   * @param data 查询DTO
   */
  "carouselCreateVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/banner/create/visibility",
      data
    });
  },

  /**
   * 可见性删除
   * @param data 查询DTO
   */
  "carouselDeleteVisibility": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/banner/remove",
      data
    });
  },

  /**
   * 可见性查询
   * @param data 查询DTO
   */
  "carouselQueryVisibility": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/banner/query/visibility",
      data
    });
  },

  /**
   * 白名单查询
   * @param data 查询DTO
   */
  "carouselQueryWhiteList": (data) => {
    return get({
      "url": BASIC_URL + "/admin/picture/banner/whiteList/page" + data
    });
  },

  /**
   * 白名单删除
   * @param data 查询DTO
   */
  "carouselDeleteWhiteList": (data) => {
    return del({
      "url": BASIC_URL + "/admin/picture/banner/whiteList",
      data
    });
  },

  /**
   * 白名单添加
   * @param data 查询DTO
   */
  "carouselCreateWhiteList": (data) => {
    return post({
      "url": BASIC_URL + "/admin/picture/banner/whiteList",
      data
    });
  }
};
