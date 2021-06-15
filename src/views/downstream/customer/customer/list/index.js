import dialogmMdifyPhone from "../phoneNum/index.vue";
import { listDealerByPage } from "@/api/downstream/customer/customer";

export default {
  "name": "dealerInfoList",
  "components": {
    dialogmMdifyPhone
  },
  data() {
    return {
      "toolBar": {
        "phone": "",
        "name": "",
        "license": ""
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
      "multipleSelection": [],
      "modifyPhone": "",
      "oldNum": "",
      "phone": "",
      "userNo": ""
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },

  mounted() {
    this.listDealerByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchDealerListByPage() {
      this.pagination.current = 1;
      this.listDealerByPage();
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
      this.listDealerByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listDealerByPage();
    },

    /**
       * 打开到详情页
       */
    toDetail() {
      this.$router.push({ "path": "/downstream/customer/customer/detail" });
    },
    /**
     * 分页查询经销商数据
     */
    listDealerByPage() {
      this.tableLoading = true;
      const params = {
        ...this.toolBar,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      listDealerByPage(params).then(res => {
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
     * 展开收起
     * @param row
     */
    toogleExpand(row) {
      const $table = this.$refs.table;
      $table.toggleRowExpansion(row);
      row.tableOwnerShow = !row.tableOwnerShow;
      console.log(this.$route.params.taskId);
    },

    changePhone(phone, userNo) {
      this.phone = phone;
      this.userNo = userNo;
      this.dialogVisible = true;
    },

    clearSearch() {
      this.toolBar.name = "";
      this.toolBar.phone = "";
      this.toolBar.license = "";
      this.pagination.current = 1;
      this.listDealerByPage();
    }
  }
};
