// src/views/system/account/detail/index
import { detailUserAccount } from "@/api/system/account/account";
export default {
  "name": "AccountManageDetail",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "XXX门店",
        "phone": "13838383388",
        "accountNumber": "zhangsanfeng",
        "password": "********",
        "remarks": "",
        "status": "1",
        "userNo": "",
        "created": "2020-11-12 13:31:21"
      },
      "tableData": [ {} ],
      "dialogVisible": false
    };
  },
  "computed": {
    operatorNo() {
      return this.$store.state.systemAccount.accountOperatorNo;
    },
    userNo() {
      return this.$store.state.systemAccount.accountUserNo;
    }
  },
  mounted() {
    this.getUserDetail();
  },

  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },
    /**
     * 查询用户数据
     */
    getUserDetail() {
      this.tableLoading = true;
      const params = "operatorNo=" + this.operatorNo + "&userNo=" + this.userNo;
      console.info(params);
      detailUserAccount(params).then(res => {
        if (res.code === 200) {
          this.toolBar = res.data;
          this.toolBar.password = res.data.pwd;
          this.toolBar.created = this.formatTime(this.toolBar.created);
          this.tableData = res.data.roles;
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