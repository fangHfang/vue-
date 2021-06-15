export default {
  "name": "limitedTimeSnapUpDetail",
  "components": {
  },
  data() {
    return {
      "open": true,
      "form": {
        "name": "",
        "ruleName": "",
        "activeDate": "",
        // 优惠券Table数据
        "couponTableData": [
          {
            "id": "1",
            "name": "测试轮胎",
            "info": "3",
            "state": 1,
            "price": "99.00元",
            "classification": "轮胎类",
            "brand": "玛吉斯",
            "spec": "VS5 SUV",
            "returnPrice": "10.00元",
            "coupon": "10.00元",
            "income": "89.00元"
          },
          {
            "id": "1",
            "name": "测试轮胎",
            "info": "12",
            "state": 0,
            "price": "99.00元",
            "classification": "轮胎类",
            "brand": "玛吉斯",
            "spec": "VS5 SUV",
            "returnPrice": "10.00元",
            "coupon": "10.00元",
            "income": "89.00元"
          }
        ]
      }
    };
  },
  "computed": {

  },
  created() {

  },
  mounted() {

  },
  "methods": {
    isShow() {
      this.open = !this.open;
    }
  }
};