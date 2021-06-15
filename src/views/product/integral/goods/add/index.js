import {
  searchStartPointList
} from "@/api/product/startPoint";
import {
  editIntegralItemInfo,
  getIntegralItemInfo,
  saveIntegralItem
} from "@/api/product/integral/goods";
import {
  listItemWhiteList,
  listItemVisibility
} from "@/api/product/activity/promotion";
import {
  queryStoreSpecialPrice
} from "@/api/product/manage";
const customValidation = (rule, value, callback) => {
  callback(value > 0 ? "" : new Error("兑换总库存必须大于0"));
};
const customValidationCount = (rule, value, callback) => {
  callback(value > 0 ? "" : new Error("单店兑换限量必须大于0"));
};
export default {
  "name": "ProductBaseAdd",
  data() {
    return {
      "itemNo": this.$route.params.id || this.$route.query.itemNo || "",
      "identity": "add",
      "pageTitle": "新增商品",
      // 商品类型（1:商品；2：优惠券）
      "tabSelect": 1,
      // 初始化表单数据
      "addForm": {
        // 起订分规则编号
        "startPointNo": "",
        // 单店限购数量
        "limitCount": "",
        // 初始库存
        "initStock": "",
        "price": "",
        // 内部编码
        "outerRelationNo": ""
      },
      "couponCheck": false,
      "maxxisAddProductVisible": false,
      "couponDialogVisible": false,
      "startPointOptions": [],
      // 商品规格设置列表
      "specTemplateTable": [],
      // 优惠券列表
      "couponTemplateTable": [],
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
      "rules": {
        "limitCount": [
          { "required": true, "message": "请输入单店兑换限量", "trigger": "blur" },
          { "validator": customValidationCount, "trigger": "blur" }
        ],
        "initStock": [
          { "required": true, "message": "请输入总兑换库存", "trigger": "blur" },
          { "validator": customValidation, "trigger": "blur" }
        ],
        "startPointNo": [
          { "required": true, "message": "请选择起订分分规则", "trigger": "change" }
        ]
      },
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
      this.getGoodsDetail();
      if (this.identity === "detail") {
        this.pageTitle = "商品详情";
        this.getRemoteStoreTableData();
        this.getRemoteSpecStoreTableData();
        this.listItemVisibilityPage();
      } else if (this.identity === "edit") {
        this.pageTitle = "编辑商品";
      }
    }
  },
  mounted() {},
  "methods": {
    initPageOptions() {
      this.getStartPointList();
    },
    /**
     * 切换商品类型tab
     * @param i
     */
    selectTab(i) {
      this.tabSelect = i;
    },
    changeCouponCheck() {
      this.couponCheck = !this.couponCheck;
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
        "relationType": 3
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
        "relationType": 3
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
     * 获取起订分列表
     */
    getStartPointList() {
      // this.detailLoading = true;
      searchStartPointList().then((res) => {
        if (res.code === 200) {
          this.startPointOptions = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      }).finally(() => {});
    },
    /**
     * 获取商品详情
     */
    getGoodsDetail() {
      const postData = "?itemNo=" + this.itemNo;
      this.detailLoading = true;
      getIntegralItemInfo(postData).then(res => {
        if (res.code === 200) {
          this.tabSelect = res.data.itemType || 1;
          this.addForm.limitCount = res.data.limitCount;
          this.addForm.initStock = res.data.saleStatus === 0 ? res.data.initStock : res.data.stock;
          this.addForm.startPointNo = res.data.startPointNo;
          this.addForm.outerRelationNo = res.data.outerRelationNo;
          this.addForm.price = res.data.integrationCost || "";
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
          if (this.tabSelect === 1) {
            this.specTemplateTable = [ {
              "itemNo": res.data.relationNo,
              "itemName": res.data.itemName,
              "brandNo": res.data.brandNo,
              "brandName": res.data.brandName,
              "categoryName": res.data.categoryName,
              "categoryNo": res.data.categoryNo,
              "specDetail": res.data.specDetail
            } ];
          } else if (this.tabSelect === 2) {
            this.couponTemplateTable = [ {
              "couponCode": res.data.couponCode,
              "ruleName": res.data.itemName,
              "remark": res.data.couponDesc,
              "created": res.data.couponCreated,
              "status": res.data.couponStatus,
              "effectiveTime": res.data.couponEffectiveTime,
              "brandNo": res.data.brandNo,
              "categoryNo": res.data.categoryNo
            } ];
          }
        } else {
          this.$message.error(res.msg);
        }
        this.detailLoading = false;
      }).catch(() => {
        this.detailLoading = false;
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
    getSelectCoupon(list) {
      this.couponTemplateTable = list;
    },
    /**
     * 继续上架1
     */
    toPutOn() {
      console.log(this.identity);
      if (this.identity === "add") {
        if (!this.itemNo) {
          this.doSave().then((res) => {
            if (res) {
              this.$router.push({
                "path": "/product/integral/goods/upShelf",
                "query": {
                  "itemNo": res
                }
              });
            }
          }).catch(res => {
            this.btnLoading = false;
          });
        } else {
          this.$router.push({
            "path": "/product/integral/goods/upShelf",
            "query": {
              "itemNo": this.itemNo
            }
          });
        }
      } else if (this.identity === "edit") {
        if (this.saved) {
          this.$router.push({
            "path": "/product/integral/goods/upShelf",
            "query": {
              "itemNo": this.itemNo,
              "editInfo": {
                "detailInteRuleNo": this.detailInteRuleNo,
                "detailRebateRuleNo": this.detailRebateRuleNo,
                "price": this.addForm.price
              }
            }
          });
        } else {
          this.doSave().then((res) => {
            if (res) {
              this.$router.push({
                "path": "/product/integral/goods/upShelf",
                "query": {
                  "itemNo": res,
                  "editInfo": {
                    "detailInteRuleNo": this.detailInteRuleNo,
                    "detailRebateRuleNo": this.detailRebateRuleNo,
                    "price": this.addForm.price
                  }
                }
              });
            }
          }).catch(res => {
            this.btnLoading = false;
          });
        }
      }
    },
    /**
     * 获取选中的商品
     * @param list
     */
    getSelectProducts(list) {
      this.specTemplateTable = list;
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
      this.doSave().then(res => {
        this.itemNo = res;
      }).catch(res => {
        this.btnLoading = false;
      });
    },

    async doSave() {
      if (this.addForm.limitCount === "") {
        this.$message.warning("单店兑换限量不能为空");
        this.btnLoading = false;
        return;
      }
      if (this.addForm.initStock === "") {
        this.$message.warning("总兑换库存不能为空");
        this.btnLoading = false;
        return;
      }
      if (this.addForm.initStock === "0") {
        this.$message.warning("总兑换库存最少为1");
        this.btnLoading = false;
        return;
      }
      if (this.addForm.startPointNo === "") {
        this.$message.warning("起订分规则不能为空");
        this.btnLoading = false;
        return;
      }
      const param = {
        "itemType": this.tabSelect,
        "limitCount": this.addForm.limitCount,
        "initStock": this.addForm.initStock,
        "startPointNo": this.addForm.startPointNo,
        "outerRelationNo": this.addForm.outerRelationNo
      };
      let canSave = true;
      if (this.tabSelect === 1) {
        const specTemplateTable = JSON.parse(JSON.stringify(this.specTemplateTable));
        if (specTemplateTable.length < 1) {
          this.$message.warning("请添加商品");
          this.btnLoading = false;
          return;
        }
        specTemplateTable.forEach(x => {
          if (!x.itemName) {
            canSave = false;
            return this.$message.warning("商品名称不能为空");
          }
        });
        if (!canSave) {
          this.btnLoading = false;
          return;
        };
        param.itemName = specTemplateTable[0].itemName;
        param.categoryNo = specTemplateTable[0].categoryNo;
        param.brandNo = specTemplateTable[0].brandNo;
        param.specDetail = specTemplateTable[0].specDetail;
        param.relationNo = specTemplateTable[0].itemNo;
      } else if (this.tabSelect === 2) {
        const couponTemplateTable = JSON.parse(JSON.stringify(this.couponTemplateTable));
        if (couponTemplateTable.length < 1) {
          this.$message.warning("请添加优惠券");
          this.btnLoading = false;
          return;
        }
        couponTemplateTable.forEach(x => {
          if (!x.ruleName) {
            canSave = false;
            return this.$message.warning("优惠券名称不能为空");
          }
        });
        if (!canSave) {
          this.btnLoading = false;
          return;
        };
        // param.itemName = couponTemplateTable[0].couponName;
        // param.relationNo = couponTemplateTable[0].couponNo;
        param.itemName = couponTemplateTable[0].ruleName;
        param.relationNo = couponTemplateTable[0].ruleNo;
        param.brandNo = couponTemplateTable[0].brandNo;
        param.categoryNo = couponTemplateTable[0].categoryNo;
      }
      param.listPicture = this.imgDialog.fileList.listPicture.map(x => x.imgUrl).join("");
      param.bannerPicture = this.imgDialog.fileList.bannerPicture.map(x => x.imgUrl);
      param.detailPicture = this.imgDialog.fileList.detailPicture.map(x => x.imgUrl);
      if (this.identity === "edit") {
        param.itemNo = this.itemNo;
        const res = await editIntegralItemInfo(param);
        if (res.code === 200) {
          this.$message.success("保存成功!");
          this.saved = true;
          this.btnLoading = false;
          return this.itemNo;
        }
        this.$message.error(res.msg);
        this.btnLoading = false;
      } else {
        const res = await saveIntegralItem(param);
        if (res.code === 200) {
          this.$message.success("保存成功!");
          this.saved = true;
          this.btnLoading = false;
          return res.data;
        }
        this.$message.error(res.msg);
        this.btnLoading = false;
      }
    }
  }
};