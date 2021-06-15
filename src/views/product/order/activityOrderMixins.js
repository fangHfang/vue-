import {
  listActivityOrderList
} from "@/api/product/orderPresell";
import { TRADE_URL } from "@/utils/system-constant";
export default {

  data() {
    return {
      // 以下为 秒杀活动订单页面 商品组合订单页面， 限时抢购订单页面公共查询条件
      "searchData": {
        // 订单状态
        "orderStatus": "",
        // 门店编号
        "storeNo": "",
        // 支付方式
        "payChannel": "",
        // 活动订单编号
        "orderNo": "",
        // 分页属性
        "page.pageNum": 1,
        "page.pageSize": 10,
        "page.field": "created",
        "page.order": "desc"
      },
      "total": 0,
      "tableData": [],
      "loading": false,
      "orderDateRange": [],
      "exportUrl": TRADE_URL + "/admin/promotion/order/export"
    };
  },
  mounted() {
    this.listTableData();
  },
  "computed": {
    // 导出入参
    exportGetData() {
      const params = Object.assign({}, this.searchData);
      if (this.orderDateRange && this.orderDateRange.length === 2) {
        params.createdFrom = this.$moment(this.orderDateRange[0]).format("yyyy-MM-DD HH:mm:ss");
        params.createdTo = this.$moment(this.orderDateRange[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      delete params["page.field"];
      delete params["page.order"];
      return {
        ...params
      };
    }
  },
  "methods": {

    /**
     * 查询按钮单击事件，需要跳转到第一页
     */
    searchTableData() {
      this.searchData["page.pageNum"] = 1;
      this.listTableData();
    },

    /**
     * 重置
     */
    resetSearch() {
      this.searchData = {
        // 订单状态
        "orderStatus": "",
        // 门店编号
        "storeNo": "",
        // 支付方式
        "payChannel": "",
        // 活动订单编号
        "orderNo": "",
        // 分页属性
        "page.pageNum": 1,
        "page.pageSize": 10,
        "page.field": "created",
        "page.order": "desc"
      };
      this.$refs.store && this.$refs.store.cleanStore();
      this.orderDateRange = [];
      this.listTableData();
    },

    storeChange(val) {
      this.searchData.storeNo = val;
    },
    /**
     * 查询后台数据
     */
    listTableData() {
      this.loading = true;

      const param = this._.cloneDeep(this.searchData);

      if (this.orderDateRange && this.orderDateRange.length === 2) {
        param.createdFrom = this.$moment(this.orderDateRange[0]).format("yyyy-MM-DD HH:mm:ss");
        param.createdTo = this.$moment(this.orderDateRange[1]).format("yyyy-MM-DD HH:mm:ss");
      }

      listActivityOrderList(this.$jsonFormat(param)).then((res) => {
        if (res.code === 200) {
          const { data } = res;
          this.tableData = data.records.map(x => {
            return {
              ...x,
              "epRuleNames": x.epRuleNames || 0
            };
          });
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
    }
  }

};