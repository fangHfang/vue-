import { modifyLadderRule, ladderRuleDetail } from "@/api/product/integral/rebate";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";

export default {
  "name": "ProductIntegralRebateAdd",
  "components": {
  },
  data() {
    return {
      // 表单
      "form": {
        "ladderRuleDetails": [
          {
            "level": 0,
            "lowerLimit4In": 0,
            "upperLimit4In": 0,
            "rbRuleNo4In": "",
            "itRuleNo4In": "",
            "lowerLimit4Out": 0,
            "upperLimit4Out": 0,
            "rbRuleNo4Out": "",
            "itRuleNo4Out": ""
          }
        ],
        "remark": "",
        "settlementCycle": ""
      },
      "toolBar": {
        "rbRules4In": {
          "options": []
        },
        "itRules4In": {
          "options": []
        },
        "rbRules4Out": {
          "options": []
        },
        "itRules4Out": {
          "options": []
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableDetailShow": true
    };
  },
  "computed": {},
  mounted() {
    this.getLadderRuleDetail();
    this.initConditionRules();
  },
  "methods": {
    /**
    * 添加一个item
    */
    addLinkItem() {
      const listItem = {
        "level": 0,
        "lowerLimit": 0,
        "upperLimit": 0,
        "rbRuleNo": "",
        "itRuleNo": ""
      };
      this.form.ladderRuleDetails.push(listItem);
    },
    /**
     * 删除一个item
     */
    removeLinkItem(index) {
      const array = this.form.ladderRuleDetails.splice(index, 1);
      this.$set(array, index);
    },
    /**
     * 数字转为中文
     * @param {*} num
     */
    changeNumToHan(num) {
      const arr1 = [ "零", "一", "二", "三", "四", "五", "六", "七", "八", "九" ];
      const arr2 = [ "", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿" ];
      if (!num || isNaN(num)) {
        return "零";
      }
      const english = num.toString().split("");
      let result = "";
      for (let i = 0;i < english.length;i++) {
        const des = english.length - 1 - i;
        result = arr2[i] + result;
        const arr1Index = english[des];
        result = arr1[arr1Index] + result;
      }
      /**
       * 将【零千、零百】换成【零】 【十零】换成【十】
       *  */
      result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
      /**
       * 合并中间多个零为一个零
       *  */
      result = result.replace(/零+/g, "零");
      /**
       * 将【零亿】换成【亿】【零万】换成【万】
       *  */
      result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
      /**
       * 将【亿万】换成【亿】
       *  */
      result = result.replace(/亿万/g, "亿");
      /**
       * 移除末尾的零
       *  */
      result = result.replace(/零+$/, "");
      /**
       *  将【零一十】换成【零十】
       *  */
      /**
       *  将【一十】换成【十】
       *  */
      result = result.replace(/^一十/g, "十");
      return result;
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
     * 初始化返利、积分条件
     */
    initConditionRules() {
      // 返利-入库条件
      this.listSearchRbRule(1);
      // 返利-出库条件
      this.listSearchRbRule(2);
      // 积分-入库条件
      this.listSearchItRule(1);
      // 积分-出库条件
      this.listSearchItRule(2);
    },
    /**
     * 查询返利规则列表-商品入库
     */
    listSearchRbRule(type) {
      let item = this.toolBar.rbRules4In;
      if (type === 2) {
        item = this.toolBar.rbRules4Out;
      }
      // 请求参数 返利节点 0-商品下单，1-商品入库，2-商品出库
      const param = "type=" + type + "&status=" + 0;
      listSearchRbRule(param).then(res => {
        if (res.code === 200) {
          item.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    /**
     * 查询积分规则列表
     */
    listSearchItRule(type) {
      let item = this.toolBar.itRules4In;
      if (type === 2) {
        item = this.toolBar.itRules4Out;
      }
      // 请求参数 返利节点 0-商品下单，1-商品入库，2-商品出库
      const param = "type=" + type + "&status=" + 0;
      listSearchItRule(param).then(res => {
        if (res.code === 200) {
          item.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 获取阶梯规则详情
     */
    getLadderRuleDetail() {
      const levels = [];
      const ladderRuleDetails = [];
      ladderRuleDetail().then(res => {
        if (res.code === 200) {
          res.data.ladderRuleDetails.forEach(element => {
            if (levels.includes(element.level)) {
              const index = levels.indexOf(element.level);
              const item = ladderRuleDetails[index];
              if (element.type === 0) {
                item.lowerLimit4In = element.lowerLimit;
                item.upperLimit4In = element.upperLimit;
                item.rbRuleNo4In = element.rbRuleNo;
                item.itRuleNo4In = element.itRuleNo;
              } else {
                item.lowerLimit4Out = element.lowerLimit;
                item.upperLimit4Out = element.upperLimit;
                item.rbRuleNo4Out = element.rbRuleNo;
                item.itRuleNo4Out = element.itRuleNo;
              }
            } else {
              levels.push(element.level);
              const item = {
                "level": element.level,
                "lowerLimit4In": 0,
                "upperLimit4In": 0,
                "rbRuleNo4In": "",
                "itRuleNo4In": "",
                "lowerLimit4Out": 0,
                "upperLimit4Out": 0,
                "rbRuleNo4Out": "",
                "itRuleNo4Out": ""
              };
              if (element.type === 0) {
                item.lowerLimit4In = element.lowerLimit;
                item.upperLimit4In = element.upperLimit;
                item.rbRuleNo4In = element.rbRuleNo;
                item.itRuleNo4In = element.itRuleNo;
              } else {
                item.lowerLimit4Out = element.lowerLimit;
                item.upperLimit4Out = element.upperLimit;
                item.rbRuleNo4Out = element.rbRuleNo;
                item.itRuleNo4Out = element.itRuleNo;
              }
              ladderRuleDetails.push(item);
            }
          });
          this.form.remark = res.data.remark;
          this.form.settlementCycle = res.data.settlementCycle;
        } else {
          this.$message.error("查询明细失败");
        }
      });
    },

    /**
     * 保存阶梯规则
     */
    saveLadderRule() {
      const ladderRuleDetails = [];
      this.form.ladderRuleDetails.forEach((element, index) => {
        const level = element.level ? element.level : index + 1;
        ladderRuleDetails.push({
          "level": level,
          "lowerLimit": element.lowerLimit4In,
          "upperLimit": element.upperLimit4In,
          "rbRuleNo": element.rbRuleNo4In,
          "itRuleNo": element.itRuleNo4In,
          "type": 0
        });
        ladderRuleDetails.push({
          "level": level,
          "lowerLimit": element.lowerLimit4Out,
          "upperLimit": element.upperLimit4Out,
          "rbRuleNo": element.rbRuleNo4Out,
          "itRuleNo": element.itRuleNo4Out,
          "type": 1
        });
      });
      const postData = {
        "settlementCycle": this.form.settlementCycle,
        "remark": this.form.remark,
        ladderRuleDetails
      };
      console.info(postData);
      modifyLadderRule(postData).then(res => {
        if (res.code === 200) {
          this.$router.push({ "path": "/product/integral/rebate/detail" });
        } else {
          this.$message.error("保存失败");
        }
      });
    }
  }
};