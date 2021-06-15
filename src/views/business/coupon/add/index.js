import { getBrand, getClassification, addCpTemplate, searchList, editCpTemplate, getProductItemInfo } from "@/api/business/coupon/coupon.js";

export default {
  "name": "businessDistributorInboundDetail",
  "components": {
  },
  data() {
    return {
      "value": "",
      "radio": "1",
      "make": "1",
      "order": "1",
      "superposition": "1",
      "limitType": "0",
      "toolBar": {
        "hour": "",
        "people": "",
        "state": "",
        "dataRange": "",
        "notice": "",
        "time": "",
        "money": "",
        "name": "",
        "orderLimitAmount": "",
        // 可兑换商品类型别 0-范围兑换,1-单品兑换
        "exchangeGoodsType": "1",
        "category": {
          "value": "1",
          "options": [
            { "label": "消费券", "value": "0" },
            { "label": "兑换券", "value": "1" }
          ]
        },
        "brand": {
          "value": "",
          "options": []
        },
        "classification": {
          "value": "",
          "options": []
        },
        "goods": {
          "value": "",
          "options": []
        }
      },
      "ruleNo": this.$route.query.ruleNo,
      "btnLoading": false
    };
  },
  created() {
    // 查询品牌
    this.getBrand();
    // 查询分类
    this.getClassification();
    // 查询商品
    this.getProductItemInfo();
  },
  mounted() {
    if (this.ruleNo) {
      this.searchList(this.ruleNo);
    }
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    /**
       * 返回
       * @param val
       */
    back() {
      this.$router.back(-1);
    },

    /**
     * 查询品牌
     */
    getBrand() {
      getBrand().then(res => {
        if (res.code === 200) {
          this.toolBar.brand.options = res.data.map(x => {
            return {
              "label": x.brandName,
              "value": x.brandNo
            };
          });
        } else {
          console.log("查询品牌失败");
        }
      });
    },

    /**
     * 查询分类
     */
    getClassification() {
      getClassification().then(res => {
        if (res.code === 200) {
          this.toolBar.classification.options = res.data.map(x => {
            return {
              "label": x.wholeCategoryName,
              "value": x.categoryNo
            };
          });
        } else {
          console.log("查询分类失败");
        }
      });
    },

    /**
     * 查询商品
     */
    getProductItemInfo() {
      const params = {
        "pageNum": 1,
        "pageSize": 50
      };
      getProductItemInfo(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.toolBar.goods.options = res.data.records.map(x => {
            return {
              "label": x.itemName,
              "value": x.itemNo
            };
          });
        } else {
          console.log("查询商品失败");
        }
      });
    },

    add() {
      this.btnLoading = true;
      const params = {
        "couponClass": this.toolBar.category.value,
        "type": this.toolBar.category.value,
        "ruleName": this.toolBar.name,
        "remark": this.toolBar.notice,
        "effectType": this.radio,
        "discountType": 0
      };
      // 消费券
      if (this.toolBar.category.value === "0") {
        params.limitType = this.limitType;
        if (this.limitType === "2") {
          params.categoryNo = this.toolBar.classification.value;
        } else if (this.limitType === "3") {
          params.itemNo = this.toolBar.goods.value;
        }
        params.orderLimitType = this.order;
        if (this.order === "1") {
          params.orderLimitAmount = this.toolBar.orderLimitAmount;
        }
        params.compositionLimit = this.superposition;
        params.discountAmount = this.toolBar.money;
      // 兑换券
      } else if (this.toolBar.category.value === "1") {
        if (!this.toolBar.goods.value) {
          this.$message.warning("请选择可兑换商品");
          this.btnLoading = false;
          return;
        }
        const { value = "", label = "" } = this.toolBar.goods.options && this.toolBar.goods.options.length > 0 && this.toolBar.goods.options.find((item) => { return item.value === this.toolBar.goods.value; });
        params.itemNo = value;
        params.itemName = label;
      } else {
        this.btnLoading = false;
        return this.$message.warning("请选择卡券类别");
      }
      if (this.radio === "0") {
        if (this.toolBar.dataRange && this.toolBar.dataRange.length > 0) {
          params.startTime = this.$moment(this.toolBar.dataRange[0]).format("yyyy-MM-DD HH:mm:ss");
          params.endTime = this.$moment(this.toolBar.dataRange[1]).format("yyyy-MM-DD HH:mm:ss");
        }
      } else if (this.radio === "1") {
        params.effectAfterDay = this.toolBar.time;
      }
      if (this.ruleNo === undefined) {
        addCpTemplate(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("保存成功");
            setTimeout(() => {
              this.back();
            }, 1000);
          } else {
            this.$message.error("保存失败");
            this.btnLoading = false;
          }
        }).catch(res => {
          this.btnLoading = false;
        });
      } else {
        params.ruleNo = this.ruleNo;
        editCpTemplate(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("保存成功");
            setTimeout(() => {
              this.back();
            }, 1000);
          } else {
            this.$message.error("保存失败");
            this.btnLoading = false;
          }
        }).catch(res => {
          this.btnLoading = false;
        });
      }
    },

    /**
     * 查询详情
     */
    searchList(ruleNo) {
      searchList(ruleNo).then((res) => {
        if (res.code === 200) {
          this.toolBar.category.value = String(res.data.couponClass);
          this.toolBar.name = res.data.ruleName;
          this.radio = String(res.data.effectType);
          this.toolBar.brand.value = res.data.brandNo;
          this.toolBar.classification.value = res.data.categoryNo;
          this.toolBar.goods.value = res.data.itemNo;
          this.limitType = String(res.data.limitType);
          // 商品是否存在值，存在即是单品兑换，不存在即是可兑换商品
          if (res.data.itemNo) {
            this.toolBar.exchangeGoodsType = "1";
          } else {
            this.toolBar.exchangeGoodsType = "0";
          }
          this.toolBar.notice = res.data.remark;
          if (this.radio === "0") {
            this.toolBar.dataRange = [ res.data.startTime, res.data.endTime ];
          } else {
            this.toolBar.time = res.data.effectAfterDay;
          }
          if (this.toolBar.category.value === "0") {
            this.toolBar.money = res.data.discountAmount;
            this.order = String(res.data.orderLimitType);
            if (this.order === "1") {
              this.toolBar.orderLimitAmount = res.data.orderLimitAmount;
            }
            this.superposition = String(res.data.compositionLimit);
          }
          console.log(this.limitType);
        }
      }).catch(() => {

      });
    }

  }
};
