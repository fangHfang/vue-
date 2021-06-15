import { get, post, put, del } from "@/utils/request";
import { ITEM_URL, BASIC_URL, USER_URL, TRADE_URL } from "@/utils/system-constant";

/**
 * 分页查询商品信息
 * @param data 查询DTO
 */
export const listItemInfoByPage = (data) => {
  return get({
    "url": ITEM_URL + `/admin/itemInfo/page${data}`
  });
};

/**
 * 根据商品编号查询商品信息详情
 * @param itemNo 商品编号
 */
export const getItemInfoDetail = (itemNo) => {
  return get({
    "url": ITEM_URL + `/admin/itemInfo/itemDetail?itemNo=${itemNo}`
  });
};

/**
 * 上架第一步
 * @param itemNo 商品编号
 */
export const applySaleStepOne = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/applySaleStepOne",
    data
  });
};

/**
 * 上架第二步
 * @param itemNo 商品编号
 */
export const applySaleStepTwo = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/applySaleStepTwo" + data,
    "data": {}
  });
};

/**
 * 查询所有商品类别
 * @param data 查询DTO
 */
export const listItemCategory = (data) => {
  return get({
    "url": ITEM_URL + `/admin/itemCategory/list${data}`
  });
};

/**
 * 查询所有商品类别
 * @param data 查询DTO
 */
export const listItemCategorySelectShow = (data) => {
  return get({
    "url": ITEM_URL + `/admin/itemCategory/list/show${data}`
  });
};

/**
 * 查询所有商品类别
 * @param data 查询DTO
 */
export const listItemCategoryByPage = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemCategory/page" + data
  });
};

/**
 * 查询所有商品标签
 * @param data 查询DTO
 */
export const listItemLabel = (data) => {
  return post({
    "url": BASIC_URL + "/admin/label/pageSearchLabel",
    data
  });
};

/**
 * 查询所有商品品牌
 */
export const listItemBrand = () => {
  return get({
    "url": ITEM_URL + "/admin/itemBrand/list"
  });
};

/**
 * 保存商品
 */
export const saveItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/saveItem",
    data
  });
};

/**
 * 保存套餐商品
 */
export const savePackageItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/savePackageItem",
    data
  });
};

/**
 * 修改商品
 */
export const modifyItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/update",
    data
  });
};

/**
 * 修改套餐商品
 */
export const modifyPackageItem = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/updatePackageItem",
    data
  });
};

/**
 * 查询所有商品规格
 */
export const listSpecTemplate = () => {
  return get({
    "url": ITEM_URL + "/admin/specTemplate/list"
  });
};

/**
 * 查询所有商品规格
 */
export const saveItemPicture = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemPicture/save",
    data
  });
};

/**
 * 分页查询门店列表
 */
export const listStoreByPage = (data) => {
  return get({
    "url": USER_URL + `/admin/store/page${data}`
  });
};

/**
 * 商品审核
 */
export const itemApply = (data) => {
  return put({
    "url": "/api/item/itemApply",
    data
  });
};

/**
 * 查询退货单分页列表
 */
export const listRefundPage = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/refund/query/page",
    data
  });
};

/**
 * 查询退货单详情
 */
export const listOrderRefundItems = (data) => {
  return post({
    "url": TRADE_URL + "/admin/order/refund/query/page/detail",
    data
  });
};

/* -------------商品上架接口---------------*/

/**
 * 通过产品编号查询经销商的商品库存
 */
export const queryItemStock = (data) => {
  return get({
    "url": ITEM_URL + "/admin/stockInfo/query/item/stock" + data
  });
};

/**
 * 通过库存编码调整经销商的商品库存
 */
export const adjustItemStock = (data) => {
  return get({
    "url": ITEM_URL + "/admin/stockInfo/adjust/item/stock" + data
  });
};
/**
 * 通过商品编号查询商品总库存
 */
export const queryTotalStock = (data) => {
  return get({
    "url": ITEM_URL + "/admin/stockInfo/query/item/totalStock" + data
  });
};

/**
 * 通过商品编号查询经销商商品价格
 */
export const queryCustomerItemPrice = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemInfo/queryCustomerItemPrice" + data
  });
};

/**
 * 查询特殊门店商品价格
 */
export const queryStoreSpecialPrice = (data) => {
  return get({
    "url": ITEM_URL + "/admin/itemInfo/querySpecialPrice" + data
  });
};

/**
 * 保存经销商商品价格
 */
export const saveDealerPrice = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/savePrice",
    data
  });
};

/**
 * 更新经销商商品价格
 */
export const updateDealerPrice = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/updatePrice",
    data
  });
};

/**
 * 保存经销商商品价格
 */
export const saveStoreSpecialPrice = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/saveSpecialPrice",
    data
  });
};

/**
 * 更新经销商商品价格
 */
export const updateStoreSpecialPrice = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/updateSpecialPrice",
    data
  });
};

/**
 * 删除经销商商品价格
 */
export const deleteDealerPrice = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/deletePrice",
    data
  });
};

/**
 * 删除经销商商品价格
 */
export const deleteStoreSpecialPrice = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/deleteSpecialPrice",
    data
  });
};

/**
 * 下架
 */
export const offSale = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemInfo/offSale",
    data
  });
};

/**
 * 商品删除
 */
export const itemInfoDel = (data) => {
  return del({
    "url": ITEM_URL + "/admin/itemInfo",
    data
  });
};

/* --------------------------商品审核----------------------------*/

/**
 * 分页查询商品审核信息
 * @param data 查询DTO
 */
export const listItemApplyByPage = (data) => {
  return get({
    "url": ITEM_URL + `/admin/itemApply/page${data}`
  });
};

/**
 * 商品审核√
 */
export const itemVerify = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemApply/itemVerify",
    data
  });
};

/* ------商品限购----*/

/**
 * 分页查询商品限购配置表
 * @param data 查询DTO
 */
export const pageItemPurchaseLimit = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemPurchaseLimit/page",
    data
  });
};

/**
 * 删除商品限购配置表
 * @param data 查询DTO
 */
export const deleteItemPurchaseLimit = (data) => {
  return del({
    "url": ITEM_URL + `/admin/itemPurchaseLimit${data}`,
    "data": {}
  });
};

/**
 * 创建商品限购配置表
 * @param data 查询DTO
 */
export const createItemPurchaseLimit = (data) => {
  return post({
    "url": ITEM_URL + "/admin/itemPurchaseLimit/save",
    data
  });
};