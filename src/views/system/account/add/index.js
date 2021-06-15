// src/views/system/account/add/index
import { createUserAccount, modifyUserAccount, detailUserAccount } from "@/api/system/account/account";
import Config from "../role/index.vue";
export default {
  "name": "AccountManageAdd",
  "components": {
    Config
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "phone": "",
        "accountNumber": "",
        "pwd": "",
        "remarks": "",
        "customerNo": "",
        "roleNos": []
      },
      "tableData": [],
      "dialogVisible": false,
      "multipleSelection": [],
      "btnLoading": false
    };
  },
  "computed": {
    operatorNo() {
      return this.$store.state.systemAccount.accountOperatorNo;
    },
    userNo() {
      return this.$store.state.systemAccount.accountUserNo;
    },
    isModify() {
      return this.$store.state.systemAccount.accountModify;
    }
  },
  mounted() {
    if (this.isModify) {
      this.getUserDetail();
    }
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
     * 选中的角色
     */
    confirmRoles(data) {
      const roleList = this.tableData.filter(x => x.roleNo).map(c => { return c.roleNo; });
      const newData = data.filter(x => roleList.indexOf(x.roleNo) < 0);
      this.tableData.push.apply(this.tableData, newData);
      this.dialogVisible = false;
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
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 删除角色
     */
    deleteRoles() {
      const roleNos = this.multipleSelection.map(function(element) {
        return element.roleNo;
      });
      const roleDatas = this.tableData.filter((element) => {
        if (roleNos.indexOf(element.roleNo) === -1) {
          return element;
        }
      });
      this.tableData = roleDatas;
      this.toolBar.roleNos = roleDatas.map(function(element) {
        return element.roleNo;
      });
    },
    /**
     * 保存总部用户
     */
    saveUserDetail() {
      this.btnLoading = true;
      if (this.isModify) {
        this.modifyUserDetail();
      } else {
        this.addUserDetail();
      }
    },
    /**
     * 创建总部用户
     */
    addUserDetail() {
      if (!this.toolBar.phone) {
        this.$message.warning("手机号字段必填");
        this.btnLoading = false;
        return;
      }
      if (!this.toolBar.accountNumber) {
        this.$message.warning("用户账号字段必填");
        this.btnLoading = false;
        return;
      }
      if (!this.toolBar.pwd) {
        this.$message.warning("用户密码字段必填");
        this.btnLoading = false;
        return;
      }
      if (this.tableData && this.tableData.length === 0) {
        this.$message.warning("请选择至少一个角色");
        this.btnLoading = false;
        return;
      }
      this.tableLoading = true;
      const params = {
        "name": this.toolBar.name,
        "phone": this.toolBar.phone,
        "accountNumber": this.toolBar.accountNumber,
        "pwd": this.toolBar.pwd,
        "remarks": this.toolBar.remarks
      };
      params.roleNos = [];
      this.tableData.forEach(row => {
        params.roleNos.push(row.roleNo);
      });

      createUserAccount(params).then(res => {
        this.$message.info(res.msg);
        this.tableLoading = false;
        this.$router.back();
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
        this.btnLoading = false;
      });
    },
    /**
     * 创建总部用户
     */
    modifyUserDetail() {
      if (!this.toolBar.phone) {
        this.$message.warning("手机号字段必填");
        this.btnLoading = false;
        return;
      }
      if (!this.toolBar.accountNumber) {
        this.$message.warning("用户账号字段必填");
        this.btnLoading = false;
        return;
      }
      if (!this.toolBar.pwd) {
        this.$message.warning("用户密码字段必填");
        this.btnLoading = false;
        return;
      }
      if (this.tableData && this.tableData.length === 0) {
        this.$message.warning("请选择至少一个角色");
        this.btnLoading = false;
        return;
      }
      this.tableLoading = true;
      const params = {
        "name": this.toolBar.name,
        "phone": this.toolBar.phone,
        "accountNumber": this.toolBar.accountNumber,
        "pwd": this.toolBar.pwd,
        "remarks": this.toolBar.remarks,
        "customerNo": this.toolBar.customerNo,
        "operatorNo": this.operatorNo,
        "userNo": this.userNo
      };
      params.roleNos = [];
      this.tableData.forEach(row => {
        params.roleNos.push(row.roleNo);
      });modifyUserAccount(params).then(res => {
        this.$message.info(res.msg);
        this.tableLoading = false;
        this.$router.back();
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
        this.btnLoading = false;
      });
    },
    /**
     * 查询用户数据
     */
    getUserDetail() {
      this.tableLoading = true;
      const params = "operatorNo=" + this.operatorNo + "&userNo=" + this.userNo;
      detailUserAccount(params).then(res => {
        if (res.code === 200) {
          console.info(res.data);
          this.toolBar = res.data;
          this.toolBar.created = this.formatTime(this.toolBar.created);
          this.toolBar.roleNos = res.data.roles.map(function(element) {
            return element.roleNo;
          });
          this.tableData = res.data.roles;
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
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 返回
     */
    back() {
      this.$router.push({ "path": "/system/account/list" });
    }
  }
};