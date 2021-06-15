import ChooseDialog from "../chooseDialog/index.vue";
export default {
  "name": "BusinessCouponSelectList",
  "components": {
    ChooseDialog
  },
  data() {
    return {
      "activeName": "first",
      "tableData": [],
      "searchData": {
        "pageNum": 1,
        "pageSize": 10
      },
      "dialogVisible": false,
      "selectedRule": [],
      "selectedStore": []
    };
  },
  "computed": {
    currentTableData() {
      const allData = this._.cloneDeep(this.tableData);
      return allData.slice((this.searchData.pageNum - 1) * this.searchData.pageSize, this.searchData.pageNum * this.searchData.pageSize);
    },
    total() {
      return this.tableData.length;
    }
  },
  activated() {
    if (!(this.$route.params.selectedStore && this.$route.params.selectedStore.length > 0)) {
      this.$confirm("请选择至少一个门店!", "提示", {
        "confirmButtonText": "确定",
        "type": "warning"
      }).then(() => {
        this.$router.push({ "name": "businessCouponStoreList" });
      });
    } else {
      this.selectedStore = this.$route.params.selectedStore;
    }
  },
  "methods": {
    selectedRuleEvent(data) {
      // 已经存在的门店
      const existRule = this.tableData.filter(x => x.ruleNo).map(c => { return c.ruleNo; });
      // 把新增过来的门店数据中剔除掉已经存在的门店
      const newData = data.filter(x => existRule.indexOf(x.ruleNo) < 0);
      // 放到页面中
      this.tableData.push.apply(this.tableData, newData.map(item => {
        item.amount = 1;
        return item;
      }));
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      this.selectedRule = val;
    },
    batchDelete() {
      if (this.selectedRule.length === 0) {
        this.$message.error("请至少选择一个优惠券");
        return;
      }
      this.$confirm(`确定删除选中的${this.selectedRule.length}个优惠券吗?`, "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        this.tableData = this.tableData.filter(x => {
          return this.selectedRule.filter((rule) => { return rule.ruleNo === x.ruleNo; }).length === 0;
        });
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pagesize = val;
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
    },
    /**
       * 返回
       * @param val
       */
    back() {
      this.$router.push({
        "name": "businessCouponStoreList"
      });
    },
    /**
     * 修改优惠券数量
     */
    changeAmount(val, index) {
      this.$set(this.tableData[index], "amount", Number(val));
    },
    /**
     * 下一步
     */
    nextStep() {
      let show = false;
      this.tableData.map((item) => {
        if (item.amount === 0 || !item.amount || item.amount < 0) {
          show = true;
        }
      });
      if (show) {
        this.$message.error("请补充优惠券数量");
        return;
      }
      if (this.tableData.length === 0) {
        this.$message.error("请至少选择一个优惠券");
        return;
      }
      this.$router.push({
        "name": "businessCouponGrantAdd",
        "params": {
          "selectedStore": this.selectedStore,
          "couponList": this.tableData
        }
      });
    }
  }
};