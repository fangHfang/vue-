import dialogAddProduct from "@/components/dialogAddProduct/index.vue";
import dialogMaxxisAddProduct from "@/components/dialogMaxxisAddProduct/index.vue";
import { queryProductDetailByProductNo } from "@/api/system/base/product";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
import {
  listItemWhiteList,
  listItemVisibility
} from "@/api/product/activity/promotion";
import {
  listItemBrand,
  listItemCategorySelectShow,
  listItemLabel,
  saveItem,
  getItemInfoDetail,
  modifyItem,
  queryCustomerItemPrice,
  queryStoreSpecialPrice
} from "@/api/product/manage";
export default {
  "name": "ProductBaseAdd",
  data() {
    return {
      "itemNo": this.$route.params.id || "",
      "identity": "add",
      "pageTitle": "新增商品",
      "rules": {
        "itemName": [
          { "required": true, "message": "请输入商品名称", "trigger": "blur" }
        ],
        "backCategory": [
          { "required": true, "message": "请选择后端分类", "trigger": "change" }
        ],
        "frontCategory": [
          { "required": true, "message": "请选择前端分类", "trigger": "change" }
        ]
      },
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
        "detailPicture": []
      },
      "maxxisAddProductVisible": false,
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
      "detailInteRuleList": [],
      "detailRebateRuleList": [],
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
      "btnLoading": false
    };
  },
  "components": {
    dialogAddProduct,
    dialogMaxxisAddProduct
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
    if (this.itemNo) {
      this.identity = path[path.length - 2];
      this.getGoodsDetail();
      if (this.identity === "detail") {
        this.pageTitle = "商品详情";
        this.listSearchRbRuleType();
        this.listSearchItRuleType();
        this.getRemoteStoreTableData();
        this.getRemoteDealerTableData();
        this.getRemoteSpecStoreTableData();
        this.listItemVisibilityPage();
      } else if (this.identity === "edit") {
        this.pageTitle = "编辑商品";
      }
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
    },
    /**
     * 获取商品详情
     */
    getGoodsDetail() {
      this.detailLoading = true;
      getItemInfoDetail(this.itemNo).then(res => {
        if (res.code === 200) {
          const backCategory = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 2).map(y => y.categoryNo);
          const frontCategory = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 1).map(y => y.categoryNo);
          this.backCategoryName = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 2).map(y => y.wholeCategoryName).join(" | ");
          this.frontCategoryName = res.data.itemCategoryDTOS && res.data.itemCategoryDTOS.filter(x => x.categoryType === 1).map(y => y.wholeCategoryName).join(" | ");
          this.labelName = res.data.labelInfos && res.data.labelInfos.map(x => x.labelName).join(" | ");
          this.addForm.itemType = res.data.itemType;
          this.addForm.brandNo = res.data.brandNo;
          this.addForm.itemName = res.data.itemName;
          this.addForm.backCategory = backCategory || [];
          this.addForm.frontCategory = frontCategory || [];
          this.addForm.labelNos = res.data.labelInfos && res.data.labelInfos.map(x => x.labelNo);
          this.addForm.specDetail = res.data.specDetail;
          this.imgDialog.fileList.listPicture = (res.data.listPicture && [ { "name": "", "url": res.data.listPicture, "imgUrl": res.data.listPicture } ]) || [];
          this.imgDialog.fileList.bannerPicture = (res.data.bannerPicture && res.data.bannerPicture.map(x => {
            return { "name": "", "url": x, "imgUrl": x };
          })) || [];
          this.imgDialog.fileList.detailPicture = (res.data.detailPicture && res.data.detailPicture.map(x => {
            return { "name": "", "url": x, "imgUrl": x };
          })) || [];
          const productNo = res.data.productNo;
          this.tableProductList(productNo);
          this.detailInteRuleNo = res.data.inteRuleNo;
          this.detailRebateRuleNo = res.data.rebateRuleNo;
        } else {
          this.$message.error(res.msg);
        }
        this.detailLoading = false;
      });
    },
    handleDisplayName(mark) {
      if (mark === "rebate") {
        const find = this.detailRebateRuleList.find(x => x.value === this.detailRebateRuleNo) || {};
        return find.label || "";
      }
      const find = this.detailInteRuleList.find(x => x.value === this.detailInteRuleNo) || {};
      return find.label || "";
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
      }).catch(() => {});
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
     * 查询返利规则列表
     */
    listSearchRbRuleType() {
      listSearchRbRule("type=0").then(res => {
        if (res.code === 200) {
          this.detailRebateRuleList = res.data.map(element => {
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
          this.detailInteRuleList = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询积分规则失败");
        }
      });
    },
    /**
     * 分页查询产品列表
     */
    tableProductList(productNo) {
      const params = {
        productNo
      };
      queryProductDetailByProductNo(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.specTemplateTable = [ res.data ];
        } else {
          console.error("查询失败,请稍后重试");
        }
      }).catch(() => {
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
         * 继续上架1
         */
    toPutOn() {
      if (this.identity === "add") {
        if (!this.itemNo) {
          this.$refs.addForm.validate(async (valid) => {
            if (valid) {
              this.doSave().then((res) => {
                if (res) {
                  this.$router.push({ "path": "/product/manage/maxxis/upShelf", "query": { "itemNo": res } });
                }
              }).catch(res => {
                this.btnLoading = false;
              });
              return;
            }
            console.log("必填项不为空");
            this.btnLoading = false;
          });
        } else {
          this.$router.push({ "path": "/product/manage/maxxis/upShelf", "query": { "itemNo": this.itemNo } });
        }
      } else if (this.identity === "edit") {
        if (this.saved) {
          this.$router.push({
            "path": "/product/manage/maxxis/upShelf",
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
                    "path": "/product/manage/maxxis/upShelf",
                    "query": {
                      "itemNo": res,
                      "editInfo": {
                        "detailInteRuleNo": this.detailInteRuleNo,
                        "detailRebateRuleNo": this.detailRebateRuleNo
                      }
                    }
                  });
                }
              }).catch(res => {
                this.btnLoading = false;
              });
              return;
            }
            this.btnLoading = false;
            console.log("必填项不为空");
          });
        }
      }
    },
    /**
     * 详情下一步
     */
    next() {
      this.$router.push({
        "path": "/product/manage/maxxis/upShelf",
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
      const result = await listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 }, "labelType": 2 });
      if (result.code === 200) {
        this.itemLabelRefOptions = result.data.records;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
         * 接受子组件传过来的值
         */
    getProductCode(val) {
      this.specTemplateTable = val;
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
          this.doSave().then(res => {
            if (res) {
              this.itemNo = res;
              this.btnLoading = false;
              this.$router.push({ "path": "/product/manage/maxxis/list" });
            }
          }).catch(res => {
            this.btnLoading = false;
          });
          return;
        }
        console.log("error submit!!");
        this.btnLoading = false;
        return false;
      });
    },

    async doSave() {
      const param = this._.cloneDeep(this.addForm);
      param.backCategory = param.backCategory.join("|");
      if (this.specTemplateTable.length < 1) {
        this.$message.warning("请添加商品（玛吉斯基础产品）");
        this.btnLoading = false;
        return;
      }
      param.specDetail = this.specTemplateTable[0] && this.specTemplateTable[0].specDetail;
      param.productNo = this.specTemplateTable[0] && this.specTemplateTable[0].productNo;
      param.brandNo = this.specTemplateTable[0] && this.specTemplateTable[0].brandCode;
      param.productCode = this.specTemplateTable[0] && this.specTemplateTable[0].productCode;
      param.listPicture = this.imgDialog.fileList.listPicture.map(x => x.imgUrl).join("");
      param.bannerPicture = this.imgDialog.fileList.bannerPicture.map(x => x.imgUrl);
      param.detailPicture = this.imgDialog.fileList.detailPicture.map(x => x.imgUrl);
      this.btnLoading = true;
      if (this.identity === "edit") {
        param.itemNo = this.itemNo;
        try {
          const res = await modifyItem(param);
          this.btnLoading = false;
          if (res.code === 200) {
            this.$message.success("保存成功!");
            this.saved = true;
            return this.itemNo;
          }
          this.$message.error(res.msg || "保存失败");
        } catch (err) {
          this.$message.error(err.msg || "保存失败");
          this.btnLoading = false;
        }
      } else {
        try {
          const res = await saveItem(param);
          this.btnLoading = false;
          if (res.code === 200) {
            this.$message.success("保存成功!");
            this.saved = true;
            return res.data;
          }
          this.$message.error(res.msg || "保存失败");
        } catch (err) {
          this.$message.error(err.msg || "保存失败");
          this.btnLoading = false;
        }
      }
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