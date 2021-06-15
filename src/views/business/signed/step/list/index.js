import { listScRuleByPage, scRuleCrete, scRuleStatus } from "@/api/business/signed/step";

export default {
  "name": "businessSignedStepList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "status": {
          "value": "",
          "options": [
            { "label": "终止", "value": 0 },
            { "label": "启用", "value": 1 }
          ]
        }
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
      "activeName": "contract",
      "lastActiveName": 0,
      // 新增弹窗
      "dialogAddVisible": false,
      // 新增表单
      "form": {
        "name": "",
        "type": ""
      }
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listScRuleByPage();
  },
  activated() {
    this.listScRuleByPage();
  },
  "methods": {
    /**
     * 搜索
     */
    searchData() {
      this.pagination.current = 1;
      this.listScRuleByPage();
    },
    /**
       * 切换tab
       * @param tab
       * @param event
       */
    handleClick(tab, event) {
      this.toolBar.txnCodes = [];
      if (tab.name === "contract") {
        this.lastActiveName = 0;
      } else {
        this.lastActiveName = 1;
      }
      this.listScRuleByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listScRuleByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listScRuleByPage();
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
     * 页面跳转
     */
    toAdd(activeName, ruleNo) {
      this.$router.push({ "path": "/business/signed/step/add", "query": { "activeName": activeName, "ruleNo": ruleNo } });
    },

    listScRuleByPage() {
      this.tableLoading = true;
      const params = {
        "ruleName": this.toolBar.name,
        "status": this.toolBar.status.value,
        "ruleType": this.lastActiveName,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      const postData = this.$jsonFormat(params);
      listScRuleByPage(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          this.tableLoading = false;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        this.tableLoading = false;
        console.info(error);
      });
    },

    /**
     * 跳转到新增页
     */
    openAddDialog() {
      this.form.name = "";
      this.dialogAddVisible = true;
    },

    addHandleClose() {
      this.dialogAddVisible = false;
      this.listScRuleByPage();
    },

    /**
     * 创建签约规则
     */
    scRuleCrete() {
      const params = {
        "ruleType": this.lastActiveName,
        "ruleName": this.form.name
      };
      scRuleCrete(params).then(res => {
        this.addHandleClose();
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 修改状态
     */
    scRuleStatus(ruleNo, status) {
      const data = {
        "ruleNo": ruleNo,
        "status": status
      };
      scRuleStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listScRuleByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    }
  }
};
