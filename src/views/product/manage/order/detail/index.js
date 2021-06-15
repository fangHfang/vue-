import { getOrderDetailInfo } from "@/api/product/orderPresell";
import statusOptionsMixins from "../statusOptionsMixins";
export default {
  "name": "orderDetails",
  "mixins": [ statusOptionsMixins ],
  "components": {
  },
  data() {
    return {
      "orderNo": this.$route.query.orderNo,
      "loading": false,
      "detail": {},
      "tableData": [],
      "total": 0,
      "searchData": {
        "pageIndex": 1,
        "pageSize": 10
      },
      // table展开收起状态 默认展开
      "tableUnfold": true,
      "paymentList": []
    };
  },
  "computed": {
    currentPage() {
      return this.tableData.slice((this.searchData.pageIndex - 1) * this.searchData.pageSize, this.searchData.pageIndex * this.searchData.pageSize);
    }
  },
  mounted() {
    this.getDetailData();
  },
  "methods": {
    async getDetailData() {
      this.loading = true;
      const res = await getOrderDetailInfo({ "orderNo": this.orderNo });
      if (res.code !== 200) {
        this.$message.error(res.msg);
        return;
      }
      this.detail = res.data;
      const options = {
        "orderPayId": res.data.orderPayId,
        "orderNo": res.data.orderNo,
        "payNo": res.data.payNo,
        "payTime": res.data.payTime,
        "payChannel": res.data.payChannel,
        // https://o2o-mall.coding.net/p/mjs-test/bug-tracking/issues/2146/detail
        "payAmount": res.data.withdrewAmount
      };
      this.paymentList.push(options);
      this.tableData = res.data.orderDetailList;
      this.total = this.tableData.length;
      this.loading = false;
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
      this.searchData.pageSize = val;
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageIndex = val;
    }

  }
};