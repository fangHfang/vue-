import { listItemWhiteList, listItemVisibility } from "@/api/product/activity/promotion";
export default {
  "name": "dialogVisibilityProduct",
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
      "toolBar": {
        "dealerNo": "",
        "storeNo": ""
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
      "form": {
        "visibility": 2,
        "itemVisibilityDtos": []
      }
    };
  },
  created() {
    this.getRemoteStoreTableData();
  },
  mounted() {

  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.getRemoteStoreTableData();
          this.getListItemVisibility();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 查询
     */
    search() {
      this.whitelist.pagination.current = 1;
      this.getRemoteStoreTableData();
    },
    /**
         * 获取门店地区
         */
    getListItemVisibility() {
      const params = {
        "relationNo": this.itemNo,
        "relationType": 1
      };
      listItemVisibility(params).then(res => {
        if (res.code === 200) {
          this.form.itemVisibilityDtos = res.data.itemVisibilityDtos;
          this.form.visibility = res.data.visibleFlag || 2;
        } else {
          this.$message.error(res.msg);
        }
      }).catch(() => {});
    },
    /**
         * 获取门店白名单列表
         */
    getRemoteStoreTableData() {
      const params = {
        "dealerCustomerNo": this.toolBar.dealerNo,
        "storeCustomerNo": this.toolBar.storeNo,
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
         * 关闭弹窗
         * @param done
         */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    /**
         * 白名单重置方法
         */
    resetSearchStoreListByPage() {
      this.$refs.store.cleanStore();
      this.$refs.dealer.cleanDealer();
      this.toolBar.dealerNo = "";
      this.toolBar.storeNo = "";
      this.whitelist.pagination.current = 1;
      this.getRemoteStoreTableData();
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
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};