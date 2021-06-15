import {
  getActivityOrderDetail
} from "@/api/product/orderPresell";
import { IN_STORAGE_STATUS_OPTIONS, RETURN_GOODS_STATUS_OPTIONS, ORDER_STATUS_OPTIONS } from "@/utils/system-constant";
export default {

  data() {
    return {
      // 以下为 秒杀活动订单页面 商品组合订单页面 限时抢购订单页面 （详情页） 公共查询条件
      "searchData": {
        // 订单编号
        "orderNo": this.$route.query.orderNo
      },
      "orderItem": "",
      "tableData": [],
      "loading": false,
      "orderDateRange": [],
      // 入库状态
      "inStorageStatusOptions": IN_STORAGE_STATUS_OPTIONS,
      // 退货状态
      "returnGoodsStatusOptions": RETURN_GOODS_STATUS_OPTIONS,
      // 订单状态
      "orderStatusOptions": ORDER_STATUS_OPTIONS
    };
  },
  mounted() {
    this.getOrderItemDetail();
  },
  "methods": {
    /**
     * 查询后台数据
     */
    getOrderItemDetail() {
      this.loading = true;
      const param = this._.cloneDeep(this.searchData);
      getActivityOrderDetail(this.$jsonFormat(param)).then((res) => {
        if (res.code === 200) {
          const { data } = res;
          this.orderItem = data;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => { this.loading = false; });
    },

    /**
     * 计算应付金额
     */
    calcShouldPay(row) {
      try {
        let shouldPay = 0;
        const { itemPrice = 0, itemQuantity = 0, consumeRebateAmount = 0, consumeCouponAmount = 0 } = row;
        shouldPay = itemPrice * itemQuantity - consumeRebateAmount - consumeCouponAmount;
        return (shouldPay || 0).toFixed(2);
      } catch (error) {
        return "0.00";
      }
    },

    /**
     * 获取入库状态
     * @param {} status
     */
    getInStorage(status) {
      if (status || status === 0) {
        return this.inStorageStatusOptions.find(x => x.value === status).label;
      }
      return status;
    },

    /**
     * 获取退货状态
     * @param {} status
     */
    getReturnGoods(status) {
      if (status || status === 0) {
        return this.returnGoodsStatusOptions.find(x => x.value === status).label;
      }
      return status;
    },
    /**
     * 订单状态
     * @param {*} orderStatus
     */
    getOrderStatus(orderStatus) {
      if (orderStatus || orderStatus === 0) {
        return this.orderStatusOptions.find(x => x.value === orderStatus).label;
      }
      return orderStatus;
    }

  }

};