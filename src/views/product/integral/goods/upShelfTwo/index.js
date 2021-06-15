import {
  queryStoreSpecialPrice,
  saveStoreSpecialPrice,
  updateStoreSpecialPrice,
  deleteStoreSpecialPrice
} from "@/api/product/manage";
import {
  applyOnSale
} from "@/api/product/integral/goods";
export default {
  "name": "productIntegralUpShelfTwo",
  "components": {},
  data() {
    return {
      "itemNo": this.$route.query.itemNo || "",
      "detail": false,
      "form": {
        "price": this.$route.query.price
      },
      "saved": false,
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
      "tableData": [ {
        "dealerCode": "123584665465646",
        "dealerName": "玛吉斯",
        "dealerTag": "NUY",
        "storeCode": "325479258",
        "storeName": "玛吉斯123",
        "storeTag": "ACV",
        "storeNature": "A级性质",
        "storeId": "87654567"
      } ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
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
      },
      "btnLoading": false
    };
  },
  "computed": {},
  mounted() {
    this.getRemoteStoreTableData();
  },
  "methods": {
    /**
     * 保存操作
     */
    async doSave() {
      if (!this.form.price) {
        this.btnLoading = false;
        return this.$message.warning("标准积分不能为空");
      }
      if (!this.itemNo) {
        this.$message.warning("商品编号不为空");
        this.btnLoading = false;
        return false;
      }
      const params = {
        "itemNo": this.itemNo,
        "price": this.form.price || ""
      };
      applyOnSale(params).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功!");
          this.$store.dispatch("tabbar/delView", this.$route).then(() => {
            this.$router.push({
              "path": "/product/integral/goods/list?r=" + this.$getRandomValue()
            });
          }).catch(() => {});
        } else {
          this.$message.error(res.msg);
          this.btnLoading = false;
        }
      }).catch(res => {
        this.btnLoading = false;
      });
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
     * 获取门店列表
     */
    getRemoteStoreTableData() {
      const params = {
        "dealerNo": this.toolBar.dealerCustomerNo || this.toolBar.dealerName,
        "storeNo": this.toolBar.storeCustomerNo || this.toolBar.storeName,
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
      if (this.rowDataList[0] && this.rowDataList[0].price < 0) {
        return this.$message.warning("积分不能为负数");
      }
      const params = {
        "itemNo": this.itemNo,
        "price": (this.rowDataList[0] && this.rowDataList[0].price) || 0,
        "storeNo": (this.rowDataList[0] && this.rowDataList[0].storeNo)
      };
      updateStoreSpecialPrice(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("更新积分成功");
          this.showStoreNumberDialog = false;
          this.getRemoteStoreTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 查询门店
     * @param val
     */
    storeChange(val) {
      this.toolBar.storeName = val;
    },
    /**
     * 查询经销商
     * @param val
     */
    dealerChange(val) {
      this.toolBar.dealerName = val;
    }
  }
};