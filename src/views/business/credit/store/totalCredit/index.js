
import { saveBarLineStore, repayment } from "@/api/business/store/credit";

export default {
  "name": "AppPageTotalCredit",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "isAdjustment": {
      "type": Boolean,
      "default": false
    },
    "row": {
      "type": Object,
      "default": {}
    }
  },
  data() {
    return {
      "distributor": {
        "name": "",
        "customerNo": "",
        "lineCredit": "",
        "radio": "1",
        "changeNum": "",
        "currentAmount": "",
        "debtAmount": "",
        "creditAmount": "",
        "remarks": "",
        "dealerLineCredit": ""
      },
      "dialogTitle": "",
      "tableLoading": false,
      "btnLoading": false
    };
  },
  "computed": {},
  mounted() {
    this.detail();
  },
  "watch": {
    "dialogVisible": {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
          return;
        }
        this.distributor.name = this.row.name;
        this.distributor.customerNo = this.row.customerNo;
        this.distributor.lineCredit = this.row.lineCredit;
        this.distributor.currentAmount = this.row.currentAmount;
        this.distributor.debtAmount = this.row.debtAmount;
        this.distributor.creditAmount = this.row.creditAmount;
        this.distributor.changeNum = "";
        this.distributor.remarks = "";
        if (this.row.dealerLineCredit === null) {
          this.distributor.dealerLineCredit = 0;
        } else {
          this.distributor.dealerLineCredit = this.row.dealerLineCredit;
        }
        if (this.isAdjustment === true) {
          this.dialogTitle = "调整已用额度";
        } else {
          this.dialogTitle = "变更总授信";
        }
      }
    }
  },
  "methods": {
    /**
     * 查看变更总授信详情
     */
    detail() {

    },
    save() {
      const postData = {
        "creditNo": this.row.creditNo,
        "customerNo": this.distributor.customerNo,
        "remarks": this.distributor.remarks
      };
      this.tableLoading = true;
      this.btnLoading = true;
      if (this.isAdjustment === false) {
        postData.lineCredit = this.distributor.changeNum;
        saveBarLineStore(postData).then(res => {
          this.tableLoading = false;
          this.btnLoading = false;
          if (res.code === 200) {
            const params = {
              "page.pageNum": 1,
              "page.pageSize": 10
            };
            this.$emit("getWhiteBarPageStore", params);
            this.close();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      } else {
        postData.amount = this.distributor.changeNum;
        postData.refNo = "TRAD" + this.$moment(new Date()).format("yyyyMMDDHHmmss") + Math.random().toString(36).substring(2, 6);
        repayment(postData).then(res => {
          this.tableLoading = false;
          this.btnLoading = false;
          if (res.code === 200) {
            const params = {
              "page.pageNum": 1,
              "page.pageSize": 10
            };
            this.$emit("getWhiteBarPageStore", params);
            this.tableLoading = false;
            this.close();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      }
    },
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};