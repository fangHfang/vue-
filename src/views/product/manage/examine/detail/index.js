import { listPageSearchEpRule } from "@/api/business/coupon/exchange";
import {
  listItemBrand,
  listItemCategorySelectShow,
  listItemLabel,
  getItemInfoDetail,
  itemVerify,
  queryCustomerItemPrice,
  queryStoreSpecialPrice
} from "@/api/product/manage";
import {
  listItemWhiteList,
  listItemVisibility
} from "@/api/product/activity/promotion";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
export default {
  "name": "ProductBaseAdd",
  data() {
    return {
      "itemNo": this.$route.params.id || "",
      "identity": "detail",
      "detail": {},
      // 初始化表单数据
      "addForm": {
        "itemType": 1,
        "brandNo": "",
        "itemName": "",
        "backCategory": [],
        "frontCategory": [],
        "labelNos": [],
        "specDetail": "",
        "listPicture": "",
        "bannerPicture": [],
        "detailPicture": [],
        "stock": "",
        // 优惠券限制
        "couponLimitType": true,
        "displayQuantity": "",
        "rebateRule": {
          "status": true,
          "value": "",
          "options": []
        },
        "integralRole": {
          "status": true,
          "value": "",
          "options": []
        },
        // 定位限制
        "positionLimit": {
          "value": "",
          "options": [
            { "label": "不限制", "value": 0 },
            { "label": "允许在门店范围内购买", "value": 1 }
          ]
        },
        // 显示规则
        "displayRules": {
          "value": "",
          "options": [
            { "label": "按数量显示", "value": 1 },
            { "label": "按百分比显示", "value": 2 }
          ]
        }
      },
      "maxxisAddProductVisible": false,
      "epRuleDialogVisible": false,
      // 兑换点规则Table数据
      "couponTableData": [],
      // 商品前端分类下拉框数据
      "itemBrandOptions": [],
      "itemFrontCategoryOptions": [],
      // 商品后端分类下拉框数据
      "itemBackCategoryOptions": [],
      // 商品标签下拉框数据
      "itemLabelRefOptions": [],
      // 商品规格设置列表
      "specTemplateTable": [],
      // 初始化图片数据
      "imgDialog": {
        "dialogVisible": {
          "listPicture": false,
          "bannerPicture": false,
          "detailPicture": false
        },
        "dialogImageUrl": {
          "listPicture": "",
          "bannerPicture": "",
          "detailPicture": ""
        },
        "fileList": {
          "listPicture": [],
          "bannerPicture": [],
          "detailPicture": []
        }
      },
      // 判断是否保存过的变量
      "saved": false,
      "productList": [],
      "detailLoading": false,
      "detailInteRuleNo": "",
      "detailRebateRuleNo": "",
      "multipleSelection": [],
      "epRuleList": [],
      "whitelist": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 40
        }
      },
      "specWhitelist": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 40
        }
      },
      "dealer": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 40
        }
      },
      "visibility": {
        "checked": false,
        "tableData": []
      },
      "toolBar": {
        "name": "",
        "dealerCustomerNo": "",
        "storeCustomerNo": "",
        "dealerCustomerNo2": "",
        "storeCustomerNo2": ""
      },
      "backCategoryName": "",
      "frontCategoryName": "",
      "labelName": "",
      "brandName": "",
      "refuseReason": "",
      "refuseDialog": false
    };
  },
  "components": {
  },
  "computed": {
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  created() {
    // 初始化下拉框
    this.initPageOptions();
    const path = this.$route.path.split("/");
    this.detail = this.$route.query.detail || {};
    if (this.itemNo) {
      this.identity = path[path.length - 2];
      this.listSearchEpRule();
      this.getRemoteDealerTableData();
      this.getRemoteSpecStoreTableData();
      this.listItemVisibilityPage();
      this.getRemoteStoreTableData();
      this.listItemVisibilityPage();
    }
  },
  mounted() {
  },
  "methods": {
    initPageOptions() {
      this.getFrontItemCategoryOptions();
      this.getBackItemCategoryOptions();
      this.getItemLabelOptions();
      this.getItemBrandOptions();
      this.listSearchRbRuleType();
      this.listSearchItRuleType();
    },

    /**
     * 获取商品可见性列表
     */
    listItemVisibilityPage() {
      const params = {
        "relationNo": this.itemNo,
        "relationType": 1
      };
      listItemVisibility(params).then(res => {
        if (res.code === 200) {
          this.visibility.tableData = res.data.itemVisibilityDtos || [];
          this.visibility.checked = res.data.visibleFlag === 1;
        } else {
          this.$message.error("查询可见性配置失败");
        }
      }).catch(() => {});
    },
    /**
     * 获取门店白名单列表
     */
    getRemoteStoreTableData() {
      const params = {
        "dealerCustomerNo": this.toolBar.dealerCustomerNo2,
        "storeCustomerNo": this.toolBar.storeCustomerNo2,
        "pageReq.pageNum": this.whitelist.pagination.current,
        "pageReq.pageSize": this.whitelist.pagination.size,
        "relationNo": this.itemNo,
        "relationType": 1
      };
      listItemWhiteList(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.whitelist.tableData = res.data.records;
          this.whitelist.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(() => {});
    },

    /**
     * 获取经销商列表
     */
    getRemoteDealerTableData() {
      const params = {
        "page.pageNum": this.dealer.pagination.current,
        "page.pageSize": this.dealer.pagination.size,
        "itemNo": this.itemNo
      };
      this.dealer.tableLoading = true;
      queryCustomerItemPrice(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.dealer.tableData = res.data.records;
          this.dealer.pagination.total = res.data.total;
          this.dealer.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.dealer.tableLoading = false;
        }
      }).catch(() => {
        this.dealer.tableLoading = false;
      });
    },
    /**
     * 获取特殊价格门店列表
     */
    getRemoteSpecStoreTableData() {
      const params = {
        "dealerNo": this.toolBar.dealerCustomerNo,
        "storeNo": this.toolBar.storeCustomerNo,
        "page.pageNum": this.specWhitelist.pagination.current,
        "page.pageSize": this.specWhitelist.pagination.size,
        "itemNo": this.itemNo
      };
      this.whitelist.tableLoading = true;
      queryStoreSpecialPrice(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.specWhitelist.tableData = res.data.records;
          this.specWhitelist.pagination.total = res.data.total;
          this.specWhitelist.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.specWhitelist.tableLoading = false;
        }
      }).catch(() => {
        this.specWhitelist.tableLoading = false;
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleDealerSizeChange(val) {
      this.dealer.pagination.size = val;
      this.getRemoteDealerTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleDealerCurrentChange(val) {
      this.dealer.pagination.current = val;
      this.getRemoteDealerTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleDealerSelectionChange(val) {
      this.dealer.multipleSelection = val;
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSpecWhitelistSizeChange(val) {
      this.specWhitelist.pagination.size = val;
      this.getRemoteSpecStoreTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleSpecWhitelistCurrentChange(val) {
      this.specWhitelist.pagination.current = val;
      this.getRemoteSpecStoreTableData();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleWhitelistSizeChange(val) {
      this.whitelist.pagination.size = val;
      this.getRemoteStoreTableData();
    },
    /**
     * 审核
     */
    toVerify(mark) {
      const params = {
        "itemNos": [ this.itemNo ],
        // 审核状态，0->待提审；1->未审核；2->审核通过；3->审核拒绝
        "verifyStatus": mark === "pass" ? 2 : 3
      };
      if (mark === "refuse") {
        this.refuseDialog = true;
        return;
      }
      itemVerify(params).then(res => {
        if (res.code === 200) {
          this.$message.success("审核成功");
          this.back();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    closedDialog() {
      this.refuseReason = "";
    },
    /**
     * 拒绝
     */
    doRefusing() {
      if (!this.refuseReason) {
        return this.$message.warning("请输入拒绝理由");
      }
      const params = {
        "itemNos": [ this.itemNo ],
        // 审核状态，0->待提审；1->未审核；2->审核通过；3->审核拒绝
        "verifyStatus": 3,
        "rejectReason": this.refuseReason
      };
      itemVerify(params).then(res => {
        if (res.code === 200) {
          this.refuseDialog = false;
          this.$message.success("审核成功");
          this.back();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleWhitelistCurrentChange(val) {
      this.whitelist.pagination.current = val;
      this.getRemoteStoreTableData();
    },
    /**
     * 分页查询数据
     */
    listSearchEpRule() {
      let postData = {
        "pageNum": 1,
        "pageSize": 200
      };
      this.detailLoading = true;
      postData = this.$jsonFormat(postData).substring(1);
      listPageSearchEpRule(postData).then((res) => {
        if (res.code === 200) {
          this.epRuleList = res.data.records;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      }).finally(() => {
        this.getGoodsDetail();
      });
    },
    /**
     * 获取商品详情
     */
    getGoodsDetail() {
      getItemInfoDetail(this.itemNo).then(res => {
        if (res.code === 200) {
          const backCategory = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 2).map(y => y.categoryNo);
          const frontCategory = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 1).map(y => y.wholeCategoryName);
          this.backCategoryName = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 2).map(y => y.wholeCategoryName).join(" | ");
          this.frontCategoryName = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 1).map(y => y.wholeCategoryName).join(" | ");
          this.labelName = res.data.labelInfos && res.data.labelInfos.map(x => x.labelName).join(" | ");
          this.brandName = res.data.brandName;
          this.addForm.itemType = res.data.itemType;
          this.addForm.brandNo = res.data.brandNo;
          this.addForm.itemName = res.data.itemName;
          this.addForm.backCategory = backCategory || [];
          this.addForm.labelNos = res.data.labelInfos && res.data.labelInfos.map(x => x.labelNo);
          this.addForm.specDetail = res.data.specDetail;
          this.imgDialog.fileList.listPicture = (res.data.listPicture && [ { "name": "", "url": res.data.listPicture, "imgUrl": res.data.listPicture } ]) || [];
          this.imgDialog.fileList.bannerPicture = (res.data.bannerPicture && res.data.bannerPicture.map(x => {
            return { "name": "", "url": x, "imgUrl": x };
          })) || [];
          this.imgDialog.fileList.detailPicture = (res.data.detailPicture && res.data.detailPicture.map(x => {
            return { "name": "", "url": x, "imgUrl": x };
          })) || [];
          this.specTemplateTable = res.data.packageItems;
          this.addForm.integralRole.value = res.data.inteRuleNo;
          this.addForm.rebateRule.value = res.data.rebateRuleNo;
          this.addForm.displayRules.value = res.data.displayRuleType;
          this.addForm.positionLimit.value = res.data.positionLimitType;
          this.addForm.couponLimitType = res.data.couponLimitType === 0;
          this.addForm.displayQuantity = res.data.displayQuantity;
          this.addForm.stock = res.data.stock;
          this.addForm.group = (frontCategory || []).join(" | ");

          const epRuleNo = res.data.epRuleNo || [];
          this.couponTableData = this.epRuleList.filter(x => epRuleNo.includes(x.ruleNo));
          this.detailInteRuleNo = res.data.inteRuleNo;
          this.detailRebateRuleNo = res.data.rebateRuleNo;
        } else {
          this.$message.error(res.msg);
        }
        this.detailLoading = false;
      });
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 查询返利规则列表
     */
    listSearchRbRuleType() {
      listSearchRbRule("type=0").then(res => {
        if (res.code === 200) {
          this.addForm.rebateRule.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询返利规则失败");
        }
      });
    },
    /**
     * 查询积分规则列表
     */
    listSearchItRuleType() {
      listSearchItRule("type=0").then(res => {
        if (res.code === 200) {
          this.addForm.integralRole.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询积分规则失败");
        }
      });
    },
    /**
     * 移除图片
     * @param {*} file
     * @param {*} fileList
     */
    handleRemove(file, type, list) {
      this.imgDialog.fileList[type] = this.imgDialog.fileList[type].filter(x => x.uid !== file.uid);
    },

    /**
     * 点击图片浏览
     * @param {*} file
     * @param {*} fileList
     */
    handlePictureCardPreview(file, type) {
      this.imgDialog.dialogImageUrl[type] = file.url;
      this.imgDialog.dialogVisible[type] = true;
    },

    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    toAddProduct() {
      this.maxxisAddProductVisible = true;
    },
    /**
     * 获取商品品牌下拉框选项
     * @returns {Promise<void>}
     */
    async getItemBrandOptions() {
      const result = await listItemBrand();
      if (result.code === 200) {
        this.itemBrandOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品前端分类下拉框选项
     * @returns {Promise<void>}
     */
    async getFrontItemCategoryOptions() {
      const result = await listItemCategorySelectShow(this.$jsonFormat({
        "categoryType": 1
      }));
      if (result.code === 200) {
        this.itemFrontCategoryOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品后端分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getBackItemCategoryOptions() {
      const result = await listItemCategorySelectShow(this.$jsonFormat({
        "categoryType": 2
      }));
      if (result.code === 200) {
        this.itemBackCategoryOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品标签下拉框选项
     * @returns {Promise<void>}
     */
    async getItemLabelOptions() {
      const result = await listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 }, "labelType": 2 });
      if (result.code === 200) {
        this.itemLabelRefOptions = result.data.records;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 商品图片上传成功钩子
     */
    handleAvatarSuccess(res, file) {
      file.imgUrl = res.data.objectUrl;
      this.imgDialog.fileList.listPicture.push(file);
    },
    /**
     * 商品详情轮播图上传成功时的钩子
     */
    handleAvatarbannerSuccess(res, file) {
      file.imgUrl = res.data.objectUrl;
      this.imgDialog.fileList.bannerPicture.push(file);
    },
    /**
     * 详情图上传成功钩子
     */
    handleAvatarDetailPictureSuccess(res, file) {
      file.imgUrl = res.data.objectUrl;
      this.imgDialog.fileList.detailPicture.push(file);
    },
    storeChange(val) {
      this.toolBar.storeCustomerNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerCustomerNo = val;
    },
    storeChange2(val) {
      this.toolBar.storeCustomerNo2 = val;
    },
    /**
     * 选择经销商
     */
    dealerChange2(val) {
      this.toolBar.dealerCustomerNo2 = val;
    }
  }
};