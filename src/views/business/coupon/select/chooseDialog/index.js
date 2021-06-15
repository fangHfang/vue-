import { pageSearchCpTemLateList } from "@/api/business/coupon/coupon";

export default {
  "name": "AppPageStoreChooseDialog",
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "loading": true,
      "total": 0,
      "tableData": [],
      "searchData": {
        "ruleName": "",
        "status": 1,
        "page.pageNum": 1,
        "page.pageSize": 10
      },
      "multipleSelection": []
    };
  },
  "watch": {
    dialogVisible(val) {
      this.multipleSelection = [];
      if (val) {
        this.listTableData();
      }
    }
  },
  mounted() {
    this.listTableData();
  },
  "methods": {
    searchTableData() {
      this.searchData["page.pageNum"] = 1;
      this.listTableData();
    },
    listTableData() {
      this.loading = true;
      pageSearchCpTemLateList(this.$jsonFormat(this.searchData)).then((res) => {
        if (res.code === 200) {
          const { data } = res;
          this.tableData = data.records;
          this.total = data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => { this.loading = false; });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData["page.pageSize"] = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData["page.pageNum"] = val;
      this.listTableData();
    },
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.$emit("close", false);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      if (this.multipleSelection.length === 0) {
        return this.$message.info("请至少选择一个！");
      }
      this.$emit("selectedRule", this.multipleSelection);
    }
  }
};
