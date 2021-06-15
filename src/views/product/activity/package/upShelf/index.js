import {
  getItemInfoDetail,
  applySaleStepOne,
  queryCustomerItemPrice,
  queryStoreSpecialPrice,
  saveDealerPrice,
  updateDealerPrice,
  saveStoreSpecialPrice,
  updateStoreSpecialPrice,
  deleteDealerPrice,
  deleteStoreSpecialPrice
} from "@/api/product/manage";
export default {
  "name": "ProductBaseUpShelf",
  "components": {
  },
  data() {
    return {
      "itemNo": this.$route.query.itemNo || "",
      "detail": false,
      "saved": false,
      "dealer": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 0
        }
      },
      "whitelist": {
        "multipleSelection": [],
        "tableData": [],
        "tableLoading": false,
        "pagination": {
          "sizes": [ 5, 10, 20, 50 ],
          "current": 1,
          "size": 5,
          "total": 0
        }
      },
      "dialogDealerVisible": false,
      "dialogStoreVisible": false,
      "toolBar": {
        "storeName": "",
        "storeCustomerNo": "",
        "dealerName": "",
        "dealerCustomerNo": ""
      },
      "showStoreNumberDialog": false,
      "rowDataList": [],
      "tableData": [
        {
          "dealerCode": "123584665465646",
          "dealerName": "玛吉斯",
          "dealerTag": "NUY",
          "storeCode": "325479258",
          "storeName": "玛吉斯123",
          "storeTag": "ACV",
          "storeNature": "A级性质",
          "storeId": "87654567"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "selection": [],
      "itemInfo": {
        "itemName": "",
        "brandName": "",
        "backCategoryName": "",
        "bannerPicture": [],
        "detailPicture": []
      },
      "dialog": {
        "show": false,
        "showImgUrl": ""
      }
    };
  },
  "computed": {},
  created() {
  },
  mounted() {
    this.getRemoteDealerTableData();
    this.getRemoteStoreTableData();
    if (this.$route.query.detailInfo) {
      this.detail = true;
    }
  },
  "methods": {
    /**
     *暂存
     */
    applySaleStepOne() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.doSave();
        } else {
          console.log("必填项不为空");
          return false;
        }
      });
    },
    /**
     * 保存操作
     */
    async doSave() {
      if (!this.itemNo) {
        this.$message.warning("商品编号不为空");
        return false;
      }
      const params = {
        "inteRuleNo": this.form.integralRole.value,
        "itemNo": this.itemNo,
        "rebateRuleNo": this.form.rebateRule.value
      };
      const res = await applySaleStepOne(params);
      if (res.code === 200) {
        this.$message.success("保存成功!");
        this.saved = true;
        return true;
      }
      this.$message.error(res.msg);
    },
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    /**
     * 继续上架2
     */
    toPutOnTwo() {
      if (this.detail) {
        this.$router.push({ "path": "/product/manage/maxxis/upShelfTwo", "query": { "itemNo": this.itemNo, "detailInfo": true, "title": "setmeal" } });
        return;
      }
      this.$router.push({ "path": "/product/manage/maxxis/upShelfTwo", "query": { "itemNo": this.itemNo, "title": "setmeal" } });
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
     * 获取门店列表
     */
    getRemoteStoreTableData() {
      const params = {
        "dealerNo": this.toolBar.dealerCustomerNo,
        "storeNo": this.toolBar.storeCustomerNo,
        "page.pageNum": this.whitelist.pagination.current,
        "page.pageSize": this.whitelist.pagination.size,
        "itemNo": this.itemNo
      };
      this.whitelist.tableLoading = true;
      queryStoreSpecialPrice(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.whitelist.tableData = res.data.records;
          this.whitelist.pagination.total = res.data.total;
          this.whitelist.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.whitelist.tableLoading = false;
        }
      }).catch(() => {
        this.whitelist.tableLoading = false;
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
     * 多选处理
     * @param {*} val 选中对象
     */
    handleWhitelistSelectionChange(val) {
      this.whitelist.multipleSelection = val;
    },
    /**
     * 添加经销商
     */
    setDealer() {
      this.dialogDealerVisible = true;
    },
    /**
     * 删除经销商
     */
    delDealer() {
      if (this.dealer.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选经销商?", "删除经销商", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "customerNo": this.dealer.multipleSelection.map(x => x.customerNo),
          "itemNo": this.itemNo
        };
        deleteDealerPrice(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getRemoteDealerTableData();
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(() => {});
    },
    /**
     * 删除一条经销商
     * @param row
     */
    deleteOneDealer(row) {
      this.$confirm("是否确定要删除所选经销商?", "删除经销商", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "customerNo": [ row.customerNo ],
          "itemNo": this.itemNo
        };
        deleteDealerPrice(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getRemoteDealerTableData();
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(() => {});
    },
    /**
     * 添加门店
     */
    addStore() {
      this.dialogStoreVisible = true;
    },
    /**
     * 删除门店
     */
    delStore() {
      if (this.whitelist.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选门店?", "删除门店", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "storeNo": this.whitelist.multipleSelection.map(x => x.storeNo),
          "itemNo": this.itemNo
        };
        deleteStoreSpecialPrice(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getRemoteStoreTableData();
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(() => {});
    },

    /**
     * 获取选中的经销商
     * @param list
     */
    getSelectDealer(list, mark) {
      const params = {
        "customerInfo": list.map(x => {
          return {
            "customerNo": x.customerNo,
            "price": x.adjustPrice || 0
          };
        }),
        "itemNo": this.itemNo
      };
      saveDealerPrice(params).then((res) => {
        if (res.code === 200) {
          if (mark === "oneRow") {
            this.$confirm("保存成功，是否关闭弹框", "提示", {
              "confirmButtonText": "确定",
              "cancelButtonText": "取消",
              "showClose": false,
              "type": "success"
            }).then(() => {
              this.dialogDealerVisible = false;
              this.getRemoteDealerTableData();
            }).catch(() => {
            });
          } else {
            this.$message.success("保存成功");
            this.dialogDealerVisible = false;
            this.getRemoteDealerTableData();
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 获取选中的门店
     * @param list
     */
    getSelectStore(list) {
      const params = {
        "storePriceInfo": list.map(x => {
          return {
            "dealerNo": x.dealerNo,
            "price": 0,
            "storeNo": x.storeNo
          };
        }),
        "itemNo": this.itemNo
      };
      saveStoreSpecialPrice(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.dialogStoreVisible = false;
          this.getRemoteStoreTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 打开特殊价格弹框
     * @param row
     */
    openStoreNumberDialog(row) {
      if (this.detail) return;
      this.rowDataList = [ JSON.parse(JSON.stringify(row)) ];
      this.showStoreNumberDialog = true;
    },
    change() {
      this.$forceUpdate();
    },
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.showStoreNumberDialog = false;
    },
    /**
     * 弹窗-保存并关闭
     */
    saveRowData() {
      const params = {
        "itemNo": this.itemNo,
        "price": (this.rowDataList[0] && this.rowDataList[0].price) || 0,
        "storeNo": (this.rowDataList[0] && this.rowDataList[0].storeNo)
      };
      updateStoreSpecialPrice(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("更新价格成功");
          this.showStoreNumberDialog = false;
          this.getRemoteStoreTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    storeChange(val) {
      this.toolBar.storeCustomerNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerCustomerNo = val;
    }
  }
};