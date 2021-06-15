import { listPageSearchSiRule, updateSiRuleStatus } from "@/api/business/sign";
export default {
  "name": "businessSignRuleList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "ruleName": "",
        "status": {
          "value": "",
          "options": [
            { "label": "终止", "value": 0 },
            { "label": "启用", "value": 1 }
          ]
        }
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.getRemoteTableData();
  },
  "methods": {
    /**
     * 分页查询列表
     */
    getRemoteTableData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "ruleName": this.toolBar.ruleName
      };
      if (this.toolBar.status.value || this.toolBar.status.value === 0) {
        params.status = this.toolBar.status.value;
      }
      this.tableLoading = true;
      listPageSearchSiRule(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          const list = (res.data && res.data.records) || [];
          this.tableData = list;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.ruleName = "";
      this.toolBar.status.value = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.getRemoteTableData();
    },
    /**
     * 搜索按钮
     */
    searchTableData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
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
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 批量改变状态值
     * @param status
     */
    changeAllStatus(status) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      const len = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = {
          "ruleNo": element.ruleNo,
          "status": status
        };
        updateSiRuleStatus(params).then(res => {
          if (len === index) {
            if (res.code === 200) {
              this.$message.success("修改状态成功");
              this.getRemoteTableData();
            } else {
              this.$message.error("修改状态失败");
            }
          }
        }).catch(error => {
          this.$message.error(error);
        });
      });
    },
    /**
     * 改变状态值或者是否置顶
     * @param row
     * @param mark
     */
    changeStatus(row, type) {
      const params = {
        "ruleNo": row.ruleNo,
        "status": type
      };
      updateSiRuleStatus(params).then(res => {
        if (res.code === 200) {
          this.$message.success("修改状态成功");
          this.getRemoteTableData();
        } else {
          this.$message.error("修改状态失败");
        }
      }).catch(error => {
        this.$message.error(error);
      });
    },
    /**
     * 跳转到新增签到规则
     */
    toAdd() {
      this.$router.push({ "path": "/business/sign/rule/add" });
    },
    /**
     * 跳转到签到规则详情
     */
    toDetail(row) {
      this.$router.push({ "path": "/business/sign/rule/detail/" + row.ruleNo });
    },
    /**
     * 打开配置门店权限
     */
    toStore(row) {
      this.$router.push({ "path": "/business/sign/rule/store/" + row.ruleNo });
    }
  }
};
