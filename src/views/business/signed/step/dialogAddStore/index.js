
import { listStoreByPage } from "@/api/product/manage";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
import { listSearchEpRule } from "@/api/business/coupon/exchange";
import { listSearchCpTemplate } from "@/api/business/coupon/template";
import { scStoreCrete } from "@/api/business/signed/step";

export default {
  "name": "dialogAddStore",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "ruleNo": {
      "type": String,
      "default": ""
    }

  },
  data() {
    return {
      "searchData": {
        "couponNum": "",
        "upLimit": "",
        "lowerLimit": "",
        "storeName": "",
        "storeNo": "",
        "dealerName": "",
        "dealerNo": "",
        "page.pageNum": 1,
        "page.pageSize": 10
      },
      "loading": false,
      "toolBar": {
        "rebate": {
          "value": "",
          "options": []
        },
        "integral": {
          "value": "",
          "options": []
        },
        "exchange": {
          "value": "",
          "options": []
        },
        "coupon": {
          "value": "",
          "options": []
        },
        "storeNature": {
          "value": "",
          "options": []
        }
      },
      "tableData": [],
      "total": 0,
      "multipleSelection": [],
      "btnLoading": false
    };
  },
  "watch": {
    dialogVisible(val) {
      if (val) {
        this.listStoreByPage();
        this.listSearchRbRuleType();
        this.listSearchItRuleType();
        this.listSearchEpRuleType();
        this.listSearchCpTemplateType();
      } else {
        this.btnLoading = false;
      }
    }
  },
  "methods": {
    searchTableData() {
      this.searchData["page.pageNum"] = 1;
      this.listStoreByPage();
    },
    resetTable() {
      this.searchData["page.pageNum"] = 1;
      this.searchData["page.pageSize"] = 10;
      this.searchData.name = "";
      this.searchData.storeNo = "";
      this.searchData.dealerName = "";
      this.listStoreByPage();
    },
    listStoreByPage() {
      this.loading = true;
      listStoreByPage(this.$jsonFormat(this.searchData)).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(data => {
            data.upperLimit = 0;
            data.lowerLimit = 0;
          });
          this.tableData = res.data.records;
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => { this.loading = false; });
    },
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.searchData["page.pageSize"] = val;
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData["page.pageNum"] = val;
      this.listStoreByPage();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      if (this.multipleSelection.length === 0) {
        return this.$message.info("请至少选择一个！");
      }
      const postData = {
        "ruleNo": this.ruleNo
      };
      postData.dtoList = [];
      this.multipleSelection.forEach(data => {
        const params = {
          "cpCount": this.searchData.couponNum,
          "cpRuleNo": this.toolBar.coupon.value.value,
          "cpRuleName": this.toolBar.coupon.value.label,
          "customerNo": data.customerNo,
          "epRuleNo": this.toolBar.exchange.value.value,
          "epRuleName": this.toolBar.exchange.value.label,
          "itRuleNo": this.toolBar.integral.value.value,
          "itRuleName": this.toolBar.integral.value.label,
          "lowerLimit": data.lowerLimit,
          "upperLimit": data.upperLimit,
          "rbRuleNo": this.toolBar.rebate.value.value,
          "rbRuleName": this.toolBar.rebate.value.label
        };
        console.log(this.toolBar.rebate);
        postData.dtoList.push(params);
      });
      scStoreCrete(postData).then(res => {
        if (res.code === 200) {
          this.btnLoading = true;
          this.handleClose();
          const params = {
            "ruleNo": this.ruleNo,
            "page.pageNum": 1,
            "page.pageSize": 10
          };
          this.$emit("listStoreByPage", params);
        } else {
          this.$message.error("查询返利规则失败");
        }
      });
    },
    selectedAll() {

    },
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.toolBar.rebate.value = "";
      this.toolBar.integral.value = "";
      this.toolBar.exchange.value = "";
      this.toolBar.coupon.value = "";
      this.toolBar.storeNature.value = "";
      this.searchData.couponNum = "";
      this.searchData.upLimit = "";
      this.searchData.lowerLimit = "";
      this.$emit("close", false);
    },

    /**
     * 查询返利规则列表
     */
    listSearchRbRuleType(key) {
      listSearchRbRule("type=1").then(res => {
        if (res.code === 200) {
          this.toolBar.rebate.options = res.data.map(element => {
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
    listSearchItRuleType(key) {
      listSearchItRule("type=1").then(res => {
        if (res.code === 200) {
          this.toolBar.integral.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询积分规则失败");
        }
      });
    },

    /**
     * 查询兑换点规则列表
     */
    listSearchEpRuleType(key) {
      listSearchEpRule("type=1").then(res => {
        if (res.code === 200) {
          this.toolBar.exchange.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 查询优惠券规则列表
     */
    listSearchCpTemplateType(key) {
      listSearchCpTemplate("status=1").then(res => {
        if (res.code === 200) {
          this.toolBar.coupon.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 批量设置
     */
    batch() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.multipleSelection.forEach(data => {
        data.upperLimit = this.searchData.upLimit;
        data.lowerLimit = this.searchData.lowerLimit;
      });
    },
    storeChange(val) {
      this.searchData.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.searchData.dealerNo = val;
    }
  }
};