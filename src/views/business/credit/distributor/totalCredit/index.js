
import { saveBarLineDealer } from "@/api/business/distributor/credit";

export default {
  "name": "AppPageTotalCredit",
  "components": {
  },
  "props": {
    "dialogVisible": {
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
        "allocatedLineCredit": "",
        "distributableLineCredit": "",
        "creditAmount": "",
        "remarks": ""
      }
    };
  },
  "computed": {},
  mounted() {
    this.detail();
  },
  "watch": {
    "row": {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
          return;
        }
        this.distributor.name = this.row.name;
        this.distributor.customerNo = this.row.customerNo;
        this.distributor.lineCredit = this.row.lineCredit;
        this.distributor.allocatedLineCredit = this.row.allocatedLineCredit;
        this.distributor.distributableLineCredit = this.row.distributableLineCredit;
        this.distributor.creditAmount = this.row.creditAmount;
        this.distributor.changeNum = "";
        this.distributor.remarks = "";
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
        "lineCredit": this.distributor.changeNum,
        "remarks": this.distributor.remarks
      };
      saveBarLineDealer(postData).then(res => {
        if (res.code === 200) {
          const params = {
            "page.pageNum": 1,
            "page.pageSize": 10
          };
          this.$emit("getWhiteBarPageDealer", params);
          this.close();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }

};