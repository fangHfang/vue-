import { listSearchEpRule, listPageSearchEpStore, epStoreChangeStatus, epStoreChangeAmount } from "@/api/business/coupon/exchange";
import { MARKET_URL } from "@/utils/system-constant";
export default {
  "name": "convertStoreRuleList",
  "components": {},
  data() {
    return {
      "toolBar": {
        "storeName": "",
        "storeLabelName": "",
        "dealerName": "",
        "dealerLabelName": "",
        "storeNo": "",
        "dealerNo": "",
        "epRule": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": [],
      "epForm": {
        "id": 0,
        "amount": 0,
        "remark": "",
        "storeName": "",
        "storeNo": "",
        "storeAmount": "",
        "type": "1"
      },
      "epRules": {
        "amount": [
          { "required": true, "message": "请输入兑换点", "trigger": "blur" }
        ]
      },
      "btnLoading": false,
      "exportUrl": MARKET_URL + "/admin/epRule/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      let param = "?page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      // 门店名称
      if (this.toolBar.storeNo) {
        param = param + "&storeNo=" + this.toolBar.storeNo;
      }
      // 经销商名称
      if (this.toolBar.dealerNo) {
        param = param + "&dealerNo=" + this.toolBar.dealerNo;
      }
      // 规则名称
      if (this.toolBar.epRule.value !== "") {
        param = param + "&ruleNo=" + this.toolBar.epRule.value;
      }
      return param;
    }
  },
  mounted() {
    this.listSearchEpRule4Condition();
    this.listSearchEpStoreByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listSearchEpStoreByPage();
    },
    /**
     * 获取勾选的角色行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listSearchEpStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listSearchEpStoreByPage();
    },

    /**
     * 跳转到详情页
     */
    toDetail(row) {
      this.$store.commit("convertStoreRuleList/convertStoreRuleListSet", {
        "id": row.id,
        "customerNo": row.customerNo,
        "epRuleNo": row.epRuleNo,
        "currentRow": row
      });
      this.$router.push({ "path": "/business/convert/store/detail" });
    },

    /**
     * 查询兑换点规则列表
     */
    listSearchEpRule4Condition() {
      // 请求参数
      const param = "type=-1&status=1";
      listSearchEpRule(param).then(res => {
        if (res.code === 200) {
          this.toolBar.epRule.options = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 分页查询返利规则列表
     */
    listSearchEpStoreByPage() {
      this.tableLoading = true;
      // 请求参数
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      // 门店名称
      if (this.toolBar.storeNo) {
        param = param + "&storeNo=" + this.toolBar.storeNo;
      }
      // 经销商名称
      if (this.toolBar.dealerNo) {
        param = param + "&dealerNo=" + this.toolBar.dealerNo;
      }
      // 规则名称
      if (this.toolBar.epRule.value !== "") {
        param = param + "&ruleNo=" + this.toolBar.epRule.value;
      }
      listPageSearchEpStore(param).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error("查询失败");
        }
        this.tableLoading = false;
      });
    },

    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.storeName = "";
      this.toolBar.storeLabelName = "";
      this.toolBar.dealerName = "";
      this.toolBar.dealerLabelName = "";
      this.toolBar.epRule.value = "";
      this.pagination.current = 1;
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.listSearchEpStoreByPage();
    },

    /**
     * 冻结
     */
    freeze4Batch(id) {
      const params = {
        "id": id,
        "status": 0
      };
      epStoreChangeStatus(params).then(res => {
        this.listSearchEpStoreByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 解冻
     */
    unfreeze(id) {
      const data = {
        "id": id,
        "status": 1
      };
      epStoreChangeStatus(data).then(res => {
        if (res.code === 200) {
          this.listSearchEpStoreByPage();
        } else {
          this.$message.error("解冻失败");
        }
      });
    },

    /**
     * 调整兑换点
     */
    adjustExchangePoint() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行兑换点调整!");
        return;
      }
      const { id, storeNo, storeName, amount } = multipleSelection[0];
      this.epForm = {
        "id": id,
        "amount": 0,
        "remark": "",
        "storeName": storeNo,
        "storeNo": storeName,
        "storeAmount": amount,
        "type": "1"
      };
      this.btnLoading = false;
      this.dialogVisible = true;
    },

    /**
     * 提交表单
     */
    submitForm() {
      this.btnLoading = true;
      this.$refs.epForm.validate((valid) => {
        if (valid) {
          let amount = Number(this.epForm.amount);
          if (this.epForm.type === 0 || this.epForm.type === "0") {
            amount = 0 - amount;
          }
          const data = {
            "id": this.epForm.id,
            "amount": amount,
            "remark": this.epForm.remark
          };
          epStoreChangeAmount(data).then(res => {
            if (res.code === 200) {
              this.listSearchEpStoreByPage();
              this.resetForm();
              this.dialogVisible = false;
            } else {
              this.btnLoading = false;
              this.$message.error("调整兑换点失败");
            }
          }).catch(res => {
            this.btnLoading = false;
          });
        } else {
          console.log("error submit!!");
          this.btnLoading = false;
          return false;
        }
      });
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.epForm.resetFields();
    },

    /**
     * 关闭弹窗
     */
    closeEpStoreDialog() {
      this.resetForm();
      this.dialogVisible = false;
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.resetForm();
          done();
        })
        .catch(_ => {});
    },
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },
    storeChange(val) {
      this.toolBar.storeNo = val;
    }

  }
};