import { createSiRule } from "@/api/business/sign";
import { listSearchCpTemplate } from "@/api/business/coupon/template";
import { listSearchEpRule } from "@/api/business/coupon/exchange";

export default {
  "name": "businessSignRuleAdd",
  "components": {
  },
  data() {
    return {
      "form": {
        "name": "",
        "remarks": "",
        // 累计签到
        "isCumulative": false,
        // 连续签到
        "isContinuity": false,
        // 单日
        "isOneDay": false,
        "cumulative": {
          "activeDate": "",
          "days": "",
          "rebate": "",
          "integral": "",
          "coupon": [ {
            "value": "",
            "number": ""
          } ],
          "exchange": [ {
            "value": "",
            "number": ""
          } ]
        },
        // 连续
        "continuity": {
          "days": "",
          "rebate": "",
          "integral": "",
          "coupon": [ {
            "value": "",
            "number": ""
          } ],
          "exchange": [ {
            "value": "",
            "number": ""
          } ]
        },
        // 单日
        "oneDay": {
          "rebate": "",
          "integral": "",
          "coupon": [ {
            "value": "",
            "number": ""
          } ],
          "exchange": [ {
            "value": "",
            "number": ""
          } ]
        }
      },
      // 优惠券规则集合
      "couponOption": [],
      // 兑换点规则集合
      "exchangeOption": [],
      "radio": "1",
      "dialogVisible": false,
      // 规则验证
      "rules": {
        "title": [
          { "required": true, "message": "", "trigger": "blur" }
        ]
      }
    };
  },
  mounted() {
    // 获取优惠券规则集合
    this.getCouponRuleList();
    // 获取兑换点规则集合
    this.getExchangeRuleList();
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
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },

    /**
     * 新增规则
     */
    addRule() {
      const _this = this;
      const { isContinuity, isOneDay, isCumulative, remarks, name, oneDay, continuity, cumulative } = this.form;
      const params = {
        "continuityDay": Number(continuity.days),
        "continuityIntegralReward": Number(continuity.integral),
        "continuityRebateReward": Number(continuity.rebate),
        // 是否开启连续签到奖励
        "isContinuitySignInReward": isContinuity,
        // 是否开启单日签到奖励
        "isSingleSignInReward": isOneDay,
        // 是否开启累计签到奖励
        "isTotalSignInReward": isCumulative,
        "remark": remarks,
        "ruleName": name,
        "singleIntegralReward": Number(oneDay.integral),
        "singleRebateReward": Number(oneDay.rebate),
        "totalDay": parseInt(cumulative.days),
        "totalIntegralReward": Number(cumulative.integral),
        "totalRebateReward": Number(cumulative.rebate),
        "totalStartTime": cumulative.activeDate[0],
        "totalEndTime": cumulative.activeDate[1]
      };
      const siRuleDetails = [];
      const signList = [ "oneDay", "continuity", "cumulative" ];
      const typeList = [ "coupon", "exchange" ];
      signList.map((signItem, signIndex) => {
        typeList.map((typeItem, typeIndex) => {
          _this.form[signItem][typeItem] && _this.form[signItem][typeItem].map((item) => {
            if (item.value && item.number) {
              siRuleDetails.push({
                "rewardAmount": item.number,
                "rewardRuleNo": item.value,
                "rewardType": typeIndex,
                "type": signIndex
              });
            }
          });
        });
      });
      params.siRuleDetails = siRuleDetails;
      createSiRule(params).then(res => {
        if (res.code === 200) {
          this.$message.success("创建成功");
          this.$router.push({ "path": "/business/sign/rule/list", "query": { "r": this.$getRandomValue() } });
        } else {
          this.$message.error("创建失败");
        }
      }).catch(error => {
        this.$message.error(error);
      });
    },
    /**
     * 添加一个item
     */
    addLinkItem(text) {
      const listItem = {
        "value": "",
        "options": [
          { "label": "一级", "value": "1" },
          { "label": "二级", "value": "2" },
          { "label": "三级", "value": "3" }
        ],
        "number": ""
      };
      if (text === "coupon") {
        this.form.cumulative.coupon.push(listItem);
      } else if (text === "exchange") {
        this.form.cumulative.exchange.push(listItem);
      } else if (text === "continuityCoupon") {
        this.form.continuity.coupon.push(listItem);
      } else if (text === "continuityExchange") {
        this.form.continuity.exchange.push(listItem);
      } else if (text === "oneDayCoupon") {
        this.form.oneDay.coupon.push(listItem);
      } else if (text === "oneDayExchange") {
        this.form.oneDay.exchange.push(listItem);
      }
    },

    /**
     * 删除一个item
     */
    removeLinkItem(index, text) {
      if (text === "coupon") {
        const array = this.form.cumulative.coupon.splice(index, 1);
        this.$set(array, index);
      } else if (text === "exchange") {
        const array = this.form.cumulative.exchange.splice(index, 1);
        this.$set(array, index);
      } else if (text === "continuityCoupon") {
        const array = this.form.continuity.coupon.splice(index, 1);
        this.$set(array, index);
      } else if (text === "continuityExchange") {
        const array = this.form.continuity.exchange.splice(index, 1);
        this.$set(array, index);
      } else if (text === "oneDayCoupon") {
        const array = this.form.oneDay.coupon.splice(index, 1);
        this.$set(array, index);
      } else if (text === "oneDayExchange") {
        const array = this.form.oneDay.exchange.splice(index, 1);
        this.$set(array, index);
      }
    }
  }
};