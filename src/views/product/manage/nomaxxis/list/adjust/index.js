import { adjustItemStock } from "@/api/product/manage";
export default {
  "name": "dialogAdjust",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "stockNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "toolBar": {
        "redio": "1",
        "addNum": "",
        "reduceNum": ""
      }
    };
  },
  created() {
  },
  mounted() {
  },
  "methods": {
    /**
     * 生效
     */
    save() {
      const params = {
        "amount": this.toolBar.redio === "1" ? this.toolBar.addNum : this.toolBar.redio === "0" ? this.toolBar.reduceNum : "",
        "flag": this.toolBar.redio,
        "stockNos": this.stockNo
      };
      adjustItemStock(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.$emit("saveStockNo", this.toolBar);
          this.handleClose();
        } else {
          this.$message.error(res.msg);
        }
      }).catch(() => {});
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    }
  }
};