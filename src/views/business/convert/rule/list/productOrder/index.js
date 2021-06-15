import { listPageSearchEpRule, createEpRule, deleteEpRule, updateEpRuleStatus } from "@/api/business/coupon/exchange";

export default {
  "name": "convertRuleListProductOrder",
  "components": {},
  "props": {
    "typeFlag": {
      "type": Number,
      "default": 1
    }
  },
  data() {
    return {
      "toolBar": {
        "ruleName": "",
        "dataRange": "",
        "status": {
          "value": "",
          "options": [
            { "label": "禁用", "value": "0" },
            { "label": "启用", "value": "1" }
          ]
        }
      },
      "form": {
        "ruleName": "",
        "type": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "multipleSelection": [],
      "tableLoading": false,
      "dialogVisible": false,
      "btnLoading": false
    };
  },
  "watch": {
    "typeFlag": {
      "handler": function(val, oldVal) {
        this.listSearchEpStoreByPage();
        this.form.type = val;
      },
      "immediate": true
    }
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
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
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
        .catch(_ => {
        });
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
     * 规则编辑
     */
    editEpRule(ruleNo) {
      this.$store.commit("convertRuleListProductOrder/convertRuleListProductOrderSet", {
        "ruleNo": ruleNo
      });
      this.$router.push({ "path": "/business/convert/rule/add" });
    },

    /**
     * 分页查询返利规则列表
     */
    listSearchEpStoreByPage() {
      this.tableLoading = true;
      // 请求参数
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&type=" + this.typeFlag;
      // 兑换点规则名称
      if (this.toolBar.ruleName) {
        param = param + "&ruleName=" + this.toolBar.ruleName;
      }
      // 创建时间
      if (this.toolBar.dataRange) {
        param = param + "&createdFrom=" + this.toolBar.dataRange[0] + "&createdTo=" + this.toolBar.dataRange[1];
      }
      // 规则名称
      if (this.toolBar.status.value !== "") {
        param = param + "&status=" + this.toolBar.status.value;
      }
      param += "&page.field=created&page.order=desc";

      listPageSearchEpRule(param).then(res => {
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
     * 重置
     */
    reset() {
      this.toolBar.ruleName = "";
      this.toolBar.dataRange = "";
      this.toolBar.status.value = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.listSearchEpStoreByPage();
    },

    /**
     * 新增兑换点规则保存方法
     */
    saveEpRuleForm() {
      const params = {
        "ruleName": this.form.ruleName,
        "type": this.form.type
      };
      createEpRule(params).then(res => {
        this.form.ruleName = "";
        this.$message.success(res.msg);
        this.dialogVisible = false;
        this.listSearchEpStoreByPage();
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
        this.$message.info(error.msg);
      });
    },
    /**
     * 删除兑换点
     * @param ruleNo
     */
    delEpRule(ruleNo) {
      const data = {
        "ruleNo": ruleNo
      };
      deleteEpRule(data).then(res => {
        if (res.code === 200) {
          this.tableLoading = false;
          // 查询
          this.listSearchEpStoreByPage();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    /**
     * 规则状态修改
     * @param status 状态 0：停用 1：启用
     */
    modifyEpRuleStatus(status) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行" + (status === 0) ? "停用" : "启用" + "操作");
        return;
      }
      const row = multipleSelection[0];
      const data = {
        "ruleNo": row.ruleNo,
        "status": status
      };
      console.info(row);
      updateEpRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listSearchEpStoreByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    /**
     * 启用单条
     */
    enableEpRule(ruleNo) {
      const data = {
        "ruleNo": ruleNo,
        "status": 1
      };
      updateEpRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listSearchEpStoreByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    /**
     * 禁用单条
     */
    disableEpRule(ruleNo) {
      const data = {
        "ruleNo": ruleNo,
        "status": 0
      };
      console.info(ruleNo);
      updateEpRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listSearchEpStoreByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    }
  }
};