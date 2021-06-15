export default {
  "name": "PackageProductActivityOrderManageList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "order": "",
        "store": "",
        "curment": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "spec": {
          "value": "",
          "options": [
            { "label": "规格1", "value": "1" },
            { "label": "规格2", "value": "2" },
            { "label": "规格3", "value": "3" }
          ]
        },
        "brand": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "orderId": "123584665465646",
          "custmoreCode": "4562635632",
          "custmoreName": "测试测试有限公司",
          "storeCode": "M4564643115",
          "storeName": "玛吉斯江湾2门店",
          "productName": "商品1，商品2，商品3 商品4, 商品5，商品6",
          "orderDate": "2016-09-21  08:50:08",
          "orderState": 5,
          "paymentState": 1,
          "orderMoney": "299.60元",
          "couponMoney": "不支持使用",
          "moneyRebate": "10.00元",
          "paymentMoney": "289.60元",
          "getMoney": "10.00元",
          "getNember": "10积分",
          "getcoupon": "优惠券名称、优惠券名称1、优惠券名称、优惠券名称1",
          "getyyy": "兑换点规则*10、兑换点规则*20",
          "payment": "微信",
          "getMoneyState": 1,
          "none": 5,
          "put": 5
        },
        {
          "orderId": "123584665465646",
          "custmoreCode": "4562635632",
          "custmoreName": "测试测试有限公司",
          "storeCode": "M4564643115",
          "storeName": "玛吉斯江湾2门店",
          "productName": "商品1，商品2，商品3 商品4, 商品5，商品6",
          "orderDate": "2016-09-21  08:50:08",
          "orderState": 0,
          "paymentState": 1,
          "orderMoney": "299.60元",
          "couponMoney": "不支持使用",
          "moneyRebate": "10.00元",
          "paymentMoney": "289.60元",
          "getMoney": "10.00元",
          "getNember": "10积分",
          "getcoupon": "优惠券名称、优惠券名称1、优惠券名称、优惠券名称1",
          "getyyy": "兑换点规则*10、兑换点规则*20",
          "payment": "微信",
          "getMoneyState": 0,
          "none": 5,
          "put": 5
        },
        {
          "orderId": "123584665465646",
          "custmoreCode": "4562635632",
          "custmoreName": "测试测试有限公司",
          "storeCode": "M4564643115",
          "storeName": "玛吉斯江湾2门店",
          "productName": "商品1，商品2，商品3 商品4, 商品5，商品6",
          "orderDate": "2016-09-21  08:50:08",
          "orderState": 1,
          "paymentState": 1,
          "orderMoney": "299.60元",
          "couponMoney": "不支持使用",
          "moneyRebate": "10.00元",
          "paymentMoney": "289.60元",
          "getMoney": "10.00元",
          "getNember": "10积分",
          "getcoupon": "优惠券名称、优惠券名称1、优惠券名称、优惠券名称1",
          "getyyy": "兑换点规则*10、兑换点规则*20",
          "payment": "微信",
          "getMoneyState": 2,
          "none": 5,
          "put": 5
        },
        {
          "orderId": "123584665465646",
          "custmoreCode": "4562635632",
          "custmoreName": "测试测试有限公司",
          "storeCode": "M4564643115",
          "storeName": "玛吉斯江湾2门店",
          "productName": "商品1，商品2，商品3 商品4, 商品5，商品6",
          "orderDate": "2016-09-21  08:50:08",
          "orderState": 2,
          "paymentState": 1,
          "orderMoney": "299.60元",
          "couponMoney": "不支持使用",
          "moneyRebate": "10.00元",
          "paymentMoney": "289.60元",
          "getMoney": "10.00元",
          "getNember": "10积分",
          "getcoupon": "优惠券名称、优惠券名称1、优惠券名称、优惠券名称1",
          "getyyy": "兑换点规则*10、兑换点规则*20",
          "payment": "微信",
          "getMoneyState": 2,
          "none": 5,
          "put": 5
        },
        {
          "orderId": "123584665465646",
          "custmoreCode": "4562635632",
          "custmoreName": "测试测试有限公司",
          "storeCode": "M4564643115",
          "storeName": "玛吉斯江湾2门店",
          "productName": "商品1，商品2，商品3 商品4, 商品5，商品6",
          "orderDate": "2016-09-21  08:50:08",
          "orderState": 5,
          "paymentState": 0,
          "orderMoney": "",
          "couponMoney": "",
          "moneyRebate": "",
          "paymentMoney": "",
          "getMoney": "",
          "getNember": "",
          "getcoupon": "",
          "getyyy": "",
          "payment": "",
          "getMoneyState": 4,
          "none": "",
          "put": ""
        },
        {
          "orderId": "123584665465646",
          "custmoreCode": "4562635632",
          "custmoreName": "测试测试有限公司",
          "storeCode": "M4564643115",
          "storeName": "玛吉斯江湾2门店",
          "productName": "商品1，商品2，商品3 商品4, 商品5，商品6",
          "orderDate": "2016-09-21  08:50:08",
          "orderState": 4,
          "paymentState": 1,
          "orderMoney": "299.60元",
          "couponMoney": "不支持使用",
          "moneyRebate": "10.00元",
          "paymentMoney": "289.60元",
          "getMoney": "10.00元",
          "getNember": "10积分",
          "getcoupon": "优惠券名称、优惠券名称1、优惠券名称、优惠券名称1",
          "getyyy": "兑换点规则*10、兑换点规则*20",
          "payment": "微信",
          "getMoneyState": 2,
          "none": 5,
          "put": 5
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false
    };
  },
  "computed": {},
  mounted() {

  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    /**
     * 前往详情
     */
    detailClick() {
      this.$router.push({ "path": "/product/order/package/detail" });
    }
  }
};