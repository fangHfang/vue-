import { checkAccount } from "@/api/downstream/dealer/accountStatement";

export default {
  "name": "goodsReview",
  "components": {
  },
  data() {
    return {
      "postData": {
        "accordingNo": "",
        "beginTime": "",
        "endTime": "",
        "orderNo": "",
        "merchNo": this.$route.query.merchNo,
        "page": {
          "field": "",
          "order": "",
          "pageNum": 0,
          "pageSize": 10
        },
        "status": 0,
        "storeNo": "",
        "tradeType": 0
      },
      "toolBar": {
        "date": "",
        "untieDate": "",
        "radio": "1",
        "untieRadio": "1",
        "today": {
          "type": "",
          "options": [
            { "label": "昨天", "value": "0" },
            { "label": "今天", "value": "1" }
          ]
        },
        "untieMonth": {
          "type": "",
          "options": [
            { "label": "本月", "value": "0" },
            { "label": "上月", "value": "1" }
          ]
        },
        "bookkeep": {
          "type": "",
          "options": [
            { "label": "转入 ", "value": "0" },
            { "label": "转出", "value": "1" }
          ]
        },
        "mode": {
          "type": "",
          "options": [
            { "label": "未处理", "value": "0" },
            { "label": "正常", "value": "1" },
            { "label": "异常", "value": "2" },
            { "label": "全部", "value": "9" }
          ]
        },
        "check": {
          "type": "",
          "options": [
            { "label": "支付", "value": "1" },
            { "label": "退款", "value": "2" },
            { "label": "提现", "value": "3" }
          ]
        }
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
      "currentStatus": -1,
      "customerNo": this.$route.query.customerNo

    };
  },
  mounted() {
    // 初始化查询方法
    this.getRemoteTableData();
    this.getRuleData();
  },
  "methods": {
    /**
         * 查询按钮方法
         */
    searchDealerListByPage() {
      this.pagination.size = 10;
      this.getRuleData();
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
     * 查询规则详细信息
     */
    getRuleData() {
      // this.postData.storeNo = this.$route.query.customerNo;
      const postData = {
        "merchNo": this.postData.merchNo,
        "storeNo": this.postData.storeNo,
        "accordingNo": this.postData.accordingNo,
        "page.pageNum": this.pagination.current,
        "keepAccountsType": this.toolBar.bookkeep.value,
        "page.pageSize": this.pagination.size,
        "checkAccountStatus": this.toolBar.mode.value,
        "tradeType": this.toolBar.check.value
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        postData.startTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.endTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      checkAccount(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          this.pagination.size = res.data.size;
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
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

    getRemoteTableData() {

      // pageCheckccountList
    },
    /**
     * 清理数据
     */
    clearData() {
      // this.$refs.store.cleanStore();
      this.toolBar.date = "";
      this.postData.accordingNo = "";
      this.postData.storeNo = "";
      this.toolBar.bookkeep.value = "";
      this.toolBar.mode.value = "";
      this.toolBar.check.value = "";
      this.getRemoteTableData();
    },
    /**
         * 点击搜索查询
         */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     *选择门店
     */
    storeChange(val) {
      this.postData.storeNo = val;
    }

  }
};