import { listIntegralByPage } from "@/api/product/integral/order";

export default {
  "name": "ProductIntegralOrderList",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        "storeNo": "",
        "courierNo": "",
        "dealerNo": "",
        "orderNo": "",
        "receiveAddress": "",
        "orderReceiveStatus": {
          "value": "",
          "options": [
            // { "label": "不需要发货", "value": 0 },
            { "label": "未发货", "value": 1 },
            { "label": "已发货", "value": 2 }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false,
      "dialogVisible": false,
      "multipleSelection": [],
      "tableDataDeliver": []
    };
  },
  mounted() {
    this.listIntegralByPage();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listIntegralByPage();
    },
    /**
       * 获取勾选的行
       */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listIntegralByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listIntegralByPage();
    },
    /**
     * 选择发货
     */
    toDeliver() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        return this.$message.info("请选择订单");
      }
      let isUndelivered = true;
      this.tableDataDeliver = [];
      multipleSelection.map((item) => {
        if (item.orderReceiveStatus === "未发货") {
          const obj = {
            "orderNo": item.orderNo,
            "storeNo": item.storeNo,
            "storeName": item.storeName
          };
          this.tableDataDeliver.push(obj);
        }
      });
      const selectionList = multipleSelection.filter(x => (x.orderReceiveStatus !== "未发货"));
      if (selectionList.length > 0) {
        isUndelivered = false;
        return this.$message.info("请选择未发货订单");
      }
      if (isUndelivered) {
        this.dialogVisible = true;
      }
    },
    /**
     * 打开新增
     */
    toDetail(orderNo) {
      this.$router.push({ "path": "/product/integral/order/detail", "query": { "orderNo": orderNo } });
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listIntegralByPage() {
      const params = {
        "storeNo": this.toolBar.storeNo,
        "courierNo": this.toolBar.courierNo,
        "dealerNo": this.toolBar.dealerNo,
        "orderNo": this.toolBar.orderNo,
        "receiveAddress": this.toolBar.receiveAddress,
        "orderReceiveStatus": this.toolBar.orderReceiveStatus.value,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      this.tableLoading = true;
      listIntegralByPage(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => {
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
      });
    },

    clearSearch() {
      this.toolBar.storeNo = "";
      this.toolBar.dealerNo = "";
      this.toolBar.courierNo = "";
      this.toolBar.orderNo = "";
      this.toolBar.receiveAddress = "";
      this.toolBar.orderReceiveStatus.value = "";
      this.$refs.store.cleanStore();
      this.$refs.dealer.cleanDealer();
      this.pagination.current = 1;
      this.listIntegralByPage();
    },
    getSelectDeliver(val) {
      const multipleSelection = this.multipleSelection;
      multipleSelection.map((item) => {
        item.courierNo = val.courierNo;
      });
    },
    storeChange(val) {
      this.toolBar.storeNo = val;
    },

    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};
