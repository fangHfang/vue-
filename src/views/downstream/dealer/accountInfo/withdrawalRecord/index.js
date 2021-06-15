import { pageOrderWithdrawList } from "@/api/downstream/dealer/accountInfo";
export default {
  "name": "goodsReview",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        "date": "",
        "radio": "1",
        "billNo": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 40
      },
      "tableLoading": false,
      "multipleSelection": [],
      "currentStatus": {
        "value": "",
        "options": [
          { "label": "已拒绝", "value": 3 },
          { "label": "提现中", "value": 4 },
          { "label": "已冻结", "value": 7 },
          { "label": "已到账", "value": 6 }
        ]
      },
      "dealerNo": this.$route.query.dealerNo,
      "customerNo": this.$route.query.customerNo
    };
  },
  mounted() {
    // 初始化查询方法
    this.getRemoteTableData();
  },
  "methods": {
    /**
       * 查询按钮方法
       */
    searchDealerListByPage() {
      this.pagination.current = 1;
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
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
     * 查询分页
     */
    getRemoteTableData() {
      const postData = {
        "orderWithdrawStatus": this.currentStatus.value,
        "dealerNo": this.dealerNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        postData.orderStartTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.orderEndTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
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
       * 清理数据
       */
    clearData() {
      this.toolBar.billNo = "";
      this.toolBar.date = "";
      this.currentStatus.value = "";
    },
    /**
       * 点击搜索查询
       */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
       * 打开详情
       */
    toDetail(row) {

    },
    /**
     * 审核
     */
    toVerify(row, mark) {

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