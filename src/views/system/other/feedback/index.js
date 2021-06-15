import { listFeedbackByPage, enable, disable } from "@/api/system/other/feedback";
import { BBS_URL } from "@/utils/system-constant";
export default {
  "name": "SystemOtherFeedback",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "accountNumber": "",
        "userNo": "",
        "storeNo": "",
        "phone": "",
        "status": {
          "value": "",
          "options": [
            { "label": "待处理", "value": 0 },
            { "label": "已处理", "value": 1 }
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
      "dialogVisible": false,
      "exportUrl": BBS_URL + "/admin/help/feedback/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportPostData() {
      const params = {
        ...this.toolBar,
        "status": this.toolBar.status.value,
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size
      };
      return {
        ...params
      };
    }
  },
  mounted() {
    this.searchDataPage();
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listFeedbackByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listFeedbackByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listFeedbackByPage();
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
     * 分页查询数据
     * @param clear 是否清空
     */
    listFeedbackByPage() {
      const params = {
        ...this.toolBar,
        "status": this.toolBar.status.value,
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size
      };
      this.tableLoading = true;
      listFeedbackByPage(params).then(res => {
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
     * 修改状态
     * @param {状态} status
     * @param {编号} helpNo
     */
    transferStatus(status, id) {
      if (status === 0) {
        enable(id).then(res => {
          if (res.code === 200) {
            this.listFeedbackByPage();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      } else if (status === 1) {
        disable(id).then(res => {
          if (res.code === 200) {
            this.listFeedbackByPage();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      }
    },
    /**
     * 查找门店
     * @param val
     */
    storeChange(val) {
      this.toolBar.storeNo = val;
    }

  }
};