
export default {
  "name": "dialogProductNum",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "productData": {
      "type": Object,
      "default": {}
    }
  },
  data() {
    return {
    };
  },
  "computed": {},
  mounted() {
  },
  "methods": {
    /**
       * 保存
       */
    save() {
      this.$emit("selectProductNum", this.productData);
    },
    /**
       * 取消
       */
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};