import { modifyIntegral } from "@/api/product/integral/order";
export default {
  "name": "dialogDeliver",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "tableDataDeliver": {
      "type": Array,
      "default": []
    }
  },
  data() {
    return {
      "tableLoading": false,
      "toolBar": {
        "courierNo": ""
      },
      "tableData": []
    };
  },
  created() {
  },
  mounted() {
    // this.tableData = this.$props.tableDataDeliver;
  },
  "methods": {
    /**
         * 关闭弹窗
         * @param done
         */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    resetData() {
      this.toolBar.courierNo = "";
    },
    /**
         * 修改积分订单------快递单号
         */
    submitDeliver() {
      if (this.toolBar.courierNo === "") {
        return this.$message.info("快递单号不能为空");
      }
      const tableOrderNoList = [];
      this.tableDataDeliver.map((item) => {
        tableOrderNoList.push(item.orderNo);
      });
      const params = {
        "courierNo": this.toolBar.courierNo,
        "flag": false,
        "orderNoList": tableOrderNoList
      };
      modifyIntegral(params).then(res => {
        if (res.code === 200) {
          this.$message.success("发货成功!");
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
      this.$emit("selectInfos", this.toolBar);
      this.$emit("update:dialogVisible", false);
    }
  }
};