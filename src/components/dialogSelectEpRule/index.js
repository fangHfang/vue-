import { listPageSearchEpRule } from "@/api/business/coupon/exchange";
export default {
  "name": "dialogSelectEpRule",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "multipleSelection": [],
      "tableLoading": false,
      "toolBar": {
        "ruleName": "",
        "createBy": "",
        "dataRange": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 40
      },
      "btnLoading": false
    };
  },
  "watch": {
    "dialogVisible": {
      "handler"(val) {
        if (val) {
          this.btnLoading = false;
        }
      },
      "immediate": true
    }
  },
  mounted() {
    // 初始化查询方法
    this.listTableData();
  },
  "methods": {
    /**
     * 查询
     */
    search() {
      this.pagination.current = 1;
      this.listTableData();
    },

    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listTableData();
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
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 分页查询数据
     */
    listTableData() {
      let postData = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "ruleName": this.toolBar.ruleName,
        // 1、商品模块-活动模块-积分模块都是0-商品下单   2、安心跑模块 2-商品出库   3、签约-店检  1-商品入库
        "type": 0,
        "status": 1 // 兑换点状态(0-终止，1-启用)
      };
      if (this.toolBar.dataRange) {
        postData.createdFrom = this.toolBar.dataRange[0];
        postData.createdTo = this.toolBar.dataRange[1];
      }
      postData = this.$jsonFormat(postData).substring(1);
      this.tableLoading = true;
      listPageSearchEpRule(postData).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    /**
     * 重置数据
     */
    reset() {
      this.toolBar.dataRange = "";
      this.toolBar.ruleName = "";
      this.pagination.current = 1;
      this.listTableData();
    },
    /**
     * 获取选中数据
     */
    addProduct() {
      if (this.multipleSelection.length === 0) {
        this.btnLoading = false;
        return this.$message.info("请至少选择一条数据");
      }
      this.$emit("selectRules", this.multipleSelection);
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 获取选中数据
     */
    selectData() {
      if (this.multipleSelection.length === 0) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$emit("selectRules", this.multipleSelection);
      this.$emit("update:dialogVisible", false);
    }
  }
};