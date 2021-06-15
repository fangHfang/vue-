export default {
  "name": "PackageProductActivitySeckillDetail",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "storeCode": "M312321312",
        "storeName": "小型乘用车轮胎",
        "custmoreName": "玛吉斯",
        "custmoreCode": "21312312123123213",
        "orderCode": "56456345343",
        "orderState": "1",
        "orderDate": "2020-11-12 13:31:12",
        "payState": "1",
        "storeAddress": "上海市杨浦区江湾路2223号",
        "payCount": "399.00元",
        "discountCount": "-30.00元",
        "rebateCount": "-10.00元",
        "money": "389.00元",
        "paymentState": "微信",
        "discountOne": "A活动优惠券  3871298379",
        "discountTwo": "C活动优惠券  3871298379",
        "discountThree": "C活动优惠券  3871298379",
        "discount": "优惠金额   10.00元",
        "integral": "5000",
        "rebate": "30.00元",
        "exchange": "兑换点规则 兑换点分数",
        "class": {
          "value": "",
          "options": [
            { "label": "状态一", "value": "1" },
            { "label": "状态二", "value": "2" },
            { "label": "状态三", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "index": "1",
          "name": "测试轮胎",
          "number": "3",
          "one": "99.00元",
          "two": "轮胎类",
          "three": "玛吉斯",
          "four": "VS5 SUV",
          "state": "1",
          "six": "10.00元",
          "seven": "10.00元",
          "eight": "89.00元"
        },
        {
          "index": "2",
          "name": "测试轮胎",
          "number": "12",
          "one": "99.00元",
          "two": "轮胎类",
          "three": "玛吉斯",
          "four": "VS5 SUV",
          "state": "1",
          "six": "10.00元",
          "seven": "10.00元",
          "eight": "89.00元"
        }
      ],
      "dialogVisible": false,
      "tableDetailShow": true
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
        .catch(_ => {});
    },
    /**
     * 控制表格显示
     */
    tableFontClick() {
      this.tableDetailShow = !this.tableDetailShow;
    }
  }
};