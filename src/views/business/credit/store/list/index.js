import { getWhiteBarPageStore, frozen, enable } from "@/api/business/store/credit";

import dialogCredit from "../totalCredit/index.vue";
export default {
  "name": "storeList",
  "components": {
    dialogCredit
  },
  data() {
    return {
      "toolBar": {
        "dealerName": "",
        "name": "",
        "customerNo": "",
        "regionNo": "",
        "status": {
          "value": "",
          "options": [
            { "label": "有效", "value": "0" },
            { "label": "冻结", "value": "1" }
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
      "multipleSelection": [],
      "changeId": "",
      "isAdjustment": false,
      "row": {}

    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.selectSearch();
  },
  "methods": {
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
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
      this.selectSearch();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.selectSearch();
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
    * 打开变更总授信
    */
    toCredit() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.info("请选择要变更总授信的门店");
        return;
      }
      this.row = multipleSelection[0];
      this.isAdjustment = false;
      this.dialogVisible = true;
    },

    /**
     * 打开已用额度
     */
    toquota() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.info("请选择要打开的已用额度的门店");
        return;
      }
      this.row = multipleSelection[0];
      this.isAdjustment = true;
      this.dialogVisible = true;
    },
    searchData() {
      this.pagination.current = 1;
      this.selectSearch();
    },
    selectSearch() {
      const params = {
        "customerNo": this.toolBar.customerNo,
        "status": this.toolBar.status.value,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      this.getWhiteBarPageStore(params);
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    getWhiteBarPageStore(params) {
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      getWhiteBarPageStore(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.tableLoading = false;
        console.info(error);
      });
    },

    /**
     * 冻结
     * @param {贷记账户编号} creditNo
     * @param {客户编号} customerNo
     */
    frozen() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.info("请选择要冻结的门店");
        return;
      }
      const params = {
        "creditNo": multipleSelection[0].creditNo,
        "customerNo": multipleSelection[0].customerNo
      };
      frozen(params).then(res => {
        if (res.code === 200) {
          this.selectSearch();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
      * 解冻
      * @param {贷记账户编号} creditNo
      * @param {客户编号} customerNo
       */
    enable() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.info("请选择要解冻的门店");
        return;
      }
      const params = {
        "creditNo": multipleSelection[0].creditNo,
        "customerNo": multipleSelection[0].customerNo
      };
      enable(params).then(res => {
        if (res.code === 200) {
          this.selectSearch();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 打开变更记录
     */
    toRecord(creditNo, customerNo, name) {
      this.$router.push({ "path": "/business/credit/store/list/record", "query": { "creditNo": creditNo, "customerNo": customerNo, "name": name } });
    },

    cleanSearch() {
      this.toolBar.customerNo = "";
      this.toolBar.status.value = "";
      this.pagination.current = 1;
      this.$refs.store && this.$refs.store.cleanStore();
      this.selectSearch();
    },
    storeChange(val) {
      this.toolBar.customerNo = val;
    }
  }
};