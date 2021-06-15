import { pageSearchRbRule, updateRbRuleStatus, deleteRbRule, createRbRule } from "@/api/business/rebate/rule";

export default {
  "name": "businessRebateRuleListMain",
  "components": {
  },
  "props": {
    "typeFlag": {
      "type": Number,
      "default": 1
    }
  },
  data() {
    return {
      "created": "",
      "input": "",
      "toolBar": {
        "ruleName": "",
        "rebateTime": "",
        "spec": {
          "value": "",
          "options": [
            { "label": "终止", "value": "0" },
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
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": [],
      "btnLoading": false
    };
  },
  "watch": {
    "typeFlag": {
      "handler": function(val, oldVal) {
        this.listRbRuleByPage();
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
  activated() {
    this.listRbRuleByPage();
  },
  "methods": {
    searchRbRuleListByPage() {
      this.pagination.current = 1;
      this.listRbRuleByPage();
    },
    /**
     * 分页查询返利规则列表
     */
    listRbRuleByPage() {
      this.tableLoading = true;
      // 请求参数 返利节点 0-商品下单，1-商品入库，2-商品出库
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&type=" + this.typeFlag;
      // 规则名称
      if (this.toolBar.ruleName) {
        param = param + "&ruleName=" + this.toolBar.ruleName;
      }
      // 创建时间
      if (this.created) {
        param = param + "&createdFrom=" + this.created[0] + "&createdTo=" + this.created[1];
      }
      // 规则状态
      if (this.toolBar.spec.value !== "") {
        param = param + "&status=" + this.toolBar.spec.value;
      }
      pageSearchRbRule(param).then(res => {
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
     * 获取勾选的角色行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 规则状态修改
     * @param status 状态 0：停用 1：启用
     */
    modifyRuleStatus(status) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行操作");
        return;
      }
      const row = multipleSelection[0];
      const data = {
        "ruleNo": row.ruleNo,
        "status": status
      };
      console.info(row);
      updateRbRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listRbRuleByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    /**
     * 启用单条
     */
    enableRule(ruleNo) {
      const data = {
        "ruleNo": ruleNo,
        "status": 1
      };
      updateRbRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listRbRuleByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    /**
     * 禁用单条
     */
    disableRule(ruleNo) {
      const data = {
        "ruleNo": ruleNo,
        "status": 0
      };
      console.info(ruleNo);
      updateRbRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listRbRuleByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    /**
     * 规则编辑
     */
    edit(ruleNo) {
      this.$store.commit("businessRebateRuleListMain/businessRebateRuleListMainSet", {
        "ruleNo": ruleNo
      });
      this.$router.push({ "path": "/business/rebate/rule/edit" });
    },

    /**
     * 规则删除
     */
    del(ruleNo) {
      this.$confirm("是否确认删除？")
        .then(_ => {
          const data = {
            "ruleNo": ruleNo
          };
          deleteRbRule(data).then(res => {
            if (res.code === 200) {
              this.tableLoading = false;
              // 查询
              this.listRbRuleByPage();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(_ => { });
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listRbRuleByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRbRuleByPage();
    },

    /**
     * 跳转至新增
     */
    jumpAdd() {
      this.$store.commit("businessRebateRuleListMain/businessRebateRuleListMainSet", {
        "ruleNo": ""
      });
      this.$router.push({ "path": "/business/rebate/rule/add" });
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          setTimeout(() => {
            this.form.ruleName = "";
          }, 100);
        })
        .catch(_ => {});
    },
    /**
     * 取消新增，关闭弹窗
     */
    cancel() {
      this.dialogVisible = false;
      setTimeout(() => {
        this.form.ruleName = "";
      }, 100);
    },

    /**
     * 新增返利规则保存方法
     */
    saveRuleForm() {
      const params = {
        "ruleName": this.form.ruleName,
        "type": this.form.type
      };
      createRbRule(params).then(res => {
        this.$message.info(res.msg);
        this.dialogVisible = false;
        this.btnLoading = false;
        this.listRbRuleByPage();
        setTimeout(() => {
          this.form.ruleName = "";
        }, 100);
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
        this.$message.info(error.msg);
        setTimeout(() => {
          this.form.ruleName = "";
        }, 100);
      });
    }
  }
};