import { listExchangePage } from "@/api/business/coupon/exchange";

import dialogOrder from "../dialogOrder/index.vue";
export default {
  "name": "BusinessCouponExchange",
  "components": {
    dialogOrder
  },
  data() {
    return {
      "toolBar": {
        "orderNo": "",
        "storeNo": "",
        "status": {
          "value": "",
          "options": [
            { "label": "未发货", "value": 1 },
            { "label": "已发货", "value": 2 },
            { "label": "已完成", "value": 3 }
          ]
        }
      },
      "multipleSelection": [],

      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false,
      "dialogVisible": false,
      // 该数组中的值 都会在列表中进行隐藏
      "foldList": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listExchangePage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listExchangePage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listExchangePage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listExchangePage();
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 详情
     */
    toDetail(orderNo) {
      this.$router.push({ "path": "/business/coupon/detail", "query": { "orderNo": orderNo } });
    },

    cleanSearch() {
      this.toolBar.orderNo = "";
      this.toolBar.storeNo = "";
      this.toolBar.status.value = "";
      this.$refs.store.cleanStore();
      this.pagination.current = 1;
      this.listExchangePage();
    },

    storeChange(val) {
      this.toolBar.storeNo = val;
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listExchangePage() {
      const params = {
        ...this.toolBar,
        "orderReceiveStatus": this.toolBar.status.value,
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size
      };
      delete params.status;
      this.tableLoading = true;
      // const postData = this.$jsonFormat(params);
      listExchangePage(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.tableLoading = false;
        console.info(error);
      });
    },
    oppenDialog() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请选择订单");
      }
      let canSave = true;
      this.multipleSelection.some(x => {
        if (x.orderReceiveStatus === "已发货") {
          canSave = false;
          return this.$message.info("请选择未发货的订单");
        }
      });
      if (!canSave) return;
      this.dialogVisible = true;
      this.$refs.dialogOrder.btnLoading = false;
    },
    getSubmitForm(val) {
      this.listExchangePage();
    }
  }
};
