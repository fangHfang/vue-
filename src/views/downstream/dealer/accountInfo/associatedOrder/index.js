import { pageDetail } from "@/api/downstream/dealer/accountInfo";
import { PAY_STATUS_OPTIONS } from "@/utils/system-constant";
export default {
  "name": "order",
  "components": {
  },
  data() {
    return {
      "loading": false,
      "toolBar": {
        "pay": {
          "value": "",
          "options": [
            { "value": 1, "label": "微信支付" },
            { "value": 2, "label": "微信小程序支付" },
            { "value": 3, "label": "支付宝支付" },
            { "value": 4, "label": "银联支付" },
            { "value": 5, "label": "大额支付" },
            { "value": 6, "label": "线下支付" },
            { "value": 7, "label": "积分支付" },
            { "value": 8, "label": "兑换点支付" },
            { "value": 9, "label": "白条支付" }
          ]
        },
        "payState": {
          "value": "",
          "options": PAY_STATUS_OPTIONS
        },
        "date": "",
        "spec": {
          "value": "",
          "options": [
            { "label": "待付款", "value": "0" },
            { "label": "待收货", "value": "1" },
            { "label": "部分收货", "value": "2" },
            { "label": "已完成", "value": "3" },
            { "label": "强制收货", "value": "4" },
            { "label": "已退款", "value": "5" },
            { "label": "已关闭", "value": "6" }
          ]
        },
        "withdrawStatus": {
          "value": "",
          "options": [
            { "label": "无法提现", "value": "0" },
            { "label": "待提现", "value": "1" },
            { "label": "提现中", "value": "2" },
            { "label": "提现驳回", "value": "3" },
            { "label": "提现审核通过", "value": "4" },
            { "label": "提现完成", "value": "5" }
          ]
        }

      },
      "tableData": [],
      "searchData": {
        "orderNo": "",
        "pageReq": {
          "pageNum": 1,
          "pageSize": 10
        },
        "withdrawStatus": "",
        "orderWithdrawNo": this.$route.query.orderWithdrawNo

      },
      "orderWithdrawStatusList": {
        "0": "无法提现",
        "1": "待提现",
        "2": "提现中",
        "3": "提现驳回",
        "4": "提现审核通过",
        "5": "---",
        "6": "提现完成"

      },
      "orderStatusList": {
        "0": "待付款",
        "1": "待收货",
        "2": "部分收货",
        "3": "已完成",
        "4": "强制收货",
        "5": "已退款",
        "6": "已关闭"
      },
      "payChannelList": {
        "1": "微信支付",
        "2": "微信小程序支付",
        "3": "支付宝支付",
        "4": "银联支付",
        "5": "大额支付",
        "6": "线下支付",
        "7": "积分支付",
        "8": "兑换点支付",
        "9": "白条支付"
      },
      "total": 0,
      "dialogVisible": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
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
      this.searchData.startTime = "";
      this.searchData.endTime = "";
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        this.searchData.startTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        this.searchData.endTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      this.searchData.withdrawStatus = this.toolBar.withdrawStatus.value;
      this.searchData.orderStatus = this.toolBar.spec.value;
      this.searchData.payStatus = this.toolBar.payState.value;
      this.searchData.payChannel = this.toolBar.pay.value;
      const res = await pageDetail(this.searchData);
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

    cleanSearch() {
      this.searchData.orderNo = "";
      this.toolBar.pay.value = "";
      this.toolBar.payState.value = "";
      this.toolBar.spec.value = "";
      this.toolBar.withdrawStatus.value = "";
      this.toolBar.date = "";
      this.searchData.pageReq.pageNum = 1;
      this.getTableData();
    },
    getPayStatus(payStatus) {
      if (payStatus || payStatus === 0) {
        return this.toolBar.payState.options.find(x => x.value === payStatus).label;
      }
      return payStatus;
    }
  }
};
