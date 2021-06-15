import { rbRuleDetail, updateRbRule, rbRuleSettingDetail, setRbRuleAmount, deleteRuleDetail } from "@/api/business/rebate/rule";
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
      "exportUrl": MARKET_URL + "/admin/rbRule/export",
      "importUrl": MARKET_URL + "/admin/rbRule/import",
      "templateUrl": "https://maxxisprodsa.blob.core.chinacloudapi.cn/microcloud-mall/upload/template/返利规则导入模板.xlsx"
    };
  },
  "computed": {
    ruleNo() {
      return this.$store.state.businessRebateRuleListMain.ruleNo;
    },
    // 导出入参
    exportGetData() {
      let param = "?pageReq.pageNum=" + this.pagination.current + "&pageReq.pageSize=" + this.pagination.size + "&ruleNo=" + this.ruleNo;
      const activity = this.toolBar.activity;
      // 产品编号
      if (activity.productCode) {
        param = param + "&productCode=" + activity.productCode;
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
      return param;
    }
  },
  mounted() {
    this.initSearchStoreLevelList();
    // 规则编号不为空-查询规则详细信息
    if (this.ruleNo) {
      this.getRuleData();
      this.pageRbStoreRelations();
      this.importUrl = MARKET_URL + "/admin/rbRule/import?rbRuleNo=" + this.ruleNo;
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
      rbRuleDetail(params).then(res => {
        if (res.code === 200) {
          // 返利规则名称
          this.toolBar = { ...this.toolBar, ...res.data };
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
    },
    searchData() {
      this.pagination.current = 1;
      this.pageRbStoreRelations();
    },
    /**
     * 分页查询返利规则列表
     */
    pageRbStoreRelations() {
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
        param = param + "&productCode=" + activity.productCode;
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
      rbRuleSettingDetail(param).then(res => {
        if (res.code === 200) {
          if (res.data.records) {
            res.data.records.forEach(element => {
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
     * 重置条件
     */
    resetSearchCondition4Rules() {
      this.activeIndex = "";
      this.toolBar.activity = {
        "productCode": "",
        "spec": "",
        "brandName": "",
        "size": "",
        "tread": "",
        "storeLevelNo": ""
      };
      this.pageRbStoreRelations();
    },

    /**
     * 保存返利规则
     */
    saveRuleData() {
      if (!this.toolBar.ruleName) {
        this.$message({
          "type": "info",
          "message": "返利规则名称不能为空"
        });
        return;
      }
      const rbStoreRelations = [];
      this.realTableData.forEach(element => {
        const storeLevelNos = element.storeLevelNo.split(",");
        storeLevelNos.forEach(storeLevelNo => {
          rbStoreRelations.push({
            "amount": element.rebateValue,
            // 产品编号 成品代号 产品代号 傻傻分不清楚 57558
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
        "rbStoreRelations": rbStoreRelations
      };
      this.btnLoading = true;
      updateRbRule(data).then(res => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.$router.back();
        } else {
          this.$message.error("修改失败");
        }
        this.btnLoading = false;
      }).catch(res => {
        this.btnLoading = false;
      });
    },

    firstStepSave(payload) {
      const rbStoreRelations = [];
      payload.forEach(element => {
        const storeLevelNos = element.storeLevelNo.split(",");
        storeLevelNos.forEach(storeLevelNo => {
          rbStoreRelations.push({
            "amount": element.rebateValue,
            // 产品编号 成品代号 产品代号 傻傻分不清楚 57558
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
        "rbStoreRelations": rbStoreRelations
      };
      updateRbRule(data).then(res => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.dialogVisible = false;
          this.pageRbStoreRelations();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    /**
     * 打开产品返利数值弹框
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
      this.pageRbStoreRelations();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.pageRbStoreRelations();
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
        if (element.productCode === this.rowData.productCode) {
          element.rebateValue = this.rowData.rebateValue;
        }
      });
      // 处理真实数据
      this.realTableData.forEach(element => {
        if (element.productCode === this.rowData.productCode) {
          element.rebateValue = this.rowData.rebateValue;
        }
      });
      const data = {
        "amount": this.rowData.rebateValue,
        "productNo": this.rowData.productNo,
        "rbRuleNo": this.rowData.rbRuleNo,
        "storeLevelNo": this.rowData.storeLevelNo
      };
      setRbRuleAmount(data).then(res => {
        if (res.code === 200) {
          this.$message.success("设置成功");
        } else {
          this.$message.error("设置失败");
        }
      });
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
        this.firstStepSave(payload);
        // this.tableData = [ ...this.tableData, ...payload ];
        // this.realTableData = this.tableData;
      }
    },
    /**
     * 删除商品数据
     */
    removeProductFromTable() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.error("请选中一条数据!");
        return;
      }
      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        multipleSelection.forEach(element => {
          const params = {
            "productNo": element.productNo,
            "ruleNo": element.rbRuleNo,
            "storeLevelNo": element.storeLevelNo
          };
          deleteRuleDetail(params).then(res => {
            this.$message.success(res.msg);
            this.pageRbStoreRelations();
          }).catch(error => {
            console.info(error);
            this.$message.error(error);
          });
        });
      }).catch(() => {
        this.$message({
          "type": "info",
          "message": "已取消"
        });
      });
      // console.info(multipleSelection);
      // const productCodeArray = multipleSelection.map(element => {
      //   return element.productCode;
      // });
      // const tableData2 = [];
      // this.tableData.forEach(element => {
      //   if (!productCodeArray.includes(element.productCode)) {
      //     tableData2.push(element);
      //   }
      // });
      // this.tableData = tableData2;
      // this.multipleSelection = [];
      // // 处理真实数据
      // const tableData3 = [];
      // this.realTableData.forEach(element => {
      //   if (!productCodeArray.includes(element.productCode)) {
      //     tableData3.push(element);
      //   }
      // });
      // this.realTableData = tableData3;
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
      this.pageRbStoreRelations();
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