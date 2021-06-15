import { getDealerPageListDetail } from "@/api/business/summary/rebate";
export default {
  "name": "reconciliationList",
  "components": {
  },
  "props": {
  },
  data() {
    return {
      "toolBar": {
        "storeCode": "",
        "month": ""
      },
      "tableData": [
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {
    currentRow() {
      return this.$store.state.businessSummaryRebateList.currentRow;
    }
  },
  mounted() {
    this.getRemoteDataList();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteDataList();
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
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.getRemoteDataList();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.getRemoteDataList();
    },
    /**
     * 重置数据
     */
    reset() {
      this.toolBar.month = "";
      this.$refs.store && this.$refs.store.cleanStore();
      this.pagination.current = 1;
      this.getRemoteDataList();
    },
    /**
     * 分页查询规则数据
     */
    getRemoteDataList() {
      this.tableLoading = true;
      const params = {
        "biz": this.currentRow.biz,
        "dealerNo": this.currentRow.dealerNo,
        "storeCode": this.toolBar.storeCode,
        "page": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      if (this.toolBar.month) {
        params.year = this.toolBar.month.getFullYear();
        params.month = this.toolBar.month.getMonth() + 1;
      }
      getDealerPageListDetail(params).then(res => {
        if (res.code === 200) {
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
    storeChange(val) {
      this.toolBar.storeCode = val;
    }
  }
};