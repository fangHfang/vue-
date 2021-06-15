import {
  queryCustomerItemPrice,
  queryStoreSpecialPrice
} from "@/api/product/manage";
export default {
  "name": "dialogPriceProduct",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "itemNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "dealerBar": {
        "dealerNo": ""
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
      "toolBar": {
        "dealerNo": "",
        "storeNo": ""
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
      }
    };
  },
  created() {
  },
  mounted() {
  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.getRemoteDealerTableData();
          this.getRemoteSpecStoreTableData();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 查询
     */
    searchDealer() {
      this.dealer.pagination.current = 1;
      this.getRemoteDealerTableData();
    },
    /**
     * 查询
     */
    searchStore() {
      this.specWhitelist.pagination.current = 1;
      this.getRemoteSpecStoreTableData();
    },
    /**
       * 获取经销商列表
       */
    getRemoteDealerTableData() {
      const params = {
        "page.pageNum": this.dealer.pagination.current,
        "page.pageSize": this.dealer.pagination.size,
        "dealerNo": this.dealerBar.dealerNo,
        "itemNo": this.itemNo
      };
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
        "dealerNo": this.toolBar.dealerNo,
        "storeNo": this.toolBar.storeNo,
        "page.pageNum": this.specWhitelist.pagination.current,
        "page.pageSize": this.specWhitelist.pagination.size,
        "itemNo": this.itemNo
      };
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
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 经销商价格重置方法
     */
    resetSearchDealerListByPage() {
      this.$refs.dealer.cleanDealer();
      this.dealerBar.dealerNo = "";
      this.dealer.pagination.current = 1;
      this.getRemoteDealerTableData();
    },
    /**
     * 特殊门店价格重置方法
     */
    resetSearchStoreListByPage() {
      this.$refs.store.cleanStore();
      this.$refs.dealerPrice.cleanDealer();
      this.toolBar.dealerNo = "";
      this.toolBar.storeNo = "";
      this.specWhitelist.pagination.current = 1;
      this.getRemoteSpecStoreTableData();
    },
    /**
       * 查询经销商
       * @param val
       */
    dealerChange(val) {
      this.dealerBar.dealerNo = val;
    },
    /**
       * 特殊门店价格查询门店
       * @param val
       */
    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
       * 特殊门店价格查询经销商
       * @param val
       */
    dealerChangePrice(val) {
      this.toolBar.dealerNo = val;
    }
  }
};