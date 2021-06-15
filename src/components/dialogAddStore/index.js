import { listStoreByPage } from "@/api/product/manage";
export default {
  "name": "dialogAddStore",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "searchData": {
        "name": "",
        "storeNo": "",
        "dealerNo": "",
        "dealerName": "",
        "page.pageNum": 1,
        "page.pageSize": 10
      },
      "loading": false,
      "toolBar": {
        "storeNature": {
          "value": "",
          "options": [
            { "label": "性质1", "value": "1" },
            { "label": "性质2", "value": "2" },
            { "label": "性质3", "value": "3" }
          ]
        },
        "storeRetrieve": {
          "value": "",
          "options": []
        },
        "dealerRetrieve": {
          "value": "",
          "options": []
        }
      },
      "tableData": [],
      "total": 0,
      "multipleSelection": [],
      "btnLoading": false
    };
  },
  "watch": {
    dialogVisible(val) {
      if (val) {
        this.listStoreByPage();
      } else {
        this.btnLoading = false;
      }
    }
  },
  "methods": {
    searchTableData() {
      this.searchData["page.pageNum"] = 1;
      this.listStoreByPage();
    },
    resetTable() {
      this.searchData["page.pageNum"] = 1;
      this.searchData["page.pageSize"] = 10;
      this.searchData.name = "";
      this.searchData.storeNo = "";
      this.searchData.dealerNo = "";
      this.searchData.dealerName = "";
      this.listStoreByPage();
    },
    listStoreByPage() {
      this.loading = true;
      listStoreByPage(this.$jsonFormat(this.searchData)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.multipleSelection = [];
      }).finally(() => { this.loading = false; });
    },
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.searchData["page.pageSize"] = val;
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData["page.pageNum"] = val;
      this.listStoreByPage();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      if (this.multipleSelection.length === 0) {
        return this.$message.info("请至少选择一个！");
      }
      this.btnLoading = false;
      this.$emit("selectedStore", this.multipleSelection);
    },
    selectedAll() {
      listStoreByPage(this.$jsonFormat({ "page.pageNum": 1, "page.pageSize": -1 })).then(res => {
        if (res.code === 200) {
          this.$emit("selectedStore", res.data.records);
          this.btnLoading = true;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => { this.loading = false; });
    },
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.$emit("close", false);
    },
    storeChange(val) {
      this.searchData.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.searchData.dealerNo = val;
    }
  }
};