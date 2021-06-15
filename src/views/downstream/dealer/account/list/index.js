// src/views/downstream/dealer/account/list/index
import { pageSearchUserList, enableUserAccount, disableUserAccount } from "@/api/downstream/dealer/account";

export default {
  "name": "DealerAccountManageList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "userNo": "",
        "name": "",
        "phone": "",
        "class": {
          "value": "",
          "options": [
            { "label": "启用", "value": "0" },
            { "label": "禁用", "value": "1" }
          ]
        },
        "customerNo": ""

      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400,
        "field": "userNo",
        "order": "asc"
      },
      "dialogVisible": false,
      "multipleSelection": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listDealerAccountByPage();
  },
  activated() {
    this.listDealerAccountByPage();
  },

  "methods": {
    /**
     * 查询按钮方法
     */
    searchDealerAccountListByPage() {
      this.pagination.current = 1;
      this.listDealerAccountByPage();
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listDealerAccountByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listDealerAccountByPage();
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
     * 点击跳转
     */
    goAddAccount() {
      this.$store.commit("dealerAccount/dealerAccountManageListSet", {
        "accountModify": false
      });
      this.$router.push({ "path": "/downstream/dealer/account/add" });
    },
    goAccountDetail(operatorNo, userNo) {
      this.$store.commit("dealerAccount/dealerAccountManageListSet", {
        "accountOperatorNo": operatorNo,
        "accountUserNo": userNo
      });
      this.$router.push({ "path": "/downstream/dealer/account/detail" });
    },
    /**
     * 打开修改
     */
    edit() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行修改操作");
        return;
      }
      this.$confirm("需重新编辑账号?", "编辑账号", {
        "confirmButtonText": "编辑",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        // 确认编辑-跳转到编辑页面
        this.$store.commit("dealerAccount/dealerAccountManageListSet", {
          "accountModify": true,
          "accountOperatorNo": multipleSelection[0].operatorNo,
          "accountUserNo": multipleSelection[0].userNo
        });
        this.$router.push({ "path": "/downstream/dealer/account/add" });
      }).catch(() => {});
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
     * 分页查询用户数据
     * @param clear 是否清空
     */
    listDealerAccountByPage() {
      const that = this;
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.name) {
        params += "&name=" + this.toolBar.name;
      }
      if (this.toolBar.class.value !== "") {
        params += "&status=" + this.toolBar.class.value;
      }
      if (this.toolBar.phone) {
        params += "&phone=" + this.toolBar.phone;
      }
      if (this.toolBar.customerNo) {
        params += "&customerNo=" + this.toolBar.customerNo;
      }
      if (this.toolBar.userNo) {
        params += "&userNo=" + this.toolBar.userNo;
      }
      pageSearchUserList(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.status = element.status === "启用" ? 0 : 1;
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
    },

    /**
     * 启用
     */
    enableUserFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行启用操作");
        return;
      }
      this.tableLoading = true;
      const { operatorNo, userNo } = multipleSelection[0];
      const params = {
        "operatorNo": operatorNo,
        "userNo": userNo
      };
      enableUserAccount(params).then(res => {
        this.listDealerAccountByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },

    /**
     * 禁用
     */
    disableUserFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行禁用操作");
        return;
      }
      this.tableLoading = true;
      const { operatorNo, userNo } = multipleSelection[0];
      const params = {
        "operatorNo": operatorNo,
        "userNo": userNo
      };
      disableUserAccount(params).then(res => {
        this.listDealerAccountByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },

    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.customerNo = val;
    }
  }
};