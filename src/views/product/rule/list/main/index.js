import { pageSearchItRule, updateItRuleStatus, deleteItRule, createItRule } from "@/api/product/rule";

export default {
  "name": "marketRebateRuleListMain",
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
            { "label": "停用", "value": "0" },
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
        "total": 400
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "watch": {
    "typeFlag": {
      "handler": function(val, oldVal) {
        this.getRemoteTableData();
        this.form.type = val;
        if (val === 0) {
          this.form.typeName = "商品下单";
        } else if (val === 1) {
          this.form.typeName = "商品入库";
        } else if (val === 2) {
          this.form.typeName = "商品出库";
        }
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
    this.getRemoteTableData();
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },
    /**
     * 分页查询返利规则列表
     */
    getRemoteTableData() {
      this.tableLoading = true;
      // 请求参数 返利节点 0-商品下单，1-商品入库，2-商品出库
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&type=" + this.typeFlag;
      // 规则名称
      if (this.toolBar.ruleName) {
        param = param + "&ruleName=" + this.toolBar.ruleName;
      }
      // 创建时间
      if (this.created) {
        param = param + "&createdFrom=" + this.$moment(this.created[0]).format("yyyy-MM-DD HH:mm:ss") + "&createdTo=" + this.$moment(this.created[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      // 规则状态
      if (this.toolBar.spec.value !== "") {
        param = param + "&status=" + this.toolBar.spec.value;
      }
      param += "&page.field=created&page.order=desc";
      pageSearchItRule(param).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
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
        this.$message.error("请选中一条数据进行" + (status === 0) ? "停用" : "启用" + "操作");
        return;
      }
      const row = multipleSelection[0];
      const data = {
        "ruleNo": row.ruleNo,
        "status": status
      };
      console.info(row);
      updateItRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.getRemoteTableData();
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
      updateItRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.getRemoteTableData();
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
      updateItRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.getRemoteTableData();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    /**
     * 规则编辑
     */
    edit(ruleNo) {
      this.$store.commit("marketRebateRuleListMain/marketRebateRuleListMainSet", {
        "ruleNo": ruleNo
      });
      this.$router.push({ "path": "/product/rule/add" });
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
          deleteItRule(data).then(res => {
            if (res.code === 200) {
              this.tableLoading = false;
              // 查询
              this.getRemoteTableData();
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
      this.getRemoteTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
    },

    /**
     * 跳转至新增
     */
    jumpAdd() {
      this.$store.commit("marketRebateRuleListMain/marketRebateRuleListMainSet", {
        "ruleNo": ""
      });
      this.$router.push({ "path": "/product/rules/add" });
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
     * 新增返利规则保存方法
     */
    saveRuleForm() {
      const params = {
        "ruleName": this.form.ruleName,
        "type": this.form.type
      };
      createItRule(params).then(res => {
        if (res.code === 200) {
          this.form.ruleName = "";
          this.$message.success(res.msg);
          this.dialogVisible = false;
          this.getRemoteTableData();
        } else {
          this.$message.info(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.$message.info(error.msg);
      });
    },

    back() {
      this.form.ruleName = "";
      this.dialogVisible = false;
    },

    cleanSearch() {
      this.toolBar.ruleName = "";
      this.toolBar.spec.value = "";
      this.created = "";
      this.pagination.current = 1;
      this.getRemoteTableData();
    }
  }
};