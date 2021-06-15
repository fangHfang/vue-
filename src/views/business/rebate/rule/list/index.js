import businessRebateRuleListMain from "./main/index.vue";
import { setOrderUseRebateLimit, getAPPSetRb } from "@/api/business/rebate/rule";
export default {
  "name": "businessRebateRuleList",
  "components": {
    businessRebateRuleListMain
  },
  data() {
    return {
      "input": "",
      "rulePopup": false,
      "activeName": "stockIn",
      // 返利节点(0-商品下单，1-商品入库，2-商品出库)
      "typeFlag": 1,
      "btnLoading": false,
      "isLoading": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    handleClick(tab, event) {
    },
    /**
   * 打开弹窗
   * 获取app设置返利值
   */
    popupRule() {
      this.rulePopup = true;
      this.isLoading = true;
      getAPPSetRb().then((res) => {
        this.input = res.data;
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      });
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.input = "";
          done();
        })
        .catch(_ => {});
    },

    /**
     * 保存与取消
     */
    save() {
      const params = {
        // 返利上限数额
        "limitAmount": this.input
      };
      setOrderUseRebateLimit(params).then(res => {
        this.$message.success(res.msg);
        this.btnLoading = false;
      }).catch(res => {
        this.btnLoading = false;
        this.$message.error(res);
      }).finally(this.cancel);
    },
    cancel() {
      this.rulePopup = false;
      this.input = "";
    }

  }
};
