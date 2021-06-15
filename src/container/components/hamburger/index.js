
export default {
  "name": "Hamburger",
  "props": {
    "isActive": {
      "type": Boolean,
      "default": false
    }
  },
  "methods": {
    toggleClick() {
      this.$emit("toggleClick");
    }
  }
};