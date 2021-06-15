// src/views/product/integral/store/adjustment/index
import { addIntegral, reduceIntegral } from "@/api/product/integral/store";
export default {
  "name": "Adjustment",
  "components": {
  },
  "props": {
    "confirm": {
      "type": Boolean,
      "default": false
    },
    "formData": {
      "type": Object,
      "default": {
        "customerNo": "",
        "debitNo": "",
        "availableAmount": "",
        "storeName": "",
        "storeNo": ""
      }
    }
  },
  data() {
    return {
      "form": {
        "radio": "1",
        "remark": "",
        "point": 0,
        "refNo": ""
      }
    };
  },
  "watch": {
    "confirm": {
      "handler": function(val, oldVal) {
        if (!val) {
          // 初始化
          this.form.point = 0;
          this.form.remark = "";
          this.form.radio = "1";
          this.form.refNo = "";
          this.$emit("confirmeErorBack");
        }
      },
      "immediate": true
    }
  },
  "computed": {

  },
  created() {

  },
  mounted() {

  },
  "methods": {
    saveIntegral() {
      if (isNaN(Number(this.form.point))) {
        this.$message.warning("请输入调整后的积分！");
        this.form.point = "";
        this.$emit("confirmeErorBack");
        return false;
      }
      this.form.point = Number(this.form.point).toFixed(0);
      if (this.form.radio === "1") {
        console.info("saveAddIntegral");
        this.saveAddIntegral();
      } else {
        console.info("saveReduceIntegral");
        this.saveReduceIntegral();
      }
    },
    saveAddIntegral() {
      const params = {
        "amount": this.form.point,
        "customerNo": this.formData.customerNo,
        "debitNo": this.formData.debitNo,
        "remarks": this.form.remark
      };
      params.refNo = "TRAD" + this.$moment(new Date()).format("yyyyMMDDHHmmss") + Math.random().toString(36).substring(2, 6);
      addIntegral(params).then(res => {
        this.$emit("confirmBack");
      }).catch((error) => {
        console.info(error);
        this.$emit("confirmeErorBack");
        this.$message.error(error);
      });
    },

    saveReduceIntegral() {
      const params = {
        "amount": this.form.point,
        "customerNo": this.formData.customerNo,
        "debitNo": this.formData.debitNo,
        "remarks": this.form.remark
      };
      params.refNo = "TRAD" + this.$moment(new Date()).format("yyyyMMDDHHmmss") + Math.random().toString(36).substring(2, 6);
      reduceIntegral(params).then(res => {
        this.$emit("confirmBack");
      }).catch((error) => {
        console.info(error);
        this.$emit("confirmeErorBack");
        this.$message.error(error);
      });
    }
  }
};