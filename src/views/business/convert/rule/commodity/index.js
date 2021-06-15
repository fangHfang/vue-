import {
  rbRuleDetail,
  createEpStoreRelation, deleteEpStoreRelation, listEpStoreRelationByPage
} from "@/api/business/rebate/rule";
import { updateEpRuleStatus } from "@/api/business/coupon/exchange";
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
      "activeIndex": 0,
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
      // 产品编号对应成品代号弹窗 所用到的查询条件
      "productNo": "",
      "dialogProductNoVisible": false,
      "btnLoading": false,
      "exportUrl": MARKET_URL + "/admin/epStoreRelation/export",
      "importUrl": MARKET_URL + "/admin/epRule/import",
      "templateUrl": "https://maxxisprodsa.blob.core.chinacloudapi.cn/microcloud-mall/upload/template/兑换点规则导入模板.xlsx"
    };
  },
  "computed": {
    ruleNo() {
      return this.$store.state.convertRuleListProductOrder.ruleNo;
    },
    // 导出入参
    exportGetData() {
      let param = "?page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&ruleNo=" + this.ruleNo;
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
        param = param + "&productSize=" + activity.size;
      }
      // 产品胎纹
      if (activity.tread) {
        param = param + "&tread=" + activity.tread;
      }
      // 门店等级编号;
      if (typeof this.activeIndex === "number" && this.natureList.length > 0) {
        param = param + "&storeLevelNo=" + this.natureList[this.activeIndex].value.replace("+", "%2B");;
      }
      return param;
    }
  },
  mounted() {
    this.initSearchStoreLevelList();
    // 规则编号不为空-查询规则详细信息
    if (this.ruleNo) {
      this.getRuleData();
      this.importUrl = MARKET_URL + "/admin/epRule/import?epRuleNo=" + this.ruleNo;
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
        param = param + "&productSize=" + activity.size;
      }
      // 产品胎纹
      if (activity.tread) {
        param = param + "&tread=" + activity.tread;
      }
      // 门店等级编号
      if (typeof this.activeIndex === "number" && this.natureList.length > 0) {
        param = param + "&storeLevelNo=" + this.natureList[this.activeIndex].value.replace("+", "%2B");;
      }
      listEpStoreRelationByPage(param).then(res => {
        if (res.code === 200) {
          if (res.data.records) {
            res.data.records.forEach(element => {
              element.rebateValue = element.amount;
            });
            this.tableData = res.data.records;
          }
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
        this.tableLoading = false;
      });
    },
    /**
     * 重置条件
     */
    resetSearchCondition4Rules() {
      this.activeIndex = 0;
      this.toolBar.activity = {
        "productCode": "",
        "spec": "",
        "brandName": "",
        "size": "",
        "tread": "",
        "storeLevelNo": ""
      };
      this.pagination.current = 1;
      this.pageRbStoreRelations();
    },

    /**
     * 保存上架
     */
    saveRuleData() {
      this.btnLoading = true;
      const data = {
        "ruleNo": this.ruleNo,
        // 0-启用，1-禁用
        "status": 0
      };
      updateEpRuleStatus(data).then(res => {
        if (res.code === 200) {
          this.$message.success("上架成功");
          this.$router.push({ "path": "/business/convert/rule/list" });
        } else {
          this.$message.error("上架失败");
          this.btnLoading = false;
        }
      }).catch(res => {
        this.btnLoading = false;
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
     * 打开产品编号对应成品代号弹窗
     */
    openProductCodeByNoDialog(productNo) {
      this.productNo = productNo;
      this.dialogProductNoVisible = true;
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
      const { amount, productNo, storeLevelNo, productCode } = this.rowData;
      const payload = {
        "ruleNo": this.ruleNo,
        "storeRelationList": [ {
          amount,
          productNo,
          storeLevelNo,
          productCode
        } ]
      };
      createEpStoreRelation(payload).then((res) => {
        this.$message.success("修改成功");
        // 刷新列表
        this.pageRbStoreRelations();
      }).catch((err) => {
        console.log("创建兑换点规则明细错误", err);
      });
    },
    /**
     * 返回列表
     */
    backList() {
      this.$router.back();
    },

    /**
     * 切换数据
     */
    change(val) {
      this.rowData.amount = val;
      this.$forceUpdate();
    },
    /**
     * 增加商品列表
     * @param selectList
     */
    addProductCode2Table(selectList) {
      const storeRelationList = selectList.map((item) => {
        return {
          "amount": item.rebateValue,
          "productNo": item.productNo,
          "storeLevelNo": item.storeLevelNo,
          "brandCode": item.brandCode,
          "productCode": item.productCode,
          "productSize": item.size,
          "spec": item.spec,
          "tread": item.tread,
          "brandName": item.brandName
        };
      });
      const payload = {
        "ruleNo": this.ruleNo,
        storeRelationList
      };
      createEpStoreRelation(payload).then((res) => {
        this.$message.success("创建成功");
        this.pagination.current = 1;
        this.pageRbStoreRelations();
      }).catch((err) => {
        this.$message.error(err);
        console.log("创建兑换点规则明细错误", err);
      });
    },
    /**
     * 删除商品数据
     */
    removeProductFromTable() {
      if (this.multipleSelection.length === 0) {
        this.$message.error("请选择要删除的数据!");
        return;
      }
      const multipleSelection = this.multipleSelection;
      const payload = {
        "ruleNo": this.ruleNo,
        "idList": multipleSelection.map((item) => { return item.id; })
      };
      deleteEpStoreRelation(payload).then(() => {
        this.$message.success("删除成功");
        this.pagination.current = 1;
        this.pageRbStoreRelations();
      }).catch((err) => {
        this.$message.error(err);
        console.log(err);
      });
    },

    /**
     * 门店性质选中
     */
    natureCheck(index) {
      this.activeIndex = index;
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.pageRbStoreRelations();
    },
    /**
     * 重置查询条件和下方表格
     */
    activityReset() {
      this.activeIndex = 0;
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
          if (this.ruleNo) {
            this.pageRbStoreRelations();
          }
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        this.$message.error(error);
        console.info(error);
        this.form.levels.options = [];
      });
    },
    /**
     * 上一步
     */
    prev() {
      this.$router.push({ "path": "/business/convert/rule/add" });
    }
  }
};