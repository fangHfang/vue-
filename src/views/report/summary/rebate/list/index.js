import { getDealerPageList } from "@/api/business/summary/rebate";

export default {
  "name": "BusinessSummaryRebateList",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "biz": "REBATE",
      "toolBar": {
        "dealerNo": "",
        "title": "",
        "month": ""
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  mounted() {
    this.toolBar.month = this.$moment().format("yyyy") + "-" + (parseInt(this.$moment().format("MM")) - 1);
    // 初始化查询方法
    this.getDealerPageList();
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
    searchData() {
      this.pagination.current = 1;
      this.getDealerPageList();
    },
    handleClick(tab) {
      if (tab.name === "first") {
        this.biz = "REBATE";
      } else if (tab.name === "second") {
        this.biz = "INTEGRAL";
      }
      this.getDealerPageList();
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getDealerPageList();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getDealerPageList();
    },

    /**
     * 查询分页
     */
    getDealerPageList() {
      const postData = {
        "dealerNo": this.toolBar.dealerNo,
        "dealerName": this.toolBar.dealerName,
        "biz": this.biz,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      if (this.toolBar.month) {
        postData.year = this.toolBar.month.substring(0, 4);
        postData.month = this.toolBar.month.substring(5);
      }
      this.tableLoading = true;
      getDealerPageList(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.tableLoading = false;
        this.$message.error(error);
      });
    },

    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },
    dealerItemChange(item = {}) {
      // console.log("item", item);
      this.toolBar.dealerName = item.name;
    },
    cleanSearch() {
      this.toolBar.dealerNo = "";
      this.toolBar.month = "";
      this.toolBar.dealerName = "";
      this.$refs.dealer.cleanDealer();
      this.pagination.current = 1;
      this.getDealerPageList();
    },
    /**
     * 跳转详情
     * @param row
     */
    toDetail(row) {
      this.$store.commit("businessSummaryRebateList/summarySet", {
        "currentRow": Object.assign(row, { "biz": this.biz })
      });
      this.$router.push({ "path": "/report/summary/rebate/detail/" });
    }
  }
};