import { itRuleDetail, updateItRule, itRuleSettingDetail, setItRuleAmount, deleteRuleDetail } from "@/api/product/rule";
import { searchStoreLevelList } from "@/api/downstream/store/info";
import { MARKET_URL } from "@/utils/system-constant";
export default {
  "name": "businessRebateRuleAdd",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "ruleName": "",
        "remark": "",
        "type": 0,
        "tenantNo": "",
        "activity": {
          "productCode": "",
          "spec": "",
          "brandName": "",
          "size": "",
          "tread": "",
          "storeLevelNo": ""
        }
      },
      "natureList": [],
      "activeIndex": "",
      "tableData": [],
      "realTableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false,
      "dialogImageUrl": "",
      "disabled": false,
      "tableLoading": false,
      // 列表行数据
      "rowData": {},
      "showRebateNumberDialog": false,
      "multipleSelection": [],
      "btnLoading": false,
      "exportUrl": MARKET_URL + "/admin/itRule/export",
      "importUrl": MARKET_URL + "/admin/itRule/import",
      "templateUrl": "https://maxxisprodsa.blob.core.chinacloudapi.cn/microcloud-mall/upload/template/积分规则导入模板.xlsx"
    };
  },
  "computed": {
    ruleNo() {
      return this.$store.state.marketRebateRuleListMain.ruleNo;
    },
    // 导出入参
    exportGetData() {
      const param = "?ruleNo=" + this.ruleNo;
      // const activity = this.toolBar.activity;
      // // 产品编号
      // if (activity.productCode) {
      //   param = param + "&productCode=" + activity.productCode;
      // }
      // // 产品规格
      // if (activity.spec) {
      //   param = param + "&spec=" + encodeURIComponent(activity.spec);
      // }
      // // 产品品牌
      // if (activity.brandName) {
      //   param = param + "&brandName=" + activity.brandName;
      // }
      // // 产品尺寸
      // if (activity.size) {
      //   param = param + "&size=" + activity.size;
      // }
      // // 产品胎纹
      // if (activity.tread) {
      //   param = param + "&tread=" + activity.tread;
      // }
      // // 门店等级编号
      // if (typeof this.activeIndex === "number" && this.natureList.length > 0) {
      //   param = param + "&storeLevelNo=" + this.natureList[this.activeIndex].value.replace("+", "%2B");
      // }
      return param;
    }
  },
  mounted() {
    this.initSearchStoreLevelList();
    // 规则编号不为空-查询规则详细信息
    if (this.ruleNo) {
      this.getRuleData();
      this.importUrl = MARKET_URL + "/admin/itRule/import?itRuleNo=" + this.ruleNo;
      // this.pageItStoreRelations();
    }
  },
  "methods": {

    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 查询规则详细信息
     */
    getRuleData() {
      const params = "ruleNo=" + this.ruleNo;
      itRuleDetail(params).then(res => {
        if (res.code === 200) {
          // 积分规则名称
          this.toolBar = { ...this.toolBar, ...res.data };
          const list = res.data.itStoreRelations.map(element => {
            return {
              ...element,
              "rebateValue": element.amount
            };
          });
          this.tableData = list;
          this.realTableData = list;
          this.pagination.total = list.length;
          this.pagination.size = list.length;
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
    },

    /**
     * 分页查询积分规则列表
     */
    pageItStoreRelations() {
      if (!this.ruleNo) {
        this.$message.info("新增时无法查询");
        return;
      }
      this.tableLoading = true;
      // 请求参数
      let param = "pageReq.pageNum=" + this.pagination.current + "&pageReq.pageSize=" + this.pagination.size + "&ruleNo=" + this.ruleNo;
      const activity = this.toolBar.activity;
      // 产品编号
      if (activity.productCode) {
        param = param + "&productNo=" + activity.productCode;
      }
      // 产品规格
      if (activity.spec) {
        param = param + "&spec=" + encodeURIComponent(activity.spec);
      }
      // 产品品牌
      if (activity.brandName) {
        param = param + "&brandName=" + activity.brandName;
      }
      // 产品尺寸
      if (activity.size) {
        param = param + "&size=" + activity.size;
      }
      // 产品胎纹
      if (activity.tread) {
        param = param + "&tread=" + activity.tread;
      }
      // 门店等级编号
      if (typeof this.activeIndex === "number" && this.natureList.length > 0) {
        param = param + "&storeLevelNo=" + this.natureList[this.activeIndex].value.replace("+", "%2B");
      }
      itRuleSettingDetail(param).then(res => {
        if (res.code === 200) {
          if (res.data.records) {
            res.data.records.forEach(element => {
              element.productCode = element.productNo;
              element.rebateValue = element.amount;
            });
            this.tableData = res.data.records;
            this.realTableData = res.data.records;
          }
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 搜索按钮
     */
    searchItStoreRelations() {
      this.pagination.current = 1;
      this.pageItStoreRelations();
    },
    /**
     * 重置条件
     */
    resetSearchCondition4Rules() {
      this.pagination.current = 1;
      this.activeIndex = "";
      this.toolBar.activity = {
        "productCode": "",
        "spec": "",
        "brandName": "",
        "size": "",
        "tread": "",
        "storeLevelNo": ""
      };
      this.activitySearch();
    },

    /**
     * 保存积分规则
     */
    saveRuleData() {
      if (!this.toolBar.ruleName) {
        this.$message({
          "type": "warning",
          "message": "积分规则名称不能为空"
        });
        return;
      }
      const itStoreRelations = [];
      this.realTableData.forEach(element => {
        const storeLevelNos = element.storeLevelNo.split(",");
        storeLevelNos.forEach(storeLevelNo => {
          itStoreRelations.push({
            "amount": element.rebateValue,
            "productNo": element.productNo,
            "storeLevelNo": storeLevelNo,
            "brandCode": element.brandCode,
            "brandName": element.brandName,
            "productCode": element.productCode,
            "size": element.size,
            "spec": element.spec,
            "tread": element.tread
          });
        });
      });
      const data = {
        "ruleName": this.toolBar.ruleName,
        "remark": this.toolBar.remark,
        "ruleNo": this.ruleNo,
        "type": this.toolBar.type,
        "itStoreRelations": itStoreRelations
      };
      this.btnLoading = true;
      updateItRule(data).then(res => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.$router.back();
        } else {
          this.$message.error("修改失败");
        }
        this.btnLoading = false;
      });
    },

    /**
     * 打开产品积分数值弹框
     * @param row
     */
    openRebateNumberDialog(row) {
      this.rowData = JSON.parse(JSON.stringify(row));
      this.showRebateNumberDialog = true;
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.pageItStoreRelations();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.pageItStoreRelations();
    },

    /**
     * 关闭弹窗
     */
    handleClose() {
      this.showRebateNumberDialog = false;
    },
    /**
     * 弹窗-保存并关闭
     */
    saveRowData() {
      this.showRebateNumberDialog = false;
      // 处理显示数据
      this.tableData.forEach(element => {
        if (element.productNo === this.rowData.productNo) {
          element.rebateValue = this.rowData.rebateValue;
        }
      });
      // 处理真实数据
      const data = {
        "amount": Number(this.rowData.rebateValue),
        "itRuleNo": this.rowData.itRuleNo,
        "productNo": this.rowData.productNo,
        "storeLevelNo": this.rowData.storeLevelNo
      };
      setItRuleAmount(data).then(res => {
        if (res.code === 200) {
          this.$message({
            "type": "success",
            "message": "保存成功!"
          });
          this.back();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
      this.realTableData.forEach(element => {
        if (element.productNo === this.rowData.productNo) {
          element.rebateValue = this.rowData.rebateValue;
        }
      });
      // this.$forceUpdate();
    },
    /**
     * 返回列表
     */
    backList() {
      this.$router.back();
    },
    change() {
      this.$forceUpdate();
    },
    /**
     * 增加商品列表
     * @param payload
     */
    addProductCode2Table(payload) {
      if (payload && payload.length > 0) {
        // this.firstStepSave(payload);
        // this.tableData = [ ...this.tableData, ...payload ];
        this.realTableData = [ ...this.realTableData, ...payload ];
        this.natureCheck(this.activeIndex);
      }
    },
    firstStepSave(payload) {
      const itStoreRelations = [];
      payload.forEach(element => {
        const storeLevelNos = element.storeLevelNo.split(",");
        storeLevelNos.forEach(storeLevelNo => {
          itStoreRelations.push({
            "amount": element.rebateValue,
            "productNo": element.productNo,
            "storeLevelNo": storeLevelNo,
            "brandCode": element.brandCode,
            "brandName": element.brandName,
            "productCode": element.productCode,
            "size": element.size,
            "spec": element.spec,
            "tread": element.tread
          });
        });
      });
      console.info(itStoreRelations);
      const data = {
        "ruleName": this.toolBar.ruleName,
        "remark": this.toolBar.remark,
        "ruleNo": this.ruleNo,
        "type": this.toolBar.type,
        "itStoreRelations": itStoreRelations
      };
      updateItRule(data).then(res => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.dialogVisible = false;
          const params = "ruleNo=" + this.ruleNo;
          itRuleDetail(params).then(res => {
            if (res.code === 200) {
              // 积分规则名称
              res.data.itStoreRelations.forEach(element => {
                element.rebateValue = element.amount;
              });
              this.tableData = res.data.itStoreRelations;
              this.realTableData = res.data.itStoreRelations;
              this.pagination.total = res.data.itStoreRelations.length;
              this.pagination.size = 10;
            }
          }).catch(() => {});
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    /**
     * 删除商品数据
     */
    removeProductFromTable() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选数据?", "删除", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        console.log(this.activeIndex);
        const params = {
          "productNo": this.multipleSelection.map(x => x.productNo),
          "ruleNo": this.ruleNo
        };
        if (this.activeIndex !== "") {
          params.storeLevelNo = this.natureList[this.activeIndex].value;
        }
        deleteRuleDetail(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            const productCodeArray = this.multipleSelection.map(element => {
              return element.productNo;
            });
            // 处理真实数据
            const tableData3 = [];
            this.realTableData.forEach(element => {
              if (!productCodeArray.includes(element.productNo)) {
                tableData3.push(element);
              }
            });
            this.realTableData = tableData3;
            this.activitySearch();
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(() => {});
    },

    /**
     * 门店性质选中
     */
    natureCheck(index) {
      this.activeIndex = index;
      this.activitySearch();
    },
    /**
     * 查询已存在的数据
     */
    activitySearch() {
      this.tableData = this.filterList(this.realTableData);
    },
    /**
     * 过滤
     */
    filterList(list) {
      let temp = [ ...list ];
      const activity = this.toolBar.activity;
      if (activity.productCode) {
        temp = list.filter(x => ~(x.productCode || "").indexOf(activity.productCode));
      }
      if (activity.spec) {
        temp = temp.filter(x => ~(x.spec || "").indexOf(activity.spec));
      }
      if (activity.brandName) {
        temp = temp.filter(x => ~(x.brandName || "").indexOf(activity.brandName));
      }
      if (activity.size) {
        temp = temp.filter(x => ~(x.size || "").indexOf(activity.size));
      }
      if (activity.tread) {
        temp = temp.filter(x => ~(x.tread || "").indexOf(activity.tread));
      }
      if (this.activeIndex || this.activeIndex === 0) {
        const value = this.natureList[this.activeIndex].value;
        temp = temp.filter(x => x.storeLevelNo === value);
      }
      return temp;
    },
    /**
     * 重置查询条件和下方表格
     */
    activityReset() {
      this.tableData = this.realTableData;
      this.activeIndex = "";
      this.toolBar.activity = {
        "productCode": "",
        "spec": "",
        "brandName": "",
        "size": "",
        "tread": "",
        "storeLevelNo": ""
      };
    },

    /**
     * 查询门店等级
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.natureList = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.form.levels.options = [];
      });
    }
  }
};
