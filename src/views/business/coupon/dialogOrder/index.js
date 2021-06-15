import { editIntegral } from "@/api/business/coupon/exchange";

export default {
  "name": "ExpireListDialogOrder",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "multipleSelection": {
      "type": [ Object, Array ],
      "default": {}
    }
  },
  data() {
    return {
      "courierNo": "",
      "tableData": [],
      "tableDetailShow": true,
      "btnLoading": false
    };
  },
  "watch": {
    "dialogVisible": {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
          return;
        }
        this.tableData = this.multipleSelection;
      }
    }
  },

  "methods": {
    /**
     * 清理数据
     * @param {} done
     */
    clearData() {
      this.courierNo = "";
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("update:dialogVisible", false);
          this.clearData();
        })
        .catch(_ => {

        });
    },

    getTableData() {
      // 放到页面中
      this.toolBar.push.apply(this.multipleSelection);
    },

    submitForm() {
      this.btnLoading = true;
      if (this.courierNo === "") {
        this.btnLoading = false;
        return this.$message.info("快递单号不能为空！！！");
      }
      const params = {
        "courierNo": this.courierNo,
        "flag": true
      };
      params.orderNoList = [];
      this.multipleSelection.forEach(row => {
        params.orderNoList.push(row.orderNo);
      });
      editIntegral(params).then(res => {
        if (res.code === 200) {
          this.$emit("submitForm", "");
          this.$emit("update:dialogVisible", false);
          this.clearData();
        } else {
          this.$message.error(res.msg);
          this.btnLoading = false;
        }
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};