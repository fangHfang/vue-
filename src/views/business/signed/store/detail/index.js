import { listScStoreByPage, searchList } from "@/api/business/signed/store";
export default {
  "name": "businessSignedStoreDetail",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "storeNo": "",
        "dealerName": "",
        "dealerNo": "",
        "five": "",
        "six": "",
        "contact": "",
        "created": "",
        "remarks": "",
        "status": 0
      },
      "rowsMoreTableDataTwo": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "customerNo": this.$route.query.customerNo
    };
  },
  "computed": {},
  mounted() {
    this.searchList();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listScStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listScStoreByPage();
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
     * 控制表格显示
     */
    tableFontClick() {
      this.tableDetailShow = !this.tableDetailShow;
    },
    tableFontClickTwo() {
      this.tableDetailShowTwo = !this.tableDetailShowTwo;
    },

    /**
     * 查询详情
     */
    searchList() {
      searchList(this.customerNo).then((res) => {
        if (res.code === 200) {
          this.toolBar = res.data;
          this.listScStoreByPage();
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listScStoreByPage() {
      const params = {
        "storeNo": this.toolBar.storeNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      const postData = this.$jsonFormat(params);
      listScStoreByPage(postData).then(res => {
        if (res.code === 200) {
          this.rowsMoreTableDataTwo = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    }
  }
};