import { listSearchEpRule } from "@/api/business/coupon/exchange";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
export default {
  "name": "ruleRange",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "ruleRange": {
        "epRule": {
          "value": "",
          "options": []
        },
        "itRule": {
          "value": "",
          "options": []
        },
        "rbRule": {
          "value": "",
          "options": []
        }
      }
    };
  },
  "computed": {},
  mounted() {
    this.listSearchEpRule();
    this.listSearchRbRuleType();
    this.listSearchItRuleType();
  },
  "methods": {
    /**
     * 分页查询兑换点数据
     */
    listSearchEpRule() {
      // 1、商品模块-活动模块-积分模块都是0-商品下单   2、安心跑模块 2-商品出库   3、签约-店检  1-商品入库
      listSearchEpRule("type=2").then((res) => {
        if (res.code === 200) {
          this.ruleRange.epRule.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      }).finally(() => {
      });
    },
    /**
     * 查询返利规则列表
     */
    listSearchRbRuleType() {
      listSearchRbRule("type=2").then(res => {
        if (res.code === 200) {
          this.ruleRange.rbRule.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询返利规则失败");
        }
      });
    },
    /**
     * 查询积分规则列表
     */
    listSearchItRuleType() {
      listSearchItRule("type=2").then(res => {
        if (res.code === 200) {
          this.ruleRange.itRule.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询积分规则失败");
        }
      });
    },
    /**
       * 确定
       */
    save() {
      // https://o2o-mall.coding.net/p/mjs-test/bug-tracking/issues/2412/detail 必填去掉
      // if (!this.ruleRange.rbRule.value) {
      //   return this.$message.warning("请选择返利规则");
      // }
      // if (!this.ruleRange.itRule.value) {
      //   return this.$message.warning("请选择积分规则");
      // }
      // if (!this.ruleRange.epRule.value) {
      //   return this.$message.warning("请选择兑换点规则");
      // }
      const params = {
        "epRuleNo": this.ruleRange.epRule.value,
        "itRuleNo": this.ruleRange.itRule.value,
        "rbRuleNo": this.ruleRange.rbRule.value
      };
      this.$emit("selectRule", params);
    },
    /**
       * 取消
       */
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};