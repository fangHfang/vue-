import { exchangeDetail } from "@/api/business/coupon/exchange";

export default {
  "name": "returnDetails",
  "components": {
  },
  data() {
    return {
      "form": {
        "activeListImg": []
      },
      "detail": {
        "orderNo": "",
        "state": 0,
        "code": "5464548645645",
        "storeName": "2016-11-12 08：50：08",
        "dealerName": "5464548645645",
        "dealerNumber": "M123456",
        "orderNumber": "玛吉斯大运河路门店",
        "orderState": 0,
        "orderTime": "门店标签",
        "storeAddress": "-12",
        "refundAmount": "××××××××",
        "brand": "111",
        "classification": "111",
        "spec": "1111",
        "tableData": []
      },
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      // table展开收起状态 默认展开
      "tableUnfold": true,
      "orderNo": this.$route.query.orderNo

    };
  },
  mounted() {
    this.exchangeDetail();
  },
  "methods": {
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },

    /**
     * 查询详情
     */
    exchangeDetail() {
      const params = {
        "orderNo": this.orderNo
      };
      exchangeDetail(params).then(res => {
        if (res.code === 200) {
          this.detail = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    }
  }
};
