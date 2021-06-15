import { integralNotify, integralPageNotifyDetail } from "@/api/product/integral/store";
export default {
  "name": "ExpireListDialogForm",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "stores": {
      "type": Array,
      "default": () => []
    },
    "notifyNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "form": {
        "content": "",
        "customerNos": []
      },
      "tableData": [],
      "editable": true,
      "tableDetailShow": true
    };
  },
  "watch": {
    "stores": {
      "handler": function(val) {
        this.tableData = val;
      },
      "immediate": true
    },
    "notifyNo": {
      "handler": function(val) {
        if (val) {
          this.getNotifyDetail();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 清理数据
     */
    clearData() {
      this.form = {
        "content": "",
        "customerNos": []
      };
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
          this.$emit("update:dialogVisible", false);
          this.clearData();
        });
    },
    /**
     * 获取通知详情
     */
    getNotifyDetail() {
      const params = "page.pageNum=1" + "&page.pageSize=" + 0x7fffffff + "&notifyNo=" + this.notifyNo;
      integralPageNotifyDetail(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          if (this.tableData.length !== 0) {
            this.form.content = this.tableData[0].content;
          }
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },
    /**
     * 发送通知
     */
    sendNotice() {
      this.form.customerNos = this.tableData.map(element => {
        return element.customerNo;
      });
      integralNotify(this.form).then(res => {
        if (res.code === 200) {
          this.$message.info("已成功发送通知");
          this.$emit("update:dialogVisible", false);
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    }
  }
};