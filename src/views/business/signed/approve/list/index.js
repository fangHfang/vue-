import { listScStoreByPage } from "@/api/business/signed/store";

export default {
  "name": "businessSignedApproveList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "customerNo": "",
        "approvalStatus": {
          "value": "",
          "options": [
            { "label": "待审批", "value": 0 },
            { "label": "审批通过", "value": 1 },
            { "label": "审批不通过", "value": 2 }
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
       * 打开详情
       */
    toDetail(ruleNo, customerNo) {
      this.$router.push({ "path": "/business/signed/approve/detail", "query": { "ruleNo": ruleNo, "customerNo": customerNo } });
    },

    search() {
      this.pagination.current = 1;
      this.listStoreByPage();
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listStoreByPage() {
      const params = {
        ...this.toolBar,
        "approvalStatus": this.toolBar.approvalStatus.value,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "ruleType": 1
      };
      this.tableLoading = true;
      const postData = this.$jsonFormat(params);
      listScStoreByPage(postData).then(res => {
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

    storeChange(val) {
      this.toolBar.customerNo = val;
    }
  }
};