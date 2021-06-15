import { pageOrderWithdrawList, dealerAmount, toVerify, getAvailableAmount } from "@/api/downstream/dealer/accountInfo";
import { detailDealer } from "@/api/downstream/dealer/info";

export default {
  "name": "goodsReview",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 40
      },
      "tableLoading": false,
      "multipleSelection": [],
      "currentStatus": -1,
      "form": {
        // 经销商名称
        "name": "",
        // 手机号
        "contactPhone": "",
        // 经销商编号
        "dealerNo": "",
        // 开户银行
        "bankBranch": "",
        // 银行卡号
        "bankCardNumber": "",
        // 账户余额
        "balance": this.$route.query.row.availableAmount,
        // 锁定现金额
        "lockedAmount": "",
        // 审核中金额
        "reviewAmount": "",
        // 可提现金额
        "withdrawAmount": this.$route.query.row.withdrawalAmount,
        // 今日过审金额
        "todayAmount": "",
        // 历史总到账
        "history": ""
      },
      "dealerNo": this.$route.query.dealerNo,
      "customerNo": this.$route.query.customerNo,
      "currentRow": {},
      "availableAmount": 0,
      "otherAmount": {}

    };
  },
  mounted() {
    this.currentRow = this.$route.query.row;
    // 初始化查询方法
    this.getDealerDetail();
    this.dealerAmount();
    this.getRemoteTableData();
    this.getAvailableAmount();
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
    handleClick(tab) {
      if (tab.name === "second") {
        this.currentStatus = 0;
      } else if (tab.name === "third") {
        this.currentStatus = 1;
      } else if (tab.name === "first") {
        this.currentStatus = -1;
      }
      this.getRemoteTableData();
    },
    /**
     * 账户余额
     */
    getAvailableAmount() {
      const postData = {
        "dealerNo": this.dealerNo,
        "merchantId": this.currentRow.dealerRefNo
      };
      getAvailableAmount(postData).then(res => {
        if (res.code === 200) {
          this.availableAmount = res.data.availableAmount || 0;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
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
      this.getRemoteTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
    },

    /**
     * 查询供应商明细
     */
    getDealerDetail() {
      const that = this;
      const params = "dealerNo=" + that.dealerNo + "&customerNo=" + that.customerNo;
      detailDealer(params).then(res => {
        if (res.code === 200) {
          that.form = { ...that.form, ...res.data };
        } else {
          that.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 查询金额明细
     */
    dealerAmount() {
      const postData = {
        "dealerNo": this.dealerNo
      };
      dealerAmount(postData).then(res => {
        if (res.code === 200) {
          this.otherAmount = res.data;
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 查询分页
     */
    getRemoteTableData() {
      const postData = {
        "orderWithdrawStatus": 2,
        "dealerNo": this.dealerNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      pageOrderWithdrawList(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },

    /**
     * 审核
     */
    toVerify(row, mark) {
      const params = {
        "approvalStatus": mark
      };
      params.orderWithdrawNos = [];
      params.orderWithdrawNos.push(row);
      toVerify(params).then(res => {
        if (res.code === 200) {
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    /**
     * 批量审核
     */
    batchToVerify(mark) {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      const params = {
        "approvalStatus": mark
      };
      params.orderWithdrawNos = [];
      this.multipleSelection.forEach(row => {
        params.orderWithdrawNos.push(row.orderWithdrawNo);
      });
      toVerify(params).then(res => {
        if (res.code === 200) {
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    /**
     * 查看关联订单管理列表
     * @param row
     */
    toOrder(row) {
      this.$router.push({ "path": "/downstream/dealer/accountInfo/associatedOrder", "query": { "orderWithdrawNo": row.orderWithdrawNo } });
    }
  }
};