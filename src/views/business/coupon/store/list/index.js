import dialogAddStore from "@/components/dialogAddStore/index.vue";
export default {
  "name": "BusinessCouponStoreList",
  "components": {
    dialogAddStore
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
      "selectedStoreArr": []
    };
  },
  "computed": {
    currentTableData() {
      const allData = this._.cloneDeep(this.tableData);
      return allData.slice((this.searchData.pageNum - 1) * this.searchData.pageSize, this.searchData.pageNum * this.searchData.pageSize);
    },
    total() {
      return this.tableData.length;
    },
    permission() {
      return this.$store.state.container.permission;
    }
  },
  activated() {
    if (this.$route.params.tableData && this.$route.params.tableData.length > 0) {
      this.tableData = this.$route.params.tableData;
    }
  },
  "methods": {
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
    handleSelectionChange(val) {
      this.selectedStoreArr = val.filter(x => x.storeNo).map(c => { return c.storeNo; });
    },
    batchDeleteStore() {
      if (this.selectedStoreArr.length === 0) {
        this.$message.error("请至少选择一个门店");
        return;
      }
      this.$confirm(`确定删除选中的${this.selectedStoreArr.length}个门店吗?`, "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        this.tableData = this.tableData.filter(x => this.selectedStoreArr.indexOf(x.storeNo) < 0);
      });
    },
    nextStep() {
      const list = this.tableData.map((item) => {
        return item.id;
      });
      if (!list) {
        this.$message.error("请至少选择一个门店");
        return;
      }
      this.$router.push({ "name": "businessCouponSelectList", "params": { "selectedStore": this.tableData } });
    },
    selectedStore(data) {
      // 已经存在的门店
      const existStore = this.tableData.filter(x => x.storeNo).map(c => { return c.storeNo; });
      // 把新增过来的门店数据中剔除掉已经存在的门店
      const newData = data.filter(x => existStore.indexOf(x.storeNo) < 0);
      // 放到页面中
      this.tableData.push.apply(this.tableData, newData);
      this.dialogVisible = false;
    }
  }
};
