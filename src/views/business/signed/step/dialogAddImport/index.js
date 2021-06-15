import { MARKET_URL } from "@/utils/system-constant";
export default {
  "name": "dialogAddImport",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "rbRuleList": {
      "type": Array,
      "default": () => []
    },
    "itRuleList": {
      "type": Array,
      "default": () => []
    },
    "epRuleList": {
      "type": Array,
      "default": () => []
    },
    "couponList": {
      "type": Array,
      "default": () => []
    },
    "importUrl": {
      "type": String,
      "default"() {
        return "";
      }
    }
  },
  data() {
    return {
      // 导入导出api地址
      "exportUrl": "",
      "toolBar": {
        "rebate": {
          "value": "",
          "options": [
            { "label": "规则1", "value": "1" },
            { "label": "规则2", "value": "2" },
            { "label": "规则3", "value": "3" }
          ]
        },
        "integral": {
          "value": "",
          "options": [
            { "label": "规则1", "value": "1" },
            { "label": "规则2", "value": "2" },
            { "label": "规则3", "value": "3" }
          ]
        },
        "exchange": {
          "value": "",
          "options": [
            { "label": "规则1", "value": "1" },
            { "label": "规则2", "value": "2" },
            { "label": "规则3", "value": "3" }
          ]
        },
        "coupon": {
          "value": "",
          "options": [
            { "label": "优惠券1", "value": "1" },
            { "label": "优惠券2", "value": "2" },
            { "label": "优惠券3", "value": "3" }
          ]
        },
        "couponNum": ""
      }
    };
  },
  "computed": {
    exportGetData() {
      return {};
    }
  },
  mounted() {
  },
  "methods": {
    /**
       * 确认导入
       */
    save() {
      this.$emit("selectImport", this.toolBar);
      this.close();
    },
    /**
       * 取消
       */
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};