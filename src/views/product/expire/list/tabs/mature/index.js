import { integralPageInvalid } from "@/api/product/integral/store";
import dialogNotice from "@/components/dialogNotice/index.vue";
export default {
  "name": "ProductExpireAdjust",
  "components": {
    dialogNotice
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        "dealerNo": "",
        "dealerName": "",
        "storeNo": "",
        "storeName": ""
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
      "multipleSelection": []
    };
  },
  mounted() {
    this.listIntegralCleanByPage();
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
      this.listIntegralCleanByPage();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listIntegralCleanByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listIntegralCleanByPage();
    },

    /**
     * 分页查询积分清零记录分页列表
     */
    listIntegralCleanByPage() {
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.dealerCustomerNo) {
        params += "&dealerNo=" + this.toolBar.dealerCustomerNo;
      }
      if (this.toolBar.customerNo) {
        params += "&storeNo=" + this.toolBar.customerNo;
      }
      integralPageInvalid(params).then(res => {
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
     * 重置按钮
     */
    resetCleanByPage() {
      this.$refs.dealer.cleanDealer();
      this.$refs.store.cleanStore();
      this.toolBar.customerNo = "";
      this.toolBar.dealerCustomerNo = "";
      this.pagination.current = 1;
      this.listIntegralCleanByPage();
    },
    /**
     * 跳转通知记录详情
     */
    notice() {
      this.$router.push({ "path": "/product/expire/detail" });
    },
    /**
     * 通知到门店
     */
    notice2Store() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请至少选择一间门店来发送通知");
        return;
      }
      this.dialogVisible = true;
    },

    storeChange(val) {
      this.toolBar.customerNo = val;
    },

    dealerChange(val) {
      this.toolBar.dealerCustomerNo = val;
    }
  }
};