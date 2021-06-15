export default {
  "name": "collapse",
  "props": {
    "open": {
      "type": Boolean,
      "default"() {
        return true;
      }
    },
    "openText": {
      "type": String,
      "default": "展开"
    },
    "closeText": {
      "type": String,
      "default": "收起"
    }
  },
  data() {
    return {
      "isOpen": this.open
    };
  },
  "computed": {
  },

  "methods": {
    /**
     * 展开收起
     */
    toggle() {
      this.isOpen = !this.isOpen;
      this.$emit("update:open", this.isOpen);
    }
  }
};