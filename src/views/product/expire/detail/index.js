import { integralNotify, integralPageNotifyDetail } from "@/api/product/integral/store";

export default {
  "name": "ProductExpireListDetail",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "dealerName": "",
        "storeName": ""
      },
      "tableData": [],
      "content": "",
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableDetailShow": true,
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {
    notifyNo() {
      return this.$store.state.productExpireListDetail.notifyNo;
    },
    created() {
      return this.$store.state.productExpireListDetail.created;
    },
    createBy() {
      return this.$store.state.productExpireListDetail.createBy;
    }
  },
  mounted() {
    this.listIntegralNotifyDetailByPage();
  },
  "methods": {
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
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listIntegralNotifyDetailByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listIntegralNotifyDetailByPage();
    },

    /**
     * 获取通知详情
     */
    listIntegralNotifyDetailByPage() {
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&notifyNo=" + this.notifyNo;
      if (this.toolBar.storeName) {
        params += "&storeName=" + this.toolBar.storeName;
      }
      if (this.toolBar.dealerName) {
        params += "&dealerName=" + this.toolBar.dealerName;
      }
      integralPageNotifyDetail(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          if (this.tableData.length !== 0) {
            this.content = this.tableData[0].content;
          }
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },

    /**
     * 发送通知
     */
    sendNotice() {
      const customerNos = this.tableData.map(element => {
        return element.customerNo;
      });
      const data = {
        customerNos,
        "content": this.content
      };
      integralNotify(data).then(res => {
        if (res.code === 200) {
          this.$message.info("已成功发送通知");
          this.$router.back();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    cleanSearch() {
      this.toolBar.dealerName = "";
      this.toolBar.storeName = "";
    }
  }
};