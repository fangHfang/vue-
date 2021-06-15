import {
  ORDER_STATUS_OPTIONS,
  PAY_CHANNEL_OPTIONS,
  PAY_STATUS_OPTIONS,
  IN_STORAGE_STATUS_OPTIONS,
  RETURN_GOODS_STATUS_OPTIONS,
  ORDER_WITHDRAW_STATUS_OPTIONS
} from "@/utils/system-constant";

export default {
  data() {
    return {
      // 订单状态
      "orderStatusOptions": ORDER_STATUS_OPTIONS,
      // 支付方式
      "payChannelOptions": PAY_CHANNEL_OPTIONS,
      // 支付状态
      "payStatusOptions": PAY_STATUS_OPTIONS,
      // 入库状态
      "inStorageStatusOptions": IN_STORAGE_STATUS_OPTIONS,
      // 退货状态
      "returnGoodsStatusOptions": RETURN_GOODS_STATUS_OPTIONS,
      // 提现状态
      "orderWithdrawStatusOptions": ORDER_WITHDRAW_STATUS_OPTIONS
    };
  },
  "methods": {
    // 订单状态
    getOrderStatus(orderStatus) {
      if (orderStatus || orderStatus === 0) {
        return (this.orderStatusOptions.find(x => x.value === orderStatus) || {}).label;
      }
      return orderStatus;
    },
    // 支付状态
    getPayStatus(payStatus) {
      if (payStatus || payStatus === 0) {
        return (this.payStatusOptions.find(x => x.value === payStatus) || {}).label;
      }
      return payStatus;
    },
    // 支付方式
    getPayChannel(payChannel) {
      if (payChannel || payChannel === 0) {
        return (this.payChannelOptions.find(x => x.value === payChannel) || {}).label;
      }
      return payChannel;
    },
    // 提现状态
    getOrderWithdrawStatus(orderWithdrawStatus) {
      if (orderWithdrawStatus || orderWithdrawStatus === 0) {
        return (this.orderWithdrawStatusOptions.find(x => x.value === orderWithdrawStatus) || {}).label;
      }
      return orderWithdrawStatus;
    },
    // 入库状态
    getInStorage(status) {
      if (status || status === 0) {
        return (this.inStorageStatusOptions.find(x => x.value === status) || {}).label;
      }
      return status;
    },
    // 退货状态
    getReturnGoods(status) {
      if (status || status === 0) {
        return (this.returnGoodsStatusOptions.find(x => x.value === status) || {}).label;
      }
      return status;
    }
  }
};