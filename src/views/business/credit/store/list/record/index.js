
import { getWhiteBarPageStoreDetail } from "@/api/business/store/credit";

export default {
  "name": "storeRecord",
  "components": {
  },
  "props": {
    "changeId": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "toolBar": {
        "date": "",
        "operatorName": "",
        "oddNumbers": ""
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
      "creditNo": this.$route.query.creditNo,
      "customerNo": this.$route.query.customerNo,
      "name": this.$route.query.name
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 见 beforeRouteEnter
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm,this
      vm.listStoreByPage();
    });
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
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listStoreByPage();
    },

    /**
     * 分页查询变更记录
     */
    listStoreByPage() {
      const params = {
        "userName": this.toolBar.operatorName,
        "creditNo": this.creditNo,
        "customerNo": this.customerNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "refNo": this.toolBar.oddNumbers
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        params.beginAccountTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endAccountTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      getWhiteBarPageStoreDetail(postData).then(res => {
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

    cleanSearch() {
      this.toolBar.date = "";
      this.toolBar.operatorName = "";
      this.toolBar.oddNumbers = "";
      this.pagination.current = 1;
      this.listStoreByPage();
    }
  }
};