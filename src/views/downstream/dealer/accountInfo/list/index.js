import { pageSearchCashList } from "@/api/downstream/dealer/accountInfo";

export default {
  "name": "dealerInfoList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "dealerNo": "",
        "withdrawalQuantity": {
          "value": "",
          "options": [
            { "label": "有", "value": "0" },
            { "label": "无", "value": "1" }
          ]
        },
        "exceptionQuantity": {
          "value": "",
          "options": [
            { "label": "有", "value": "0" },
            { "label": "无", "value": "1" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": [],
      "dealerName": "",
      "placeholder": "请选择"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listDealerByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchDealerListByPage() {
      this.pagination.current = 1;
      this.listDealerByPage();
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
     * 多选处理
     * @param {*} val 选中对象
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
      this.listDealerByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listDealerByPage();
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    /**
     * 跳转新增
     */
    toAdd() {
      this.$store.commit("dealerInfo/dealerInfoListSet", {
        "modify": false
      });
      this.$router.push({ "path": "/downstream/dealer/info/add" });
    },

    /**
     * 分页查询经销商数据
     */
    listDealerByPage() {
      const that = this;
      this.tableLoading = true;
      const params = {
        ...this.toolBar,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "withdrawalQuantity": this.toolBar.withdrawalQuantity.value,
        "exceptionQuantity": this.toolBar.exceptionQuantity.value
      };
      const postData = this.$jsonFormat(params).substring(1);
      pageSearchCashList(postData).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.created = that.formatTime(element.created);
          });
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },

    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },

    cleanSearch() {
      this.toolBar.dealerNo = "";
      this.toolBar.withdrawalQuantity.value = "";
      this.toolBar.exceptionQuantity.value = "";
      this.$refs.dealer.cleanDealer();
      this.pagination.current = 1;
      this.listDealerByPage();
    },
    /**
       * 提现审核
       */
    withdrawalAudit(dealerNo, customerNo, row) {
      this.$router.push({ "path": "/downstream/dealer/accountInfo/withdrawalAudit", "query": { "dealerNo": dealerNo, "customerNo": customerNo, "row": row } });
    },
    /**
       * 提现记录
       */
    withdrawalRecord(dealerNo, customerNo) {
      this.$router.push({ "path": "/downstream/dealer/accountInfo/withdrawalRecord", "query": { "dealerNo": dealerNo, "customerNo": customerNo } });
    },
    /**
       * 冻结明细
       */
    frozenDetails(dealerNo, customerNo) {
      this.$router.push({ "path": "/downstream/dealer/accountInfo/frozenDetails", "query": { "dealerNo": dealerNo, "customerNo": customerNo } });
    },
    /**
       * 对账单
       */
    accountStatement(dealerRefNo, customerNo) {
      this.$router.push({ "path": "/downstream/dealer/accountInfo/accountStatement", "query": { "merchNo": dealerRefNo, "customerNo": customerNo } });
    }
  }
};