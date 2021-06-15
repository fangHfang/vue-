import { listScStoreByPage } from "@/api/business/signed/store";

export default {
  "name": "businessSignedStoreList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "ruleName": "",
        "name": "",
        "storeNo": "",
        "applyTime": [],
        "approvalTime": []
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false,
      "dialogVisible": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listStoreByPage();
  },
  "methods": {

    searchData() {
      this.pagination.current = 1;
      this.listStoreByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStoreByPage();
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
    toAdd(customerNo) {
      this.$router.push({ "path": "/business/signed/store/detail", "query": { "customerNo": customerNo } });
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listStoreByPage() {
      const params = {
        ...this.toolBar,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      if (this.toolBar.applyTime && this.toolBar.applyTime.length > 0) {
        params.applyStartTime = this.toolBar.applyTime[0].replace(/-/g, "/");
        params.applyEndTime = this.toolBar.applyTime[1].replace(/-/g, "/");
      }
      if (this.toolBar.approvalTime && this.toolBar.approvalTime.length > 0) {
        params.approvalStartTime = this.toolBar.approvalTime[0].replace(/-/g, "/");
        params.approvalEndTime = this.toolBar.approvalTime[1].replace(/-/g, "/");
      }
      const postData = this.$jsonFormat(params);
      listScStoreByPage(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    storeChange(val) {
      this.toolBar.customerNo = val;
    }
  }
};
