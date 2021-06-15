import {
  listRefundPage,
  listOrderRefundItems
} from "@/api/product/manage";

export default {
  "name": "returnDetails",
  "components": {
  },
  "filters": {
    orderRefundNoEllipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 20) + "...";
      }
      return value;
    }
  },
  data() {
    return {
      "detail": {},
      // table展开收起状态 默认展开
      "tableUnfold": true,
      "searchData": {
        "pageReq": {
          "pageNum": 1,
          "pageSize": 10
        },
        "orderRefundNo": this.$route.query.orderRefundNo
      },
      "total": 0,
      "loading": false,
      "tableData": []
    };
  },
  mounted() {
    this.getOrderRefundDetail().then(this.listOrderRefundItems);
  },
  "methods": {
    async getOrderRefundDetail() {
      const res = await listRefundPage({ "orderRefundNo": this.searchData.orderRefundNo, "pageReq": { "pageNum": 1, "pageSize": 10 } });
      if (res.code === 200) {
        const { data } = res;
        if (data.total >= 1) {
          this.detail = data.records[0];
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    listOrderRefundItems() {
      this.loading = true;
      listOrderRefundItems(this.searchData).then((res) => {
        if (res.code === 200) {
          const { data } = res;
          this.total = data.total;
          this.tableData = data.records;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => { this.loading = false; });
    },
    /**
     * table展开收起状态
     */
    changeUnfold() {
      this.tableUnfold = !this.tableUnfold;
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pageReq.pageSize = val;
      this.listOrderRefundItems();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageReq.pageNum = val;
      this.listOrderRefundItems();
    }

  }
};
