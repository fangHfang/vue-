// src/views/product/integral/store/detail/index
import { integralDetail, integralPageDetail, integralPageDetailType } from "@/api/product/integral/store";
export default {
  "name": "productIntegralStoreDetail",
  "components": {
  },
  data() {
    return {
      "activeName": "all",
      "lastActiveName": "all",
      "toolBar": {
        "dataRange": [],
        "txnCodeArray": {
          "value": "",
          "options": []
        },
        "txnCodes": []
      },
      "tableData": [
        {
          // 记账时间
          "accountTime": "",
          // 发生额(全为正数，由记账类型决定出入账)
          "amount": 0,
          // 变化后可用余额
          "availableAmountAfter": 0,
          // 变化前可用余额
          "availableAmountBefore": 0,
          // 客户编号
          "customerNo": "",
          // 借记明细编号
          "debitDetailNo": "",
          // 借记账户编号
          "debitNo": "",
          // 变化后欠账金额
          "debtAmountAfter": 0,
          // 变化前欠账金额
          "debtAmountBefore": 0,
          // 外部流水号
          "refNo": "",
          // 备注
          "remarks": "",
          // 租户编号
          "tenantNo": "",
          // 交易编码
          "txnCode": "",
          // 交易类型（1：调增，2：调减，3：不变）
          "type": 0,
          // 记账类型描述
          "typeDescription": ""
        }
      ],
      "form": {
        // 可用余额
        "availableAmount": 0,
        // 当前可用余额，可能为负数，计算方式（availableAmount - debtAmount）
        "currentlyAvailableAmount": 0,
        // 欠账金额，使用后变成正数，还款后变为0
        "debtAmount": 0,
        // 备注
        "remarks": "",
        // 状态
        "status": 0,
        // 租户编号
        "tenantNo": "",
        // 类型：0:积分，1:返利
        "type": 0,
        // 冻结状态
        "statusTag": "",
        // 创建时间
        "created": ""
      },
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false
    };
  },
  "computed": {
    customerNo() {
      return this.$store.state.productIntegralStore.customerNo;
    },
    debitNo() {
      return this.$store.state.productIntegralStore.debitNo;
    },
    storeName() {
      return this.$store.state.productIntegralStore.storeName;
    },
    storeNo() {
      return this.$store.state.productIntegralStore.storeNo;
    },
    state() {
      return this.$store.state.productIntegralStore.state;
    }
  },
  mounted() {
    if (this.state === 0) {
      this.form.statusTag = "冻";
    }
    const tab = {
      "name": "all"
    };
    this.handleClick(tab);
    this.getIntegralStoreDetail();
    this.listIntegralStoreDetailByPage();
  },
  "methods": {
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listIntegralStoreDetailByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listIntegralStoreDetailByPage();
    },
    handleClick(tab, event) {
      this.toolBar.txnCodes = [];
      if (tab.name === "all") {
        tab.name = "";
        // this.listIntegralStoreDetailByPage();
        // return;
      }
      if (this.lastActiveName === tab.name) {
        return;
      }
      this.lastActiveName = tab.name;
      this.toolBar.txnCodeArray.value = "";
      this.toolBar.txnCodeArray.options = [];
      const params = "type=" + tab.name;
      integralPageDetailType(params).then(res => {
        if (res.code === 200) {
          res.data.forEach(element => {
            this.toolBar.txnCodeArray.options.push({ "label": element.name, "value": element.code });
            this.toolBar.txnCodes.push(element.code);
          });
          this.listIntegralStoreDetailByPage();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.$message.error(error.msg);
      });
    },

    /**
     * 查询主数据
     */
    getIntegralStoreDetail() {
      const params = "customerNo=" + this.customerNo + "&debitNo=" + this.debitNo;
      integralDetail(params).then(res => {
        if (res.code === 200) {
          this.form = { ...this.form, ...res.data };
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.$message.error(error.msg);
      });
    },

    /**
     * 分页查询数据
     */
    listIntegralStoreDetailByPage() {
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&customerNo=" + this.customerNo + "&debitNo=" + this.debitNo;
      if (this.toolBar.dataRange && this.toolBar.dataRange.length > 0) {
        // params += "&startTime=" + this.$moment(this.toolBar.dataRange[0]).format("yyyy-MM-DD") + "&endTime=" + this.$moment(this.toolBar.dataRange[1]).format("yyyy-MM-DD");
        params += "&startTime=" + String(this.toolBar.dataRange[0]) + "&endTime=" + String(this.toolBar.dataRange[1]);
      }
      if (this.toolBar.txnCodeArray.value !== "") {
        params += "&txnCode=" + this.toolBar.txnCodeArray.value;
      }
      if (this.toolBar.txnCodes.length > 0) {
        params += "&txnCodes=" + this.toolBar.txnCodes.join(",");
      }
      integralPageDetail(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.accountTime = this.formatTime(element.accountTime);
          });
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error.msg);
        this.tableLoading = false;
      });
    }
  }
};