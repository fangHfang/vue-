import convertStoreRuleDetailAll from "./content/all/index.vue";
export default {
  "name": "convertStoreRuleDetail",
  "components": {
    convertStoreRuleDetailAll
  },
  data() {
    return {
      "activeName": "first"
    };
  },
  "computed": {
    id() {
      return this.$store.state.convertStoreRuleList.id;
    },
    customerNo() {
      return this.$store.state.convertStoreRuleList.customerNo;
    },
    epRuleNo() {
      return this.$store.state.convertStoreRuleList.epRuleNo;
    }
  },
  "methods": {
    handleClick(tab, event) {
    }
  }
};