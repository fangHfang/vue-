// src/views/system/other/stock/list/index
import { pageListStockDisplay, transferStockDisplayStatus } from "@/api/system/other/stock";

export default {
  "name": "SystemOtherStockList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "ruleName": "",
        "status": "",
        "statusOptions": [
          { "label": "下架", "value": "0" },
          { "label": "上架", "value": "1" }
        ]
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.searchStockDisplayByPage();
  },
  "methods": {
    /**
     * 搜索按钮方法
     */
    searchStockDisplayListByPage() {
      this.pagination.current = 1;
      this.searchStockDisplayByPage();
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
     * 分页查询
     */
    searchStockDisplayByPage() {
      this.tableLoading = true;
      let params = "pageNum=" + this.pagination.current + "&pageSize=" + this.pagination.size;
      if (this.toolBar.ruleName) {
        params += "&ruleName=" + this.toolBar.ruleName;
      }
      if (this.toolBar.status !== "") {
        params += "&status=" + this.toolBar.status;
      }
      pageListStockDisplay(params).then(res => {
        if (res.code === 200) {
          // res.data.records.forEach(element => {
          //   element.created = that.formatTime(element.created);
          // });
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
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.searchStockDisplayByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.searchStockDisplayByPage();
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
        .catch(_ => { });
    },

    /**
     * 新增
     */
    dialogVisible() {
      this.$store.commit("systemOtherStock/systemOtherStockListSet", {
        "ruleNo": ""
      });
      this.$router.push({ "path": "/system/other/stock/add" });
    },

    /**
     * 跳转编辑页面
     * @param ruleNo
     */
    toEdit(ruleNo) {
      this.$store.commit("systemOtherStock/systemOtherStockListSet", {
        "ruleNo": ruleNo
      });
      this.$router.push({ "path": "/system/other/stock/add" });
    },

    /**
     * 设置商品跳转
     */
    setGoods(ruleNo) {
      this.$store.commit("systemOtherStock/systemOtherStockListSet", {
        "ruleNo": ruleNo
      });
      this.$router.push({ "path": "/system/other/stock/product/setup" });
    },

    /**
     * 批量上架
     */
    batchUpShelfStockDisplay() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.info("请至少选中一条数据进行上架操作");
        return;
      }
      const length = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = "ruleNo=" + element.ruleNo + "&status=1";
        transferStockDisplayStatus(params).then(res => {
          if (length === index) {
            this.$message.success("上架成功");
            this.searchStockDisplayByPage();
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      });
    },

    /**
     * 批量下架
     */
    batchDownShelfStockDisplay() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.info("请至少选中一条数据进行下架操作");
        return;
      }
      const length = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = "ruleNo=" + element.ruleNo + "&status=0";
        transferStockDisplayStatus(params).then(res => {
          if (length === index) {
            this.$message.success("下架成功");
            this.searchStockDisplayByPage();
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      });
    },

    /**
     * 上架
     */
    upShelfStockDisplay(ruleNo) {
      const params = "ruleNo=" + ruleNo + "&status=1";
      transferStockDisplayStatus(params).then(res => {
        this.searchStockDisplayByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 下架
     */
    downShelfStockDisplay(ruleNo) {
      const params = "ruleNo=" + ruleNo + "&status=0";
      transferStockDisplayStatus(params).then(res => {
        this.searchStockDisplayByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    }
  }
};