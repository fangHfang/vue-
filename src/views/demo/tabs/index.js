import Table from "../table/index.vue";
export default {
  "name": "DemoTable",
  "components": {
    Table
  },
  data() {
    return {
      "activeName": "first"
    };
  },
  "methods": {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};