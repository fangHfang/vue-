import { siRuleDetail } from "@/api/business/sign";
import { listSearchCpTemplate } from "@/api/business/coupon/template";
import { listSearchEpRule } from "@/api/business/coupon/exchange";
export default {
  "name": "businessSignRuleDetail",
  "components": {
  },
  data() {
    return {
      "ruleNo": this.$route.params.ruleNo || "",
      "detail": {
        "siRuleDetails": []
      },
      "radio": "1",
      "dialogVisible": false,
      // 规则验证
      "rules": {
        "title": [
          { "required": true, "message": "", "trigger": "blur" }
        ]
      },
      // 优惠券规则集合
      "couponOption": [],
      // 兑换点规则集合
      "exchangeOption": []
    };
  },
  mounted() {
    // 获取优惠券规则集合
    this.getCouponRuleList();
    // 获取兑换点规则集合
    this.getExchangeRuleList();
    // 查询签到详情
    this.getSignRuleDetail();
  },
  "methods": {
    /**
     * 获取优惠券规则集合
     */
    getCouponRuleList() {
      const param = "status=" + 1;
      listSearchCpTemplate(param).then((res) => {
        let list = res.data;
        list = list.map((item) => {
          return {
            "value": item.ruleNo,
            "label": item.ruleName
          };
        });
        this.couponOption = list;
      }).catch((err) => {
        console.log(err, "err");
      });
    },

    /**
       * 获取兑换点规则集合
       */
    getExchangeRuleList() {
      const param = "type=1&&status=" + 1;
      listSearchEpRule(param).then((res) => {
        let list = res.data;
        list = list.map((item) => {
          return {
            "value": item.ruleNo,
            "label": item.ruleName
          };
        });
        this.exchangeOption = list;
      }).catch((err) => {
        console.log(err, "err");
      });
    },

    /**
     * 查询签到详情
     */
    getSignRuleDetail() {
      const params = "?ruleNo=" + this.ruleNo;
      siRuleDetail(params).then((res) => {
        if (res.code === 200) {
          const signList = [ "oneDay", "continuity", "cumulative" ];
          const typeList = [ "coupon", "exchange" ];
          const { siRuleDetails } = res.data;
          this.detail = {
            ...res.data,
            "cumulative": {
              "coupon": [],
              "exchange": []
            },
            "continuity": {
              "coupon": [],
              "exchange": []
            },
            "oneDay": {
              "coupon": [],
              "exchange": []
            }
          };
          siRuleDetails.map((item) => {
            this.detail[signList[item.type]][typeList[item.rewardType]].push({
              "value": item.rewardRuleNo,
              "number": item.rewardAmount
            });
          });
        } else {
          this.$message.error("查询签到详情失败");
        }
      }).catch((err) => {
        console.log(err, "查询签到详情失败");
      });
    },

    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    }
  }
};
