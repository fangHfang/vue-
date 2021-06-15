// src/views/downstream/store/info/list/index
import { listStoreChangeRecordByPage } from "@/api/downstream/store/info";
export default {
  "name": "storeInfoChangeList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "operator": "",
        "date": ""
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
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    info() {
      return this.$store.state.storeInfoChange;
    }
  },
  mounted() {
    // this.listStoreChangeByPage();
  },
  activated() {
    this.listStoreChangeByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchStoreListChangeByPage() {
      this.pagination.current = 1;
      this.listStoreChangeByPage();
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
      this.pagination.size = val;
      this.listStoreChangeByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStoreChangeByPage();
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
     * 分页查询门店数据
     */
    listStoreChangeByPage() {
      const that = this;
      this.tableLoading = true;
      const { operator, date } = this.toolBar;
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "storeCustomerNo": this.info.customerNo
      };
      if (date) {
        params.startTime = this.$moment(date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endTime = this.$moment(date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      if (operator) {
        params.changeBy = operator;
      }
      listStoreChangeRecordByPage(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.created = that.formatTime(element.created);
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
    }

  }
};
