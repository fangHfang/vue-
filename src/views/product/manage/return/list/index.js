// import dialogAddProduct from "@/components/dialogAddProduct/index.vue";
import {
  listRefundPage
} from "@/api/product/manage";

export default {
  "name": "return",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "state": {
          "value": "",
          "options": [
            { "label": "状态1", "value": "1" },
            { "label": "状态2", "value": "2" },
            { "label": "状态3", "value": "3" }
          ]
        }
      },
      "tableData": [],
      "loading": false,
      "total": 0,
      "searchData": {
        "pageReq": {
          "pageNum": 1,
          "pageSize": 10
        },
        "orderRefundApplyTime": "",
        "orderRefundNo": "",
        "dealerNo": "",
        "storeNo": ""
      }
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listTableData();
  },
  "methods": {
    searchTableData() {
      this.searchData.pageReq.pageNum = 1;
      this.listTableData();
    },
    listTableData() {
      this.loading = true;
      this.searchData.orderRefundStartTime = "";
      this.searchData.orderRefundEndTime = "";
      if (this.searchData.orderRefundApplyTime && this.searchData.orderRefundApplyTime.length > 0) {
        this.searchData.orderRefundStartTime = this.$moment(this.searchData.orderRefundApplyTime[0]).format("yyyy-MM-DD HH:mm:ss");
        this.searchData.orderRefundEndTime = this.$moment(this.searchData.orderRefundApplyTime[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      listRefundPage(this.searchData).then((res) => {
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
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pageReq.pageSize = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageReq.pageNum = val;
      this.listTableData();
    },
    resetSearchData() {
      [ "orderRefundApplyTime", "orderRefundNo", "dealerNo", "storeNo" ].forEach(item => {
        this.searchData[item] = "";
      });
      this.searchData.pageReq.pageNum = 1;
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.listTableData();
    },
    /**
     * 打开订单详情
     */
    toDetail(orderRefundNo) {
      this.$router.push({ "path": "/product/manage/return/detail", "query": { "orderRefundNo": orderRefundNo } });
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
