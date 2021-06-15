import { pageOrderInfoList } from "@/api/product/orderPresell";
import { TRADE_URL } from "@/utils/system-constant";
import statusOptionsMixins from "../../order/statusOptionsMixins";
export default {
  "name": "order",
  "mixins": [ statusOptionsMixins ],
  "components": {
  },
  data() {
    return {
      "loading": false,
      "toolBar": {
        "pay": {
          "value": ""
        },
        "payState": {
          "value": ""
        },
        "date": "",
        "spec": {
          "value": ""
        },
        "orderWithdrawStatus": {
          "value": ""
        }

      },
      "tableData": [],
      "searchData": {
        // 查询订单标识 0：订单管理订单 1：套餐订单（默认值0）
        "flag": 1,
        "orderNo": "",
        "storeNo": "",
        "pageReq": {
          "pageNum": 1,
          "pageSize": 10
        },
        "orderWithdrawStatus": ""
      },
      "total": 0,
      "dialogVisible": false,
      "exportUrl": TRADE_URL + "/admin/order/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      this.searchData.orderStartTime = "";
      this.searchData.orderEndTime = "";
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        this.searchData.orderStartTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        this.searchData.orderEndTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }

      this.searchData.orderWithdrawStatus = this.toolBar.orderWithdrawStatus.value;
      this.searchData.orderStatus = this.toolBar.spec.value;
      this.searchData.payStatus = this.toolBar.payState.value;
      this.searchData.payChannel = this.toolBar.pay.value;
      const params = Object.assign({}, this.searchData);
      delete params.pageReq;
      return {
        ...params,
        "flag": 1,
        "pageReq.pageNum": this.searchData.pageReq.pageNum,
        "pageReq.pageSize": this.searchData.pageReq.pageSize
      };
    }
  },
  mounted() {
    this.getTableData();
  },
  "methods": {
    searchTableData() {
      this.searchData.pageReq.pageNum = 1;
      this.getTableData();
    },
    async getTableData() {
      this.loading = true;
      this.searchData.orderStartTime = "";
      this.searchData.orderEndTime = "";
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        this.searchData.orderStartTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        this.searchData.orderEndTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }

      this.searchData.orderWithdrawStatus = this.toolBar.orderWithdrawStatus.value;
      this.searchData.orderStatus = this.toolBar.spec.value;
      this.searchData.payStatus = this.toolBar.payState.value;
      this.searchData.payChannel = this.toolBar.pay.value;
      const res = await pageOrderInfoList(this.searchData);
      if (res.code === 200) {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.searchData.pageReq.pageSize = res.data.size;
        this.searchData.pageReq.pageNum = res.data.current;
      }
      this.loading = false;
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pageReq.pageSize = val;
      this.getTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageReq.pageNum = val;
      this.getTableData();
    },
    /**
     * 打开订单详情
     */
    toDetail(orderNo) {
      this.$router.push({ "path": "/product/manage/package/detail", "query": { "orderNo": orderNo } });
    },

    cleanSearch() {
      this.$refs.store.cleanStore();
      this.searchData.orderNo = "";
      this.toolBar.pay.value = "";
      this.toolBar.payState.value = "";
      this.searchData.storeNo = "";
      this.toolBar.spec.value = "";
      this.toolBar.orderWithdrawStatus.value = "";
      this.toolBar.date = "";
      this.getTableData();
    },
    /**
     *选择门店
     */
    storeChange(val) {
      this.searchData.storeNo = val;
    }
  }
};
