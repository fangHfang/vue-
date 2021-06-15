import { detailType, pageSearchDetailList, rebateDetailStore } from "@/api/business/rebate/rebateStore";
export default {
  "name": "rebateDetailContent",
  "components": {
  },
  "props": {
    "typeFlag": {
      "type": Number,
      "default": 0
    }
  },
  data() {
    return {
      "txnCodes": [],
      "detail": {},
      "value": "",
      "toolBar": {
        "name": "",
        "accountTime": "",
        "customerNo": "",
        "debitNo": "",
        "type": "",
        "class": {
          "code": "",
          "options": [
          ]
        }
      },
      "form": {
        "typeName": "",
        "type": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      "dialogVisible": false
    };
  },
  "watch": {
    "typeFlag": {
      "handler": function(val, oldVal) {
        this.form.type = val;
        this.toolBar.customerNo = this.$route.params.customerNo;
        this.toolBar.debitNo = this.$route.params.debitNo;
        this.rebateDetailStore();
        if (val === 0) {
          this.form.typeName = "全部";
        } else if (val === 1) {
          this.toolBar.type = "gain";
          this.form.typeName = "获取记录";
        } else if (val === 2) {
          this.toolBar.type = "consume";
          this.form.typeName = "消耗记录";
        } else if (val === 3) {
          this.toolBar.type = "operate";
          this.form.typeName = "操作日志";
        }
        this.detailTypeList();
      },
      "immediate": true
    }
  },
  "computed": {},
  mounted() {
    // this.detailTypeList()
  },
  "methods": {
    searchDetailListByPage() {
      this.pagination.current = 1;
      this.pageSearchDetailList();
    },
    /**
     *  查询详情
     */
    detailTypeList() {
      const param = "type=" + this.toolBar.type;
      detailType(param).then(res => {
        if (res.code === 200) {
          this.txnCodes = [];
          this.txnCodes = res.data.map(element => { return element.code; });
          this.toolBar.class.options = res.data;
          this.pagination.current = 1;
          this.pageSearchDetailList();
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
    },

    /**
     * 查询详情明细分页
     */
    pageSearchDetailList() {
      const that = this;
      this.tableLoading = true;
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&debitDetailType=" + this.toolBar.type;
      if (this.toolBar.customerNo) {
        param = param + "&customerNo=" + this.toolBar.customerNo;
      }
      if (this.toolBar.debitNo) {
        param = param + "&debitNo=" + this.toolBar.debitNo;
      }
      if (this.txnCodes.length > 0 && this.toolBar.class.code) {
        param = param + "&txnCodes=" + this.toolBar.class.code;
      }
      if (this.toolBar.accountTime) {
        param = param + "&startTime=" + this.$moment(this.toolBar.accountTime[0]).format("yyyy-MM-DD HH:mm:ss");
        param = param + "&endTime=" + this.$moment(this.toolBar.accountTime[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      pageSearchDetailList(param).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.accountTime = that.formatTime(element.accountTime);
          });
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error("查询失败");
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },

    /**
     *  查询详情
     */
    rebateDetailStore() {
      const param = "customerNo=" + this.toolBar.customerNo + "&debitNo=" + this.toolBar.debitNo;
      rebateDetailStore(param).then(res => {
        if (res.code === 200) {
          this.detail = res.data;
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
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
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.pageSearchDetailList();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.pageSearchDetailList();
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
    }
  }
};