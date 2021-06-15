import { pageSearchRebateStoreList, unfreezeRebate, freezeRebate, add, reduce } from "@/api/business/rebate/rebateStore";
import { USER_URL } from "@/utils/system-constant";
// 获取当前月的上一月
function getLastMonth() {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  if (month === 0) {
    year -= 1;
    month = 12;
  }

  month = month < 10 ? ("0" + month) : month;

  const lastYearMonth = year + "-" + month;

  return lastYearMonth;
}
export default {
  "name": "businessRebateStoreList",
  "components": {
  },
  data() {
    return {
      "form": {
        "storeName": "",
        "remarks": "",
        "customerNo": "",
        "availableAmount": "",
        "amount": "",
        "debitNo": "",
        "refNo": "1",
        "redio": "1"
      },
      "toolBar": {
        "monthDate": getLastMonth(), // 默认取值: 截至到当前月的上一月
        "name": "",
        "storeNo": "",
        "dealerNo": "",
        "dataRange": ""
      },
      "tableData": [
        // {
        //   "availableAmount": 0,
        //   "customerNo": "",
        //   "dealerCustomerNo": "",
        //   "dealerLabelName": "",
        //   "dealerLabelNo": "",
        //   "dealerName": "",
        //   "dealerNo": "",
        //   "debitNo": "",
        //   "invalidDate": "",
        //   "status": "",
        //   "storeLabelName": "",
        //   "storeLabelNo": "",
        //   "storeName": "",
        //   "storeNo": "",
        //   "tenantNo": ""
        // }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "multipleSelection": [],
      "tableLoading": false,
      "dialogVisible": false,
      "btnLoading": false,
      "exportUrl": USER_URL + "/admin/rebate/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      const param = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      if (this.toolBar.storeNo) {
        param.storeNo = this.toolBar.storeNo;
      }
      if (this.toolBar.dealerNo) {
        param.dealerNo = this.toolBar.dealerNo;
      }
      if (this.toolBar.dataRange && this.toolBar.dataRange.length > 0) {
        param.createdFrom = this.$moment(this.toolBar.dataRange[0]).format("yyyy-MM-DD 00:00:00");
        param.createdTo = this.$moment(this.toolBar.dataRange[1]).format("yyyy-MM-DD 23:59:59");
      }
      return {
        ...param
      };
    }
  },
  "watch": {
    dialogVisible(val) {
      if (!val) {
        setTimeout(() => {
          this.form.redio = "1";
          this.form.amount = "";
          this.form.remarks = "";
        }, 200);
      }
    }
  },
  mounted() {
    this.listRebateStoreByPage();
  },
  "methods": {
    searchRebateStoreListByPage() {
      this.pagination.current = 1;
      this.listRebateStoreByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listRebateStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRebateStoreByPage();
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
     * 分页查询返利账户
     */
    listRebateStoreByPage() {
      const that = this;
      this.tableLoading = true;
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      /**
       * 门店名称
       */
      if (this.toolBar.storeName) {
        param = param + "&storeName=" + this.toolBar.storeName;
      }
      /**
       * 门店标签
       */
      if (this.toolBar.storeNo) {
        param = param + "&storeNo=" + this.toolBar.storeNo;
      }
      /**
       * 经销商名称
       */
      if (this.toolBar.dealerName) {
        param = param + "&dealerName=" + this.toolBar.dealerName;
      }
      /**
       * 经销商标签
       */
      if (this.toolBar.dealerNo) {
        param = param + "&dealerNo=" + this.toolBar.dealerNo;
      }
      // param = param + "&monthDate=" + this.toolBar.monthDate;
      pageSearchRebateStoreList(param).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.invalidDate = that.formatTime(element.invalidDate);
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

    /**
     * 解冻门店
     */
    unfreezeRebate(customerNo, debitNo) {
      this.$confirm("是否确定该操作？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.tableLoading = true;
        const params = {
          "customerNo": customerNo,
          "debitNo": debitNo
        };
        unfreezeRebate(params).then(res => {
          if (res.code === 200) {
            this.listRebateStoreByPage();
          } else {
            this.$message.error(res.msg);
          }
          this.tableLoading = false;
        }).catch((error) => {
          console.info(error);
          this.tableLoading = false;
        });
      });
    },
    /**
     * 冻结门店
     */
    freezeRebate(customerNo, debitNo) {
      this.$confirm("是否确定该操作？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.tableLoading = true;
        const params = {
          "customerNo": customerNo,
          "debitNo": debitNo
        };
        freezeRebate(params).then(res => {
          if (res.code === 200) {
            this.listRebateStoreByPage();
          } else {
            this.$message.error(res.msg);
          }
          this.tableLoading = false;
        }).catch((error) => {
          console.info(error);
          this.tableLoading = false;
        });
      });
    },
    /**
     * 重置
     */
    reset() {
      this.toolBar.dealerName = "";
      this.toolBar.dealerNo = "";
      this.toolBar.storeName = "";
      this.toolBar.storeNo = "";
      this.pagination.current = 1;
      this.$refs.dealer.cleanDealer();
      this.$refs.store.cleanStore();
      this.listRebateStoreByPage();
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
     * 跳转到详情页
     */
    toDetail(customerNo, debitNo) {
      console.log("跳转到详情页");
      this.$router.push({ "path": "/business/rebate/detail/" + customerNo + "/" + debitNo });
    },
    /**
     * 返利调整
     */
    rebateAdjustment(customerNo, debitNo, availableAmount, storeName) {
      this.dialogVisible = true;
      this.form.customerNo = customerNo;
      this.form.debitNo = debitNo;
      this.form.storeName = storeName;
      this.form.availableAmount = availableAmount;
    },

    submitForm() {
      if (!this.form.amount) {
        return this.$message.warning("请输入调整的返利数值");
      }
      const params = {
        "amount": this.form.amount,
        "customerNo": this.form.customerNo,
        "debitNo": this.form.debitNo,
        "refNo": this.form.refNo,
        "remarks": this.form.remarks
      };
      this.btnLoading = true;
      params.refNo = "TRAD" + this.$moment(new Date()).format("yyyyMMDDHHmmss") + Math.random().toString(36).substring(2, 6);
      if (this.form.redio === "1") {
        add(params).then(res => {
          if (res.code === 200) {
            this.$message.success("调整成功");
            this.btnLoading = false;
            this.listRebateStoreByPage();
          } else {
            this.$message.error(res.msg);
            this.btnLoading = false;
          }
          this.dialogVisible = false;
        }).catch((error) => {
          console.info(error);
          this.dialogVisible = false;
          this.btnLoading = false;
        });
      } else {
        reduce(params).then(res => {
          if (res.code === 200) {
            this.$message.success("调整成功");
            this.btnLoading = false;
            this.listRebateStoreByPage();
          } else {
            this.$message.error(res.msg);
            this.btnLoading = false;
          }
          this.dialogVisible = false;
        }).catch((error) => {
          console.info(error);
          this.dialogVisible = false;
          this.btnLoading = false;
        });
      }
    },

    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },

    storeChange(val) {
      this.toolBar.storeNo = val;
    }
  }
};