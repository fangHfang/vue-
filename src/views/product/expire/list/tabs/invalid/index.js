import { integralPageClean } from "@/api/product/integral/store";
export default {
  "name": "ProductExpireList",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        "dealerNo": "",
        "dealerName": "",
        "storeNo": "",
        "storeName": ""
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
      "multipleSelection": []
    };
  },
  mounted() {
    this.listIntegralInvalidByPage();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listIntegralInvalidByPage();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listIntegralInvalidByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listIntegralInvalidByPage();
    },

    /**
     * 分页查询积分清零记录分页列表
     */
    listIntegralInvalidByPage() {
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.dealerNo) {
        params += "&dealerNo=" + this.toolBar.dealerNo;
      }
      if (this.toolBar.storeNo) {
        params += "&storeNo=" + this.toolBar.storeNo;
      }
      integralPageClean(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.state = (element.status === "有效") ? 1 : 0;
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
     * 重置按钮
     */
    resetInvalidByPage() {
      this.$refs.dealer.cleanDealer();
      this.$refs.store.cleanStore();
      this.pagination.current = 1;
      this.toolBar.storeNo = "";
      this.toolBar.dealerNo = "";
      this.listIntegralInvalidByPage();
    },

    storeChange(val) {
      this.toolBar.storeNo = val;
    },

    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }

  }
};