// src/views/business/inspection/setUp/add/index
import { queryInspect, createInspect, modifyInspect } from "@/api/business/inspection/inspection";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
import { listSearchEpRule } from "@/api/business/coupon/exchange";
import { listSearchCpTemplate } from "@/api/business/coupon/template";
import upload from "@/components/upload/index.vue";
export default {
  "name": "businessSignRuleAdd",
  "components": {
    upload
  },
  data() {
    return {
      "selectMonth": "",
      "pickerOptions": {
        "disabledDate": time => {
          if (!this.selectMonth) {
            return false;
          }
          return (this.selectMonth.getFullYear() !== time.getFullYear());
        },
        "onPick": date => {
          // 如果只选择一个则保存至selectDate 否则selectDate 为空
          if (date.minDate && !date.maxDate) {
            this.selectMonth = date.minDate;
          } else {
            this.selectMonth = "";
          }
        }
      },
      "form": {
        "name": "",
        "inspectYearStr": "",
        "startMonthStr": "",
        "endMonthStr": "",
        "monthArr": "",
        "customScore": 100,
        "status": 0,
        "clauseList": [
          {
            "description": "",
            "exampleUrl": "",
            "exampleUrlFileList": [],
            "fullScore": 0,
            "name": "",
            "requirement": "",
            "sort": 0
          }
        ],
        "rebateList": [ {
          "checked": true,
          // 返利规则编号
          "rebateNo": "",
          // 分数条件最小值
          "minScore": "",
          // 分数条件最大值
          "maxScore": "",
          "rebateSettingsList": [ {
            // 入库 下单条件最小值
            "minCount": "",
            // 入库 下单条件最大值
            "maxCount": "",
            // 条件类型 1-入库条件 0-下单条件
            "conditionType": {
              "value": "",
              "options": [
                { "label": "入库条件", "value": 1 }
                // { "label": "下单条件", "value": 0 }
              ]
            },
            // 返利规则编号
            "rebateNo": {
              "value": "",
              "options": [

              ]
            },
            // 积分规则编号
            "integralNo": {
              "value": "",
              "options": [

              ]
            },
            // 优惠券规则
            "couponNo": {
              "value": "",
              "options": [

              ]
            },
            // 兑换点规则
            "exchangeNo": {
              "value": "",
              "options": [

              ]
            },
            // 优惠券数量
            "couponCount": 1
          } ]
        } ]
      },
      "dialogVisible": false,
      // 规则验证
      "rules": {
        "title": [
          { "required": true, "message": "", "trigger": "blur" }
        ]
      }
    };
  },
  "computed": {
    isModify() {
      return this.$store.state.inspectionSetUp.modify;
    },
    inspectNo() {
      return this.$store.state.inspectionSetUp.inspectNo;
    },
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  mounted() {
    if (this.isModify) {
      this.getInspectTemplateByRuleNo();
    }
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
     * 上传图片成功后钩子
     */
    handlePicSuccess(res, item) {
      if (res.code === 200) {
        item.exampleUrl = res.data.objectUrl;
      } else {
        this.$message.error(res.msg);
      }
    },
    /**
     * 移除图片
     * @param {*} file
     * @param {*} name
     */
    handlePicRemove(file, item) {
      this.$confirm("确定删除吗", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        item.exampleUrlFileList = [];
        item.exampleUrl = "";
        this.$forceUpdate();
      }).catch(() => {});
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
     * 添加店检项目设置
     */
    addClauseItem() {
      const listItem = {
        "description": "",
        "exampleUrl": "",
        "exampleUrlFileList": [],
        "fullScore": 0,
        "name": "",
        "requirement": "",
        "sort": 0
      };
      this.form.clauseList.push(listItem);
    },
    /**
     * 添加一个返利
     */
    addTotalRebateItem() {
      const rebateListItem = {
        "checked": true,
        // 返利规则编号
        "rebateNo": "",
        // 分数条件最小值
        "minScore": "",
        // 分数条件最大值
        "maxScore": "",
        "rebateSettingsList": [ {
          // 入库 下单条件最小值
          "minCount": "",
          // 入库 下单条件最大值
          "maxCount": "",
          // 条件类型 0-入库条件 1-下单条件
          "conditionType": {
            "value": "",
            "options": [
              { "label": "入库条件", "value": 1 }
              // { "label": "下单条件", "value": 0 }
            ]
          },
          // 返利规则编号
          "rebateNo": {
            "value": "",
            "options": [
            ]
          },
          // 积分规则编号
          "integralNo": {
            "value": "",
            "options": [
            ]
          },
          // 优惠券规则
          "couponNo": {
            "value": "",
            "options": [
            ]
          },
          // 兑换点规则
          "exchangeNo": {
            "value": "",
            "options": [
            ]
          },
          // 优惠券数量
          "couponCount": 1
        } ]
      };
      this.form.rebateList.push(rebateListItem);
    },
    /**
     * 删除一个返利item
     * @param index
     */
    removeRebateSetItem(index) {
      const array = this.form.rebateList.splice(index, 1);
      this.$set(array, index);
    },
    /**
     * 删除一个item
     */
    removeLinkItem(index) {
      const array = this.form.clauseList.splice(index, 1);
      this.$set(array, index);
    },
    /**
     * 添加一个返利设置item
     */
    addRebateItem(index) {
      const listItem = {
        // 入库 下单条件最小值
        "minCount": "",
        // 入库 下单条件最大值
        "maxCount": "",
        // 条件类型 0-入库条件 1-下单条件
        "conditionType": {
          "value": "",
          "options": [
            { "label": "入库条件", "value": 1 }
            // { "label": "下单条件", "value": 0 }
          ]
        },
        // 返利规则编号
        "rebateNo": {
          "value": "",
          "options": [
          ]
        },
        // 积分规则编号
        "integralNo": {
          "value": "",
          "options": [
          ]
        },
        // 优惠券规则
        "couponNo": {
          "value": "",
          "options": [
          ]
        },
        // 兑换点规则
        "exchangeNo": {
          "value": "",
          "options": [
          ]
        },
        // 优惠券数量
        "couponCount": 1
      };
      this.form.rebateList[index].rebateSettingsList.push(listItem);
    },

    /**
     * 删除一个返利设置item
     */
    removeRebateItem(index, setIndex) {
      const array = this.form.rebateList[index].rebateSettingsList.splice(setIndex, 1);
      this.$set(array, setIndex);
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 7);
    },
    /**
     * 查询用户数据
     */
    getInspectTemplateByRuleNo() {
      this.tableLoading = true;
      const params = {
        "inspectNo": this.inspectNo
      };
      queryInspect(params).then(res => {
        if (res.code === 200) {
          console.info(res.data);
          this.form = { ...this.form, ...res.data };
          this.form.monthArr = [ res.data.inspectYearStr + "-" + res.data.startMonthStr, res.data.inspectYearStr + "-" + res.data.endMonthStr ];
          this.form.clauseList = res.data.clauses;
          this.form.clauseList.forEach(element => {
            element.exampleUrlFileList = [];
            element.exampleUrlFileList.push({
              "url": element.exampleUrl
            });
          });
          const inspectRebateDetail = res.data.rebates;
          const scoreArray = [];
          const rebateArray = [];
          inspectRebateDetail.forEach(function(element) {
            const scoreRank = element.minScore + "-" + element.maxScore;
            const scoreRankIndex = scoreArray.indexOf(scoreArray);
            // 分数区间存在
            if (scoreRankIndex > -1) {
              const rebateSetItem = {
                // 入库 下单条件最小值
                "minCount": element.minCount,
                // 入库 下单条件最大值
                "maxCount": element.maxCount,
                // 条件类型 0-入库条件 1-下单条件
                "conditionType": {
                  // "value": element.conditionType,
                  // 产品说 下单条件被客户拿掉了，只有一个入库
                  "value": 1,
                  "options": [
                    { "label": "入库条件", "value": 1 }
                    // { "label": "下单条件", "value": 0 }
                  ]
                },
                // 返利规则编号
                "rebateNo": {
                  "value": element.rebateNo,
                  "options": [
                  ]
                },
                // 积分规则编号
                "integralNo": {
                  "value": element.integralNo,
                  "options": [
                  ]
                },
                // 优惠券规则
                "couponNo": {
                  "value": element.couponNo,
                  "options": [
                  ]
                },
                // 兑换点规则
                "exchangeNo": {
                  "value": element.exchangeNo,
                  "options": [
                  ]
                },
                // 优惠券数量
                "couponCount": element.couponCount
              };
              rebateArray.get(scoreRankIndex).rebateSettingsList.push(rebateSetItem);
            } else {
              scoreArray.push(scoreRank);
              const rebateItem = {
                "checked": true,
                // 返利规则编号
                "rebateNo": element.rebateNo,
                // 分数条件最小值
                "minScore": element.minScore,
                // 分数条件最大值
                "maxScore": element.maxScore,
                "rebateSettingsList": [ {
                  // 入库 下单条件最小值
                  "minCount": element.minCount,
                  // 入库 下单条件最大值
                  "maxCount": element.maxCount,
                  // 条件类型 0-入库条件 1-下单条件
                  "conditionType": {
                    "value": 1,
                    "options": [
                      { "label": "入库条件", "value": 1 }
                      // { "label": "下单条件", "value": 0 }
                    ]
                  },
                  // 返利规则编号
                  "rebateNo": {
                    "value": element.rebateNo,
                    "options": [
                    ]
                  },
                  // 积分规则编号
                  "integralNo": {
                    "value": element.integralNo,
                    "options": [
                    ]
                  },
                  // 优惠券规则
                  "couponNo": {
                    "value": element.couponNo,
                    "options": [
                    ]
                  },
                  // 兑换点规则
                  "exchangeNo": {
                    "value": element.exchangeNo,
                    "options": [
                    ]
                  },
                  // 优惠券数量
                  "couponCount": element.couponCount
                } ]
              };
              rebateArray.push(rebateItem);
            }
          });
          this.form.rebateList = [ ...rebateArray ];
          this.form.rebateList.forEach(x => {
            if (x.rebateSettingsList) {
              x.rebateSettingsList.forEach(y => {
                this.conditionTypeChange("", y, "modify");
              });
            }
          });
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },
    /**
    * 保存店检规则
    */
    saveInspect() {
      if (!this.form.name) {
        return this.$message.warning("请输入店检名称");
      }
      if (!this.form.monthArr) {
        return this.$message.warning("请选择店检时间");
      }
      const clauseList = [];
      let canSave = true;
      this.form.clauseList.forEach(element => {
        if (element.exampleUrlFileList && element.exampleUrlFileList.length > 0) {
          element.exampleUrl = element.exampleUrlFileList[0].url;
        }
        if (!element.name) {
          canSave = false;
          return this.$message.warning("项目名称不能为空");
        }
        if (element.fullScore < 1) {
          canSave = false;
          return this.$message.warning("项目分值不能小于1");
        }
        if (!element.exampleUrl) {
          canSave = false;
          return this.$message.warning("示例图不能为空");
        }
        if (!element.requirement) {
          canSave = false;
          return this.$message.warning("项目要求不能为空");
        }
        const clause = {
          "description": element.description,
          "exampleUrl": element.exampleUrl,
          "fullScore": Number(element.fullScore),
          "name": element.name,
          "requirement": element.requirement,
          "sort": element.sort
        };
        clauseList.push(clause);
      });
      if (!canSave) return;
      const rebateList = [];
      let i = 0;
      this.form.rebateList.forEach(element => {
        const { minScore, maxScore } = element;
        if (!(minScore + "") || !(maxScore + "")) {
          this.$message.warning("请输入分数条件");
          i++;
          return;
        }
        element.rebateSettingsList.forEach(elementSet => {
          const { minCount, maxCount, couponCount } = elementSet;
          if (!(minCount + "") || !(maxCount + "")) {
            console.log(elementSet.conditionType.value);
            if (elementSet.conditionType.value === 1) {
              this.$message.warning("请输入入库条件");
            } else if (elementSet.conditionType.value === 0) {
              this.$message.warning("请输入下单条件");
            } else {
              this.$message.warning("请选择条件类型");
            }
            i++;
            return;
          }
          const couponNo = elementSet.couponNo.value;
          const exchangeNo = elementSet.exchangeNo.value;
          const integralNo = elementSet.integralNo.value;
          const rebateNo = elementSet.rebateNo.value;
          const rebateItem = {
            "minScore": Number(minScore),
            "maxScore": Number(maxScore),
            "minCount": Number(minCount),
            "maxCount": Number(maxCount),
            "couponCount": Number(couponCount),
            couponNo,
            exchangeNo,
            integralNo,
            rebateNo
          };
          rebateList.push(rebateItem);
        });
      });
      if (i !== 0) {
        return;
      }
      if (this.form.monthArr) {
        this.form.inspectYearStr = this.form.monthArr[0].substring(0, 4);
        this.form.startMonthStr = this.form.monthArr[0].substring(5);
        this.form.endMonthStr = this.form.monthArr[1].substring(5);
      }
      const params = {
        "name": this.form.name,
        "customScore": Number(this.form.customScore),
        "inspectYearStr": this.form.inspectYearStr,
        "startMonthStr": this.form.startMonthStr,
        "endMonthStr": this.form.endMonthStr,
        "clauseList": clauseList,
        "rebateList": rebateList
      };

      if (this.isModify) {
        const data = { ...params, "inspectNo": this.inspectNo ? this.inspectNo : "" };
        modifyInspect(data).then(res => {
          this.$message.success(res.msg);
          this.back();
        }).catch((error) => {
          console.info(error);
          this.$message.error(error.msg);
        });
      } else {
        createInspect(params).then(res => {
          this.$message.success(res.msg);
          this.back();
        }).catch((error) => {
          console.info(error);
          this.$message.error(error.msg);
        });
      }
    },
    /**
     * 入库/下单条件变化
     */
    conditionTypeChange(val, setItem, mark) {
      this.listSearchRbRule4Type(setItem);
      this.listSearchItRule4Type(setItem);
      this.listSearchEpRule4Type(setItem);
      this.listSearchCpTemplateAll(setItem);
      if (mark !== "modify") {
        setItem.rebateNo.value = "";
        setItem.integralNo.value = "";
        setItem.exchangeNo.value = "";
      }
    },

    /**
     * 下拉框出现
     * @param val
     * @param item
     */
    selectVisibleChange(val, item) {
      if (val) {
        if (!(item.conditionType.value === 1 || item.conditionType.value === 0)) {
          this.$message.warning("请先选择条件类型");
        }
      }
    },
    /**
     * 查询返利规则列表
     */
    listSearchRbRule4Type(setItem) {
      // 请求参数 返利节点 0-商品下单，1-商品入库，2-商品出库
      const param = "type=1&status=" + 1;
      listSearchRbRule(param).then(res => {
        if (res.code === 200) {
          setItem.rebateNo.options = res.data.map(element => {
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
    listSearchItRule4Type(setItem) {
      // 请求参数 返利节点 0-商品下单，1-商品入库，2-商品出库
      const param = "type=1&status=" + 1;
      listSearchItRule(param).then(res => {
        if (res.code === 200) {
          setItem.integralNo.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    /**
     * 查询兑换点规则列表
     */
    listSearchEpRule4Type(setItem) {
      // 请求参数 返利节点 0-商品下单，1-商品入库，2-商品出库
      const param = "type=1&status=" + 1;
      listSearchEpRule(param).then(res => {
        if (res.code === 200) {
          setItem.exchangeNo.options = res.data.map(element => {
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
    listSearchCpTemplateAll(setItem) {
      const param = "status=" + 1;
      listSearchCpTemplate(param).then(res => {
        if (res.code === 200) {
          setItem.couponNo.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    }
  }
};