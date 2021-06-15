import {
  listPageSearchEpRule
} from "@/api/business/coupon/exchange";
import {
  listItemBrand,
  listItemCategorySelectShow,
  listItemLabel,
  savePackageItem,
  getItemInfoDetail,
  modifyPackageItem,
  queryCustomerItemPrice,
  queryStoreSpecialPrice
} from "@/api/product/manage";
import {
  listItemWhiteList,
  listItemVisibility
} from "@/api/product/activity/promotion";
import {
  listSearchRbRule
} from "@/api/business/rebate/rule";
import {
  listSearchItRule
} from "@/api/product/rule";
export default {
  "name": "ProductBaseAdd",
  data() {
    return {
      "itemNo": this.$route.params.id || "",
      "identity": "add",
      "pageTitle": "新增套餐商品",
      "rules": {
        "itemName": [ {
          "required": true,
          "message": "请输入商品名称",
          "trigger": "blur"
        } ],
        "backCategory": [ {
          "required": true,
          "message": "请选择后端分类",
          "trigger": "change"
        } ],
        "frontCategory": [ {
          "required": true,
          "message": "请选择前端分类",
          "trigger": "change"
        } ]
      },
      // 初始化表单数据
      "addForm": {
        "pkgType": 1,
        "brandNo": "",
        "itemName": "",
        "itemNo": "",
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
          "status": false,
          "value": "",
          "options": []
        },
        "integralRole": {
          "status": false,
          "value": "",
          "options": []
        },
        // 定位限制
        "positionLimit": {
          "value": "",
          "options": [ {
            "label": "不限制",
            "value": 0
          },
          {
            "label": "允许在门店范围内购买",
            "value": 1
          }
          ]
        },
        // 显示规则
        "displayRules": {
          "value": "",
          "options": [ {
            "label": "按数量显示",
            "value": 1
          },
          {
            "label": "按百分比显示",
            "value": 2
          }
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
        "storeCustomerNo": ""
      },
      "backCategoryName": "",
      "frontCategoryName": "",
      "labelName": "",
      "btnLoading": false
    };
  },
  "components": {},
  "computed": {
    token() {
      return {
        "Authorization": "bearer " + this.$store.state.token
      };
    }
  },
  created() {
    // 初始化下拉框
    this.initPageOptions();
    const path = this.$route.path.split("/");
    if (this.itemNo) {
      this.identity = path[path.length - 2];
      this.listSearchEpRule();
      if (this.identity === "detail") {
        this.pageTitle = "套餐商品详情";
        this.getRemoteStoreTableData();
        this.getRemoteDealerTableData();
        this.getRemoteSpecStoreTableData();
        this.listItemVisibilityPage();
      } else if (this.identity === "edit") {
        this.pageTitle = "编辑套餐商品";
      } else if (this.identity === "copy") {
        this.pageTitle = "复制套餐商品";
      }
    }
  },
  mounted() {},
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
     * 获取门店白名单列表
     */
    getRemoteStoreTableData() {
      const params = {
        "dealerCustomerNo": this.toolBar.dealerCustomerNo,
        "storeCustomerNo": this.toolBar.storeCustomerNo,
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
      }).catch(() => {});
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
      // 哪个傻逼把接口入参偷偷改了还不在群里艾特 烦死了
      let postData = {
        "page.pageNum": 1,
        "page.pageSize": 200
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
          const frontCategory = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 1).map(y => y.categoryNo);
          this.backCategoryName = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 2).map(y => y.wholeCategoryName).join(" | ");
          this.frontCategoryName = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 1).map(y => y.wholeCategoryName).join(" | ");
          this.labelName = res.data.labelInfos && res.data.labelInfos.map(x => x.labelName).join(" | ");
          this.addForm.pkgType = res.data.pkgType;
          this.addForm.itemType = res.data.itemType;
          this.addForm.brandNo = res.data.brandNo;
          this.addForm.itemName = res.data.itemName;
          this.addForm.itemNo = res.data.itemNo;
          this.addForm.backCategory = backCategory || [];
          this.addForm.frontCategory = frontCategory || [];
          this.addForm.labelNos = res.data.labelInfos && res.data.labelInfos.map(x => x.labelNo);
          this.addForm.specDetail = res.data.specDetail;
          this.imgDialog.fileList.listPicture = (res.data.listPicture && [ {
            "name": "",
            "url": res.data.listPicture,
            "imgUrl": res.data.listPicture
          } ]) || [];
          this.imgDialog.fileList.bannerPicture = (res.data.bannerPicture && res.data.bannerPicture.map(x => {
            return {
              "name": "",
              "url": x,
              "imgUrl": x
            };
          })) || [];
          this.imgDialog.fileList.detailPicture = (res.data.detailPicture && res.data.detailPicture.map(x => {
            return {
              "name": "",
              "url": x,
              "imgUrl": x
            };
          })) || [];
          this.specTemplateTable = res.data.packageItems;
          this.addForm.integralRole.value = res.data.inteRuleNo;
          this.addForm.rebateRule.value = res.data.rebateRuleNo;
          this.addForm.integralRole.status = !!res.data.inteRuleNo;
          this.addForm.rebateRule.status = !!res.data.rebateRuleNo;
          this.addForm.displayRules.value = res.data.displayRuleType;
          this.addForm.positionLimit.value = res.data.positionLimitType;
          this.addForm.couponLimitType = res.data.couponLimitType === 0;
          this.addForm.displayQuantity = res.data.displayQuantity;
          this.addForm.stock = res.data.initStock;

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
     * 批量移除套餐内商品
     */
    removeBatch(row) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("确认取消当前商品么", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const filterList = multipleSelection.map(x => x.itemNo);
        this.specTemplateTable = this.specTemplateTable.filter(x => !filterList.includes(x.itemNo));
      }).catch(() => {});
    },
    /**
     * 查询返利规则列表
     */
    listSearchRbRuleType() {
      listSearchRbRule("type=0").then(res => {
        if (res.code === 200) {
          this.addForm.rebateRule.options = res.data.filter(x => (x.type === 0 && x.status === 1)).map(element => {
            return {
              "label": element.ruleName,
              "value": element.ruleNo
            };
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
          this.addForm.integralRole.options = res.data.filter(x => (x.type === 0 && x.status === 1)).map(element => {
            return {
              "label": element.ruleName,
              "value": element.ruleNo
            };
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
     * 获取选中的兑换点
     * @param list
     */
    getSelectRules(list) {
      this.couponTableData = Array.from(new Set([ ...this.couponTableData, ...list ]));
    },
    /**
     * 删除某个兑换点规则
     * @param ruleNo
     */
    deleteEpRule(ruleNo) {
      this.$confirm("确认删除当前兑换点规则么", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.couponTableData.forEach((x, i, arr) => {
          if (x.ruleNo === ruleNo) {
            arr.splice(i, 1);
          }
        });
      }).catch(() => {});
    },
    /**
     * 删除全部兑换点规则
     */
    deleteEpRuleAll() {
      this.$confirm("确认删除全部兑换点规则么", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.couponTableData = [];
      }).catch(() => {});
    },
    /**
     * 继续上架1
     */
    toPutOn() {
      this.btnLoading = true;
      if (this.identity === "add") {
        if (!this.itemNo) {
          this.$refs.addForm.validate(async (valid) => {
            if (valid) {
              this.doSave().then((res) => {
                if (res) {
                  this.$router.push({
                    "path": "/product/activity/package/upShelf",
                    "query": {
                      "itemNo": res
                    }
                  });
                }
              });
              return;
            }
            console.log("必填项不为空");
            this.btnLoading = false;
          });
        } else {
          this.$router.push({
            "path": "/product/activity/package/upShelf",
            "query": {
              "itemNo": this.itemNo
            }
          });
        }
      } else if (this.identity === "edit") {
        if (this.saved) {
          this.$router.push({
            "path": "/product/activity/package/upShelf",
            "query": {
              "itemNo": this.itemNo,
              "editInfo": {
                "detailInteRuleNo": this.detailInteRuleNo,
                "detailRebateRuleNo": this.detailRebateRuleNo
              }
            }
          });
        } else {
          this.$refs.addForm.validate(async (valid) => {
            if (valid) {
              this.doSave().then((res) => {
                if (res) {
                  this.$router.push({
                    "path": "/product/activity/package/upShelf",
                    "query": {
                      "itemNo": res,
                      "editInfo": {
                        "detailInteRuleNo": this.detailInteRuleNo,
                        "detailRebateRuleNo": this.detailRebateRuleNo
                      }
                    }
                  });
                }
              });
              return;
            }
            console.log("必填项不为空");
            this.btnLoading = false;
          });
        }
      } else if (this.identity === "copy") {
        if (!this.saved) {
          this.$refs.addForm.validate(async (valid) => {
            if (valid) {
              this.doSave().then((res) => {
                if (res) {
                  this.$router.push({
                    "path": "/product/activity/package/upShelf",
                    "query": {
                      "itemNo": res
                    }
                  });
                }
              });
              return;
            }
            console.log("必填项不为空");
            this.btnLoading = false;
          });
        } else {
          this.$router.push({
            "path": "/product/activity/package/upShelf",
            "query": {
              "itemNo": this.itemNo
            }
          });
        }
      }
    },
    /**
     * 详情下一步
     */
    next() {
      this.$router.push({
        "path": "/product/activity/package/upShelf",
        "query": {
          "itemNo": this.itemNo,
          "detailInfo": {
            "detailInteRuleNo": this.detailInteRuleNo,
            "detailRebateRuleNo": this.detailRebateRuleNo
          }
        }
      });
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
      const result = await listItemLabel({
        "request": {
          "pageNum": 1,
          "pageSize": -1
        },
        "labelType": 2
      });
      if (result.code === 200) {
        this.itemLabelRefOptions = result.data.records;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取选中的商品
     * @param list
     */
    getSelectProducts(list) {
      const arr = this.specTemplateTable.map(x => x.itemNo);
      const formatList = list.map(x => {
        return {
          ...x,
          "quantity": "",
          "price": x.price || "",
          "label": x.labelInfos && x.labelInfos.map(y => y.labelName).join("|")
        };
      });
      formatList.forEach(v => {
        if (!arr.includes(v.itemNo)) {
          this.specTemplateTable.push(v);
        }
      });
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
    /**
     * 保存
     */
    async saveItem() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          this.itemNo = await this.doSave();
          return;
        }
        console.log("error submit!!");
        this.btnLoading = false;
        return false;
      });
    },

    async doSave() {
      if (!this.addForm.rebateRule.status) {
        this.addForm.rebateRule.value = "";
      }
      if (!this.addForm.integralRole.status) {
        this.addForm.integralRole.value = "";
      }
      const param = this._.cloneDeep(this.addForm);
      param.backCategory = param.backCategory.join("|");
      const specTemplateTable = JSON.parse(JSON.stringify(this.specTemplateTable));
      if (specTemplateTable.length < 1) {
        this.$message.warning("请添加套餐内商品");
        this.btnLoading = false;
        return;
      }
      let canSave = true;
      specTemplateTable.some(x => {
        if (!x.price && x.price !== 0) {
          canSave = false;
          return this.$message.warning("套餐内商品原价不能为空");
        }
        if (!x.quantity && x.quantity !== 0) {
          canSave = false;
          return this.$message.warning("套餐内商品数量不能为空");
        }
        if (x.quantity < 0) {
          canSave = false;
          return this.$message.warning("套餐内商品数量需大于等于0");
        }
      });
      if (!canSave) {
        this.btnLoading = false;
        return;
      };
      param.packageItemRelationReqs = this.specTemplateTable.map(x => {
        return {
          "itemNo": x.itemNo,
          "quantity": x.quantity,
          "price": x.price
        };
      });
      param.couponLimitType = param.couponLimitType ? 1 : 0;
      param.displayRuleType = param.displayRules.value;
      param.inteRuleNo = param.integralRole.value;
      param.rebateRuleNo = param.rebateRule.value;
      param.positionLimitType = param.positionLimit.value;
      param.epRuleNo = this.couponTableData.map(x => x.ruleNo || x.epRuleNo);
      param.listPicture = this.imgDialog.fileList.listPicture.map(x => x.imgUrl).join("");
      param.bannerPicture = this.imgDialog.fileList.bannerPicture.map(x => x.imgUrl);
      param.detailPicture = this.imgDialog.fileList.detailPicture.map(x => x.imgUrl);
      delete param.displayRules;
      delete param.integralRole;
      delete param.rebateRule;
      delete param.positionLimit;
      this.btnLoading = true;
      if (this.identity === "edit") {
        param.itemNo = this.itemNo;
        try {
          const res = await modifyPackageItem(param);
          if (res.code === 200) {
            this.$message.success("保存成功!");
            this.saved = true;
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
            return this.itemNo;
          }
          this.$message.error(res.msg);
          this.btnLoading = false;
        } catch (err) {
          this.$message.error(err.msg || "保存失败");
          this.btnLoading = false;
          setTimeout(() => {
            this.btnLoading = false;
          }, 100);
        }
      } else {
        try {
          const res = await savePackageItem(param);
          if (res.code === 200) {
            this.$message.success("保存成功!");
            this.saved = true;
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
            return res.data;
          }
          this.$message.error(res.msg);
          this.btnLoading = false;
        } catch (err) {
          this.$message.error(err.msg || "保存失败");
          this.btnLoading = false;
          setTimeout(() => {
            this.btnLoading = false;
          }, 100);
        }
      }
    }
  }
};
