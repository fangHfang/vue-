// src/views/product/integral/store/list/index
import {
  pageSearchIntegral,
  freezeIntegral,
  unfreezeIntegral
} from "@/api/product/integral/store";
import Adjustment from "../adjustment/index.vue";

export default {
  "name": "productIntegralStoreList",
  "components": {
    Adjustment
  },
  data() {
    return {
      "toolBar": {
        "dealerNo": "",
        "storeNo": ""
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
      "confirmAdjustment": false,
      "formData": {
        "customerNo": "",
        "debitNo": "",
        "refNo": "",
        "availableAmount": "",
        "storeName": "",
        "storeNo": ""
      },
      "btnLoading": false
    };
  },
  mounted() {
    this.listIntegralStoreByPage();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listIntegralStoreByPage();
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
      this.listIntegralStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listIntegralStoreByPage();
    },
    /**
     * 打开详情
     */
    toDetail(item) {
      this.$store.commit("productIntegralStore/productIntegralStoreListSet", {
        "customerNo": item.customerNo,
        "debitNo": item.debitNo,
        "storeName": item.storeName,
        "storeNo": item.storeNo,
        "state": item.state
      });
      this.$router.push({
        "path": "/product/integral/store/detail"
      });
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.confirmAdjustment = false;
          done();
        })
        .catch(_ => {});
    },

    /**
     * 分页查询数据
     */
    listIntegralStoreByPage() {
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.storeNo) {
        params += "&storeNo=" + this.toolBar.storeNo;
      }
      if (this.toolBar.dealerNo) {
        params += "&dealerNo=" + this.toolBar.dealerNo;
      }
      pageSearchIntegral(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.state = (element.status === "有效") ? 1 : 0;
          });
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
     * 重置
     */
    resetIntegralStoreList() {
      this.pagination.current = 1;
      this.toolBar.storeNo = "";
      this.toolBar.dealerNo = "";
      this.$refs.store.cleanStore();
      this.$refs.dealer.cleanDealer();
      this.pagination.current = 1;
      this.listIntegralStoreByPage();
    },

    /**
     * 冻结
     */
    freeze() {
      let item = {};
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        item = this.multipleSelection[0];
      } else {
        this.$message.error("请选中一条门店进行冻结操作！");
        return;
      }
      this.tableLoading = true;
      const params = {
        "customerNo": item.customerNo,
        "debitNo": item.debitNo
      };
      freezeIntegral(params).then(res => {
        this.listIntegralStoreByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
      this.tableLoading = false;
    },

    /**
     * 解冻
     * @param item
     */
    unfreeze(item) {
      this.tableLoading = true;
      const params = {
        "customerNo": item.customerNo,
        "debitNo": item.debitNo
      };
      unfreezeIntegral(params).then(res => {
        this.listIntegralStoreByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
      this.tableLoading = false;
    },

    /**
     * 积分调整-确认按钮方法
     */
    updateIntegral() {
      this.btnLoading = false;
      let item = {};
      if (this.multipleSelection && this.multipleSelection.length === 1) {
        item = this.multipleSelection[0];
      } else {
        this.$message.error("请选中一条门店进行积分调整操作！");
        return;
      }
      this.formData = {
        "customerNo": item.customerNo,
        "debitNo": item.debitNo,
        "availableAmount": item.availableAmount,
        "storeName": item.storeName,
        "storeNo": item.storeNo
      };
      this.dialogVisible = true;
      this.$refs.Adjustment.form = {
        "point": 0,
        "remark": "",
        "radio": "1",
        "refNo": ""
      };
    },

    /**
     * 积分调整回调函数
     */
    confirmBack() {
      this.dialogVisible = false;
      this.confirmAdjustment = false;
      this.btnLoading = false;
      this.listIntegralStoreByPage();
    },

    storeChange(val) {
      this.toolBar.storeNo = val;
    },

    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },

    /**
     * 积分调整请求错误回调函数
     */
    confirmeErorBack() {
      this.btnLoading = false;
    },
    // 确认
    confirm() {
      this.btnLoading = true;
      this.confirmAdjustment = true;
      this.$refs.Adjustment.saveIntegral();
    }
  }
};